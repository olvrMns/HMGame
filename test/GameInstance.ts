import { Application } from "pixi.js";
import { WindowPresets } from "./WindowPresets";
import { LevelInstance } from "./LevelInstance";


/**
 * @description Singleton Application Object
 */
export class GameInstance extends Application {
    private static instance: GameInstance;
    public levelInstance: LevelInstance;

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
        this.levelInstance = LevelInstance.getInstance(this);
    }

    public static getInstance(): GameInstance {
        if (!this.instance) this.instance = new GameInstance();
        return this.instance;
    }

    private static createCanvas(): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
        document.body.appendChild(canvas);
        return canvas;
    }
}