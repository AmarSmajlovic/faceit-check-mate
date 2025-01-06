import browser from "webextension-polyfill";
import { faceitAPI } from "./utils/api";

// Check if the environment is development
// if (process.env.NODE_ENV === "development") {
//   browser.commands.onCommand.addListener((command: string) => {
//     if (command === "reload_extension") {
//       browser.runtime.reload();
//     }
//   });
// }

// @ts-ignore
browser.runtime.onMessage.addListener((message: any, _, sendResponse) => {
  if (!message) return false;

  const { path, token } = message;

  // Call the faceitAPI and send the response back
  faceitAPI(path, token)
    .then((res) => sendResponse(res))
    .catch((err) => {
      console.error(err);
      sendResponse(null); // Send null in case of error
    });

  return true;
});
