import { Graphics } from "pixi.js";
import Coordinate from "./Coordinate";
import LinearRepresentation from "./LinearRepresentation";
import AbstractGraphics from "./abstract/AbstractGraphics";

export default class Line extends AbstractGraphics {
    private linearRep: LinearRepresentation;

    constructor(parentGraphic: Graphics, startCoordinate: Coordinate, endCoordinate: Coordinate) {
        super(parentGraphic);
        this.linearRep = new LinearRepresentation(startCoordinate, endCoordinate);
        this.draw();
    }

    public getLinearRepresentation(): LinearRepresentation {
        return this.linearRep;
    }

    /**
     * 
     * @Note used in constructor 
     */
    public override draw(): void {
        this.moveParentCursorToCoordinate(this.linearRep.getStartCoordinate());
        this.lineToCoordinate(this.linearRep.getEndCoordinate());
    }
}