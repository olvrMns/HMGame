import { Graphics } from "pixi.js";
import Coordinate from "./Coordinate";
import LinearRepresentation from "./LinearRepresentation";
import AbstractGraphics from "./abstract/AbstractGraphics";

export default class Line extends AbstractGraphics {
    public linearRep: LinearRepresentation;
    private nodeSpeedMultiplier: number;
    private cadenceMultiplier: number;

    constructor(parentGraphic: Graphics, startCoordinate: Coordinate, endCoordinate: Coordinate, nodeSpeedMultiplier: number = 1, cadenceMultiplier: number = 1) {
        super(parentGraphic);
        this.linearRep = new LinearRepresentation(startCoordinate, endCoordinate);
        this.nodeSpeedMultiplier = nodeSpeedMultiplier;
        this.cadenceMultiplier = cadenceMultiplier;
        this.draw();
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