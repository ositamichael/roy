// ELEMENTS
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const pauseBtn = document.getElementById("pause");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

const bgSound = document.getElementById("bgSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

// GAME STATE
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
// ================= AUDIO UNLOCK (IMPORTANT) =================
let audioUnlocked = false;
document.addEventListener("click", () => {
  if (audioUnlocked) return;

  bgSound.volume = 0.25;
  bgSound.play().catch(() => {});
  audioUnlocked = true;
});

// ================= EVENTS =================
cells.forEach(cell => cell.addEventListener("click", onCellClick));
restartBtn.addEventListener("click", restartGame);
pauseBtn.addEventListener("click", togglePause);

// ================= GAME LOGIC =================
function onCellClick() {
  const index = this.dataset.index;

  if (!running || paused || board[index] !== "") return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  if (checkWinner()) {
    bgSound.pause();
    bgSound.currentTime = 0;

    winSound.currentTime = 0;
    winSound.play().catch(() => {});

    scores[currentPlayer]++;
    updateScore();

    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    running = false;
  } 
  else if (board.every(cell => cell !== "")) {
    bgSound.pause();
    bgSound.currentTime = 0;

    drawSound.currentTime = 0;
    drawSound.play().catch(() => {});

    scores.D++;
    updateScore();

    statusText.textContent = "😐 It's a draw!";
    running = false;
  } 
  else {
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

// ================= CONTROLS =================
function restartGame() {
  board.fill("");
 

  cells.forEach(cell => cell.textContent = "");

  currentPlayer = "X";
  running = true;
  paused = false;

  statusText.textContent = "Player X’s turn";
  pauseBtn.textContent = "⏸ Pause";

  bgSound.currentTime = 0;
  bgSound.play().catch(() => {});
}

function togglePause() {
  paused = !paused;
  pauseBtn.textContent = paused ? "▶ Resume" : "⏸ Pause";

  if (paused) {
    bgSound.pause();
  } else {
    bgSound.play().catch(() => {});
  }
}

// ================= SCORE =================
function updateScore() {
  scoreX.textContent = `X Wins: ${scores.X}`;
  scoreO.textContent = `O Wins: ${scores.O}`;
  scoreDraw.textContent = `Draws: ${scores.D}`;
}


