const hero = document.querySelector("#hero");

hero.style.backgroundImage =
`url(${CONFIG.heroImage})`;

document.querySelector("#heroNames").textContent =
`${CONFIG.brideName} & ${CONFIG.groomName}`;

document.querySelector("#heroDate").textContent =
CONFIG.weddingDate;

document.querySelector("#welcomeText").textContent =
CONFIG.welcomeMessage;

document.querySelector("#brideName").textContent =
CONFIG.brideName;

document.querySelector("#groomName").textContent =
CONFIG.groomName;

document.querySelector("#brideIntro").textContent =
CONFIG.brideIntro;

document.querySelector("#groomIntro").textContent =
CONFIG.groomIntro;

/* slides */

function createSlideshow(container, images){

images.forEach((img,index)=>{

const slide=document.createElement("img");

slide.src=img;

slide.className="slide";

if(index===0){
slide.classList.add("active");
}

container.appendChild(slide);

});

let current=0;

const slides=container.querySelectorAll(".slide");

setInterval(()=>{

slides[current].classList.remove("active");

current=(current+1)%slides.length;

slides[current].classList.add("active");

},4000);

}

createSlideshow(
document.querySelector("#brideSlideshow"),
CONFIG.brideImages
);

createSlideshow(
document.querySelector("#groomSlideshow"),
CONFIG.groomImages
);

/* events */

const eventsWrap =
document.querySelector("#events");

CONFIG.events.forEach(e=>{

eventsWrap.innerHTML += `
<div class="event">

<h3>${e.name}</h3>

<p>${e.date}</p>

<p>${e.day}</p>

<p>${e.time}</p>

<p>${e.venue}</p>

<p>${e.address}</p>

<a href="${e.maps}"
target="_blank">

Directions

</a>

</div>
`;

});

/* venue */

venueName.textContent =
CONFIG.venue.name;

venueAddress.textContent =
CONFIG.venue.address;

venueImage.src =
CONFIG.venue.image;

venueMap.href =
CONFIG.venue.mapUrl;

/* gallery */

const gallery =
document.querySelector("#galleryGrid");

gallery.classList.add("gallery-grid");

CONFIG.galleryImages.forEach(img=>{

gallery.innerHTML += `
<img
loading="lazy"
src="${img}"
class="gallery-item">
`;

});

/* lightbox */

const lightbox =
document.querySelector("#lightbox");

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("gallery-item")){

lightbox.classList.add("active");

lightboxImg.src =
e.target.src;

}

});

closeLightbox.onclick=()=>{
lightbox.classList.remove("active");
};

const observer =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},{
threshold:.2
});

document
.querySelectorAll(".reveal")
.forEach(el =>
observer.observe(el)
);

/* closing */

closingFamily.textContent =
`With love, ${CONFIG.familyNames}`;

closingDate.textContent =
CONFIG.weddingDate;

/* video lazy play */

const bgVideo =
document.querySelector("#celebrationVideo");

bgVideo.querySelector("source").src =
CONFIG.celebrationVideo;

const videoObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

bgVideo.load();

bgVideo.play().catch(()=>{});

}else{

bgVideo.pause();

}

});

});

videoObserver.observe(bgVideo);