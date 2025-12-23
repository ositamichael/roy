document.addEventListener("click", function unlockAudio() {
  const click = document.getElementById("clickSound");
  if (click) {
    click.play().catch(() => {});
    click.pause();
    click.currentTime = 0;
  }
  document.removeEventListener("click", unlockAudio);
});

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const pauseBtn = document.getElementById("pause");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;
let paused = false;
let scores = { X: 0, O: 0, D: 0 };

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", onCellClick));
restartBtn.addEventListener("click", restartGame);
pauseBtn.addEventListener("click", togglePause);

function onCellClick() {
  const index = this.dataset.index;
  if (!running || paused || board[index] !== "") return;

  // 🔘 Click sound
  const clickSound = document.getElementById("clickSound");
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  if (checkWinner()) {

    // 🏆 Win sound
    const winSound = document.getElementById("winSound");
    if (winSound) winSound.play();

    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    scores[currentPlayer]++;
    updateScore();
    running = false;

  } else if (board.every(c => c !== "")) {

    // 🤝 Draw sound
    const drawSound = document.getElementById("drawSound");
    if (drawSound) drawSound.play();

    statusText.textContent = "😐 It's a draw!";
    scores.D++;
    updateScore();
    running = false;

  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}’s turn`;
  }
}

function checkWinner() {
  let winnerFound = false;
  winPatterns.forEach(pattern => {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winnerFound = true;
      pattern.forEach(i => cells[i].classList.add("winner"));
    }
  });
  return winnerFound;
}

function restartGame() {
  board.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  currentPlayer = "X";
  running = true;
  paused = false;
  statusText.textContent = "Player X’s turn";
  pauseBtn.textContent = "⏸ Pause";
}

function togglePause() {
  paused = !paused;
  if (paused) {
    statusText.textContent = "⏸ Game Paused";
    pauseBtn.textContent = "▶ Resume";
  } else {
    statusText.textContent = `Player ${currentPlayer}’s turn`;
    pauseBtn.textContent = "⏸ Pause";
  }
}

function updateScore() {
  scoreX.textContent = `X Wins: ${scores.X}`;
  scoreO.textContent = `O Wins: ${scores.O}`;
  scoreDraw.textContent = `Draws: ${scores.D}`;
}
