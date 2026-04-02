import theme from "../styles/themes";
import { DefaultTheme } from "styled-components";

export const IMAGES = ["photo1.jpg", "prasadkjose-full.svg", "favicon.svg"];

export const CDN_IMAGES: string[] = [];

CDN_IMAGES.push(
  ...Object.values(theme)
    .map((t: DefaultTheme) => t?.backgroundImage)
    .filter((bg): bg is string => Boolean(bg))
);
