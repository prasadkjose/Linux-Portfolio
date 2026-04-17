import logger from "../utils/logger";
import type { NetlifyFunctionEvent } from "../config/netlify.config";

export interface UnsplashPhoto {
  id: string;
  description: string | null;
  altDescription: string | null;
  url: string;
  thumbUrl: string;
  regularUrl: string;
  width: number;
  height: number;
  photographer: {
    name: string;
    username: string;
    profileUrl: string;
  };
}

export interface UnsplashSearchResult {
  total: number;
  totalPages: number;
  results: UnsplashPhoto[];
}

export interface UnsplashServiceConfig {
  query?: string;
  perPage?: number;
}

class UnsplashService {
  private config: UnsplashServiceConfig;

  constructor(config: UnsplashServiceConfig = {}) {
    this.config = {
      query: config.query || "nature",
      perPage: config.perPage || 10,
    };
  }

  /**
   * Call Netlify serverless function
   * In development environment calls handler directly
   */
  private async call(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<unknown> {
    // Call directly in local dev environment
    if (import.meta.env.DEV && endpoint === "unsplash") {
      const { handler } = await import("../serverless/unsplash");

      const event: NetlifyFunctionEvent = {
        queryStringParameters: params,
        httpMethod: "GET",
        headers: {},
        body: null,
      };

      const response = (await handler(event)) as {
        statusCode: number;
        body: string;
      };

      if (response.statusCode >= 400) {
        throw new Error(`API error: ${response.statusCode}`);
      }

      return JSON.parse(response.body);
    }

    // Production: use fetch to call Netlify function
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/.netlify/functions/${endpoint}?${query}`);

    if (!res.ok) {
      throw new Error("API error");
    }

    return res.json();
  }

  /**
   * Search photos from Unsplash
   */
  async searchPhotos(
    searchQuery?: string,
    page?: number
  ): Promise<UnsplashSearchResult> {
    try {
      const params: Record<string, string> = {
        path: "search/photos",
        query: searchQuery || this.config.query || "nature",
        page: page?.toString() || "1",
        // eslint-disable-next-line camelcase
        per_page: (this.config.perPage ?? 10).toString(),
        orientation: "landscape",
      };

      const data = await this.call("unsplash", params);

      if (!data || typeof data !== "object") {
        throw new Error("Invalid data format received from Unsplash API");
      }

      const response = data as {
        total: number;
        total_pages: number;
        results: Array<{
          id: string;
          description: string | null;
          alt_description: string | null;
          urls: {
            raw: string;
            full: string;
            regular: string;
            small: string;
            thumb: string;
          };
          width: number;
          height: number;
          user: {
            name: string;
            username: string;
            links: {
              html: string;
            };
          };
        }>;
      };

      return {
        total: response.total,
        totalPages: response.total_pages,
        results: response.results.map(photo => ({
          id: photo.id,
          description: photo.description,
          altDescription: photo.alt_description,
          url: photo.urls.regular,
          thumbUrl: photo.urls.thumb,
          regularUrl: photo.urls.regular,
          width: photo.width,
          height: photo.height,
          photographer: {
            name: photo.user.name,
            username: photo.user.username,
            profileUrl: photo.user.links.html,
          },
        })),
      };
    } catch (error) {
      this.handleError(error, "Failed to search photos");
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

export default UnsplashService;
