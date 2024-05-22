import { GameInstance } from "./GameInstance";
import { AssetLoader } from "./util/AssetLoader";
import { ClassicGH, Space1, Space2 } from "./obj/Levels";

(async() => {
    const instance: GameInstance = GameInstance.getInstance();
    await AssetLoader.load();
    instance.loadLevel(new ClassicGH());
})();