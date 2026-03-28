export async function handler(event: {
  queryStringParameters?: { path?: string; username?: string };
}) {
  const { path, username } = event.queryStringParameters || {};

  try {
    // Use environment variable from Netlify function environment
    const token = process.env.VITE_GITHUB_TOKEN;

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "GitHub token not configured" }),
      };
    }

    if (path === "user" && username) {
      // Get user information
      const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`);
      }

      const data = await res.json();

      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else if (path === "pinned-repos" && username) {
      // Get user's pinned repositories using GraphQL
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

      const graphqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { username },
        }),
      });

      if (!graphqlRes.ok) {
        throw new Error(`GitHub GraphQL API error: ${graphqlRes.status}`);
      }

      const { data } = await graphqlRes.json();

      // Extract the pinned repositories
      const pinnedRepos = data.user.pinnedItems.nodes;

      return {
        statusCode: 200,
        body: JSON.stringify(pinnedRepos),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid path parameter" }),
      };
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
}
