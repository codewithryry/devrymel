export async function getGitHubReposCount() {
  const username = process.env.VUE_APP_GITHUB_USERNAME || "codewithryry";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`GitHub error: ${response.status}`);
    }

    const data = await response.json();
    return data.public_repos || 0;
  } catch (error) {
    console.error("GitHub repos error:", error);
    return 0;
  }
}

export async function getWakaTimeStats() {
  try {
    const response = await fetch("http://localhost:5000/api/wakatime/stats");

    if (!response.ok) {
      throw new Error(`WakaTime proxy error: ${response.status}`);
    }

    const data = await response.json();

    return {
      hoursText: data.hoursText || "0 secs",
      totalSeconds: data.totalSeconds || 0
    };
  } catch (error) {
    console.error("WakaTime stats error:", error);

    return {
      hoursText: "Unavailable",
      totalSeconds: 0
    };
  }
}