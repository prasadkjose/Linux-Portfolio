import logger from "./logger";

/**
 * Safe localStorage accessor that gracefully handles browser restrictions
 * @internal
 */
const safeLocalStorage = (() => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
})();

/**
 * Safe sessionStorage accessor that gracefully handles browser restrictions
 * @internal
 */
const safeSessionStorage = (() => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
})();

/**
 * Saves a value to localStorage with JSON serialization
 * @template T Type of value being stored
 * @param key Storage key identifier
 * @param value Value to serialize and store
 * @remarks Fails silently with console warning on errors (private mode, quota exceeded)
 */
export const setToLS = <T>(key: string, value: T): void => {
  try {
    safeLocalStorage?.setItem(key, JSON.stringify(value));
  } catch (e) {
    logger.warn(`[storage] Failed to set key "${key}":${e}`);
  }
};

/**
 * Retrieves and parses a value from localStorage
 * @template T Expected type of stored value
 * @param key Storage key identifier
 * @param fallback Default value returned if key not found or parsing fails
 * @returns Parsed stored value or fallback
 * @remarks Fails silently with console warning on errors
 */
export const getFromLS = <T>(key: string, fallback: T): T => {
  try {
    const raw = safeLocalStorage?.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    logger.warn(`[storage] Failed to get key "${key}":${e}`);
    return fallback;
  }
};

/**
 * Removes an item from localStorage
 * @param key Storage key identifier to remove
 * @remarks Fails silently with console warning on errors
 */
export const removeFromLS = (key: string): void => {
  try {
    safeLocalStorage?.removeItem(key);
  } catch (e) {
    logger.warn(`[storage] Failed to remove key "${key}"::${e}`);
  }
};

/**
 * Saves a value to sessionStorage with JSON serialization
 * @template T Type of value being stored
 * @param key Storage key identifier
 * @param value Value to serialize and store
 * @remarks Fails silently with console warning on errors (private mode, quota exceeded)
 */
export const setToSS = <T>(key: string, value: T): void => {
  try {
    safeSessionStorage?.setItem(key, JSON.stringify(value));
  } catch (e) {
    logger.warn(`[storage] Failed to set session key "${key}":${e}`);
  }
};

/**
 * Retrieves and parses a value from sessionStorage
 * @template T Expected type of stored value
 * @param key Storage key identifier
 * @param fallback Default value returned if key not found or parsing fails
 * @returns Parsed stored value or fallback
 * @remarks Fails silently with console warning on errors
 */
export const getFromSS = <T>(key: string, fallback: T): T => {
  try {
    const raw = safeSessionStorage?.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    logger.warn(`[storage] Failed to get session key "${key}":${e}`);
    return fallback;
  }
};

/**
 * Removes an item from sessionStorage
 * @param key Storage key identifier to remove
 * @remarks Fails silently with console warning on errors
 */
export const removeFromSS = (key: string): void => {
  try {
    safeSessionStorage?.removeItem(key);
  } catch (e) {
    logger.warn(`[storage] Failed to remove session key "${key}":${e}`);
  }
};
