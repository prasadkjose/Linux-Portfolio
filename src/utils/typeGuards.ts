import { ExtendedHTMLElement } from "../types/window";

export const isFullscreenElement = (el: Element): boolean => {
  return el instanceof Element;
};

export const isFullscreenAPIAvailable = (): boolean => {
  return !!(
    document.documentElement.requestFullscreen ||
    (document.documentElement as ExtendedHTMLElement).webkitRequestFullscreen ||
    (document.documentElement as ExtendedHTMLElement).msRequestFullscreen
  );
};

export const isMobileDevice = (): boolean => {
  return window.matchMedia("(max-width: 768px)").matches;
};

/**
 * Generic type-safe property picker utility, ideally to pick serializble properties
 * Extracts specified keys from any object with full type safety
 * @
 */
export const propertyPicker = <T, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Pick<T, K> => {
  return keys.reduce(
    (acc, key) => {
      return { ...acc, [key]: obj[key] };
    },
    {} as Pick<T, K>
  );
};
