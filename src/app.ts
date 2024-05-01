import { Assets, Graphics } from "pixi.js";
import GameInstance from "./entities/GameInstance";

// window.addEventListener("keypress", (keyboardEvent: KeyboardEvent) => {
//     console.log(keyboardEvent);
// });

(async() => {
    await GameInstance.loadAssests();
    const instance: GameInstance = new GameInstance();
    instance.load("testLevel1");
})();
