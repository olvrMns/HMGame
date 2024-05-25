import { BitmapText, EventMode, FrameObject, Resource, Texture } from "pixi.js";
import { AbstractLevel, TriggerKeys } from "./src/obj/abstract/AbstractLevel";
import { Coordinate } from "./src/obj/Coordinate";
import { Line } from "./src/obj/Line";
import { InterceptionAreaAliases } from "./src/util/ApplicationUtils";
import { Levels } from "./src/components/Menu";
import { Enemies } from "./src/obj/EnemyData";

declare type LineInterceptionAreaObject = {areaAlias: InterceptionAreaAliases, coordinate: Coordinate};

declare type InterceptionPercentages = {areaAlias: InterceptionAreaAliases, percentage: number, areaColor: string}[];

declare type LevelInstances = {[key in Levels]?: () => AbstractLevel};

declare type InterceptionCoordinates = LineInterceptionAreaObject[];

/**
 * @description textures are returned as callbacks beacause it returns as Undefined if not (ts compiles the object before the textures have been loaded (I think)
 * and doesn't store them as references, but as direct values(???))
 * 
 */
declare type EnemyData = {
    baseTextures: () => FrameObject[] | Texture<Resource>[],
    destructionTextures: () => FrameObject[] | Texture<Resource>[],
    scale?: number,
    triggerKey: TriggerKeys
}

declare type EnemiesData = {[key in Enemies]:EnemyData};

declare type LineObject = {
    line: Line, 
    enemyData: EnemyData
};

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
    randomInitializationFluctuationPercentage?: number,
    randomSpeedFluctuationPercentage?: number
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
    centerCoordinate?: Coordinate,
    showBorders?: boolean
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

