let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let gameWinner = document.querySelector(".gameWinner");
let newGameBtn = document.querySelector("#newGameBtn");
let continueBtn = document.querySelector("#continueBtn");
let msg = document.querySelector("#msg");
let game = document.querySelector(".game");
let player1Score = document.querySelector("#player1Score p:last-child");
let player2Score = document.querySelector("#player2Score p:last-child");
let tieScore = document.querySelector("#tieScore p");
let player1Assignment = document.querySelector("#player1Assignment");
let player2Assignment = document.querySelector("#player2Assignment");
let scoreboard = document.querySelector(".scoreboard");
let turnO = true;

let player1 = "O";
let player2 = "X";
let player1Wins = 0;
let player2Wins = 0;
let player1Losses = 0;
let player2Losses = 0;
let ties = 0;

const assignPlayers = () => {
  if (Math.random() < 0.5) {
    player1 = "O";
    player2 = "X";
  } else {
    player1 = "X";
    player2 = "O";
  }
  player1Assignment.innerText = `Player 1: ${player1}`;
  player2Assignment.innerText = `Player 2: ${player2}`;
};

const updateScoreboard = () => {
  player1Score.innerText = `Wins: ${player1Wins}, Losses: ${player1Losses}`;
  player2Score.innerText = `Wins: ${player2Wins}, Losses: ${player2Losses}`;
  tieScore.innerText = `Ties: ${ties}`;
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
      return false;
    }
  }
  return true;
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  const winningPlayer = winner === player1 ? "Player 1" : "Player 2";
  if (winner === player1) {
    player1Wins++;
    player2Losses++;
  } else {
    player2Wins++;
    player1Losses++;
  }
  updateScoreboard();
  msg.innerHTML = `Congratulations to ${winningPlayer} (${winner}) for winning the game!<br>`;
  gameWinner.classList.remove("hide");
  game.classList.add("hide");
  reset.classList.add("hide");
  scoreboard.style.marginTop = "-20rem";
};

const showTie = () => {
  ties++;
  updateScoreboard();
  msg.innerHTML = `It's a tie! Players will switch sides.<br>`;
  gameWinner.classList.remove("hide");
  game.classList.add("hide");
  reset.classList.add("hide");
};

const switchPlayers = () => {
  const temp = player1;
  player1 = player2;
  player2 = temp;
};

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let positionValue1 = boxes[pattern[0]].innerText;
    let positionValue2 = boxes[pattern[1]].innerText;
    let positionValue3 = boxes[pattern[2]].innerText;

    if (
      positionValue1 !== "" &&
      positionValue2 !== "" &&
      positionValue3 !== ""
    ) {
      if (
        positionValue1 === positionValue2 &&
        positionValue2 === positionValue3
      ) {
        showWinner(positionValue1);
        disableBoxes();
        return;
      }
    }
  }
  if (checkTie()) {
    showTie();
    switchPlayers();
    disableBoxes();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turnO) {
        box.innerText = player1;
        turnO = false;
      } else {
        box.innerText = player2;
        turnO = true;
      }
      box.disabled = true;
      checkWinner();
    }
  });
});

reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  gameWinner.classList.add("hide");
  game.classList.remove("hide");
  reset.classList.remove("hide");
  turnO = true;
  player1Wins = 0;
  player2Wins = 0;
  player1Losses = 0;
  player2Losses = 0;
  ties = 0;
  updateScoreboard();
  assignPlayers();
  scoreboard.style.marginTop = "0rem";
});

newGameBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  gameWinner.classList.add("hide");
  game.classList.remove("hide");
  reset.classList.remove("hide");
  turnO = true;
  player1Wins = 0;
  player2Wins = 0;
  player1Losses = 0;
  player2Losses = 0;
  ties = 0;
  msg.innerText = "";
  updateScoreboard();
  assignPlayers();
  scoreboard.style.marginTop = "0rem";
});

continueBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  gameWinner.classList.add("hide");
  game.classList.remove("hide");
  reset.classList.remove("hide");
  turnO = true;
  msg.innerText = "";
  assignPlayers();
  scoreboard.style.marginTop = "0rem";
});

assignPlayers();
updateScoreboard();
