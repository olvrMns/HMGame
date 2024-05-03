import { AnimatedSprite, Application, Assets, Graphics, Sprite, Spritesheet, Texture } from "pixi.js";
import GameInstance from "./entities/GameInstance";

// window.addEventListener("keypress", (keyboardEvent: KeyboardEvent) => {
//     console.log(keyboardEvent);
// });

(async() => {
    await GameInstance.loadAssests().catch((err) => console.log(err));
    const instance: Application = new Application({width: window.innerWidth, height: window.innerHeight, resizeTo: window, view: document.getElementById("pixi-canvas") as HTMLCanvasElement});

    // const spritesheet = new Spritesheet(Texture.from("sprites/planet-0.png"), planet0Data);
    // await spritesheet.parse();
    // const anim1 = new AnimatedSprite(spritesheet.animations.ePlanet);
    // anim1.animationSpeed = 0.1666;
    
    // anim1.x = 0;
    // anim1.y = 0;

    // anim1.play();

    // instance.stage.addChild(anim1);
    // const testBackground: Sprite = Sprite.from("sprites/SpaceBackground1.png");
    // instance.stage.addChild(testBackground);

})();
