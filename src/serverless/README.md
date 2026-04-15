# Serverless Functions Directory

This directory contains serverless functions that provide backend functionality for the portfolio application. These functions are designed to run on serverless platforms like Netlify Functions. I have tried to make it cloud provider agnostic but I can only do so many things in this proprietry world. :/

## Functions

### GitHub API Handler (`github.ts`)

A serverless function that acts as a proxy for GitHub API requests:

#### Purpose

- **Security**: Prevents exposing GitHub API tokens in client-side code
- **Rate Limiting**: Provides server-side rate limiting for API requests
- **Data Processing**: Handles complex GraphQL queries and data transformation
- **Error Handling**: Centralized error handling and response formatting

#### Endpoints

**GET /api/github?path=user&username={username}**

- Fetches basic user information from GitHub API
- Returns: User profile data including name, bio, avatar, etc.

**GET /api/github?path=pinned-repos&username={username}**

- Fetches user's pinned repositories using GitHub GraphQL API
- Returns: Array of pinned repositories with name, description, URL, stars, and forks

#### Security Features

- Token validation: Ensures GitHub token is configured
- Input validation: Validates required parameters
- Error sanitization: Prevents exposing sensitive information in error responses

#### Environment Variables

- `VITE_GITHUB_TOKEN`: GitHub personal access token with public repository read permissions

#### Usage

This function is called from the client-side GitHub service to fetch data without exposing the API token to the browser.

---

### Unsplash API Handler (`unsplash.ts`)

A serverless function that acts as a proxy for Unsplash Photo Search API requests:

#### Purpose

- **Security**: Prevents exposing Unsplash API Access Key in client-side code
- **Rate Limiting**: Server-side handling for Unsplash API rate limits
- **Request Standardization**: Consistent error handling and response formatting
- **Parameter Validation**: Proper input validation and query encoding

#### Endpoints

**GET /api/unsplash?path=search/photos&query={search term}**

- Search photos on Unsplash
- Required parameter: `query` - search term for photos
- Optional parameters:
  - `page`: Page number for pagination (default: 1)
  - `per_page`: Number of results per page (default: 10, max: 30)
- Returns: Unsplash standard photo search response with results, total pages, and total count

#### Security Features

- Access Key validation: Ensures Unsplash API key is properly configured
- Input sanitization: URL encodes search queries
- Proper error handling: Returns meaningful error messages without exposing sensitive data

#### Environment Variables

Looks for environment variables in this priority order:

1.  `UNSPLASH_ACCESS_KEY`: Primary production environment variable
2.  `VITE_UNSPLASH_ACCESS_KEY`: Fallback for local Vite / .env development

Unsplash API Access Key obtained from Unsplash Developer Portal

#### Usage

This function proxies requests to Unsplash API while keeping the API access key secure on the server side.

## Deployment Notes

### Netlify Configuration

- Functions are automatically deployed when pushed to the repository
- Function endpoint: `/serverless/github` (Netlify automatically routes to this function)

### Local Development

- Functions can be tested locally using Netlify CLI: `netlify dev`
- Environment variables should be set in `.env` file for local testing

### Security Note

All API calls from the client-side require a personal access token with public repository read permissions. The token is passed via hosted environment variables in Netlify and should be properly configured in the deployment environment.
This can also be configured using secrets or vaults, depending on the cloud provider. Make sure you call the right thing in the serverless method.

DO NOT USE .env variables in any source control or anywhere that's not local dev'
