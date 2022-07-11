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

// Fahrenheit challenge

// function changeToCelcius(event) {
//   event.preventDefault();
//   let currentTemperature = document.querySelector(".current-temperature");
//   currentTemperature.innerHTML = `19`;
// }

// let clickCelcius = document.querySelector(".celcius-unit");
// clickCelcius.addEventListener("click", changeToCelcius);

// function changeToFahrenheit(event) {
//   event.preventDefault();
//   let currentTemperature = document.querySelector(".current-temperature");
//   currentTemperature.innerHTML = `66`;
// }

// let clickFahrenheit = document.querySelector(".fahrenheit-unit");
// clickFahrenheit.addEventListener("click", changeToFahrenheit);
