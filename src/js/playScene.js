/**
 * playScene.js
 *
 * This is the main game and all its functionalities.
 *
 *
 * SHARED OBJECTS:
 *
 * shared_grid : {         //read by all, written to only by the host.
 *     grid: [][]            // 2D array [x][y] of bools (true = grass, false = no grass)
 * }
 *
 * shared_time: {           // read by all, written to only by the host.
 *      state                 // "waiting" or "playing"
 *      gameTimer : 90        // seconds remaining in game round
 * }
 *
 * shared_scores: {     // read by all, written to only by the host.
 *      scores: []            // an array containing sorted top scores for this session
 *      currentScore          // score in current session
 * }
 *
 * shared_seeds: {          // is read by all, written to only by the host.
 *      seeds: [
 *        {
 *          x,                // x position
 *          y,                // y position
 *          age,              // age of seed in frames
 *        },
 *      ]
 * }
 *
 * me : {                   // "my" shared object; is read by all, written to only by own client.
 *      role,                 // "none", "observer", "sheep", or "ram"
 *      position: {
 *            x,              // x position in cells
 *            y,              // y position in cells
 *      },
 *      direction,            // "up", "down", "left", "right"; determines sprite to draw
 * }
 *
 * guests : []              // a "guests" shared object, containing an array of all guests in the game
 */

import { changeScene, scenes, images, sounds } from "./main.js";
import { pointInRect, array2D } from "./utilities.js";

const GRID_SIZE = 20; // rows and cols in grid
const CELL_SIZE = 8; // pixel width and height of grid cells
const SEED_LIFESPAN = 6; // age/duration of a seed object
const SEED_LIFESPAN_SPAWN1 = 5; // defines how often a seed should spawn

let me;
let guests;

let shared_grid;
let shared_time;
let shared_seeds;
export let shared_scores;

export function preload() {
  shared_grid = partyLoadShared("shared_grid", {
    grid: array2D(20, 20, true),
    cellsEaten: 0,
  });

  shared_time = partyLoadShared("shared_time", {
    state: "waiting",
    gameTimer: 90,
  });

  shared_scores = partyLoadShared("shared_scores", { scores: [] });

  shared_seeds = partyLoadShared("shared_seeds", { seeds: [] });

  me = partyLoadMyShared({
    role: "none",
    position: { x: 0, y: 0 },
    direction: "down",
  });
  guests = partyLoadGuestShareds();

  partySubscribe("eatCell", onEatCell);
  partySubscribe("startRound", onStartRound);
  partySubscribe("endRound", () => changeScene(scenes.over));
}

export function setup() {
  if (partyIsHost()) resetGameState();
}

export function enter() {
  me.role = "observer";
  sounds.sheep_bleat.play();
}

export function leave() {
  me.role = "none";
  sounds.end_game.play();
}

export function draw() {
  // draw
  background("black");

  // draw grid
  push();
  translate(32, 33); // four tile border
  drawGrid();
  pop();

  // draw border
  image(images.key_art.border, 0, 0, 224, 224);

  // draw players
  push();
  translate(32, 32);
  drawPlayers();
  pop();

  drawUI();
}

export function onStartRound() {
  sounds.sheep_bleat.play();
}
export function update() {
  assignPlayers();
}

// note revisit drawing code, once we have sprites for all state
// grid[x][y].state, grid[x][y].sprite

function drawGrid() {
  push();

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const x = col * CELL_SIZE;
      const y = row * CELL_SIZE;

      if (shared_grid.grid[col][row] === true) {
        image(images.grass.main, x, y, CELL_SIZE, CELL_SIZE);
      } else {
        image(images.dirt.main, x, y, CELL_SIZE, CELL_SIZE);
      }

      //alternate grass
      drawAltGrass(images.grass.alts[0], 18, 1);
      drawAltGrass(images.grass.alts[0], 10, 7);
      drawAltGrass(images.grass.alts[0], 4, 8);
      drawAltGrass(images.grass.alts[0], 2, 11);
      drawAltGrass(images.grass.alts[0], 19, 18);
      drawAltGrass(images.grass.alts[1], 2, 5);
      drawAltGrass(images.grass.alts[1], 15, 5);
      drawAltGrass(images.grass.alts[1], 13, 8);
      drawAltGrass(images.grass.alts[2], 13, 1);
      drawAltGrass(images.grass.alts[2], 16, 1);
      drawAltGrass(images.grass.alts[2], 1, 4);
      drawAltGrass(images.grass.alts[2], 10, 14);
      drawAltGrass(images.grass.alts[2], 11, 17);
      drawAltGrass(images.grass.alts[3], 4, 0);
      drawAltGrass(images.grass.alts[3], 18, 7);
      drawAltGrass(images.grass.alts[3], 14, 9);
      drawAltGrass(images.grass.alts[3], 2, 18);
      drawAltGrass(images.grass.alts[3], 10, 17);
    }
  }

  for (const seed of shared_seeds.seeds) {
    image(
      images.seed.sprouts[4],
      seed.x * CELL_SIZE,
      seed.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }

  pop();
}

function drawAltGrass(img, x, y) {
  if (shared_grid.grid[x][y] === true) {
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
  translate(-2, -4);

  image(sprites[player.direction], 0, 0, 12, 12);
  pop();
}

function drawUI() {
  if (shared_time.state === "playing") {
    drawNumber(shared_grid.cellsEaten, 20, 5, 8);
    drawNumber(shared_time.gameTimer, 198, 5, 8);
  }

  if (shared_time.state === "waiting") {
    push();
    image(images.screens.play_wait, 63, 181);
    pop();
  }
}

// drawNumber
// draws the number given by `n` at the position given by `x` and `y`
// uses the 8x8 number tiles in images.numbers[]
export function drawNumber(n, x, y, scale) {
  const num = floor(n).toString();
  for (let i = 0; i < num.length; i++) {
    const digit = parseInt(num[i]);
    image(images.numbers[digit], x + i * scale, y, scale, scale);
  }
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

  if (shared_time.state === "playing") {
    if (shared_grid.grid[me.position.x][me.position.y] === true) {
      sounds.sheep_eat.play();
    }
    partyEmit("eatCell", { x: me.position.x, y: me.position.y });
  }
}

function assignPlayers() {
  if (!guests.find((p) => p.role === "sheep")) {
    // if there isn't a sheep
    // find the first observer
    const o = guests.find((p) => p.role === "observer");
    // if thats me, take the role
    if (o === me) {
      me.role = "sheep";
      me.position.x = 0;
      me.position.y = 0;
    }
  }
  if (!guests.find((p) => p.role === "ram")) {
    // if there isn't a ram
    // find the first observer
    const o = guests.find((p) => p.role === "observer");
    // if thats me, take the role
    if (o === me) {
      me.role = "ram";
      me.position.x = 19;
      me.position.y = 19;
    }
  }
}

////////////////////////////////////////////////////////////////
// Host Functions
export function hostUpdate() {
  if (!partyIsHost()) return;

  if (shared_time.state === "waiting") {
    if (
      guests.find((p) => p.role === "sheep") &&
      guests.find((p) => p.role === "ram")
    ) {
      startRound();
    }
  }

  if (shared_time.state === "playing") {
    updateTimer();
    updateSeeds();

    shared_grid.cellsEaten = shared_grid.grid
      .flat()
      .filter((x) => x === false).length;

    if (shared_time.gameTimer === 0) {
      console.log("Game Over: timer ran out");
      endRound();
    }

    if (shared_grid.cellsEaten === GRID_SIZE * GRID_SIZE) {
      console.log("Game over: all grass eaten, you win");
      endRound();
    }
  }
}

function startRound() {
  if (!partyIsHost()) return;
  shared_time.state = "playing";
  partyEmit("startRound");
}

function endRound() {
  if (!partyIsHost()) return;
  shared_scores.currentScore = shared_grid.cellsEaten;
  updateHighScores();
  resetGameState();
  partyEmit("endRound");
}

function resetGameState() {
  shared_time.state = "waiting";
  shared_time.gameTimer = 90;
  shared_grid.grid = array2D(20, 20, true);
  shared_grid.cellsEaten = 0;
  shared_seeds.seeds = [];
}

function updateSeeds() {
  if (!partyIsHost()) return;
  if (shared_seeds.seeds.length < 1) {
    spawnSeed();
  }

  for (const seed of shared_seeds.seeds) {
    seed.age++;
    if (seed.age === SEED_LIFESPAN_SPAWN1 * 60) {
      spawnDiamond(seed.x, seed.y, 1);
    }
    if (seed.age === SEED_LIFESPAN_SPAWN1 * 60 + 20) {
      spawnDiamond(seed.x, seed.y, 2);
    }
    if (seed.age === SEED_LIFESPAN_SPAWN1 * 60 + 40) {
      spawnDiamond(seed.x, seed.y, 3);
    }
  }

  shared_seeds.seeds = shared_seeds.seeds.filter(
    (seed) => seed.age < SEED_LIFESPAN * 60
  );
}

function spawnDiamond(x, y, dist = 1) {
  const cells = makeDiamond(x, y, dist);
  console.log(cells);
  for (const cell of cells) {
    growGrass(cell[0], cell[1]);
  }
}

// makeDiamond
// returns all cells that are `dist` away from `x`, `y`
// measured with manhattan distance
function makeDiamond(x, y, dist) {
  const cells = [];
  for (let i = 0; i < dist; i++) {
    cells.push([x + i, y - dist + i]); //quadrant I
    cells.push([x - dist + i, y - i]); //quadrant II
    cells.push([x - i, y + dist - i]); //quadrant III
    cells.push([x + dist - i, y + i]); //quadrant IV
  }
  return cells;
}

function growGrass(x, y) {
  if (!pointInRect({ x, y }, { x: 0, y: 0, w: 19, h: 19 })) return;
  shared_grid.grid[x][y] = true;
}

function spawnSeed() {
  shared_seeds.seeds.push({
    x: floor(random() * GRID_SIZE),
    y: floor(random() * GRID_SIZE),
    age: 0,
  });
}

function updateTimer() {
  if (!partyIsHost()) return;

  if (shared_time.state === "playing" && frameCount % 60 === 0) {
    shared_time.gameTimer--;
  }
}

function updateHighScores() {
  if (!partyIsHost()) return;
  let scoreList = [...shared_scores.scores];
  scoreList.push(shared_scores.currentScore);
  scoreList = scoreList.sort((a, b) => b - a);
  shared_scores.scores = scoreList;
}

function onEatCell(loc) {
  if (!partyIsHost()) return;
  shared_grid.grid[loc.x][loc.y] = false;
  for (const seed of shared_seeds.seeds) {
    if (seed.x === loc.x && seed.y === loc.y) {
      seed.age = 1000000000; // old enough that it will be removed
    }
  }
}
