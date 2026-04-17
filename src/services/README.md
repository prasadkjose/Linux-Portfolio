# Services Directory

This directory contains service layer implementations that handle external API communications and business logic for the portfolio application.

## Services

### GitHub Service (`githubService.ts`)

Provides client-side functionality to interact with GitHub data:

- **User Information**: Fetches basic user profile information from GitHub API
- **Pinned Repositories**: Retrieves a user's pinned repositories using GitHub GraphQL API
- **Error Handling**: Comprehensive error handling for API failures and network issues
- **Caching**: React Query is used for data caching and state management

### Usage

The GitHub service is used throughout the application to:

- Display user information in the Projects tab
- Show pinned repositories with descriptions and statistics
- Provide real-time data fetching with proper loading and error states

### Dependencies

- `@tanstack/react-query`: For data fetching, caching, and state management
- Environment variables:

  **Serverless Function Environment (Recommended):**
  - `GITHUB_TOKEN` - GitHub API personal access token
  - `UNSPLASH_ACCESS_KEY` - Unsplash API access key
  - `SUPABASE_DB_USER` - Supabase database username
  - `SUPABASE_DB_PASSWORD` - Supabase database password

  **Client-side Fallback:**
  - `VITE_GITHUB_TOKEN` - Client-side fallback for GitHub API access
  - `VITE_UNSPLASH_ACCESS_KEY` - Client-side fallback for Unsplash API access
  - `VITE_SUPABASE_DB_USER` - Client-side fallback for Supabase database user
  - `VITE_SUPABASE_DB_PASSWORD` - Client-side fallback for Supabase database password

  _Note: Server environment variables are preferred for security and are never exposed to client-side code. VITE\_ prefixed variables are only used as fallback for local development._

### Security Note

GitHub API calls from the client-side require a personal access token with public repository read permissions. The token is passed via hosted environment variables in Netlify and should be properly configured in the deployment environment.
This can also be configured using secrets or vaults, depending on the cloud provider. Make sure you call the right thing in the serverless method.
