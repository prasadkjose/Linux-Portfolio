import { Repository } from "../services/githubService";

/**
 * Format GitHub repository data to match the HighlightCard component requirements
 *
 * @param repo - GitHub repository object from GitHubService
 * @returns Formatted data object compatible with HighlightCard
 */
export const formatGithubProjectData = (repo: Repository) => ({
  icon: "/icons/github-icon.svg",
  value: repo.name,
  description: repo.description || "No description available.",
  href: repo.url,
  style: {
    background:
      "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
    border: "1px solid rgba(136, 192, 208, 0.25)",
  },
});

/**
 * Format multiple GitHub repositories for display
 *
 * @param repos - Array of GitHub repository objects
 * @returns Array of formatted project data objects
 */
export const formatGithubProjectsData = (repos: Repository[]) => {
  return repos.map(formatGithubProjectData);
};

/**
 * Get fallback project data when GitHub API is unavailable
 *
 * @returns Array of fallback project data
 */
export const getFallbackGithubProjects = () => [
  {
    icon: "/icons/github-icon.svg",
    value: "GitHub Projects Unavailable",
    description:
      "Unable to load GitHub projects. Please check your internet connection or GitHub token configuration.",
    href: "https://github.com/prasadkjose",
    style: {
      background:
        "linear-gradient(135deg, rgba(191, 97, 106, 0.10) 0%, rgba(143, 86, 55, 0.10) 100%)",
      border: "1px solid rgba(191, 97, 106, 0.25)",
    },
  },
];
