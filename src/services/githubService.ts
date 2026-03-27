import axios from "axios";
import logger from "../utils/logger";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export interface Repository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
}

export interface GitHubServiceConfig {
  username: string;
  token?: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
    path: string[];
  }>;
}

class GitHubService {
  private config: GitHubServiceConfig;
  private axiosInstance: ReturnType<typeof axios.create>;

  constructor(config: GitHubServiceConfig) {
    this.config = config;

    this.axiosInstance = axios.create({
      baseURL: GITHUB_GRAPHQL_API,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Linux-Portfolio/1.0",
      },
    });

    // Add authentication if token is provided
    if (this.config.token) {
      this.axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${this.config.token}`;
    }
  }

  /**
   * Execute GraphQL query
   */
  private async executeQuery<T>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.post<GraphQLResponse<T>>("", {
        query,
        variables,
      });

      if (response.data.errors && response.data.errors.length > 0) {
        const errorMessages = response.data.errors
          .map(err => err.message)
          .join(", ");
        throw new Error(`GraphQL errors: ${errorMessages}`);
      }

      if (!response.data.data) {
        throw new Error("No data returned from GraphQL query");
      }

      return response.data.data;
    } catch (error) {
      this.handleError(error, "GraphQL query failed");
      throw error;
    }
  }

  /**
   * Get pinned repositories for the user
   */
  async getPinnedRepositories(): Promise<Repository[]> {
    const query = `
      query {
        user(login: "${this.config.username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
              }
            }
          }
        }
      }
    `;

    const result = await this.executeQuery<{
      user: {
        pinnedItems: {
          nodes: Repository[];
        };
      };
    }>(query);

    return result.user.pinnedItems.nodes;
  }

  /**
   * Handle API errors
   */
  private handleError(error: unknown, context: string): void {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || "Unknown error";

        logger.error(`${context}: HTTP ${status} - ${message}`);

        // Handle specific error cases
        if (status === 401) {
          throw new Error(
            `${context}: Authentication failed. Please check your token.`
          );
        } else if (status === 403) {
          throw new Error(
            `${context}: Rate limit exceeded or access forbidden.`
          );
        } else if (status === 404) {
          throw new Error(`${context}: Resource not found.`);
        }
      } else if (error.request) {
        // Network error
        logger.error(`${context}: Network error - ${error.message}`);
        throw new Error(
          `${context}: Network error. Please check your internet connection.`
        );
      }
    }

    // Other error
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error(`${context}: ${errorMessage}`);
    throw new Error(`${context}: ${errorMessage}`);
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<GitHubServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };

    // Update axios instance if token changed
    if (newConfig.token !== undefined) {
      if (newConfig.token) {
        this.axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newConfig.token}`;
      } else {
        delete this.axiosInstance.defaults.headers.common["Authorization"];
      }
    }
  }
}

export default GitHubService;
