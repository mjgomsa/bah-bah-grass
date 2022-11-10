/**
 * utilities.js
 *
 * This contains all 'random' functions
 *
 */

export function createSeedArray() {
  return Array.from({ length: 6 }, () => [
    floor(random(0, 20)),
    floor(random(0, 20)),
  ]);
}

export function preloadImages() {
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
  images.grass.grass_alternative2 = loadImage(
    "./assets/grass_alternative2.png"
  );
  images.grass.grass_alternative3 = loadImage(
    "./assets/grass_alternative3.png"
  );

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

  // other images
  images.key_art = {};
  images.key_art.logo = loadImage("./assets/logo.png");
  images.key_art.fence = loadImage("./assets/fence.png");
  images.key_art.farmer = loadImage("./assets/farmer.png");

  return images;
}
export function preloadSounds() {
  sounds.click = loadSound("./assets/button.wav"); //for button clicks
  sounds.nom = loadSound("./assets/nom_noise.wav"); //for sheep eating
  sounds.end_game = loadSound("./assets/end-game.wav"); //end game sound
  sounds.banjo = loadSound("./assets/banjo.wav"); //start game sound
  sounds.sheep_noise = loadSound("./assets/sheep.wav"); //drawGameOn sheep noises

  return sounds;
}
