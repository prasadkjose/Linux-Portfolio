import { preload } from "react-dom";
import { IMAGES } from "../config/preloadResources.config";
export function preloadResources() {
  const rootPath = "/preload/";

  IMAGES.forEach(src => {
    preload(rootPath + src, { as: "image" });
  });
}
