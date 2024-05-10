import { AnimatedSprite } from "pixi.js";
import { AbstractLevel } from "./AbstractLevel";
import { ApplicationTextures, ApplicationSrpites } from "./AssetLoader";
import { Line } from "./Line";
import { WindowPresets } from "./WindowPresets";

export class Space1 extends AbstractLevel {
    constructor() {
        super(10, 100, 1.5, 20, 0.9, 5000, 0.9);
    }

    public build(): void {

        const core1: AnimatedSprite = new AnimatedSprite(ApplicationTextures.PLANET1);
        core1.x = WindowPresets.CENTER_COORDINATE.x;
        core1.y = WindowPresets.CENTER_COORDINATE.y;
        core1.scale.x = 0.5;
        core1.scale.y = 0.5;
        core1.anchor.x = 0.5;
        core1.anchor.y = 0.5;
        core1.play();

        this.addChild(ApplicationSrpites.SPACE_BACKGROUND1);
        this.addChild(core1);

        // this.addLineObject({
        //     keyboardKey: "A", 
        //     enemyTextures: ApplicationTextures.SPACESHIP1, 
        //     line: Line.of(WindowPresets.PSC_MIDDLE_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, true)});
        // this.addLineObject({
        //     keyboardKey: "D", 
        //     enemyTextures: ApplicationTextures.SPACESHIP2, 
        //     line: Line.of(WindowPresets.PSC_UPPER_MIDDLE, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, true)});
        // this.addLineObject({
        //     keyboardKey: "A", 
        //     enemyTextures: ApplicationTextures.SPACESHIP1, 
        //     line: Line.of(WindowPresets.PSC_UPPER_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, true)});
        this.addLineObject({
            keyboardKey: "A", 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(WindowPresets.PSC_UPPER_LEFT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, true)});

        // this.addLineObject({
        //     keyboardKey: "A", 
        //     enemyTextures: ApplicationTextures.SPACESHIP1, 
        //     line: Line.of(WindowPresets.PSC_BOTTOM_LEFT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, true)});
        // this.addLineObject({
        //     keyboardKey: "A", 
        //     enemyTextures: ApplicationTextures.SPACESHIP1, 
        //     line: Line.of(WindowPresets.PSC_BOTTOM_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, true)});
        // this.addLineObject({
        //     keyboardKey: "A", 
        //     enemyTextures: ApplicationTextures.SPACESHIP1, 
        //     line: Line.of(WindowPresets.PSC_BOTTOM_MIDDLE, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, true)});
    }
}