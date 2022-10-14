let shared;
let me;
let guests;
let gridSize = 20;
var won = false;

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

    sheep = loadImage("./assets/sheep.png");
    black_sheep = loadImage("./assets/black_sheep.png");
    grass = loadImage("./assets/grass.png");
}


function setup() {
    partyToggleInfo(true);

    if (partyIsHost()) {
        resetGrid();
    }

    for (i=0; i<guests.length; i++) {
        me.sheep = { posX: i*20, posY: 0 };
    }
}

function draw() {
    gameOn();
    
}

function gameOn() {
    createCanvas(800, 800);
    assignPlayers();
    drawGrid();
    //draw sheep, player 1 and player 2
    const p1 = guests.find((p) => p.role === "player1");
    if (p1) {
        image(
            sheep,
            p1.sheep.posX - 8,
            p1.sheep.posY - 10,
            gridSize + 15,
            gridSize + 15
        );
    }

    const p2 = guests.find((p) => p.role === "player2");
    if (p2) {
        image(
            black_sheep,
            p2.sheep.posX - 8,
            p2.sheep.posY - 10,
            gridSize + 15,
            gridSize + 15
        );
    }
    drawUI();

    if (shared.eaten == gridSize * gridSize) {
        won = true;
        // shared_time.gameMode = 3;
        console.log("Game over: you win");
    }
}

function drawUI() {
    fill("black");
    textSize(15);

    text(me.role, 0,420);
    console.log(me.role);
    
    text("Grass eaten: " + shared.eaten, 0, 440);
}

function assignPlayers() {
    // if there isn't a player1
    if (!guests.find((p) => p.role === "player1")) {
        console.log("need player1");
        // find the first observer
        const o = guests.find((p) => p.role === "observer");
        console.log("found first observer", o, me, o === me);
        // if thats me, take the role
        if (o === me) o.role = "player1";
    }
    if (!guests.find((p) => p.role === "player2")) {
        const o = guests.find((p) => p.role === "observer");
        if (o === me) o.role = "player2";
    }
}

function drawGrid() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const x = col * gridSize;
            const y = row * gridSize;
            stroke('#94541E');
            if (shared.grid[col][row] === "planted") {
                fill('#0F3325');
                rect(x, y , gridSize, gridSize);
                image(
                    grass,
                    x,
                    y,
                    gridSize,
                    gridSize
                );
            } else if (shared.grid[col][row] === "replanted") {
                // fill('#FFD700');
                fill('yellow');
                rect(x , y , gridSize, gridSize);
            } else {
                fill('#94541E');
                rect(x , y , gridSize, gridSize);
            }
        }
    }
}

function keyPressed() {
    const p1 = guests.find((p) => p.role === "player1");
    const p2 = guests.find((p) => p.role === "player2");
    if ((p1 === me) || (p2 === me)) {
        if ((keyCode === DOWN_ARROW) || (keyCode === 83)) {
            me.sheep.posY = me.sheep.posY + gridSize;
        }
        if ((keyCode === UP_ARROW) || (keyCode === 87)) {
            me.sheep.posY = me.sheep.posY - gridSize;
        }
        if ((keyCode === LEFT_ARROW) || (keyCode === 65)) {
            me.sheep.posX = me.sheep.posX - gridSize;
        }
        if ((keyCode === RIGHT_ARROW) || (keyCode === 68)) {
            me.sheep.posX = me.sheep.posX + gridSize;
        }
    
        let col = me.sheep.posX / gridSize;
        let row = me.sheep.posY / gridSize;
        
        if (shared.grid[col][row] === "planted") { //planted
            shared.grid[col][row] = "unplanted";
            shared.eaten = shared.eaten + 1;
        } 
    }
}

function resetGrid() {
    const newGrid = [];
    for (let col = 0; col < gridSize; col++) {
        newGrid[col] = new Array(gridSize).fill("planted");
    }
    shared.grid = newGrid;
}