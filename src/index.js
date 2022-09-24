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
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes} ${ampm} ${day}<br/> ${date} ${month} ${year}`;
}

//weather condition
function showWeatherCondition(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let dateElement = document.querySelector("#date");
  let minDayTemp = document.querySelector("#dayTempMin");
  let maxDayTemp = document.querySelector("#dayTempMax");
  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = dateFormat(response.data.dt * 1000);
  //temperature
  maxDayTemp.innerHTML = Math.round(response.data.main.temp_max);
  minDayTemp.innerHTML = Math.round(response.data.main.temp_min);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  minDayCelsius = response.data.main.temp_min;
  maxDayCelsius = response.data.main.temp_max;
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
// search functions
function findCity(city) {
  let key = "d0eb1d8786e68194a908a131778d27da";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(url).then(showWeatherCondition);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  findCity(city.value);
}
//Fahrenheit Temp function
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayLowFahrenheitTemperature(event) {
  event.preventDefault();
  let lowTemperatureElement = document.querySelector("#dayTempMin");
  let minFahrenheitTemperature = (minDayCelsius * 9) / 5 + 32;
  lowTemperatureElement.innerHTML = Math.round(minFahrenheitTemperature);
}

function displayMaxFahrenheitTemperature(event) {
  event.preventDefault();
  let highTemperatureElement = document.querySelector("#dayTempMax");
  let maxFahrenheitTemperature = (maxDayCelsius * 9) / 5 + 32;
  highTemperatureElement.innerHTML = Math.round(maxFahrenheitTemperature);
}

//Celsius Temp elememts
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayLowCelsiusTemperature(event) {
  event.preventDefault();
  let lowTemperatureElement = document.querySelector("#dayTempMin");
  lowTemperatureElement.innerHTML = Math.round(minDayCelsius);
}

function displayMaxCelsiusTemperature(event) {
  event.preventDefault();
  let highTemperatureElement = document.querySelector("#dayTempMax");
  highTemperatureElement.innerHTML = Math.round(maxDayCelsius);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
            <div class="forecast-date">${day}</div>
            <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="42"/>
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">22°</span>
              <span class="forecast-temperature-min">18°</span>
            </div>
         </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//let celsiusTemperature = null;

let typeCity = document.querySelector("#search-form");
typeCity.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
fahrenheitLink.addEventListener("click", displayLowFahrenheitTemperature);
fahrenheitLink.addEventListener("click", displayMaxFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
celsiusLink.addEventListener("click", displayLowCelsiusTemperature);
celsiusLink.addEventListener("click", displayMaxCelsiusTemperature);

findCity("New York");
displayForecast();