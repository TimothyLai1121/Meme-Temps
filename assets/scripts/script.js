let currentMemeIndex = 0;

fetch('https://api.imgflip.com/get_memes')
	.then(response => response.json())
	.then(response => {
		const memes = response.data.memes;
		displayMeme(memes, currentMemeIndex);
		// Adding eventlistener for arrow key left and right //
		document.addEventListener("keydown", function (event) {
			if (event.key === "ArrowLeft") {
				currentMemeIndex--;
				if (currentMemeIndex < 0) {
					currentMemeIndex = memes.length - 1;
				}
				displayMeme(memes, currentMemeIndex);
			} else if (event.key === "ArrowRight") {
				currentMemeIndex++;
				if (currentMemeIndex >= memes.length) {
					currentMemeIndex = 0;
				}
				displayMeme(memes, currentMemeIndex);
			}
		});
		// constant previousBtn & nextBtn and getElementById with two btn id I made //
		// since it wasn't working at first, !id and console to see if ID is recognize by DOM //

		const previousButton = document.getElementById("previousBtn");
		if (!previousButton) {
			console.error("Element with ID 'previousBtn' not found in the DOM");
			return;
		}
		const nextButton = document.getElementById("nextBtn");
		if (!nextButton) {
			console.error("Element with ID 'nextBtn' not found in the DOM");
			return;
		}
		// using same format above on length -1 for back and remain length without numerical for forward //
		// negative start with -1, positive start with 0 that's why //
		previousButton.addEventListener("click", function () {
			currentMemeIndex--;
			if (currentMemeIndex < 0) {
				currentMemeIndex = memes.length - 1;
			}
			displayMeme(memes, currentMemeIndex);
		});
		// positive number, leave it 0 as 1 
		nextButton.addEventListener("click", function () {
			currentMemeIndex++;
			if (currentMemeIndex >= memes.length) {
				currentMemeIndex = 0;
			}
			displayMeme(memes, currentMemeIndex);
		});
	})
	.catch(err => console.error(err));

function displayMeme(memes, index) {
	const memeContainer = document.getElementById("memeContainer");
	memeContainer.innerHTML = `<img src="${memes[index].url}" alt="Meme">`;
	// adding to local storage //
	memeContainer.addEventListener("click", function () {
		localStorage.setItem("selectedMemeURL", memes[index].url);
	});
}

/* Adding savedButton */

const savedButton = document.getElementById("savedButton");
savedButton.addEventListener("click", function () {
	const selectedMemeURL = localStorage.getItem("selectedMemeURL");
	localStorage.setItem("selectedMemeURL", selectedMemeURL);
	const savedPicturesContainer = document.querySelector(".savedPicturesContainer");
	const savedPictureButtons = document.querySelectorAll(".savedPictureButton");
	let urlExists = false;
	for (const savedPictureButton of savedPictureButtons) {
		if (savedPictureButton.innerHTML === selectedMemeURL) {
			urlExists = true;
			break;
		}
	}
	if (!urlExists) {
		const savedPictureButton = document.createElement("button");
		savedPictureButton.innerHTML = selectedMemeURL;
		savedPictureButton.classList.add("savedPictureButton");
		savedPicturesContainer.appendChild(savedPictureButton);
	}
});


/* savedPicturesContainer */


const savedPicturesContainer = document.querySelector(".savedPicturesContainer");
savedPicturesContainer.addEventListener("click", function (event) {
	if (event.target.classList.contains("savedPictureButton")) {
		const selectedMemeURL = event.target.innerHTML;
		const memeContainer = document.getElementById("memeContainer");
		memeContainer.innerHTML = `<img src="${selectedMemeURL}" alt="Meme">`;
	}
});



// image. //

// Advices //
// "https://api.adviceslip.com/advice"

//button id =btnAdvices //
const btnAdvices = document.querySelector("#btnAdvices")
//document.querySelector to grab id or class
const advices = document.querySelector("#advices");
// document.querySelect to grab id advices //
// adding click on button to getAdvice, so make a function after 
btnAdvices.addEventListener("click", getAdvice);
// functions //
function getAdvice() {
	// fetching api. By the way, you can plug in different api for facts if y'all want //
	// let me find another api list to plug it in //

	fetch('https://api.adviceslip.com/advice')
		// 
		.then(response => response.json())
		.then(data => {
			const advice = data.slip.advice;
			advices.innerText = advice;
		});
}

// Modal //
/*
var modal = document.querySelector('.modal');
var closeButtons = document.querySelectorAll('.close-modal');
// set open modal behaviour

// set close modal behaviour
for (i = 0; i < closeButtons.length; ++i) {
  closeButtons[i].addEventListener('click', function() {
	modal.classList.toggle('modal-open');
	});
}
// close modal if clicked outside content area
document.querySelector('.modal-inner').addEventListener('click', function() {
  modal.classList.toggle('modal-open');
});
// prevent modal inner from closing parent when clicked
document.querySelector('.modal-content').addEventListener('click', function(e) {
	e.stopPropagation();
});
// Allows escape and space key to close for accessiblity purposes. 
document.addEventListener("keydown", function(event) {
	if (event.key === "Escape" || event.key === " ") {
		modal.classList.toggle('modal-open');
	}
}); 
*/

/* Modal Fixing */
var modal = document.getElementById("modal");
var triggerButton = document.getElementById("openModalButton");

// Get the close button
var closeButton = document.getElementsByClassName("close-button")[0];

// When the user clicks the trigger button, open the modal
triggerButton.onclick = function () {
	modal.style.display = "block";
}

// When the user clicks the close button, close the modal
closeButton.onclick = function () {
	modal.style.display = "none";
}

// When the user clicks anywhere outside the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
// when page first appear. 
window.onload = function () {
	modal.style.display = "block";
}
