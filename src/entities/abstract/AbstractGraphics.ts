import { Graphics } from "pixi.js";
import Coordinate from "../Coordinate";
import WindowService from "../../util/WindowService";

export default abstract class AbstractGraphics extends Graphics {
    protected parentGraphic: Graphics;
    protected WS: WindowService = WindowService.getInstance();

    constructor(parentGraphic: Graphics) {
        super();
        this.parentGraphic = parentGraphic;
    }

    public moveParentCursorToCoordinate(c1: Coordinate): void {
        this.parentGraphic.moveTo(c1.getX(), c1.getY());
    }

    public lineToCoordinate(c1: Coordinate): void {
        this.parentGraphic.lineTo(c1.getX(), c1.getY());
    }

    public drawCircleFromCooridnate(c1: Coordinate, radius: number): void {
        this.parentGraphic.drawCircle(c1.x, c1.y, radius);
    }

    public getParent(): Graphics {
        return this.parentGraphic;
    }

    /**
     * @Returns the current object that is inheriting AbstractGraphics
     */
    public abstract draw(): void;
}