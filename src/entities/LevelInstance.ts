import { Graphics, TickerCallback } from "pixi.js";
import { Updatable } from "../util/Updatable";
import Coordinate from "./Coordinate";
import Line from "./Line";
import LineNode from "./LineNode";
import Level from "./abstract/AbstractLevel";


export default class LevelInstance {
    private parentGraphic: Graphics;
    private nodeSpeedMultiplier: number;
    private cadenceMultiplier: number;
    private activeLevel: Level | null;
    private score: number;
    private highestScore: number;
    private lineNodes: LineNode[];
    private distance: number;
    private failStreak: number;
    private totalFrameCount: number;
    
    constructor(parentGraphic: Graphics) {
        this.parentGraphic = parentGraphic;
        this.nodeSpeedMultiplier = 1;
        this.cadenceMultiplier = 1;
        this.activeLevel = null;
        this.score = 0;
        this.highestScore = 0;
        this.lineNodes = [];
        this.distance = 9;
        this.failStreak = 0;
        this.totalFrameCount = 0;
    }

    public resetHighestScore(): void {
        this.highestScore = 0;
    }

    public resetScore(): void {
        this.score = 0;
    }

    public resetFailStreak(): void {
        this.failStreak = 0;
    }

    public resetTotalFrameCount(): void {
        this.totalFrameCount = 0;
    }

    public levelIsActive(): boolean {
        return this.activeLevel != null;
    }

    public setHighestScore(highestScore: number): void {
        this.highestScore = highestScore;
    }

    public incrementScore(): void {
        this.score++;
        if (this.highestScore < this.score) this.highestScore = this.score;
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
        this.lineNodes.push(new LineNode(this.parentGraphic, line.getLinearRepresentation())); //needs to be fixed
    }

    /**
     * @Note destroys the node
     */
    public destroyLineNodes() {
        for (let node of this.lineNodes) {
            if (node.canBeDestroyed()) {
                console.log("CAN BE DESTROYED");
                //node.destroy(true);
                //remove from array
                //this.resetScore();
            }
        }
    }

    /**
     * @Note moves all the nodes
     */
    public updateNodes(delta: number) {
        for (let node of this.lineNodes) node.update(delta, this.distance);
    }

    public getInstanceTicker(): TickerCallback<any> {
        this.initializeLineNode();
        return (delta: number) => {
            if (this.totalFrameCount % 5 == 0) {
                this.updateNodes(delta); 
                this.destroyLineNodes();
            } 
            this.totalFrameCount++;
        };
    }
}