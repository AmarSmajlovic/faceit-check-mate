import { fetchAllMatches, getPlayerByNickname } from "./http";
import { findCommonMatches, getCurrentUserId, getMatchId, getAuthInfo } from "./utils/user";

/**
 * PRODUCTION READY - Version 1.2
 */
const DEBUG_MODE = false;

const checkPlayerMatches = async (id: string) => {
  try {
    if (!id) return null;
    return await fetchAllMatches("cs2", id);
  } catch (error) {
    return null;
  }
};

const checkAndCompareMatches = async (bannedUserId: string, nickName: string, onUpdate?: (text: string) => void) => {
  try {
    const auth = getAuthInfo();
    if (!auth.id) return "NOT_LOGGED_IN";

    if (onUpdate) onUpdate("Fetching Your History...");
    const currentPlayerMatches = await checkPlayerMatches(auth.id);
    if (!currentPlayerMatches) return "MY_HISTORY_ERROR";
    
    if (onUpdate) onUpdate("Searching Their History...");
    const bannedPlayerMatches = await checkPlayerMatches(bannedUserId);
    if (!bannedPlayerMatches) return "BANNED_HISTORY_ERROR";

    if (onUpdate) onUpdate("Comparing Matches...");
    const common = findCommonMatches(currentPlayerMatches, bannedPlayerMatches);
    return common;
  } catch (error) {
    return "UNKNOWN_ERROR";
  }
};

const getPlayerByNick = async (nick: string) => {
  try {
    return await getPlayerByNickname(nick);
  } catch (error) {
    return null;
  }
};

const observer = new MutationObserver(async () => {
  const elements = document.querySelectorAll('[class*="NotificationContainer"]');

  elements.forEach(async (element) => {
    if (!element.hasAttribute("data-processed")) {
      const bodyElement = element.querySelector('[class*="Body"]');
      const strongElement = bodyElement?.querySelector("strong");
      const spanElement = bodyElement?.querySelector("span");
      
      const isBanned = spanElement?.textContent?.includes("banned");
      const nickName = strongElement?.textContent?.trim();
      
      // Only process actual banned notifications
      if (!isBanned || !nickName) return;

      element.setAttribute("data-processed", "true");

      const button = document.createElement("button");
      button.textContent = "Checking..."; 
      button.style.borderRadius = "4px";
      button.style.height = "32px";
      button.style.padding = "8px 24px";
      button.style.border = "none";
      button.style.fontWeight = "bold";
      button.style.color = "white";
      button.style.cursor = "pointer";
      button.style.textTransform = "uppercase";
      button.style.backgroundColor = "rgb(255, 85, 0)";
      button.disabled = true;
      button.style.marginTop = "10px";

      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "rgb(255, 120, 60)";
      });
      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "rgb(255, 85, 0)";
      });

      bodyElement?.insertAdjacentElement("beforeend", button);

      try {
        const bannedUser = await getPlayerByNick(nickName);
        
        if (!bannedUser || !bannedUser.id) {
          button.textContent = "User Not Found";
          return;
        }

        const result = await checkAndCompareMatches(bannedUser.id, nickName, (text) => {
          button.textContent = text;
        });

        if (result === "NOT_LOGGED_IN") {
          button.textContent = "Log in to Faceit";
        } else if (result === "MY_HISTORY_ERROR") {
          button.textContent = "History Error";
        } else if (result === "BANNED_HISTORY_ERROR") {
          button.textContent = "User Private/Deleted";
        } else if (result === "UNKNOWN_ERROR") {
          button.textContent = "API Error";
        } else {
          const commonMatchId = (Array.isArray(result) && result.length > 0) ? getMatchId(result[0]) : null;
          if (commonMatchId) {
            button.textContent = "Match Details";
            button.disabled = false;
            button.onclick = () => window.open(`https://www.faceit.com/en/cs2/room/${commonMatchId}`, "_blank");
          } else {
            button.textContent = "No Matches Found";
          }
        }
      } catch (error) {
        button.textContent = "Error";
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
