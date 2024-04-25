import { Graphics } from "pixi.js";
import AbstractGraphic from "./AbstractGraphics";
import { Anchors } from "../util/typings";
import Coordinate from "./Coordinate";

export default abstract class Core extends AbstractGraphic {
    private anchors: Anchors;

    constructor(parentGraphic: Graphics) {
        super(parentGraphic)
    }

    protected addAnchorCoordinate(c1: Coordinate) {
        this.anchors.push({anchorCoordinate: c1, line: null});
    }
}