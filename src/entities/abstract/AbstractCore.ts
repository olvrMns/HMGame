import { Graphics } from "pixi.js";
import { Anchors } from "../../util/typings";
import Coordinate from "../Coordinate";
import Line from "../Line";
import AbstractGraphic from "./AbstractGraphics";

export default abstract class Core extends AbstractGraphic {
    private anchors: Anchors;

    constructor(parentGraphic: Graphics) {
        super(parentGraphic);
        this.anchors = [];
        this.draw();
    }

    /**
     * @Note 
     * - could be optimized by removing anchorCoordinate in Anchors type...
     * - nodeSpeed/cadence needs to be added to parameters...
     * @param anchorCoordinate
     * @param startCoordinate 
     */
    protected addAnchor(anchorCoordinate: Coordinate, startCoordinate: Coordinate): void {
        this.anchors.push({anchorCoordinate: anchorCoordinate, line: new Line(this.parentGraphic, startCoordinate, anchorCoordinate)});
    }
}