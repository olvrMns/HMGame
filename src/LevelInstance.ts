import { Graphics } from "pixi.js";
import Level from "./entities/abstract/AbstractLevel";
import {Updatable} from "./util/Updatable"


export default class LevelInstance implements Updatable {
    private parentGraphic: Graphics;
    private nodeSpeedMultiplier: number;
    private cadenceMultiplier: number;
    private activeLevel: Level | null;
    private score: number;
    
    constructor(parentGraphic: Graphics) {
        this.nodeSpeedMultiplier = 1;
        this.cadenceMultiplier = 1;
        this.parentGraphic = parentGraphic;
        this.score = 0;
        this.activeLevel = null;
    }

    public levelIsActive() {
        return this.activeLevel != null;
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
        this.activeLevel?.destroy(true);
        this.activeLevel = null;
    }

    /**
     * @Note initializes a node on a line
     */
    public initializeLineNode() {

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