import { LineObject } from "./types";
import { Application, BitmapText, TickerCallback } from "pixi.js";
import { AbstractLevel, TriggerKeys } from "./AbstractLevel";
import { EnemyNode } from "./EnemyNode";
import InputManager from "guki-input-controller";


/**
 * @description Object containing the logic/lifecycle of the game
 * 
 */
export class LevelInstance {
    private static instance: LevelInstance;
    private application: Application;
    public level: AbstractLevel | undefined;
    private score: number = 0;
    private highestScore: number = 0;
    private failStreak: number = 0;
    private frameCount: number = 0;
    private enemyNodes: EnemyNode[];
    //private scoreBitMapText: BitmapText;

    private constructor(application: Application) {
        this.application = application;
        //this.scoreBitMapText = new BitmapText('0', {});
        this.enemyNodes = [];
    }

    public static getInstance(application: Application) {
        if (!this.instance) this.instance = new LevelInstance(application);
        return this.instance;
    }

    public levelIsActive(): boolean {
        return this.level != null;
    }

    public incrementScore(): void {
        this.score++;
        if (this.highestScore < this.score) this.highestScore = this.score;
    }

    public resetScore(): void {
        this.score = 0;
    }

    /**
     * @description resets instance attributes
     */
    public reset() {    
        this.resetScore();
    }

    public initializeEnemyNode(lineObject: LineObject = this.level?.getRandomLineObject() as LineObject): void {
        let enemyNode: EnemyNode = EnemyNode.of(lineObject, {angle: lineObject.line.inclination, scale: 0.5});
        this.enemyNodes.push(enemyNode);
        this.level?.addChild(enemyNode);
    }

    /**
     * @Note should probably use .destroy with options...
     * @param enemyNode 
     */
    public destroyEnemyNode(enemyNode: EnemyNode) {
        this.enemyNodes = this.enemyNodes.filter(node => node !== enemyNode);
        enemyNode.destroy({texture: false});
    }

    public destroyLineNodes(): void {
        for (let node of this.enemyNodes) {
            if (node.canBeDestroyed()) {
                this.destroyEnemyNode(node);
                this.resetScore();
                //this.failStreak++;
            }
        }
    }

    /**
     * @Note moves all the nodes
     */
    public updateNodes(delta: number): void {
        for (let node of this.enemyNodes) node.updateNode(delta, this.level?.distancePerFrame as number);
    }

    public sortEnemyNodes(): void {
        let closestDistance: number = 0;
        let currentDistance: number;
        let sortedEnemyNodes: EnemyNode[] = [];
        for (let node of this.enemyNodes) {
            currentDistance = node.getDistanceToEndPoint();
            if (currentDistance <= closestDistance && node.hasNotBeenTriggered) {
                sortedEnemyNodes.unshift(node);
                closestDistance = currentDistance;
            } else sortedEnemyNodes.push(node);
        }
        if (this.enemyNodes.length > 0) this.enemyNodes[0].accentuate();
    }

    /**
     * @problems
     * - the first node in the list isn't necessarily the closest one to their end point on the screen
     * - ELSE?
     * @param key 
     */
    public onKeyPress(key: string) {
        key = key.toUpperCase();
        if (Object.keys(TriggerKeys).includes(key)) {
            console.log("NUMBER OF ENEMIES : " + this.enemyNodes.length);
            for (let node of this.enemyNodes) {
                if (node.triggerKey === key && node.canBeIntercepted() && node.hasNotBeenTriggered) {
                    this.destroyEnemyNode(node);
                    this.incrementScore();
                    //DESTRCTUCTION ANIMATION ON DESTRUCTION...
                    //EACH INTERCEPTION SHOULD MAKE THE PLANET FASTER
                    console.log(this.score);
                    break;
                } else if (node.hasNotBeenTriggered) {
                    node.invalidate();
                    this.resetScore();
                    console.log("MISSED - NODE ACCELERATION");
                    break;
                } else {
                    console.log("ELSE?");
                    break;
                }
            }
        }
    }

    public getInstanceKeyboardListenner(keyboardEvent: KeyboardEvent): void {
        this.onKeyPress(keyboardEvent.key);
    }

    public onControllerPress(inputManager: InputManager) {
        if (inputManager.gamepad.justPressed[0]) this.onKeyPress(inputManager.gamepad.pressed[0]);
    }

    /**
     * @Note Random sequence
     * @returns TickerCallback
     */
    public getInstanceTicker(): TickerCallback<any> { 
        const speedMultiplier: number = this.level?.nodeSpeedMultiplier as number;
        const cadenceMultiplier: number = this.level?.cadenceMultiplier as number;
        const framesBeforeNodeUpdate: number = this.level?.framesBeforeNodeUpdate as number;
        const framesBeforeNodeInitialization: number = this.level?.framesBeforeNodeInitialization as number;
        const inputManager = new InputManager();
        inputManager.init();
        return (delta: number) => {
            this.sortEnemyNodes();
            inputManager.update();
            if (this.frameCount % Math.floor(framesBeforeNodeUpdate * speedMultiplier) == 0) {
                this.updateNodes(delta); 
                this.destroyLineNodes();
            } 
            
            if (this.frameCount % Math.floor(framesBeforeNodeInitialization * cadenceMultiplier) == 0) {
                this.initializeEnemyNode();
            }

            if (this.frameCount > 10000) this.frameCount = 0;
            this.frameCount++;

            this.onControllerPress(inputManager);
        };
    }
}