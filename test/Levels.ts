import { AnimatedSprite } from "pixi.js";
import { AbstractLevel, TriggerKeys } from "./AbstractLevel";
import { ApplicationTextures, ApplicationSrpites } from "./AssetLoader";
import { Line } from "./Line";
import { WindowPresets } from "./WindowPresets";

export class Space1 extends AbstractLevel {
    constructor() {
        super(10, 100, 1.5, 5, 0.9, 250, 0.9);
    }

    public build(): void {
        //need to make core attribute to change speed of animation
        const core1: AnimatedSprite = new AnimatedSprite(ApplicationTextures.PLANET1);
        core1.x = WindowPresets.CENTER_COORDINATE.x;
        core1.y = WindowPresets.CENTER_COORDINATE.y;
        core1.scale.x = 0.2;
        core1.scale.y = 0.2;
        core1.anchor.x = 0.5;
        core1.anchor.y = 0.5;
        core1.play();

        this.addChild(ApplicationSrpites.SPACE_BACKGROUND1);
        this.addChild(core1);

        this.addLineObject({
            triggerKey: TriggerKeys.X, 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(WindowPresets.PSC_MIDDLE_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, -90, false)});
        // this.addLineObject({
        //     triggerKey: TriggerKeys.Y, 
        //     enemyTextures: ApplicationTextures.SPACESHIP2, 
        //     line: Line.of(WindowPresets.PSC_UPPER_MIDDLE, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 180, true)});
        this.addLineObject({
            triggerKey: TriggerKeys.X, 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(WindowPresets.PSC_UPPER_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept,  -120, false)});
        // this.addLineObject({
        //     triggerKey: TriggerKeys.Y, 
        //     enemyTextures: ApplicationTextures.SPACESHIP2, 
        //     line: Line.of(WindowPresets.PSC_UPPER_LEFT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 120, false)});
        // this.addLineObject({
        //     triggerKey: TriggerKeys.Y, 
        //     enemyTextures: ApplicationTextures.SPACESHIP2, 
        //     line: Line.of(WindowPresets.PSC_BOTTOM_LEFT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 60, true)});
        this.addLineObject({
            triggerKey: TriggerKeys.X, 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(WindowPresets.PSC_BOTTOM_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, -60, false)});
        this.addLineObject({
            triggerKey: TriggerKeys.X, 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(WindowPresets.PSC_BOTTOM_MIDDLE, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 360, false)});
    }
}