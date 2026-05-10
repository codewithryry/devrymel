require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080"
  })
);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

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

app.get("/api/wakatime/stats", async (req, res) => {
  const apiKey = process.env.WAKATIME_API_KEY;

  console.log("WakaTime key loaded:", !!apiKey);

  if (!apiKey) {
    return res.status(400).json({
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

    return res.json({
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
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});