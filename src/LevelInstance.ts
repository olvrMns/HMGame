import { Graphics } from "pixi.js";
import Level from "./entities/abstract/AbstractLevel";
import {Updatable} from "./util/Updatable"
import Line from "./entities/Line";
import LineNode from "./entities/LineNode";
import Coordinate from "./entities/Coordinate";


export default class LevelInstance implements Updatable {
    private parentGraphic: Graphics;
    private nodeSpeedMultiplier: number;
    private cadenceMultiplier: number;
    private activeLevel: Level | null;
    private score: number;
    private highestScore: number;
    private lineNodes: LineNode[];
    
    constructor(parentGraphic: Graphics) {
        this.parentGraphic = parentGraphic;
        this.nodeSpeedMultiplier = 1;
        this.cadenceMultiplier = 1;
        this.activeLevel = null;
        this.score = 0;
        this.highestScore = 0;
        this.lineNodes = [];
    }

    public levelIsActive(): boolean {
        return this.activeLevel != null;
    }

    public setHighestScore(highestScore: number): void {
        this.highestScore = highestScore;
    }

    public resetHighestScore(): void {
        this.highestScore = 0;
    }

    public resetScore(): void {
        this.score = 0;
    }

    public incrementScore(): void {
        this.score++;
    }

    public loadLevel(level: Level): void {
        this.unloadLevel();
        this.activeLevel = level;
        level.draw();
    }

    public unloadLevel(): void {
        if (this.levelIsActive()) {
            this.activeLevel?.destroy(true);
            this.activeLevel = null;
        }
    }

    /**
     * @Note initializes a node on a line 
     * - also adds the new graphic to the rootGraphics
     */
    public initializeLineNode(line: Line = this.activeLevel?.getRandomLine() as Line) {
        this.lineNodes.push(new LineNode(
            this.parentGraphic, 
            line.getLinearRepresentation(), 
            this.activeLevel?.getDistancedBufferedEndCoordinate(line) as Coordinate));
    }

    /**
     * @Note destroys the node
     */
    public destroyLineNode() {

    }

    /**
     * @Note moves all the nodes
     */
    public updateNodes() {

    }

    public update(delta: number): void {

    }
}