// first we must have some variables
// list of words
//function for find an alphabet in one word

// Skapa en lista med ord
const fruitArray = ["apple", "pear", "banana", "mango", "orange", "peach"];

// Add variables.
let answer = "";
let guessed = [];
let wins = 1;
let defeats = 1;
let maxWrong = 7;
let errors = 0;

// Generate random word from array.
randomWord = () => {
  answer = fruitArray[Math.floor(Math.random() * fruitArray.length)];
}

// Make the team "Kung-Fu Unicorns" appear when text is clicked.
let kungfu = document.getElementById("kung-fu");
kungfu.addEventListener("click", () => {
  document.getElementById("kung-fu").innerHTML = " - Kung-Fu Unicorns 🥋🦄";
})

// Create clickable A-Z buttons with spaces between them and add join("") to remove the comma signs.
addButtons = () => {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz".split("").map(letter =>
    `<button id="` + letter + `" onClick="regGuess('` + letter + `')">` + letter + `</button>`).join("");
  document.getElementById("message").innerHTML = buttonsHTML;
}

// See if chosen letter exists, and if so, push it to empty array of guessed.
regGuess = (chosenLetter) => {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute("disabled", true);
  // If the letter exists (greater than or equal to 0) then run guessedWord function and check if the game is won. 
  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
    // If a chosen letter doesn´t exist then add an error (incorrect guess), check if game is lost and update the picture.
  } else if (answer.indexOf(chosenLetter) === -1) {
    errors++;
    updateErrors();
    checkIfGameLost();
    updateHangman();
  }
}

// Hangman gets more complete after an incorrect guess (jpeg 0-7 in the images folder).
updateHangman = () => {
  document.getElementById("hangmanPicture").src = "./images/" + errors + ".jpg";
}

// Function that checks if the game is won. Player is notified by a victory message.
checkIfGameWon = () => {
  if (wordStatus === answer) {
    document.getElementById("message").innerHTML = "A Winner Is You! &#128512";
    // Adds points when game is won.
    document.getElementById("wins").innerHTML = "Games won: " + wins++;
  }
}

// Function that checks if the game is lost. If so, it should display correct word and picture of hangman.
checkIfGameLost = () => {
  if (errors === maxWrong) {
    document.getElementById("wordInput").innerHTML = "Correct word: " + answer;
    document.getElementById("message").innerHTML = "Sorry. You lost &#128543";
    document.getElementById("hangmanPicture").src = "images/7.jpg";
    // A lost game is registered.
    document.getElementById("defeats").innerHTML = "Defeats: " + defeats++;
  }
}

// Create underscores for the guessed word to be typed and remove the comma signs between.
// Also check if the letter excists in the guessed array.
guessedWord = () => {
  wordStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");
  document.getElementById("wordInput").innerHTML = wordStatus;
}

// Add the incorrect guesses into the DOM.
updateErrors = () => {
  document.getElementById("errors").innerHTML = errors;
}

// Show max wrong guesses allowed (7) in the DOM.
document.getElementById("maxWrong").innerHTML = maxWrong;

// Functions to reset the game and start again from scrach.
reset = () => {
  errors = 0;
  guessed = [];
  document.getElementById("hangmanPicture").src = "./images/line.jpg";

  // Call for a new random word from the array.
  randomWord();
  // the underscore field.
  guessedWord();
  // errors/incorrect guesses.
  updateErrors();
  // new buttons who aren´t disabled.
  addButtons();
}

// Generate new random words, buttons when page is refreshed.
randomWord();
addButtons();
guessedWord();
