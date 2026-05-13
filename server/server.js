require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"]
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

// ── Spotify OAuth helper (one-time use to get refresh token) ──────────────────
app.get("/auth/spotify", (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = `http://127.0.0.1:${process.env.PORT || 5000}/auth/spotify/callback`;
  const scope = "user-read-currently-playing user-read-playback-state";
  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("scope", scope);
  url.searchParams.set("redirect_uri", redirectUri);
  res.redirect(url.toString());
});

app.get("/auth/spotify/callback", async (req, res) => {
  const code = req.query.code;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = `http://127.0.0.1:${process.env.PORT || 5000}/auth/spotify/callback`;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri })
  });

  const data = await tokenRes.json();
  res.send(`
    <h2>Spotify Refresh Token</h2>
    <p>Copy this into <code>server/.env</code> and root <code>.env</code> as <code>SPOTIFY_REFRESH_TOKEN=...</code></p>
    <pre style="background:#111;color:#1db954;padding:16px;border-radius:8px;word-break:break-all">${data.refresh_token || JSON.stringify(data)}</pre>
  `);
});

// ── Spotify now playing ────────────────────────────────────────────────────────
app.get("/api/spotify-now-playing", async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return res.status(200).json({ isPlaying: false, message: "Spotify not configured" });
  }

  try {
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { Authorization: `Basic ${basicAuth}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken })
    });

    if (!tokenRes.ok) {
      return res.status(200).json({ isPlaying: false, message: "Token refresh failed" });
    }

    const { access_token } = await tokenRes.json();

    const playingRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (playingRes.status === 204 || playingRes.status === 202) {
      return res.json({ isPlaying: false });
    }

    if (!playingRes.ok) {
      return res.status(200).json({ isPlaying: false, message: "Spotify API error" });
    }

    const data = await playingRes.json();
    const item = data.item;

    if (!item) return res.json({ isPlaying: false });

    const isEpisode = item.type === "episode";

    return res.json({
      isPlaying: data.is_playing || false,
      type: item.type,
      title: item.name,
      artist: isEpisode
        ? item.show?.name || "Spotify"
        : item.artists?.map((a) => a.name).join(", ") || "Unknown Artist",
      album: isEpisode ? item.show?.publisher || "Podcast" : item.album?.name || "",
      image: isEpisode ? item.images?.[0]?.url || "" : item.album?.images?.[0]?.url || "",
      url: item.external_urls?.spotify || "",
      progressMs: data.progress_ms || 0,
      durationMs: item.duration_ms || 0
    });
  } catch (error) {
    console.error("Spotify error:", error);
    return res.status(200).json({ isPlaying: false, message: "Spotify server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});