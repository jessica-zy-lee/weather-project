// Current Time

let now = new Date();

let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[day];

let date = now.getDate();

let month = now.getMonth();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
month = months[month];

let hour = now.getHours();
if (hour < 10) {
  hour = "0" + minute;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = "0" + minute;
}

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} <br /> ${date} ${month} <br> ${hour}:${minute}`;

// Adding forecasts

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 center-block entire-forecast-section">
        <div class="weather-forecast-date"><strong>${formatDay(
          forecastDay.dt
        )}</strong></div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" class="forecast-icons"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">  ${Math.round(
            forecastDay.temp.max
          )}°</span>
          <span class="weather-forecast-temperature-min">  ${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "afdfb0bffd236f12a02da91fe25faad9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Search engine input to inner HTML
function displayWeatherCondition(response) {
  let currentLocation = document.querySelector(".current-location");
  currentLocation.innerHTML = `in ${response.data.name}.`;
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = Math.round(response.data.main.temp_max);

  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "afdfb0bffd236f12a02da91fe25faad9";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputEmail1").value;
  searchCity(city);
}

let searchEngine = document.querySelector("form");
searchEngine.addEventListener("submit", handleSearch);

searchCity("London");

// Bonus: Geolocation button

function searchLocation(position) {
  let apiKey = "afdfb0bffd236f12a02da91fe25faad9";
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let geolocation = document.querySelector(".geolocation");
geolocation.addEventListener("click", getGeolocation);

// Fahrenheit and Celcius conversion

let celciusTemperature = null;

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  celciusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  let fahrenheitTemperature = Math.round(celciusTemperature * 1.8 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

let fahrenheitUnit = document.querySelector(".fahrenheit-unit");
fahrenheitUnit.addEventListener("click", convertFahrenheit);

function convertCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  celciusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusUnit = document.querySelector(".celcius-unit");
celciusUnit.addEventListener("click", convertCelcius);
