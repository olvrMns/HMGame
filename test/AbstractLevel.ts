import { AnimatedSprite, Sprite } from "pixi.js";

/**
 * @description Not instantiable Object that encapsulates the data relative to each level
 */
export class AbstractLevel {
    public backgroundSprite: Sprite | AnimatedSprite;
    public distanceToIntercept: number;
    public travelingDistance: number;
    public framesBeforeNodeUpdate: number;
    public framesBeforeNodeInitialization: number;
    public nodeSpeedMultiplier: number;
    public cadenceMultiplier: number;
    public distanceToInterceptMultiplier: number;
    //List of Lines
}