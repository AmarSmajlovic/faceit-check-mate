import browser from "webextension-polyfill";
import type { Match } from "../types";
import { getMatchId, getAuthInfo } from "../utils/user";
import pMemoize from "p-memoize";

const CACHE_TIME = 60000;

const playerMatchResults: {
  [playerId: string]: {
    matches: Match[];
    fetched: boolean;
  };
} = {};

const activeFetches: { [playerId: string]: Promise<Match[]> } = {};

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

/**
 * The recursive function for fetching all matches for a specific player
 */
export const fetchAllMatches = async (
  game: string,
  playerId: string,
  matchLimit: number = 6000,
  recursionLimit: number = 300,
  recursionLevel: number = 0,
  to: number = Date.now()
): Promise<Match[]> => {
  if (playerMatchResults[playerId]?.fetched) {
    return playerMatchResults[playerId].matches;
  }

  if (activeFetches[playerId]) {
    return activeFetches[playerId];
  }

  if (!playerMatchResults[playerId]) {
    playerMatchResults[playerId] = { matches: [], fetched: false };
  }
  const matchResult = playerMatchResults[playerId];

  const runFetch = async (currentTo: number, currentLevel: number): Promise<Match[]> => {
    if (currentLevel >= recursionLimit || matchResult.matches.length >= matchLimit) {
      matchResult.fetched = true;
      return matchResult.matches;
    }

    try {
      const matches = await getPlayerMatches(game, playerId, currentTo);

      if (Array.isArray(matches) && matches.length > 0) {
        const matchIds = new Set(matchResult.matches.map(getMatchId).filter(Boolean));
        const filteredMatches = matches.filter((match) => {
          const id = getMatchId(match);
          if (!match || !id || matchIds.has(id)) return false;
          matchIds.add(id);
          return true;
        });

        matchResult.matches = matchResult.matches.concat(filteredMatches);
        const lastMatchDate = matches[matches.length - 1]?.date;

        if (!lastMatchDate || filteredMatches.length === 0) {
          matchResult.fetched = true;
          return matchResult.matches;
        }

        return runFetch(lastMatchDate, currentLevel + 1);
      } else {
        matchResult.fetched = true;
        return matchResult.matches;
      }
    } catch (error) {
      console.error(`Error in runFetch for ${playerId}:`, error);
      return matchResult.matches;
    }
  };

  activeFetches[playerId] = runFetch(to, recursionLevel);
  
  try {
    return await activeFetches[playerId];
  } finally {
    delete activeFetches[playerId];
  }
};

/**
 * Base function to fetch API data
 */
const fetchAPI = async <T>(path: string): Promise<T | null> => {
  if (typeof path !== "string") return null;

  try {
    const auth = getAuthInfo();
    const response = await browser.runtime?.sendMessage({ path, token: auth.token });
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
