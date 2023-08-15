const apiKey = "template";

document.addEventListener("DOMContentLoaded", () => {
  // Check if geolocation is available
  if ("geolocation" in navigator) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Call a function to fetch weather data using the latitude and longitude
      fetchWeatherData(latitude, longitude);
      console.log("Geolocation is available.");
    });
  } else {
    console.log("Geolocation is not available.");
  }
});

// Wait for the HTML content to be loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Get references to HTML elements
  const getWeatherButton = document.getElementById("get-weather-btn");
  const locationInput = document.getElementById("location-input");
  const temperatureDiv = document.getElementById("temperature");
  const conditionsDiv = document.getElementById("conditions");
  // Add an event listener to the "Get Weather" button
  getWeatherButton.addEventListener("click", () => {
    // Get the location (city name) entered by the user
    const location = locationInput.value;
    // Check if a location is provided
    if (location) {
      // Make an API request to OpenWeatherMap using the provided location and API key
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      )
        // Convert the API response to JSON format
        .then((response) => response.json())
        .then((data) => {
          // Check if the response contains valid weather data
          if (data.main && data.weather && data.weather.length > 0) {
            // Extract temperature and conditions information from the API response
            const temperature = data.main.temp;
            const temperatureFahrenheit = (temperature * 9) / 5 + 32;
            const conditions = data.weather[0].description;
            // Display the temperature and conditions on the webpage
            temperatureDiv.textContent = `Temperature: ${temperatureFahrenheit.toFixed(
              1
            )}°F`;
            conditionsDiv.textContent = `Conditions: ${conditions}`;
            console.log("Working");
          } else {
            // If no valid weather data is available, display "No info"
            temperatureDiv.textContent = "Temperature: No info";
            conditionsDiv.textContent = "Conditions: No info";
            console.log("Info error");
          }
        })
        .catch((error) => {
          // Handle any errors that occur during the API request
          console.error("Error fetching weather data:", error);
          console.log("catch error");
        });
    }
  });
});
