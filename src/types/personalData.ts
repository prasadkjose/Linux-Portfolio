/**
 * Interface for individual entries in the personal data configuration
 */
export interface Data {
  /** URL to link to when the entry is clicked */
  href?: string;
  /** Path to the icon image to display */
  icon?: string;
  value: string;
  description?: string;
  style?: Record<string, string>;
}

/**
 * Interface for the section of personal data
 */
export interface DataSection {
  value: string;
  description?: string;
  data: Data[];
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
}
