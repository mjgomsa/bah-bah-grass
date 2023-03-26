/**
 * main.js
 *
 * This is the entry point for the game. This file loads the other modules, sets things up, and coordinates the main game states.
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
    "mjgomsa_bah-bah-grass_v.0.0.3",
    "main"
  );

  // preload all scenes
  Object.values(scenes).forEach((scene) => scene.preload?.());

  preloadImages();
  preloadSounds();
}

function setup() {
  pixelDensity(1);
  const c = createCanvas(224, 224).canvas;
  c.style.width = `${224 * 3}px`;
  c.style.height = `${224 * 3}px`;
  c.style.imageRendering = "pixelated";

  textFont("Pixeloid Sans");

  // setup all scenes
  Object.values(scenes).forEach((scene) => scene.setup?.());

  changeScene(scenes.title);
}

function draw() {
  // ALWAYS update host
  playScene.hostUpdate();

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
  images.grass.alts[3] = loadImage("./assets/images/grass_alternative_003.png");

  //dirt
  images.dirt = loadImage("./assets/images/dirt.png");

  //screen-specific images
  images.screens = {};
  images.screens.title_combo = loadImage(
    "./assets/images/screens_title_combo.png"
  );
  images.screens.grass_instruct = loadImage(
    "./assets/images/screens_instruct.png"
  );
  images.screens.clouds = loadImage("./assets/images/screens_clouds.png");
  images.screens.sky = loadImage("./assets/images/screens_sky.png");
  images.screens.play_wait = loadImage(
    "./assets/images/screens_play_waiting.png"
  );
  images.screens.over = loadImage("./assets/images/screens_over.png");

  //buttons
  images.buttons = {};
  images.buttons.play_down = loadImage("./assets/images/btn_play_down.png");
  images.buttons.play_up = loadImage("./assets/images/btn_play_up.png");

  // key art
  images.key_art = {};
  images.key_art.border = loadImage("./assets/images/keyart_border.png");

  // seed
  images.seed_sprout = loadImage("./assets/images/sprout.png");

  images.numbers = [];
  for (let i = 0; i < 10; i++) {
    images.numbers[i] = loadImage(`./assets/images/number_${i}.png`);
  }
}

function preloadSounds() {
  sounds.click = loadSound("./assets/sounds/click.wav");
  sounds.click.setVolume(10);

  sounds.sheep_eat = loadSound("./assets/sounds/sheep_eat.wav");
  sounds.sheep_eat.setVolume(0.1);

  sounds.sheep_stomp = loadSound("./assets/sounds/sheep_stomp.wav");
  sounds.sheep_stomp.setVolume(0.4);

  sounds.seed_eaten = loadSound("./assets/sounds/seed_eaten.wav");

  sounds.banjo = loadSound("./assets/sounds/banjo.wav");
  sounds.banjo.setVolume(0.5);

  sounds.sheep_bleat = loadSound("./assets/sounds/sheep_bleat.wav");
  sounds.sheep_bleat.setVolume(0.5);

  sounds.end_game = loadSound("./assets/sounds/end_game.wav");
}
