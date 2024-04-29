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

    public draw(): void {
        this.drawCircle(0, 0, 10);
    }

    public xIsAscendant() {
        return this.linearRep.getStartCoordinate().x < this.linearRep.getEndCoordinate().x;
    }

    public yIsAscendant() {
        return this.linearRep.getStartCoordinate().y < this.linearRep.getEndCoordinate().y;
    }

    /**
     * @Note can be destroyed if....
     * @returns if the LineNode can be destroyed (as reached it's end point on the graph)
     */
    public canBeDestroyed(): boolean {
        let xHasPassed: boolean;
        let yHasPassed: boolean;
        if (this.xIsAscendant()) xHasPassed = this.x >= this.linearRep.getEndCoordinate().x;
        else xHasPassed = this.x <= this.linearRep.getEndCoordinate().x;
        if (this.yIsAscendant()) yHasPassed = this.y >= this.linearRep.getEndCoordinate().y;
        else yHasPassed = this.y <= this.linearRep.getEndCoordinate().y;
        return xHasPassed && yHasPassed;
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
    public isInReceptionState(): boolean {
        return true;
    }
}