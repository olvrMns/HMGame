import InputManager from "guki-input-controller";
import { BitmapFont, TickerCallback } from "pixi.js";
import { LineObject } from "../types";
import { Menu } from "./Menu";
import { Coordinate } from "./obj/Coordinate";
import { EnemyNode } from "./obj/EnemyNode";
import { AbstractLevel, TriggerKeys } from "./obj/abstract/AbstractLevel";
import { DisplayableNumber } from "./obj/bitMapText/DisplayableNumber";
import { DisposableTextController } from "./obj/dataStructure/DisposableTextController";
import { TickerController } from "./obj/dataStructure/TickerController";
import { PauseMenu } from "./PauseMenu";

/**
 * @description Singleton Object containing the logic/lifecycle of the game (level)
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
    private pauseMenu: PauseMenu;

    private constructor(level: AbstractLevel) {
        this.level = level;
        this.initFonts();
        this.score = new DisplayableNumber({coordinate: Coordinate.of(50, 50)});
        this.highestScore = new DisplayableNumber({coordinate: Coordinate.of(50, 150)});
        this.failStreak = new DisplayableNumber({coordinate: Coordinate.of(50, 250)});
        this.disposableTextController = new DisposableTextController(this.level);
        this.loadStats();
        this.tickerController = TickerController.of(this.getRandomizedInstanceTickerCallback());
        this.tickerController.addAllUnPausableTickers(this.getInputTickerCallback());
        this.pauseMenu = this.initPauseMenu();
    }

    public static getInstance(level: AbstractLevel) {
        if (!this.instance) this.instance = new LevelInstance(level);
        return this.instance;
    }

    public static closeInstance() {
        this.instance = null;
    }

    /**
     * @description 
     * 1) Adds back the menu to the application stage (the root container)
     * 2) Destroys all the tickers of the instance
     * 3) Removes the current level (container) from the application stage
     * 4) Destroys the current level
     * 5) Sets the static instance to null
     */
    public unStage() {
        this.level.parent.addChildAt(Menu.getInstance(), 0);
        this.tickerController.destroyAll();
        this.level.unStage();
        LevelInstance.closeInstance();
    }

    public initFonts() {
        /**
         * @Note ???????????????????????????????????????????????????????
         */
        BitmapFont.from("PixelMapFont1", {fontFamily: 'Pixelfont1', fontSize: 60, fill: '#c4d4b1'});
    }

    public initPauseMenu(): PauseMenu {
        return PauseMenu.getInstance(() => { 
            this.tickerController.unPause();
            this.level.removeChild(this.pauseMenu); 
        }, () => {
            this.level.removeChild(this.pauseMenu); 
            this.unStage();
        });
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
        } else if (key === "ESCAPE" || key === "MENU") {
            if (this.tickerController.isPaused()) {
                this.tickerController.unPause();
            } else {
                this.tickerController.pause();
                this.level.addChild(this.pauseMenu);
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
        return (delta: number) => {
            this.sortEnemyNodes();
            this.onFrameCountEquals(this.level.framesBeforeNodeUpdate * this.level.nodeSpeedMultiplier, () => {
                this.updateNodes(delta); 
                this.destroyLineNodes();
            });
            this.disposableTextController.updateAll(delta);
            this.onFrameCountEquals(this.level.framesBeforeNodeInitialization * cadenceMultiplier, () => this.initializeEnemyNode());
            this.onFrameCountEquals(300, () => { cadenceMultiplier = this.fluctuate(this.level.cadenceMultiplier, 0.8); });
            this.incrementFrameCount();
        };
    }

    public getInputTickerCallback(): TickerCallback<any> {
        this.inputManager.init("default");
        return (delta: number) => {
            this.inputManager.update();
            this.onInput();
        }
    }
}