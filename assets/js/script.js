const distanceAPIkey = "AIzaSyAiVeGhQ0w2OQrQgxO-rc3U2vN53abcyeY";
var proxyUrl = "https://octoproxymus.herokuapp.com?secret=walrus&url=";

var apiKey = "59a3c0db12e1f890c3e94259c9168e7f";
var startInput = document.getElementById("startLocation");
var endInput = document.getElementById("endLocation");
var distanceData = document.getElementById("distancetimeData");
console.log(startInput);
var searchBtn = document.querySelector("button");

function getDistance(origin, destination) {
  fetch(proxyUrl + encodeURIComponent("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origin + "&destinations=" + destination + "&key=") + distanceAPIkey)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      distanceData.innerHTML = origin + " to " + destination + ": " + json.rows[0].elements[0].distance.text + ", " + json.rows[0].elements[0].duration.text;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Fetch Weather API for current weather
function fetchStartLocationWeather(cityName) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (getWeather) {
      console.log(getWeather);
    });
}

searchBtn.addEventListener("click", function (event) {
  var startCity = startInput.value;
  var endCity = endInput.value;
  event.preventDefault();
  fetchStartLocationWeather(startCity);
  getDistance(startCity, endCity);
});
