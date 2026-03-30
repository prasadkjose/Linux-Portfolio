import { TabData } from "../../../layout/tabs/Tabs";
import HomeTab from "./HomeTab";
import ExperienceTab from "./ExperienceTab";
import EducationTab from "./EducationTab";
import ProjectsTab from "./ProjectsTab";
import RecommendationsTab from "./RecommendationsTab";

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
    {
      id: "projects",
      label: "Projects",
      content: ProjectsTab,
    },
    {
      id: "recomendations",
      label: "Recomendations",
      content: RecommendationsTab,
    },
  ],
};
