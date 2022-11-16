/**
 * playScene.js
 *
 * This is the main game and all its functionalities
 *
 */

import { changeScene, scenes, images, sounds } from "./main.js";

const GRID_SIZE = 20;
const CELL_SIZE = 20;

let me;
let guests;

let shared_grid;
let shared_highScores;
let shared_time;

export let final_cellEaten_count = 0;
export let highscore_export;

export function preload() {
  shared_grid = partyLoadShared("shared_grid", {
    grid: initGrid(),
    cellsEaten: 0,
  });

  // todo: swtich to a timestamp approach for time keeping
  shared_time = partyLoadShared("shared_time", { gameTimer: 90 });

  shared_highScores = partyLoadShared("shared_highScores", { scores: [] });

  // -20 so sheep starts off screen (fix this later)
  me = partyLoadMyShared({ role: "observer", position: { x: 0, y: -20 } });
  guests = partyLoadGuestShareds();
}

export function enter() {
  sounds.sheep_noise.play();
}

export function leave() {
  determineHighScore();

  final_cellEaten_count = shared_grid.cellsEaten;
  console.log(shared_highScores.scores);
  console.log(shared_highScores.scores[0]);
  highscore_export = shared_highScores.scores[0];
}

export function draw() {
  assignPlayers();

  // draw
  background("#faf7e1");
  image(images.key_art.fence, -10, 0, 620, 600);
  image(images.key_art.logo, 210, 5, 160, 80);

  push();
  translate(90, 100); //translates the location of the actual grass grid
  drawGrid();
  drawSheep();
  pop();
  drawUI();
}

export function update() {
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

  if (shared_grid.cellsEaten === GRID_SIZE * GRID_SIZE) {
    console.log("Game over: all grass eaten, you win");
    changeScene(scenes.over);
  }
}

function initGrid() {
  const grid = [];
  for (let col = 0; col < GRID_SIZE; col++) {
    grid[col] = new Array(GRID_SIZE).fill(false);
  }
  return grid;
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
      alternateGrass(images.grass.alts[1], 2, 3);
      alternateGrass(images.grass.alts[2], 4, 5);
      alternateGrass(images.grass.alts[0], 4, 6);
      alternateGrass(images.grass.alts[2], 8, 8);
      alternateGrass(images.grass.alts[0], 1, 2);
      alternateGrass(images.grass.alts[1], 18, 18);
      alternateGrass(images.grass.alts[2], 19, 14);
      alternateGrass(images.grass.alts[1], 13, 15);
      alternateGrass(images.grass.alts[1], 3, 18);
      alternateGrass(images.grass.alts[0], 2, 15);
      alternateGrass(images.grass.alts[0], 19, 3);
      alternateGrass(images.grass.alts[2], 15, 4);
    }
  }
  pop();
}

function alternateGrass(img, x, y) {
  if (shared_grid.grid[x][y] === false) {
    image(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

function drawSheep() {
  push();
  translate(-8, -10);

  const sheep = guests.find((p) => p.role === "sheep");
  if (sheep) {
    push();
    translate(sheep.position.x, sheep.position.y);
    switchSheepSprites(sheep, images.sheep);
    pop();
  }

  const ram = guests.find((p) => p.role === "ram");
  if (ram) {
    push();
    translate(ram.position.x, ram.position.y);
    switchSheepSprites(ram, images.ram);
    pop();
  }
  pop();
}

function switchSheepSprites(test, sheepOrRam) {
  if (test.direction === "down") {
    image(sheepOrRam.front, 0, 0, 35, 35);
  }
  if (test.direction === "left") {
    image(sheepOrRam.left, 0, 0, 35, 35);
  }
  if (test.direction === "right") {
    image(sheepOrRam.right, 0, 0, 35, 35);
  }
  if (test.direction === "up") {
    image(sheepOrRam.behind, 0, 0, 35, 35);
  }
}

function drawUI() {
  push();
  fill("#492905");
  textSize(20);
  textStyle(BOLD);

  textAlign(CENTER, CENTER);
  text(me.role, width * 0.6, height * 0.92);

  textAlign(LEFT);
  text("Grass eaten: " + shared_grid.cellsEaten, width * 0.085, height * 0.92);

  textAlign(CENTER, CENTER);
  text(shared_time.gameTimer, width * 0.85, height * 0.92);
  pop();
}

export function keyPressed() {
  const sheep = guests.find((p) => p.role === "sheep");
  const ram = guests.find((p) => p.role === "ram");

  if (sheep === me || ram === me) {
    sounds.nom.play();
    if (keyCode === DOWN_ARROW || keyCode === 83) {
      me.direction = "down";
      tryMove(0, CELL_SIZE);
    }
    if (keyCode === UP_ARROW || keyCode === 87) {
      me.direction = "up";
      tryMove(0, -CELL_SIZE);
    }
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      me.direction = "left";
      tryMove(-CELL_SIZE, 0);
    }
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
      me.direction = "right";
      tryMove(CELL_SIZE, 0);
    }

    let col = me.position.x / CELL_SIZE;
    let row = me.position.y / CELL_SIZE;

    if (shared_grid.grid[col][row] === false) {
      shared_grid.grid[col][row] = true;
      shared_grid.cellsEaten = shared_grid.cellsEaten + 1;
    }
  }
}

function tryMove(x, y) {
  // TODO the 19 is sus.
  // TODO position should be in grid cell units
  const targetLocation = { x: me.position.x + x, y: me.position.y + y };
  const bounds = { x: 0, y: 0, w: GRID_SIZE * 19, h: GRID_SIZE * 19 };
  if (!pointInRect(targetLocation, bounds)) {
    return;
  }

  me.position.x += x;
  me.position.y += y;
}

function pointInRect(p, r) {
  return (
    p.x >= r.x && // format wrapped
    p.x <= r.x + r.w &&
    p.y >= r.y &&
    p.y <= r.y + r.h
  );
}

export function determineHighScore() {
  let scoreList = [...shared_highScores.scores];
  scoreList.push(shared_grid.cellsEaten);
  scoreList = scoreList.sort((a, b) => b - a);
  shared_highScores.scores = scoreList;
}
