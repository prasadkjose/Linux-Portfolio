import { preload } from "react-dom";
import { IMAGES } from "../config/preloadResources.config";
import logger from "./logger";

export function preloadResources() {
  const rootPath = "/preload/";

  IMAGES.forEach(src => {
    preload(rootPath + src, { as: "image" });
  });
  logger.info("Preloaded Resource in preload/ dir.");
}
