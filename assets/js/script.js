// original URL:
var cityUrl = "https://api.openweathermap.org/geo/1.0/direct?limit=5&appid=e0c79796705c396d02d89d49c8fdba43";
var key = "e0c79796705c396d02d89d49c8fdba43";
var city = "Houston";
var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
// console.log(currentWeatherUrl);
// main section result goes here:
var mainResultEl = document.querySelector("#main-section-result");
// search button
var searchForm = document.getElementById("user-search");

// get weather data:
var onSearchSubmit = function(event) {
  event.preventDefault();

    fetch(currentWeatherUrl)
      .then(function(response) {
      return response.json();
  })
      .then(function(data) {
        console.log(data.coord);

  var lat = data.coord.lat;
  var lon = data.coord.lon;
  var fiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
    fetch(fiveDayForecastUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
    });

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
}

searchForm.addEventListener("submit", onSearchSubmit);
 




// var searchForm = document.getElementById("user-search");
// var onSearchSubmit = function(event) {
//   event.preventDefault();

// var fData = new FormData(event.target);

// var city = fData.get("cityname");
//   fetch(cityUrl + "&q=" + city) 
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(response) {
//     return response[0];
//   })
//   .then(console.log);
// }

// searchForm.addEventListener("submit", onSearchSubmit);
