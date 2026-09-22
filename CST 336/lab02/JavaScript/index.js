let answer;
let triesLeft;
let totalWins = 0;
let totalLosses = 0;
let guessMessage = document.querySelector("#guessMessage");
let guessButton = document.querySelector("#guessButton");
let resetButton = document.querySelector("#resetButton");
let inputBox = document.querySelector("#inputBox");
let currentGuesses = document.querySelector("#currentGuesses");
let winCount = document.querySelector("#winCount");
let lossCount = document.querySelector("#lossCount");

function reset() {
    triesLeft = 7;
    answer = Math.floor(Math.random() * 100);
    guessMessage.style.color = "black";
    guessMessage.textContent = "Guess the number I am thinking of in the box! Input numbers [0, 99].";
    currentGuesses.textContent = "Guess Log: ";
    resetButton.style.display = "none";
    guessButton.style.display = "block";
}

function hasLost() {
    guessMessage.style.color = "red";
    guessMessage.textContent = "You lost! Try again. The answer was " + answer;
    guessButton.style.display = "none";
    resetButton.style.display = "block";
    totalLosses++;
    lossCount.textContent = "Losses: " + totalLosses;
}

function hasWon() {
    guessMessage.style.color = "green";
    guessMessage.textContent = "Wow, you actually won!";
    guessButton.style.display = "none";
    resetButton.style.display = "block";
    totalWins++;
    winCount.textContent = "Wins: " + totalWins;
}

function changeState() {
    currentGuesses.textContent += " " + inputBox.value;
    triesLeft -= 1;
    console.log(guessMessage);

    if (triesLeft <= 0) {
        hasLost();
    }
}

reset();
winCount.textContent = "Wins: " + totalWins;
lossCount.textContent = "Losses: " +  totalLosses;

guessButton.addEventListener('click', function () {
    if (+inputBox.value > 99) {
        guessMessage.style.color = "red";
        guessMessage.textContent = "Error: number not within range.";
    } else if (+inputBox.value == answer) {
        hasWon();
    } else if (+inputBox.value < answer) {
        guessMessage.style.color = "red";
        guessMessage.textContent = "Too low. Try again.";
        changeState();
    } else if (+inputBox.value > answer) {
        guessMessage.style.color = "red";
        guessMessage.textContent = "Too high. Try again.";
        changeState();
    }
});

resetButton.addEventListener('click', reset);
