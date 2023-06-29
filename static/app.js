
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const temperatureResult = document.getElementById("temperatureResult");
const descriptionResult = document.getElementById("descriptionResult");

let weatherData = []



searchButton.addEventListener("click", () => {

  let location = searchInput.value;
  console.log(location)
  
  const url = `/get_weather_data?location=${location}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {

      console.log(data);

      // process data from the backend
      let temperature = data.temperature;
      let description = data.description;

      // update the frontend
      temperatureResult.textContent = (`${temperature}°C`);
      descriptionResult.textContent = description;
    })
    .catch(error => {
      console.error('Error fetching weather data', error);
    })
})