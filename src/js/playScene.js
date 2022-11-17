/**
 * playScene.js
 *
 * This is the main game and all its functionalities
 *
 */

import { changeScene, scenes, images, sounds } from "./main.js";
import { pointInRect, array2D } from "./utilities.js";

const GRID_SIZE = 20; // rows and cols in grid
const CELL_SIZE = 20; // pixel width and height of grid cells

let me;
let guests;

let shared_grid;
let shared_time;
export let shared_highScores;

export let cellsEaten = 0;

export function preload() {
  shared_grid = partyLoadShared("shared_grid", {
    grid: array2D(20, 20, false),
  });

  // todo: swtich to a timestamp approach for time keeping
  shared_time = partyLoadShared("shared_time", { gameTimer: 90 });

  shared_highScores = partyLoadShared("shared_highScores", { scores: [] });

  me = partyLoadMyShared({
    role: "observer",
    position: { x: 0, y: 0 },
    direction: "down",
  });
  guests = partyLoadGuestShareds();
}

export function enter() {
  sounds.sheep_bleat.play();
}

export function leave() {
  updateHighScores();
}

export function draw() {
  assignPlayers();

  // draw
  background("#faf7e1");
  image(images.key_art.fence, -10, 0, 620, 600);
  image(images.key_art.logo, 210, 5, 160, 80);

  push();
  // position game board
  translate(90, 100);
  drawGrid();
  drawPlayers();
  pop();

  drawUI();
}

export function update() {
  cellsEaten = shared_grid.grid.flat().filter((x) => x === true).length;

  // todo: refactor timer
  if (partyIsHost()) {
    if (frameCount % 60 === 0) {
      shared_time.gameTimer--;
    }
  }

  if (shared_time.gameTimer === 0) {
    console.log("Game Over: timer ran out");
    // todo move to best location
    sounds.end_game.play();
    changeScene(scenes.over);
  }

  if (cellsEaten === GRID_SIZE * GRID_SIZE) {
    console.log("Game over: all grass eaten, you win");
    changeScene(scenes.over);
  }
}

function drawGrid() {
  push();

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const x = col * CELL_SIZE;
      const y = row * CELL_SIZE;
      stroke("#94541E");

      // todo: just draw grass sprite
      if (shared_grid.grid[col][row] === false) {
        fill("#0F3325"); //grass
        rect(x, y, CELL_SIZE, CELL_SIZE);
        image(images.grass.main, x, y, CELL_SIZE, CELL_SIZE);
      } else {
        // todo: dirt sprite
        fill("#94541E"); //dirt
        rect(x, y, CELL_SIZE, CELL_SIZE);
        // TO DO: make sprite for dirt
      }

      //alternate grass
      // note data drive?
      drawAltGrass(images.grass.alts[1], 2, 3);
      drawAltGrass(images.grass.alts[2], 4, 5);
      drawAltGrass(images.grass.alts[0], 4, 6);
      drawAltGrass(images.grass.alts[2], 8, 8);
      drawAltGrass(images.grass.alts[0], 1, 2);
      drawAltGrass(images.grass.alts[1], 18, 18);
      drawAltGrass(images.grass.alts[2], 19, 14);
      drawAltGrass(images.grass.alts[1], 13, 15);
      drawAltGrass(images.grass.alts[1], 3, 18);
      drawAltGrass(images.grass.alts[0], 2, 15);
      drawAltGrass(images.grass.alts[0], 19, 3);
      drawAltGrass(images.grass.alts[2], 15, 4);
    }
  }
  pop();
}

function drawAltGrass(img, x, y) {
  if (shared_grid.grid[x][y] === false) {
    image(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

function drawPlayers() {
  const sheep = guests.find((p) => p.role === "sheep");
  if (sheep) drawPlayer(sheep, images.sheep);

  const ram = guests.find((p) => p.role === "ram");
  if (ram) drawPlayer(ram, images.ram);
}

function drawPlayer(player, sprites) {
  push();
  // move to square
  translate(player.position.x * CELL_SIZE, player.position.y * CELL_SIZE);
  // position in square
  translate(-8, -10);

  image(sprites[player.direction], 0, 0, 35, 35);
  pop();
}

function drawUI() {
  push();
  fill("#492905");
  textSize(20);
  textStyle(BOLD);

  textAlign(CENTER, CENTER);
  text(me.role, width * 0.6, height * 0.92);

  textAlign(LEFT);
  text("Grass eaten: " + cellsEaten, width * 0.085, height * 0.92);

  textAlign(CENTER, CENTER);
  text(shared_time.gameTimer, width * 0.85, height * 0.92);
  pop();
}

export function keyPressed() {
  const sheep = guests.find((p) => p.role === "sheep");
  const ram = guests.find((p) => p.role === "ram");

  if (sheep === me || ram === me) {
    if (keyCode === DOWN_ARROW || keyCode === 83) {
      me.direction = "down";
      move(0, 1);
    }
    if (keyCode === UP_ARROW || keyCode === 87) {
      me.direction = "up";
      move(0, -1);
    }
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      me.direction = "left";
      move(-1, 0);
    }
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
      me.direction = "right";
      move(1, 0);
    }
  }
}

function move(dX, dY) {
  // test if move possible
  const targetLocation = {
    x: me.position.x + dX,
    y: me.position.y + dY,
  };
  const bounds = { x: 0, y: 0, w: 19, h: 19 };
  if (!pointInRect(targetLocation, bounds)) {
    return;
  }

  // execute move
  me.position.x += dX;
  me.position.y += dY;

  if (shared_grid.grid[me.position.x][me.position.y] === false) {
    sounds.sheep_eat.play();
    shared_grid.grid[me.position.x][me.position.y] = true;
  }
}

export function updateHighScores() {
  let scoreList = [...shared_highScores.scores];
  scoreList.push(cellsEaten);
  scoreList = scoreList.sort((a, b) => b - a);
  shared_highScores.scores = scoreList;
}

function assignPlayers() {
  if (!guests.find((p) => p.role === "sheep")) {
    // if there isn't a sheep
    // find the first observer
    const o = guests.find((p) => p.role === "observer");
    // if thats me, take the role
    if (o === me) o.role = "sheep";
  }
  if (!guests.find((p) => p.role === "ram")) {
    // if there isn't a ram
    // find the first observer
    const o = guests.find((p) => p.role === "observer");
    // if thats me, take the role
    if (o === me) o.role = "ram";
  }
}
