import { Graphics, ILineStyleOptions } from "pixi.js";
import Coordinate from "../Coordinate";
import WindowService from "../../util/WindowService";

export default abstract class AbstractGraphics extends Graphics {
    /**
     * @Important
     * ROOT GRAPHICS OBJECT
     */
    protected rootGraphics: Graphics;
    protected WS: WindowService = WindowService.getInstance();

    constructor(rootGraphics: Graphics) {
        super();
        this.rootGraphics = rootGraphics;
    }

    public moveParentCursorToCoordinate(c1: Coordinate): void {
        this.rootGraphics.moveTo(c1.getX(), c1.getY());
    }

    public changeRootLineStyle(options: ILineStyleOptions): void {
        this.rootGraphics.lineStyle(options);
    }

    public changeCurrentLineStyle(options: ILineStyleOptions): void {
        this.lineStyle(options);
    }

    public lineToCoordinate(c1: Coordinate): void {
        this.rootGraphics.lineTo(c1.getX(), c1.getY());
    }

    public drawCircleFromCooridnate(c1: Coordinate, radius: number): void {
        this.rootGraphics.drawCircle(c1.x, c1.y, radius);
    }

    public getParent(): Graphics {
        return this.rootGraphics;
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