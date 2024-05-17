import { Application, DisplayObject } from "pixi.js";
import { WindowPresets } from "./WindowPresets";
import { LevelInstance } from "./LevelInstance";
import { AbstractLevel } from "./AbstractLevel";


/**
 * @description Singleton Application Object
 */
export class GameInstance extends Application {
    private static instance: GameInstance;
    public levelInstance: LevelInstance | null;

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
        this.levelInstance = null;
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

    public loadLevel(level: AbstractLevel): void {
        this.unloadLevel();
        this.levelInstance = LevelInstance.getInstance(level);
        this.stage.addChild(this.levelInstance.level);
        this.ticker.add(this.levelInstance.getRandomizedInstanceTicker());
    }

    public unloadLevel(): void {
        if (this.levelInstance) {
            this.stage.removeChild(this.levelInstance.level);
            window.removeEventListener("keydown", (keyboardEvent: KeyboardEvent) => this.levelInstance?.getInstanceKeyboardListenner(keyboardEvent));
            this.levelInstance.level.destroy({texture: false});
            this.levelInstance = null;
        }
    }
}