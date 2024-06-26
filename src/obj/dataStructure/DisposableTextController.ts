import { Container } from "pixi.js";
import { DisposableText } from "../bitMapText/DisposableText";
import { InterceptionAreaAliases, presetDisposableTextOptions } from "../DisposableTextPresetOptions";
import { DisposableTextOptions } from "../../../types";
import { Coordinate } from "../Coordinate";

/**
 * @description data structure that controls the life cycle of popup BitMapTexts (DisposableText)
 */
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

    public addFromPresetAliases(alias: InterceptionAreaAliases, coordinate: Coordinate) {
        let disposableText: DisposableText = DisposableText.of(presetDisposableTextOptions[alias] as DisposableTextOptions);
        disposableText.moveTo(coordinate);
        this.add(disposableText);
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