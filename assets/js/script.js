const distanceAPIkey = "AIzaSyAiVeGhQ0w2OQrQgxO-rc3U2vN53abcyeY";
var proxyUrl = "https://octoproxymus.herokuapp.com?secret=walrus&url=";
var apiKey = "59a3c0db12e1f890c3e94259c9168e7f";
var startInput = document.getElementById("startLocation");
var endInput = document.getElementById("endLocation");
var distanceData = document.getElementById("distancetimeData");
var startData = document.getElementById('startWeatherData')
var searchBtn = document.getElementById('searchBtn')
var startValue = startInput.value
var endValue = endInput.value
// console.log(startValue)
var searchedArray = []
// const savedKeys = document.getElementById("savedKeyValues")



// ----- LocalStorage begin -----

function clientSideStorage(startValue, endValue) {
  var startValue = startInput.value
  var endValue = endInput.value
  // let storedStartValue = localStorage.getItem('startKey')
  // let storedEndValue = localStorage.getItem('endKey')

  localStorage.setItem('startKey', startValue) 
  localStorage.setItem('endKey', endValue)
}


// var empty = 'Get Started'
// var lastStartSearch = (localStorage.getItem('startKey')) || 'N/A'
// var lastEndSearch = (localStorage.getItem('endKey')) || 'N/A'

// console.log(lastStartSearch)
// console.log(lastEndSearch)


// var sidebarStartEl = document.createElement('li')
// var sidebarEndEl = document.createElement('li')
// sidebarStartEl.classList.add("sidebarBtnStyle")
// sidebarEndEl.classList.add("sidebarBtnStyle")
// sidebarStartEl.innerHTML = "Start: " + lastStartSearch
// sidebarEndEl.innerHTML = "End: " + lastEndSearch
// // getting html id
// var area = document.getElementById('areaForSearchedResultsButtons')
// area.appendChild(sidebarStartEl)
// area.appendChild(sidebarEndEl)

function attack() {
  var lastStartSearch = (localStorage.getItem('startKey')) || 'N/A'
  var lastEndSearch = (localStorage.getItem('endKey')) || 'N/A'

  console.log(lastStartSearch)
  console.log(lastEndSearch)


  var sidebarStartEl = document.createElement('li')
  var sidebarEndEl = document.createElement('li')
  var hLine = document.createElement('hr')
  hLine.classList.add('hr')
  sidebarStartEl.classList.add("sidebarBtnStyle")
  sidebarEndEl.classList.add("sidebarBtnStyle")
  sidebarStartEl.innerHTML = "Start: " + lastStartSearch
  sidebarEndEl.innerHTML = "End: " + lastEndSearch
  
  var area = document.getElementById('areaForSearchedResultsButtons')
  area.appendChild(sidebarStartEl)
  area.appendChild(sidebarEndEl)
  area.appendChild(hLine)

}

// ----- LocalStorage end -----


function getDistance(origin, destination) {
  fetch(proxyUrl + encodeURIComponent("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origin + "&destinations=" + destination + "&units=imperial&key=") + distanceAPIkey)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      distanceData.innerHTML = origin + " to " + destination + ": " + json.rows[0].elements[0].distance.text + ", " + json.rows[0].elements[0].duration.text;

      // distance and time title
      var distanceAndTimeTitle = document.getElementById('distanceTime')
      distanceAndTimeTitle.innerText = "Distance and Time"
    })
    .catch(function (error) {
      console.log(error);

    });
}

// Fetch Weather API for current weather
//TODO: Verify if fetchStartLocationWeather is deprecated, delete if necessary
function fetchStartLocationWeather(cityName) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (getWeather) {
      console.log(getWeather);
    });
}


// Fetch Weather API for current weather
//TODO research weather api for state param for future improvements
function fetchLocationWeather(inputValue, elementId) {
  var zipUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' + inputValue + '&units=imperial&appid=' + apiKey
  var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&units=imperial&appid=' + apiKey
  var re = /^\d{5}$/
  var isZip = re.test(inputValue)
  var url = isZip ? zipUrl : cityUrl

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
      //title for weather api
      var weatherTitle = document.getElementById('weatherTitle')
      weatherTitle.innerText = 'Current Weather'


      weatherElement.innerHTML = "<h5>City: " + locationCity + "</h5>" + "<li>Current Temp: " + currentTemp + "</li>" + "<li>High Temp: " + maxTemp + "</li>" + "<li>Low Temp: " + lowTemp + "</li>"

    })

}


searchBtn.addEventListener('click', function (event) {
  event.preventDefault()
  var startLocationValue = startInput.value
  var endLocationValue = endInput.value

  var startCityStateArray = startLocationValue.split(', ')
  var endCityStateArray = endLocationValue.split(', ')

  // startCity could be a zip code, see 'fetchLocationWeather' function
  var startCity = startCityStateArray[0]
  // endCity could be a zip code, see 'fetchLocationWeather' function
  var endCity = endCityStateArray[0]

  var startState = startCityStateArray[1]
  var endState = endCityStateArray[1]
  var startGoogleApiQuery = startState ? startLocationValue : startCity
  var endGoogleApiQuery = endState ? endLocationValue : endCity

  // Google API
  // fetchStartLocationWeather(startGoogleApiQuery);
  getDistance(startGoogleApiQuery, endGoogleApiQuery);
  // Openweathermap API
  fetchLocationWeather(startCity, 'startWeatherData')
  fetchLocationWeather(endCity, 'endWeatherData')
  clientSideStorage()
  attack()

})

// sidebar JS
var mini = true;
document.getElementById("sidebarTitle").style.display = "none";
document.getElementById("searchIcon").style.display = "";
// sidebarStartEl.style.display = "none";
// sidebarEndEl.style.display = "none";
document.querySelector('hr').style.display = 'none';
document.getElementById('areaForSearchedResultsButtons').style.display = 'none';

function toggleSidebar() {

  if (mini) {
    // console.log("opening sidebar");
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("searchIcon").style.display = "none";
    document.getElementById("sidebarTitle").style.display = "";
    // sidebarStartEl.style.display = "";
    // sidebarEndEl.style.display = "";
    document.getElementById('areaForSearchedResultsButtons').style.display = '';
    document.querySelector('hr').style.display = '';
    this.mini = false;
  } else {
    // console.log("closing sidebar");
    document.getElementById("mySidebar").style.width = "65px";
    document.getElementById("main").style.marginLeft = "65px";
    document.getElementById("sidebarTitle").style.display = "none";
    document.getElementById("searchIcon").style.display = "";
    // sidebarStartEl.style.display = "none";
    // sidebarEndEl.style.display = "none";
    document.getElementById('areaForSearchedResultsButtons').style.display = 'none';
    document.querySelector('hr').style.display = 'none';
    this.mini = true;
  }
}
