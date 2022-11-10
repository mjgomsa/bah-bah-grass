/**
 * playScene.js
 *
 * This is the main game and all its functionalities
 *
 */

import { changeScene, scenes, images, sounds } from "./main.js";

let me;
let guests;
let shared_grid;
let shared_time;
// let shared_state; //not needed anymore
let shared_farmer;
export let shared_highScores;
let shared_hostData;
const grid_size = 20;

let seed_position_X; //temporary
let seed_position_Y;

export function preload() {
  shared_grid = partyLoadShared("shared_grid", { grid: [], eaten: 0 });

  me = partyLoadMyShared({ role: "observer", position: { x: 0, y: -20 } }); // -20 is sus

  guests = partyLoadGuestShareds();

  shared_time = partyLoadShared("shared_time", { gameTimer: 90 });

  // shared_state = partyLoadShared("shared_state", {
  //   // game_mode: 0,
  //   did_win: false,
  //   did_timeOut: false,
  // });

  shared_farmer = partyLoadShared("shared_farmer", {
    farmerTimer: 10,
    madeIt: false,
  });

  shared_highScores = partyLoadShared("shared_highScores", { scores: [] });

  shared_hostData = partyLoadShared("shared_hostData", { seed_positions: [] });
}

export function setup() {
  if (partyIsHost()) {
    resetGrid();
    var seed_positions = createSeedArray();
    partySetShared(shared_hostData, { seed_array: seed_positions }); // figure out another way to do this
  }
}

export function enter() {
  sounds.sheep_noise.play();
}

export function draw() {
  assignPlayers();
  // gameTimer(); //now in update
  // replantAndCueTimers();

  // draw
  background("#faf7e1");
  image(images.key_art.fence, -10, 0, 620, 600);
  image(images.key_art.logo, 210, 5, 160, 80);
  translate(90, 100);
  drawGrid();
  drawSheep();
  drawUI();
}

export function update() {
  if (partyIsHost()) {
    if (frameCount % 60 === 0) {
      shared_time.gameTimer--;
    }
  }

  if (shared_grid.eaten === grid_size * grid_size) {
    console.log("Game over: all grass eaten, you win");
    changeScene(scenes.over);
  }

  if (shared_time.gameTimer === 0) {
    console.log("Game Over: timer ran out");
    sounds.end_game.play();
    changeScene(scenes.over);
  }
}

function resetGrid() {
  const newGrid = [];
  for (let col = 0; col < grid_size; col++) {
    newGrid[col] = new Array(grid_size).fill(false);
  }
  shared_grid.grid = newGrid;
  shared_grid.eaten = 0;
}

function assignPlayers() {
  if (!guests.find((p) => p.role === "sheep")) {
    // if there isn't a sheep
    const o = guests.find((p) => p.role === "observer"); // find the first observer
    if (o === me) o.role = "sheep"; // if thats me, take the role
  }
  if (!guests.find((p) => p.role === "ram")) {
    // if there isn't a ram
    const o = guests.find((p) => p.role === "observer"); // find the first observer
    if (o === me) o.role = "ram"; // if thats me, take the role
  }
}

function replantAndCueTimers() {
  // TO DO: write shorter and clearer
  const extra_x = (windowWidth - width) / 2 + 87;
  const extra_y = 100 + 50;

  if (shared_time.gameTimer <= 85 && shared_time.gameTimer > 75) {
    seed_position_X = shared_hostData.seed_array[0][0] * grid_size + extra_x;
    seed_position_Y = shared_hostData.seed_array[0][1] * grid_size + extra_y;
    replantGrass(
      shared_hostData.seed_array[0][0],
      shared_hostData.seed_array[0][1]
    );
  } else if (shared_time.gameTimer <= 70 && shared_time.gameTimer > 60) {
    seed_position_X = shared_hostData.seed_array[1][0] * grid_size + extra_x;
    seed_position_Y = shared_hostData.seed_array[1][1] * grid_size + extra_y;
    replantGrass(
      shared_hostData.seed_array[1][0],
      shared_hostData.seed_array[1][1]
    );
  } else if (shared_time.gameTimer <= 55 && shared_time.gameTimer > 45) {
    seed_position_X = shared_hostData.seed_array[2][0] * grid_size + extra_x;
    seed_position_Y = shared_hostData.seed_array[2][1] * grid_size + extra_y;
    replantGrass(
      shared_hostData.seed_array[2][0],
      shared_hostData.seed_array[2][1]
    );
  } else if (shared_time.gameTimer <= 40 && shared_time.gameTimer > 30) {
    seed_position_X = shared_hostData.seed_array[3][0] * grid_size + extra_x;
    seed_position_Y = shared_hostData.seed_array[3][1] * grid_size + extra_y;
    replantGrass(
      shared_hostData.seed_array[3][0],
      shared_hostData.seed_array[3][1]
    );
  } else if (shared_time.gameTimer <= 25 && shared_time.gameTimer > 15) {
    seed_position_X = shared_hostData.seed_array[4][0] * grid_size + extra_x;
    seed_position_Y = shared_hostData.seed_array[4][1] * grid_size + extra_y;
    replantGrass(
      shared_hostData.seed_array[4][0],
      shared_hostData.seed_array[4][1]
    );
  } else if (shared_time.gameTimer <= 10 && shared_time.gameTimer > 0) {
    seed_position_X = shared_hostData.seed_array[5][0] * grid_size + extra_x;
    seed_position_Y = shared_hostData.seed_array[5][1] * grid_size + extra_y;
    replantGrass(
      shared_hostData.seed_array[5][0],
      shared_hostData.seed_array[5][1]
    );
  } else {
    shared_farmer.farmerTimer = 10;
    shared_farmer.madeIt = false;
  }
}

function replantGrass(seed_posX, seed_posY) {
  const x = seed_posX * grid_size;
  const y = seed_posY * grid_size;

  const sheep = guests.find((p) => p.role === "sheep");
  const ram = guests.find((p) => p.role === "ram");

  image(images.key_art.farmer, 435, 0, 35, 50);
  // seed.show();
  let seed = image(images.seed, seed_position_X, seed_position_Y, 25, 25);
  if (partyIsHost()) {
    if (frameCount % 60 === 0) {
      shared_farmer.farmerTimer--;
    }
  }
  if (sheep === me || ram === me) {
    // if either player made it to the seed
    if (me.position.x === x && me.position.y === y) {
      shared_farmer.madeIt = true;
    }
  }
  if (shared_farmer.farmerTimer === 0) {
    //this works!
    if (shared_farmer.madeIt === false) {
      console.log("Didn't get seed in time");
      for (i = 0; i < grid_size; i++) {
        shared_grid.grid[i][seed_posY] = false;
      }
      seed.hide();
    }
  }
  if (shared_farmer.madeIt === true) {
    console.log("You got to seed in time!");
    seed.hide();
    shared_grid.grid[seed_posX][seed_posY] = true;
  }
  push();
  fill("#492905");
  textSize(20);
  text(shared_farmer.farmerTimer, 460, 70);
  pop();
}

function drawGrid() {
  push();
  translate(0, 0);
  for (let row = 0; row < grid_size; row++) {
    for (let col = 0; col < grid_size; col++) {
      const x = col * grid_size;
      const y = row * grid_size;
      stroke("#94541E");

      if (shared_grid.grid[col][row] === false) {
        fill("#0F3325"); //grass
        rect(x, y, grid_size, grid_size);
        image(images.grass.main, x, y, grid_size, grid_size);
      } else {
        fill("#94541E"); //dirt
        rect(x, y, grid_size, grid_size);
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
    image(img, x * grid_size, y * grid_size, grid_size, grid_size);
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
  translate(0, 40);
  fill("#492905");
  textSize(20);
  textStyle(BOLD);

  textAlign(CENTER, CENTER);
  text(me.role, 285, 420);

  textAlign(LEFT);
  text("Grass eaten: " + shared_grid.eaten, -30, 420);

  textAlign(CENTER, CENTER);
  text(shared_time.gameTimer, 430, 420);
  pop();
}

export function keyPressed() {
  const sheep = guests.find((p) => p.role === "sheep");
  const ram = guests.find((p) => p.role === "ram");

  if (sheep === me || ram === me) {
    sounds.nom.play();
    if (keyCode === DOWN_ARROW || keyCode === 83) {
      me.direction = "down";
      tryMove(0, grid_size);
    }
    if (keyCode === UP_ARROW || keyCode === 87) {
      me.direction = "up";
      tryMove(0, -grid_size);
    }
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      me.direction = "left";
      tryMove(-grid_size, 0);
    }
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
      me.direction = "right";
      tryMove(grid_size, 0);
    }

    let col = me.position.x / grid_size;
    let row = me.position.y / grid_size;

    if (shared_grid.grid[col][row] === false) {
      shared_grid.grid[col][row] = true;
      shared_grid.eaten = shared_grid.eaten + 1;
    }
  }
}

function tryMove(x, y) {
  const targetLocation = { x: me.position.x + x, y: me.position.y + y };
  const bounds = { x: 0, y: 0, w: grid_size * 19, h: grid_size * 19 };
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

function createSeedArray() {
  return Array.from({ length: 6 }, () => [
    floor(random(0, 20)),
    floor(random(0, 20)),
  ]);
}
