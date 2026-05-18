var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/webextension-polyfill/dist/browser-polyfill.js
var require_browser_polyfill = __commonJS((exports, module) => {
  (function(global, factory) {
    if (typeof define === "function" && define.amd) {
      define("webextension-polyfill", ["module"], factory);
    } else if (typeof exports !== "undefined") {
      factory(module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod);
      global.browser = mod.exports;
    }
  })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports, function(module2) {
    if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
      throw new Error("This script should only be loaded in a browser extension.");
    }
    if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
      const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
      const wrapAPIs = (extensionAPIs) => {
        const apiMetadata = {
          alarms: {
            clear: {
              minArgs: 0,
              maxArgs: 1
            },
            clearAll: {
              minArgs: 0,
              maxArgs: 0
            },
            get: {
              minArgs: 0,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          bookmarks: {
            create: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getChildren: {
              minArgs: 1,
              maxArgs: 1
            },
            getRecent: {
              minArgs: 1,
              maxArgs: 1
            },
            getSubTree: {
              minArgs: 1,
              maxArgs: 1
            },
            getTree: {
              minArgs: 0,
              maxArgs: 0
            },
            move: {
              minArgs: 2,
              maxArgs: 2
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeTree: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          browserAction: {
            disable: {
              minArgs: 0,
              maxArgs: 1,
              fallbackToNoCallback: true
            },
            enable: {
              minArgs: 0,
              maxArgs: 1,
              fallbackToNoCallback: true
            },
            getBadgeBackgroundColor: {
              minArgs: 1,
              maxArgs: 1
            },
            getBadgeText: {
              minArgs: 1,
              maxArgs: 1
            },
            getPopup: {
              minArgs: 1,
              maxArgs: 1
            },
            getTitle: {
              minArgs: 1,
              maxArgs: 1
            },
            openPopup: {
              minArgs: 0,
              maxArgs: 0
            },
            setBadgeBackgroundColor: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: true
            },
            setBadgeText: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: true
            },
            setIcon: {
              minArgs: 1,
              maxArgs: 1
            },
            setPopup: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: true
            },
            setTitle: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: true
            }
          },
          browsingData: {
            remove: {
              minArgs: 2,
              maxArgs: 2
            },
            removeCache: {
              minArgs: 1,
              maxArgs: 1
            },
            removeCookies: {
              minArgs: 1,
              maxArgs: 1
            },
            removeDownloads: {
              minArgs: 1,
              maxArgs: 1
            },
            removeFormData: {
              minArgs: 1,
              maxArgs: 1
            },
            removeHistory: {
              minArgs: 1,
              maxArgs: 1
            },
            removeLocalStorage: {
              minArgs: 1,
              maxArgs: 1
            },
            removePasswords: {
              minArgs: 1,
              maxArgs: 1
            },
            removePluginData: {
              minArgs: 1,
              maxArgs: 1
            },
            settings: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          commands: {
            getAll: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          contextMenus: {
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeAll: {
              minArgs: 0,
              maxArgs: 0
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          cookies: {
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 1,
              maxArgs: 1
            },
            getAllCookieStores: {
              minArgs: 0,
              maxArgs: 0
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          devtools: {
            inspectedWindow: {
              eval: {
                minArgs: 1,
                maxArgs: 2,
                singleCallbackArg: false
              }
            },
            panels: {
              create: {
                minArgs: 3,
                maxArgs: 3,
                singleCallbackArg: true
              },
              elements: {
                createSidebarPane: {
                  minArgs: 1,
                  maxArgs: 1
                }
              }
            }
          },
          downloads: {
            cancel: {
              minArgs: 1,
              maxArgs: 1
            },
            download: {
              minArgs: 1,
              maxArgs: 1
            },
            erase: {
              minArgs: 1,
              maxArgs: 1
            },
            getFileIcon: {
              minArgs: 1,
              maxArgs: 2
            },
            open: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: true
            },
            pause: {
              minArgs: 1,
              maxArgs: 1
            },
            removeFile: {
              minArgs: 1,
              maxArgs: 1
            },
            resume: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            },
            show: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: true
            }
          },
          extension: {
            isAllowedFileSchemeAccess: {
              minArgs: 0,
              maxArgs: 0
            },
            isAllowedIncognitoAccess: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          history: {
            addUrl: {
              minArgs: 1,
              maxArgs: 1
            },
            deleteAll: {
              minArgs: 0,
              maxArgs: 0
            },
            deleteRange: {
              minArgs: 1,
              maxArgs: 1
            },
            deleteUrl: {
              minArgs: 1,
              maxArgs: 1
            },
            getVisits: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          i18n: {
            detectLanguage: {
              minArgs: 1,
              maxArgs: 1
            },
            getAcceptLanguages: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          identity: {
            launchWebAuthFlow: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          idle: {
            queryState: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          management: {
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            getSelf: {
              minArgs: 0,
              maxArgs: 0
            },
            setEnabled: {
              minArgs: 2,
              maxArgs: 2
            },
            uninstallSelf: {
              minArgs: 0,
              maxArgs: 1
            }
          },
          notifications: {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            create: {
              minArgs: 1,
              maxArgs: 2
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            getPermissionLevel: {
              minArgs: 0,
              maxArgs: 0
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          pageAction: {
            getPopup: {
              minArgs: 1,
              maxArgs: 1
            },
            getTitle: {
              minArgs: 1,
              maxArgs: 1
            },
            hide: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: true
            },
            setIcon: {
              minArgs: 1,
              maxArgs: 1
            },
            setPopup: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: true
            },
            setTitle: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: true
            },
            show: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: true
            }
          },
          permissions: {
            contains: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            request: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          runtime: {
            getBackgroundPage: {
              minArgs: 0,
              maxArgs: 0
            },
            getPlatformInfo: {
              minArgs: 0,
              maxArgs: 0
            },
            openOptionsPage: {
              minArgs: 0,
              maxArgs: 0
            },
            requestUpdateCheck: {
              minArgs: 0,
              maxArgs: 0
            },
            sendMessage: {
              minArgs: 1,
              maxArgs: 3
            },
            sendNativeMessage: {
              minArgs: 2,
              maxArgs: 2
            },
            setUninstallURL: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          sessions: {
            getDevices: {
              minArgs: 0,
              maxArgs: 1
            },
            getRecentlyClosed: {
              minArgs: 0,
              maxArgs: 1
            },
            restore: {
              minArgs: 0,
              maxArgs: 1
            }
          },
          storage: {
            local: {
              clear: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            managed: {
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              }
            },
            sync: {
              clear: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            }
          },
          tabs: {
            captureVisibleTab: {
              minArgs: 0,
              maxArgs: 2
            },
            create: {
              minArgs: 1,
              maxArgs: 1
            },
            detectLanguage: {
              minArgs: 0,
              maxArgs: 1
            },
            discard: {
              minArgs: 0,
              maxArgs: 1
            },
            duplicate: {
              minArgs: 1,
              maxArgs: 1
            },
            executeScript: {
              minArgs: 1,
              maxArgs: 2
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getCurrent: {
              minArgs: 0,
              maxArgs: 0
            },
            getZoom: {
              minArgs: 0,
              maxArgs: 1
            },
            getZoomSettings: {
              minArgs: 0,
              maxArgs: 1
            },
            goBack: {
              minArgs: 0,
              maxArgs: 1
            },
            goForward: {
              minArgs: 0,
              maxArgs: 1
            },
            highlight: {
              minArgs: 1,
              maxArgs: 1
            },
            insertCSS: {
              minArgs: 1,
              maxArgs: 2
            },
            move: {
              minArgs: 2,
              maxArgs: 2
            },
            query: {
              minArgs: 1,
              maxArgs: 1
            },
            reload: {
              minArgs: 0,
              maxArgs: 2
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeCSS: {
              minArgs: 1,
              maxArgs: 2
            },
            sendMessage: {
              minArgs: 2,
              maxArgs: 3
            },
            setZoom: {
              minArgs: 1,
              maxArgs: 2
            },
            setZoomSettings: {
              minArgs: 1,
              maxArgs: 2
            },
            update: {
              minArgs: 1,
              maxArgs: 2
            }
          },
          topSites: {
            get: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          webNavigation: {
            getAllFrames: {
              minArgs: 1,
              maxArgs: 1
            },
            getFrame: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          webRequest: {
            handlerBehaviorChanged: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          windows: {
            create: {
              minArgs: 0,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 2
            },
            getAll: {
              minArgs: 0,
              maxArgs: 1
            },
            getCurrent: {
              minArgs: 0,
              maxArgs: 1
            },
            getLastFocused: {
              minArgs: 0,
              maxArgs: 1
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          }
        };
        if (Object.keys(apiMetadata).length === 0) {
          throw new Error("api-metadata.json has not been included in browser-polyfill");
        }

        class DefaultWeakMap extends WeakMap {
          constructor(createItem, items = undefined) {
            super(items);
            this.createItem = createItem;
          }
          get(key) {
            if (!this.has(key)) {
              this.set(key, this.createItem(key));
            }
            return super.get(key);
          }
        }
        const isThenable = (value) => {
          return value && typeof value === "object" && typeof value.then === "function";
        };
        const makeCallback = (promise, metadata) => {
          return (...callbackArgs) => {
            if (extensionAPIs.runtime.lastError) {
              promise.reject(new Error(extensionAPIs.runtime.lastError.message));
            } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
              promise.resolve(callbackArgs[0]);
            } else {
              promise.resolve(callbackArgs);
            }
          };
        };
        const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
        const wrapAsyncFunction = (name, metadata) => {
          return function asyncFunctionWrapper(target, ...args) {
            if (args.length < metadata.minArgs) {
              throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
            }
            if (args.length > metadata.maxArgs) {
              throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
            }
            return new Promise((resolve, reject) => {
              if (metadata.fallbackToNoCallback) {
                try {
                  target[name](...args, makeCallback({
                    resolve,
                    reject
                  }, metadata));
                } catch (cbError) {
                  console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                  target[name](...args);
                  metadata.fallbackToNoCallback = false;
                  metadata.noCallback = true;
                  resolve();
                }
              } else if (metadata.noCallback) {
                target[name](...args);
                resolve();
              } else {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              }
            });
          };
        };
        const wrapMethod = (target, method, wrapper) => {
          return new Proxy(method, {
            apply(targetMethod, thisObj, args) {
              return wrapper.call(thisObj, target, ...args);
            }
          });
        };
        let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
        const wrapObject = (target, wrappers = {}, metadata = {}) => {
          let cache = Object.create(null);
          let handlers = {
            has(proxyTarget2, prop) {
              return prop in target || prop in cache;
            },
            get(proxyTarget2, prop, receiver) {
              if (prop in cache) {
                return cache[prop];
              }
              if (!(prop in target)) {
                return;
              }
              let value = target[prop];
              if (typeof value === "function") {
                if (typeof wrappers[prop] === "function") {
                  value = wrapMethod(target, target[prop], wrappers[prop]);
                } else if (hasOwnProperty(metadata, prop)) {
                  let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                  value = wrapMethod(target, target[prop], wrapper);
                } else {
                  value = value.bind(target);
                }
              } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                value = wrapObject(value, wrappers[prop], metadata[prop]);
              } else if (hasOwnProperty(metadata, "*")) {
                value = wrapObject(value, wrappers[prop], metadata["*"]);
              } else {
                Object.defineProperty(cache, prop, {
                  configurable: true,
                  enumerable: true,
                  get() {
                    return target[prop];
                  },
                  set(value2) {
                    target[prop] = value2;
                  }
                });
                return value;
              }
              cache[prop] = value;
              return value;
            },
            set(proxyTarget2, prop, value, receiver) {
              if (prop in cache) {
                cache[prop] = value;
              } else {
                target[prop] = value;
              }
              return true;
            },
            defineProperty(proxyTarget2, prop, desc) {
              return Reflect.defineProperty(cache, prop, desc);
            },
            deleteProperty(proxyTarget2, prop) {
              return Reflect.deleteProperty(cache, prop);
            }
          };
          let proxyTarget = Object.create(target);
          return new Proxy(proxyTarget, handlers);
        };
        const wrapEvent = (wrapperMap) => ({
          addListener(target, listener, ...args) {
            target.addListener(wrapperMap.get(listener), ...args);
          },
          hasListener(target, listener) {
            return target.hasListener(wrapperMap.get(listener));
          },
          removeListener(target, listener) {
            target.removeListener(wrapperMap.get(listener));
          }
        });
        const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
          if (typeof listener !== "function") {
            return listener;
          }
          return function onRequestFinished(req) {
            const wrappedReq = wrapObject(req, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            listener(wrappedReq);
          };
        });
        const onMessageWrappers = new DefaultWeakMap((listener) => {
          if (typeof listener !== "function") {
            return listener;
          }
          return function onMessage(message, sender, sendResponse) {
            let didCallSendResponse = false;
            let wrappedSendResponse;
            let sendResponsePromise = new Promise((resolve) => {
              wrappedSendResponse = function(response) {
                didCallSendResponse = true;
                resolve(response);
              };
            });
            let result;
            try {
              result = listener(message, sender, wrappedSendResponse);
            } catch (err) {
              result = Promise.reject(err);
            }
            const isResultThenable = result !== true && isThenable(result);
            if (result !== true && !isResultThenable && !didCallSendResponse) {
              return false;
            }
            const sendPromisedResult = (promise) => {
              promise.then((msg) => {
                sendResponse(msg);
              }, (error) => {
                let message2;
                if (error && (error instanceof Error || typeof error.message === "string")) {
                  message2 = error.message;
                } else {
                  message2 = "An unexpected error occurred";
                }
                sendResponse({
                  __mozWebExtensionPolyfillReject__: true,
                  message: message2
                });
              }).catch((err) => {
                console.error("Failed to send onMessage rejected reply", err);
              });
            };
            if (isResultThenable) {
              sendPromisedResult(result);
            } else {
              sendPromisedResult(sendResponsePromise);
            }
            return true;
          };
        });
        const wrappedSendMessageCallback = ({
          reject,
          resolve
        }, reply) => {
          if (extensionAPIs.runtime.lastError) {
            if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
              resolve();
            } else {
              reject(new Error(extensionAPIs.runtime.lastError.message));
            }
          } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
            reject(new Error(reply.message));
          } else {
            resolve(reply);
          }
        };
        const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }
          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }
          return new Promise((resolve, reject) => {
            const wrappedCb = wrappedSendMessageCallback.bind(null, {
              resolve,
              reject
            });
            args.push(wrappedCb);
            apiNamespaceObj.sendMessage(...args);
          });
        };
        const staticWrappers = {
          devtools: {
            network: {
              onRequestFinished: wrapEvent(onRequestFinishedWrappers)
            }
          },
          runtime: {
            onMessage: wrapEvent(onMessageWrappers),
            onMessageExternal: wrapEvent(onMessageWrappers),
            sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
              minArgs: 1,
              maxArgs: 3
            })
          },
          tabs: {
            sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
              minArgs: 2,
              maxArgs: 3
            })
          }
        };
        const settingMetadata = {
          clear: {
            minArgs: 1,
            maxArgs: 1
          },
          get: {
            minArgs: 1,
            maxArgs: 1
          },
          set: {
            minArgs: 1,
            maxArgs: 1
          }
        };
        apiMetadata.privacy = {
          network: {
            "*": settingMetadata
          },
          services: {
            "*": settingMetadata
          },
          websites: {
            "*": settingMetadata
          }
        };
        return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
      };
      module2.exports = wrapAPIs(chrome);
    } else {
      module2.exports = globalThis.browser;
    }
  });
});

// src/http/index.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill(), 1);

// src/utils/user.ts
var getCurrentUserId = () => {
  try {
    const legacyData = localStorage.getItem("C_UCURRENT_USER.data.CURRENT_USER");
    if (legacyData) {
      const legacyId = JSON.parse(legacyData)?.value?.currentUser?.id;
      if (legacyId)
        return legacyId;
    }
    const authData = localStorage.getItem("prefetched-auth");
    if (authData) {
      const auth = JSON.parse(authData);
      if (auth?.session?.entity?.id)
        return auth.session.entity.id;
    }
    for (const key in localStorage) {
      try {
        const isId1 = key.includes("ab.storage.userId.");
        const isId2 = key.includes("ab.storage.attributes.");
        const isId3 = key.includes("ab.storage.events.");
        let id = null;
        const item = localStorage.getItem(key);
        if (!item)
          continue;
        if (isId1) {
          id = JSON.parse(item)?.v?.g;
        } else if (isId2) {
          id = Object.keys(JSON.parse(item)?.v || {})?.[0];
        } else if (isId3) {
          id = JSON.parse(item)?.v?.[0]?.u;
        }
        if (id)
          return id;
      } catch (e) {
        continue;
      }
    }
    const betaId = _getBetaUserId();
    if (betaId)
      return betaId;
  } catch (error) {
    console.error("Error getting current user ID:", error);
  }
  return null;
};
var getAuthInfo = () => {
  try {
    let token = null;
    let id = null;
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
var _getBetaUserId = () => {
  const cookies = document.cookie.split(";");
  const cookieContent = cookies.find((cookie) => cookie?.trim()?.startsWith("ab.storage.userId"))?.split("=")?.[1];
  if (cookieContent) {
    const userId = JSON.parse(decodeURIComponent(cookieContent))?.g;
    return userId;
  }
};
var getMatchId = (match) => {
  return match.matchId || match._id?.matchId || match.match_id;
};
var findCommonMatches = (matches1, matches2) => {
  if (!Array.isArray(matches1) || !Array.isArray(matches2)) {
    return [];
  }
  const matchIds1 = new Set(matches1.map((match) => getMatchId(match)).filter(Boolean));
  return matches2.filter((match) => {
    const id = getMatchId(match);
    return id && matchIds1.has(id);
  });
};

// node_modules/mimic-fn/index.js
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === undefined || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/\n${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}

// node_modules/p-memoize/dist/index.js
var cacheStore = new WeakMap;
function pMemoize(fn, { cacheKey = ([firstArgument]) => firstArgument, cache = new Map } = {}) {
  const promiseCache = new Map;
  const memoized = function(...arguments_) {
    const key = cacheKey(arguments_);
    if (promiseCache.has(key)) {
      return promiseCache.get(key);
    }
    const promise = (async () => {
      try {
        if (cache && await cache.has(key)) {
          return await cache.get(key);
        }
        const promise2 = fn.apply(this, arguments_);
        const result = await promise2;
        try {
          return result;
        } finally {
          if (cache) {
            await cache.set(key, result);
          }
        }
      } finally {
        promiseCache.delete(key);
      }
    })();
    promiseCache.set(key, promise);
    return promise;
  };
  mimicFunction(memoized, fn, {
    ignoreNonConfigurable: true
  });
  cacheStore.set(memoized, cache);
  return memoized;
}

// src/http/index.ts
var CACHE_TIME = 60000;
var playerMatchResults = {};
var activeFetches = {};
var getPlayerMatches = (game, playerId, to) => fetchAPIMemoized(`/stats/v1/stats/time/users/${playerId}/games/${game}?to=${to}`);
var getPlayerByNickname = (nickname) => fetchAPIMemoized(`/users/v1/nicknames/${nickname}`);
var fetchAllMatches = async (game, playerId, matchLimit = 6000, recursionLimit = 300, recursionLevel = 0, to = Date.now()) => {
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
  const runFetch = async (currentTo, currentLevel) => {
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
          if (!match || !id || matchIds.has(id))
            return false;
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
var fetchAPI = async (path) => {
  if (typeof path !== "string")
    return null;
  try {
    const auth = getAuthInfo();
    const response = await import_webextension_polyfill.default.runtime?.sendMessage({ path, token: auth.token });
    const { result, code, payload } = response ?? {};
    if (result && result.toUpperCase() !== "OK" || code && code.toUpperCase() !== "OPERATION-OK") {
      throw new Error(JSON.stringify({ result, code, payload }));
    }
    return payload || response;
  } catch (err) {
    console.error("Error fetching API:", err);
    return null;
  }
};
var fetchAPIMemoized = pMemoize(fetchAPI, {
  maxAge: CACHE_TIME
});

// src/content.ts
var style = document.createElement("style");
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
var checkPlayerMatches = async (id) => {
  try {
    if (!id)
      return null;
    return await fetchAllMatches("cs2", id);
  } catch (error) {
    return null;
  }
};
var checkAndCompareMatches = async (bannedUserId, nickName) => {
  try {
    const auth = getAuthInfo();
    if (!auth.id)
      return "ERROR";
    const currentPlayerMatches = await checkPlayerMatches(auth.id);
    if (!currentPlayerMatches)
      return "ERROR";
    const bannedPlayerMatches = await checkPlayerMatches(bannedUserId);
    if (!bannedPlayerMatches)
      return "ERROR";
    return findCommonMatches(currentPlayerMatches, bannedPlayerMatches);
  } catch (error) {
    return "ERROR";
  }
};
var getPlayerByNick = async (nick) => {
  try {
    return await getPlayerByNickname(nick);
  } catch (error) {
    return null;
  }
};
var observer = new MutationObserver(async () => {
  const elements = document.querySelectorAll('[class*="NotificationContainer"]');
  elements.forEach(async (element) => {
    if (!element.hasAttribute("data-processed")) {
      const bodyElement = element.querySelector('[class*="Body"]');
      const fullText = bodyElement?.textContent || element.textContent || "";
      const isBanned = fullText.includes("banned");
      const strongElement = bodyElement?.querySelector("strong") ?? element.querySelector("strong");
      const nickNameFromText = strongElement?.textContent?.trim();
      const profileAnchor = bodyElement?.querySelector('a[href*="/players/"]') ?? element.querySelector('a[href*="/players/"]');
      const nickNameFromUrl = profileAnchor?.pathname?.split("/players/")?.[1]?.split("/")?.[0];
      const nickName = nickNameFromUrl || nickNameFromText;
      if (!isBanned || !nickName)
        return;
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
      button.style.backgroundColor = "rgb(100, 100, 100)";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.justifyContent = "center";
      button.disabled = true;
      button.style.marginTop = "10px";
      button.style.fontSize = "11px";
      button.addEventListener("mouseover", () => {
        if (!button.disabled)
          button.style.backgroundColor = "rgb(255, 120, 60)";
      });
      button.addEventListener("mouseout", () => {
        if (!button.disabled)
          button.style.backgroundColor = "rgb(255, 85, 0)";
      });
      bodyElement?.insertAdjacentElement("beforeend", button);
      try {
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
          const commonMatchId = Array.isArray(result) && result.length > 0 ? getMatchId(result[0]) : null;
          if (commonMatchId) {
            button.innerHTML = "Match Details";
            button.disabled = false;
            button.style.backgroundColor = "rgb(255, 85, 0)";
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
