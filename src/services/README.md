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
- Environment variables: Uses `VITE_GITHUB_TOKEN` for authenticated API access

### Security Note

GitHub API calls from the client-side require a personal access token with public repository read permissions. The token is passed via hosted environment variables in Netlify and should be properly configured in the deployment environment.
This can also be configured using secrets or vaults, depending on the cloud provider. Make sure you call the right thing in the serverless method.
