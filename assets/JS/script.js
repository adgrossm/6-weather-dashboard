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
        // console.log(response)
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
        // console.log(response.weather[0].icon)
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
            // console.log(uvIndex)
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
        // console.log(response)
       
        // create var for temp icon, temp, and humidity
        
        
        // console.log(day1Date)
        // pull the icon ID 1 from API
        var iconIdForecast = (response.list[4].weather[0].icon)
    //    create the URL for the Icon 1
        var forecastTempIconURL = "http://openweathermap.org/img/wn/" + iconIdForecast + "@2x.png" ;
// day 1 card info to be passed to the div
        var day1Date = moment().add(1, 'days').format("MM-DD-YYYY")
        // (response.list[4].dt_txt)
        
        // create the day 1 icon element <img> to be passed to the Icon <div>
        var day1Icon = $("<img>").attr("src", forecastTempIconURL)
        var day1Temp = Math.round(((response.list[4].main.temp) -273) *1.8 +32)
        var day1Humidity = (Math.round(response.list[4].main.humidity)+"%")


        var iconId2Forecast = (response.list[12].weather[0].icon)
        var forecastTemp2IconURL = "http://openweathermap.org/img/wn/" + iconId2Forecast + "@2x.png" ;
        var day2Date = moment().add(2, 'days').format("MM-DD-YYYY")
        var day2Icon = $("<img>").attr("src", forecastTemp2IconURL)
        var day2Temp = Math.round(((response.list[12].main.temp) -273) *1.8 +32)
        var day2Humidity =(Math.round(response.list[12].main.humidity)+"%")

        // Day 3   info
        var iconId3Forecast = (response.list[20].weather[0].icon)
        //    create the URL for the Icon 1
        var forecastTemp3IconURL = "http://openweathermap.org/img/wn/" + iconId3Forecast + "@2x.png" ;
        var day3Date = moment().add(3, 'days').format("MM-DD-YYYY")
        var day3Icon = $("<img>").attr("src", forecastTemp3IconURL)
        var day3Temp= Math.round(((response.list[20].main.temp) -273) *1.8 +32)
        var day3Humidity = (Math.round(response.list[20].main.humidity)+"%")


        var iconId4Forecast = (response.list[28].weather[0].icon)
        var forecastTemp4IconURL = "http://openweathermap.org/img/wn/" + iconId4Forecast + "@2x.png" ;
        var day4Date = moment().add(4, 'days').format("MM-DD-YYYY")
// var for day4 Icon
        var day4Icon = $("<img>").attr("src", forecastTemp4IconURL)
        var day4Temp = Math.round(((response.list[28].main.temp) -273) *1.8 +32)
        var day4Humidity = (Math.round(response.list[28].main.humidity)+"%")


        var iconId5Forecast = (response.list[36].weather[0].icon)
        var forecastTemp5IconURL = "http://openweathermap.org/img/wn/" + iconId5Forecast + "@2x.png" ;
        var day5Date = moment().add(5, 'days').format("MM-DD-YYYY")
// var for day5 Icon
        var day5Icon = $("<img>").attr("src", forecastTemp5IconURL)
        var day5Temp = Math.round(((response.list[36].main.temp) -273) *1.8 +32)
        var day5Humidity = (Math.round(response.list[36].main.humidity)+"%")
     
        
        
        // console.log(day1Temp, day2Temp, day3Temp, day4Temp, day5Temp)
        $("#forecast-cards").empty()
        
        $(".5-day").empty()  
        $(".5-day").append(city + " 5-Day Forecast")
        // .prepend("<h2>" + "5-Day Forecast")
        for (var i = 0; i < 5; i++) {
             
            var card = $("<div>").addClass("bg-primary col text-light  rounded mb-2 mr-2").addClass(`card${i}`);
            
            $("#forecast-cards").append(card)
            
        }
        // need to try and DRY up the code for the var for Date, Temp, and Humidity as well as appending
        // we pulled the day1DateDiv but it needs to be adjusted for proper formatting
//  received the icon <img> with src info to be passed to and appended to the 1st card
        var dcode = (" \u00B0"+"F")
        var day1DateDiv = $("<h5>").text(day1Date);
        var day1IconDiv = $("<div>").append(day1Icon);
        var day1TempDiv = $("<h5>").text("Temp: " + day1Temp + dcode);
        var day1HumidityDiv = $("<h5>").text("Humidity: " + day1Humidity);

        var day2DateDiv = $("<h5>").text(day2Date);
        var day2IconDiv = $("<div>").append(day2Icon);
        var day2TempDiv = $("<h5>").text("Temp: " + day2Temp + dcode);
        var day2HumidityDiv = $("<h5>").text("Humidity: " + day2Humidity);

        var day3DateDiv = $("<h5>").text(day3Date);
        var day3IconDiv = $("<div>").append(day3Icon); 
        var day3TempDiv = $("<h5>").text("Temp: " + day3Temp + dcode);
        var day3HumidityDiv = $("<h5>").text("Humidity: " + day3Humidity);

        var day4DateDiv = $("<h5>").text(day4Date);
        var day4IconDiv = $("<div>").append(day4Icon);
        var day4TempDiv = $("<h5>").text("Temp: " + day4Temp + dcode);
        var day4HumidityDiv = $("<h5>").text("Humidity: " + day4Humidity);

        var day5DateDiv = $("<h5>").text(day5Date);
        var day5IconDiv = $("<div>").append(day5Icon);
        var day5TempDiv = $("<h5>").text("Temp: " + day5Temp + dcode);
        var day5HumidityDiv = $("<h5>").text("Humidity: " + day5Humidity);

        $(".card0").append(day1DateDiv, day1IconDiv, day1TempDiv, day1HumidityDiv)
        $(".card1").append(day2DateDiv, day2IconDiv, day2TempDiv, day2HumidityDiv)
        $(".card2").append(day3DateDiv, day3IconDiv, day3TempDiv, day3HumidityDiv)
        $(".card3").append(day4DateDiv, day4IconDiv, day4TempDiv, day4HumidityDiv)
        $(".card4").append(day5DateDiv, day5IconDiv, day5TempDiv, day5HumidityDiv)

    })
}

function clickListItem() {
    var city = $(this).text()
    searchForCity(city)
}











