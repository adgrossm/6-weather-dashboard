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
        var currentTemp = Math.round(((response.main.temp) - 273) * 1.8 +32)
        //  var for weather icon
        var weatherIcon = (response.weather[0].icon)
        console.log(response.weather[0].icon)
        // var for wind speed might need to convert to mph and chop the last 3 digits
        var windSpeed = Math.round((response.wind.speed)*2.237)
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

        // create var for temp icon, temp, and humidity
        var day1Date = (response.list[4].dt_txt)
        var day1Temp = Math.round(((response.list[4].main.temp) -273) *1.8 +32)
        var day1Humidity = Math.round(response.list[4].main.humidity)
        var day2Temp = Math.round(((response.list[12].main.temp) -273) *1.8 +32)
        var day2Humidity = Math.round(response.list[12].main.humidity)
        var day3Temp= Math.round(((response.list[20].main.temp) -273) *1.8 +32)
        var day3Humidity = Math.round(response.list[20].main.humidity)
        var day4Temp = Math.round(((response.list[28].main.temp) -273) *1.8 +32)
        var day4Humidity = Math.round(response.list[28].main.humidity)
        var day5Temp = Math.round(((response.list[36].main.temp) -273) *1.8 +32)
        var day5Humidity = Math.round(response.list[36].main.humidity)
        var day1Temp = Math.round(((response.list[4].main.temp) -273) *1.8 +32)
        var day1Humidity = Math.round(response.list[4].main.humidity)
        
        console.log
        // console.log(day1Temp, day2Temp, day3Temp, day4Temp, day5Temp)
        $("#forecast-cards").empty()
        for (var i = 0; i < 5; i++) {
            var card = $("<div>").addClass("bg-primary col text-light").addClass(`card${i}`);
                  
            $("#forecast-cards").append(card)
           
        }
        // created and appended temp, date and humidity.  need to adjust the temp and humidity to .00 digits and also
        // we pulled the day1DateDiv but it needs to be adjusted for proper formatting

        var day1DateDiv = $("<h5>").text(day1Date);

        var day1TempDiv = $("<h5>").text("Temp: " + day1Temp + " \u00B0" + "F");
        var day1HumidityDiv = $("<h5>").text("Humidity: " + day1Humidity +  "%");
        var day2TempDiv = $("<h5>").text("Temp: " + day2Temp + " \u00B0" + "F");
        var day2HumidityDiv = $("<h5>").text("Humidity: " + day2Humidity +  "%");
        var day3TempDiv = $("<h5>").text("Temp: " + day3Temp + " \u00B0" + "F");
        var day3HumidityDiv = $("<h5>").text("Humidity: " + day3Humidity +  "%");
        var day4TempDiv = $("<h5>").text("Temp: " + day4Temp + " \u00B0" + "F");
        var day4HumidityDiv = $("<h5>").text("Humidity: " + day4Humidity +  "%");
        var day5TempDiv = $("<h5>").text("Temp: " + day5Temp + " \u00B0" + "F");
        var day5HumidityDiv = $("<h5>").text("Humidity: " + day5Humidity +  "%");

        $(".card0").append(day1DateDiv, day1TempDiv, day1HumidityDiv)
        $(".card1").append(day2TempDiv, day2HumidityDiv)
        $(".card2").append(day3TempDiv, day3HumidityDiv)
        $(".card3").append(day4TempDiv, day4HumidityDiv)
        $(".card4").append(day5TempDiv, day5HumidityDiv)

    })
}

function clickListItem() {
    var city = $(this).text()
    searchForCity(city)
}











