// api/spotify-now-playing.js

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  if (req.method !== "GET") {
    return res.status(405).json({
      isPlaying: false,
      message: "Method not allowed"
    });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return res.status(500).json({
      isPlaying: false,
      message: "Spotify environment variables are missing"
    });
  }

  try {
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();

      return res.status(tokenResponse.status).json({
        isPlaying: false,
        message: "Failed to refresh Spotify token",
        error: errorText
      });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const playingResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (playingResponse.status === 204 || playingResponse.status === 202) {
      return res.status(200).json({
        isPlaying: false,
        message: "Nothing playing"
      });
    }

    if (!playingResponse.ok) {
      const errorText = await playingResponse.text();

      return res.status(playingResponse.status).json({
        isPlaying: false,
        message: "Failed to fetch currently playing",
        error: errorText
      });
    }

    const data = await playingResponse.json();
    const item = data.item;

    if (!item) {
      return res.status(200).json({
        isPlaying: false,
        message: "Nothing playing"
      });
    }

    const isEpisode = item.type === "episode";

    return res.status(200).json({
      isPlaying: data.is_playing || false,
      type: item.type,
      title: item.name,
      artist: isEpisode
        ? item.show?.name || "Spotify"
        : item.artists?.map((artist) => artist.name).join(", ") || "Unknown Artist",
      album: isEpisode ? item.show?.publisher || "Podcast" : item.album?.name || "",
      image: isEpisode
        ? item.images?.[0]?.url || ""
        : item.album?.images?.[0]?.url || "",
      url: item.external_urls?.spotify || "",
      progressMs: data.progress_ms || 0,
      durationMs: item.duration_ms || 0
    });
  } catch (error) {
    return res.status(500).json({
      isPlaying: false,
      message: "Spotify server error",
      error: error.message
    });
  }
}