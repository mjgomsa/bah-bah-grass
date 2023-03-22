/**
 * titleScene.js
 *
 * This is the title scene of the game
 *
 */

import { changeScene, scenes, images, sounds } from "./main.js";


export function draw() {
  // draw images
  push();
  noSmooth();
  image(images.screens.sky, 0, 0, 224, 224);
  drawAnimatedClouds();
  image(images.screens.title_combo, 0, 0, 224, 224);
  pop();

  // draw text
  push();
  fill("#703e14");
  textSize(9);
  textAlign(CENTER, CENTER);
  const yOffset = max(sin((-frameCount * 40) / 600) * 4);
  text("Click 'play' to continue", 160, yOffset + 135);
  pop();

  // start button
  if (mouseIsPressed) {
    push();
    noSmooth();
    image(images.buttons.play_down, 156, 180, 62, 34);
    pop();
  } else {
    push();
    noSmooth();
    image(images.buttons.play_up, 156, 180, 62, 34);
    pop();
  }
}

export function mouseReleased() {
  sounds.click.play();
  changeScene(scenes.instruct);
}

function drawAnimatedClouds() {
  image(images.screens.clouds, -frameCount % 224, 10, 224, 76);
  image(images.screens.clouds, -frameCount % 224 + 224, 10, 224, 76);
}
