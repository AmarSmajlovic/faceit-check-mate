import { fetchAllMatches, getPlayerByNickname } from "./http";
import { findCommonMatches, getCurrentUserId, getMatchId, getAuthInfo } from "./utils/user";

/**
 * PRODUCTION READY - Version 1.2
 */
const DEBUG_MODE = false;

// CSS for the spinning animation
const style = document.createElement('style');
style.textContent = `
  @keyframes checkmate-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .checkmate-spinner {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: checkmate-spin 1s ease-in-out infinite;
    margin-right: 8px;
    vertical-align: middle;
  }
`;
document.head.appendChild(style);

const checkPlayerMatches = async (id: string) => {
  try {
    if (!id) return null;
    return await fetchAllMatches("cs2", id);
  } catch (error) {
    return null;
  }
};

const checkAndCompareMatches = async (bannedUserId: string, nickName: string) => {
  try {
    const auth = getAuthInfo();
    if (!auth.id) return "ERROR";

    const currentPlayerMatches = await checkPlayerMatches(auth.id);
    if (!currentPlayerMatches) return "ERROR";
    
    const bannedPlayerMatches = await checkPlayerMatches(bannedUserId);
    if (!bannedPlayerMatches) return "ERROR";

    return findCommonMatches(currentPlayerMatches, bannedPlayerMatches);
  } catch (error) {
    return "ERROR";
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

      // Check for banned text across the whole notification body, not just first span
      const fullText = bodyElement?.textContent || element.textContent || "";
      const isBanned = fullText.includes("banned");

      // Prefer the <strong> inside Body for the display nickname
      const strongElement = bodyElement?.querySelector("strong") ?? element.querySelector("strong");
      const nickNameFromText = strongElement?.textContent?.trim();

      // If the player renamed after the report, the notification text shows the old name
      // but FACEIT's profile link href contains the current name — use that when available
      const profileAnchor = bodyElement?.querySelector<HTMLAnchorElement>('a[href*="/players/"]')
        ?? element.querySelector<HTMLAnchorElement>('a[href*="/players/"]');
      const nickNameFromUrl = profileAnchor?.pathname?.split("/players/")?.[1]?.split("/")?.[0];

      const nickName = nickNameFromUrl || nickNameFromText;

      if (!isBanned || !nickName) return;

      element.setAttribute("data-processed", "true");

      const button = document.createElement("button");
      button.innerHTML = '<span class="checkmate-spinner"></span>Searching...';
      button.style.borderRadius = "4px";
      button.style.height = "32px";
      button.style.padding = "8px 16px";
      button.style.border = "none";
      button.style.fontWeight = "bold";
      button.style.color = "white";
      button.style.cursor = "pointer";
      button.style.textTransform = "uppercase";
      button.style.backgroundColor = "rgb(100, 100, 100)"; // Dimmer color while searching
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.justifyContent = "center";
      button.disabled = true;
      button.style.marginTop = "10px";
      button.style.fontSize = "11px";

      button.addEventListener("mouseover", () => {
        if (!button.disabled) button.style.backgroundColor = "rgb(255, 120, 60)";
      });
      button.addEventListener("mouseout", () => {
        if (!button.disabled) button.style.backgroundColor = "rgb(255, 85, 0)";
      });

      bodyElement?.insertAdjacentElement("beforeend", button);

      try {
        // Try URL-based nickname first; if it fails and we have a different text nickname, retry with that
        let bannedUser = await getPlayerByNick(nickName);
        if ((!bannedUser || !bannedUser.id) && nickNameFromText && nickNameFromText !== nickName) {
          bannedUser = await getPlayerByNick(nickNameFromText);
        }
        const bannedUserId = bannedUser?.id || bannedUser?.guid || bannedUser?.player_id || bannedUser?.userId;

        if (!bannedUser || !bannedUserId) {
          button.innerHTML = "Player Not Found";
          button.style.backgroundColor = "rgb(60, 60, 60)";
          return;
        }

        const result = await checkAndCompareMatches(bannedUserId, nickName);

        if (result === "ERROR") {
          button.innerHTML = "Auth Error";
          button.style.backgroundColor = "rgb(60, 60, 60)";
        } else {
          const commonMatchId = (Array.isArray(result) && result.length > 0) ? getMatchId(result[0]) : null;

          if (commonMatchId) {
            button.innerHTML = "Match Details";
            button.disabled = false;
            button.style.backgroundColor = "rgb(255, 85, 0)"; // Bright Faceit orange
            button.onclick = () => window.open(`https://www.faceit.com/en/cs2/room/${commonMatchId}`, "_blank");
          } else {
            button.innerHTML = "No Matches Found";
            button.style.backgroundColor = "rgb(60, 60, 60)";
          }
        }
      } catch (error) {
        button.innerHTML = "Check Failed";
        button.style.backgroundColor = "rgb(60, 60, 60)";
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
