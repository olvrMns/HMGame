import { Graphics } from "pixi.js";
import { CollisionLines } from "../../util/typings";
import Coordinate from "../Coordinate";
import Line from "../Line";
import AbstractGraphic from "./AbstractGraphics";

export default abstract class Level extends AbstractGraphic {
    private collisionLines: CollisionLines;
    private collisionBufferDistanceMultiplier: number;

    constructor(parentGraphic: Graphics, collisionBufferDistanceMultiplier: number = 1) {
        super(parentGraphic);
        this.collisionLines = [];
        this.collisionBufferDistanceMultiplier = collisionBufferDistanceMultiplier;
    }

    /**
     * @Note 
     * - could be optimized by removing collisionCoordinate in CollisionLines type...
     * - nodeSpeed/cadence needs to be added to parameters...
     * @param collisionCoordinate
     * @param startCoordinate 
     */
    protected addLine(collisionCoordinate: Coordinate, startCoordinate: Coordinate): void {
        this.collisionLines.push({collisionCoordinate: collisionCoordinate, line: new Line(this.parentGraphic, startCoordinate, collisionCoordinate)});
    }
}