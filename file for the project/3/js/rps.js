// Variables from HTML Ids
const start = document.getElementById('start-button');
const scoreBox = document.getElementById('scores-container');
const btns = document.getElementById('buttons-container');
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const match = document.getElementById('pvsc-container');
let playerImg = document.getElementById('player-img');
let compImg = document.getElementById('comp-img');
const matchImg = document.getElementsByClassName('match-img');
let prntPlayerScore = document.getElementById('player-score');
let prntCompScore = document.getElementById('computer-score');
let prntRound = document.getElementById('round');
let prntTies = document.getElementById('ties');
let replayBox = document.getElementById('play-again-contianer');
const retryBtn = document.getElementById("play-again-btn");

// Score and round variables
playerScore = 0;
compScore = 0;
round = 0;
ties = 0;

// Start game function
start.addEventListener('click', function() {
    // Hides start button
    this.style.display = 'none';
    // Shows score box
    scoreBox.style.display = 'inline-flex';
    // shows user choice buttons
    btns.style.display = 'inline';
    // reset scores and round as a backup
    playerScore = 0;
    compScore = 0;
    ties = 0;
    round - 0;
})

// Functions to listen for the player choice

// Player choice variables
let playerChoice;

// RPS Button event listeners
rock.addEventListener('click', () => {
    playerChoice = 'rock';
    playerImg.src = 'https://raw.githubusercontent.com/AOJINAG/-Rock-paper-scissors-1012/main/images/rock.png';
});

paper.addEventListener('click', () => {
    playerChoice = 'paper';
    playerImg.src = 'https://raw.githubusercontent.com/AOJINAG/-Rock-paper-scissors-1012/main/images/paper.png';
});

scissors.addEventListener('click', () => {
    playerChoice = 'scissors';
    playerImg.src = 'https://raw.githubusercontent.com/AOJINAG/-Rock-paper-scissors-1012/main/images/scissors.png';
});

// Start match vs computer upon player choice
btns.addEventListener('click', () => {
    btnHider();
    getCompChoice();
    checkMatch();
});

// Function to hide rock paper scissors input buttons and show player vs comp match
function btnHider() {
    btns.style.display = 'none';
    match.style.display = 'flex';
};


// Calculate computer choice
// Computer Choice variable
let compChoice;

// Computer choice function
function getCompChoice() {
    // Gets whole number between 1 and 3 (okay betwwen 0 and 2)
    compChoice = Math.floor(Math.random() * 3);
    // Assigns the random numer to a string for later camparison with the player choice
    if (compChoice == 0) {
        compChoice = 'rock';
        compImg.src = 'https://raw.githubusercontent.com/AOJINAG/-Rock-paper-scissors-1012/main/images/rock.png';
    } else if (compChoice == 1) {
        compChoice = 'paper';
        compImg.src = 'https://raw.githubusercontent.com/AOJINAG/-Rock-paper-scissors-1012/main/images/paper.png';
    } else if (compChoice == 2) {
        compChoice = 'scissors';
        compImg.src = 'https://raw.githubusercontent.com/AOJINAG/-Rock-paper-scissors-1012/main/images/scissors.png';
    }
};

// Check the player choice vs the comp choice

// Function to check game result
function checkMatch() {
    // Check for tie game
    if (playerChoice == compChoice) {
        ties++;
        // Check for player or computer win options
    } else if (playerChoice == 'rock' && compChoice == 'scissors') {
        playerScore++;
    } else if (playerChoice == 'paper' && compChoice == 'scissors') {
        compScore++;
    } else if (playerChoice == 'scissors' && compChoice == 'rock') {
        compScore++;
    } else if (playerChoice == 'paper' && compChoice == 'rock') {
        playerScore++;
    } else if (playerChoice == 'scissors' && compChoice == 'paper') {
        playerScore++;
    } else if (playerChoice == 'rock' && compChoice == 'paper') {
        compScore++;
    }

    // Print Scores, rounds, ties, and increment round
    prntPlayerScore.innerHTML = playerScore;
    prntCompScore.innerHTML = compScore;
    round++;
    prntRound.innerHTML = round;
    prntTies.innerHTML = ties;

    // Show Replay button
    retryBtnDisplay();
};

// Function to show retry button
function retryBtnDisplay() {
    replayBox.style.display = 'inline';
}

// Replay button event listeners and functions
retryBtn.addEventListener('click', function() {
    // Hide Player vs Computer Container and shows user choice buttons
    btns.style.display = 'inline';
    match.style.display = 'none';
    replayBox.style.display = 'none';
});