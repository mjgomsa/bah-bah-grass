/**
 * overScene.js
 *
 * This is the game over scene of the game
 *
 */

import { changeScene, scenes, images, sounds } from "./main.js";

import { final_cellEaten_count, highscore_export } from "./playScene.js";

export function draw() {
  // draw images
  image(images.screens.cloud_background, 0, 0);
  image(images.screens.grass_start, 0, 0, 600, 600);
  image(images.key_art.logo, 210, 5, 160, 80);
  image(images.key_art.farmer, 10, 170, 275, 400);
  image(images.sheep.sheep2, 280, 360); //rename sheep2

  //draw high score
  push();
  textSize(35);
  fill("#703e14");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Your Score:", 431, 110);
  textSize(100);
  const yOffset = max(sin((-frameCount * 40) / 600) * 5); //hovering text animation
  text(final_cellEaten_count, 431, yOffset + 190);
  textSize(20);
  text("Highscore: " + highscore_export, 431, 245);
  pop();

  //restart button
  if (mouseIsPressed) {
    image(images.buttons.play_pressed, 300, 270);
  } else {
    image(images.buttons.play_unpressed, 300, 270);
  }
}

export function mouseReleased() {
  sounds.click.play();
  changeScene(scenes.title);
}
