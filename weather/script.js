// Select DOM elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResult = document.getElementById("weather-result");

// Your OpenWeatherMap API key (replace with your real key)
const apiKey = "a8d40bb4e185b2bee6184293fcfa639d";

// Function to fetch weather data
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data); // for debugging in the console

    if (data.cod === 200) {
      // If city found, show weather
      weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
    } else {
      // If city not found
      weatherResult.textContent = "❌ City not found. Try again.";
    }
  } catch (error) {
    weatherResult.textContent = "⚠️ Error fetching weather data.";
    console.error(error);
  }
}

// Event listener for button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Event listener for pressing Enter
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    }
  }
});
