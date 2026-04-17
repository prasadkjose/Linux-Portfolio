/**
 * Supabase PostgreSQL Database Service
 * Connection: Shared Pooler (IPv4 compatible Transaction Pooler)
 *
 * Credentials are securely fetched from serverless function endpoint
 * to avoid exposing secrets in client-side bundle. Update this depending on your cloud provider.
 */

import { NETLIFY_SERVERLESS_PATH } from "../config/netlify.config";
import logger from "../utils/logger";

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
  connectionString: string;
}

// Cache for database credentials (in-memory only, never persisted)
let cachedConfig: DatabaseConfig | null = null;

/**
 * Get database configuration securely from serverless function
 * Falls back to local environment variables for development
 * @returns Promise resolving to Database configuration object
 */
export const getDatabaseConfig = async (): Promise<DatabaseConfig> => {
  // Return cached config if available
  if (cachedConfig) {
    return cachedConfig;
  }

  // Fetch complete configuration directly from serverless function
  const response = await fetch(
    `${NETLIFY_SERVERLESS_PATH}database-credentials`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Failed to retrieve database credentials: ${error?.message || error?.error || response.statusText}`
    );
  }

  const config = await response.json();
  cachedConfig = config as DatabaseConfig;

  logger.log("Database configuration securely retrieved from server");
  return cachedConfig;
};

/**
 * Validate database connection configuration
 * @returns Promise resolving to boolean indicating if config is valid
 */
export const isDatabaseConfigValid = async (): Promise<boolean> => {
  const config = await getDatabaseConfig();
  return !!config.password && !!config.host && !!config.user;
};

/**
 * Get connection string for PostgreSQL clients
 * @returns Promise resolving to formatted connection string
 */
export const getConnectionString = async (): Promise<string> => {
  const config = await getDatabaseConfig();
  return config.connectionString;
};

/**
 * Database connection status check
 * @returns Promise resolving to status object with connection info
 */
export const getDatabaseStatus = async () => {
  const config = await getDatabaseConfig();
  const isValid = await isDatabaseConfigValid();

  return {
    configured: isValid,
    host: config.host,
    port: config.port,
    user: config.user,
    database: config.database,
    poolerType: "Shared Transaction Pooler (IPv4 Compatible)",
    region: "us-west-2 (AWS)",
    timestamp: new Date().toISOString(),
  };
};

/**
 * Clear cached database credentials (for re-authentication)
 */
export const clearDatabaseConfigCache = () => {
  cachedConfig = null;
};

export default {
  getDatabaseConfig,
  getConnectionString,
  isDatabaseConfigValid,
  getDatabaseStatus,
  clearDatabaseConfigCache,
};
