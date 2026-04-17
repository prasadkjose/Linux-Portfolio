/**
 * Database Credentials Serverless Function
 *
 * Securely provides database user and password from server environment
 * This prevents exposing database credentials in client-side bundle
 */

import {
  createNetlifyResponse,
  NetlifyFunctionEvent,
  withErrorHandling,
} from "../config/netlify.config";

const databaseCredentialsHandler = async (event: NetlifyFunctionEvent) => {
  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return createNetlifyResponse(405, { error: "Method not allowed" });
  }

  // Get credentials from server environment variables (never exposed to client)
  const user =
    process.env.SUPABASE_DB_USER || process.env.VITE_SUPABASE_DB_USER;
  const password =
    process.env.SUPABASE_DB_PASSWORD || process.env.VITE_SUPABASE_DB_PASSWORD;

  if (!user || !password) {
    return createNetlifyResponse(500, {
      error: "Database credentials not configured on server",
    });
  }

  // Build complete connection string on server-side ONLY
  const connectionString = `postgresql://${user}:${password}@aws-1-us-west-2.pooler.supabase.com:6543/postgres`;

  // Return complete configuration securely from server-side
  return createNetlifyResponse(200, {
    host: "aws-1-us-west-2.pooler.supabase.com",
    port: 6543,
    database: "postgres",
    user,
    password,
    ssl: true,
    connectionString,
  });
};

export const handler = withErrorHandling(databaseCredentialsHandler);
