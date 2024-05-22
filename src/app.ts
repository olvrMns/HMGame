import { BitmapFont, Container } from "pixi.js";
import { GameInstance } from "./GameInstance";
import { DisposableText, DisposableTextController } from "./obj/DisposableText";
import { AssetLoader } from "./util/AssetLoader";
import { WindowPresets } from "./util/WindowPresets";

(async() => {
    const instance: GameInstance = GameInstance.getInstance();
    await AssetLoader.load();
    //instance.loadLevel(new ClassicGH());
    BitmapFont.from("PixelMapFont1", {fontFamily: 'Pixelfont1', fontSize: 60, fill: '#c4d4b1'});
    const constainer = new Container();
    instance.stage.addChild(constainer);
    const textController = new DisposableTextController(constainer);
    let frCount = 0;
    instance.ticker.add((delta) => {
        textController.updateAll(delta);
        if (frCount % 30 == 0) textController.add(DisposableText.of({
            framesBeforeDestruction: 20, 
            fontSize: 50,
            x: WindowPresets.CENTER_COORDINATE.x, 
            y: WindowPresets.CENTER_COORDINATE.y,
            value: "PERFECT"}));

        if (frCount % 50 == 0) textController.add(DisposableText.of({
            framesBeforeDestruction: 15, 
            fontSize: 30,
            x: WindowPresets.CENTER_COORDINATE.x, 
            y: WindowPresets.CENTER_COORDINATE.y,
            value: "GOOD"}));

        if (frCount % 80 == 0) textController.add(DisposableText.of({
            framesBeforeDestruction: 10, 
            fontSize: 20,
            x: WindowPresets.CENTER_COORDINATE.x, 
            y: WindowPresets.CENTER_COORDINATE.y,
            value: "FINE"}));
        frCount++;
        if (frCount > 1000) frCount = 0;
    });

})();