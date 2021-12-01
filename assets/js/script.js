var locationNum = 0;
var locationName = "";
var userZipCode = [];




var loadResults = function () {
	location.href = "./results.html"
}

// cler local storage when 
function clearStorage() {
	localStorage.removeItem(zipCode)
}




//else pop up modal that states the zip cannot be validated to enter a valid zip code
// save user zip to local storage
var addZip = (event) => {
	event.preventDefault();
	var addUserZip = document.getElementById("zip").value;

	// if statement
	if (isNaN(addUserZip) || addUserZip < 10000 || addUserZip > 99999) {
		// enter error modal
		var showModal = function() {
			var modal = document.getElementById("modal");
			modal.classList.add("is-active");
		}
		showModal();
		
		var confirmError = function() {
			var error = document.getElementById("modal")
			error.classList.remove("is-active");
			location.reload();
		}
		document.getElementById("errorBtn"), addEventListener("submit", confirmError);
		
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

// in future add specific function to delete only zipcode so that favorites will stay