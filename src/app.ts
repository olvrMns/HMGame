import { Assets } from "pixi.js";
import GameInstance from "./entities/GameInstance";

// window.addEventListener("keypress", (keyboardEvent: KeyboardEvent) => {
//     console.log(keyboardEvent);
// });

(async() => {
    await Assets.load('https://pixijs.com/assets/bitmap-font/desyrel.xml');
    const instance: GameInstance = new GameInstance();
    instance.load("testLevel1");
})();