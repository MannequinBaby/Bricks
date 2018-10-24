import Brick from "/src/brick.js";
export function buildLevel(game, level) {
  let bricks = [];
  level.forEach(function(row, rowIndex) {
    row.forEach(function(brickIsh, brickIndex) {
      if (brickIsh === 1) {
        let position = {
          x: (500 / 9) * brickIndex,
          y: 50 + (300 / 15) * rowIndex
        };
        bricks.push(new Brick(game, position));
      }
    });
  });
  return bricks;
}

export const level1 = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export const testLevel = [
  [1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1]
];
