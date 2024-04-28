import { Graphics } from "pixi.js";
import { Lines } from "../../util/typings";
import Coordinate from "../Coordinate";
import Line from "../Line";
import AbstractGraphic from "./AbstractGraphics";

export default abstract class Level extends AbstractGraphic {
    private lines: Lines;
    private collisionBufferDistanceMultiplier: number;
    //TEMPO //CADENCE //NODESPEED

    constructor(parentGraphic: Graphics, collisionBufferDistanceMultiplier: number = 1) {
        super(parentGraphic);
        this.lines = [];
        this.collisionBufferDistanceMultiplier = collisionBufferDistanceMultiplier;
    }

    public getCollisionBufferDistanceMultiplier(): number {
        return this.collisionBufferDistanceMultiplier;
    }

    //
    public getDistancedBufferedEndCoordinate(line: Line): Coordinate {
        return line.getLinearRepresentation().getEndCoordinate().multiply(this.collisionBufferDistanceMultiplier);
    }

    public getLines(): Lines {
        return this.lines;
    }

    public getRandomLine(): Line {
        return this.lines[Math.floor(Math.random() * (this.lines.length))];
    }

    /**
     * @Note 
     * - could be optimized by removing collisionCoordinate in CollisionLines type...
     * - nodeSpeed/cadence needs to be added to parameters...
     * @param collisionCoordinate
     * @param startCoordinate 
     */
    protected addLine(collisionCoordinate: Coordinate, startCoordinate: Coordinate): void {
        this.lines.push(new Line(this.parentGraphic, startCoordinate, collisionCoordinate));
    }
}