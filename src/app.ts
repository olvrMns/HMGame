import { AssetLoader } from "../test/AssetLoader";
import { GameInstance } from "../test/GameInstance";
import { ClassicGH, Space1 } from "../test/Levels";

(async() => {
    const instance: GameInstance = GameInstance.getInstance();
    await AssetLoader.load();
    instance.loadLevel(new ClassicGH());
})();