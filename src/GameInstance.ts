import { Application } from "pixi.js";
import { LevelInstance } from "./LevelInstance";
import { AbstractLevel } from "./obj/abstract/AbstractLevel";
import { WindowPresets } from "./util/WindowPresets";


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
    }

    public unloadLevel(): void {
        if (this.levelInstance) {
            this.stage.removeChild(this.levelInstance.level);
            this.levelInstance.level.destroy({texture: false});
            this.levelInstance.tickerController.destroyAll();
            this.levelInstance = LevelInstance.closeInstance();
        }
    }
}