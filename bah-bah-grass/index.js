let shared;
let gridSize = 20;
var won = false;
var outOfTime = false;

function preload() {
  partyConnect(
    "wss://deepstream-server-1.herokuapp.com",
    "mjgomsa_bye-bye-grass",
    "main"
  );
  shared = partyLoadShared("shared", {
    grid: [],
    eaten: 0,
    gameMode: 0,
    game_timer: 90,
  });

    sheep = loadImage("./assets/sheep.png");
    black_sheep = loadImage("./assets/black_sheep.png");
    grass = loadImage("./assets/grass.png");
    farmer = loadImage("./assets/farmer.png");
    logo = loadImage("./assets/bahbahgrass_logo.png");
    grass_start = loadImage("./assets/grass_starter.png");
    grass_instruct = loadImage("./assets/grass_instruction.png")


  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();
  
}

function setup() {
    partyToggleInfo(true);
    textFont('Pixeloid Sans');

  if (partyIsHost()) {
    resetGrid();
    shared.eaten = 0;
    shared.game_timer = 90;
    setInterval(timerFunc, 1000);
    shared.gameMode = 0;
  }
  
  
  me.sheep = { posX: gridSize * -1, posY: gridSize * 0 };
  guests.sheep = { posX: gridSize * -1, posY: gridSize * 0 };
//   partyWatchShared(shared, "timer", onChange);
}

function draw() {
  switch (shared.gameMode) {
    case 0:
      startingScreen();
      break;
    case 1:
      instructScreen();
      break;
    case 2:
      gameOn();
      break;
    case 3:
      gameOver();
      break;
  }
}


function startingScreen() {
    createCanvas(600, 600);
    background("#99ccff");
    fill('#703e14');
    push();
    textSize(35);
    pop();
    push();
    image(logo, 43, 100, 520, 260);
    image(grass_start, 0, 0, 600,600);
    textSize(20);
    textAlign(CENTER, CENTER);
    testing = text("Click anywhere to continue", 300, 350);
    pop();
  }

  function instructScreen() {
    createCanvas(600, 600);
    background("#99ccff");
    fill('#703e14');
    image(logo, 220, 19, 160, 80);
    image(grass_instruct, 0, 0, 600,600);
    push();
    textSize(35);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("Instructions", 300, 150);
    pop();
    textSize(25);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    text("Eat all grass squares with", 300, 200);
    text("your teammates before", 300, 240);
    text("the time runs out.", 300, 280);
    push();
    pop();
    push();
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Click anywhere to continue", 300, 340);
    pop();
  
  }


function gameOn() {
  createCanvas(600, 600);
  background("beige");
  translate(width / 7, height / 11);
  gridDraw();

  push();
  for (const p of guests) {
    image(
      black_sheep,
      p.sheep.posX - 8,
      p.sheep.posY - 10,
      gridSize + 15,
      gridSize + 15
    );
  }
  pop();
  image(
    sheep,
    me.sheep.posX - 8,
    me.sheep.posY - 10,
    gridSize + 15,
    gridSize + 15
  );
  fill("black");
  textSize(20);
  text("Grass eaten: " + shared.eaten, 0, 430);
  countDown();

  //if winner(gridSize *2 or timer runs out):
  if (shared.eaten == gridSize*gridSize) {
    won = true;
    shared.gameMode = 3;
  }
}

function gameOver() {
    textFont('Pixeloid Sans');
    textAlign(CENTER, CENTER);
    if (won == true) {
      createCanvas(600, 600);
      background("#99ccff");
      fill('#703e14');
      image(logo, 220, 19, 160, 80);
      textSize(20);
      text("Congratulations!", 300, 200);
      textSize(30);
      text("You WIN!", 300, 240);
    } 
    if (outOfTime == true) {
      createCanvas(600, 600);
      background("#99ccff");
      fill('#703e14');
      image(grass_start, 0, 0, 600,600);
      image(logo, 220, 19, 160, 80);
      textSize(20);
      text("You're out of time...", 300, 200);
      textSize(30);
      text("You LOSE!", 300, 240);
    }
  }

function gridDraw() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * gridSize;
      const y = row * gridSize;
      if (shared.grid[col][row] === false) {
        fill("green");
        stroke("black");
        rect(x + 1, y + 1, gridSize, gridSize);
      } else {
        fill("beige");
        rect(x + 1, y + 1, gridSize, gridSize);
      }
    }
  }
}
function mousePressed() {
    if (shared.gameMode == 0) {
      shared.gameMode = 1;
    } else if (shared.gameMode == 1){
      shared.gameMode = 2;
    }
  }

function keyPressed() {
  if ((keyCode === DOWN_ARROW)||(keyCode === 83)) {
    me.sheep.posY = me.sheep.posY + gridSize;
  }
  if ((keyCode === UP_ARROW) || (keyCode === 87)) {
    me.sheep.posY = me.sheep.posY - gridSize;
  }
  if ((keyCode === LEFT_ARROW)||(keyCode === 65)) {
    me.sheep.posX = me.sheep.posX - gridSize;
  }
  if ((keyCode === RIGHT_ARROW) || (keyCode === 68)) {
    me.sheep.posX = me.sheep.posX + gridSize;
  }

  let col = me.sheep.posX / gridSize;
  let row = me.sheep.posY / gridSize;
  if (shared.grid[col][row] === false) {
    shared.grid[col][row] = true;
    shared.eaten = shared.eaten + 1;
  } else {
    shared.grid[col][row] = false;
    shared.eaten = shared.eaten - 1;
  }
}

function resetGrid() {
  const newGrid = [];
  for (let col = 0; col < gridSize; col++) {
    newGrid[col] = new Array(gridSize).fill(false);
  }
  shared.grid = newGrid;
}

function timerFunc() {
  if (shared.game_timer > 0) {
    shared.game_timer--;
  }
}

function countDown() {
  if (shared.game_timer / 60 >= 1) {
    timerValue_new = shared.game_timer - 60;
    if (timerValue_new < 10) {
      text("1:0" + timerValue_new, 360, 430);
    } else {
      text("1:" + timerValue_new, 360, 430);
    }
  } else {
    if (shared.game_timer >= 60) {
      text("1:" + shared.game_timer, 360, 430);
    }
    if (shared.game_timer >= 10) {
      text("0:" + shared.game_timer, 360, 430);
    }
    if (shared.game_timer < 10) {
      text("0:0" + shared.game_timer, 360, 430);
    }
    if (shared.game_timer == 0) {
      console.log("game over");
      outOfTime = true;
      shared.gameMode = 3;
    }
  }
}
