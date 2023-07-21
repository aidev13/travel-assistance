const distanceAPIkey = "AIzaSyAiVeGhQ0w2OQrQgxO-rc3U2vN53abcyeY";
var proxyUrl = "https://octoproxymus.herokuapp.com?secret=walrus&url=";

var apiKey = "59a3c0db12e1f890c3e94259c9168e7f";
var startInput = document.getElementById("startLocation");
var endInput = document.getElementById("endLocation");
var distanceData = document.getElementById("distancetimeData");
console.log(startInput);
// var searchBtn = document.querySelector("button");
var startData = document.getElementById('startWeatherData')

// var apiKey = '59a3c0db12e1f890c3e94259c9168e7f'
// var startInput = document.getElementById('startLocation')
// var endInput = document.getElementById('endLocation')
// console.log(startInput)
var searchBtn = document.getElementById('searchBtn')
// var startData = document.getElementById('startWeatherData')

function getDistance(origin, destination) {
  fetch(proxyUrl + encodeURIComponent("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origin + "&destinations=" + destination + "&units=imperial&key=") + distanceAPIkey)
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

// fetch(

//   proxyUrl + encodeURIComponent("https://maps.googleapis.com/maps/api/distancematrix/json?origins=Milwaukee, WI&destinations=Madison, WI&key=") + key
// )
//   .then(function (response) {
//     console.log(response)
//     return response.json()
//   })
//   .then(function (json) {
//     console.log(json)
//   })
//   .catch(function (error) {
//     console.log(error);
//   });




// Fetch Weather API for current weather
// TODO: change cityName 
function fetchLocationWeather(inputValue, elementId) {
  var url = ''
  var re = /^\d{5}$/
  var isZip = re.test(inputValue)
  if (isZip) {
    url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + inputValue + '&units=imperial&appid=' + apiKey
  } else {
    url = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&units=imperial&appid=' + apiKey
  }

  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (getWeather) {
      console.log(getWeather)

      var currentTemp = getWeather.main.temp;
      var maxTemp = getWeather.main.temp_max;
      var lowTemp = getWeather.main.temp_min;
      var locationCity = getWeather.name
      var weatherElement = document.getElementById(elementId)

      weatherElement.innerHTML = "<h5>City: " + locationCity + "</h5>" + "<li>Current Temp: " + currentTemp + "</li>" + "<li>High Temp: " + maxTemp + "</li>" + "<li>Low Temp: " + lowTemp + "</li>"
      console.log(currentTemp)


    })

}
const re = /\d{5}/


searchBtn.addEventListener('click', function (event) {
  var startLocationValue = startInput.value
  var endLocationValue = endInput.value
  event.preventDefault()
  fetchLocationWeather(startLocationValue, 'startWeatherData')
  fetchLocationWeather(endLocationValue, 'endWeatherData')
  console.log(startLocationValue, endLocationValue)

})
