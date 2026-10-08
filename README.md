# Reymel Mislang — Portfolio

My personal portfolio and toolkit: projects, experience, services, and free web tools in one site.

**Live:** [reymelmislang.vercel.app](https://reymelmislang.vercel.app)

## What's inside

- **Portfolio pages:** About, Experience, Projects, Tech Stack, Services, Process, Case Studies, Roadmap, Changelog, Contact
- **Free tools:** TikTok / YouTube downloaders, YT thumbnails, QR code, password, colors, IP lookup, URL shortener, Base64
- **Ask Reymel:** AI chat assistant (Chat, Code Helper, Creative)
- **Live stats:** visitor count, GitHub repos, WakaTime coding time, Spotify now playing
- **Themes:** Light, Midnight, Emerald, Froth Modern
- **Admin CMS:** private Firestore dashboard to manage site content
- Fully responsive with a mobile app-style layout

## Built with

Vue 3 · Firebase (Firestore, Auth) · Vercel serverless functions · Cohere AI · Font Awesome

## Run locally

```bash
npm install
npm run serve   # dev server
npm run build   # production build
```

Create a `.env` with your keys: `VUE_APP_FIREBASE_*`, `VUE_APP_COHERE_API_KEY`, and for the `/api` functions `WAKATIME_API_KEY`, `SPOTIFY_*`, `COBALT_*`.

## Structure

```
src/views       pages and tools
src/components  shared UI
src/data        default content (overridden by Firestore)
api/            serverless functions (WakaTime, Spotify, downloads)
public/         static files, resume / CV PDFs, certificates
```

© 2026 Reymel Mislang
