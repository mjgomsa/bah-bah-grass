/**
 * main.js
 *
 * This is the entry point for the game.
 *
 * Purpose: loads the other modules, sets things up, and coordinates the main
 * game scenes.
 *
 * Exports: a function changeScene() that scenes can use to switch
 * to other scenes.
 *
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

// Globals
export const images = {};
export const sounds = {};

//Object.assign method copies all properties from one source to a target object
// Object.assign(target, source)
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

  // for each scene call preload fn if exists, ignore otherwise
  Object.values(scenes).forEach((scene) => scene.preload?.());

  preloadImages();
  preloadSounds();
}

function setup() {
  createCanvas(600, 600);
  textFont("Pixeloid Sans");

  //sounds set ups
  sounds.nom.setVolume(0.1);
  sounds.click.setVolume(10);
  sounds.banjo.setVolume(0.5);
  sounds.sheep_noise.setVolume(0.5);

  // note: object.values() returns an array of a given objects own property values
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
  images.sheep.sheep2 = loadImage("./assets/sheep-2.png");
  images.sheep.front = loadImage("./assets/sheep.png");
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
  images.grass.alts = [];
  images.grass.alts[0] = loadImage("./assets/grass_alternative.png");
  images.grass.alts[1] = loadImage("./assets/grass_alternative2.png");
  images.grass.alts[2] = loadImage("./assets/grass_alternative3.png");

  //grass for backgrounds
  images.screens = {};
  images.screens.grass_start = loadImage("./assets/grass_starter.png");
  images.screens.grass_instruct = loadImage("./assets/grass_instruction.png");
  images.screens.cloud_background = loadImage("./assets/background.gif");

  //buttons
  images.buttons = {};
  images.buttons.start_pressed = loadImage("./assets/start-pressed.png");
  images.buttons.start_unpressed = loadImage(
    "./assets/start-btn_unpressed.png"
  );
  images.buttons.play_pressed = loadImage("./assets/play-pressed.png");
  images.buttons.play_unpressed = loadImage("./assets/play-btn_unpressed.png");

  // key art
  images.key_art = {};
  images.key_art.logo = loadImage("./assets/logo.png");
  images.key_art.fence = loadImage("./assets/fence.png");
  images.key_art.farmer = loadImage("./assets/farmer.png");

  // seed
  images.seed = loadImage("./assets/seed_planted.png");
}

function preloadSounds() {
  sounds.click = loadSound("./assets/button.wav"); //for button clicks
  sounds.nom = loadSound("./assets/nom_noise.wav"); //for sheep eating
  sounds.end_game = loadSound("./assets/end-game.wav"); //end game sound
  sounds.banjo = loadSound("./assets/banjo.wav"); //start game sound
  sounds.sheep_noise = loadSound("./assets/sheep.wav"); //drawGameOn sheep noises
}
