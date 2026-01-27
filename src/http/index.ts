import pMemoize from "p-memoize";
import browser from "webextension-polyfill";
import type { Match } from "../types";

const CACHE_TIME = 60000;
// "1-0cee0491-61b0-4c8c-9740-cf0ca71579ac"

/**
 * Fetch matches for a player
 */
export const getPlayerMatches = (
  game: string,
  playerId: string,
  to: number
): Promise<Match[] | null> =>
  fetchAPIMemoized<Match[]>(
    `/stats/v1/stats/time/users/${playerId}/games/${game}?to=${to}`
  );

export const getPlayerByNickname = (
  nickname: string
): Promise<any | null> =>
  fetchAPIMemoized<any>(`/users/v1/nicknames/${nickname}`);

const playerMatchResults: {
  [playerId: string]: {
    matches: Match[];
    fetched: boolean; // Indicates if all matches have been fetched
  };
} = {}; // Store results for each player

// The recursive function for fetching all matches for a specific player
export const fetchAllMatches = async (
  game: string,
  playerId: string,
  matchLimit: number = 4000,
  recursionLimit: number = 100, // Increased to go further back in history
  recursionLevel: number = 0,
  to: number = Date.now()
): Promise<Match[]> => {
  // If results are already fully fetched, return them
  if (playerMatchResults[playerId]?.fetched) {
    console.log(`Returning cached results for player ${playerId}`);
    return playerMatchResults[playerId].matches;
  }

  // Ensure there is a matchResult for each player in the playerMatchResults object
  if (!playerMatchResults[playerId]) {
    playerMatchResults[playerId] = { matches: [], fetched: false };
  }

  const matchResult = playerMatchResults[playerId]; // Access the specific player's matchResult

  // Stop recursion if the recursion limit is reached
  if (recursionLevel >= recursionLimit) {
    console.log(`Recursion limit reached for player ${playerId}`);
    matchResult.fetched = true; // Mark as fetched since recursion ended
    return matchResult.matches;
  }

  // Stop fetching if the match limit is reached
  if (matchResult.matches.length >= matchLimit) {
    console.log(`Match limit of ${matchLimit} reached for player ${playerId}`);
    matchResult.fetched = true; // Mark as fetched since limit is reached
    return matchResult.matches;
  }

  try {
    // Fetch the matches for this player within the specified "from" and "to" date range
    const matches = await getPlayerMatches(game, playerId, to);

    // If matches are returned and are not empty, process and add to the specific player's match array
    if (Array.isArray(matches) && matches.length > 0) {
      // Use a Set to track unique matchIds
      const matchIds = new Set(
        matchResult.matches.map((match) => match.matchId)
      );

      // Filter out duplicates from the current matchResult
      const filteredMatches = matches.filter((match) => {
        if (!match || !match.matchId || matchIds.has(match.matchId)) {
          return false; // Skip duplicates or invalid matches
        }
        matchIds.add(match.matchId); // Add the matchId to the Set
        return true;
      });

      // Concatenate filtered matches and ensure no duplicates in the player's match array
      matchResult.matches = matchResult.matches.concat(filteredMatches);

      // Get the timestamp of the last match's date
      const lastMatch = matches[matches.length - 1];
      const lastMatchDate = lastMatch?.date;

      if (!lastMatchDate || filteredMatches.length === 0) {
        matchResult.fetched = true;
        return matchResult.matches;
      }

      // Continue the process recursively with the new "to" date
      return fetchAllMatches(
        game,
        playerId,
        matchLimit,
        recursionLimit,
        recursionLevel + 1,
        lastMatchDate // Set the new "to" date
      );
    } else {
      // If no matches are found, mark as fully fetched
      console.log(`No more matches available for player ${playerId}`);
      matchResult.fetched = true;
      return matchResult.matches;
    }
  } catch (error) {
    console.error(`Error fetching matches for player ${playerId}:`, error);
    return []; // Return empty instead of throwing to prevent global Error state
  }
};

/**
 * Base function to fetch API data
 */
const fetchAPI = async <T>(path: string): Promise<T | null> => {
  if (typeof path !== "string") return null;

  try {
    const token = localStorage.getItem("token");
    const response = await browser.runtime?.sendMessage({ path, token });
    const { result, code, payload } = response ?? ({} as any);

    if (
      (result && result.toUpperCase() !== "OK") ||
      (code && code.toUpperCase() !== "OPERATION-OK")
    ) {
      throw new Error(JSON.stringify({ result, code, payload }));
    }

    return payload || response;
  } catch (err) {
    console.error("Error fetching API:", err);
    return null;
  }
};

/**
 * Memoized version of fetchAPI
 */
const fetchAPIMemoized = pMemoize(fetchAPI, {
  // @ts-ignore
  maxAge: CACHE_TIME,
});
