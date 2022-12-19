/**
 * overScene.js
 *
 * This is the game over scene of the game
 *
 */

import { changeScene, scenes, images, sounds } from "./main.js";

import { shared_scores } from "./playScene.js";

export function draw() {
  // draw images
  image(images.screens.cloud_background, 0, 0);
  image(images.screens.grass_start, 0, 112, 224, 112);
  // image(images.key_art.logo, 0, 0);
  // image(images.key_art.farmer, 0, 0);
  // image(images.key_art.sheep, 280, 360); //rename sheep2

  //draw high score
  push();

  textSize(12);
  fill("#703e14");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Your Score:", 112, 110);

  textSize(100);
  const yOffset = max(sin((-frameCount * 40) / 600) * 5); //hovering text animation
  text(shared_scores.currentScore, 112, yOffset + 190);

  textSize(8);
  text("Highscore: " + shared_scores.scores[0], 112, 220);

  pop();

  //restart button
  if (mouseIsPressed) {
    image(images.buttons.play_down, 300, 270);
  } else {
    image(images.buttons.play_up, 300, 270);
  }
}

export function mouseReleased() {
  sounds.click.play();
  changeScene(scenes.title);
}
