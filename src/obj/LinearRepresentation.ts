import { Coordinate } from "./Coordinate";

/**
 * @description Object encapsulating data of a linear equation based on two [Coordinate]
 */
export class LinearRepresentation {
    public startCoordinate: Coordinate;
    public endCoordinate: Coordinate;
    public slope: number;
    public initialY: number;

    /**
     * @Change could be replaced by value of slope (positive or negative)
     */
    public xIsAscendant: boolean;
    public yIsAscendant: boolean
    
    constructor(startCoordinate: Coordinate, endCoordinate: Coordinate) {
        this.startCoordinate = startCoordinate;
        this.endCoordinate = endCoordinate;
        this.slope = (endCoordinate.y - startCoordinate.y)/(endCoordinate.x - startCoordinate.x);
        this.initialY = startCoordinate.y - (this.slope * startCoordinate.x);
        this.xIsAscendant = this.startCoordinate.x < this.endCoordinate.x;
        this.yIsAscendant = this.startCoordinate.y < this.endCoordinate.y;
    }

    public getYFromX(x: number): number {
        return (x*this.slope) + this.initialY;
    }

    public getXFromY(y: number) {
        return (y-this.initialY)/this.slope;
    }

    public getCoordinateFromX(x: number): Coordinate {
        return new Coordinate(x, this.getYFromX(x));
    }

    public getCoordinateFromY(y: number): Coordinate {
        return new Coordinate(this.getXFromY(y), y);
    }

    /**
     * @description d=√((x2 – x1)² + (y2 – y1)²)
     * @returns the distance between two points
     */
    public static getDistance(c1: Coordinate, c2: Coordinate) {
        return Math.sqrt(Math.pow((c2.x - c1.x), 2) + Math.pow((c2.y - c1.y), 2));
    }
}