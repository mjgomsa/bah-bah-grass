let shared;
let gridSize = 20;
var won = false;
const strt = Date.now();
var timer_max = 92; // to account for 2ms
var outOfTime = false;

function preload() {
  partyConnect(
    "wss://deepstream-server-1.herokuapp.com",
    "mjgomsa_sheep_2",
    "main"
  );
  shared = partyLoadShared("shared", {
    grid: [],
    eaten: 0,
    gameMode: 0,
    timer: 0,
  });
  sheep = loadImage("sheep.png");
  black_sheep = loadImage("black_sheep.png");
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();
  
}

function setup() {
  if (partyIsHost()) {
    resetGrid();
    shared.eaten = 0;
    // setInterval(timerFunc, 1000);
    shared.gameMode = 0;
  }
  
  me.sheep = { posX: gridSize * -1, posY: gridSize * 0 };
  guests.sheep = { posX: gridSize * -1, posY: gridSize * 0 };
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
  createCanvas(500, 500);
  background("beige");
  push();
  fill('black');
  textSize(35);
  text("Bah Bah Grass", 120, 200);
  pop();
  push();
  textSize(20);
  text("Click anywhere to continue", 120, 420);
  pop();
  

}

function instructScreen() {
  createCanvas(500, 500);
  background("beige");
  fill('black');
  push();
  textSize(35);
  text("Instructions", 120, 100);
  pop();
  textSize(25);
  text("Eat all grass squares with", 120, 200);
  text("your teammates before", 120, 240);
  text("the time runs out.", 120, 280);
  push();
  pop();
  push();
  textSize(20);
  text("Click anywhere to continue", 120, 420);
  pop();
  
}

function mousePressed() {
  if (shared.gameMode == 0) {
    shared.gameMode = 1;
  } else if (shared.gameMode == 1){
    shared.gameMode = 2;
  }
}

function gameOn() {
  createCanvas(500, 500);
  background("beige");
  
  const secs = Math.floor((Date.now() - strt)/1000);
  shared.timer = timer_max - secs;
  console.log("time = "+secs);

  translate(width / 10, height / 11);
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
//   text(shared.timer, 360, 430);
countDown();

  //if winner(gridSize *2 or timer runs out):
  if (shared.eaten == gridSize*gridSize) {
    won = true;
    shared.gameMode = 3;
  }
}

function gameOver() {
  if (won == true) {
    createCanvas(500, 500);
    background("beige");
    fill('black');
    text("Congratulations! You WIN!", 200, 200);
  } 
  if (outOfTime == true) {
    createCanvas(500, 500);
    background("beige");
    fill('black');
    text("You're out of time... You LOSE!", 200, 200);
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

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    me.sheep.posY = me.sheep.posY + gridSize;
  }
  if (keyCode === UP_ARROW) {
    me.sheep.posY = me.sheep.posY - gridSize;
  }
  if (keyCode === LEFT_ARROW) {
    me.sheep.posX = me.sheep.posX - gridSize;
  }
  if (keyCode === RIGHT_ARROW) {
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

function countDown() {
  if (shared.timer / 60 >= 1) {
    timerValue_new = shared.timer - 60;
    if (timerValue_new < 10) {
      text("1:0" + timerValue_new, 360, 430);
    } else {
      text("1:" + timerValue_new, 360, 430);
    }
  } else {
    if (shared.timer >= 60) {
      text("1:" + shared.timer, 360, 430);
    }
    if (shared.timer >= 10) {
      text("0:" + shared.timer, 360, 430);
    }
    if (shared.timer < 10) {
      text("0:0" + shared.timer, 360, 430);
    }
    if (shared.timer == 0) {
      console.log("game over");
      outOfTime = true;
      shared.gameMode = 3;
    }
  }
}
