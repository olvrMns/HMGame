import { AnimatedSprite } from "pixi.js";
import { ApplicationSrpites, ApplicationTextures } from "../util/AssetLoader";
import { WindowPresets } from "../util/WindowPresets";
import { AbstractLevel } from "./abstract/AbstractLevel";
import { Coordinate } from "./Coordinate";
import { Line } from "./Line";
import { Enemies, enemiesData } from "./EnemyData";
import { InterceptionAreaAliases } from "./DisposableTextPresetOptions";

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

    public override build(): void {
        const core1: AnimatedSprite = new AnimatedSprite(ApplicationTextures.PLANET1);
        core1.x = WindowPresets.CENTER_COORDINATE.x;
        core1.y = WindowPresets.CENTER_COORDINATE.y;
        core1.scale.x = 1;
        core1.scale.y = 1;
        core1.anchor.x = 0.5;
        core1.anchor.y = 0.5;
        core1.animationSpeed = 0.2;
        core1.play();
        this.addChild(ApplicationSrpites.SPACE_BACKGROUND1);
        this.addChild(core1);
        
        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP1],
            line: Line.of(WindowPresets.PSC_UPPER_MIDDLE, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 180, this.interceptionPercentages, true)});
        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP1],
            line: Line.of(WindowPresets.PSC_UPPER_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, -120, this.interceptionPercentages, true)});
        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP1],
            line: Line.of(WindowPresets.PSC_UPPER_LEFT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 120, this.interceptionPercentages, true)});
        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP1],
            line: Line.of(WindowPresets.PSC_BOTTOM_LEFT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 60, this.interceptionPercentages, true)});
        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP1],
            line: Line.of(WindowPresets.PSC_MIDDLE_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, -90, this.interceptionPercentages, true)});
        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP2],
            line: Line.of(WindowPresets.PSC_MIDDLE_LEFT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept,  90, this.interceptionPercentages, true)});
        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP1],
            line: Line.of(WindowPresets.PSC_BOTTOM_RIGHT, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, -60, this.interceptionPercentages, true)});
        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP1],
            line: Line.of(WindowPresets.PSC_BOTTOM_MIDDLE, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 360, this.interceptionPercentages, true)});
    }
}

export class ClassicGH extends AbstractLevel {

    constructor() {
        super({
            distancePerFrame: 10,
            distanceToIntercept: 150,
            framesBeforeNodeInitialization: 100,
            distanceToInterceptMultiplier: 1.5,
            framesBeforeNodeUpdate: 5,
            nodeSpeedMultiplier: 0.5,
            disposableTextCoordinate: Coordinate.of(WindowPresets.PSC_BOTTOM_RIGHT.x - 150, WindowPresets.PSC_BOTTOM_RIGHT.y - 150),
            randomInitializationFluctuationPercentage: 0.6
        });
    }

    public override build(): void {
        const xLineLimit: number = WindowPresets.WINDOW_WIDTH * 0.1;
        this.addChild(ApplicationSrpites.SPACE_BACKGROUND3);

        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP3],
            line: Line.of(Coordinate.of(WindowPresets.WINDOW_WIDTH, 100), Coordinate.of(xLineLimit, 100), this.distanceToIntercept,  270, this.interceptionPercentages, true)});
        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP3],
            line: Line.of(Coordinate.of(WindowPresets.WINDOW_WIDTH, 200), Coordinate.of(xLineLimit, 200), this.distanceToIntercept,  270, this.interceptionPercentages, true)});

        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP1],
            line: Line.of(Coordinate.of(WindowPresets.WINDOW_WIDTH, 300), Coordinate.of(xLineLimit, 300), this.distanceToIntercept,  270, this.interceptionPercentages, true)});

        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP1],
            line: Line.of(Coordinate.of(WindowPresets.WINDOW_WIDTH, 400), Coordinate.of(xLineLimit, 400), this.distanceToIntercept,  270, this.interceptionPercentages, true)});
    }
}

export class Space2 extends AbstractLevel {

    constructor() {
        super({
            distancePerFrame: 5,
            distanceToIntercept: 100,
            framesBeforeNodeInitialization: 60,
            distanceToInterceptMultiplier: 1.3,
            framesBeforeNodeUpdate: 5,
            nodeSpeedMultiplier: 0.8,
            interceptionPercentages: [
                {areaAlias: InterceptionAreaAliases.FINE, percentage: 1, areaColor: "purple"},
                {areaAlias: InterceptionAreaAliases.PERFECT, percentage: 0.1, areaColor: "pink"}
            ]
        });
    }

    public override build(): void {
        this.addChild(ApplicationSrpites.SPACE_BACKGROUND2);
        const core1: AnimatedSprite = new AnimatedSprite(ApplicationTextures.PLANET4);
        core1.x = WindowPresets.CENTER_COORDINATE.x;
        core1.y = WindowPresets.CENTER_COORDINATE.y;
        core1.scale.x = 1;
        core1.scale.y = 1;
        core1.anchor.x = 0.5;
        core1.anchor.y = 0.5;
        core1.animationSpeed = 0.2;
        core1.play();
        this.addChild(core1);

        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP3],
            line: Line.of(WindowPresets.PSC_BOTTOM_MIDDLE, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 360, this.interceptionPercentages, true)
        });

        this.addLineObject({
            enemyData: enemiesData[Enemies.SHIP3],
            line: Line.of(WindowPresets.PSC_UPPER_MIDDLE, WindowPresets.CENTER_COORDINATE, this.distanceToIntercept, 180, this.interceptionPercentages, true)
        });
    }
}

export class Space3 extends AbstractLevel {

    constructor() {
        super({
            distancePerFrame: 4,
            distanceToIntercept: 80,
            framesBeforeNodeInitialization: 50,
            distanceToInterceptMultiplier: 1.3,
            framesBeforeNodeUpdate: 4,
            nodeSpeedMultiplier: 1,
            randomInitializationFluctuationPercentage: 0.7,
            interceptionPercentages: [
                {areaAlias: InterceptionAreaAliases.FINE, percentage: 1, areaColor: "purple"},
                {areaAlias: InterceptionAreaAliases.PERFECT, percentage: 0.15, areaColor: "green"}
            ]
        });
    }

    public override build(): void {

        const yLimit = WindowPresets.WINDOW_HEIGHT * 0.8;
        const divisor = 10;
        const dividedWidth = WindowPresets.WINDOW_WIDTH/divisor;
        let currentX = dividedWidth/2;

        this.addChild(ApplicationSrpites.SPACE_BACKGROUND5);
        const core1: AnimatedSprite = new AnimatedSprite(ApplicationTextures.PLANET3);
        core1.x = WindowPresets.CENTER_COORDINATE.x;
        core1.y = WindowPresets.CENTER_COORDINATE.y;
        core1.scale.x = 1;
        core1.scale.y = 1;
        core1.anchor.x = 0.5;
        core1.anchor.y = 0.5;
        core1.animationSpeed = 0.8;
        core1.play();
        this.addChild(core1);

        for (let elem = 0; elem < divisor; elem++) {
            this.addLineObject({
                enemyData: enemiesData[Enemies.SHIP3],
                line: Line.of(Coordinate.of(currentX, 0), Coordinate.of(currentX, yLimit), this.distanceToIntercept, 180, this.interceptionPercentages, true)
            });
            currentX+=dividedWidth;
        };
    }
}