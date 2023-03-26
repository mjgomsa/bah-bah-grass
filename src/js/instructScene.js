/**
 * instructScene.js
 *
 * This is the instructions scene of the game
 *
 */
import { changeScene, scenes, images, sounds } from "./main.js";

let cloudPosX1 = 0;
let cloudPosX2 = -200;
const scrollSpeed = 1;

export function enter() {
  sounds.banjo.loop();
}

export function leave() {
  sounds.banjo.stop();
}

export function draw() {
  push();
  noSmooth();
  image(images.screens.sky, 0, 0, 224, 224);
  drawAnimatedClouds();
  image(images.screens.grass_instruct, 0, 0, 224, 224);
  pop();

  push();
  fill("#703e14");
  textSize(9);
  text("Eat all grass squares with", 45, 70);
  text("your teammates before", 45, 80);
  text("the time runs out.", 45, 90);
  text("Watch out for randomly", 45, 110);
  text("appearing seeds!", 45, 120);
  text("Eat all the seed before", 45, 140);
  text("the grass grows back!", 45, 150);
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
