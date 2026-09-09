console.log("hehe");

// Make a variable called answer w/ the value 48
// Set aside a space named answer that has 48 in it 
let answer = 48;
let guesses;
let triesLeft = 7;
const winMessage = "Congratulations; You guessed it!";

// Look up element w/ an id of guessMessage (#guessMessage)
// and bind it to a variable named guessMessage
let guessMessage = document.querySelector("#guessMessage");

// Making a function sets aside the code, so you can run it later
// it's a named block of code; it starts and ends with curly braces
function showWin() {
    // Equals (=) in JavaScrcipt means change the value
    // change the text inside an element
    guessMessage.textContent = winMessage;

    // The style object in any element lets you change CSS stuff
    // Change the color of the font to green
    guessMessage.style.color = "green";
    triesLeft -= 1;
    console.log(triesLeft);
}

// A function name w/ parentheses after it
// makes the function happen immediately
// showWin();

// This makes it so when you click on the button, function showWin happens
let guessButton = document.querySelector("#guessButton");
// guessButton.addEventListener("click", showWin);

// Shorthand
guessButton.addEventListener("click", function () {
    guessMessage.textContent = winMessage;
    guessMessage.style.color = "green";

    // if there is no equals, then there is no change happening
    // changes variable's value. can also be done w/ +=, *=, /=
    triesLeft -= - 1;
    console.log(triesLeft);
});

let guessInput = document.querySelector("#guessInput");

// Question operators
// == match: the left and right have to match values for the answer to be true
// != not match: the left and right values have to be different for the answer to be true
// === match: strict match; left and right values have to match values and type

// + converts the text in the input box to a number
// we compare the answers to ...