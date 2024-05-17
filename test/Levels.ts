import { AnimatedSprite } from "pixi.js";
import { AbstractLevel, TriggerKeys } from "./AbstractLevel";
import { ApplicationTextures, ApplicationSrpites } from "./AssetLoader";
import { Line } from "./Line";
import { WindowPresets } from "./WindowPresets";
import { Coordinate } from "./Coordinate";

//10, 150, 50, 1.5, 5, 0.5
export class Space1 extends AbstractLevel {
    constructor() {
        super({
            distancePerFrame: 10,
            distanceToIntercept: 150,
            framesBeforeNodeInitialization: 90,
            distanceToInterceptMultiplier: 1.5,
            framesBeforeNodeUpdate: 5,
            nodeSpeedMultiplier: 0.5,
        });
    }

    public build(): void {
        //need to make core attribute to change speed of animation
        const core1: AnimatedSprite = new AnimatedSprite(ApplicationTextures.PLANET1);
        core1.x = WindowPresets.CENTER_COORDINATE.x;
        core1.y = WindowPresets.CENTER_COORDINATE.y;
        core1.scale.x = 0.5;
        core1.scale.y = 0.5;
        core1.anchor.x = 0.5;
        core1.anchor.y = 0.5;
        core1.animationSpeed = 0.2;
        core1.play();
        this.addChild(ApplicationSrpites.SPACE_BACKGROUND1);
        this.addChild(core1);

        // this.addLineObject({
        //     triggerKey: TriggerKeys.Y, 
        //     enemyTextures: ApplicationTextures.SPACESHIP2, 
        //     line: Line.of(WindowPresets.PSC_UPPER_MIDDLE, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 180, true)});
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
            line: Line.of(WindowPresets.PSC_MIDDLE_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, -90, true)});
        this.addLineObject({
            triggerKey: TriggerKeys.X, 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(WindowPresets.PSC_UPPER_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept,  -120, true)});
        this.addLineObject({
            triggerKey: TriggerKeys.X, 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(WindowPresets.PSC_BOTTOM_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, -60, true)});
        this.addLineObject({
            triggerKey: TriggerKeys.X, 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(WindowPresets.PSC_BOTTOM_MIDDLE, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 360, true)});
    }
}

export class ClassicGH extends AbstractLevel {

    constructor() {
        super({
            distancePerFrame: 10,
            distanceToIntercept: 60,
            framesBeforeNodeInitialization: 60,
            distanceToInterceptMultiplier: 1.5,
            framesBeforeNodeUpdate: 5,
            nodeSpeedMultiplier: 0.5,
        });
    }

    public build(): void {
        const xLineLimit: number = WindowPresets.WINDOW_WIDTH * 0.1;
        const collisionLine: Line = Line.of(Coordinate.of(xLineLimit, WindowPresets.WINDOW_HEIGHT), Coordinate.of(xLineLimit, 0), 0, 0, true);
        this.addChild(ApplicationSrpites.SPACE_BACKGROUND1);
        this.addChild(collisionLine);

        this.addLineObject({
            triggerKey: TriggerKeys.A, 
            enemyTextures: ApplicationTextures.SPACESHIP2, 
            line: Line.of(Coordinate.of(WindowPresets.WINDOW_WIDTH, 100), Coordinate.of(xLineLimit, 100), this.distanceToIntercept,  270, true)});

        this.addLineObject({
            triggerKey: TriggerKeys.X, 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(Coordinate.of(WindowPresets.WINDOW_WIDTH, 200), Coordinate.of(xLineLimit, 200), this.distanceToIntercept,  270, true)});

        this.addLineObject({
            triggerKey: TriggerKeys.X, 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(Coordinate.of(WindowPresets.WINDOW_WIDTH, 300), Coordinate.of(xLineLimit, 300), this.distanceToIntercept,  270, true)});

        this.addLineObject({
            triggerKey: TriggerKeys.X, 
            enemyTextures: ApplicationTextures.SPACESHIP1, 
            line: Line.of(Coordinate.of(WindowPresets.WINDOW_WIDTH, 400), Coordinate.of(xLineLimit, 400), this.distanceToIntercept,  270, true)});
    }
}