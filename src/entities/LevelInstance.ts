import { Graphics, TickerCallback } from "pixi.js";
import Line from "./Line";
import LineNode from "./LineNode";
import Level from "./abstract/AbstractLevel";
import Coordinate from "./Coordinate";


export default class LevelInstance {
    private rootGraphics: Graphics;
    private activeLevel: Level | null;
    private score: number;
    private highestScore: number;
    private lineNodes: LineNode[];
    private failStreak: number;
    private totalFrameCount: number;
    
    constructor(rootGraphics: Graphics) {
        this.rootGraphics = rootGraphics;
        this.activeLevel = null;
        this.score = 0;
        this.highestScore = 0;
        this.lineNodes = [];
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
    public initializeLineNode(line: Line = this.activeLevel?.getRandomLine() as Line): void {
        this.lineNodes.push(new LineNode(this.rootGraphics, line.getLinearRepresentation())); //needs to be fixed
    }

    /**
     * @Note destroys the node
     */
    public destroyLineNodes(): void {
        for (let node of this.lineNodes) {
            if (node.canBeDestroyed()) {
                this.lineNodes = this.lineNodes.filter((currentNode) => currentNode !== node);
                node.destroy(true);
                this.resetScore();
                this.failStreak++;
            }
        }
    }

    public intercept(): void {
        for (let node of this.lineNodes) {
            let from: Coordinate = this.activeLevel?.getDistancedBufferedEndCoordinate(node.getLinearRepresentation()) as Coordinate;
            if (node.canBeIntercepted(from)) {
                console.log("CAN BE INTERCEPTED");
            }
        }
    }

    /**
     * @Note moves all the nodes
     */
    public updateNodes(delta: number): void {
        for (let node of this.lineNodes) node.update(delta, this.activeLevel?.distance as number);
    }

    /**
     * @Note Random sequence
     * @returns TickerCallback
     */
    public getInstanceTicker(): TickerCallback<any> { 
        const speedMultiplier: number = this.activeLevel?.getNodeSpeedMultiplier() as number;
        const cadenceMultiplier: number = this.activeLevel?.getCadenceMultiplier() as number;
        const framesBeforeNodeUpdate: number = this.activeLevel?.getFramesBeforeNodeUpdate() as number;
        const framesBeforeNodeInitialization: number = this.activeLevel?.getFramesBeforeNodeInitialization() as number;
        return (delta: number) => {
            if (this.totalFrameCount % Math.floor(framesBeforeNodeUpdate * speedMultiplier) == 0) {
                this.updateNodes(delta); 
                this.destroyLineNodes();
            } 
            
            if (this.totalFrameCount % Math.floor(framesBeforeNodeInitialization * cadenceMultiplier) == 0) {
                this.initializeLineNode();
            }

            this.intercept();
            if (this.totalFrameCount > 200) this.totalFrameCount = 0;
            this.totalFrameCount++;
        };
    }
}