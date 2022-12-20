/**
 * overScene.js
 *
 * This is the game over scene of the game
 *
 */

import { changeScene, scenes, images, sounds } from "./main.js";

import { shared_scores, drawNumber } from "./playScene.js";

export function draw() {
  push();
  noSmooth();
  image(images.screens.cloud_background, 0, 0, 224, 224);
  image(images.screens.over, 0, 0, 224, 224);
  pop();

  push();
  noSmooth();
  imageMode(CENTER);

  const yOffset = max(sin((-frameCount * 40) / 600) * 5); //hovering text animation
  // text(shared_scores.currentScore, 112, yOffset + 190);
  drawNumber(shared_scores.currentScore, 35, yOffset + 95, 43);

  // textSize(8);
  // text("Highscore: " + shared_scores.scores[0], 112, 220);
  drawNumber(shared_scores.scores[0], 145, 135, 15);

  pop();

  // start button
  if (mouseIsPressed) {
    push();
    noSmooth();
    image(images.buttons.play_down, 100, 160, 62, 34);
    pop();
  } else {
    push();
    noSmooth();
    image(images.buttons.play_up, 100, 160, 62, 34);
    pop();
  }
}

export function mouseReleased() {
  sounds.click.play();
  changeScene(scenes.title);
}
