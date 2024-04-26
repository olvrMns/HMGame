import { Graphics } from "pixi.js";
import Core from "../entities/abstract/AbstractCore";
import Coordinate from "../entities/Coordinate";

export class RectangularCore extends Core {
    
    public override draw(): void {
        this.getParent().drawCircle(0, 0, 10);
        this.getParent().drawRect(-50, -50, 100, 100);
        this.addAnchor(new Coordinate(0, -50), this.WS.PSC_UPPER_MIDDLE);
        this.addAnchor(new Coordinate(0, 50), this.WS.PSC_BOTTOM_MIDDLE);
        this.addAnchor(new Coordinate(50, 0), this.WS.PSC_MIDDLE_RIGHT);
        this.addAnchor(new Coordinate(-50, 0), this.WS.PSC_MIDDLE_LEFT);
    }

}

export class CircleCore extends Core {
    
    public override draw(): void {
        let radius: number = 80;
        this.drawCircleFromCooridnate(this.WS.gameWindowCenterCoordinate, radius);
        this.addAnchor(new Coordinate(0, -radius), this.WS.PSC_UPPER_MIDDLE);
    }

}