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
  // draw images
  image(images.screens.cloud_background, 0, 0);
  image(images.screens.grass_instruct, 0, 0);
  image(images.key_art.logo, 210, 5, 160, 80);

  // draw instructions
  push();

  fill("#703e14");
  textAlign(CENTER, CENTER);

  textStyle(BOLD);
  textSize(35);
  text("Instructions", 300, 126);

  textStyle(NORMAL);
  textSize(20);
  text("Eat all grass squares with your teammate", 300, 175);
  text("before the time runs out.", 300, 215);
  text("Watch out for the farmer replanting grass!", 300, 260);
  text("Get to the seed before it grows back", 300, 305);

  pop();

  //start button
  if (mouseIsPressed) {
    image(images.buttons.start_pressed, 170, 350);
  } else {
    image(images.buttons.start_unpressed, 170, 350);
  }
}

export function mouseReleased() {
  sounds.click.play();
  changeScene(scenes.play);
}
