var apiKey = '59a3c0db12e1f890c3e94259c9168e7f'
var startInput = document.getElementById('startLocation')
var endInput = document.getElementById('endLocation')
console.log(startInput)
var searchBtn = document.getElementById('searchBtn')


// Fetch Weather API for current weather
function fetchLocationWeather(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey)
        .then(function (response) {
            return response.json()
        })
        .then(function (getWeather) {
            console.log(getWeather)

        })

}






searchBtn.addEventListener('click', function (event) {
    var startLocationValue = startInput.value
    var endLocationValue = endInput.value
    event.preventDefault()
    fetchLocationWeather(startLocationValue)
    fetchLocationWeather(endLocationValue)
    console.log(startLocationValue, endLocationValue)

})