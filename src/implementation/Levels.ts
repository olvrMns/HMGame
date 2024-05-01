import { Graphics } from "pixi.js";
import Level from "../entities/abstract/AbstractLevel";
import Coordinate from "../entities/Coordinate";

//nice confing (rootGraphics, 1.5, 0.5, 0.9, 5, 35, 10, 15)
export class RectangularLevel extends Level {

    constructor(rootGraphics: Graphics) {
        super(rootGraphics, 1.5, 0.5, 0.9, 5, 50, 10, 150);
    }
    
    public override draw(): void {
        this.getParent().drawRect(-200, -200, 50, 50);
        this.getParent().drawRect(-50, -50, 100, 100);
        //this.addLine(new Coordinate(-200, -200), this.WS.PSC_UPPER_LEFT, true);
        this.addLine(new Coordinate(0, -50), this.WS.PSC_UPPER_MIDDLE, true)
        this.addLine(new Coordinate(0, 50), this.WS.PSC_BOTTOM_MIDDLE, true);
        this.addLine(new Coordinate(50, 0), this.WS.PSC_MIDDLE_RIGHT, true);
        this.addLine(new Coordinate(-50, 0), this.WS.PSC_MIDDLE_LEFT, true);
        //this.addLine(new Coordinate(50, -50), new Coordinate(-150, -300), true);
        //this.addLine(new Coordinate(-50, -50), new Coordinate(-50, -250), true);
        //this.addLine(new Coordinate(50, 50), this.WS.PSC_BOTTOM_RIGHT, true);
    }

}

export class CircleLevel extends Level {
    
    public override draw(): void {
        let radius: number = 80;
        this.drawCircleFromCooridnate(this.WS.gameWindowCenterCoordinate, radius);
        this.addLine(new Coordinate(0, -radius), this.WS.PSC_UPPER_MIDDLE);
    }

}