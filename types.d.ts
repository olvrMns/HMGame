import { FrameObject, Resource, Texture } from "pixi.js";
import { TriggerKeys } from "./test/AbstractLevel";
import { Coordinate } from "./test/Coordinate";
import { Line } from "./test/Line";

declare type LineInterceptionAreaObject = {areaAlias: string, coordinate: Coordinate};
declare type InterceptionPercentages = {areaAlias: string, percentage: number, areaColor: string}[];
declare type InterceptionCoordinates = LineInterceptionAreaObject[];
declare type LineObject = {line: Line, enemyTextures: FrameObject[] | Texture<Resource>[], triggerKey: TriggerKeys};
declare type EnemyNodeOptions = {angle?: number, scale?: number};
declare type LevelOptions = {
    distancePerFrame?: number, 
    distanceToIntercept?: number, 
    distanceToInterceptMultiplier?: number, 
    framesBeforeNodeUpdate?: number, 
    nodeSpeedMultiplier?: number, 
    framesBeforeNodeInitialization?: number, 
    cadenceMultiplier?: number,
    interceptionPercentages?: InterceptionPercentages
};
declare type DisplayableNumberOptions = {
    value?: string,
    fontName?: string,
    fontSize?: number,
    x: number,
    y: number
};

