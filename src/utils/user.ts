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

export const getAuthInfo = () => {
    try {
        let token: string | null = null;
        let id: string | null = null;

        const authData = localStorage.getItem("prefetched-auth");
        if (authData) {
            const auth = JSON.parse(authData);
            id = auth?.session?.entity?.id || null;
            token = auth?.session?.token || null;
        }

        if (!id) {
            const legacyData = localStorage.getItem("C_UCURRENT_USER.data.CURRENT_USER");
            id = legacyData ? JSON.parse(legacyData)?.value?.currentUser?.id : null;
        }

        // Use all fallbacks from getCurrentUserId if still no ID found
        if (!id) {
            id = getCurrentUserId();
        }

        if (!token) {
            token = localStorage.getItem("token");
        }

        return { id, token };
    } catch (e) {
        return { id: getCurrentUserId(), token: null };
    }
};

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

export const getMatchId = (match: Match): string | undefined => {
  return (match as any).matchId || (match as any)._id?.matchId || (match as any).match_id;
};


export const findCommonMatches = (matches1: Match[], matches2: Match[]) => {
  if (!Array.isArray(matches1) || !Array.isArray(matches2)) {
    return [];
  }
  const matchIds1 = new Set(
    matches1.map((match) => getMatchId(match)).filter(Boolean)
  );
  return matches2.filter((match) => {
    const id = getMatchId(match);
    return id && matchIds1.has(id);
  });
};

