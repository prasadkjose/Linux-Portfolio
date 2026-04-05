import { Repository, ClosedIssue } from "../services/githubService";
import { NewFeature } from "../layout/taskbar/config/features.config";

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

/**
 * Transform closed GitHub issue to NewFeature type for announcement panel
 *
 * @param issue - Closed issue object from GitHub API
 * @returns Formatted NewFeature object compatible with announcement panel
 */
/**
 * Map issue title prefix to appropriate icon type and clean title
 * Uses string splice for efficient single-pass processing
 */
const parseIssueTitle = (
  title: string
): { cleanedTitle: string; icon: "fix" | "improvement" | "new" } => {
  const prefixMap = [
    { prefix: "Fix:", icon: "fix" as const },
    { prefix: "Refactor:", icon: "improvement" as const },
    { prefix: "Feature:", icon: "new" as const },
  ];

  for (const { prefix, icon } of prefixMap) {
    if (title.startsWith(prefix)) {
      return {
        cleanedTitle: title.slice(prefix.length).trim(),
        icon,
      };
    }
  }

  const colonIndex = title.indexOf(":");
  if (colonIndex > 0 && colonIndex < 20) {
    return {
      cleanedTitle: title.slice(colonIndex + 1).trim(),
      icon: "fix",
    };
  }

  return { cleanedTitle: title, icon: "fix" };
};

export const transformClosedIssueToNewFeature = (
  issue: ClosedIssue
): NewFeature => {
  const { cleanedTitle, icon } = parseIssueTitle(issue.title);

  return {
    id: `issue-${issue.number}`,
    title: cleanedTitle,
    icon,
    description: `Closed issue with ${issue.comments.totalCount} comments`,
    date: new Date(issue.closedAt).toLocaleDateString(),
    href: issue.url,
  };
};

/**
 * Transform array of closed issues to NewFeature array
 *
 * @param issues - Array of closed GitHub issues
 * @returns Array of formatted NewFeature objects
 */
export const transformClosedIssuesToNewFeatures = (
  issues: ClosedIssue[]
): NewFeature[] => {
  return issues.map(transformClosedIssueToNewFeature);
};
