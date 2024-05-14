import { Container, FrameObject, IBitmapTextStyle, Resource, Texture } from "pixi.js";
import { TriggerKeys } from "./AbstractLevel";
import { Line } from "./Line";

declare type LineObject = {line: Line, enemyTextures: FrameObject[] | Texture<Resource>[], triggerKey: TriggerKeys};
declare type EnemyNodeOptions = {angle?: number, scale?: number};
declare type LevelOptions = {
    distancePerFrame?: number, 
    distanceToIntercept?: number, 
    distanceToInterceptMultiplier?: number, 
    framesBeforeNodeUpdate?: number, 
    nodeSpeedMultiplier?: number, 
    framesBeforeNodeInitialization?: number, 
    cadenceMultiplier?: number
};
declare type DisplayableNumberOptions = {
    value?: string,
    fontName?: string,
    fontSize?: number,
    x: number,
    y: number
}
