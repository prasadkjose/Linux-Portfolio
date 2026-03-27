export async function handler(event: {
  queryStringParameters?: { path?: string; username?: string };
}) {
  const { path, username } = event.queryStringParameters || {};

  let url = "";

  if (path === "user" && username) {
    url = `https://api.github.com/users/${username}`;
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
}
