import InputManager from "guki-input-controller";
import { Application, BitmapFont, BitmapText, TickerCallback } from "pixi.js";
import { AbstractLevel, TriggerKeys } from "./AbstractLevel";
import { DisplayableNumber } from "./DisplayableNumber";
import { EnemyNode } from "./EnemyNode";
import { LineObject } from "./types";

/**
 * @description Object containing the logic/lifecycle of the game
 */
export class LevelInstance {
    private static instance: LevelInstance;
    private application: Application;
    public level: AbstractLevel | undefined;
    private score: DisplayableNumber;
    private highestScore: DisplayableNumber;
    private failStreak: DisplayableNumber;
    private frameCount: number = 0;
    private enemyNodes: EnemyNode[];

    private constructor(application: Application) {
        this.application = application;
        /**
         * @Note Only works on reload
         * - could be a webpack problem
         * - or await?
         * - or this https://chriscourses.com/blog/loading-fonts-with-webpack ?
         */
        BitmapFont.from("PixelMapFont1", {fontFamily: 'Pixelfont1', fontSize: 60, fill: '#c4d4b1'});
        this.score = new DisplayableNumber({x: 50, y: 50});
        this.highestScore = new DisplayableNumber({x: 50, y: 150});
        this.failStreak = new DisplayableNumber({x: 50, y: 250});
        this.enemyNodes = [];
    }

    public static getInstance(application: Application) {
        if (!this.instance) this.instance = new LevelInstance(application);
        return this.instance;
    }

    public loadStats(): void {
        this.level?.addChild(this.score);
        this.level?.addChild(this.highestScore);
        this.level?.addChild(this.failStreak);
    }
    
    public levelIsActive(): boolean {
        return this.level != null;
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
                this.score.reset();
                this.failStreak.increment();
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
     * - should show an explosion on interception/death
     * - the first node in the list isn't necessarily the closest one to their end point on the screen
     * - ELSE?
     * @param key 
     */
    public onKeyPress(key: string) {
        key = key.toUpperCase();
        if (Object.keys(TriggerKeys).includes(key)) {
            for (let node of this.enemyNodes) {
                if (node.triggerKey === key && node.canBeIntercepted() && node.hasNotBeenTriggered) {
                    this.destroyEnemyNode(node);
                    this.score.increment();
                    this.failStreak.reset();
                    if (this.highestScore.getValue() < this.score.getValue()) this.highestScore.setValue(this.score.getValue());
                    break;
                } else if (node.hasNotBeenTriggered) {
                    node.invalidate();
                    this.score.reset();
                    break;
                } else {
                    break;
                }
            }
        }
    }

    public getInstanceKeyboardListenner(keyboardEvent: KeyboardEvent): void {
        this.onKeyPress(keyboardEvent.key);
    }

    public onControllerPress(inputManager: InputManager) {
        if (inputManager.gamepad.justPressed[0]) this.onKeyPress(inputManager.gamepad.justPressed[0]);
    }

    /**
     * @Note Random sequence
     * @returns TickerCallback
     */
    public getInstanceTicker(): TickerCallback<any> { 
        window.addEventListener("keydown", (keyboardEvent: KeyboardEvent) => this.getInstanceKeyboardListenner(keyboardEvent));
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