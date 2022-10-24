let shared;
let me;
let guests;
let shared_time;
let shared_state;
let shared_farmer;
let nom
let gridSize = 20;

let seed_pos = [];


function preload() {
    partyConnect(
        "wss://deepstream-server-1.herokuapp.com",
        "mjgomsa_bah-bah-grass_beta",
        "main"
    );
    shared = partyLoadShared("shared", {
        grid: [],
        eaten: 0,
    });

    me = partyLoadMyShared({role: "observer"});
    guests = partyLoadGuestShareds();

    shared_time = partyLoadShared("shared_time");

    shared_state = partyLoadShared("shared_state", {
        gameMode: 0,
        won: false,
        outOfTime: false
    });

    shared_farmer = partyLoadShared("shared_farmer", {
        farmerTimer : 10,
        madeIt: false
    });

    //player 1- sheep
    sheep = loadImage("./assets/sheep.png");
    sheep2 = loadImage("./assets/sheep-2.png");
    sheep_left = loadImage("./assets/sheep_left.png");
    sheep_right = loadImage("./assets/sheep_right.png");
    sheep_behind = loadImage("./assets/sheep_behind.png");

    //player 2- ram
    ram = loadImage("./assets/ram.png");
    ram_left = loadImage("./assets/ram_left.png");
    ram_right = loadImage("./assets/ram_right.png");
    ram_behind = loadImage("./assets/ram_behind.png");

    //grass
    grass = loadImage("./assets/grass.png");
    grass_alternative = loadImage("./assets/grass_alternative.png");
    grass_alternative2 = loadImage("./assets/grass_alternative2.png");
    grass_alternative3 = loadImage("./assets/grass_alternative3.png");

    //grass for backgrounds
    grass_start = loadImage("./assets/grass_starter.png");
    grass_instruct = loadImage("./assets/grass_instruction.png")
    gif = loadImage('./assets/background.gif');
    
    //buttons
    start_pressed = loadImage("./assets/start-pressed.png");
    start_unpressed = loadImage("./assets/start-btn_unpressed.png");
    play_pressed = loadImage("./assets/play-pressed.png");
    play_unpressed = loadImage("./assets/play-btn_unpressed.png");


    //logo
    logo = loadImage("./assets/logo.png");

    // other assets
    fence = loadImage("./assets/fence.png");
    farmer = loadImage("./assets/farmer.png");
    plank = loadImage("./assets/plank.png");

    //sounds
    click = loadSound("./assets/button.wav") //for button clicks
    nom = loadSound("./assets/nom_noise.wav"); //for sheep eating
    end_game = loadSound("./assets/end-game.wav"); //end game sound
    banjo = loadSound("./assets/banjo.wav"); //start game sound
    sheep_noise = loadSound("./assets/sheep.wav"); //gameOn sheep noises

    yPosMoving = 300 // initializing hovering text Animation
    
}

function setup() {
    //sound setups
    nom.setVolume(0.1);
    click.setVolume(10);
    banjo.setVolume(0.5);
    sheep_noise.setVolume(0.5);

    partyToggleInfo(true);
    textFont('Pixeloid Sans');

    if (partyIsHost()) {
        resetGrid();
        partySetShared(shared_time, { gameTimer: 90 });
        setSeedArray();
        partySetShared(shared_farmer,  {seed_array: seed_pos}); //random
    }
    me.sheep = { posX: 0, posY: -20 };
    seed = createImg("./assets/seed_planted.png", "grass seed art");
}

function setSeedArray() {
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
    image(gif, 0, 0);
    gif.play();
    image(grass_start, 0, 0);
    image(logo, 10, -60);
    image(farmer, 10, 170, 275, 400);

    textSize(20);
    textAlign(CENTER, CENTER);
    const yPosMoving = max(sin((-frameCount * 40) / 600) * 5); //hovering text animation
    text("Click 'start' to continue", 440, yPosMoving+310);
    pop();

    //start button
    push();
    if (mouseIsPressed) {
      image(start_pressed, 310, 350);   
    }
    else {
      image(start_unpressed, 310, 350)
    }
    pop();
}

//for buttons to changeState()
function mouseReleased(){
    if (shared_state.gameMode == 0) {
        click.play(); 
        changeState();
    }
    else if(shared_state.gameMode == 1) {
        click.play(); 
        changeState();
    }
    else if(shared_state.gameMode === 3) {
        click.play(); 
        changeState();
    }

}

function instructScreen() {
    createCanvas(600, 600);
    background("#99ccff");
    fill('#703e14');
    seed.hide();

    image(gif, 0, 0);
    gif.play();
    image(grass_instruct, 0, 0);
    image(logo, 210, 5, 160, 80);

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
      image(start_pressed, 170, 350);  }
    else {
      image(start_unpressed, 170, 350);
    }
    pop();

}

function gameOn() {
    createCanvas(600, 600);
    background("#faf7e1");
    image(fence, -10, 0, 620, 600);
    image(logo, 210, 5, 160, 80);

    translate(90,100);
    assignPlayers();
    drawGrid();
    drawSheep();
    gameTimer();
    drawUI();

    // Replanting grass based on the timers
    // make this prettier looking
    if ((shared_time.gameTimer <= 85 && shared_time.gameTimer > 75)) {
        seed.position(((shared_farmer.seed_array[0][0])*gridSize)+95,((shared_farmer.seed_array[0][1])*gridSize)+100);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[0][0], shared_farmer.seed_array[0][1]);

    } else if ((shared_time.gameTimer <= 70 && shared_time.gameTimer > 60)) {
        seed.position(((shared_farmer.seed_array[1][0])*gridSize)+95,((shared_farmer.seed_array[1][1])*gridSize)+100);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[1][0], shared_farmer.seed_array[1][1]);

    }  else if ((shared_time.gameTimer <= 55 && shared_time.gameTimer > 45)) {
        seed.position(((shared_farmer.seed_array[2][0])*gridSize)+95,((shared_farmer.seed_array[2][1])*gridSize)+100);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[2][0], shared_farmer.seed_array[2][1]);

    } else if ((shared_time.gameTimer <= 40 && shared_time.gameTimer > 30)) {
        seed.position(((shared_farmer.seed_array[3][0])*gridSize)+95,((shared_farmer.seed_array[3][1])*gridSize)+100);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[3][0], shared_farmer.seed_array[3][1]);

    } else if ((shared_time.gameTimer <= 25 && shared_time.gameTimer > 15)) {
        seed.position(((shared_farmer.seed_array[4][0])*gridSize)+95,((shared_farmer.seed_array[4][1])*gridSize)+100);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[4][0], shared_farmer.seed_array[4][1]);

    } else if ((shared_time.gameTimer <= 10 && shared_time.gameTimer > 0)) {
        seed.position(((shared_farmer.seed_array[5][0])*gridSize)+95,((shared_farmer.seed_array[5][1])*gridSize)+100);
        seed.size(25, 25);
        seed.hide();
        replantingGrass(shared_farmer.seed_array[5][0], shared_farmer.seed_array[5][1]);

    } else {
        shared_farmer.farmerTimer = 10;
        shared_farmer.madeIt = false;
    } 
   

    // gameOver trigger
    if (shared.eaten == gridSize * gridSize) {
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

    image(gif, 0, 0);
    gif.play();
    image(grass_start, 0, 0, 600, 600);
    image(logo, 210, 5, 160, 80);
    image(farmer, 10, 170, 275, 400);
    image(sheep2, 280, 360);

    push();
    textStyle(BOLD);
    text("Your Score:", 431, 120);
    textSize(100);
    const yPosMoving = max(sin((-frameCount * 40) / 600) * 5); //hovering text animation
    text(shared.eaten, 431, yPosMoving+200);
    pop();

    //restart button
    push();
    if (mouseIsPressed) {
      image(play_pressed, 300, 260);  }
    else {
      image(play_unpressed, 300, 260);
    }
    pop();
}

function assignPlayers() {
    // if there isn't a sheep
    if (!guests.find((p) => p.role === "sheep")) {
        // console.log("need sheep");
        // find the first observer
        const o = guests.find((p) => p.role === "observer");
        // console.log("found first observer", o, me, o === me);
        // if thats me, take the role
        if (o === me) o.role = "sheep";
    }
    if (!guests.find((p) => p.role === "ram")) {
        const o = guests.find((p) => p.role === "observer");
        if (o === me) o.role = "ram";
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
            if (shared.grid[col][row] === false) {
                fill('#0F3325'); //green
                rect(x, y , gridSize, gridSize);
                image(
                    grass,
                    x,
                    y,
                    gridSize,
                    gridSize
                );
                
            } else {
                fill('#94541E');
                rect(x , y , gridSize, gridSize);
            }
            
        }
    }
    pop();
}

function drawSheep() {
    push();
    translate(-8, -10);
    //draw sheep for player 1
    const p1 = guests.find((p) => p.role === "sheep");
    if (p1) {
        push();
        translate(p1.sheep.posX, p1.sheep.posY);
        rotateSheep_p1(p1);
        imageMode(CENTER);
        pop();
    }
    //draw sheep for player 2
    const p2 = guests.find((p) => p.role === "ram");
    if (p2) {
        push();
        translate(p2.sheep.posX, p2.sheep.posY);
        rotateSheep_p2(p2);
        imageMode(CENTER);
        pop();
    }
    pop();
}

function rotateSheep_p1(test) {
    if (test.direction === "down") {
        image(
            sheep,
            0,
            0,
            gridSize + 15,
            gridSize + 15
          );
    }
    if (test.direction === "left"){
        image(
            sheep_left,
            0,
            0,
            gridSize + 15,
            gridSize + 15
          );
    };
    if (test.direction === "right"){
        image(
            sheep_right,
            0,
            0,
            gridSize + 15,
            gridSize + 15
          );
    };
    if (test.direction === "up"){
        image(
            sheep_behind,
            0,
            0,
            gridSize + 15,
            gridSize + 15
          );
    };
  }

function rotateSheep_p2(test) {
    if (test.direction === "down") {
        image(
            ram,
            0,
            0,
            gridSize + 15,
            gridSize + 15
          );
    }
    if (test.direction === "left"){
        image(
            ram_left,
            0,
            0,
            gridSize + 15,
            gridSize + 15
          );
    };
    if (test.direction === "right"){
        image(
            ram_right,
            0,
            0,
            gridSize + 15,
            gridSize + 15
          );
    };
    if (test.direction === "up"){
        image(
            ram_behind,
            0,
            0,
            gridSize + 15,
            gridSize + 15
          );
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
            end_game.play();
        }
    }
   
}

function replantingGrass(seed_posX, seed_posY) {
    const x = (seed_posX) * gridSize;
    const y = (seed_posY) * gridSize;
  
    const p1 = guests.find((p) => p.role === "sheep");
    const p2 = guests.find((p) => p.role === "ram");

    image(farmer, 435, 0, 35, 50);
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
                shared.grid[i][seed_posY] = false;
            }
            seed.hide();
        }
    } 
    if (shared_farmer.madeIt === true) {
        console.log("You got to seed in time!")
        seed.hide();
        shared.grid[seed_posX][seed_posY] = true;
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
    text("Grass eaten: " + shared.eaten, 0, 420);
    textAlign(CENTER, CENTER);
    text(shared_time.gameTimer, 390, 420);
    pop();
}

function keyPressed() {
    const p1 = guests.find((p) => p.role === "sheep");
    const p2 = guests.find((p) => p.role === "ram");

    if ((p1 === me) || (p2 === me)) {
        nom.play();
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
        
        if (shared.grid[col][row] === false) { //planted            
            shared.grid[col][row] = true;
            shared.eaten = shared.eaten + 1;
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
        banjo.play(); 
        shared_state.gameMode = 1;
    } else if (shared_state.gameMode == 1) {
        banjo.stop();
        sheep_noise.play();
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
    shared.grid = newGrid;
    shared.eaten = 0;
}
