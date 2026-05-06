import express from "express";
import http from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import Player from "./public/Player.mjs";
import Collectible from "./public/Collectible.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: "PHP 7.4.3" }));

app.use(
  express.static(path.join(__dirname, "public"), {
    etag: false,
    maxAge: 0,
    setHeaders(res) {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("Surrogate-Control", "no-store");
    }
  })
);

const players = {};
const collectibles = {};

function randomPosition(max) {
  return Math.floor(Math.random() * max);
}

function spawnCollectible() {
  const collectible = new Collectible(
    `collectible-${Date.now()}-${Math.random()}`,
    randomPosition(760),
    randomPosition(560),
    1
  );

  collectibles[collectible.id] = collectible;
}

for (let i = 0; i < 5; i++) {
  spawnCollectible();
}

function publicPlayers() {
  return Object.values(players).map((player) => ({
    id: player.id,
    x: player.x,
    y: player.y,
    score: player.score,
    rank: player.calculateRank(Object.values(players))
  }));
}

function publicCollectibles() {
  return Object.values(collectibles);
}

io.on("connection", (socket) => {
  players[socket.id] = new Player(socket.id, randomPosition(760), randomPosition(560));

  io.emit("state", {
    players: publicPlayers(),
    collectibles: publicCollectibles()
  });

  socket.on("move", (direction) => {
    const player = players[socket.id];
    if (!player) return;

    if (!["up", "down", "left", "right"].includes(direction)) return;

    player.movePlayer(direction, 8);

    player.x = Math.max(0, Math.min(780, player.x));
    player.y = Math.max(0, Math.min(580, player.y));

    for (const collectible of Object.values(collectibles)) {
      if (player.collision(collectible)) {
        player.score += collectible.value;
        delete collectibles[collectible.id];
        spawnCollectible();
      }
    }

    io.emit("state", {
      players: publicPlayers(),
      collectibles: publicCollectibles()
    });
  });

  socket.on("disconnect", () => {
    delete players[socket.id];

    io.emit("state", {
      players: publicPlayers(),
      collectibles: publicCollectibles()
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});