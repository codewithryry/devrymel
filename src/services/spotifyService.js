// src/services/spotifyService.js

export async function getSpotifyNowPlaying() {
  try {
    const url = process.env.VUE_APP_SPOTIFY_API_URL || "http://127.0.0.1:5000/api/spotify-now-playing";
    const response = await fetch(url);

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