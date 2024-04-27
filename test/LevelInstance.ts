import { Graphics } from "pixi.js";
import Level from "../src/entities/abstract/AbstractLevel";


export default class LevelInstance {
    private parentGraphic: Graphics;
    private activeLevel: Level | null;
    private score: number;
    
    constructor(parentGraphic: Graphics) {
        this.parentGraphic = parentGraphic;
        this.score = 0;
        this.activeLevel = null;
    }

    public resetScore(): void {
        this.score = 0;
    }

    public incrementScore(): void {
        this.score++;
    }

    public loadLevel(level: Level): void {
        this.activeLevel = level;
        level.draw();
    }

    public unloadLevel(): void {
        this.activeLevel = null;
    }

    public update(delta: number): void {

    }
}