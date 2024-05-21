import { AssetLoader } from "./AssetLoader";
import { GameInstance } from "./GameInstance";
import { ClassicGH, Space1 } from "./Levels";

(async() => {
    const instance: GameInstance = GameInstance.getInstance();
    await AssetLoader.load();
    instance.loadLevel(new Space1());
})();