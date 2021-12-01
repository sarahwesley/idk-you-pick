

var locationNum = 0;
var locationName = "";
var userZipCode = [];



var loadResults = function () {
	location.href = "./results.html"
}

// cler local storage when 
function clearStorage() {
	localStorage.clear()
}


//else pop up modal that states the zip cannot be validated to enter a valid zip code
// save user zip to local storage
var addZip = (event) => {
	event.preventDefault();
	var addUserZip = document.getElementById("zip").value;

	// if statement
	if (isNaN(addUserZip) || addUserZip < 10000 || addUserZip > 99999) {
		// modal
		
	} else {
	userZipCode.push(addUserZip);
	console.log(userZipCode);


	//save to local storage
	localStorage.setItem("zipCode", JSON.stringify(addUserZip))

	//load other webpage
	loadResults();
}
}
//debugger
document.getElementById("submitBtn"), addEventListener("submit", addZip);