
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const weatherContainer = document.getElementById("weatherContainer");

// will be removed in the future - will generate content instead
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

      generateWeatherDiv("test", "test");

    })
    .catch(error => {
      console.error('Error fetching weather data', error);
    })
})

const generateWeatherDiv = (location, dataArr) => {

  const newWeatherDiv = document.createElement("div");
  newWeatherDiv.classList.add("weather-content");

  // top - title, quick description, collapse button
  const newTop = document.createElement("div");
  newTop.classList.add("weather-top");

  const topTitle = document.createElement("h2");
  topTitle.textContent = location;
  const topDesc = document.createElement("h2");
  topDesc.textContent = dataArr.description;
  const topBtn = document.createElement("div");
  topBtn.classList.add("topBtn");

  newTop.append(topTitle);
  newTop.append(topDesc);
  newTop.append(topBtn);

  newWeatherDiv.append(newTop);
  // middle - in depth data - low/high/humidity/description


  // also add future weather data?

  weatherContainer.append(newWeatherDiv);

}