import { Graphics } from "pixi.js";
import { Lines } from "../../util/typings";
import Coordinate from "../Coordinate";
import Line from "../Line";
import AbstractGraphic from "./AbstractGraphics";

export default abstract class Level extends AbstractGraphic {
    public lines: Lines;
    public collisionBufferDistanceMultiplier: number;
    public nodeSpeedMultiplier: number;
    public cadenceMultiplier: number;
    public framesBeforeNodeUpdate: number;
    public framesBeforeNodeInitialization: number;
    public distance: number;
    public distanceToIntercept: number;

    constructor(
        rootGraphics: Graphics, 
        collisionBufferDistanceMultiplier: number = 1.2, 
        nodeSpeedMultiplier: number = 1, 
        cadenceMultiplier: number = 1, 
        framesBeforeNodeUpdate: number = 10,
        framesBeforeNodeInitialization: number = 60,
        distance: number = 2,
        distanceToIntercept: number = 15) {

            super(rootGraphics);
            this.nodeSpeedMultiplier = nodeSpeedMultiplier;
            this.cadenceMultiplier = cadenceMultiplier;
            this.lines = [];
            this.collisionBufferDistanceMultiplier = collisionBufferDistanceMultiplier;
            this.framesBeforeNodeUpdate = framesBeforeNodeUpdate;
            this.framesBeforeNodeInitialization = framesBeforeNodeInitialization;
            this.distance = distance;
            this.distanceToIntercept = distanceToIntercept
    }

    public getFramesBeforeNodeUpdate() {
        return this.framesBeforeNodeUpdate;
    }

    public getFramesBeforeNodeInitialization() {
        return this.framesBeforeNodeInitialization;
    }

    public getNodeSpeedMultiplier(): number {
        return this.nodeSpeedMultiplier;
    }

    public getCadenceMultiplier(): number {
        return this.cadenceMultiplier;
    }

    public getCollisionBufferDistanceMultiplier(): number {
        return this.collisionBufferDistanceMultiplier;
    }

    public getLines(): Lines {
        return this.lines;
    }

    public getDistanceToIntercept(): number {
        return this.distanceToIntercept;
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
        this.lines.push(new Line(this.rootGraphics, startCoordinate, collisionCoordinate, this.distanceToIntercept));
    }
}