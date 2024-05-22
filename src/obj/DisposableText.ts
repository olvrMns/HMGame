import { BitmapText, Container } from "pixi.js";
import { DisposableTextOptions } from "../../types";


export class DisposableText extends BitmapText {
    public yPositionIncrement: number;
    public framesBeforeDestruction: number;
    public currentFrameCount: number;

    constructor(options: DisposableTextOptions) {
        super(options.value ? options.value : '...', {fontName: options.fontName ? options.fontName : 'PixelMapFont1', fontSize: options.fontSize ? options.fontSize : 30});
        this.x = options.x;
        this.y = options.y;
        this.yPositionIncrement = options.yPositionIncrement ? options.yPositionIncrement : 5;
        this.framesBeforeDestruction = options.framesBeforeDestruction ? options.framesBeforeDestruction : 8;
        this.currentFrameCount = 0;
    };

    public static of(options: DisposableTextOptions): DisposableText {
        return new DisposableText(options);
    }

    public canBeDestroyed(): boolean {
        return this.currentFrameCount >= this.framesBeforeDestruction;
    }

    /**
     * @description """Animates""" the bitMapText by changing it's scale x/y and y position
     */
    public update(delta: number) {
        this.y = this.y - (this.yPositionIncrement * delta);
        this.currentFrameCount++;
    }
}

export class DisposableTextController {
    public rootContainer: Container;
    public disposableTexts: DisposableText[];

    constructor(rootContainer: Container) {
        this.rootContainer = rootContainer;
        this.disposableTexts = [];
    }

    public add(disposableText: DisposableText) {
        this.disposableTexts.push(disposableText);
        this.rootContainer.addChild(disposableText);
    }

    public remove(disposableText: DisposableText) {
        this.disposableTexts = this.disposableTexts.filter(dt => dt !== disposableText);
        this.rootContainer.removeChild(disposableText);
        disposableText.destroy({texture: false});
    }

    public updateAll(delta: number) {
        for (let disposableText of this.disposableTexts) {
            if (disposableText.canBeDestroyed()) this.remove(disposableText);
            else disposableText.update(delta);
        }
    }


}