import {
  createNetlifyResponse,
  NetlifyFunctionEvent,
  withErrorHandling,
} from "../config/netlify.config";

/**
 * Execute GitHub GraphQL query with common error handling
 */
const executeGraphQLQuery = async (
  token: string,
  query: string,
  variables: Record<string, unknown> = {}
): Promise<unknown> => {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL API error: ${res.status}`);
  }

  const result = await res.json();

  if (result.errors) {
    throw new Error(`GraphQL Error: ${result.errors[0].message}`);
  }

  return result.data;
};

/**
 * Execute GitHub REST API request with common error handling
 */
const executeRestRequest = async (
  token: string,
  endpoint: string
): Promise<unknown> => {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json();
};

const githubHandler = async (event: NetlifyFunctionEvent) => {
  const { path, username } = event.queryStringParameters || {};

  // Use environment variable from Netlify function environment
  const token = process.env.VITE_GITHUB_TOKEN;

  if (!token) {
    return createNetlifyResponse(400, { error: "GitHub token not configured" });
  }

  if (path === "user" && username) {
    const data = await executeRestRequest(token, `/users/${username}`);
    return createNetlifyResponse(200, data);
  }

  if (path === "pinned-repos" && username) {
    const query = `
      query($username: String!) {
        user(login: $username) {
          pinnedItems(first: 6) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
              }
            }
          }
        }
      }
    `;

    const data = (await executeGraphQLQuery(token, query, {
      username,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as any;
    return createNetlifyResponse(200, data.user.pinnedItems.nodes);
  }

  if (path === "top-closed-issues") {
    const query = `
      query {
        repository(owner: "prasadkjose", name: "Linux-Portfolio") {
          issues(first: 5, states: CLOSED, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              number
              title
              url
              createdAt
              closedAt
              comments {
                totalCount
              }
            }
          }
        }
      }
    `;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await executeGraphQLQuery(token, query)) as any;
    return createNetlifyResponse(200, data.repository.issues.nodes);
  }

  return createNetlifyResponse(400, { error: "Invalid path parameter" });
};

export const handler = withErrorHandling(githubHandler);
