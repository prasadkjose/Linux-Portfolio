import logger from "../utils/logger";

export interface Repository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
}

export interface GitHubServiceConfig {
  username: string;
}

class GitHubService {
  private config: GitHubServiceConfig;

  constructor(config: GitHubServiceConfig) {
    this.config = config;
  }

  /**
   * Call Netlify serverless function
   */
  private async call(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<unknown> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/.netlify/functions/${endpoint}?${query}`);

    if (!res.ok) {
      throw new Error("API error");
    }

    return res.json();
  }

  /**
   * Get pinned repositories for the user
   */
  async getPinnedRepositories(): Promise<Repository[]> {
    try {
      const data = await this.call("github", {
        path: "pinned-repos",
        username: this.config.username,
      });

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from GitHub API");
      }

      return data.map(
        (repo: {
          name: string;
          description: string | null;
          url: string;
          stargazers_count: number;
          forks_count: number;
        }) => ({
          name: repo.name,
          description: repo.description,
          url: repo.url,
          stargazerCount: repo.stargazers_count || 0,
          forkCount: repo.forks_count || 0,
        })
      );
    } catch (error) {
      this.handleError(error, "Failed to fetch pinned repositories");
      throw error;
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: unknown, context: string): void {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error(`${context}: ${errorMessage}`);
    throw new Error(`${context}: ${errorMessage}`);
  }
}

export default GitHubService;
