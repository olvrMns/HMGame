import { Graphics } from "pixi.js";
import Coordinate from "../Coordinate";
import WindowService from "../../util/WindowService";

export default abstract class AbstractGraphics extends Graphics {
    /**
     * @Important
     * ROOT GRAPHICS OBJECT
     * needs to be renamed to rootGraphics for more clarity
     */
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

    public moveCurrentGraphic(c1: Coordinate): void {
        this.x = c1.x;
        this.y = c1.y;
    }

    /**
     * @Returns the current object that is inheriting AbstractGraphics
     */
    public abstract draw(): void;
}