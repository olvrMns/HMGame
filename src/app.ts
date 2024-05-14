import { Assets, BitmapFont, BitmapText, Container, Text } from "pixi.js";
import { AssetLoader } from "../test/AssetLoader";
import { GameInstance } from "../test/GameInstance";
import { ClassicGH } from "../test/Levels";

(async() => {
    const instance: GameInstance = GameInstance.getInstance();
    await AssetLoader.load();
    instance.loadLevel(new ClassicGH());
})();