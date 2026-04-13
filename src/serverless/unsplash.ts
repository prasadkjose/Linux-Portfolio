/**
 * Helper to create consistent API responses
 */
const createResponse = (statusCode: number, body: unknown) => ({
  statusCode,
  body: JSON.stringify(body),
});

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

export async function handler(event: {
  queryStringParameters?: {
    path?: string;
    query?: string;
    page?: string;
    per_page?: string;
  };
}) {
  const {
    path,
    query,
    page,
    per_page: perPage,
  } = event.queryStringParameters || {};

  try {
    // Use environment variable from Netlify function environment, fall back if available
    const accessKey =
      process.env.UNSPLASH_ACCESS_KEY || process.env.VITE_UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      return createResponse(400, {
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
      return createResponse(200, data);
    }

    return createResponse(400, {
      error: "Invalid path parameter or missing required query",
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return createResponse(500, { error: errorMessage });
  }
}
