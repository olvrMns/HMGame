import { PresetDisposableTextOptions } from "../../types";
import { WindowPresets } from "../util/WindowPresets";

export enum InterceptionAreaAliases {
    PERFECT,
    FINE,
    GOOD,
    OK,
    FAIL,
    NICE,
    GREAT
}

export const presetDisposableTextOptions: PresetDisposableTextOptions = {
    [InterceptionAreaAliases.PERFECT]: {coordinate: WindowPresets.CENTER_COORDINATE, value: "PERFECT", fontSize: 50, framesBeforeDestruction: 30, color: "#EF5FBE"},
    [InterceptionAreaAliases.FINE]: {coordinate: WindowPresets.CENTER_COORDINATE, value: "FINE", fontSize: 30, framesBeforeDestruction: 10, color: "#A89CF0"},
    [InterceptionAreaAliases.GOOD]: {coordinate: WindowPresets.CENTER_COORDINATE, value: "GOOD", fontSize: 40, framesBeforeDestruction: 15, color: "#A6C3E3"},
    [InterceptionAreaAliases.FAIL]: {coordinate: WindowPresets.CENTER_COORDINATE, value: "FAIL", color: "red", framesBeforeDestruction: 14},
}