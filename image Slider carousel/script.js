const slides = [
  { img: "image1.jpg", caption: "Fade" },
  { img: "image2.jpg", caption: "Downcut" },
  { img: "image3.jpg", caption: "Three steps" },
  { img: "image4.jpg", caption: "Shape" },
  { img: "image5.jpg", caption: "Backbush" }
];
let currentIndex = 0;
let autoPlayInterval = null;

const slider = document.getElementById("slider");
const caption = document.getElementById("caption");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");
const dotsContainer = document.getElementById("dots");

// Create dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

// Update the displayed image, caption, and dots
function updateSlide() {
  slider.style.opacity = 0;
  setTimeout(() => {
    slider.src = slides[currentIndex].img;
    caption.textContent = slides[currentIndex].caption;
    slider.style.opacity = 1;
  }, 300);

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// Next and Previous
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide();
});

// Auto Play / Pause
playBtn.addEventListener("click", () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
    playBtn.textContent = "▶ Auto Play";
  } else {
    autoPlayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    }, 2000);
    playBtn.textContent = "⏸ Pause";
  }
});