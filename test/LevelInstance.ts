import { Application, Container } from "pixi.js";
import { AbstractLevel } from "./AbstractLevel";
import { EnemyNode } from "./EnemyNode";


/**
 * @description Object containing the logic/lifecycle of the game
 * 
 */
export class LevelInstance {
    private static instance: LevelInstance;
    private application: Application;
    private level: AbstractLevel | undefined;
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
}