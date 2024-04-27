import { Application, Graphics } from "pixi.js";
import LevelInstance from "./LevelInstance";
import { CircleLevel, RectangularLevel } from "./implementation/Levels";
import WindowService from "./util/WindowService";
import { Levels } from "./util/typings";
import Coordinate from "./entities/Coordinate";



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
    }

    private setGraphics() {
        this.rootGraphic.x = this.WS.centerCoordinate.x;
        this.rootGraphic.y = this.WS.centerCoordinate.y;
        this.rootGraphic.lineStyle(5, 'red');
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
        console.log(this.WS);
        const g: Graphics = this.test(this.WS.PSC_BOTTOM_MIDDLE);
        const g2: Graphics = this.test(this.WS.PSC_MIDDLE_RIGHT);
        const g3: Graphics = this.test(this.WS.PSC_MIDDLE_LEFT);
        const g4: Graphics = this.test(this.WS.PSC_UPPER_MIDDLE);
        const g5: Graphics = this.test(new Coordinate(this.WS.PSC_UPPER_RIGHT.x/2, this.WS.PSC_UPPER_RIGHT.y/2));
        this.rootGraphic.addChild(g, g2, g3, g4, g5);
        
        const advanceValue: number = 0.30;

        if (this.levelInstance.levelIsActive()) {
            this.ticker.add((delta: number) => {
                
                this.testMoveGraphics(g, advanceValue, delta);
                this.testMoveGraphics(g2, advanceValue, delta);
                this.testMoveGraphics(g3, advanceValue, delta);
                this.testMoveGraphics(g4, advanceValue, delta);
                this.testMoveGraphics(g5, advanceValue, delta);
                
                // g.x = g.x * 0.999
                // g.y = g.y * 0.999
                
            })
        }
    }

    public test(c1: Coordinate): Graphics {
        let circle  = new Graphics().lineStyle(5, 'rgb(100,123,170)');
        circle.x = c1.x;
        circle.y = c1.y;
        circle.drawCircle(0, 0, 10);
        return circle
    }

    public testMoveGraphics(g: Graphics, advanceValue: number, delta: number) {
        if (g.x < 0) g.x += advanceValue * delta;
        else g.x += -advanceValue * delta;
        
        if (g.y < 0) g.y += advanceValue * delta;
        else g.y += -advanceValue * delta;
    }
}
