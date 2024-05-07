import { Application, BitmapFont, Container, DisplayObject, TickerCallback } from "pixi.js";
import { AbstractLevel } from "./AbstractLevel";
import { EnemyNode } from "./EnemyNode";
import { Line } from "./Line";


/**
 * @description Object containing the logic/lifecycle of the game
 * 
 */
export class LevelInstance {
    private static instance: LevelInstance;
    private application: Application;
    public level: AbstractLevel | undefined;
    private score: number = 0;
    private highestScore: number = 0;
    private failStreak: number = 0;
    private frameCount: number = 0;
    private enemyNodes: EnemyNode[] = [];

    private constructor(application: Application) {
        this.application = application;
    }

    public static getInstance(application: Application) {
        if (!this.instance) this.instance = new LevelInstance(application);
        return this.instance;
    }

    public levelIsActive(): boolean {
        return this.level != null;
    }

    public initializeEnemyNode(line: Line = this.level?.getRandomLine() as Line): void {
        this.enemyNodes.push(new EnemyNode(
            line.getRandomPermittedAsset(), 
            line.linearRepresentation, 
            line.interceptionThresholdCoordinate));
    }

    /**
     * @Note should probably use .destroy with options...
     * @param enemyNode 
     */
    public destroyEnemyNode(enemyNode: EnemyNode) {
        this.enemyNodes.filter(node => node !== enemyNode);
        enemyNode.destroy(true);
    }

    public destroyLineNodes(): void {
        for (let node of this.enemyNodes) {
            if (node.canBeDestroyed()) {
                this.destroyEnemyNode(node);
                //this.resetScore();
                //this.failStreak++;
            }
        }
    }

    /**
     * @Note moves all the nodes
     */
    public updateNodes(delta: number): void {
        for (let node of this.enemyNodes) node.updateNode(delta, this.level?.distancePerFrame as number);
    }

    /**
     * @Note Random sequence
     * @returns TickerCallback
     */
    public getInstanceTicker(): TickerCallback<any> { 
        const speedMultiplier: number = this.level?.nodeSpeedMultiplier as number;
        const cadenceMultiplier: number = this.level?.cadenceMultiplier as number;
        const framesBeforeNodeUpdate: number = this.level?.framesBeforeNodeUpdate as number;
        const framesBeforeNodeInitialization: number = this.level?.framesBeforeNodeInitialization as number;
        return (delta: number) => {
            if (this.frameCount % Math.floor(framesBeforeNodeUpdate * speedMultiplier) == 0) {
                this.updateNodes(delta); 
                this.destroyLineNodes();
            } 
            
            if (this.frameCount % Math.floor(framesBeforeNodeInitialization * cadenceMultiplier) == 0) {
                this.initializeEnemyNode();
            }
            if (this.frameCount > 200) this.frameCount = 0;
            this.frameCount++;
        };
    }
}