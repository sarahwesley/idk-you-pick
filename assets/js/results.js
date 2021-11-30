// pull saved zip from local storage
var pullZipCode = JSON.parse(localStorage.getItem("zipCode"));
var pulledCity = "";
var returnedCities;
var cityWWRid;
// run zip through ziptastic api
//zip api
var userZip = {
	//call back user ZIP
	"url": "http://ZiptasticAPI.com/" + pullZipCode,
	"method": "GET",
	"timeout": 0,
	"headers": {
	},
};

//run function
$.ajax(userZip).done(function (cityInfo) {
	localStorage.setItem("cityName", JSON.stringify(cityInfo)); // saves informations about city location from zipcode entered in local
	var cityObj = JSON.parse(cityInfo); // converts string back to object
	console.log(cityObj);
	pulledCity = cityObj.city; // use key 'city' from within object to pull info
	console.log('your city is ' + pulledCity);
	getCityWWRInfo();

});

// function getCityID (){
// 	for (i = 0; i< returnedCities.length(); i++) {
// 		if(returnedCities[i].result_object == `validation parameter`) {
//			break;
// 		}
// 	}
// };

// get from local storage

//getting zip code to use to check against cities displayed to see if it matches restauruant.
// write a function to see if pullZipCode and passCiy match location_id and name

//if text field = 5 digits then pass through funtion


// wordlwide restaurant results
function getRestaurants() {
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
			"location_id": cityWWRid, // change ID # to specify area
			"currency": "USD"
		}
	};
	$.ajax(results).done(function (response) {
		console.log(response);
	});
};

function getCityWWRInfo() {
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
			"q": pulledCity, // use city name to get location ID #
			"language": "en_US"
		}
	};

	// console log info from results and cityIdentifier for testing purposes
	$.ajax(cityIdentification).done(function (response) {
		returnedCities = response.results.data;
		console.log(returnedCities);
		//console.log(returnedCities[0].result_object.location_id)
		cityWWRid = returnedCities[0].result_object.location_id; // will need to move after validation created
		console.log(cityWWRid)
		getRestaurants();
	});
};




// function to grab location based on zip that is entered. 

//1 take user input from zip api
//2 run through restauraunt api and pull city name
//3 validate city? how so. 