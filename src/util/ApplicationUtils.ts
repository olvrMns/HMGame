import { ILineStyleOptions } from "pixi.js";
import { InterceptionPercentages, PRDisposableTexts } from "../../types";
import { WindowPresets } from "./WindowPresets";

export enum InterceptionAreaAliases {
    PERFECT,
    FINE,
    GOOD,
    OK,
    FAIL,
    NICE,
    GREAT
}

export const prDisposableTexts: PRDisposableTexts = {
    [InterceptionAreaAliases.PERFECT]: {coordinate: WindowPresets.CENTER_COORDINATE, value: "PERFECT", fontSize: 50, framesBeforeDestruction: 30, color: "#EF5FBE"},
    [InterceptionAreaAliases.FINE]: {coordinate: WindowPresets.CENTER_COORDINATE, value: "FINE", fontSize: 30, framesBeforeDestruction: 10, color: "#A89CF0"},
    [InterceptionAreaAliases.GOOD]: {coordinate: WindowPresets.CENTER_COORDINATE, value: "GOOD", fontSize: 40, framesBeforeDestruction: 15, color: "#A6C3E3"},
    [InterceptionAreaAliases.FAIL]: {coordinate: WindowPresets.CENTER_COORDINATE, value: "FAIL"},
}

export class ApplicationUtils {
    public static DEFAULT_LINE_STYLE: ILineStyleOptions = {color: 'red', width: 5};
    public static DEBUG_LINE_STYLE: ILineStyleOptions = {color: 'green', width: 5};
    public static NODE_ACCENTUATION_COLOR = '#23d916';
    public static NODE_INVALIDATION_COLOR = '#1D221E';
    public static NODE_INTERCEPTABLE_STATE_COLOR = '#117EEB';
    public static DEFAULT_INTERCEPTION_PERCENTAGES: InterceptionPercentages = [
        {areaAlias: InterceptionAreaAliases.FINE, percentage: 1, areaColor: '#DBDF18'},
        {areaAlias: InterceptionAreaAliases.GOOD, percentage: 0.5, areaColor: '#ce7e00'},
        {areaAlias: InterceptionAreaAliases.PERFECT, percentage: 0.25, areaColor: '#7F1734'}
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