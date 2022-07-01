var key = "e0c79796705c396d02d89d49c8fdba43";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=e0c79796705c396d02d89d49c8fdba43";

fetch(apiUrl, {
  "method": "GET",
  "headers": {

    }
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
});