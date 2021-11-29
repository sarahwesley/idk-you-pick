// functions to implement:
// 1) search by zipcode for places to eat using on random button click

// 2) save favorites and store in loval memory
// 3) display categories on button click
// 4) use categories or favorites as search criteria on random click
// 5) display results in results.html page

// details to go over:
// how are favorites used in search
// return to main page on try again or run new search, (2 buttons on results page?)
// what is the default radius of search 


var locationNum = 0;
var locationName="";

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
		"q": "Saint Augustine", // use city name to get location ID #
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
