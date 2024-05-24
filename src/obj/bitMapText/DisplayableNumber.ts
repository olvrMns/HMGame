import { BitmapText } from "pixi.js";
import { DisplayableNumberOptions } from "../../../types";
import { Coordinate } from "../Coordinate";

export class DisplayableNumber extends BitmapText {
    private value: number;
    private label: string;

    constructor(options: DisplayableNumberOptions) {
        super(
            "", {
            fontName: options.fontName ? options.fontName : 'PixelMapFont1',
            fontSize: options.fontSize ? options.fontSize : 30, 
        });
        this.label = options.label ? options.label + " " : "";
        this.x = options.coordinate.x;
        this.y = options.coordinate.y;
        this.value = options.value ? parseInt(options.value) : 0;
        this.text = this.label + this.value.toString();
    }

    public moveTo(coordinate: Coordinate): void {
        this.x = coordinate.x;
        this.y = coordinate.y;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number) {
        this.setTextToValue(() => this.value = value);
    }

    public reset(): void {
        this.setTextToValue(() => this.value = 0);
    }

    public increment(by: number = 1): void {
        this.setTextToValue(() => this.value+=by);
    }

    public decrement(by: number = 1): void {
        this.setTextToValue(() => this.value-=by);
    }

    public setTextToValue(operation: () => void): void {
        operation();
        this.text = this.label + this.value.toString();
    }

}