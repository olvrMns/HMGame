import { Graphics } from "pixi.js";
import Coordinate from "../src/entities/Coordinate";
import LinearRepresentation from "../src/entities/LinearRepresentation";
import AbstractGraphic from "../src/entities/abstract/AbstractGraphics";
import { Updatable } from "../src/util/Updatable";


export default class LineNode extends AbstractGraphic implements Updatable {
    private currentCoordinate: Coordinate;
    private collisionCoordinate: Coordinate;
    private linearRep: LinearRepresentation;

    constructor(parentGraphic: Graphics) {
        super(parentGraphic)
    }

    public draw() {
        // this.parentGraphic.beginFill
        // this.parentGraphic.drawCircle
        // this.parentGraphic.endFill
    }

    //delta in parameter
    public update(delta: number) {

    }
}