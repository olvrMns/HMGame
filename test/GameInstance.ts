import { Application, DisplayObject } from "pixi.js";
import { WindowPresets } from "./WindowPresets";
import { LevelInstance } from "./LevelInstance";
import { AbstractLevel } from "./AbstractLevel";


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

    public loadLevel(level: AbstractLevel): void {
        this.unloadLevel();
        this.levelInstance.level = level;
        this.stage.addChild(this.levelInstance.level);
        this.ticker.add(this.levelInstance.getInstanceTicker());
        this.levelInstance.loadStats();
    }

    public unloadLevel(): void {
        if (this.levelInstance.levelIsActive()) {
            this.stage.removeChild(this.levelInstance.level as DisplayObject);
            this.levelInstance.level?.destroy({texture: false});
            window.removeEventListener("keydown", (keyboardEvent: KeyboardEvent) => this.levelInstance.getInstanceKeyboardListenner(keyboardEvent));
            this.levelInstance.level = undefined;
        }
    }
}