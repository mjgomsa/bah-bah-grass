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
  image(images.screens.cloud_background, 0, 0, 224, 224);
  image(images.screens.title_combo, 0, 0, 224, 224);
  // image(images.screens.grass_start, 0, 112, 224, 112);
  // image(images.screens.board_start, 28, 0, 168, 126);
  pop();

  // image(images.key_art.logo, 10, -60);
  // image(images.key_art.farmer, 10, 170, 275, 400);

  // 'start' message
  push();
  fill("#703e14");
  textSize(20);
  textAlign(CENTER, CENTER);
  const yOffset = max(sin((-frameCount * 40) / 600) * 5);
  text("Click 'start' to continue", 440, yOffset + 310);
  pop();

  // start button
  if (mouseIsPressed) {
    push();
    noSmooth();
    image(images.buttons.play_down, 135, 150, 62, 34);
    pop();
  } else {
    push();
    noSmooth();
    image(images.buttons.play_up, 135, 150, 62, 34);
    pop();
  }
}

export function mouseReleased() {
  sounds.click.play();
  changeScene(scenes.instruct);
}
