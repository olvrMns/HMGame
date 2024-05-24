import { BitmapText, EventMode, FrameObject, Resource, Texture } from "pixi.js";
import { AbstractLevel, TriggerKeys } from "./src/obj/abstract/AbstractLevel";
import { Coordinate } from "./src/obj/Coordinate";
import { Line } from "./src/obj/Line";
import { InterceptionAreaAliases } from "./src/util/ApplicationUtils";
import { Levels } from "./src/components/Menu";

declare type LineInterceptionAreaObject = {areaAlias: InterceptionAreaAliases, coordinate: Coordinate};

declare type InterceptionPercentages = {areaAlias: InterceptionAreaAliases, percentage: number, areaColor: string}[];

declare type LevelInstances = {[key in Levels]?: () => AbstractLevel};

declare type InterceptionCoordinates = LineInterceptionAreaObject[];

declare type LineObject = {
    line: Line, 
    enemyTextures: {base: FrameObject[] | Texture<Resource>[], destruction: FrameObject[] | Texture<Resource>[], scale?: number}, 
    triggerKey: TriggerKeys
};

declare type EnemyNodeOptions = {angle?: number};

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
    label?: string,
    fontName?: string,
    fontSize?: number,
    color?: string,
    coordinate: Coordinate
};

declare interface DisposableTextOptions extends DisplayableNumberOptions {
    yPositionIncrement?: number,
    framesBeforeDestruction?: number
}

/**
 * @description Preset options for disposable text objects to be used in a LevelInstance
 */
declare type PresetDisposableTextOptions = {[key in InterceptionAreaAliases]?: DisposableTextOptions};

declare type GridOptions = {
    width: number,
    height: number,
    columns: number,
    rows: number,
    centerCoordinate: Coordinate,
}

declare type CustomBitMapTextOptions = {
    text: string,
    eventMode?: EventMode,
    fontName?: string,
    fontSize?: number,
    onClick?(): void,
    color?: string,
    colorOnHover?: string
}

