# Gagan & Sindhu — Wedding Invitation

A static, mobile-first wedding invitation made with HTML, CSS and vanilla JavaScript. No build step, backend, database, or paid services are required.

## Media folders and suggested filenames

```text
assets/
  icons/
    favicon.svg
  images/
    hero/
      gagan-sindhu-hero.webp       # optimized copy used by the page
    events/
      venue.webp                     # venue photo used by the page
      celebrations-poster.svg       # optional poster/still for the background video
    gallery/
      couple-01.webp ... couple-06.webp # optimized photos used in slideshow
      memory-01.webp ... memory-06.webp # photos used in gallery
    closing.webp                     # closing photo used by the page
    social/
      gagan-sindhu-preview.jpg      # optimized 1200x630 social preview
  videos/
    gagan-sindhu-celebration.mp4    # add your 5–8 second looping background video here
```

Unused SVG placeholders are retained in the assets folder; the page uses the optimized WebP/JPG files listed above.

### What to put where

- **Hero photo:** `assets/images/hero/gagan-sindhu-hero.webp`.
- **Meet Gagan & Sindhu slideshow:** `assets/images/gallery/couple-01.webp` through `couple-06.webp`. This is one shared slideshow, not separate bride/groom slideshows; it auto-advances, crossfades, and supports swipe, arrows and dots.
- **Memories gallery:** `assets/images/gallery/memory-01.webp` through `memory-06.webp`. Memory 1 is the newest close-up selfie; memory 5 is the former memory 1 beach photo.
- **Venue photo:** `assets/images/events/venue.webp`.
- **Closing photo:** `assets/images/closing.webp`.
- **Background video:** `assets/videos/gagan-sindhu-celebration.mp4` — the site forces mute, loops it, and loads/plays it only when the celebrations section is near the screen. The optimized file is 1920×1080, about 5.64 MB, and 11.16 seconds long. If you still prefer the planned 5–8 second clip, trim this compressed H.264 MP4 further.
- **Video poster:** `assets/images/events/celebrations-poster.jpg` — an optional still from the video. Update `celebrationPoster` in `js/config.js`. The existing SVG poster remains as a fallback until then.
- **WhatsApp/social preview:** `assets/images/social/gagan-sindhu-preview.jpg` is a 1200×630 JPG. Update the `og:image` and `twitter:image` absolute HTTPS URLs in `index.html` after deployment.

## Wedding details already entered

- Groom: **Gagan**
- Bride: **Sindhu**
- Reception: **Thursday, 19 November 2026, 7:00 PM onwards**
- Wedding ceremony: **Friday, 20 November 2026, 9:20 AM onwards**
- Countdown: welcome section, counting down to the ceremony at 9:20 AM India time (UTC+05:30)
- Venue: **Gowrishankara Kalyana Mantapa** (Bannur Main Road, Kyathengere, Mandya)
- Venue directions: Google Maps driving directions to the full venue address, shown only in the venue section
- Event rows show only each event's name, date and time; venue/address/directions appear only in the venue section.

## Customize

Edit `js/config.js` to change the names, event information, Maps link, photos, welcome text, and video paths. The ceremony countdown is based on `weddingDateTime`, which includes the India time-zone offset. Update the static title, descriptions, and social metadata in `index.html` if you change the couple's names or invitation wording.

## Run locally

From the project root, run:

```powershell
python -m http.server 8000
```

Open <http://localhost:8000>.

## Deploy to Cloudflare Pages

1. Push the project to a GitHub repository.
2. In Cloudflare, choose **Workers & Pages → Create application → Pages → Connect to Git**, then select the repository.
3. Use **None** for framework, leave the build command empty, and set the build output directory to `.` (the project root).
4. Deploy. Cloudflare provides the public HTTPS address.
5. In `index.html`, replace `YOUR-DOMAIN.pages.dev` with the deployed domain. Set `og:image` and `twitter:image` to the absolute HTTPS URL of `gagan-sindhu-preview.jpg`.
6. Commit and push your metadata/media changes; Cloudflare Pages will deploy the update.

Before sharing, test navigation, the shared slideshow, the 360px/390px mobile layouts, the countdown, Maps links, and the video poster/video playback.
