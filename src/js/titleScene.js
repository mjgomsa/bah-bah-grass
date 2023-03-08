/**
 * titleScene.js
 *
 * This is the title scene of the game
 *
 */

import { changeScene, scenes, images, sounds } from "./main.js";

let cloudPosX1 = 0;
let cloudPosX2 = -200;
var scrollSpeed = 1;

export function draw() {
  // draw images

  push();
  noSmooth();
  image(images.screens.sky, 0, 0, 224, 224);
  drawAnimatedClouds();
  image(images.screens.title_combo, 0, 0, 224, 224);
  pop();

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
  changeScene(scenes.instruct);
}

function drawAnimatedClouds() {
  const img1 = image(images.screens.clouds, cloudPosX1, 10, 224, 76);
  const img2 = image(images.screens.clouds, cloudPosX2, 10, 224, 76);

  cloudPosX1 -= scrollSpeed;
  cloudPosX2 -= scrollSpeed;

  if (cloudPosX1 < -width) {
    cloudPosX1 = width;
  }
  if (cloudPosX2 < -width) {
    cloudPosX2 = width;
  }
}
