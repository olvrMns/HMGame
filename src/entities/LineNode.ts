import { Graphics } from "pixi.js";
import Coordinate from "./Coordinate";
import LinearRepresentation from "./LinearRepresentation";
import AbstractGraphic from "./abstract/AbstractGraphics";
import { Updatable } from "../util/Updatable";


export default class LineNode extends AbstractGraphic implements Updatable {
    private linearRep: LinearRepresentation;
    private collisionCoordinate: Coordinate;
    //private type: string;

    constructor(parentGraphic: Graphics, linearRep: LinearRepresentation, collisionCoordinate: Coordinate) {
        super(parentGraphic);
        this.linearRep = linearRep;
        this.collisionCoordinate = collisionCoordinate;
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

    public update(delta: number, distance: number): void {
        let nx: number = 0;
        let ny: number = 0;

        // if (g.x < 0) nx = advanceValue * delta;
        // else nx = -advanceValue * delta;
        
        // if (g.y < 0) ny = advanceValue * delta;
        // else ny = -advanceValue * delta;

        this.x += nx;
        this.y += ny;
        
    }
}