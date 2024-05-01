import { Sprite } from "pixi.js";
import Line from "../entities/Line";
import Level from "../entities/abstract/AbstractLevel";

export type Lines = Line[];
export type Levels = {[levelName:string]: Level};
export type LineNodeType = {keyboardKey: string, color: string};
export type LineNodeTypes = LineNodeType[];