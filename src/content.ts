import { fetchAllMatches, getPlayerByNickname } from "./http";
import { findCommonMatches, getCurrentUserId } from "./utils/user";

const checkPlayerMatches = async (id: string) => {
  try {
    if (!id) {
      return null;
    }

    const matches = await fetchAllMatches("cs2", id);

    if (!matches) {
      return null;
    }

    return matches;
  } catch (error) {
    return null;
  }
};

// Function to compare matches and update the DOM
const checkAndCompareMatches = async (bannedUserId: string) => {
  try {
    const currentUserId = getCurrentUserId();

    // Fetch matches for both players asynchronously
    const currentPlayerMatches = await checkPlayerMatches(currentUserId);
    const bannedPlayerMatches = await checkPlayerMatches(bannedUserId);
    console.log(bannedPlayerMatches, bannedUserId);

    if (!currentPlayerMatches || !bannedPlayerMatches) {
      return;
    }

    const commonMatches = findCommonMatches(
      currentPlayerMatches,
      bannedPlayerMatches
    );
    return commonMatches;
  } catch (error) {
    throw error;
  }
};

const getPlayerByNick = async (nick: string) => {
  try {
    const data = await getPlayerByNickname(nick);
    return data;
  } catch (error) {}
};
// This function will be responsible for handling the button inside each notification
console.log("Observer started...");

const observer = new MutationObserver(async () => {
  const elements = document.querySelectorAll(
    '[class*="NotificationContainer"]'
  );

  elements.forEach(async (element) => {
    // Check if the element is already processed
    if (!element.hasAttribute("data-processed")) {
      const bodyElement = element.querySelector('[class*="Body"]');
      const strongElement = bodyElement?.querySelector("strong");
      const spanElement = bodyElement?.querySelector("span");
      if (!spanElement?.textContent?.includes("banned")) {
        return;
      }

      const nickName = strongElement?.textContent?.trim();

      if (nickName) {
        // Mark the element as processed to prevent reprocessing
        element.setAttribute("data-processed", "true");

        // Create the "Check Match" button and set the loading state
        const button = document.createElement("button");
        button.textContent = "Loading..."; // Set initial text to "Loading..."
        button.style.borderRadius = "4px";
        button.style.height = "32px";
        button.style.padding = "8px 24px";
        button.style.border = "none";
        button.style.fontWeight = "bold";
        button.style.color = "white";
        button.style.cursor = "pointer";
        button.style.textTransform = "uppercase";
        button.style.backgroundColor = "rgb(255, 85, 0)";
        button.disabled = true; // Disable the button while loading

        button.addEventListener("mouseover", () => {
          // Set a lighter background color on hover
          button.style.backgroundColor = "rgb(255, 120, 60)"; // Adjust to a lighter shade
        });

        button.addEventListener("mouseout", () => {
          // Reset the background color when not hovering
          button.style.backgroundColor = "rgb(255, 85, 0)";
        });
        button.style.marginTop = "10px"; // Optional: Style the button

        // Insert the button as the last child of the Body element
        bodyElement?.insertAdjacentElement("beforeend", button);

        try {
          // Call the API to get the banned player details
          const bannedUser = await getPlayerByNick(nickName);
          
          if (!bannedUser || !bannedUser.id) {
            console.error("Could not find banned user or ID for:", nickName);
            button.textContent = "User Not Found";
            button.disabled = true;
            return;
          }

          console.log("Banned User ID:", bannedUser.id);

          // Fetch common matches (this may take some time)
          const commonMatches = await checkAndCompareMatches(bannedUser.id);
          console.log("Common matches found:", commonMatches);

          // Ensure commonMatches is not empty and contains a valid matchId
          const commonMatchId = commonMatches?.[0]?.matchId;

          if (commonMatchId) {
            const hrefLink = `https://www.faceit.com/en/cs2/room/${commonMatchId}`;

            // Update button text and behavior
            button.textContent = "Match Details"; // Set the button's label
            button.disabled = false; // Enable the button
            button.onclick = () => {
              // Open the link in a new tab
              window.open(hrefLink, "_blank");
            };
          } else {
            // If no matches were found, update the button accordingly
            console.log("No common matches found for user:", nickName);
            button.textContent = "No Matches Found";
            button.disabled = true;
          }
        } catch (error) {
          // If there's an error in fetching matches, handle it
          console.error("Error processing notification for", nickName, ":", error);
          button.textContent = "Error";
          button.disabled = true;
        }
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
