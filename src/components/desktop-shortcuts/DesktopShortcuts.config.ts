import { PERSONAL_DATA } from "../../config/personalData.config";

export const SHORTCUTS = [
  ...PERSONAL_DATA.personalInfo.socials,
  // Any other shortcuts can be registered
  {
    value: "Email",
    href: "/email",
  },
];
