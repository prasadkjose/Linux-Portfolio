import { IconType } from "react-icons";

/**
 * Interface for individual entries in the personal data configuration
 */
export interface Data {
  /** URL to link to when the entry is clicked */
  href?: string;
  /** Path to the icon image to display */
  icon?: string | IconType;
  value: string;
  description?: string;
  style?: Record<string, string>;
}

/**
 * Interface for quick links configuration
 */
export interface QuickLink {
  href: string;
  value: string;
  style: Record<string, string>;
}

/**
 * Interface for personal information
 */
export interface PersonalInfo {
  name: string;
  title: string;
  profileImage: string;
  aboutDescription: string;
}

/**
 * Interface for the section of personal data
 */
export interface DataSection {
  value: string;
  description?: string;
  data?: Data[];
}

/**
 * Main interface for the PERSONAL_DATA configuration object
 */
export interface PersonalData {
  /** Professional experience section */
  experience: DataSection;
  /** Achievements and accomplishments section */
  achievements: DataSection;
  /** Education section */
  education: DataSection;
  /** Certifications section */
  certifications: DataSection;
  /** Personal information section */
  personalInfo: PersonalInfo;
  /** Quick links section */
  quickLinks: Data[];
  /** Skills overview section */
  skillsOverview: DataSection;
}
