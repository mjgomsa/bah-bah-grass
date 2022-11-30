/**
 * main.js
 *
 * This is the entry point for the game. This file loads the other modules, sets things up, and coordinates the main game states.
 *
 * METHODS:
 *** preload: called when the game is preloaded
 *** setup: called when the game is set up
 *** update: called every frame, game logic, no drawing
 *** draw: called every frame, should draw the scene, no game logic
 *** mouseReleased: called when mouse is released
 *** keyPressed: called when key is pressed
 *** enter: called when scene is entered
 *** leave: called when scene is left.
 *** preloadImages: called within preload
 *** preloadSounds: called within preload
 */

import * as titleScene from "./titleScene.js";
import * as instructScene from "./instructScene.js";
import * as playScene from "./playScene.js";
import * as overScene from "./overScene.js";

// the scene being displayed
let currentScene;

// all the available scenes
export const scenes = {
  title: titleScene,
  instruct: instructScene,
  play: playScene,
  over: overScene,
};

export const images = {};
export const sounds = {};

// assign p5 callback functions to the global (window) scope
// so p5 can access them
Object.assign(window, {
  preload,
  draw,
  setup,
  mouseReleased,
  keyPressed,
});

function preload() {
  partyConnect(
    "wss://deepstream-server-1.herokuapp.com",
    "mjgomsa_bah-bah-grass_v.0.0.2",
    "main"
  );

  // preload all scenes
  Object.values(scenes).forEach((scene) => scene.preload?.());

  preloadImages();
  preloadSounds();
}

function setup() {
  createCanvas(600, 600);
  textFont("Pixeloid Sans");

  // setup all scenes
  Object.values(scenes).forEach((scene) => scene.setup?.());

  changeScene(scenes.title);
}

function draw() {
  // update
  currentScene?.update?.();

  // draw
  currentScene?.draw?.();
}

function mouseReleased() {
  currentScene?.mouseReleased?.();
}

function keyPressed() {
  currentScene?.keyPressed?.();
}

export function changeScene(newScene) {
  if (!newScene) {
    console.error("newScene not provided");
    return;
  }
  if (newScene === currentScene) {
    console.error("newScene is already currentScene");
    return;
  }
  currentScene?.leave?.();
  currentScene = newScene;
  currentScene.enter?.();
}

function preloadImages() {
  //player 1- sheep
  images.sheep = {};
  images.sheep.down = loadImage("./assets/images/sheep_down.png");
  images.sheep.left = loadImage("./assets/images/sheep_left.png");
  images.sheep.right = loadImage("./assets/images/sheep_right.png");
  images.sheep.up = loadImage("./assets/images/sheep_up.png");

  //player 2- ram
  images.ram = {};
  images.ram.down = loadImage("./assets/images/ram_down.png");
  images.ram.left = loadImage("./assets/images/ram_left.png");
  images.ram.right = loadImage("./assets/images/ram_right.png");
  images.ram.up = loadImage("./assets/images/ram_up.png");

  //grass
  images.grass = {};
  images.grass.main = loadImage("./assets/images/grass.png");
  images.grass.alts = [];
  images.grass.alts[0] = loadImage("./assets/images/grass_alternative_000.png");
  images.grass.alts[1] = loadImage("./assets/images/grass_alternative_001.png");
  images.grass.alts[2] = loadImage("./assets/images/grass_alternative_002.png");

  //screen-specific images
  images.screens = {};
  images.screens.grass_start = loadImage(
    "./assets/images/screens_starter_grass.png"
  );
  images.screens.grass_instruct = loadImage(
    "./assets/images/screens_instruct_grass.png"
  );
  images.screens.cloud_background = loadImage(
    "./assets/images/screens_bkgnd_clouds.gif"
  );

  //buttons
  images.buttons = {};
  images.buttons.start_down = loadImage("./assets/images/btn_start_down.png");
  images.buttons.start_up = loadImage("./assets/images/btn_start_up.png");
  images.buttons.play_down = loadImage("./assets/images/btn_play_down.png");
  images.buttons.play_up = loadImage("./assets/images/btn_play_up.png");

  // key art
  images.key_art = {};
  images.key_art.logo = loadImage("./assets/images/keyart_logo.png");
  images.key_art.fence = loadImage("./assets/images/keyart_fence.png");
  images.key_art.farmer = loadImage("./assets/images/keyart_farmer.png");
  images.key_art.sheep = loadImage("./assets/images/keyart_sheep.png");

  // seed
  images.seed = loadImage("./assets/images/seed.png");
}

function preloadSounds() {
  sounds.click = loadSound("./assets/sounds/click.wav");
  sounds.click.setVolume(10);

  sounds.sheep_eat = loadSound("./assets/sounds/sheep_eat.wav");
  sounds.sheep_eat.setVolume(0.1);

  sounds.banjo = loadSound("./assets/sounds/banjo.wav");
  sounds.banjo.setVolume(0.5);

  sounds.sheep_bleat = loadSound("./assets/sounds/sheep_bleat.wav");
  sounds.sheep_bleat.setVolume(0.5);

  sounds.end_game = loadSound("./assets/sounds/end_game.wav");
}
