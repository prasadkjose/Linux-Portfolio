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

## Deployment Notes

### Netlify Configuration

- Functions are automatically deployed when pushed to the repository
- Function endpoint: `/serverless/github` (Netlify automatically routes to this function)

### Local Development

- Functions can be tested locally using Netlify CLI: `netlify dev`
- Environment variables should be set in `.env` file for local testing

### Security Note

GitHub API calls from the client-side require a personal access token with public repository read permissions. The token is passed via hosted environment variables in Netlify and should be properly configured in the deployment environment.
This can also be configured using secrets or vaults, depending on the cloud provider. Make sure you call the right thing in the serverless method.

DO NOT USE .env variables in any source control or anywhere that's not local dev'
