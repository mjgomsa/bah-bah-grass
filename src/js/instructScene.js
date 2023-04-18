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
  push();
  noSmooth();
  image(images.screens.sky, 0, 0, 224, 224);
  drawAnimatedClouds();
  image(images.screens.grass_instruct, 0, 0, 224, 224);
  pop();

  // draw text
  push();
  fill("#703e14");
  textSize(9);
  text("Eat as much grass as possible with", 25, 70);
  text("your teammate before the timer", 25, 80);
  text("runs out.", 25, 90);
  text("Beware! Seeds will sprout randomly", 25, 108);
  text("and set back your progress.", 25, 118);
  text("Work together to devour the field!", 25, 138);
  text("Use the ASWD keys to move.", 25, 148);
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

function drawAnimatedClouds() {
  image(images.screens.clouds, -frameCount % 224, 10, 224, 76);
  image(images.screens.clouds, (-frameCount % 224) + 224, 10, 224, 76);
}
