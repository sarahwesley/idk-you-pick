// pull saved zip from local storage
var pullZipCode = JSON.parse(localStorage.getItem("zipCode"));

// run zip through ziptastic api
//zip api
	var settings = {
		//call back user ZIP
		"url": "http://ZiptasticAPI.com/" + pullZipCode,
		"method": "GET",
		"timeout": 0,
		"headers": {
		},
	};

	//run function
	$.ajax(settings).done(function (response) {
        localStorage.setItem("cityName", JSON.stringify(response));
		console.log(response);
	});

    // get from local storage
    var pullUserCity = JSON.parse(localStorage.getItem("cityName"));
    //cut the prefix
    var finalCity = pullUserCity.substring(36);

    // cut the suffix
    var passCity = finalCity.slice(0, -1);
    console.log("your city is " + passCity);


    //getting zip code to use to check against cities displayed to see if it matches restauruant.
    // write a function to see if pullZipCode and passCiy match location_id and name

    
// wordlwide restaurant results 
const results = {
	"async": true,
	"crossDomain": true,
	"url": "https://worldwide-restaurants.p.rapidapi.com/search",
	"method": "POST",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com",
		"x-rapidapi-key": "161a4fc731mshd1f703035034458p1b1d71jsn4fa88ad04868"
	},
	"data": {
		"language": "en_US",
		"limit": "15", // # of results returned in array
		"location_id": "34600", // change ID # to specify area
		"currency": "USD"
	}
};

const cityIdentification = {
	"async": true,
	"crossDomain": true,
	"url": "https://worldwide-restaurants.p.rapidapi.com/typeahead",
	"method": "POST",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com",
		"x-rapidapi-key": "161a4fc731mshd1f703035034458p1b1d71jsn4fa88ad04868"
	},
	"data": {
		"q": passCity, // use city name to get location ID #
		"language": "en_US"
	}
};


// console log info from results and cityIdentifier for testing purposes
$.ajax(cityIdentification).done(function (response) {
	console.log(response);
});

$.ajax(results).done(function (response) {
	console.log(response);
});


// function to grab location based on zip that is entered. 

//1 take user input from zip api
//2 run through restauraunt api and pull city name
//3 validate city? how so. 