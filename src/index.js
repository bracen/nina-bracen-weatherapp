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
  getForecast(response.data.coord);
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


//Celsius Temp elememts
function displayCelsiusTemperature(event) {
  event.preventDefault();
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
//5 days forecast

function formatDay(timestamp){
  let date = new Date(timestamp*1000)
  let day=date.getDay();
  let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return days[day]
}
function getForecast(coordinates){
  let key = "8ca7dd4e61360b90fb66918853670e48";
  let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayForecast);
}

function displayForecast(response) {
  let forecast=response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
 forecast.forEach(function (forecastDay,index) {
  if(index<5){
    forecastHTML =
      forecastHTML +
      `<div class="col">
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42"/>
            <div class="forecast-temperature">
              <span class="forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span> |
              <span class="forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
            </div>
         </div>`;
  }});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}



let typeCity = document.querySelector("#search-form");
typeCity.addEventListener("submit", search);




findCity("Wellington");
