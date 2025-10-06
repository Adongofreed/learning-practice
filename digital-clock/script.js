//set the format to be always two digits
function formatTime(unit){
    return unit < 10 ? "0" + unit : unit;
}

const clock = document.getElementById("clock");
const dateElement = document.getElementById("date");
const toggleBtn = document.getElementById("toggleBtn");

let is24Hour = false; //default 12-hour format

//keep updating every second
function updateClock(){
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let timeString;

    if (is24Hour){
        timeString = 
        formatTime(hours) + ":" +
        formatTime(minutes) + ":" +
        formatTime(seconds);
    } else {
    //Am or Pm
    const ampm = hours >= 12 ? "PM" : "AM";

    //convert to 12 hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    timeString =
        formatTime(hours) + ":" +
        formatTime(minutes) + ":" +
        formatTime(seconds) + " " + ampm;
    }
    clock.textContent = timeString;

//date part
const day = now.getDate();
const month = now.getMonth() + 1; //fix 0-11
const year = now.getFullYear();

const dateString =
    formatTime(day) + "/" +
    formatTime(month) + "/" +
    year;

dateElement.textContent = dateString;
}

toggleBtn.addEventListener("click", () => {
    is24Hour = !is24Hour;
    toggleBtn.textContent = is24Hour 
    ? "Switch to 12-Hour" 
    : "Switch to 24-Hour";
    updateClock(); //update immediately on toggle
});

//run every second
setInterval(updateClock, 1000);

updateClock();