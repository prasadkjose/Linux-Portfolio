import { TabData } from "../../layout/tabs/Tabs";
import HomeTab from "../../components/welcome-tabs/HomeTab";
import ExperienceTab from "../../components/welcome-tabs/ExperienceTab";
import EducationTab from "../../components/welcome-tabs/EducationTab";

export const TAB_CONFIGS: Record<string, TabData[]> = {
  welcome: [
    {
      id: "home",
      label: "Home",
      content: HomeTab,
    },
    {
      id: "experience",
      label: "Experience",
      content: ExperienceTab,
    },
    {
      id: "education",
      label: "Education & Certifications",
      content: EducationTab,
    },
  ],
};
