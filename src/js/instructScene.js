/**
 * instructScene.js
 *
 * This is the instructions scene of the game
 *
 */
import { changeScene, scenes, images, sounds } from "./main.js";

export function enter() {
  sounds.banjo.loop();
}

export function leave() {
  sounds.banjo.stop();
}

export function draw() {
  push();
  noSmooth();
  image(images.screens.cloud_background, 0, 0, 224, 224);
  image(images.screens.grass_instruct, 0, 0, 224, 224);
  pop();

  //start button
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
  changeScene(scenes.play);
}
