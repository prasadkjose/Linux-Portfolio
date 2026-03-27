/**
 * GitHub Configuration
 *
 * This configuration provides the GitHub username and optional API token
 * for the GitHubService. The token should be set as an environment variable
 * in Netlify's build settings.
 */

import { GitHubServiceConfig } from "../services/githubService";
import { PERSONAL_DATA } from "./personalData.config";

/**
 * Get GitHub configuration from environment variables
 *
 * @returns GitHubServiceConfig object with username and optional token
 */
export const getGitHubConfig = (): GitHubServiceConfig => {
  // Vite environment variables are accessed through import.meta.env
  const username =
    import.meta.env.VITE_GITHUB_USERNAME || PERSONAL_DATA.personalInfo.uname;
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  return {
    username,
    token: token || undefined,
  };
};
