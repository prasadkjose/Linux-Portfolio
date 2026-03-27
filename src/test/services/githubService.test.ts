import axios from "axios";
import GitHubService, { Repository } from "../../services/githubService";
import { vi } from "vitest";

// Mock axios
vi.mock("axios");
const mockedAxios = axios as unknown;

describe("GitHubService", () => {
  let service: GitHubService;
  const mockConfig = {
    username: "testuser",
    token: "test-token",
  };

  beforeEach(() => {
    service = new GitHubService(mockConfig);
    vi.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create service with required config", () => {
      const serviceWithoutToken = new GitHubService({ username: "test" });
      expect(serviceWithoutToken).toBeDefined();
    });

    it("should set authorization header when token is provided", () => {
      expect(
        service["axiosInstance"].defaults.headers.common["Authorization"]
      ).toBe("Bearer test-token");
    });

    it("should not set authorization header when token is not provided", () => {
      const serviceWithoutToken = new GitHubService({ username: "test" });
      expect(
        serviceWithoutToken["axiosInstance"].defaults.headers.common[
          "Authorization"
        ]
      ).toBeUndefined();
    });
  });

  describe("getPinnedRepositories", () => {
    it("should fetch pinned repositories successfully", async () => {
      const mockPinnedRepos: Repository[] = [
        {
          name: "repo1",
          description: "Test repo 1",
          url: "https://github.com/testuser/repo1",
          stargazerCount: 10,
          forkCount: 5,
        },
        {
          name: "repo2",
          description: "Test repo 2",
          url: "https://github.com/testuser/repo2",
          stargazerCount: 20,
          forkCount: 8,
        },
      ];

      mockedAxios.post.mockResolvedValue({
        data: {
          data: {
            user: {
              pinnedItems: {
                nodes: mockPinnedRepos,
              },
            },
          },
        },
      });

      const result = await service.getPinnedRepositories();

      expect(result).toEqual(mockPinnedRepos);
      expect(mockedAxios.post).toHaveBeenCalledWith("", {
        query: expect.stringContaining('user(login: "testuser")'),
        variables: undefined,
      });
    });

    it("should handle GraphQL errors", async () => {
      mockedAxios.post.mockResolvedValue({
        data: {
          errors: [
            {
              message: "Resource not found",
              locations: [{ line: 1, column: 1 }],
              path: ["user"],
            },
          ],
        },
      });

      await expect(service.getPinnedRepositories()).rejects.toThrow(
        "GraphQL errors: Resource not found"
      );
    });

    it("should handle network errors", async () => {
      mockedAxios.post.mockRejectedValue(new Error("Network Error"));

      await expect(service.getPinnedRepositories()).rejects.toThrow(
        "GraphQL query failed: Network error. Please check your internet connection."
      );
    });

    it("should handle authentication errors", async () => {
      mockedAxios.post.mockRejectedValue({
        response: {
          status: 401,
          data: { message: "Bad credentials" },
        },
      });

      await expect(service.getPinnedRepositories()).rejects.toThrow(
        "GraphQL query failed: GraphQL query failed: Authentication failed. Please check your token."
      );
    });

    it("should handle rate limit errors", async () => {
      mockedAxios.post.mockRejectedValue({
        response: {
          status: 403,
          data: { message: "API rate limit exceeded" },
        },
      });

      await expect(service.getPinnedRepositories()).rejects.toThrow(
        "GraphQL query failed: GraphQL query failed: Rate limit exceeded or access forbidden."
      );
    });
  });

  describe("updateConfig", () => {
    it("should update configuration and authorization header", () => {
      service.updateConfig({ token: "new-token" });

      expect(
        service["axiosInstance"].defaults.headers.common["Authorization"]
      ).toBe("Bearer new-token");
    });

    it("should remove authorization header when token is set to undefined", () => {
      service.updateConfig({ token: undefined });

      expect(
        service["axiosInstance"].defaults.headers.common["Authorization"]
      ).toBeUndefined();
    });
  });
});
