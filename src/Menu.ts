import { BitmapFont, BitmapText, Container, FederatedPointerEvent, BlurFilter, Filter } from "pixi.js";
import { LevelInstances } from "../types";
import { ClassicGH, Space1, Space2 } from "./obj/Levels";
import { ApplicationSrpites } from "./util/AssetLoader";
import { LevelInstance } from "./LevelInstance";
import { WindowPresets } from "./util/WindowPresets";
import { AbstractLevel } from "./obj/abstract/AbstractLevel";
import { BitMapTextGrid } from "./obj/bitMapText/BitMapTextGrid";
import { Coordinate } from "./obj/Coordinate";

export enum Levels {
    SPACE1 = "Space 1",
    SPACE2 = "Space 2",
    SPACE3 = "Space 3",
    CGH = "Classic Hero"
}

/**
 * @description as a callback as value so it can return a NEW level after unload(level/container destruction)
 */
export const levelInstances: LevelInstances = {
    [Levels.SPACE1]: () => new Space1(),
    [Levels.SPACE2]: () => new Space2(),
    [Levels.CGH]: () => new ClassicGH()
}

/**
 * @description 
 * - Parent : Stage Container object of application
 */
export class Menu extends Container {
    private static instance: Menu;
    private levelsGrid: BitMapTextGrid;

    constructor() {
        super();
        this.levelsGrid = BitMapTextGrid.of({
            columns: 1, 
            rows: 3, height: WindowPresets.WINDOW_HEIGHT * 0.2, 
            width: WindowPresets.WINDOW_WIDTH * 0.15, 
            gridCenterCoordinate: WindowPresets.CENTER_COORDINATE});
        this.build();
    }

    public static getInstance(): Menu {
        if (!this.instance) this.instance = new Menu();
        return this.instance;
    }

    private unStage(): void {
        this.parent.removeChild(this);
    }

    private build(): void {
        BitmapFont.from("MenuFont", {fontFamily: 'Pixelfont2', fontSize: 30, fill: '#c4d4b1'});
        this.addChild(ApplicationSrpites.MENU_BACKGROUND);
        //this.filters?.push(new BlurFilter(8, 4));
        this.setLevelsGrid();
    }

    private setLevelsGrid(): void {
        let bitMapTexts: BitmapText[] = [];
        Object.keys(levelInstances).forEach((levelName) => {
            bitMapTexts.push(this.getLevelButtonBitMapText(levelName));
        });
        this.levelsGrid.setBitMapTextsFromArray(...bitMapTexts);
        this.addChildAt(this.levelsGrid, 1);
    }

    private getLevelButtonBitMapText(levelName: string): BitmapText {
        const bitMapText = new BitmapText(levelName, {fontName: "MenuFont"});
        bitMapText.eventMode = 'static';
        bitMapText.onclick = () => this.loadLevel(levelInstances[levelName]);
        return bitMapText;
    }

    private loadLevel(levelCallback: () => AbstractLevel): void {
        const level = levelCallback();
        this.parent.addChild(level);
        LevelInstance.getInstance(level);
        this.unStage();
    }

}