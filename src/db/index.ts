import { isServer } from "solid-js/web";
import { createStorage } from "unstorage";
import localStorageDriver from "unstorage/drivers/localstorage";
import memoryDriver from "unstorage/drivers/memory";
import sessionStorageDriver from "unstorage/drivers/session-storage";

export const storage = createStorage({
  driver: localStorageDriver({ base: "cn" }),
});

export const memoryStorage = createStorage({
  driver: memoryDriver(),
});

export function getStorage() {
  return !isServer ? storage : memoryStorage;
}
