import GameInstance from "./entities/GameInstance";

// window.addEventListener("keypress", (keyboardEvent: KeyboardEvent) => {
//     console.log(keyboardEvent);
// });

const instance: GameInstance = new GameInstance();
instance.load("testLevel1");