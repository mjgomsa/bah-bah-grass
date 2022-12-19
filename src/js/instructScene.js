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
  // draw images
  image(images.screens.cloud_background, 0, 0, 224, 224);
  image(images.screens.grass_instruct, 0, 0, 224, 224);

  // draw instructions
  fill("#703e14");
  textAlign(LEFT, TOP);

  textStyle(NORMAL);
  textSize(9);
  text("Eat all grass squares with your teammate", 112, 45);
  text("before the time runs out.", 112, 55);
  text("Watch out for randomly appearing seeds—", 112, 65);
  text("eat the seed before the grass grows back!", 112, 75);

  pop();

  //start button
  if (mouseIsPressed) {
    push();
    noSmooth();
    image(images.buttons.play_down, 135, 180, 62, 34);
    pop();
  } else {
    push();
    noSmooth();
    image(images.buttons.play_up, 135, 180, 62, 34);
    pop();
  }
}

export function mouseReleased() {
  sounds.click.play();
  changeScene(scenes.play);
}
