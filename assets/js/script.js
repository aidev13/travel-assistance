var apiKey = '59a3c0db12e1f890c3e94259c9168e7f'
var startInput = document.getElementById('startLocation')
console.log(startInput)
var searchBtn = document.querySelector('button')


// Fetch Weather API for current weather
function fetchStartLocationWeather(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey)
        .then(function (response) {
            return response.json()
        })
        .then(function (getWeather) {
            console.log(getWeather)

        })

}

searchBtn.addEventListener('click', function (event) {
    var city = startInput.value
    event.preventDefault()
    fetchStartLocationWeather(city)

})