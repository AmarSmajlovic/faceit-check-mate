import type { Match } from "../types";

export const getCurrentUserId = () => {
  try {
    const legacyData = localStorage.getItem("C_UCURRENT_USER.data.CURRENT_USER");
    if (legacyData) {
      const legacyId = JSON.parse(legacyData)?.value?.currentUser?.id;
      if (legacyId) return legacyId;
    }

    const authData = localStorage.getItem("prefetched-auth");
    if (authData) {
      const auth = JSON.parse(authData);
      if (auth?.session?.entity?.id) return auth.session.entity.id;
    }

    for (const key in localStorage) {
      try {
        const isId1 = key.includes("ab.storage.userId.");
        const isId2 = key.includes("ab.storage.attributes.");
        const isId3 = key.includes("ab.storage.events.");
        let id = null;

        const item = localStorage.getItem(key);
        if (!item) continue;

        if (isId1) {
          id = JSON.parse(item)?.v?.g;
        } else if (isId2) {
          id = Object.keys(JSON.parse(item)?.v || {})?.[0];
        } else if (isId3) {
          id = JSON.parse(item)?.v?.[0]?.u;
        }

        if (id) return id;
      } catch (e) {
        // Skip keys that aren't valid JSON
        continue;
      }
    }

    const betaId = _getBetaUserId();
    if (betaId) return betaId;
  } catch (error) {
    console.error("Error getting current user ID:", error);
  }

  return null;
};

export const isLoggedIn = () =>
  document.cookie.includes(" ab.storage.userId.") || !!getCurrentUserId();

const _getBetaUserId = () => {
  const cookies = document.cookie.split(";");
  const cookieContent = cookies
    .find((cookie) => cookie?.trim()?.startsWith("ab.storage.userId"))
    ?.split("=")?.[1];
  if (cookieContent) {
    const userId = JSON.parse(decodeURIComponent(cookieContent))?.g;

    return userId;
  }
};

export const findCommonMatches = (matches1: Match[], matches2: Match[]) => {
  if (!Array.isArray(matches1) || !Array.isArray(matches2)) {
    return [];
  }
  const matchIds1 = new Set(
    matches1.map((match) => match.matchId || match._id?.matchId)
  );
  return matches2.filter((match) =>
    matchIds1.has(match.matchId || match._id?.matchId)
  );
};
