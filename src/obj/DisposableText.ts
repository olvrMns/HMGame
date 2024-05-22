import { BitmapText } from "pixi.js";
import { DisposableTextOptions } from "../../types";
import { Coordinate } from "./Coordinate";


export class DisposableText extends BitmapText {
    public yPositionIncrement: number;
    public framesBeforeDestruction: number;
    public currentFrameCount: number;

    constructor(options: DisposableTextOptions) {
        super(options.value ? options.value : '...', {fontName: options.fontName ? options.fontName : 'PixelMapFont1', fontSize: options.fontSize ? options.fontSize : 30});
        this.x = options.coordinate.x;
        this.y = options.coordinate.y;
        this.yPositionIncrement = options.yPositionIncrement ? options.yPositionIncrement : 5;
        this.framesBeforeDestruction = options.framesBeforeDestruction ? options.framesBeforeDestruction : 8;
        this.currentFrameCount = 0;
        this.tint = options.color ? options.color : "#50C878";
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
    };

    public static of(options: DisposableTextOptions): DisposableText {
        return new DisposableText(options);
    }

    public canBeDestroyed(): boolean {
        return this.currentFrameCount >= this.framesBeforeDestruction;
    }

    public moveTo(coordinate: Coordinate) {
        this.x = coordinate.x;
        this.y = coordinate.y;
    }

    /**
     * @description """Animates""" the bitMapText by changing it's scale x/y and y position
     */
    public update(delta: number) {
        this.y = this.y - (this.yPositionIncrement * delta);
        this.currentFrameCount++;
    }
}