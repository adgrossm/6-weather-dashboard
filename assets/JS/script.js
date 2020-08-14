// var cityName = [];
var date = moment().format("MMM Do YYYY");

$("#searchForm").on("submit", function (event) {
    event.preventDefault();

    var userInputCity = $("input").val();

    var item = $("<td>").text(userInputCity).click(clickListItem)
    $(".table").append(item)
    // $("#city-list").append(item)

    searchForCity(userInputCity)
});

function searchForCity(city) {
    const BASE_ROUTE = "http://api.openweathermap.org/data/2.5/"
    const API_KEY = "&appid=772aa38073453f8d8d0313dbbfa771e1"
    const UV_API_KEY = "?appid=772aa38073453f8d8d0313dbbfa771e1&lat="
    var weatherURL = BASE_ROUTE + "weather?q=" + city + API_KEY
    
    // var forecastTempIconURL = "http://openweathermap.org/img/wn/" + IconId + "2x.png"  
    // var iconIdCurrent = (response.)
    // var iconIdForecast = (response.)
    // this is the forecast call
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        // code to empty jumbotron content with new city info
        $(".jumbotron").empty()
        // create a var to store Humidity
        var humidity = (response.main.humidity)
        // create var to change Kelvin to Far
        var currentTemp = Math.round(((response.main.temp) - 273) * 1.8 +32)
        //  var for weather icon
        // var moviePoster = $("<img>").attr("src", response.Poster);
        // *******************************  just added the code below on 8/13 11.43am need to find where the src is in the response
        
        var iconIdCurrent = (response.weather[0].icon)
        var currentTempIconURL = "http://openweathermap.org/img/wn/" + iconIdCurrent + "@2x.png"    
        console.log(response.weather[0].icon)
        var weatherIcon = $("<img>").attr("src", currentTempIconURL)
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
        var currentIconDiv = $("<div>").append(weatherIcon);
        var tempDiv = $("<h4>").text("Temperature: " + currentTemp + " \u00B0" + "F");
        var humidityDiv = $("<h4>").text("Humidity: " + humidity+"%");
        var windDiv = $("<h4>").text("Wind Speed: " + windSpeed+" MPH");
        
        $(".jumbotron").append(cityDiv, currentIconDiv, tempDiv, humidityDiv, windDiv);

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
        
        console.log(day1Date)
        // var for day1 Icon
        var day1Temp = Math.round(((response.list[4].main.temp) -273) *1.8 +32)
        var day1Humidity = Math.round(response.list[4].main.humidity)

        var day2Date = (response.list[12].dt_txt)
// var for day2 Icon
        var day2Temp = Math.round(((response.list[12].main.temp) -273) *1.8 +32)
        var day2Humidity = Math.round(response.list[12].main.humidity)

        var day3Date = (response.list[20].dt_txt)
// var for day3 Icon
        var day3Temp= Math.round(((response.list[20].main.temp) -273) *1.8 +32)
        var day3Humidity = Math.round(response.list[20].main.humidity)

        var day4Date = (response.list[28].dt_txt)
// var for day4 Icon
        var day4Temp = Math.round(((response.list[28].main.temp) -273) *1.8 +32)
        var day4Humidity = Math.round(response.list[28].main.humidity)

        var day5Date = (response.list[36].dt_txt)
// var for day5 Icon
        var day5Temp = Math.round(((response.list[36].main.temp) -273) *1.8 +32)
        var day5Humidity = Math.round(response.list[36].main.humidity)
     
        
        
        // console.log(day1Temp, day2Temp, day3Temp, day4Temp, day5Temp)
        $("#forecast-cards").empty()
        
        $(".5-day").empty()  
        $(".5-day").append("5-Day Forecast")
        // .prepend("<h2>" + "5-Day Forecast")
        for (var i = 0; i < 5; i++) {
             
            var card = $("<div>").addClass("bg-primary col text-light py-3 rounded mr-1").addClass(`card${i}`);
            
            $("#forecast-cards").append(card)
            
        }
        // need to try and DRY up the code for the var for Date, Temp, and Humidity as well as appending
        // we pulled the day1DateDiv but it needs to be adjusted for proper formatting

        var day1DateDiv = $("<h5>").text(day1Date);
// var for day 1 icon div
        var day1TempDiv = $("<h5>").text("Temp: " + day1Temp + " \u00B0" + "F");
        var day1HumidityDiv = $("<h5>").text("Humidity: " + day1Humidity +  "%");

        var day2DateDiv = $("<h5>").text(day2Date);
// var for day 2 icon div
        var day2TempDiv = $("<h5>").text("Temp: " + day2Temp + " \u00B0" + "F");
        var day2HumidityDiv = $("<h5>").text("Humidity: " + day2Humidity +  "%");

        var day3DateDiv = $("<h5>").text(day3Date);
// var for day 3 icon div
        var day3TempDiv = $("<h5>").text("Temp: " + day3Temp + " \u00B0" + "F");
        var day3HumidityDiv = $("<h5>").text("Humidity: " + day3Humidity +  "%");

        var day4DateDiv = $("<h5>").text(day4Date);
// var for day 4 icon div
        var day4TempDiv = $("<h5>").text("Temp: " + day4Temp + " \u00B0" + "F");
        var day4HumidityDiv = $("<h5>").text("Humidity: " + day4Humidity +  "%");

        var day5DateDiv = $("<h5>").text(day5Date);
// var for day 5 icon div
        var day5TempDiv = $("<h5>").text("Temp: " + day5Temp + " \u00B0" + "F");
        var day5HumidityDiv = $("<h5>").text("Humidity: " + day5Humidity +  "%");

        $(".card0").append(day1DateDiv, day1TempDiv, day1HumidityDiv)
        $(".card1").append(day2DateDiv, day2TempDiv, day2HumidityDiv)
        $(".card2").append(day3DateDiv, day3TempDiv, day3HumidityDiv)
        $(".card3").append(day4DateDiv, day4TempDiv, day4HumidityDiv)
        $(".card4").append(day5DateDiv, day5TempDiv, day5HumidityDiv)

    })
}

function clickListItem() {
    var city = $(this).text()
    searchForCity(city)
}











