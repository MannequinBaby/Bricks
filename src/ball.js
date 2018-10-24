import {collision} from "src/collisionDetection.js";
export default class Ball {
  constructor(game) {
    //this.game allows us to check the position of anything
    //inside the game, by this.game.paddle.position.x;
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.image = document.getElementById("imgBall");
    this.size = 16;
    this.speed = {
      x: 4,
      y: -2
    };
    this.position = {
      x: 0,
      y: this.gameHeight / 2
    };
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    //wall on left or right
    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    //wall on bottom or top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    if (this.position.y > this.gameHeight - this.size) {
      this.game.gameLives--;
      this.reset();
    }
    //collision with paddle
    if (collision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
  reset() {
    this.position = {
      x: 0,
      y: this.gameHeight / 2
    };
    this.speed = {
      x: 4,
      y: -2
    };
  }
}
