import { FrameObject, Resource, Texture } from "pixi.js";
import { TriggerKeys } from "./src/obj/AbstractLevel";
import { Coordinate } from "./src/obj/Coordinate";
import { Line } from "./src/obj/Line";

declare type LineInterceptionAreaObject = {areaAlias: string, coordinate: Coordinate};

declare type InterceptionPercentages = {areaAlias: string, percentage: number, areaColor: string}[];

declare type InterceptionCoordinates = LineInterceptionAreaObject[];

declare type LineObject = {
    line: Line, 
    enemyTextures: {base: FrameObject[] | Texture<Resource>[], destruction: FrameObject[] | Texture<Resource>[]}, 
    triggerKey: TriggerKeys
};

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
    color?: string,
    x: number,
    y: number
};

declare interface DisposableTextOptions extends DisplayableNumberOptions {
    yPositionIncrement?: number,
    framesBeforeDestruction?: number
}

