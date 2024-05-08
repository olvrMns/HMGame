import { AnimatedSprite, Sprite } from "pixi.js";
import { ApplicationSrpites, ApplicationTextures, AssetLoader } from "../test/AssetLoader";
import { GameInstance } from "../test/GameInstance";
import { Space1 } from "../test/Levels";

(async() => {
    const instance: GameInstance = GameInstance.getInstance();
    await AssetLoader.load();
    instance.loadLevel(new Space1());
    // await new Promise(r => setTimeout(r, 5000));
    // instance.unloadLevel();
    // await new Promise(r => setTimeout(r, 5000));
    // instance.loadLevel(new Space1());

})();