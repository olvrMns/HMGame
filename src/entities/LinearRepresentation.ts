import MS from "../util/MathService";
import Coordinate from "./Coordinate";

export default class LinearRepresentation {
    private startCoordinate: Coordinate;
    private endCoordinate: Coordinate;
    private slope: number;
    private initialY: number;
    
    constructor(startCoordinate: Coordinate, endCoordinate: Coordinate) {
        this.startCoordinate = startCoordinate;
        this.endCoordinate = endCoordinate;
        this.slope = MS.getSlope(startCoordinate, endCoordinate);
        this.initialY = MS.getInitialY(this.startCoordinate, this.slope);
    }

    public getStartCoordinate(): Coordinate {
        return this.startCoordinate;
    }

    public getEndCoordinate(): Coordinate {
        return this.endCoordinate;
    }

    public setStartCoordinate(coordinate: Coordinate): void {
        this.startCoordinate = coordinate;
    }

    public setEndCoordinate(coordinate: Coordinate): void {
        this.endCoordinate = coordinate;
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

    // public getAllCoordinates(delta: number): Coordinate[] {
    //     let coordinates: Coordinate[] = [];
    //     //need to introducde delta at elem++/elem--
    //     if (this.startCoordinate.x < this.endCoordinate.x) {
    //         for (let elem = this.startCoordinate.x; elem <= this.endCoordinate.x; elem++) {
    //             //elem * delta... something like that
    //         }
    //     } else {
    //         for (let elem = this.startCoordinate.x; elem >= this.endCoordinate.x; elem--) {

    //         }
    //     }
    //     return coordinates;
        
    // }
}