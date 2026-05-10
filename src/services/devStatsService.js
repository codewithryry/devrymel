export async function getGitHubReposCount() {
  const username = process.env.VUE_APP_GITHUB_USERNAME || "codewithryry";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`GitHub error: ${response.status}`);
    }

    const data = await response.json();

    return Number(data.public_repos) || 0;
  } catch (error) {
    console.error("GitHub repos error:", error);
    return 0;
  }
}

export async function getWakaTimeStats() {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const apiUrl =
    process.env.VUE_APP_WAKATIME_API_URL ||
    (isLocal
      ? "http://localhost:5000/api/wakatime/stats"
      : "/api/wakatime/stats");

  console.log("WakaTime API URL:", apiUrl);

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`WakaTime proxy error: ${response.status}`);
    }

    const data = await response.json();

    return {
      hoursText: data.hoursText || "0 secs",
      totalSeconds: Number(data.totalSeconds) || 0
    };
  } catch (error) {
    console.error("WakaTime stats error:", error);

    return {
      hoursText: "Unavailable",
      totalSeconds: 0
    };
  }
}

export async function getLiveDevStats() {
  const [reposCount, wakaTimeStats] = await Promise.all([
    getGitHubReposCount(),
    getWakaTimeStats()
  ]);

  return {
    reposCount,
    codingHours: wakaTimeStats.hoursText,
    codingSeconds: wakaTimeStats.totalSeconds
  };
}