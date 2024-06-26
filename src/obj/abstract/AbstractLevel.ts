import { Container } from "pixi.js";
import { InterceptionPercentages, LevelOptions, LineObject } from "../../../types";
import { ApplicationUtils } from "../../util/ApplicationUtils";
import { Coordinate } from "../Coordinate";
import { WindowPresets } from "../../util/WindowPresets";
import { Buildable } from "../../util/Buildable";

export enum TriggerKeys {
    A = "A",
    D = "D",
    W = "W",
    X = "X",
    Y = "Y",
    B = "B",
    DOWN = "Down",
    UP = "Up",
    LEFT = "Left",
    RIGHT = "Right"
}

/**
 * @description Not instantiable Object that encapsulates the data relative to each level
 */
export abstract class AbstractLevel extends Container implements Buildable {
    public distancePerFrame: number;
    public distanceToIntercept: number;
    public distanceToInterceptMultiplier: number;
    public framesBeforeNodeUpdate: number;
    public nodeSpeedMultiplier: number;
    public framesBeforeNodeInitialization: number;
    public cadenceMultiplier: number;
    public lineObjects: LineObject[];
    public interceptionPercentages: InterceptionPercentages;
    public disposableTextCoordinate: Coordinate;
    public randomInitializationFluctuationPercentage: number;
    public randomSpeedFluctuationPercentage: number;

    constructor(options: LevelOptions) {
        super()
        this.distancePerFrame = options.distancePerFrame ? options.distancePerFrame : 2;
        this.distanceToIntercept = options.distanceToIntercept ? options.distanceToIntercept : 60;
        this.distanceToInterceptMultiplier = options.distanceToInterceptMultiplier ? options.distanceToInterceptMultiplier : 1.2;
        this.framesBeforeNodeUpdate = options.framesBeforeNodeUpdate ? options.framesBeforeNodeUpdate : 10;
        this.nodeSpeedMultiplier = options.nodeSpeedMultiplier ? options.nodeSpeedMultiplier : 1;
        this.framesBeforeNodeInitialization = options.framesBeforeNodeInitialization ? options.framesBeforeNodeInitialization : 60;
        this.cadenceMultiplier = options.cadenceMultiplier ? options.cadenceMultiplier : 1;
        this.lineObjects = [];
        this.interceptionPercentages = options.interceptionPercentages ? options.interceptionPercentages : ApplicationUtils.DEFAULT_INTERCEPTION_PERCENTAGES; 
        this.disposableTextCoordinate = options.disposableTextCoordinate ? options.disposableTextCoordinate : WindowPresets.CENTER_COORDINATE;
        this.randomInitializationFluctuationPercentage = options.randomInitializationFluctuationPercentage ? options.randomInitializationFluctuationPercentage : 0.5;
        this.randomSpeedFluctuationPercentage = options.randomSpeedFluctuationPercentage ? options.randomSpeedFluctuationPercentage : 0.5;
        this.build();
    }

    public abstract build(): void;

    public getRandomLineObject(): LineObject {
        return ApplicationUtils.getRandomArrayElement<LineObject>(this.lineObjects);
    }

    public addLineObject(lineObject: LineObject): void {
        this.lineObjects.push(lineObject);
        this.addChild(lineObject.line);
    }

    public unStage() {
        this.parent.removeChild(this);
        this.destroy({texture: false});
    }
}