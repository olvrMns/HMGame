import { Application, Graphics } from "pixi.js";
import LevelInstance from "./LevelInstance";
import { Levels } from "../src/util/typings";
import { RectangularLevel, CircleLevel} from "../src/implementation/Levels";
import WindowService from "../src/util/WindowService";


export default class GameInstance extends Application {
    private static DEFAULT_CANVAS: HTMLCanvasElement = document.getElementById("pixi-canvas") as HTMLCanvasElement
    private static DEFAULT_BGCOLOR = "rgb(13,14,53)"; 

    private rootGraphic: Graphics;
    private levelInstance: LevelInstance;
    private levels: Levels;
    private WS: WindowService;

    constructor(canvasElement: HTMLCanvasElement = GameInstance.DEFAULT_CANVAS, backgroundColor: string = GameInstance.DEFAULT_BGCOLOR) {
        super({view: canvasElement, backgroundColor: backgroundColor, autoStart: true, resizeTo: window});
        this.rootGraphic = new Graphics;
        this.WS = WindowService.getInstance(); //must be initialized before LevelInstance/getLevels
        this.levelInstance = new LevelInstance(this.rootGraphic);
        this.levels = this.getLevels();
        this.setGraphics();
    }

    private setGraphics() {
        this.rootGraphic.x = this.WS.centerCoordinate.x;
        this.rootGraphic.y = this.WS.centerCoordinate.y;
        this.rootGraphic.lineStyle(5, 'rgb(150,170,124)');
        this.stage.addChild(this.rootGraphic);
    }

    private getLevels(): Levels {
        return {
            testLevel1: new RectangularLevel(this.rootGraphic),
            testLevel2: new CircleLevel(this.rootGraphic)
        }
    }

    public load(levelName: string): void {
        if (this.levels[levelName] != null) this.levelInstance.loadLevel(this.levels[levelName]);
    }

    public tick() {
        this.ticker.add((delta) => {
            console.log(delta)
        })
    }
}
