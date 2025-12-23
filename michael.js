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

// WIN PATTERNS
const winPatterns = [
  { combo: [0,1,2], line: { top: "50px", left: "0", width: "100%", rotate: "0deg" } },
  { combo: [3,4,5], line: { top: "160px", left: "0", width: "100%", rotate: "0deg" } },
  { combo: [6,7,8], line: { top: "270px", left: "0", width: "100%", rotate: "0deg" } },

  { combo: [0,3,6], line: { top: "0", left: "50px", width: "300px", rotate: "90deg" } },
  { combo: [1,4,7], line: { top: "0", left: "160px", width: "300px", rotate: "90deg" } },
  { combo: [2,5,8], line: { top: "0", left: "270px", width: "300px", rotate: "90deg" } },

  { combo: [0,4,8], line: { top: "0", left: "0", width: "420px", rotate: "45deg" } },
  { combo: [2,4,6], line: { top: "0", left: "300px", width: "420px", rotate: "-45deg" } }
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
  const winLine = document.getElementById("winLine");

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern.combo;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      pattern.combo.forEach(i => cells[i].classList.add("winner"));

      winLine.style.display = "block";
      winLine.style.top = pattern.line.top;
      winLine.style.left = pattern.line.left;
      winLine.style.width = pattern.line.width;
      winLine.style.transform = `rotate(${pattern.line.rotate})`;

      return true;
    }
  }
  return false;
}


// ================= CONTROLS =================
function restartGame() {
  board.fill("");
  document.getElementById("winLine").style.display = "none";

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

