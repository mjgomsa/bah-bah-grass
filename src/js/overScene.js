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
  image(images.screens.sky, 0, 0, 224, 224);
  drawAnimatedClouds();
  image(images.screens.over, 0, 0, 224, 224);
  pop();

  push();
  noSmooth();
  imageMode(CENTER);

  const yOffset = max(sin((-frameCount * 40) / 600) * 5); //hovering text animation
  drawNumber(shared_scores.currentScore, 68, yOffset + 85, 43);
  // drawNumber(shared_scores.currentScore, 35, yOffset + 95, 43);

  drawNumber(shared_scores.scores[0], 150, 123, 15);
  // drawNumber(shared_scores.scores[0], 145, 135, 15);

  pop();

  // start button
  if (mouseIsPressed) {
    push();
    noSmooth();
    image(images.buttons.play_down, 155, 180, 62, 34);
    pop();
  } else {
    push();
    noSmooth();
    image(images.buttons.play_up, 155, 180, 62, 34);
    pop();
  }
}

export function mouseReleased() {
  sounds.click.play();
  changeScene(scenes.title);
}

function drawAnimatedClouds() {
  image(images.screens.clouds, -frameCount % 224, 10, 224, 76);
  image(images.screens.clouds, (-frameCount % 224) + 224, 10, 224, 76);
}
