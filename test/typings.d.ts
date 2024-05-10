import { FrameObject, Resource, Texture } from "pixi.js";
import { Line } from "./Line";
import { KeyboardKeys } from "./AbstractLevel";

export type LineObject = {line: Line, enemyTextures: FrameObject[] | Texture<Resource>[], triggerKey: KeyboardKeys};
export type EnemyNodeOptions = {angle?: number, scaleX?: number, scaleY?: number};