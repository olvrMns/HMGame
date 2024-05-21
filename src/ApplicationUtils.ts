import { ILineStyleOptions } from "pixi.js";
import { InterceptionPercentages } from "../types";


export class ApplicationUtils {

    public static DEFAULT_LINE_STYLE: ILineStyleOptions = {color: 'red', width: 5};
    public static DEBUG_LINE_STYLE: ILineStyleOptions = {color: 'green', width: 5};
    public static NODE_ACCENTUATION_COLOR = '#23d916';
    public static NODE_INVALIDATION_COLOR = '#1D221E';
    public static NODE_INTERCEPTABLE_STATE_COLOR = '#117EEB';
    public static DEFAULT_INTERCEPTION_PERCENTAGES: InterceptionPercentages = [
        {areaAlias: "Nice", percentage: 1, areaColor: '#DBDF18'},
        {areaAlias: "Great", percentage: 0.5, areaColor: '#ce7e00'},
        {areaAlias: "Perfect", percentage: 0.25, areaColor: '#7F1734'}
    ];

    /**
     * @description will be in a seperate Generic Class in the future
     */
    public static getRandomArrayElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * @description will be in a seperate Generic Class in the future
     */
    public static getReversedArray<T>(array: T[]): T[] {
        let nArray: T[] = [];
        for (let elem = array.length - 1; elem > -1; elem--) nArray.push(array[elem]);
        return nArray;
    }
    
}