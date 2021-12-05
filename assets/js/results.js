// pull saved zip from local storage
var pullZipCode = JSON.parse(localStorage.getItem("zipCode"));
var pulledCity = "";
var returnedCities;
var cityWWRid;

var restaurantName = document.getElementById("restaurant-name")
var restaurantAdd = document.getElementById("restaurant-add")

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
			"limit": "15", // # of results returned in array (future TODO: find way to get more dynamic list of results)
			"location_id": cityWWRid, // change ID # to specify area
			"currency": "USD"
		}
	};
	$.ajax(results).done(function (response) {
		let x = randomNum(response.results.data.length);
		// let lineBreak = document.createElement("br/");
		console.log(response.results.data[x].name);
		console.log(response.results.data[x].address);
		//console.log(restaurantDisplayArea.textContent);

		restaurantName.textContent = response.results.data[x].name;
		restaurantAdd.textContent = response.results.data[x].address;
		
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
			"q": pulledCity, // use city name to get location ID # for API
			"language": "en_US"
		}
	};

	// console log info from results and cityIdentifier for testing purposes
	$.ajax(cityIdentification).done(function (response) {
		returnedCities = response.results.data;
		console.log(returnedCities);
		//console.log(returnedCities[0].result_object.location_id)
		cityWWRid = returnedCities[0].result_object.location_id; // TODO: need to move to city validation if created
		console.log(cityWWRid)
		getRestaurants();
	});
};


	// create random number based on max value of passed parameter
var randomNum = function(max){
	var val = Math.floor(Math.random()* max);
	return val;
};
randomNum(valueArray.length);


//1 take user input from zip api
//2 run through restauraunt api and pull city name
//3 validate city? how so. 
