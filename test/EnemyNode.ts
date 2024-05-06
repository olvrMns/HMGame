import { AnimatedSprite, FrameObject, Resource, Sprite, Texture } from "pixi.js";
import { LinearRepresentation } from "./LinearRepresentation";
import { Coordinate } from "./Coordinate";


/**
 * @description 
 */
export class EnemyNode extends AnimatedSprite {
    private linearRepresentation: LinearRepresentation;
    private interceptionThresholdCoordinate: Coordinate;
    public isValid: boolean = true;

    constructor(textures: FrameObject[] | Texture<Resource>[], linearRepresentation: LinearRepresentation, interceptionThresholdCoordinate: Coordinate) {
        super(textures)
        this.linearRepresentation = linearRepresentation;
        this.interceptionThresholdCoordinate = interceptionThresholdCoordinate;
        this.init();
    }

    public init() {
        this.play();
        this.x = this.linearRepresentation.startCoordinate.x;
        this.y = this.linearRepresentation.startCoordinate.y;
    }

    public hasPassed(c1: Coordinate): boolean {
        let xHasPassed: boolean;
        let yHasPassed: boolean;
        if (this.linearRepresentation.xIsAscendant) xHasPassed = this.x >= c1.x;
        else xHasPassed = this.x <= c1.x;
        if (this.linearRepresentation.yIsAscendant) yHasPassed = this.y >= c1.y;
        else yHasPassed = this.y <= c1.y;
        return xHasPassed && yHasPassed;
    }

    /**
     * @returns if the Node can be destroyed (as reached it's end point on the graph)
     */
    public canBeDestroyed(): boolean {
        return this.hasPassed(this.linearRepresentation.endCoordinate);
    }

    public canBeIntercepted(): boolean {
        return this.hasPassed(this.interceptionThresholdCoordinate);
    }

    public invalidate(): void {
        this.isValid = false;
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
    public updateNode(delta: number, distance: number): void {
        const {startCoordinate, endCoordinate, yIsAscendant, xIsAscendant} = this.linearRepresentation;
        if (startCoordinate.x === endCoordinate.x) {
            if (yIsAscendant) this.y += distance * delta;
            else this.y -= distance * delta;
        } else if (startCoordinate.y === endCoordinate.y) {
            if (xIsAscendant) this.x += distance * delta;
            else this.x -= distance * delta;
        } else {
            let nextCoordinate: Coordinate = new Coordinate(0, 0);
            if (xIsAscendant) { 
                nextCoordinate.setX(this.x + (distance * delta));
                nextCoordinate.setY(this.linearRepresentation.getYFromX(nextCoordinate.x)); 
            } else {
                nextCoordinate.setX(this.x - (distance * delta));
                nextCoordinate.setY(this.linearRepresentation.getYFromX(nextCoordinate.x)); 
            }
            this.x = nextCoordinate.x;
            this.y = nextCoordinate.y;
        }
    }
}   