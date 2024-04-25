import Coordinate from "./Coordinate";
import LinearRepresentation from "./LinearRepresentation";

export default class Line {
    public linearRep: LinearRepresentation;
    private nodeSpeed: number;

    constructor(startPosition: Coordinate, endPosition: Coordinate, nodeSpeed: number = -1) {
        this.linearRep = new LinearRepresentation(startPosition, endPosition);
        this.nodeSpeed = nodeSpeed;
    }

}