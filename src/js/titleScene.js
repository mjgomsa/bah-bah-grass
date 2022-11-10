/**
 * titleScene.js
 *
 * This is the title scene of the game
 *
 */
import { changeScene, scenes, images, sounds } from "./main.js";

export function draw() {
  background("#99ccff");

  //upload images
  images.screens.cloud_background.play();
  image(images.screens.cloud_background, 0, 0);
  image(images.screens.grass_start, 0, 0);
  image(images.key_art.logo, 10, -60);
  image(images.key_art.farmer, 10, 170, 275, 400);

  //drawn features
  push();
  fill("#703e14");
  textSize(20);
  textAlign(CENTER, CENTER);
  const yOffset = max(sin((-frameCount * 40) / 600) * 5);
  text("Click 'start' to continue", 440, yOffset + 310);
  pop();

  //start button
  if (mouseIsPressed) {
    image(images.buttons.start_pressed, 310, 350);
  } else {
    image(images.buttons.start_unpressed, 310, 350);
  }
}

export function mouseReleased() {
  sounds.click.play();
  changeScene(scenes.instruct);
}
