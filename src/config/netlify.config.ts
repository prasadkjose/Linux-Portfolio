/**
 * Netlify Serverless Function Utilities
 * Common logic shared across all Netlify serverless functions
 */

/**
 * Helper to create consistent API responses for Netlify Functions
 */
export const createNetlifyResponse = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  },
  body: JSON.stringify(body),
});

/**
 * Type definition for Netlify Function Event
 */
export interface NetlifyFunctionEvent {
  queryStringParameters?: Record<string, string | undefined>;
  httpMethod: string;
  headers: Record<string, string>;
  body: string | null;
}

/**
 * Standard error handler wrapper for Netlify Functions
 */
export const withErrorHandling = (
  handler: (event: NetlifyFunctionEvent) => Promise<unknown>
) => {
  return async (event: NetlifyFunctionEvent) => {
    try {
      return await handler(event);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      return createNetlifyResponse(500, { error: errorMessage });
    }
  };
};
