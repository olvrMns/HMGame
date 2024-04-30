import { Graphics } from "pixi.js";
import Coordinate from "./Coordinate";
import LinearRepresentation from "./LinearRepresentation";
import AbstractGraphic from "./abstract/AbstractGraphics";
import { Updatable } from "../util/Updatable";

export default class LineNode extends AbstractGraphic implements Updatable {
    private linearRep: LinearRepresentation;
    private interceptionThresholdCoordinate: Coordinate;

    constructor(rootGraphics: Graphics, linearRep: LinearRepresentation, interceptionThresholdCoordinate: Coordinate) {
        super(rootGraphics);
        this.linearRep = linearRep;
        this.interceptionThresholdCoordinate = interceptionThresholdCoordinate;
        this.init();
    }

    public init(): void {
        this.x = this.linearRep.getStartCoordinate().x;
        this.y = this.linearRep.getStartCoordinate().y;
        this.draw();
        this.rootGraphics.addChild(this);
    }

    public getLinearRepresentation(): LinearRepresentation {
        return this.linearRep;
    }

    public draw(): void {
        this.lineStyle(5, 'green');
        this.drawCircle(0, 0, 10);
    }

    /**
     * @Note NEEDS TO BE FIXED FOR LINEAR EQUATIONS NOT GETTING INTERCEPTED
     * @param c1 
     * @returns 
     */
    public hasPassed(c1: Coordinate): boolean {
        let xHasPassed: boolean;
        let yHasPassed: boolean;
        if (this.linearRep.xIsAscendant) xHasPassed = this.x >= c1.x;
        else xHasPassed = this.x <= c1.x;
        if (this.linearRep.yIsAscendant) yHasPassed = this.y >= c1.y;
        else yHasPassed = this.y <= c1.y;
        return xHasPassed && yHasPassed;
    }

    /**
     * @Note can be destroyed if....
     * @returns if the LineNode can be destroyed (as reached it's end point on the graph)
     */
    public canBeDestroyed(): boolean {
        return this.hasPassed(this.linearRep.getEndCoordinate());
    }

    /**
     * @Note - will use collisionBufferDistanceMultiplier of current Level
     */
    public canBeIntercepted(): boolean {
        return this.hasPassed(this.interceptionThresholdCoordinate);
    }

    /**
     * @Note y/xIsAscendant could be calculated only once at the creation of the node for more optimization
     * - if the staring and ending x coordinate of the linearRepresentation are the same, then only increment y coordinate of Graphic...same thing y
     * - else use getXFromY in the current linearRepresentation to get the next point based on distance...
     *   (because it'll be just a normal(inversed...) linear equation)
     * - getting the next point (y/x coordinate) will not work if x/y are the same because the equation will be y=z or x=z...
     *   the linearReprensentation will also have a -Infinity slope/Nan initialY(set at the creation of the line)
     * @param delta 
     * @param distance 
     */
    public update(delta: number, distance: number): void {
        let start: Coordinate = this.linearRep.getStartCoordinate();
        let end: Coordinate = this.linearRep.getEndCoordinate();
        if (start.x === end.x) {
            if (this.linearRep.yIsAscendant) this.y += distance * delta;
            else this.y -= distance * delta;
        } else if (start.y === end.y) {
            if (this.linearRep.xIsAscendant) this.x += distance * delta;
            else this.x -= distance * delta;
        } else {
            let nextCoordinate: Coordinate = new Coordinate(0, 0);
            if (this.linearRep.xIsAscendant) { 
                nextCoordinate.setX(this.x + (distance * delta));
                nextCoordinate.setY(this.linearRep.getYFromX(nextCoordinate.x)); 
            } else {
                nextCoordinate.setX(this.x - (distance * delta));
                nextCoordinate.setY(this.linearRep.getYFromX(nextCoordinate.x)); 
            }
            this.moveCurrentGraphic(nextCoordinate);
        }
    }
}