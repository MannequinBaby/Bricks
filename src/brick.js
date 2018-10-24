import {collision} from "/src/collisionDetection.js";

export default class Brick {
  constructor(game, position) {
    this.game = game;
    this.image = document.getElementById("imgBrick");
    this.width = this.game.gameWidth / 9;
    this.height = this.game.gameHeight / 15;
    this.position = position;
    this.markedForDeletion = false;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update(deltaTime) {
    if (collision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }
  }
}
