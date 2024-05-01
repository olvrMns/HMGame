import { Assets, Sprite } from "pixi.js";
import {LineNodeType, LineNodeTypes} from "../../util/typings";

// const {startCoordinate} = this.linearRep;
// this.lineNoteType.sprite.x = startCoordinate.x;
// this.lineNoteType.sprite.y = startCoordinate.y;
// this.lineNoteType.sprite.anchor.x = 0.5;
// this.lineNoteType.sprite.anchor.y = 0.5;
// this.lineNoteType.sprite.scale.x = 5;
// this.lineNoteType.sprite.scale.y = 5;
// // this.lineNoteType.sprite.width = 180;
// // this.lineNoteType.sprite.height = 180;
// this.rootGraphics.addChild(this.lineNoteType.sprite);

export const nodeTypes:  LineNodeTypes = [
    {keyboardKey: "a", color: "blue"}
    // {keyboardKey: "d", color: "yellow"},
    // {keyboardKey: "s", color: "pink"},
    // {keyboardKey: "w", color: "purple"},
]

//needs to be remade
export const keyList: string[] = ["a"];
 

export function getRandomType(): LineNodeType {
    return nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
}