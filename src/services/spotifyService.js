// src/services/spotifyService.js

// Production: always this site's own /api/spotify-now-playing (the Vercel function
// in /api, which keeps the Spotify credentials server-side).
// Local dev only: the local Express server (server/server.js), or
// VUE_APP_SPOTIFY_API_URL if you set one in your local .env.
function spotifyApiUrl() {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isLocal) {
    return process.env.VUE_APP_SPOTIFY_API_URL || "http://127.0.0.1:5000/api/spotify-now-playing";
  }

  return "/api/spotify-now-playing";
}

export async function getSpotifyNowPlaying() {
  try {
    const response = await fetch(spotifyApiUrl());

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      isPlaying: data.isPlaying || false,
      title: data.title || "Not playing",
      artist: data.artist || "Spotify",
      album: data.album || "",
      image: data.image || "",
      url: data.url || "",
      progressMs: data.progressMs || 0,
      durationMs: data.durationMs || 0
    };
  } catch (error) {
    console.error("Spotify now playing error:", error);

    return {
      isPlaying: false,
      title: "Spotify unavailable",
      artist: "Check API setup",
      album: "",
      image: "",
      url: "",
      progressMs: 0,
      durationMs: 0
    };
  }
}
