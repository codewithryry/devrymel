function formatSeconds(totalSeconds) {
  const seconds = Number(totalSeconds) || 0;

  if (seconds <= 0) return "0 secs";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) return `${hours} hrs ${minutes} mins`;
  if (hours > 0) return `${hours} hrs`;
  if (minutes > 0) return `${minutes} mins`;

  return `${seconds} secs`;
}

function getDateString(date) {
  return date.toISOString().split("T")[0];
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      hoursText: "Method not allowed",
      totalSeconds: 0
    });
  }

  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      hoursText: "No API key",
      totalSeconds: 0
    });
  }

  try {
    const endDate = new Date();
    const startDate = new Date();

    startDate.setDate(endDate.getDate() - 6);

    const start = getDateString(startDate);
    const end = getDateString(endDate);

    const response = await fetch(
      `https://wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("WakaTime API error:", errorText);

      return res.status(response.status).json({
        hoursText: "Unavailable",
        totalSeconds: 0
      });
    }

    const json = await response.json();
    const summaries = json.data || [];

    const totalSeconds = summaries.reduce((sum, day) => {
      return sum + (day.grand_total?.total_seconds || 0);
    }, 0);

    return res.status(200).json({
      hoursText: formatSeconds(totalSeconds),
      totalSeconds
    });
  } catch (error) {
    console.error("WakaTime proxy error:", error);

    return res.status(500).json({
      hoursText: "Unavailable",
      totalSeconds: 0
    });
  }
};