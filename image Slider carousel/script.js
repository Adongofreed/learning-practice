const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg"
]
let currentIndex = 0;

const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

//updating the image
function updateImage() {
    slider.src = images[currentIndex];
}

//go to next image
nextBtn.addEventListener("click", function(){
currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    updateImage();
});

//go to previous image
prevBtn.addEventListener("click", function(){
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    updateImage();
});