import {LineNodeType, LineNodeTypes} from "./typings";

export const nodeTypes:  LineNodeTypes = [
    {keyboardKey: "a", color: "blue"},
    {keyboardKey: "d", color: "yellow"},
    {keyboardKey: "s", color: "pink"},
    {keyboardKey: "w", color: "purple"},
]

//needs to be remade
export function keyList(): string[] {
    return ["a", "d", "s", "w"];
}   

export function getRandomType(): LineNodeType {
    return nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
}