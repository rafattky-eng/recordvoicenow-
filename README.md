# RecordVoiceNow · V2.7

**Save any sound on your iPhone in seconds.**

Private, browser-based voice & ambient recorder. Everything stays on this device — no account, no upload.

**© 2026 Rafat Kotaki. All rights reserved.**

---

## Highlights

- Premium navy-blue + gold design matching FindJob Now product family
- Clear finger-pointing instructions for easy iPhone use
- Use-case cards (Voice Notes, Song Practice, Lectures, Meetings, Other Apps…)
- One-tap voice / ambient recording with live gold waveform
- Dedicated **Record From Other Apps** flow for iPhone (Control Center → Import)
- Local library with search + storage summary
- EN / JP interface (single consistent theme — no light/dark switch)
- PWA installable + Share Target (share from Photos into the app)
- Optional live transcription (Web Speech API)

## Design system (shared with FindJob Now)

- Main background: `#0C2340`
- Card / panel: `#0D3B66`
- Secondary panel: `#123A5C`
- Primary gold: `#F4B400`
- Text: white / light gray
- Input background: `#0A1F38`

## iPhone “Other Apps” flow

Apple does not allow websites to record other apps’ audio. RecordVoiceNow explains this clearly and guides the user:

1. Open Control Center  
2. Long-press Screen Record → enable Microphone  
3. Record any app  
4. Stop → video lands in Photos  
5. Return here → Import  

## Deploy

Push the folder contents to GitHub, then connect the repo to GitHub Pages (or Cloudflare Pages).  
No build step required.

## Privacy

All recordings are stored in IndexedDB on the current device/browser profile only.
