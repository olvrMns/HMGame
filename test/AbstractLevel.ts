import { AnimatedSprite, Container } from "pixi.js";
import { Line } from "./Line";
import {ApplicationUtils} from "./ApplicationUtils";
import { Coordinate } from "./Coordinate";

/**
 * @description Not instantiable Object that encapsulates the data relative to each level
 */
export abstract class AbstractLevel extends Container  {
    public backgroundSprite: AnimatedSprite;
    public distancePerFrame: number;
    public distanceToIntercept: number;
    public distanceToInterceptMultiplier: number;
    public framesBeforeNodeUpdate: number;
    public nodeSpeedMultiplier: number;
    public framesBeforeNodeInitialization: number;
    public cadenceMultiplier: number;
    public lines: Line[];

    constructor(
        backgroundSprite: AnimatedSprite, 
        distancePerFrame: number = 2,
        distanceToIntercept: number = 30,
        distanceToInterceptMultiplier: number = 1.2,
        framesBeforeNodeUpdate: number = 10,
        nodeSpeedMultiplier: number = 1,
        framesBeforeNodeInitialization: number = 60,
        cadenceMultiplier: number = 1) {

        super()
        this.backgroundSprite = backgroundSprite;
        this.distancePerFrame = distancePerFrame;
        this.distanceToIntercept = distanceToIntercept;
        this.distanceToInterceptMultiplier = distanceToInterceptMultiplier;
        this.framesBeforeNodeUpdate = framesBeforeNodeUpdate;
        this.nodeSpeedMultiplier = nodeSpeedMultiplier;
        this.framesBeforeNodeInitialization = framesBeforeNodeInitialization;
        this.cadenceMultiplier = cadenceMultiplier;
        this.lines = [];
    }

    public abstract build(): void;

    public getRandomLine(): Line {
        return ApplicationUtils.getRandomArrayElement<Line>(this.lines);
    }

    public addLine(line: Line): void {
        this.lines.push(line);
    }
}