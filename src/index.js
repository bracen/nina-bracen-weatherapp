//Date(day,month,year)
let currentTime = new Date();
function dateFormat() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[currentTime.getDay()];
  let date = currentTime.getDate();
  let month = months[currentTime.getMonth()];
  let year = currentTime.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
let dateElement = document.querySelector("#date");
dateElement.innerHTML = dateFormat(currentTime);
//Time info
function timeFormat(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let timeElement = document.querySelector("#time");
timeElement.innerHTML = timeFormat(currentTime);

//weather condition
function showWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `humidity : ${response.data.main.humidity} %`;
  document.querySelector(
    "#wind"
  ).innerHTML = `windspeed : ${response.data.wind.speed} km/h`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  findCity(city);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);

function findCity(city) {
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(url).then(showWeatherCondition);
}

function retrievePosition(position) {
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`;
  axios.get(url).then(showWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let searchMyCity = document.querySelector("#currentButton");
searchMyCity.addEventListener("click", getCurrentLocation);
