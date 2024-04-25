import { Graphics } from "pixi.js";
import Coordinate from "./Coordinate";

export default abstract class AbstractGraphics extends Graphics {
    protected parentGraphic: Graphics;

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

    /**
     * @Returns the current object that is inheriting AbstractGraphics
     */
    public abstract draw(): this;    
}