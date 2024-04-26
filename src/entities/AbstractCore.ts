import { Graphics } from "pixi.js";
import AbstractGraphic from "./AbstractGraphics";
import { Anchors } from "../util/typings";
import Coordinate from "./Coordinate";
import Line from "./Line";

export default abstract class Core extends AbstractGraphic {
    private anchors: Anchors;

    constructor(parentGraphic: Graphics) {
        super(parentGraphic)
    }

    /**
     * @Note 
     * - could be optimized by removing anchorCoordinate in Anchors type...
     * - nodeSpeed/cadence needs to be added to parameters...
     * @param anchorCoordinate
     * @param startCoordinate 
     */
    protected addAnchorCoordinate(anchorCoordinate: Coordinate, startCoordinate: Coordinate): void {
        this.anchors.push({anchorCoordinate: anchorCoordinate, line: new Line(this.parentGraphic, startCoordinate, anchorCoordinate)});
    }
}