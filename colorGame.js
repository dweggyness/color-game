
var numSquares = 6;
var colors = []
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorGoal"); // title RGB(x, x, x)
var messageDisplay = document.querySelector("#pickMessage"); // msg at center of strip
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();


function init(){ // sets up the first game when the page is loaded
	modeSetup();

	resetButton.addEventListener("click", function(){ // reset button
		reset();
	})

	colorDisplay.textContent = pickedColor
	reset()
}

function modeSetup(){ // setup event listeners for Easy & Hard difficulty
	for (var i=0; i < modeButtons.length; i++){ 
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		})
	}
}

function reset(){ // resets the game to original state
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	h1.style.backgroundColor = "#5194A8";
	newGame();
}

function newGame(){ // starts a new game and handles game logic
	for(var i=0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i]; // add colors to the squares
		} else {
			squares[i].style.display = "none";
		}
	squares[i].addEventListener("click", function(){
		var clickedColor = this.style.backgroundColor;
		if(clickedColor === pickedColor){ // correct answer
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?";
			changeColor(clickedColor)
			h1.style.backgroundColor = clickedColor;
		} else { // wrong answer
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Wrong";
		}
	})
}}

function changeColor(color){  // change colour of all squares to the argument
	for (var i=0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){ // picks a random colour as the 'correct' colour
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(x){ // generates an array of random colors of size (x)
	var arr = []
	for(i=0; i<x; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){ // generates a random color
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return ("rgb(" + r + ", " + g + ", " + b + ")");
}
