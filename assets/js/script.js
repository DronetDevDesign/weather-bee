var apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=e0c79796705c396d02d89d49c8fdba43";
 // dynamic value
var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?limit=5&appid=e0c79796705c396d02d89d49c8fdba43";

var searchForm = document.getElementById("user-search");
var onSearchSubmit = function(event) {
  event.preventDefault();

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
}

searchForm.addEventListener("submit", onSearchSubmit);