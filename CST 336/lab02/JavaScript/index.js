let guessMessage = document.querySelector("#guessMessage");
let answer = 67;
let triesLeft = 7;
let guessButton = document.querySelector("#guessButton");
let inputBox = document.querySelector("#inputBox");
let currentGuesses = document.querySelector("#currentGuesses");

function changeState(triesLeft, currentGuesses) {
    triesLeft -= 1;
    return currentGuesses.textContent += " " + inputBox.value;
}

guessButton.addEventListener('click', function () {

    if (triesLeft == 0) {
        guessMessage.style.color = "red";
        guessMessage.textContent = "Out of tries. Try again.";
    } else if (+inputBox.value < answer) {
        guessMessage.style.color = "red";
        guessMessage.textContent = "Too low. Try again.";
    } else if (+inputBox.value > answer) {
        guessMessage.style.color = "red";
        guessMessage.textContent = "Too high. Try again.";
    } else if (+inputBox.value === answer) {
        guessMessage.style.color = "green";
        guessMessage.textContent = "Wow, you actually won!";
    }

    console.log(guessMessage)
    changeState(triesLeft, currentGuesses);
});