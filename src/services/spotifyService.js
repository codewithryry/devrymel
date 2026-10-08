// src/services/spotifyService.js

// Public "now playing" endpoint (Vercel function in /api). It only returns song
// info — the Spotify credentials stay server-side on Vercel — and it allows calls
// from any site, so hosts without their own /api (e.g. a static Render site) use it.
const SHARED_SPOTIFY_API_URL = "https://devrymel.vercel.app/api/spotify-now-playing";

// Where to ask, in order:
// 1. VUE_APP_SPOTIFY_API_URL if it was set at build time
// 2. localhost: the local Express server (server/server.js)
// 3. this site's own /api/spotify-now-playing (works on any Vercel deployment)
// 4. the shared endpoint above (for hosts with no /api, like Render)
function spotifyApiUrls() {
  if (process.env.VUE_APP_SPOTIFY_API_URL) {
    return [process.env.VUE_APP_SPOTIFY_API_URL];
  }

  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isLocal) {
    return ["http://127.0.0.1:5000/api/spotify-now-playing"];
  }

  return ["/api/spotify-now-playing", SHARED_SPOTIFY_API_URL];
}

// Remember which URL answered so we don't retry a missing /api every 30 seconds
let workingUrl = null;

async function fetchNowPlaying(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status}`);
  }

  // Static hosts may answer /api/... with an HTML page instead of JSON
  const type = response.headers.get("content-type") || "";
  if (!type.includes("application/json")) {
    throw new Error("Spotify API did not return JSON");
  }

  return response.json();
}

export async function getSpotifyNowPlaying() {
  try {
    const urls = workingUrl ? [workingUrl] : spotifyApiUrls();
    let data = null;
    let lastError = null;

    for (const url of urls) {
      try {
        data = await fetchNowPlaying(url);
        workingUrl = url;
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!data) throw lastError;

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
    workingUrl = null;

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
