let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let gameWinner = document.querySelector(".gameWinner");
let newGameBtn = document.querySelector("#newGameBtn");
let continueBtn = document.querySelector("#continueBtn");
let msg = document.querySelector("#msg");
let game = document.querySelector(".game");

// Scoreboard elements
let player1NameDisplay = document.querySelector("#player1Score p:first-child");
let player1ScoreDisplay = document.querySelector("#player1Score p:last-child");
let player2NameDisplay = document.querySelector("#player2Score p:first-child");
let player2ScoreDisplay = document.querySelector("#player2Score p:last-child");
let tieScoreDisplay = document.querySelector("#tieScore p"); // Text already "Draws: 0" in HTML
let player1AssignmentDisplay = document.querySelector("#player1Assignment");
let player2AssignmentDisplay = document.querySelector("#player2Assignment");

let turnO = true; // Remains true for the first player's turn logic

// Player symbols and names
let player1Symbol = "🐞"; // Ladybug
let player2Symbol = "🐝"; // Bumblebee
let player1Name = "Ladybug";
let player2Name = "Bumblebee";

// Score tracking
let player1Wins = 0;
let player2Wins = 0;
let player1Losses = 0;
let player2Losses = 0;
let draws = 0; // Changed from ties to draws

// Function to randomly assign symbols and names to Player 1 and Player 2
const assignPlayers = () => {
  if (Math.random() < 0.5) {
    player1Symbol = "🐞";
    player1Name = "Ladybug";
    player2Symbol = "🐝";
    player2Name = "Bumblebee";
  } else {
    player1Symbol = "🐝";
    player1Name = "Bumblebee";
    player2Symbol = "🐞";
    player2Name = "Ladybug";
  }
  // Update scoreboard names and assignments
  player1NameDisplay.innerText = `${player1Name} (${player1Symbol})`;
  player2NameDisplay.innerText = `${player2Name} (${player2Symbol})`;
  player1AssignmentDisplay.innerText = `${player1Name} is ${player1Symbol}`;
  player2AssignmentDisplay.innerText = `${player2Name} is ${player2Symbol}`;
  turnO = true; // Reset turn to player 1 (whoever is currently player1Symbol)
};

const updateScoreboard = () => {
  player1ScoreDisplay.innerText = `Wins: ${player1Wins}, Losses: ${player1Losses}`;
  player2ScoreDisplay.innerText = `Wins: ${player2Wins}, Losses: ${player2Losses}`;
  tieScoreDisplay.innerText = `Draws: ${draws}`;
};

const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const checkTie = () => {
  for (let box of boxes) {
    if (box.innerText === "") {
      return false; // If any box is empty, it's not a tie
    }
  }
  return true; // All boxes are filled
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winnerSymbol) => {
  let winningPlayerName;
  if (winnerSymbol === player1Symbol) {
    player1Wins++;
    player2Losses++;
    winningPlayerName = player1Name;
  } else {
    player2Wins++;
    player1Losses++;
    winningPlayerName = player2Name;
  }
  updateScoreboard();
  msg.innerHTML = `🎉 Hooray! ${winningPlayerName} (${winnerSymbol}) wins the game! 🥳`;
  gameWinner.classList.remove("hide");
  game.classList.add("hide");
  reset.classList.add("hide");
};

const showTie = () => {
  draws++;
  updateScoreboard();
  msg.innerHTML = `🤝 It's a Critter Tie! So close! <br> Critters will swap symbols!`;
  gameWinner.classList.remove("hide");
  game.classList.add("hide");
  reset.classList.add("hide");
};

// No need to switch player symbols here anymore, assignPlayers will handle it on new/continue
// const switchPlayerSymbols = () => {
//   const tempSymbol = player1Symbol;
//   player1Symbol = player2Symbol;
//   player2Symbol = tempSymbol;
//   const tempName = player1Name;
//   player1Name = player2Name;
//   player2Name = tempName;
// };

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      disableBoxes();
      return; // Winner found
    }
  }
  if (checkTie()) {
    showTie();
    // switchPlayerSymbols(); // Symbols will be reassigned on "Continue" or "Play Again"
    disableBoxes();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") { // Check if the box is empty
      if (turnO) { // Player 1's turn (current player1Symbol)
        box.innerText = player1Symbol;
        turnO = false; // Switch turn to Player 2
      } else { // Player 2's turn (current player2Symbol)
        box.innerText = player2Symbol;
        turnO = true; // Switch turn back to Player 1
      }
      box.disabled = true;
      checkWinner();
    }
  });
});

const resetGame = (isFullReset) => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  gameWinner.classList.add("hide");
  game.classList.remove("hide");
  reset.classList.remove("hide");
  msg.innerText = ""; // Clear previous win/tie message

  if (isFullReset) {
    player1Wins = 0;
    player2Wins = 0;
    player1Losses = 0;
    player2Losses = 0;
    draws = 0;
  }

  assignPlayers(); // Assigns symbols and updates names
  updateScoreboard();
};


reset.addEventListener("click", () => {
  resetGame(true); // Full reset including scores
});

newGameBtn.addEventListener("click", () => {
  resetGame(true); // Full reset for "Play Again?"
});

continueBtn.addEventListener("click", () => {
  resetGame(false); // Reset board but keep scores
});

// Initial setup
assignPlayers();
updateScoreboard();
