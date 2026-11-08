document.documentElement.classList.add("js");

const byId = (id) => document.getElementById(id);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setText(id, value) {
  const element = byId(id);
  if (element) element.textContent = value || "";
}

function setBackgroundImage(id, path) {
  const element = byId(id);
  if (element && path) element.style.backgroundImage = `url("${path}")`;
}

function setPageContent() {
  document.title = `${CONFIG.groomName} & ${CONFIG.brideName} | Wedding Invitation`;
  setText("heroNames", `${CONFIG.groomName} & ${CONFIG.brideName}`);
  setText("heroDate", CONFIG.weddingDate);
  setText("welcomeText", CONFIG.welcomeMessage);
  setText("closingFamily", `With love, ${CONFIG.brideName} ${CONFIG.groomName} `);
  setText("closingDate", CONFIG.weddingDate);
  setText("footerNames", `${CONFIG.groomName} & ${CONFIG.brideName}`);
  setBackgroundImage("heroImage", CONFIG.heroImage);
  setBackgroundImage("closingImage", CONFIG.closingImage);
  setBackgroundImage("celebrationsPoster", CONFIG.celebrationPoster);
  setBackgroundImage("galleryBackdrop", CONFIG.galleryBackground);

  const venueImage = byId("venueImage");
  venueImage.src = CONFIG.venue.image;
  venueImage.alt = `${CONFIG.venue.name} venue`;
  setText("venueName", CONFIG.venue.name);
  setText("venueAddress", CONFIG.venue.address);
  const venueMap = byId("venueMap");
  venueMap.href = CONFIG.venue.mapUrl;
  venueMap.setAttribute("aria-label", `Get directions to ${CONFIG.venue.name}`);

  const previewTitle = `${CONFIG.groomName} & ${CONFIG.brideName} — We're Getting Married!`;
  document.querySelector('meta[property="og:title"]').content = previewTitle;
  document.querySelector('meta[name="twitter:title"]').content = previewTitle;
  document.querySelector('meta[property="og:description"]').content =
    `Join ${CONFIG.groomName} and ${CONFIG.brideName} for their wedding celebrations.`;
  document.querySelector('meta[name="twitter:description"]').content =
    `Join ${CONFIG.groomName} and ${CONFIG.brideName} for their wedding celebrations.`;
  const previewUrl = new URL(CONFIG.previewImage, window.location.href).href;
  document.querySelector('meta[property="og:image"]').content = previewUrl;
  document.querySelector('meta[name="twitter:image"]').content = previewUrl;
}

function createSlideshow(containerId, images, label) {
  const container = byId(containerId);
  if (!container || !images.length) return;

  const slides = images.map((image, index) => {
    const slide = document.createElement("img");
    slide.className = `slide${index === 0 ? " is-active" : ""}`;
    slide.src = image.src;
    slide.alt = image.alt || `${label} photograph ${index + 1}`;
    slide.loading = index === 0 ? "eager" : "lazy";
    slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");
    container.appendChild(slide);
    return slide;
  });

  let current = 0;
  const controls = document.createElement("div");
  controls.className = "slideshow-controls";
  controls.setAttribute("aria-label", `${label} slideshow controls`);
  const previous = document.createElement("button");
  previous.className = "slide-arrow";
  previous.type = "button";
  previous.setAttribute("aria-label", `Previous ${label} photograph`);
  previous.textContent = "‹";
  const next = document.createElement("button");
  next.className = "slide-arrow";
  next.type = "button";
  next.setAttribute("aria-label", `Next ${label} photograph`);
  next.textContent = "›";
  const dots = document.createElement("div");
  dots.className = "slide-dots";
  dots.setAttribute("aria-label", "Choose a photograph");
  const indicators = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slide-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show ${label} photograph ${index + 1}`);
    dot.setAttribute("aria-current", index === 0 ? "true" : "false");
    dot.addEventListener("click", () => showSlide(index));
    dots.appendChild(dot);
    return dot;
  });
  controls.append(previous, dots, next);
  container.appendChild(controls);

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
      indicators[slideIndex].setAttribute("aria-current", active ? "true" : "false");
    });
  }

  previous.addEventListener("click", () => showSlide(current - 1));
  next.addEventListener("click", () => showSlide(current + 1));
  let touchStartX = null;
  container.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  container.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) showSlide(current + (distance < 0 ? 1 : -1));
    touchStartX = null;
  }, { passive: true });

  if (slides.length > 1 && !reducedMotion.matches) {
    window.setInterval(() => {
      if (!document.hidden) showSlide(current + 1);
    }, 5000);
  }
}

function setupCountdown() {
  const weddingTime = new Date(CONFIG.weddingDateTime).getTime();
  const units = {
    days: byId("countdownDays"),
    hours: byId("countdownHours"),
    minutes: byId("countdownMinutes"),
    seconds: byId("countdownSeconds")
  };
  const finishedMessage = byId("countdownFinished");
  let timer;
  if (!Number.isFinite(weddingTime)) {
    throw new Error("CONFIG.weddingDateTime must be a valid ISO date-time.");
  }

  function update() {
    const remaining = weddingTime - Date.now();
    if (remaining <= 0) {
      byId("countdown").hidden = true;
      finishedMessage.hidden = false;
      finishedMessage.textContent = "The wedding day is here!";
      window.clearInterval(timer);
      return;
    }
    units.days.textContent = String(Math.floor(remaining / 86400000)).padStart(2, "0");
    units.hours.textContent = String(Math.floor((remaining / 3600000) % 24)).padStart(2, "0");
    units.minutes.textContent = String(Math.floor((remaining / 60000) % 60)).padStart(2, "0");
    units.seconds.textContent = String(Math.floor((remaining / 1000) % 60)).padStart(2, "0");
  }

  update();
  if (weddingTime > Date.now()) timer = window.setInterval(update, 1000);
}

function renderEvents() {
  const wrapper = byId("events");
  CONFIG.events.forEach((event) => {
    const item = document.createElement("article");
    item.className = "event reveal";
    const title = document.createElement("h3");
    title.textContent = event.name;
    const date = document.createElement("p");
    date.className = "event-date";
    date.textContent = `${event.date} · ${event.day}`;
    const details = document.createElement("p");
    details.className = "event-meta";
    details.textContent = event.time;
    item.append(title, date, details);
    wrapper.appendChild(item);
  });
}

const galleryMedia = [];
function renderGallery() {
  const gallery = byId("galleryGrid");
  CONFIG.galleryImages.forEach((image) => {
    const media = { type: "image", src: image.src, alt: image.alt || "Wedding memory" };
    galleryMedia.push(media);
    const button = document.createElement("button");
    button.className = "gallery-item";
    button.type = "button";
    button.setAttribute("aria-label", `View image: ${media.alt}`);
    const img = document.createElement("img");
    img.src = media.src;
    img.alt = media.alt;
    img.loading = "lazy";
    img.decoding = "async";
    button.appendChild(img);
    button.addEventListener("click", () => openLightbox(galleryMedia.indexOf(media), button));
    gallery.appendChild(button);
  });
  CONFIG.galleryVideos.forEach((video) => {
    const media = { type: "video", src: video.src, poster: video.poster, alt: video.alt || "Wedding video" };
    galleryMedia.push(media);
    const button = document.createElement("button");
    button.className = "gallery-item";
    button.type = "button";
    button.setAttribute("aria-label", `Play video: ${media.alt}`);
    const poster = document.createElement("img");
    poster.src = media.poster;
    poster.alt = "";
    poster.loading = "lazy";
    button.appendChild(poster);
    const play = document.createElement("span");
    play.className = "gallery-play";
    play.setAttribute("aria-hidden", "true");
    play.textContent = "▶";
    button.appendChild(play);
    button.addEventListener("click", () => openLightbox(galleryMedia.indexOf(media), button));
    gallery.appendChild(button);
  });
  if (!galleryMedia.length) {
    const empty = document.createElement("p");
    empty.className = "gallery-empty";
    empty.textContent = "Photos and videos will be added here.";
    gallery.appendChild(empty);
  }
}

const lightbox = byId("lightbox");
const lightboxContent = byId("lightboxContent");
const previousMedia = byId("previousMedia");
const nextMedia = byId("nextMedia");
let activeMediaIndex = 0;
let returnFocusTo = null;

function showLightboxMedia(index) {
  activeMediaIndex = (index + galleryMedia.length) % galleryMedia.length;
  const media = galleryMedia[activeMediaIndex];
  lightboxContent.replaceChildren();
  if (media.type === "video") {
    const video = document.createElement("video");
    video.src = media.src;
    video.poster = media.poster;
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    lightboxContent.appendChild(video);
    video.play().catch(() => {});
  } else {
    const image = document.createElement("img");
    image.src = media.src;
    image.alt = media.alt;
    lightboxContent.appendChild(image);
  }
  previousMedia.disabled = galleryMedia.length < 2;
  nextMedia.disabled = galleryMedia.length < 2;
}

function openLightbox(index, trigger) {
  returnFocusTo = trigger;
  showLightboxMedia(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  byId("closeLightbox").focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxContent.replaceChildren();
  document.body.style.overflow = "";
  if (returnFocusTo) returnFocusTo.focus();
}

function setupNavigation() {
  const toggle = byId("menuToggle");
  const links = byId("navLinks");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    links.classList.toggle("is-open", open);
  });
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      links.classList.remove("is-open");
    });
  });

  if (!("IntersectionObserver" in window)) return;
  const navLinks = [...links.querySelectorAll('a[href^="#"]')];
  const targets = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  targets.forEach((target) => observer.observe(target));
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion.matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  let updateScheduled = false;
  const updateVisibility = () => {
    updateScheduled = false;
    revealItems.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      const visible = bounds.top < window.innerHeight * 0.9 && bounds.bottom > window.innerHeight * 0.1;
      item.classList.toggle("is-visible", visible);
    });
  };
  const scheduleUpdate = () => {
    if (updateScheduled) return;
    updateScheduled = true;
    window.requestAnimationFrame(updateVisibility);
  };
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  updateVisibility();
}

function setupBackgroundVideo(videoId, source, poster) {
  const video = byId(videoId);
  if (!video) return;
  video.poster = poster;
  if (!source) return;
  video.autoplay = true;
  video.addEventListener("error", () => video.pause());
  let updateScheduled = false;
  const updatePlayback = () => {
    updateScheduled = false;
    const bounds = video.getBoundingClientRect();
    const nearViewport = bounds.top < window.innerHeight + 200 && bounds.bottom > -200;
    if (nearViewport) {
      if (!video.src) {
        video.src = source;
        video.load();
      }
      if (video.paused) video.play().catch(() => {});
    } else {
      video.pause();
    }
  };
  const scheduleUpdate = () => {
    if (updateScheduled) return;
    updateScheduled = true;
    window.requestAnimationFrame(updatePlayback);
  };
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  updatePlayback();
}

function setupLightbox() {
  byId("closeLightbox").addEventListener("click", closeLightbox);
  previousMedia.addEventListener("click", () => showLightboxMedia(activeMediaIndex - 1));
  nextMedia.addEventListener("click", () => showLightboxMedia(activeMediaIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft" && galleryMedia.length > 1) showLightboxMedia(activeMediaIndex - 1);
    if (event.key === "ArrowRight" && galleryMedia.length > 1) showLightboxMedia(activeMediaIndex + 1);
    if (event.key === "Tab") {
      const focusable = [byId("closeLightbox"), previousMedia, nextMedia]
        .filter((element) => !element.disabled);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

setPageContent();
createSlideshow("coupleSlideshow", CONFIG.coupleImages, "Gagan and Sindhu");
renderEvents();
renderGallery();
setupCountdown();
setupNavigation();
setupLightbox();
setupRevealAnimations();
setupBackgroundVideo("celebrationVideo", CONFIG.celebrationVideo, CONFIG.celebrationPoster);
