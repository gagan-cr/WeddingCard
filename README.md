# Gagan & Sindhu — Wedding Invitation

A static, mobile-first wedding invitation made with HTML, CSS and vanilla JavaScript. No build step, backend, database, or paid services are required.

## Media folders and suggested filenames

```text
assets/
  icons/
    favicon.svg
  images/
    hero/
      gagan-sindhu-hero.jpg        # original photo
      gagan-sindhu-hero.webp       # optimized copy used by the page
    couple/
      couple-01.svg ... couple-06.svg  # original SVG placeholders, kept
    events/
      venue.svg                     # replace with venue.jpg if you have a venue photo
      celebrations-poster.svg       # optional poster/still for the background video
    gallery/
      couple-01.jpg ... couple-04.jpg  # original photos you added
      couple-01.webp ... couple-04.webp # optimized copies used in slideshow
      gallery-1.svg ... gallery-6.svg  # unused SVG placeholders, kept
    social/
      gagan-sindhu-preview.svg      # replace with gagan-sindhu-preview.jpg
  videos/
    gagan-sindhu-celebration.mp4    # add your 5–8 second looping background video here
```

The older SVG placeholders are kept in place and are not deleted. The page now uses the four couple photos already in `assets/images/gallery/` and optimized WebP copies of them. The original, full-size JPGs remain unchanged.

### What to put where

- **Hero photo:** `assets/images/hero/gagan-sindhu-hero.jpg` — the original. The site uses the smaller `gagan-sindhu-hero.webp` copy.
- **Meet Gagan & Sindhu slideshow:** the four photos already added as `assets/images/gallery/couple-01.jpg` through `couple-04.jpg`. The page uses matching `.webp` copies to save mobile data. This is one shared slideshow, not separate bride/groom slideshows; it auto-advances, crossfades, and supports swipe, arrows and dots.
- **Memories gallery:** `assets/images/gallery/gallery-1.svg` through `gallery-6.svg` are still generic placeholders. If you want separate memories, add `memory-01.jpg` through `memory-06.jpg` and update `galleryImages` paths in `js/config.js`.
- **Venue photo:** `assets/images/events/venue.jpg` — optional photo of the venue; update `venue.image` in `js/config.js`.
- **Background video:** `assets/videos/gagan-sindhu-celebration.mp4` — the site now uses it, forces mute, loops it, and loads/plays it only when the celebrations section is near the screen. The current file is 1920×1080, about 22 MB and 11.2 seconds long. If you want the planned 5–8 second clip, trim it and export a smaller 720p H.264 MP4 for mobile.
- **Video poster:** `assets/images/events/celebrations-poster.jpg` — an optional still from the video. Update `celebrationPoster` in `js/config.js`. The existing SVG poster remains as a fallback until then.
- **WhatsApp/social preview:** `assets/images/social/gagan-sindhu-preview.jpg` — landscape image, ideally 1200×630. Update the `og:image` and `twitter:image` absolute HTTPS URLs in `index.html` after deployment. Social preview crawlers may not support SVG.

## Wedding details already entered

- Groom: **Gagan**
- Bride: **Sindhu**
- Reception: **Thursday, 19 November 2026, 7:00 PM onwards**
- Wedding ceremony: **Friday, 20 November 2026, 9:20 AM onwards**
- Countdown: welcome section, counting down to the ceremony at 9:20 AM India time (UTC+05:30)
- Venue: **Gowrishankara Kalyana Mantapa** (Bannur Main Road, Kyathengere, Mandya)
- Venue directions: [Google Maps link](https://share.google/8waVbUi4GrObPgpM6), shown only in the venue section
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
