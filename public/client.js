const socket = io();

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const leaderboard = document.getElementById("leaderboard");

let players = [];
let collectibles = [];

socket.on("state", (gameState) => {
  players = gameState.players;
  collectibles = gameState.collectibles;
  draw();
  updateLeaderboard();
});

document.addEventListener("keydown", (event) => {
  const keys = {
    ArrowUp: "up",
    w: "up",
    W: "up",
    ArrowDown: "down",
    s: "down",
    S: "down",
    ArrowLeft: "left",
    a: "left",
    A: "left",
    ArrowRight: "right",
    d: "right",
    D: "right"
  };

  const direction = keys[event.key];

  if (direction) {
    event.preventDefault();
    socket.emit("move", direction);
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  collectibles.forEach((item) => {
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(item.x, item.y, item.width, item.height);
  });

  players.forEach((player) => {
    ctx.fillStyle = player.id === socket.id ? "#2563eb" : "#dc2626";
    ctx.fillRect(player.x, player.y, 20, 20);

    ctx.fillStyle = "#111827";
    ctx.font = "12px Arial";
    ctx.fillText(player.score, player.x, player.y - 5);
  });
}

function updateLeaderboard() {
  leaderboard.innerHTML = "";

  [...players]
    .sort((a, b) => b.score - a.score)
    .forEach((player) => {
      const li = document.createElement("li");
      li.textContent = `${player.id.slice(0, 5)} — Score: ${player.score} — ${player.rank}`;
      leaderboard.appendChild(li);
    });
}