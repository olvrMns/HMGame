import { Application, BitmapFont, Container, DisplayObject } from "pixi.js";
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

    // public initializeEnemyNode(line: Line = this.level?.getRandomLine() as Line): void {
    //     this.enemyNodes.push(new EnemyNode(
    //         this.enemyNodes, 
    //         line.linearRepresentation, 
    //         line.interceptionThresholdCoordinate));
    // }
}