import { Graphics } from "pixi.js";
import Coordinate from "./Coordinate";
import LinearRepresentation from "./LinearRepresentation";
import AbstractGraphics from "./AbstractGraphics";

export default class Line extends AbstractGraphics {
    public linearRep: LinearRepresentation;
    private nodeSpeed: number;
    private cadence: number;

    constructor(parentGraphic: Graphics, startCoordinate: Coordinate, endCoordinate: Coordinate, nodeSpeed: number = -1, cadence: number = -1) {
        super(parentGraphic);
        this.linearRep = new LinearRepresentation(startCoordinate, endCoordinate);
        this.nodeSpeed = nodeSpeed;
        this.cadence = cadence;
    }

    public override draw(): this {
        this.moveParentCursorToCoordinate(this.linearRep.getStartCoordinate());
        this.lineToCoordinate(this.linearRep.getEndCoordinate());
        return this;
    }

    // public override draw(): void {
    //     // graph.lineStyle(5, 'rgb(170, 170, 224)');
    //     // graph.moveTo(this.linearRep.getEndCoordinate().x, this.linearRep.getEndCoordinate().y);
    //     // graph.lineTo(this.linearRep.getStartCoordinate().x, this.linearRep.getStartCoordinate().y);
    // }

}