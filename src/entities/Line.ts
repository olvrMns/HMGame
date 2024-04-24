import Coordinate from "./Coordinate";

export default class Line {
    private startPosition: Coordinate;
    private endPosition: Coordinate;
    private slope: number;
    private initialYValue: number;
    private nodeSpeed: number;

    constructor(startPosition: Coordinate, endPosition: Coordinate, nodeSpeed: number = -1) {
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.slope = 0;
        this.initialYValue = 0;
        this.nodeSpeed = nodeSpeed;
    }

}