
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

      // console.log(data);

      // process data from the backend
      let temperature = data.temperature;
      let description = data.description;

      // update the frontend
      temperatureResult.textContent = (`${temperature}°C`);
      descriptionResult.textContent = description;

      generateWeatherDiv(location, data);

    })
    .catch(error => {
      console.error('Error fetching weather data', error);
    })
})

const generateWeatherDiv = (location, dataArr) => {

  console.log(dataArr);

  const newWeatherDiv = document.createElement("div");
  newWeatherDiv.classList.add("weather-content");

  // top - title, quick description, collapse button
  const newTop = document.createElement("div");
  newTop.classList.add("weather-top");
  newTop.classList.add("flex-row-between");

  const topTitle = document.createElement("h2");
  topTitle.classList.add("top-title");
  topTitle.textContent = location;


  const topDesc = document.createElement("h2");
  topDesc.classList.add("top-desc");
  topDesc.textContent = dataArr.description;


  const topBtn = document.createElement("div");
  topBtn.classList.add("top-btn");
  topBtn.addEventListener("click", () => {
    // collapse code
    console.log("click");
    const myContent = document.getElementById(`${location}-content`)
    myContent.classList.toggle("middle-content");
    myContent.classList.toggle("hide");
  })

  newTop.append(topTitle);
  newTop.append(topDesc);
  newTop.append(topBtn);

  newWeatherDiv.append(newTop);

  // middle - in depth data - low/high/humidity/description
  const newMiddle = document.createElement("div");
  newMiddle.id = (`${location}-content`);
  newMiddle.classList.add("middle-content");

  newWeatherDiv.append(newMiddle);

  // also add future weather data?

  weatherContainer.append(newWeatherDiv);

}