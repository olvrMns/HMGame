import { GameInstance } from "./GameInstance";
import { AssetLoader } from "./util/AssetLoader";
import { ClassicGH, Space1 } from "./obj/Levels";

(async() => {
    const instance: GameInstance = GameInstance.getInstance();
    await AssetLoader.load();
    instance.loadLevel(new ClassicGH());
})();