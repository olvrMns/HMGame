import { LineObject } from "guki-input-controller";
import { Container } from "pixi.js";
import { ApplicationUtils } from "./ApplicationUtils";

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
export abstract class AbstractLevel extends Container  {
    public distancePerFrame: number;
    public distanceToIntercept: number;
    public distanceToInterceptMultiplier: number;
    public framesBeforeNodeUpdate: number;
    public nodeSpeedMultiplier: number;
    public framesBeforeNodeInitialization: number;
    public cadenceMultiplier: number;
    public lineObjects: LineObject[];

    constructor(
        distancePerFrame: number = 2,
        distanceToIntercept: number = 30,
        distanceToInterceptMultiplier: number = 1.2,
        framesBeforeNodeUpdate: number = 10,
        nodeSpeedMultiplier: number = 1,
        framesBeforeNodeInitialization: number = 60,
        cadenceMultiplier: number = 1) {

        super()
        this.distancePerFrame = distancePerFrame;
        this.distanceToIntercept = distanceToIntercept;
        this.distanceToInterceptMultiplier = distanceToInterceptMultiplier;
        this.framesBeforeNodeUpdate = framesBeforeNodeUpdate;
        this.nodeSpeedMultiplier = nodeSpeedMultiplier;
        this.framesBeforeNodeInitialization = framesBeforeNodeInitialization;
        this.cadenceMultiplier = cadenceMultiplier;
        this.lineObjects = [];
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
}