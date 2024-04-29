import { Graphics, TickerCallback } from "pixi.js";
import Line from "./Line";
import LineNode from "./LineNode";
import Level from "./abstract/AbstractLevel";


export default class LevelInstance {
    private parentGraphic: Graphics;
    private activeLevel: Level | null;
    private score: number;
    private highestScore: number;
    private lineNodes: LineNode[];
    private distance: number;
    private failStreak: number;
    private totalFrameCount: number;
    private framesBeforeNodeUpdate: number;
    private framesBeforeNodeInitialization: number;
    
    constructor(parentGraphic: Graphics) {
        this.parentGraphic = parentGraphic;
        this.activeLevel = null;
        this.score = 0;
        this.highestScore = 0;
        this.lineNodes = [];
        this.distance = 15;
        this.failStreak = 0;
        this.totalFrameCount = 0;
        this.framesBeforeNodeUpdate = 20;
        this.framesBeforeNodeInitialization = 50;
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
                this.lineNodes = this.lineNodes.filter((currentNode) => currentNode !== node);
                node.destroy(true);
                this.resetScore();
                this.failStreak++;
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
        const speedMultiplier = this.activeLevel?.getNodeSpeedMultiplier();
        const cadenceMultiplier = this.activeLevel?.getCadenceMultiplier();
        return (delta: number) => {
            if (this.totalFrameCount % (Math.floor(this.framesBeforeNodeUpdate * (speedMultiplier ? speedMultiplier : 1))) == 0) {
                this.updateNodes(delta); 
                this.destroyLineNodes();
            } 
            
            if (this.totalFrameCount % Math.floor(this.framesBeforeNodeInitialization * (cadenceMultiplier ? cadenceMultiplier : 1)) == 0) {
                this.initializeLineNode();
            }
            this.totalFrameCount++;
        };
    }
}