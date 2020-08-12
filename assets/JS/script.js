var cityName = [];
var date = moment().format("MMM Do YYYY");

$("#searchForm").on("submit", function (event) {
    event.preventDefault();

    var userInputCity = $("input").val();

    var item = $("<div>").text(userInputCity).click(clickListItem)
    $("#city-list").append(item)

    searchForCity(userInputCity)
});

function searchForCity(city) {
    const BASE_ROUTE = "http://api.openweathermap.org/data/2.5/"
    const API_KEY = "&appid=772aa38073453f8d8d0313dbbfa771e1"
    const UV_API_KEY = "?appid=772aa38073453f8d8d0313dbbfa771e1&lat="
    var weatherURL = BASE_ROUTE + "weather?q=" + city + API_KEY

    // this is the forecast call
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $(".jumbotron").empty()
        // create a var to store Humidity
        var humidity = (response.main.humidity)
        // create var to change Kelvin to Far
        var currentTemp = (((response.main.temp) - 273) * 1.8 +32)
        //  var for weather icon
        var weatherIcon = (response.weather[0].icon)
        console.log(response.weather[0].icon)
        // var for wind speed might need to convert to mph and chop the last 3 digits
        var windSpeed = ((response.wind.speed)*2.237)
        // see below around line 50 for the var for the uv index
        
        // console.log(windSpeed)
        // coord: {lat: 29.7633, lon: -95.3633} example
        var latitude = (response.coord.lat) 
        // console.log(latitude)// From response
        var longitude = (response.coord.lon) // From response
        // console.log(longitude)
        // variable to store the uv for the location based on latitude and longitue
        var cityDiv = $("<h2>").text(city + "  (" + date + ")") ;
        var tempDiv = $("<h4>").text("Temperature: " + currentTemp + " \u00B0" + "F");
        var humidityDiv = $("<h4>").text("Humidity: " + humidity+"%");
        var windDiv = $("<h4>").text("Wind Speed: " + windSpeed+" MPH");
        
        $(".jumbotron").append(cityDiv, tempDiv, humidityDiv, windDiv);

        var uvURL = BASE_ROUTE + "uvi" + UV_API_KEY + latitude + "&lon=" + longitude
        // var uvURL = BASE_ROUTE + "forecast?q=" + latitude + longitude + API_KEY
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            // var for uvIndex to get passed into current weather jumbotron
            var uvIndex = (response.value)
            console.log(uvIndex)
            var uvDiv = $("<h4>").text("UV Index: " + uvIndex);
            $(".jumbotron").append(uvDiv);
        })
    })
    // this is the forecast call
    var forecastURL = BASE_ROUTE + "forecast?q=" + city + API_KEY
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        $("#forecast-cards").empty()
        for (var i = 0; i < 5; i++) {
            var card = $("<div>").addClass("bg-primary col text-light").text(i)

            $("#forecast-cards").append(card)
        }

    })
}

function clickListItem() {
    var city = $(this).text()
    searchForCity(city)
}











