import { Application, Assets, Graphics } from "pixi.js";
import { CircleLevel, RectangularLevel } from "../implementation/Levels";
import WindowService from "../util/WindowService";
import { Levels } from "../util/typings";
import LevelInstance from "./LevelInstance";



export default class GameInstance extends Application {
    private static DEFAULT_CANVAS: HTMLCanvasElement = document.getElementById("pixi-canvas") as HTMLCanvasElement

    private rootGraphic: Graphics;
    private levelInstance: LevelInstance;
    private levels: Levels;
    private WS: WindowService;

    constructor(canvasElement: HTMLCanvasElement = GameInstance.DEFAULT_CANVAS, backgroundColor: string = 'rgb(15, 15, 15)') {
        super({view: canvasElement, backgroundColor: backgroundColor, autoStart: true, resizeTo: window});
        this.rootGraphic = new Graphics;
        this.WS = WindowService.getInstance(); //must be initialized before LevelInstance/getLevels
        this.levelInstance = new LevelInstance(this.rootGraphic);
        this.levels = this.getLevels();
        this.setGraphics();
        //window.onresize = () => this.resize();
    }

    private setGraphics() {
        this.rootGraphic.x = this.WS.centerCoordinate.x;
        this.rootGraphic.y = this.WS.centerCoordinate.y;
        this.rootGraphic.lineStyle(2, 'red');
        this.stage.addChild(this.rootGraphic);
    }

    public async loadAssests() {
        await Assets.load('https://pixijs.com/assets/bitmap-font/desyrel.xml');
    }

    private getLevels(): Levels {
        return {
            testLevel1: new RectangularLevel(this.rootGraphic),
            testLevel2: new CircleLevel(this.rootGraphic)
        }
    }

    public load(levelName: string): void {
        if (this.levels[levelName] != null) {
            this.levelInstance.loadLevel(this.levels[levelName]);
            this.ticker.add(this.levelInstance.getInstanceTicker());
        }
    }
}
