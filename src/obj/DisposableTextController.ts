import { Container } from "pixi.js";
import { DisposableText } from "./DisposableText";
import { InterceptionAreaAliases, prDisposableTexts } from "../util/ApplicationUtils";
import { DisposableTextOptions } from "../../types";
import { Coordinate } from "./Coordinate";

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
        let disposableText: DisposableText = DisposableText.of(prDisposableTexts[alias] as DisposableTextOptions);
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