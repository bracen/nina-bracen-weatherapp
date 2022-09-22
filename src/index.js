//Date(day,month,year)
function dateFormat(timestamp) {
  let dateCity = new Date(timestamp);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
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
  let day = days[dateCity.getDay()];
  let date = dateCity.getDate();
  let month = months[dateCity.getMonth()];
  let year = dateCity.getFullYear();
  let hours = dateCity.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dateCity.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes} ${ampm} ${day} ${date} ${month}`;
}

//weather condition
function showWeatherCondition(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let dateElement = document.querySelector("#date");
  let minDayTemp = document.querySelector("#dayTempMin");
  let maxDayTemp = document.querySelector("#dayTempMax");
  
  dateElement.innerHTML = dateFormat(response.data.dt*1000);
  maxDayTemp.innerHTML = Math.round(response.data.main.temp_max);
  minDayTemp.innerHTML = Math.round(response.data.main.temp_min);
  cityElement.innerHTML = response.data.name;
  
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//functions
function findCity(city) {
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(url).then(showWeatherCondition);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  findCity(city.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//let celsiusTemperature = null;

let typeCity = document.querySelector("#search-form");
typeCity.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

findCity("New York");
