import {
  createNetlifyResponse,
  NetlifyFunctionEvent,
  withErrorHandling,
} from "../config/netlify.config";

/**
 * Execute Unsplash API request with common error handling
 */
const executeUnsplashRequest = async (
  accessKey: string,
  endpoint: string
): Promise<unknown> => {
  const res = await fetch(`https://api.unsplash.com${endpoint}`, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Unsplash API error: ${res.status}`);
  }

  return res.json();
};

const unsplashHandler = async (event: NetlifyFunctionEvent) => {
  const {
    path,
    query,
    page,
    per_page: perPage,
  } = event.queryStringParameters || {};

  // Use environment variable from Netlify function environment, fall back if available
  const accessKey =
    process.env.UNSPLASH_ACCESS_KEY || process.env.VITE_UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return createNetlifyResponse(400, {
      error: "Unsplash access key not configured",
    });
  }

  if (path === "search/photos" && query) {
    let endpoint = `/search/photos?query=${encodeURIComponent(query)}`;

    if (page) {
      endpoint += `&page=${page}`;
    }

    if (perPage) {
      endpoint += `&per_page=${perPage}`;
    }

    const data = await executeUnsplashRequest(accessKey, endpoint);
    return createNetlifyResponse(200, data);
  }

  return createNetlifyResponse(400, {
    error: "Invalid path parameter or missing required query",
  });
};

export const handler = withErrorHandling(unsplashHandler);
