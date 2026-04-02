import { preload } from "react-dom";
import { IMAGES, CDN_IMAGES } from "../config/preloadResources.config";
import logger from "./logger";
import { DefaultTheme } from "styled-components/dist/types";

const ROOT = "/preload/";

export function preloadResources(theme: DefaultTheme) {
  IMAGES.forEach(src => {
    preload(ROOT + src, { as: "image" });
  });
  logger.info("Preloaded Resource in preload/ dir.");

  CDN_IMAGES.forEach(src => {
    preload(src, { as: "image" });
  });
  logger.info("Preloaded Resources from CDN.");

  if (theme.backgroundImage) {
    preload(theme.backgroundImage, { as: "image" });
    logger.info("Preloaded theme specific Resources.");
  }
}
