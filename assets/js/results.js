// pull saved zip from local storage
var pullZipCode = JSON.parse(localStorage.getItem("zipCode"));
var pulledCity = "";
var returnedCities;
var cityWWRid;

var randomNum = 11;

var restaurantDisplayArea = document.getElementById("displayResults")
// var div = document.querySelector('div')  
// div.innerHTML = "My new text!";
//zip api - creates object with locations including State and City using user input
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


// wordlwide restaurant results
// uses passed value from `getCityWWRInfo` to pull list of restaurants within specified city
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
		console.log(response.results.data[randomNum].name);
		console.log(response.results.data[randomNum].address);
		console.log(restaurantDisplayArea.textContent);
		restaurantDisplayArea.textContent = response.results.data[randomNum].name + response.results.data[randomNum].address;
	});
};


//uses city obtained from `userZip` to get a city location ID to pass to `getRestaurants`
function getCityWWRInfo(){
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
		cityWWRid = returnedCities[0].result_object.location_id; // TODO: need to move to city validation when created.
		console.log(cityWWRid)
		getRestaurants();
	});
};

