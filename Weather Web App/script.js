const apiKey = "api key";

document.addEventListener("DOMContentLoaded", () => {
  // Get references to HTML elements
  const getWeatherButton = document.getElementById("get-weather-btn");
  const locationInput = document.getElementById("location-input");
  const temperatureDiv = document.getElementById("temperature");
  const conditionsDiv = document.getElementById("conditions");

  if ("geolocation" in navigator) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchWeatherByCoords(latitude, longitude);
      console.log("latitude: ", latitude, "longitude: ", longitude);
    });
  }
  // Add an event listener to the "Get Weather" button
  getWeatherButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location) {
      fetchWeatherByCity(location);
      console.log("city located");
    }
  });
});

function fetchWeatherByCoords(latitude, longitude) {
  // Make an API request to OpenWeatherMap using the provided latitude, longitude, and API key
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // Extract temperature and conditions information from the API response
      const temperature = data.main.temp;
      const conditions = data.weather[0].description;

      // Update the DOM with weather information
      updateWeatherInfo(temperature, conditions);
    })
    .catch((error) => {
      // Handle any errors that occur during the API request
      console.error("Error fetching weather data:", error);
    });
}

function fetchWeatherByCity(city) {
  // Make an API request to OpenWeatherMap using the provided city and API key
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // Extract temperature and conditions information from the API response
      const temperature = data.main.temp;
      const conditions = data.weather[0].description;

      // Update the DOM with weather information
      updateWeatherInfo(temperature, conditions);
    })
    .catch((error) => {
      // Handle any errors that occur during the API request
      console.error("Error fetching weather data:", error);
    });
}

function updateWeatherInfo(temperature, conditions) {
  // Get references to HTML elements
  const temperatureDiv = document.getElementById("temperature");
  const conditionsDiv = document.getElementById("conditions");
  const temperatureFahrenheit = (temperature * 9) / 5 + 32;
  // Display the temperature and conditions on the webpage
  temperatureDiv.textContent = `Temperature: ${temperatureFahrenheit.toFixed(
    1
  )}°F`;
  conditionsDiv.textContent = `Conditions: ${capitalizeFirstLetter(
    conditions
  )}`;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
