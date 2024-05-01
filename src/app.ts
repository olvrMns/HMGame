import { Assets } from "pixi.js";
import GameInstance from "./entities/GameInstance";

// window.addEventListener("keypress", (keyboardEvent: KeyboardEvent) => {
//     console.log(keyboardEvent);
// });

(async() => {
    const instance: GameInstance = new GameInstance();
    await instance.loadAssests();
    instance.load("testLevel1");
})();