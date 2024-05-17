import { EnemyNodeOptions, LineObject } from "./types";
import { AnimatedSprite } from "pixi.js";
import { TriggerKeys } from "./AbstractLevel";
import { Coordinate } from "./Coordinate";
import { LinearRepresentation } from "./LinearRepresentation";
import { ApplicationUtils } from "./ApplicationUtils";

/**
 * @description 
 */
export class EnemyNode extends AnimatedSprite {
    /**
     * @Note could be changed to just Line
     */
    public linearRepresentation: LinearRepresentation;
    public interceptionThresholdCoordinate: Coordinate;
    public distanceMultiplier: number;
    public accentuatedScale: number;
    public triggerKey: TriggerKeys;
    public hasNotBeenTriggered: boolean = true;

    constructor(lineObject: LineObject, options: EnemyNodeOptions) {
        super(lineObject.enemyTextures)
        this.linearRepresentation = lineObject.line.linearRepresentation;
        this.interceptionThresholdCoordinate = lineObject.line.interceptionThresholdCoordinate;
        this.scale.x = options.scale ? options.scale : 0.5;
        this.scale.y = options.scale ? options.scale : 0.5;
        this.accentuatedScale = options.scale ? options.scale * 1.3 : 0.5 * 1.3; 
        this.distanceMultiplier = 1;
        this.angle = lineObject.line.inclination;
        this.triggerKey = lineObject.triggerKey;
        this.init();
    }

    public static of(lineObject: LineObject, options: EnemyNodeOptions): EnemyNode {
        return new EnemyNode(lineObject, options);
    }

    public init() {
        this.play();
        this.x = this.linearRepresentation.startCoordinate.x;
        this.y = this.linearRepresentation.startCoordinate.y;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
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

    public accentuate() {
        this.scale.x = this.accentuatedScale;
        this.scale.y = this.accentuatedScale;
        this.tint = ApplicationUtils.NODE_ACCENTUATION_COLOR;
    }

    public invalidate(): void {
        this.hasNotBeenTriggered = false;
        this.distanceMultiplier = 1.5;
        this.alpha = 0.5;
        this.tint = ApplicationUtils.NODE_INVALIDATION_COLOR;
    }

    /**
     * @returns the distance from current position of the node to its endPoint
     */
    public getDistanceToEndPoint(): number {
        return LinearRepresentation.getDistance(this.x, this.y, this.linearRepresentation.endCoordinate.x, this.linearRepresentation.endCoordinate.y);
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
        const resultingDistance: number = (distance * delta) * this.distanceMultiplier;
        if (startCoordinate.x === endCoordinate.x) {
            if (yIsAscendant) this.y += resultingDistance;
            else this.y -= resultingDistance;
        } else if (startCoordinate.y === endCoordinate.y) {
            if (xIsAscendant) this.x += resultingDistance;
            else this.x -= resultingDistance;
        } else {
            let nextCoordinate: Coordinate = new Coordinate(0, 0);
            if (xIsAscendant) { 
                nextCoordinate.setX(this.x + (resultingDistance));
                nextCoordinate.setY(this.linearRepresentation.getYFromX(nextCoordinate.x)); 
            } else {
                nextCoordinate.setX(this.x - (resultingDistance));
                nextCoordinate.setY(this.linearRepresentation.getYFromX(nextCoordinate.x)); 
            }
            this.x = nextCoordinate.x;
            this.y = nextCoordinate.y;
        }
    }
}   