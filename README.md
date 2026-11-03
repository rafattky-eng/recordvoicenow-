# RecVoiceNow · V2.0.0

**Save any sound on your iPhone in seconds.**

Private, browser-based voice & ambient recorder. Everything stays on this device — no account, no upload.

**© 2026 Rafat Kotaki. All rights reserved.**

---

## Highlights

- Premium dark navy + gold design, mobile-first
- Clear use-case cards (Voice Notes, Song Practice, Lectures, Meetings, Other Apps…)
- One-tap voice / ambient recording with live gold waveform
- Dedicated **Record From Other Apps** flow for iPhone (Control Center → Import)
- Local library with search + storage summary
- EN / JP interface, dark/light theme
- PWA installable + Share Target (share from Photos into the app)
- Optional live transcription (Web Speech API)

## iPhone “Other Apps” flow

Apple does not allow websites to record other apps’ audio. RecVoiceNow explains this clearly and guides the user:

1. Open Control Center  
2. Long-press Screen Record → enable Microphone  
3. Record any app  
4. Stop → video lands in Photos  
5. Return here → Import  

## Deploy

Push the folder contents to GitHub, then connect the repo to Cloudflare Pages (or GitHub Pages).  
No build step required.

## Privacy

All recordings are stored in IndexedDB on the current device/browser profile only.
