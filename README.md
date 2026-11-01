# RecordVoiceNow · V1.2.0

A private, static, browser-only voice & screen recorder designed for iPhone (Safari) and modern browsers.  
Microphone and screen recordings stay in IndexedDB on the device — **no account, no server upload**.

**© 2026 Rafat Kotaki. All rights reserved.**

---

## Features

- **Voice recording** via `getUserMedia` + `MediaRecorder`
- **Screen recording** via `getDisplayMedia` (where the browser supports it)
- Local library with Play / Download / Share / Rename / Delete
- Live waveform visualization for voice mode
- Dark / Light theme toggle (remembers preference, defaults to system appearance)
- Installable PWA (Add to Home Screen on iPhone)
- Offline app shell via Service Worker

## Important iPhone / Safari notes

- Microphone access requires **HTTPS**.
- Screen capture on iPhone Safari is limited: the page cannot reliably capture system/app audio, and capture may stop when Safari is backgrounded.
- For full system screen + audio recording use **iOS Control Center → Screen Recording**.
- Supported MediaRecorder formats vary by iOS version. The app auto-detects the best available type (`audio/mp4`, `audio/webm`, etc.).

---

## Project structure (GitHub-ready)

```
index.html      # App UI + logic
manifest.json   # PWA manifest
sw.js           # Service Worker (cache version: recordvoicenow-v1.2.0)
logo.svg        # Icon-only logo mark (header + favicon)
icon-192.png    # PWA icon (full logo with wordmark)
apple-touch-icon.png  # iPhone Home Screen icon (180x180)
icon-512.png    # PWA high-res icon
README.md       # This file
```

---

## Deploy to Cloudflare Pages (recommended)

### Option A — Connect GitHub (automatic deploys)

1. Create a new GitHub repository.
2. Push the contents of this folder (the files above) to the repository root.
3. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
4. Select the repository.
5. Framework preset: **None**.
6. Build command: leave **empty**.
7. Build output directory: `/` (or leave as repository root).
8. Deploy.  
   Every future `git push` to the connected branch will trigger a new deployment.

### Option B — Direct upload

1. Zip the folder contents (or drag the files).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
3. Upload and deploy.

After deployment, open the `https://….pages.dev` URL over HTTPS so the microphone permission works.

---

## Install on iPhone

1. Open the deployed HTTPS URL in **Safari**.
2. Tap the **Share** button → **Add to Home Screen**.
3. Confirm and launch from the Home Screen icon.
4. Allow microphone access when prompted.

---

## Theme behaviour

- On first visit the app follows the iPhone / system appearance (`prefers-color-scheme`).
- Tapping the sun/moon button in the top-right switches between Light and Dark and **remembers** the choice in `localStorage`.
- Clearing site data resets the preference to system default.

---

## Privacy & storage

- All recordings are stored as Blobs inside IndexedDB in the current browser profile.
- Clearing Safari website data, removing the web app, or storage eviction will delete local recordings.
- Export important recordings with **Download** or **Share** before clearing data.
- No analytics, no third-party scripts, no network requests for the recordings themselves.

---

## Regenerating icons

`logo.svg` is the source. To recreate the PNG icons:

```bash
# Example with a tool that can rasterize SVG
# (or open logo.svg in a browser / Inkscape / Figma and export)
```

Recommended sizes: 192×192 and 512×512, with the same rounded-rect background as the SVG.

---

## License / Copyright

© 2026 Rafat Kotaki. All rights reserved.  
RecordVoiceNow · V1.2.0
