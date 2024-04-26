import { Graphics } from "pixi.js";
import Level from "../src/entities/abstract/AbstractLevel";
import { Levels } from "../src/util/typings";


export default class LevelInstance {
    private rootGraphic: Graphics;
    private activeLevel: Level | null;
    private score: number;
    
    constructor() {
        this.rootGraphic = new Graphics;
        this.score = 0;
        this.activeLevel = null;
    }

    public resetScore() {

    }

    public incrementScore() {

    }

    public load(level: Level) {

    }

    public update() {

    }
}