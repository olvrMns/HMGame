import { Graphics } from "pixi.js";
import Coordinate from "./Coordinate";
import LinearRepresentation from "./LinearRepresentation";
import AbstractGraphic from "./abstract/AbstractGraphics";
import { Updatable } from "../util/Updatable";


export default class LineNode extends AbstractGraphic implements Updatable {
    private linearRep: LinearRepresentation;
    //private type: string;

    constructor(parentGraphic: Graphics, linearRep: LinearRepresentation) {
        super(parentGraphic);
        this.linearRep = linearRep;
        this.init();
    }

    public init(): void {
        this.x = this.linearRep.getStartCoordinate().x;
        this.y = this.linearRep.getStartCoordinate().y;
        this.lineStyle(5, 'rgb(100,123,170)');
        this.draw();
        this.parentGraphic.addChild(this);
    }

    public getLinearRepresentation(): LinearRepresentation {
        return this.linearRep;
    }

    public draw(): void {
        this.drawCircle(0, 0, 10);
    }

    public xIsAscendant() {
        return this.linearRep.getStartCoordinate().x < this.linearRep.getEndCoordinate().x;
    }

    public yIsAscendant() {
        return this.linearRep.getStartCoordinate().y < this.linearRep.getEndCoordinate().y;
    }

    public hasPassed(c1: Coordinate): boolean {
        let xHasPassed: boolean;
        let yHasPassed: boolean;
        if (this.xIsAscendant()) xHasPassed = this.x >= c1.x;
        else xHasPassed = this.x <= c1.x;
        if (this.yIsAscendant()) yHasPassed = this.y >= c1.y;
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
     * @Note y/xIsAscendant could be calculated only once at the craetion of the node for more optimization
     * @param delta 
     * @param distance 
     */
    public update(delta: number, distance: number): void {
        let start: Coordinate = this.linearRep.getStartCoordinate();
        let end: Coordinate = this.linearRep.getEndCoordinate();
        if (start.x === end.x) {
            if (this.yIsAscendant()) this.y += distance * delta;
            else this.y -= distance * delta;
        } else if (start.y === end.y) {
            if (this.xIsAscendant()) this.x += distance * delta;
            else this.x -= distance * delta;
        }  
    }

    /**
     * @Note - will use collisionBufferDistanceMultiplier of current Level
     */
    public canBeIntercepted(c1: Coordinate): boolean {
        return this.hasPassed(c1);
    }
}