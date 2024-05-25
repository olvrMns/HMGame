import { Application } from "pixi.js";
import { Menu } from "./components/Menu";
import { AssetLoader } from "./util/AssetLoader";
import { WindowPresets } from "./util/WindowPresets";

/**
 * @description Singleton Application Object
 */
export class GameInstance extends Application {
    private static instance: GameInstance;

    private constructor() {
        super({
            width: WindowPresets.WINDOW_WIDTH,
            height: WindowPresets.WINDOW_HEIGHT,
            autoDensity: true,
            resolution: window.devicePixelRatio,
            resizeTo: window,
            autoStart: true,
            view: GameInstance.createCanvas()
        });
        this.stage.addChild(Menu.getInstance());
    }

    public static getInstance(): GameInstance {
        return this.instance;
    }

    public static async start() {
        if (!this.instance) {
            await AssetLoader.load();
            this.instance = new GameInstance();
        };
        return this.instance;
    }

    private static createCanvas(): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
        document.body.appendChild(canvas);
        return canvas;
    }
}