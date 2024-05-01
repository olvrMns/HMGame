import { BitmapText, Graphics, TickerCallback } from "pixi.js";
import Line from "./Line";
import LineNode from "./node/LineNode";
import Level from "./abstract/AbstractLevel";
import { keyList} from "./node/LineNodeTypes";


export default class LevelInstance {
    private rootGraphics: Graphics;
    private activeLevel: Level | null;
    private score: number;
    private highestScore: number;
    private lineNodes: LineNode[];
    private failStreak: number;
    private highestFailStreak: number;
    private totalFrameCount: number;

    private scoreText: BitmapText;
    private highestScoreText: BitmapText;
    
    constructor(rootGraphics: Graphics) {
        this.rootGraphics = rootGraphics;
        this.activeLevel = null;
        this.score = 0;
        this.highestScore = 0;
        this.lineNodes = [];
        this.failStreak = 0;
        this.totalFrameCount = 0;
        this.highestFailStreak = 0;
        this.scoreText = new BitmapText('0', {fontName: 'Desyrel', fontSize: 50, tint: 'white', align: 'center'});
        this.highestScoreText = new BitmapText('0', {fontName: 'Desyrel', fontSize: 50, tint: 'white', align: 'center'});
        this.setBitmaps();
    }

    public resetHighestScore(): void {
        this.highestScore = 0;
    }

    public resetScore(): void {
        this.score = 0;
        this.updateScoreText();
    }

    public resetFailStreak(): void {
        this.failStreak = 0;
    }

    public resetTotalFrameCount(): void {
        this.totalFrameCount = 0;
    }

    public updateScoreText(): void {
        this.scoreText.text = this.score.toString();
    }

    public levelIsActive(): boolean {
        return this.activeLevel != null;
    }

    public setHighestScore(highestScore: number): void {
        this.highestScore = highestScore;
        this.highestScoreText.text = this.highestScore.toString();
    }

    public incrementScore(): void {
        this.score++;
        this.updateScoreText();
        if (this.highestScore < this.score) this.setHighestScore(this.score);
    }

    public setBitmaps(): void {
        this.scoreText.anchor.x = 0.5
        this.scoreText.anchor.y = 0.5
        this.scoreText.x = 0; 
        this.scoreText.y = 0;

        this.highestScoreText.anchor.x = 0.5
        this.highestScoreText.anchor.y = 0.5
        this.highestScoreText.x = 200; 
        this.highestScoreText.y = 200;

        this.rootGraphics.addChild(this.scoreText);
        this.rootGraphics.addChild(this.highestScoreText);
    }

    public loadLevel(level: Level): void {
        this.unloadLevel();
        this.activeLevel = level;
        this.setWindowKeyboardListenner();
        level.draw();
    }

    public unloadLevel(): void {
        if (this.levelIsActive()) {
            this.activeLevel?.destroy(true);
            this.activeLevel = null;
        }
    }

    /**
     * @Note
     * https://phuoc.ng/collection/this-vs-that/keydown-vs-keypress-vs-keyup/
     * this method should only contain the callback so we can remove it when unloading
     */
    public setWindowKeyboardListenner() {
        window.addEventListener("keydown", (keyboardEvent: KeyboardEvent): void => {
            if (keyList.includes(keyboardEvent.key.toLowerCase())) {
                for (let node of this.lineNodes) {
                    if (node.lineNoteType.keyboardKey == keyboardEvent.key.toLowerCase() && node.canBeIntercepted() && node.isValid) {
                        this.destroyNode(node);
                        this.incrementScore();
                        break;
                    } else if (node.isValid) {
                        this.resetScore();
                        node.invalidate();
                        break;
                    }
                    
                }
            }
        })
    }

    /**
     * @Note initializes a node on a line 
     * - also adds the new graphic to the rootGraphics
     */
    public initializeLineNode(line: Line = this.activeLevel?.getRandomLine() as Line): void {
        this.lineNodes.push(new LineNode(
            this.rootGraphics, 
            line.getLinearRepresentation(), 
            line.getInterceptionThresholdCoordinate()));
    }

    public destroyNode(node: LineNode) {
        this.lineNodes = this.lineNodes.filter((currentNode) => currentNode !== node);
        node.destroy(true);
    }

    /**
     * @Note destroys the node
     */
    public destroyLineNodes(): void {
        for (let node of this.lineNodes) {
            if (node.canBeDestroyed()) {
                this.destroyNode(node);
                this.resetScore();
                this.failStreak++;
            }
        }
    }

    /**
     * @Note moves all the nodes
     */
    public updateNodes(delta: number): void {
        for (let node of this.lineNodes) node.update(delta, this.activeLevel?.distance as number);
    }

    /**
     * @Note Random sequence
     * @returns TickerCallback
     */
    public getInstanceTicker(): TickerCallback<any> { 
        const speedMultiplier: number = this.activeLevel?.getNodeSpeedMultiplier() as number;
        const cadenceMultiplier: number = this.activeLevel?.getCadenceMultiplier() as number;
        const framesBeforeNodeUpdate: number = this.activeLevel?.getFramesBeforeNodeUpdate() as number;
        const framesBeforeNodeInitialization: number = this.activeLevel?.getFramesBeforeNodeInitialization() as number;
        return (delta: number) => {
            if (this.totalFrameCount % Math.floor(framesBeforeNodeUpdate * speedMultiplier) == 0) {
                this.updateNodes(delta); 
                this.destroyLineNodes();
            } 
            
            if (this.totalFrameCount % Math.floor(framesBeforeNodeInitialization * cadenceMultiplier) == 0) {
                this.initializeLineNode();
            }
            if (this.totalFrameCount > 200) this.totalFrameCount = 0;
            this.totalFrameCount++;
        };
    }
}