/**
 * index.js
 *
 * me: keeps track of my curernt user, includes user position and role
 * guests: an compilation of all the users other than myself
 *      guests either have a role to play (aka: sheep or ram) or are assigned the observer role
 * shared_grid: holds a [][] that holds the current state of the gird- T/F values
 * shared_time: a shared timer (90s) that runs the game
 * shared_state: state machine that controls the game's screens
 * shared_farmer: functionality for replanting grass; includes a timer (10s) and a boolean value that evaluates if a sheep made it or not
 * highscores: keeps track of the highest score a single session user has achieved
 * grid_size: determines the size of the grid
 * seed_positions: array that holds the x,y positions of the randomly assigned seeds on the game
 * images: an object that contains all of the game's images
 * sounds: an object that contains all of the game's sounds
 **/

let me;
let guests;
let shared_grid;
let shared_time;
let shared_state;
let shared_farmer;
let shared_highScores;
let shared_hostData;

const grid_size = 20;
const images = {};
const sounds = {};

function preload() {
  partyConnect(
    "wss://deepstream-server-1.herokuapp.com",
    "mjgomsa_bah-bah-grass_v.0.0.1",
    "main"
  );
  shared_grid = partyLoadShared("shared_grid", { grid: [], eaten: 0 });

  me = partyLoadMyShared({ role: "observer", position: { x: 0, y: -20 } }); // -20 is sus

  guests = partyLoadGuestShareds();

  shared_time = partyLoadShared("shared_time", { gameTimer: 90 });

  shared_state = partyLoadShared("shared_state", {
    game_mode: 0,
    did_win: false,
    did_timeOut: false,
  });

  shared_farmer = partyLoadShared("shared_farmer", {
    farmerTimer: 10,
    madeIt: false,
  });

  shared_highScores = partyLoadShared("shared_highScores", { scores: [] });

  shared_hostData = partyLoadShared("shared_hostData", { seed_positions: [] });

  preloadImages();
  preloadSounds();
}

function setup() {
  //canvas settings
  createCanvas(600, 600);
  textFont("Pixeloid Sans");

  //sound setups
  sounds.nom.setVolume(0.1);
  sounds.click.setVolume(10);
  sounds.banjo.setVolume(0.5);
  sounds.sheep_noise.setVolume(0.5);

  if (partyIsHost()) {
    resetGrid();
    var seed_positions = createSeedArray();
    partySetShared(shared_hostData, { seed_array: seed_positions }); // figure out another way to do this
  }

  // create DOM image
  seed = createImg("/assets/seed_planted.png", "grass seed art");
  seed.size(25, 25);
  seed.hide();
}

function createSeedArray() {
  return Array.from({ length: 6 }, () => [
    floor(random(0, 20)),
    floor(random(0, 20)),
  ]);
}

function draw() {
  switch (shared_state.game_mode) {
    case 0:
      drawStart();
      break;
    case 1:
      drawInstructions();
      break;
    case 2:
      drawGameOn();
      break;
    case 3:
      drawGameOver();
      break;
  }
}

/**
 * DRAW SCREENS FUNCTIONS
 **/
function drawStart() {
  background("#99ccff");

  //upload images
  images.screens.cloud_background.play();
  image(images.screens.cloud_background, 0, 0);
  image(images.screens.grass_start, 0, 0);
  image(images.key_art.logo, 10, -60);
  image(images.key_art.farmer, 10, 170, 275, 400);

  //drawn features
  push();
  fill("#703e14");
  textSize(20);
  textAlign(CENTER, CENTER);
  const yOffset = max(sin((-frameCount * 40) / 600) * 5);
  text("Click 'start' to continue", 440, yOffset + 310);
  pop();

  //start button
  if (mouseIsPressed) {
    image(images.buttons.start_pressed, 310, 350);
  } else {
    image(images.buttons.start_unpressed, 310, 350);
  }
}

function drawInstructions() {
  background("#99ccff");

  //upload images
  image(images.screens.cloud_background, 0, 0);
  images.screens.cloud_background.play();
  image(images.screens.grass_instruct, 0, 0);
  image(images.key_art.logo, 210, 5, 160, 80);

  //drawn features
  push();
  fill("#703e14");
  textSize(35);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Instructions", 300, 126);
  pop();

  push();
  fill("#703e14");
  textSize(20);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text("Eat all grass squares with your teammate", 300, 175);
  text("before the time runs out.", 300, 215);
  text("Watch out for the farmer replanting grass!", 300, 260);
  text("Get to the seed before it grows back", 300, 305);
  pop();

  //start button
  if (mouseIsPressed) {
    image(images.buttons.start_pressed, 170, 350);
  } else {
    image(images.buttons.start_unpressed, 170, 350);
  }
}

function drawGameOn() {
  if (shared_grid.eaten === grid_size * grid_size) {
    // test gameOver
    shared_state.did_win = true;
    shared_state.game_mode = 3;
    console.log("Game over: all grass eaten, you win");
  }
  assignPlayers();
  gameTimer();
  replantAndCueTimers();

  // draw
  background("#faf7e1");
  image(images.key_art.fence, -10, 0, 620, 600);
  image(images.key_art.logo, 210, 5, 160, 80);
  translate(90, 100);
  drawGrid();
  drawSheep();
  drawUI();
}

function drawGameOver() {
  background("#99ccff");

  determineHighScore();

  //upload images
  image(images.screens.cloud_background, 0, 0);
  images.screens.cloud_background.play();
  image(images.screens.grass_start, 0, 0, 600, 600);
  image(images.key_art.logo, 210, 5, 160, 80);
  image(images.key_art.farmer, 10, 170, 275, 400);
  image(images.sheep.sheep2, 280, 360);

  //draw features
  push();
  textSize(35);
  fill("#703e14");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Your Score:", 431, 110);
  textSize(100);
  const yOffset = max(sin((-frameCount * 40) / 600) * 5); //hovering text animation
  text(shared_grid.eaten, 431, yOffset + 190);
  textSize(20);
  text("Highscore: " + shared_highScores.scores[0], 431, 245);
  pop();

  //restart button
  if (mouseIsPressed) {
    image(images.buttons.play_pressed, 300, 270);
  } else {
    image(images.buttons.play_unpressed, 300, 270);
  }
}

/**
 * MOUSE + KEY HANDLE FUNCTIONS
 **/
function mouseReleased() {
  if (shared_state.game_mode === 0) {
    sounds.click.play();
    changeState();
  } else if (shared_state.game_mode === 1) {
    sounds.click.play();
    changeState();
  } else if (shared_state.game_mode === 3) {
    sounds.click.play();
    changeState();
  }
}

function keyPressed() {
  if (shared_state.game_mode === 2) {
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
}

function changeState() {
  if (shared_state.game_mode == 0) {
    sounds.banjo.play();
    shared_state.game_mode = 1;
  } else if (shared_state.game_mode == 1) {
    sounds.banjo.stop();
    sounds.sheep_noise.play();
    shared_state.game_mode = 2;
  } else if (shared_state.game_mode == 3) {
    shared_state.game_mode = 0;
    setup();
    me.position = { x: 0, y: -20 };
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

/**
 * HELPER FUNCTIONS
 **/
function determineHighScore() {
  let scoreList = [...shared_highScores.scores];
  scoreList.push(shared_grid.eaten);
  scoreList = scoreList.sort((a, b) => b - a);
  shared_highScores.scores = scoreList;
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

/**
 * DRAW ELEMENTS FUNCTIONS
 **/
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
      alternateGrass(images.grass.grass_alternative2, 2, 3);
      alternateGrass(images.grass.grass_alternative3, 4, 5);
      alternateGrass(images.grass.grass_alternative, 4, 6);
      alternateGrass(images.grass.grass_alternative3, 8, 8);
      alternateGrass(images.grass.grass_alternative, 1, 2);
      alternateGrass(images.grass.grass_alternative2, 18, 18);
      alternateGrass(images.grass.grass_alternative3, 19, 14);
      alternateGrass(images.grass.grass_alternative2, 13, 15);
      alternateGrass(images.grass.grass_alternative2, 3, 18);
      alternateGrass(images.grass.grass_alternative, 2, 15);
      alternateGrass(images.grass.grass_alternative, 19, 3);
      alternateGrass(images.grass.grass_alternative3, 15, 4);
    }
  }
  pop();
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

function resetGrid() {
  const newGrid = [];
  for (let col = 0; col < grid_size; col++) {
    newGrid[col] = new Array(grid_size).fill(false);
  }
  shared_grid.grid = newGrid;
  shared_grid.eaten = 0;
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

function pointInRect(p, r) {
  return (
    p.x >= r.x && // format wrapped
    p.x <= r.x + r.w &&
    p.y >= r.y &&
    p.y <= r.y + r.h
  );
}

function alternateGrass(img, x, y) {
  if (shared_grid.grid[x][y] === false) {
    image(img, x * grid_size, y * grid_size, grid_size, grid_size);
  }
}

/**
 * TIMER FUNCTIONS
 **/
function gameTimer() {
  if (partyIsHost()) {
    if (frameCount % 60 === 0) {
      shared_time.gameTimer--;
    }

    if (shared_time.gameTimer === 0) {
      console.log("Game Over: timer ran out");
      shared_state.did_timeOut = true;
      shared_state.game_mode = 3;
      sounds.end_game.play();
    }
  }
}

function replantAndCueTimers() {
  // TO DO: write shorter and clearer
  const extra_x = (windowWidth - width) / 2 + 87;
  const extra_y = 100 + 50;

  if (shared_time.gameTimer <= 85 && shared_time.gameTimer > 75) {
    seed.position(
      shared_hostData.seed_array[0][0] * grid_size + extra_x,
      shared_hostData.seed_array[0][1] * grid_size + extra_y
    );
    replantGrass(
      shared_hostData.seed_array[0][0],
      shared_hostData.seed_array[0][1]
    );
  } else if (shared_time.gameTimer <= 70 && shared_time.gameTimer > 60) {
    seed.position(
      shared_hostData.seed_array[1][0] * grid_size + extra_x,
      shared_hostData.seed_array[1][1] * grid_size + extra_y
    );
    replantGrass(
      shared_hostData.seed_array[1][0],
      shared_hostData.seed_array[1][1]
    );
  } else if (shared_time.gameTimer <= 55 && shared_time.gameTimer > 45) {
    seed.position(
      shared_hostData.seed_array[2][0] * grid_size + extra_x,
      shared_hostData.seed_array[2][1] * grid_size + extra_y
    );
    replantGrass(
      shared_hostData.seed_array[2][0],
      shared_hostData.seed_array[2][1]
    );
  } else if (shared_time.gameTimer <= 40 && shared_time.gameTimer > 30) {
    seed.position(
      shared_hostData.seed_array[3][0] * grid_size + extra_x,
      shared_hostData.seed_array[3][1] * grid_size + extra_y
    );
    replantGrass(
      shared_hostData.seed_array[3][0],
      shared_hostData.seed_array[3][1]
    );
  } else if (shared_time.gameTimer <= 25 && shared_time.gameTimer > 15) {
    seed.position(
      shared_hostData.seed_array[4][0] * grid_size + extra_x,
      shared_hostData.seed_array[4][1] * grid_size + extra_y
    );
    replantGrass(
      shared_hostData.seed_array[4][0],
      shared_hostData.seed_array[4][1]
    );
  } else if (shared_time.gameTimer <= 10 && shared_time.gameTimer > 0) {
    seed.position(
      shared_hostData.seed_array[5][0] * grid_size + extra_x,
      shared_hostData.seed_array[5][1] * grid_size + extra_y
    );
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
  seed.show();
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

/**
 * PRELOAD FUNCTIONS
 **/
function preloadImages() {
  //player 1- sheep
  images.sheep = {};
  images.sheep.front = loadImage("/assets/sheep.png");
  images.sheep.sheep2 = loadImage("/assets/sheep-2.png");
  images.sheep.left = loadImage("/assets/sheep_left.png");
  images.sheep.right = loadImage("/assets/sheep_right.png");
  images.sheep.behind = loadImage("/assets/sheep_behind.png");

  //player 2- ram
  images.ram = {};
  images.ram.front = loadImage("/assets/ram.png");
  images.ram.left = loadImage("/assets/ram_left.png");
  images.ram.right = loadImage("/assets/ram_right.png");
  images.ram.behind = loadImage("/assets/ram_behind.png");

  //grass
  images.grass = {};
  images.grass.main = loadImage("/assets/grass.png");
  images.grass.grass_alternative = loadImage("/assets/grass_alternative.png");
  images.grass.grass_alternative2 = loadImage("/assets/grass_alternative2.png");
  images.grass.grass_alternative3 = loadImage("/assets/grass_alternative3.png");

  //grass for backgrounds
  images.screens = {};
  images.screens.grass_start = loadImage("/assets/grass_starter.png");
  images.screens.grass_instruct = loadImage("/assets/grass_instruction.png");
  images.screens.cloud_background = loadImage("/assets/background.gif");

  //buttons
  images.buttons = {};
  images.buttons.start_pressed = loadImage("/assets/start-pressed.png");
  images.buttons.start_unpressed = loadImage("/assets/start-btn_unpressed.png");
  images.buttons.play_pressed = loadImage("/assets/play-pressed.png");
  images.buttons.play_unpressed = loadImage("/assets/play-btn_unpressed.png");

  // other images
  images.key_art = {};
  images.key_art.logo = loadImage("/assets/logo.png");
  images.key_art.fence = loadImage("/assets/fence.png");
  images.key_art.farmer = loadImage("/assets/farmer.png");
}

function preloadSounds() {
  sounds.click = loadSound("/assets/button.wav"); //for button clicks
  sounds.nom = loadSound("/assets/nom_noise.wav"); //for sheep eating
  sounds.end_game = loadSound("/assets/end-game.wav"); //end game sound
  sounds.banjo = loadSound("/assets/banjo.wav"); //start game sound
  sounds.sheep_noise = loadSound("/assets/sheep.wav"); //drawGameOn sheep noises
}
