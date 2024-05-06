import { Graphics } from "pixi.js";
import { Coordinate } from "./Coordinate";
import { LinearRepresentation } from "./LinearRepresentation";


/**
 * @description Object encapsulating data on a line where [EnemyNode] will traverse
 * - each line in a level will have a list of possible [EnemyNodeType] that will be able to spawn on it
 */
export class Line extends Graphics {
    public linearRepresentation: LinearRepresentation;
    public interceptionThresholdCoordinate: Coordinate;
    public showInterceptionSegment: boolean;
    public permittedAssets: any[];

    constructor(
        startCoordinate: Coordinate, 
        endCoordinate: Coordinate, 
        distanceToIntercept: number, 
        showInterceptionSegment: boolean = false, 
        ...permittedAssets: any[]) {
            
        super();
        this.linearRepresentation = new LinearRepresentation(startCoordinate, endCoordinate);
        this.interceptionThresholdCoordinate = this.computeDistanceInterceptionCoordinate(distanceToIntercept);
        this.showInterceptionSegment = showInterceptionSegment;
        this.permittedAssets = permittedAssets;
    }

    public static of(startCoordinate: Coordinate, endCoordinate: Coordinate, distanceToIntercept: number, showInterceptionSegment: boolean = false, ...permittedAssets: any[]): Line {
        return new Line(startCoordinate, endCoordinate, distanceToIntercept, showInterceptionSegment, permittedAssets);
    }

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