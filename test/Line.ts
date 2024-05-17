import { Graphics } from "pixi.js";
import { Coordinate } from "./Coordinate";
import { LinearRepresentation } from "./LinearRepresentation";
import { ApplicationUtils } from "./ApplicationUtils";

/**
 * @description Object encapsulating data on a line where [EnemyNode] will traverse
 * - each line in a level will have a list of possible [EnemyNodeType] that will be able to spawn on it
 */
export class Line extends Graphics {
    public linearRepresentation: LinearRepresentation;
    public interceptionThresholdCoordinate: Coordinate;
    public inclination: number;

    /**
     * @Change
     */
    public showInterceptionSegment: boolean;

    constructor(
        startCoordinate: Coordinate, 
        endCoordinate: Coordinate, 
        distanceToIntercept: number, 
        inclination: number,
        showInterceptionSegment: boolean = false) {
            
        super();
        this.linearRepresentation = new LinearRepresentation(startCoordinate, endCoordinate);
        this.interceptionThresholdCoordinate = this.computeDistanceInterceptionCoordinate(distanceToIntercept);
        this.inclination = inclination;
        this.showInterceptionSegment = showInterceptionSegment;
        this.draw();
    }

    /**
     * @Change
     */
    public draw() {
        if (this.showInterceptionSegment) {
            this.lineStyle(ApplicationUtils.DEFAULT_LINE_STYLE);
            this.moveTo(this.linearRepresentation.startCoordinate.x, this.linearRepresentation.startCoordinate.y);
            this.lineTo(this.interceptionThresholdCoordinate.x, this.interceptionThresholdCoordinate.y);
            this.lineStyle(ApplicationUtils.DEBUG_LINE_STYLE);
            this.lineTo(this.linearRepresentation.endCoordinate.x, this.linearRepresentation.endCoordinate.y);
        }
    }

    public static of(startCoordinate: Coordinate, endCoordinate: Coordinate, distanceToIntercept: number, inclination: number, showInterceptionSegment: boolean = false): Line {
        return new Line(startCoordinate, endCoordinate, distanceToIntercept, inclination, showInterceptionSegment);
    }

    /**
     * @description gets computed once on Line Init
     * @param distanceToIntercept 
     * @returns 
     */
    public computeDistanceInterceptionCoordinate(distanceToIntercept: number): Coordinate {
        let nc = new Coordinate(0, 0);
        const {endCoordinate, xIsAscendant, startCoordinate, yIsAscendant} = this.linearRepresentation;
        if (endCoordinate.x === startCoordinate.x) {
            nc.setX(endCoordinate.x);
            if (yIsAscendant) nc.setY(endCoordinate.y - distanceToIntercept);
            else nc.setY(endCoordinate.y + distanceToIntercept);
        } else if (endCoordinate.y === startCoordinate.y) {
            nc.setY(endCoordinate.y);
            if (xIsAscendant) nc.setX(endCoordinate.x - distanceToIntercept);
            else nc.setX(endCoordinate.x + distanceToIntercept);
        } else {
            if (xIsAscendant) nc.setX(endCoordinate.x - distanceToIntercept);
            else nc.setX(endCoordinate.x + distanceToIntercept);
            nc.setY(this.linearRepresentation.getYFromX(nc.x));
        }
        return nc;
    }

}