import { Graphics } from "pixi.js";
import Coordinate from "./Coordinate";
import LinearRepresentation from "./LinearRepresentation";
import AbstractGraphics from "./abstract/AbstractGraphics";

export default class Line extends AbstractGraphics {
    private linearRep: LinearRepresentation;
    private interceptionThresholdCoordinate: Coordinate;
    private showInterceptionSegment: boolean;

    constructor(rootGraphics: Graphics, startCoordinate: Coordinate, endCoordinate: Coordinate, distanceToIntercept: number, showInterceptionSegment: boolean = false) {
        super(rootGraphics);
        this.linearRep = new LinearRepresentation(startCoordinate, endCoordinate);
        this.interceptionThresholdCoordinate = this.computeDistanceInterceptionCoordinate(distanceToIntercept);
        this.showInterceptionSegment = showInterceptionSegment;
        this.draw();
    }

    public getLinearRepresentation(): LinearRepresentation {
        return this.linearRep;
    }

    public getInterceptionThresholdCoordinate(): Coordinate {
        return this.interceptionThresholdCoordinate;
    }

    /**
     * @Note ...
     * @param distanceToIntercept 
     * @returns 
     */
    public computeDistanceInterceptionCoordinate(distanceToIntercept: number): Coordinate {
        let nc = new Coordinate(0, 0);
        const {endCoordinate, xIsAscendant, startCoordinate, yIsAscendant} = this.linearRep;
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
            nc.setY(this.linearRep.getYFromX(nc.x));
        }
        return nc;
    }

    /**
     * 
     * @Note used in constructor 
     */
    public override draw(): void {
        this.changeRootLineStyleToDefault();
        this.moveParentCursorToCoordinate(this.linearRep.getStartCoordinate());
        this.lineToCoordinate(this.getInterceptionThresholdCoordinate());
        if (this.showInterceptionSegment) this.changeRootLineStyle(this.DEBUG_LINE_STYLE);
        this.moveParentCursorToCoordinate(this.getInterceptionThresholdCoordinate());
        this.lineToCoordinate(this.linearRep.getEndCoordinate());
    }
}