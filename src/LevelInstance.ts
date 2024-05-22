import InputManager from "guki-input-controller";
import { BitmapFont, TickerCallback } from "pixi.js";
import { LineObject } from "../types";
import { AbstractLevel, TriggerKeys } from "./obj/abstract/AbstractLevel";
import { DisplayableNumber } from "./obj/DisplayableNumber";
import { EnemyNode } from "./obj/EnemyNode";
import { Coordinate } from "./obj/Coordinate";
import { DisposableTextController } from "./obj/dataStructure/DisposableTextController";
import { TickerController } from "./obj/dataStructure/TickerController";

/**
 * @description Object containing the logic/lifecycle of the game
 */
export class LevelInstance {
    private static instance: LevelInstance | null;
    public level: AbstractLevel;
    private score: DisplayableNumber;
    private highestScore: DisplayableNumber;
    private failStreak: DisplayableNumber;
    private frameCount: number = 0;
    private enemyNodes: EnemyNode[] = [];
    private inputManager: InputManager = new InputManager();
    private disposableTextController: DisposableTextController;
    public tickerController: TickerController;

    private constructor(level: AbstractLevel) {
        this.level = level;
        this.initFonts();
        this.score = new DisplayableNumber({coordinate: Coordinate.of(50, 50)});
        this.highestScore = new DisplayableNumber({coordinate: Coordinate.of(50, 150)});
        this.failStreak = new DisplayableNumber({coordinate: Coordinate.of(50, 250)});
        this.disposableTextController = new DisposableTextController(this.level);
        this.loadStats();
        this.tickerController = TickerController.of(this.getRandomizedInstanceTickerCallback());
    }

    public static getInstance(level: AbstractLevel) {
        if (!this.instance) this.instance = new LevelInstance(level);
        return this.instance;
    }

    public static closeInstance(): null {
        this.instance = null;
        return null;
    }

    public initFonts() {
        /**
         * @Note ???????????????????????????????????????????????????????
         */
        BitmapFont.from("PixelMapFont1", {fontFamily: 'Pixelfont1', fontSize: 60, fill: '#c4d4b1'});
    }

    public loadStats(): void {
        this.level.addChild(this.score);
        this.level.addChild(this.highestScore);
        this.level.addChild(this.failStreak);
    }

    public initializeEnemyNode(lineObject: LineObject = this.level.getRandomLineObject()): void {
        let enemyNode: EnemyNode = EnemyNode.of(lineObject, {angle: lineObject.line.inclination});
        this.enemyNodes.push(enemyNode);
        this.level.addChild(enemyNode);
    }

    public incrementFrameCount() {
        if (this.frameCount > 10000) this.frameCount = 0;
        this.frameCount++;
    }

    public removeEnemyNode(enemyNode: EnemyNode) {
        this.enemyNodes = this.enemyNodes.filter(node => node !== enemyNode);
    }

    public destroyEnemyNode(enemyNode: EnemyNode) {
        this.removeEnemyNode(enemyNode);
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

    public updateNodes(delta: number): void {
        for (let node of this.enemyNodes) node.updateNode(delta, this.level.distancePerFrame);
    }

    public accentuateFirstValidNode() {
        for (let node of this.enemyNodes) {
            if (node.hasNotBeenTriggered) {
                node.accentuate();
                break;
            }
        }
    }

    /**
     * @Node needs to be changed/fixed
     */
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
        this.enemyNodes = sortedEnemyNodes;
        //this.accentuateFirstValidNode();
    }

    public onFrameCountEquals(frameThreshold: number, onCallback: () => void): void {
        if (this.frameCount % Math.floor(frameThreshold) == 0) onCallback();
    }

    public onInput() {
        if (this.inputManager.gamepad.justPressed[0]) this.handleKeyPress(this.inputManager.gamepad.justPressed[0]);
        if (this.inputManager.keyboard.justPressed[0]) this.handleKeyPress(this.inputManager.keyboard.justPressed[0]);
    }

     /**
     * @problems
     * - should show an explosion on interception/death
     */
     public handleKeyPress(key: string) {
        key = key.toUpperCase();
        if (Object.keys(TriggerKeys).includes(key)) {
            for (let node of this.enemyNodes) {
                if (node.triggerKey === key && node.canBeIntercepted() && node.hasNotBeenTriggered) {
                    this.disposableTextController.addFromPresetAliases(node.getCurrentAriaAlias(), this.level.disposableTextCoordinate);
                    this.removeEnemyNode(node);
                    node.explode();
                    this.score.increment();
                    this.failStreak.reset();
                    if (this.highestScore.getValue() < this.score.getValue()) this.highestScore.setValue(this.score.getValue());
                    break;
                } else if (node.hasNotBeenTriggered) {
                    node.invalidate();
                    this.score.reset();
                    break;
                } 
            }
        }
    }

    /**
     * @description returns the initial value - a random decimal 0 and 20% of the original number (reduces frame interval)
     * @param ratio the (percentage) of the initial value 
     * 
     */
    public fluctuate(value: number, ratio: number = 0.2): number {
        return value - (Math.random() * (value * ratio));
    }

    /**
     * @Note Random sequence
     * @returns TickerCallback
     */
    public getRandomizedInstanceTickerCallback(): TickerCallback<any> { 
        let cadenceMultiplier: number = this.level.cadenceMultiplier;
        this.inputManager.init("default");
        return (delta: number) => {
            this.sortEnemyNodes();
            this.inputManager.update();
            this.onFrameCountEquals(this.level.framesBeforeNodeUpdate * this.level.nodeSpeedMultiplier, () => {
                this.updateNodes(delta); 
                this.destroyLineNodes();
            });
            this.onInput();
            this.disposableTextController.updateAll(delta);
            this.onFrameCountEquals(this.level.framesBeforeNodeInitialization * cadenceMultiplier, () => this.initializeEnemyNode());
            this.onFrameCountEquals(300, () => { cadenceMultiplier = this.fluctuate(this.level.cadenceMultiplier, 0.8); });
            this.incrementFrameCount();
        };
    }
}