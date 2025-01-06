import pRetry from "p-retry";
import browser from "webextension-polyfill";

const BASE_URL = "https://api.faceit.com";

interface FetchOptions {
  headers?: Record<string, string>;
}

export const faceitAPI = async (
  path: string,
  token: string | undefined = undefined
): Promise<any | null> => {
  try {
    // Attempt to get the token from cookies if not provided
    token =
      token ||
      (
        await browser?.cookies.get({
          name: "t",
          url: "https://faceit.com",
        })
      )?.value;

    const options: FetchOptions = {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    // Retry logic for the API request
    const response = await pRetry(
      () =>
        fetch(`${BASE_URL}${path}`, options).then((res) => {
          if (res.status === 404) {
            // @ts-ignore
            throw new pRetry.AbortError(res.statusText);
          } else if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res;
        }),
      {
        retries: 3,
      }
    );

    const json = await response.json();
    return json;
  } catch (err) {
    console.error("Error fetching from FACEIT API:", err);
    return;
  }
};
