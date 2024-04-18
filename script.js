const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid; //it'll check the progress of game

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to initialise game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  newGameBtn.classList.remove("active");

  gameInfo.innerText = `Current Player - ${currentPlayer}`;

  //UI par update
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList.remove("win");
  });
}
initGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index); //passing index so that we know which box is clicked
  });
});

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";

    //swapping turn
    swapTurn();
    //check if somebody has won
    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // check if winner is x
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else answer = "O";

      // winner mil gaya toh ab click nahi hone dena
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // winner mil gaya
  if (answer != "") {
    gameInfo.innerText = `Winner is ${answer}`;
    newGameBtn.classList.add("active");
  }

  //if there is a tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    //counting how many boxes are empty
    if (box != "") {
      fillCount++;
    }
  });

  if (fillCount === 9) {
    //if no box is empty, means fillcount is 9
    gameInfo.innerText = "Game is Tied !";
    newGameBtn.classList.add("active");
  }
}

newGameBtn.addEventListener("click", initGame);