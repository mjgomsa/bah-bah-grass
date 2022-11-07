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
 * gridSize: determines the size of the grid
 * seed_pos: array that holds the x,y positions of the randomly assigned seeds on the game
 * images: an object that contains all of the game's images
 * sounds: an object that contains all of the game's sounds
 **/

let me;
let guests;
let shared_grid;
let shared_time;
let shared_state;
let shared_farmer;
let highScores;

const gridSize = 20;
let seed_pos = [];
const images = {};
const sounds = {};


function preload() {
    partyConnect(
        "wss://deepstream-server-1.herokuapp.com",
        "mjgomsa_bah-bah-grass_delta",
        "main"
    );
    shared_grid = partyLoadShared("shared_grid", {grid: [], eaten: 0});

    me = partyLoadMyShared({role: "observer", grid:[],});

    guests = partyLoadGuestShareds();

    shared_time = partyLoadShared("shared_time");

    shared_state = partyLoadShared("shared_state", {gameMode: 0, won: false, outOfTime: false});

    shared_farmer = partyLoadShared("shared_farmer", {farmerTimer : 10, madeIt: false});

    highScores = partyLoadShared("highScores", { scores: []});

    loadImgSounds();  
}

function setup() {
    //sound setups
    sounds.nom.setVolume(0.1);
    sounds.click.setVolume(10);
    sounds.banjo.setVolume(0.5);
    sounds.sheep_noise.setVolume(0.5);

    // partyToggleInfo(true);
    textFont('Pixeloid Sans');

    if (partyIsHost()) {
        resetGrid();
        partySetShared(shared_time, { gameTimer: 90 });
        createSeedArray();
        partySetShared(shared_farmer,  {seed_array: seed_pos}); //random
    }

    me.sheep = { posX: 0, posY: -20 }; // initial sheep/ram positions

    seed = createImg("./assets/seed_planted.png", "grass seed art");
}

function createSeedArray() {
    seed_pos = [
        [floor(random(0,19)), floor(random(0,19))],
        [floor(random(0,19)), floor(random(0,19))],
        [floor(random(0,19)), floor(random(0,19))],
        [floor(random(0,19)), floor(random(0,19))],
        [floor(random(0,19)), floor(random(0,19))],
        [floor(random(0,19)), floor(random(0,19))]
    ];
}

function draw() {
    seed.hide();
    switch (shared_state.gameMode) {
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
    seed.hide();

    push();
    textSize(35);
    image(images.screens.gif, 0, 0);
    images.screens.gif.play();
    image(images.screens.grass_start, 0, 0);
    image(images.key_art.logo, 10, -60);
    image(images.key_art.farmer, 10, 170, 275, 400);

    textSize(20);
    textAlign(CENTER, CENTER);
    const yPosMoving = max(sin((-frameCount * 40) / 600) * 5); //hovering text animation
    text("Click 'start' to continue", 440, yPosMoving+310);
    pop();

    //start button
    push();
    if (mouseIsPressed) {
      image(images.buttons.start_pressed, 310, 350);   
    }
    else {
      image(images.buttons.start_unpressed, 310, 350)
    }
    pop();
}
//for buttons to changeState()
function mouseReleased(){
    if (shared_state.gameMode == 0) {
        sounds.click.play(); 
        changeState();
    }
    else if(shared_state.gameMode == 1) {
        sounds.click.play(); 
        changeState();
    }
    else if(shared_state.gameMode === 3) {
        sounds.click.play(); 
        changeState();
    }

}

function instructScreen() {
    createCanvas(600, 600);
    background("#99ccff");
    fill('#703e14');
    seed.hide();

    image(images.screens.gif, 0, 0);
    images.screens.gif.play();
    image(images.screens.grass_instruct, 0, 0);
    image(images.key_art.logo, 210, 5, 160, 80);

    push();
    textSize(35);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("Instructions", 300, 126);
    pop();
    textSize(20);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    text("Eat all grass squares with your teammate", 300, 175);
    text("before the time runs out.", 300, 215);
    text("Watch out for the farmer replanting grass!", 300, 260);
    text("Get to the seed before it grows back", 300, 305);

     //start button
    push();
    if (mouseIsPressed) {
      image(images.buttons.start_pressed, 170, 350);  }
    else {
      image(images.buttons.start_unpressed, 170, 350);
    }
    pop();

}

function gameOn() {
    createCanvas(600, 600);
    background("#faf7e1");
    image(images.key_art.fence, -10, 0, 620, 600);
    image(images.key_art.logo, 210, 5, 160, 80);

    translate(90,100);
    assignPlayers();

    drawGrid();
    drawSheep();
    gameTimer();
    drawUI();
    replantAndCueTimers();
   

    // gameOver trigger
    if (shared_grid.eaten == gridSize * gridSize) {
        shared_state.won = true;
        shared_state.gameMode = 3;
        console.log("Game over: all grass eaten, you win");
    }
}

function gameOver() {
    seed.hide();
    createCanvas(600, 600);
    textFont('Pixeloid Sans');
    textSize(35);
    textAlign(CENTER, CENTER);
    background("#99ccff");
    fill('#703e14');

    image(images.screens.gif, 0, 0);
    images.screens.gif.play();
    image(images.screens.grass_start, 0, 0, 600, 600);
    image(images.key_art.logo, 210, 5, 160, 80);
    image(images.key_art.farmer, 10, 170, 275, 400);
    image(images.sheep.sheep2, 280, 360);

    determineHighScore();
    push();
    textStyle(BOLD);
    text("Your Score:", 431, 110);
    textSize(100);
    const yPosMoving = max(sin((-frameCount * 40) / 600) * 5); //hovering text animation
    text(shared_grid.eaten, 431, yPosMoving+190);
    pop();
    textSize(20);
    text("Highscore: "+highScores.scores[0], 431,245);

    //restart button
    push();
    if (mouseIsPressed) {
      image(images.buttons.play_pressed, 300, 270);  }
    else {
      image(images.buttons.play_unpressed, 300, 270);
    }
    pop();
}

function determineHighScore(){
    let scoreList = [...highScores.scores];
    scoreList.push(shared_grid.eaten);
    scoreList = scoreList.sort((a, b) => b - a);
    highScores.scores = scoreList;  
}

function assignPlayers() {
    if (!guests.find((p) => p.role === "sheep")) { // if there isn't a sheep
        const o = guests.find((p) => p.role === "observer"); // find the first observer
        if (o === me) o.role = "sheep"; // if thats me, take the role
    }
    if (!guests.find((p) => p.role === "ram")) { // if there isn't a ram
        const o = guests.find((p) => p.role === "observer"); // find the first observer
        if (o === me) o.role = "ram"; // if thats me, take the role
    }
}

function drawGrid() {
    push();
    translate(0,0);
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const x = col * gridSize;
            const y = row * gridSize;
            stroke('#94541E');

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

            if (shared_grid.grid[col][row] === false) {
                fill('#0F3325'); //green
                rect(x, y , gridSize, gridSize);
                image(images.grass.main, x, y, gridSize, gridSize);
                
            } else {
                fill('#94541E');
                rect(x , y , gridSize, gridSize);
            }
            
        }
    }
    pop();
}

function alternateGrass(img, x, y) {
    if (shared_grid.grid[x][y] === false) {
        image(img, x*gridSize, y*gridSize, gridSize, gridSize);
    }
}

function drawSheep() {
    push();
    translate(-8, -10);
    //draw sheep for player 1
    const p1 = guests.find((p) => p.role === "sheep");
    if (p1) {
        push();
        translate(p1.sheep.posX, p1.sheep.posY);
        rotateSheep(p1, images.sheep);
        imageMode(CENTER);
        pop();
    }
    //draw sheep for player 2
    const p2 = guests.find((p) => p.role === "ram");
    if (p2) {
        push();
        translate(p2.sheep.posX, p2.sheep.posY);
        rotateSheep(p2, images.ram);
        imageMode(CENTER);
        pop();
    }
    pop();
}

function rotateSheep(test, sheepOrRam) {
    if (test.direction === "down") {
        image(sheepOrRam.front, 0, 0, gridSize + 15, gridSize + 15);
    }
    if (test.direction === "left") {
        image(sheepOrRam.left, 0, 0, gridSize + 15, gridSize + 15);
    };
    if (test.direction === "right") {
        image(sheepOrRam.right, 0, 0, gridSize + 15, gridSize + 15);
    };
    if (test.direction === "up") {
        image(sheepOrRam.behind, 0, 0, gridSize + 15, gridSize + 15);
    };
  }

function gameTimer() {
    if (partyIsHost()) {
        if (frameCount % 60 === 0) {
            shared_time.gameTimer--;
        }
    
        if (shared_time.gameTimer === 0) {
            console.log("Game Over: timer ran out")
            shared_state.outOfTime = true;
            shared_state.gameMode = 3;
            sounds.end_game.play();
        }
    }
   
}

function replantAndCueTimers() {
    const extra_x = (windowWidth-width)/2 + 87; // reshaping a bit
    const extra_y = 100+50;

    if ((shared_time.gameTimer <= 85 && shared_time.gameTimer > 75)) {
        seed.position(((shared_farmer.seed_array[0][0])*gridSize)+extra_x,((shared_farmer.seed_array[0][1])*gridSize)+extra_y);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[0][0], shared_farmer.seed_array[0][1]);
    } else if ((shared_time.gameTimer <= 70 && shared_time.gameTimer > 60)) {
        seed.position(((shared_farmer.seed_array[1][0])*gridSize)+extra_x,((shared_farmer.seed_array[1][1])*gridSize)+extra_y);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[1][0], shared_farmer.seed_array[1][1]);

    }  else if ((shared_time.gameTimer <= 55 && shared_time.gameTimer > 45)) {
        seed.position(((shared_farmer.seed_array[2][0])*gridSize)+extra_x,((shared_farmer.seed_array[2][1])*gridSize)+extra_y);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[2][0], shared_farmer.seed_array[2][1]);

    } else if ((shared_time.gameTimer <= 40 && shared_time.gameTimer > 30)) {
        seed.position(((shared_farmer.seed_array[3][0])*gridSize)+extra_x,((shared_farmer.seed_array[3][1])*gridSize)+extra_y);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[3][0], shared_farmer.seed_array[3][1]);

    } else if ((shared_time.gameTimer <= 25 && shared_time.gameTimer > 15)) {
        seed.position(((shared_farmer.seed_array[4][0])*gridSize)+extra_x,((shared_farmer.seed_array[4][1])*gridSize)+extra_y);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[4][0], shared_farmer.seed_array[4][1]);

    } else if ((shared_time.gameTimer <= 10 && shared_time.gameTimer > 0)) {
        seed.position(((shared_farmer.seed_array[5][0])*gridSize)+extra_x,((shared_farmer.seed_array[5][1])*gridSize)+extra_y);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[5][0], shared_farmer.seed_array[5][1]);

    } else {
        shared_farmer.farmerTimer = 10;
        shared_farmer.madeIt = false;
    } 
}

function replantingGrass(seed_posX, seed_posY) {
    const x = (seed_posX) * gridSize;
    const y = (seed_posY) * gridSize;
  
    const p1 = guests.find((p) => p.role === "sheep");
    const p2 = guests.find((p) => p.role === "ram");

    
    image(images.key_art.farmer, 435, 0, 35, 50);
    seed.show();
    if(partyIsHost()) {
        if (frameCount % 60 === 0) {
            shared_farmer.farmerTimer--;
        }
    }
    if ((p1 === me) || (p2 === me)) { // if either player made it to the seed
        if ((me.sheep.posX === x && me.sheep.posY === y)) {
            shared_farmer.madeIt = true;
        }
    }
    if (shared_farmer.farmerTimer === 0) { //this works!
        if (shared_farmer.madeIt === false) {
            console.log("Didn't get seed in time")
            for (i = 0; i < gridSize; i++) {
                shared_grid.grid[i][seed_posY] = false;
            }
            seed.hide();
        }
    } 
    if (shared_farmer.madeIt === true) {
        console.log("You got to seed in time!")
        seed.hide();
        shared_grid.grid[seed_posX][seed_posY] = true;
    }
    push();
    textFont('Pixeloid Sans');
    fill("#492905");
    textSize(20);
    text(shared_farmer.farmerTimer, 460,70);
    pop();
} 
    

function drawUI() {
    push();
    translate(0,40);
    textAlign(CENTER, CENTER);
    fill("#492905");
    textSize(20);
    textStyle(BOLD);
    text(me.role,285,420);
    textAlign(LEFT);
    text("Grass eaten: " + shared_grid.eaten, -30, 420);
    textAlign(CENTER, CENTER);
    text(shared_time.gameTimer, 430, 420);
    pop();
}

function keyPressed() {
    if (shared_state.gameMode === 2) {
        const p1 = guests.find((p) => p.role === "sheep");
        const p2 = guests.find((p) => p.role === "ram");

        if ((p1 === me) || (p2 === me)) {
            sounds.nom.play();
            if ((keyCode === DOWN_ARROW) || (keyCode === 83)) {
                me.direction = "down";
                tryMove(0, gridSize);
            }
            if ((keyCode === UP_ARROW) || (keyCode === 87)) {
                me.direction = "up";
                tryMove(0, -gridSize);
            }
            if ((keyCode === LEFT_ARROW) || (keyCode === 65)) {
                me.direction = "left";
                tryMove(-gridSize, 0);
            }
            if ((keyCode === RIGHT_ARROW) || (keyCode === 68)) {
                me.direction = "right";
                tryMove(gridSize, 0);
            }
        
            let col = me.sheep.posX / gridSize;
            let row = me.sheep.posY / gridSize;
            
            if (shared_grid.grid[col][row] === false) { //planted            
                shared_grid.grid[col][row] = true;
                shared_grid.eaten = shared_grid.eaten + 1;
            } 
        }
    }
}

function tryMove(x, y) {
    const targetLocation = { x: me.sheep.posX + x, y: me.sheep.posY + y };
    const bounds = { x: 0, y: 0, w: gridSize*19, h: gridSize*19};
    if (!pointInRect(targetLocation, bounds)) {
      return;
    }
  
    me.sheep.posX += x;
    me.sheep.posY += y;
}

function pointInRect(p, r) {
    return (
      p.x >= r.x && // format wrapped
      p.x <= r.x + r.w &&
      p.y >= r.y &&
      p.y <= r.y + r.h
    );
  }

function changeState() {
    if (shared_state.gameMode == 0) {
        sounds.banjo.play(); 
        shared_state.gameMode = 1;
    } else if (shared_state.gameMode == 1) {
        sounds.banjo.stop();
        sounds.sheep_noise.play();
        shared_state.gameMode = 2;
    }
    else if (shared_state.gameMode == 3) {
        shared_state.gameMode = 0;
        setup();
        me.sheep = { posX: 0, posY: -20 };
    }
}

function resetGrid() {
    const newGrid = [];
    for (let col = 0; col < gridSize; col++) {
        newGrid[col] = new Array(gridSize).fill(false);
    }
    shared_grid.grid = newGrid;
    shared_grid.eaten = 0;
}
// Cleanup Functions
function loadImgSounds() { // loads images and sounds
    //player 1- sheep
    images.sheep = {};
    images.sheep.front = loadImage("./assets/sheep.png");
    images.sheep.sheep2 = loadImage("./assets/sheep-2.png");
    images.sheep.left = loadImage("./assets/sheep_left.png");
    images.sheep.right = loadImage("./assets/sheep_right.png");
    images.sheep.behind = loadImage("./assets/sheep_behind.png");

    //player 2- ram
    images.ram = {};
    images.ram.front = loadImage("./assets/ram.png");
    images.ram.left = loadImage("./assets/ram_left.png");
    images.ram.right = loadImage("./assets/ram_right.png");
    images.ram.behind = loadImage("./assets/ram_behind.png");

    //grass
    images.grass = {};
    images.grass.main = loadImage("./assets/grass.png");
    images.grass.grass_alternative = loadImage("./assets/grass_alternative.png");
    images.grass.grass_alternative2 = loadImage("./assets/grass_alternative2.png");
    images.grass.grass_alternative3 = loadImage("./assets/grass_alternative3.png");

    //grass for backgrounds
    images.screens = {};
    images.screens.grass_start = loadImage("./assets/grass_starter.png");
    images.screens.grass_instruct = loadImage("./assets/grass_instruction.png")
    images.screens.gif = loadImage('./assets/background.gif');
    
    //buttons
    images.buttons = {};
    images.buttons.start_pressed = loadImage("./assets/start-pressed.png");
    images.buttons.start_unpressed = loadImage("./assets/start-btn_unpressed.png");
    images.buttons.play_pressed = loadImage("./assets/play-pressed.png");
    images.buttons.play_unpressed = loadImage("./assets/play-btn_unpressed.png");

    // other assets
    images.key_art = {};
    images.key_art.logo = loadImage("./assets/logo.png");
    images.key_art.fence = loadImage("./assets/fence.png");
    images.key_art.farmer = loadImage("./assets/farmer.png");
    // images.key_art.plank = loadImage("./assets/plank.png");

    //sounds
    sounds.click = loadSound("./assets/button.wav") //for button clicks
    sounds.nom = loadSound("./assets/nom_noise.wav"); //for sheep eating
    sounds.end_game = loadSound("./assets/end-game.wav"); //end game sound
    sounds.banjo = loadSound("./assets/banjo.wav"); //start game sound
    sounds.sheep_noise = loadSound("./assets/sheep.wav"); //gameOn sheep noises

    yPosMoving = 300 // initializing hovering text Animation
}