import { ILineStyleOptions } from "pixi.js";


export class ApplicationUtils {

    public static DEFAULT_LINE_STYLE: ILineStyleOptions = {color: 'red', width: 5};
    public static DEBUG_LINE_STYLE: ILineStyleOptions = {color: 'green', width: 5};
    public static NODE_ACCENTUATION_COLOR = '#23d916';
    public static NODE_INVALIDATION_COLOR = '#1D221E';
    public static NODE_INTERCEPTABLE_STATE_COLOR = '#117EEB';

    public static getRandomArrayElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }
    
}