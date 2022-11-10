/**
 * overScene.js
 *
 * This is the game over scene of the game
 *
 */

import { changeScene, scenes } from "./main.js";
// import { noiseColor } from "./utilities.js";

export function draw() {
  background("black");

  // draw info
  push();
  fill("white");
  text("over scene", 10, 20);
  pop();
}

export function mousePressed() {
  changeScene(scenes.title);
}
