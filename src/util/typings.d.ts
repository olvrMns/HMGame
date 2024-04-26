import Coordinate from "../entities/Coordinate";
import Line from "../entities/Line";
import Level from "../entities/abstract/AbstractLevel";

export type CollisionLines = {collisionCoordinate: Coordinate, line: Line}[];
export type Levels = {[levelName:string]: Level};