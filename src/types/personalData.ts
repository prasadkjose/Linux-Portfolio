/**
 * Interface for individual experience entries in the personal data configuration
 */
export interface Data {
  /** URL to link to when the experience entry is clicked */
  href?: string;
  /** Path to the icon image to display for this experience */
  icon?: string;
  /** The company or organization name */
  value: string;
  /** Detailed description of the role and responsibilities */
  description?: string;
  style?: Record<string, string>;
}

/**
 * Interface for the experience section of personal data
 */
export interface DataSection {
  /** Title for the experience section */
  value: string;
  /** Description text for the experience section */
  description?: string;
  /** Array of experience entries */
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
  education: DataSection;
  certifications: DataSection;
}
