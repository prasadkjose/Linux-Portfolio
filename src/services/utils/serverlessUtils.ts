/**
 * Serverless Function Utilities
 * Shared logic for calling Netlify serverless functions
 * Handles both local development direct handler calls and production fetch requests
 */

import {
  NETLIFY_SERVERLESS_PATH,
  NetlifyFunctionEvent,
} from "../../config/netlify.config";

/**
 * Call Netlify serverless function
 * Automatically uses direct handler import in DEV mode, network fetch in production
 * @param endpoint Serverless function endpoint name
 * @param params Query string parameters
 * @param importPath Optional custom import path for dev mode handler (defaults to ../serverless/{endpoint})
 * @returns Parsed JSON response
 */
export const callServerlessFunction = async <T = unknown>(
  endpoint: string,
  params: Record<string, string> = {},
  importPath?: string
): Promise<T> => {
  // Call directly in local development environment
  if (import.meta.env.DEV) {
    const handlerPath = importPath || `../serverless/${endpoint}`;
    const { handler } = await import(handlerPath);

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
  const url =
    query.length > 0
      ? `${NETLIFY_SERVERLESS_PATH}${endpoint}?${query}`
      : `${NETLIFY_SERVERLESS_PATH}${endpoint}`;

  const response = await fetch(url);

  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(
        `API error: ${error?.message || error?.error || response.statusText}`
      );
    } catch {
      throw new Error(`API error: ${response.statusText}`);
    }
  }

  return response.json();
};

export default {
  callServerlessFunction,
};
