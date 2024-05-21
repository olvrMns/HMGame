import { Graphics } from "pixi.js";
import { Coordinate } from "./Coordinate";
import { LinearRepresentation } from "./LinearRepresentation";
import { InterceptionCoordinates, InterceptionPercentages } from "../types";

/**
 * @description Object encapsulating data on a line where [EnemyNode] will traverse
 * - each line in a level will have a list of possible [EnemyNodeType] that will be able to spawn on it
 */
export class Line extends Graphics {
    public linearRepresentation: LinearRepresentation;
    public interceptionCoordiantes: InterceptionCoordinates;
    public inclination: number;

    constructor(startCoordinate: Coordinate, endCoordinate: Coordinate, distanceToIntercept: number, inclination: number, interceptionPercentages: InterceptionPercentages, showInterceptionSegments: boolean = false) {            
        super();
        this.linearRepresentation = new LinearRepresentation(startCoordinate, endCoordinate);
        this.inclination = inclination;
        this.interceptionCoordiantes = [];
        this.computeDistanceInterceptionCoordinates(distanceToIntercept, interceptionPercentages);
        if (showInterceptionSegments) this.draw(interceptionPercentages);
    }

    /**
     * @Change ...
     */
    public draw(interceptionPercentages: InterceptionPercentages) {
        for (let elem = 0; elem < this.interceptionCoordiantes.length; elem++) {
            this.lineStyle({color: interceptionPercentages[elem].areaColor, width: 5});
            this.moveTo(this.interceptionCoordiantes[elem].coordinate.x, this.interceptionCoordiantes[elem].coordinate.y);
            if (this.interceptionCoordiantes[elem + 1]) this.lineTo(this.interceptionCoordiantes[elem + 1].coordinate.x, this.interceptionCoordiantes[elem + 1].coordinate.y);
            else this.lineTo(this.linearRepresentation.endCoordinate.x, this.linearRepresentation.endCoordinate.y);
        }
    }

    public static of(startCoordinate: Coordinate, endCoordinate: Coordinate, distanceToIntercept: number, inclination: number, interceptionPercentages: InterceptionPercentages, showInterceptionSegment: boolean = false): Line {
        return new Line(startCoordinate, endCoordinate, distanceToIntercept, inclination, interceptionPercentages, showInterceptionSegment);
    }

    /**
     * @description NEEDS TO BE REFORMATED TO REDUCE REPEATED CODE
     * @param distanceToIntercept 
     */
    public computeDistanceInterceptionCoordinates(distanceToIntercept: number, interceptionPercentages: InterceptionPercentages): void {
        let nx: number;
        const {endCoordinate, xIsAscendant, startCoordinate, yIsAscendant} = this.linearRepresentation;
        if (endCoordinate.x === startCoordinate.x) {
            if (yIsAscendant) for (let elem of interceptionPercentages) this.interceptionCoordiantes.push({areaAlias: elem.areaAlias, coordinate: Coordinate.of(endCoordinate.x, endCoordinate.y - (distanceToIntercept * elem.percentage))});
            else for (let elem of interceptionPercentages) this.interceptionCoordiantes.push({areaAlias: elem.areaAlias, coordinate: Coordinate.of(endCoordinate.x, endCoordinate.y + (distanceToIntercept * elem.percentage))});
        } else if (endCoordinate.y === startCoordinate.y) {
            if (xIsAscendant) for (let elem of interceptionPercentages) this.interceptionCoordiantes.push({areaAlias: elem.areaAlias, coordinate: Coordinate.of(endCoordinate.x - (distanceToIntercept * elem.percentage), endCoordinate.y)});
            else for (let elem of interceptionPercentages) this.interceptionCoordiantes.push({areaAlias: elem.areaAlias, coordinate: Coordinate.of(endCoordinate.x + (distanceToIntercept * elem.percentage), endCoordinate.y)});
        } else {
            if (xIsAscendant) {
                for (let elem of interceptionPercentages) {
                    nx = endCoordinate.x - (distanceToIntercept * elem.percentage);
                    this.interceptionCoordiantes.push({areaAlias: elem.areaAlias, coordinate: Coordinate.of(nx, this.linearRepresentation.getYFromX(nx))});
                };
            } else {
                for (let elem of interceptionPercentages) {
                    nx = endCoordinate.x + (distanceToIntercept * elem.percentage);
                    this.interceptionCoordiantes.push({areaAlias: elem.areaAlias, coordinate: Coordinate.of(nx, this.linearRepresentation.getYFromX(nx))});
                };
            }
        }
    }

}