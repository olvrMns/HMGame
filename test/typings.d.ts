import { FrameObject, Resource, Texture } from "pixi.js";
import { Line } from "./Line";

export type LineObject = {line: Line, enemyTextures: FrameObject[] | Texture<Resource>[], keyboardKey: string};
export type EnemyNodeOptions = {angle?: number, scaleX?: number, scaleY?: number};