import { FrameObject, Resource, Texture } from "pixi.js";
import { TriggerKeys } from "./src/obj/AbstractLevel";
import { Coordinate } from "./src/obj/Coordinate";
import { Line } from "./src/obj/Line";
import { InterceptionAreaAliases } from "./src/util/ApplicationUtils";

declare type LineInterceptionAreaObject = {areaAlias: InterceptionAreaAliases, coordinate: Coordinate};

declare type InterceptionPercentages = {areaAlias: InterceptionAreaAliases, percentage: number, areaColor: string}[];

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
    interceptionPercentages?: InterceptionPercentages,
    disposableTextCoordinate?: Coordinate,
};

declare type DisplayableNumberOptions = {
    value?: string,
    fontName?: string,
    fontSize?: number,
    color?: string,
    coordinate: Coordinate
};

declare interface DisposableTextOptions extends DisplayableNumberOptions {
    yPositionIncrement?: number,
    framesBeforeDestruction?: number
}

declare type PRDisposableTexts = {[key in InterceptionAreaAliases]?: DisposableTextOptions};
