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
		previousButton.addEventListener("click", function() {
			currentMemeIndex--;
			if (currentMemeIndex < 0) {
				currentMemeIndex = memes.length - 1;
			}
			displayMeme(memes, currentMemeIndex);
		});
		// positive number, leave it 0 as 1 
		nextButton.addEventListener("click", function() {
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
		memeContainer.addEventListener("click", function() {
		  localStorage.setItem("selectedMemeURL", memes[index].url);
		});
	  }

    
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