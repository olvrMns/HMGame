import { AnimatedSprite, Sprite } from "pixi.js";
import { ApplicationSrpites, ApplicationTextures, AssetLoader } from "../test/AssetLoader";
import { GameInstance } from "../test/GameInstance";

(async() => {
    const instance: GameInstance = GameInstance.getInstance();
    await AssetLoader.load();
    const test = new AnimatedSprite(ApplicationTextures.PLANET1);
    test.play();
    //const test2: Sprite = structuredClone(ApplicationSrpites.SPACE_BACKGROUND1);
    var clone: Sprite = Object.create(ApplicationSrpites.SPACE_BACKGROUND1);
    console.log(clone == ApplicationSrpites.SPACE_BACKGROUND1)
    instance.stage.addChild(ApplicationSrpites.SPACE_BACKGROUND1);
    
})();