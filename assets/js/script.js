// original URL:
var cityUrl = "https://api.openweathermap.org/geo/1.0/direct?limit=5&appid=e0c79796705c396d02d89d49c8fdba43";
var key = "e0c79796705c396d02d89d49c8fdba43";
var fiveDayArray = [1, 2, 3, 4, 5];
var mainResultEl = document.querySelector("#main-section-result");
var weatherIcon = document.querySelector(".weather-icon");
var temp = document.getElementById("temperature");
var wind = document.getElementById("wind");
var hum = document.getElementById("humidity");
var uv = document.getElementById("uv-index");
var date = document.getElementById("current-date");
var icon = "https://openweathermap.org/img/w/";
var searchForm = document.getElementById("user-search");
var cityArray = [];

var loadCities = function() {
  var getCities = JSON.parse(localStorage.getItem("cityName"));
  console.log(getCities);

  for (var i = 0; i < getCities.length; i++) {
    var loadCityBtn = document.createElement("button");
    loadCityBtn.className = "btn";
    loadCityBtn.style.marginTop = "22px";
    loadCityBtn.style.color = "white";
    loadCityBtn.style.fontSize = "16px";
    loadCityBtn.style.letterSpacing = "1px";
    loadCityBtn.style.backgroundColor = "#4fa1dc";
    loadCityBtn.textContent = getCities[i];
    document.getElementById("search").appendChild(loadCityBtn);
  }
}

// >>>>>> create another function to run the savd city button when clicked <<<<<<<

// get weather data:
var onSearchSubmit = function(event) {
  var fData = new FormData(event.target);
  event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${fData.get("cityname")}&units=imperial&appid=${key}`)
      .then(function(response) {
        cityArray.push(fData.get("cityname"));
        localStorage.setItem("cityName", JSON.stringify(cityArray)); // key gives acces - "cityName" 
        console.log(cityArray);
      return response.json();
  })
      .then(function(data) {
      console.log(data.main);

  var lat = data.coord.lat;
  var lon = data.coord.lon;
  var fiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=imperial&wind=speed&appid=${key}`;
    fetch(fiveDayForecastUrl)
      .then((response) => response.json())
      .then((res) => {
        mainResultEl.innerText = data.name;

        var date = dayjs(new Date()).format("dddd, MM/DD/YYYY").toString(); // single day
          document.getElementById("current-date").innerText = date;

        weatherIcon.innerHTML = `<img src="./icons/${data.weather[0].icon}.png">`;
        temp.innerText = Math.floor(data.main.temp);
        wind.innerText = data['wind']['speed'] + " MPH";
        hum.innerText = data.main.humidity + "%"; 
        uv.innerText = res.current.uvi;
        var uvData = res.current.uvi;
        if (uvData <= 2.99) {
          var normal = document.querySelector(".uv-levels");
          normal.setAttribute("style", "background-color:#00e200;");
        } else if (uvData >= 3.0 && uvData <= 5.99) {
          var aboveNormal = document.querySelector(".uv-levels");
          aboveNormal.setAttribute("style", "background-color:#fee736;");
        } else if (uvData >= 6.0 && uvData <= 7.99) {
          var high = document.querySelector(".uv-levels");
          high.setAttribute("style", "background-color:#ffa909;");
        } else if (uvData >= 8.0 && uvData <= 9.99) {
          var veryHigh = document.querySelector(".uv-levels");
          veryHigh.setAttribute("style", "background-color:#fd0b57;");
        } else if (uvData >= 10.0) {
          var extreme = document.querySelector(".uv-levels");
          extreme.setAttribute("style", "background-color:#c32aff;");
        } else {
          console.log("no color");
        };

         console.log(uv);

        var dailyForecast = function(day) {
          var card = document.getElementById("day" + day);
          var forecastDay = res.daily[day];
          // console.log(forecastDay);

          var fiveDays = dayjs(new Date()).format("MM/DD/YYYY").toString(); // five day forecast
            document.querySelectorAll(".date-goes-here").innerText = date;

          card.querySelector("#w-icon").innerHTML = `<img src="./icons/${forecastDay.weather[0].icon}.png">`;
          card.querySelector("#temperature").innerText = Math.floor(forecastDay.temp.day);
          card.querySelector("#wind").innerText = Math.floor(forecastDay.wind_speed) + " MPH";
          card.querySelector("#humidity").innerText = forecastDay.humidity + "%";
          // console.log(forecastDay.wind);
        }
        
        for (var i = 0; i < fiveDayArray.length; i++) {
            dailyForecast(fiveDayArray[i]);
        }
  
        console.log(res.daily[0]);
    });

// this grabs the city that is typed into the search field:
  var fData = new FormData(event.target);

  var city = fData.get("cityname");
    fetch(cityUrl + "&q=" + city) 
      .then(function(response) {
      return response.json();
    })
      .then(function(response) {
      return response[0];
    })
      .then(console.log);
  })

  .catch((err) => console.log(err));
}

// search city button submitted:
searchForm.addEventListener("submit", onSearchSubmit);
loadCities();
