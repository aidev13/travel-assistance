const key = "AIzaSyAiVeGhQ0w2OQrQgxO-rc3U2vN53abcyeY";
var proxyUrl = "https://octoproxymus.herokuapp.com?secret=walrus&url=";

fetch(
  
  proxyUrl + encodeURIComponent("https://maps.googleapis.com/maps/api/distancematrix/json?origins=Milwaukee, WI&destinations=Madison, WI&key=") + key
)
  .then(function (response) {
    console.log(response)
    return response.json()
  })
  .then(function (json) {
    console.log(json)
  })
  .catch(function (error) {
    console.log(error);
  });