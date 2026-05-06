export default class Player {
  constructor(id, x = 0, y = 0) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.score = 0;
    this.width = 20;
    this.height = 20;
  }

  movePlayer(direction, amount) {
    if (direction === "up") this.y -= amount;
    if (direction === "down") this.y += amount;
    if (direction === "left") this.x -= amount;
    if (direction === "right") this.x += amount;
  }

  calculateRank(players) {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const rank = sortedPlayers.findIndex((player) => player.id === this.id) + 1;

    return `Rank: ${rank}/${players.length}`;
  }

  collision(collectible) {
    return (
      this.x < collectible.x + collectible.width &&
      this.x + this.width > collectible.x &&
      this.y < collectible.y + collectible.height &&
      this.y + this.height > collectible.y
    );
  }
}