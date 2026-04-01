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
    console.warn(`[storage] Failed to set key "${key}":`, e);
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
    console.warn(`[storage] Failed to get key "${key}":`, e);
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
    console.warn(`[storage] Failed to remove key "${key}":`, e);
  }
};
