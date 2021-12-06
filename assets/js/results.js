// pull saved zip from local storage
var pullZipCode = JSON.parse(localStorage.getItem("zipCode"));
var pulledCity = "";
var returnedCities;
var cityWWRid;

var restaurantName = document.getElementById("restaurant-name")
var restaurantAdd = document.getElementById("restaurant-add")
// var div = document.querySelector('div')  
// div.innerHTML = "My new text!";
//zip api - creates object with locations including State and City using user input
var userZip = {
	//call back user ZIP
	"url": "https://ZiptasticAPI.com/" + pullZipCode,
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
			"limit": "15", // # of results returned in array
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

var valueArray = [15];
//function parameters to represent either the lower or upper limmit of number generatored at random from array
var randomNum = function(max){
	//local scoped variables:

	//used to determine length of array set for random number generator. 
	var val = Math.floor(Math.random()* max);
	return val;
};

//save to favorites
var favoritesBtn = document.getElementById("save-btn");
var faveHistory = JSON.parse(localStorage.getItem("faves")) || [];
var favesList = document.getElementById("save-favorites")

favoritesBtn.addEventListener("click", function() {
	var faveRes = restaurantName.textContent;
	if(faveHistory.indexOf(restaurantName.textContent) === -1) faveHistory.push(faveRes);
	localStorage.setItem("faves", JSON.stringify(faveHistory));
	//displayFinalList();
	displayFavorites();
	favesList.classList.remove("is-hidden");
	
	}

);

//var faveItem = document.createElement("option");


function displayFavorites() {
	//favesList.removeChild(faveItem);
	//favesList.innerHTML = "";
	for (var i = 0; i < faveHistory.length; i++) {
		var options = faveHistory[i];
		var faveItem = document.createElement("option");
		faveItem.textContent = options;
		faveItem.value = options;
		favesList.appendChild(faveItem);
		
		//faveItem.setAttribute("type", "text");
		//faveItem.setAttribute("class", "has-text-black");
		//faveItem.textContent = faveHistory[i];
		//faveItem.setAttribute("value", faveHistory[i]);
	}
	if (faveHistory.length > 0) {
		faveHistory[faveHistory.length -1];
	}
	//favesList.append(faveItem);

}

// function displayFinalList() {
// 	favesList.removeChild(faveItem);
// 	displayFavorites();
// }
//displayFavorites();


//displayFinalList();
randomNum(valueArray.length);






// function to grab location based on zip that is entered. 

//1 take user input from zip api
//2 run through restauraunt api and pull city name
//3 validate city? how so. 