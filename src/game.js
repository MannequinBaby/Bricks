import Paddle from "src/paddle.js";
import InputHandler from "src/input.js";
import Ball from "src/ball.js";
import Brick from "src/brick.js";
import {buildLevel, testLevel, level1} from "src/levels.js";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAME_STATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.gameLives = 3;
    this.bricks = [];
    this.currentLevel = 0;
    this.levels = [testLevel, level1];
    new InputHandler(this.paddle, this);
  }
  start() {
    if (
      this.gameState !== GAME_STATE.MENU &&
      this.gameState !== GAME_STATE.NEWLEVEL
    ) {
      return;
    } else {
      if (this.currentLevel >= this.levels.length) {
        this.gameState = GAME_STATE.GAMEOVER;
      } else {
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddle];
        this.gameState = GAME_STATE.RUNNING;
      }
    }
  }
  update(deltaTime) {
    if (this.gameLives === 0) {
      this.gameState = GAME_STATE.GAMEOVER;
    }
    if (
      this.gameState === GAME_STATE.PAUSED ||
      this.gameState === GAME_STATE.MENU ||
      this.gameState === GAME_STATE.GAMEOVER
    )
      return;

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gameState = GAME_STATE.NEWLEVEL;
      this.start();
    }
    {
      [...this.gameObjects, ...this.bricks].forEach(object => {
        object.update(deltaTime);
      });

      this.bricks = this.bricks.filter(function(current) {
        return !current.markedForDeletion;
      });
    }
  }
  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(object => {
      object.draw(ctx);
    });
    if (this.gameState === GAME_STATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,.5)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState === GAME_STATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press 'space' to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gameState === GAME_STATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gameState === GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }
}
