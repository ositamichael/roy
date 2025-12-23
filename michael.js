// SPLASH SCREEN
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const app = document.querySelector(".wrapper");

  app.style.display = "none";

  setTimeout(() => {
    splash.style.display = "none";
    app.style.display = "block";
  }, 2000);
});

// UNLOCK AUDIO (required for mobile)
let audioUnlocked = false;
document.addEventListener("click", () => {
  if (audioUnlocked) return;

  const bg = document.getElementById("bgSound");
  if (bg) {
    bg.volume = 0.2;
    bg.play().catch(() => {});
  }

  audioUnlocked = true;
});

// GAME LOGIC
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
  if (!running || paused || board[index]) return;

  document.getElementById("clickSound").play().catch(() => {});

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById("winSound").play().catch(() => {});
    scores[currentPlayer]++;
    updateScore();
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    running = false;
    stopBg();
  } 
  else if (board.every(c => c)) {
    document.getElementById("drawSound").play().catch(() => {});
    scores.D++;
    updateScore();
    statusText.textContent = "😐 It's a draw!";
    running = false;
    stopBg();
  } 
  else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}’s turn`;
  }
}

function checkWinner() {
  return winPatterns.some(p => {
    const [a,b,c] = p;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      p.forEach(i => cells[i].classList.add("winner"));
      return true;
    }
  });
}

function restartGame() {
  board.fill("");
  cells.forEach(c => {
    c.textContent = "";
    c.classList.remove("winner");
  });
  running = true;
  paused = false;
  currentPlayer = "X";
  statusText.textContent = "Player X’s turn";
  document.getElementById("bgSound").play().catch(() => {});
}

function togglePause() {
  paused = !paused;
  pauseBtn.textContent = paused ? "▶ Resume" : "⏸ Pause";
  const bg = document.getElementById("bgSound");
  paused ? bg.pause() : bg.play().catch(() => {});
}

function updateScore() {
  scoreX.textContent = `X Wins: ${scores.X}`;
  scoreO.textContent = `O Wins: ${scores.O}`;
  scoreDraw.textContent = `Draws: ${scores.D}`;
}

function stopBg() {
  const bg = document.getElementById("bgSound");
  bg.pause();
  bg.currentTime = 0;
}
