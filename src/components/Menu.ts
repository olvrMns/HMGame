import { BitmapFont, BitmapText, Container, Sprite } from "pixi.js";
import { LevelInstances } from "../../types";
import { LevelInstance } from "../LevelInstance";
import { Coordinate } from "../obj/Coordinate";
import { ClassicGH, Space1, Space2 } from "../obj/Levels";
import { AbstractLevel } from "../obj/abstract/AbstractLevel";
import { GridContainer } from "../components/GenericGrid";
import { ApplicationUtils } from "../util/ApplicationUtils";
import { ApplicationSrpites } from "../util/AssetLoader";
import { WindowPresets } from "../util/WindowPresets";

export enum Levels {
    SPACE1 = "Space 1",
    SPACE2 = "Space 2",
    SPACE3 = "Space 3",
    CGH = "Hero"
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
    private levelsGrid: GridContainer<BitmapText>;

    constructor() {
        super();
        this.levelsGrid = new GridContainer<BitmapText>({
            columns: 1, 
            rows: 3, height: WindowPresets.WINDOW_HEIGHT * 0.2, 
            width: WindowPresets.WINDOW_WIDTH * 0.15, 
            gridCenterCoordinate: Coordinate.of(WindowPresets.CENTER_COORDINATE.x, WindowPresets.CENTER_COORDINATE.y + (WindowPresets.CENTER_COORDINATE.y * 0.5))});
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
        this.addChild(ApplicationUtils.getTitleSprite(ApplicationSrpites.MENU_TITLE, 0.4));
        this.setLevelsGrid();
    }

    private setLevelsGrid(): void {
        let bitMapTexts: BitmapText[] = [];
        Object.keys(levelInstances).forEach((levelName) => {
            bitMapTexts.push(ApplicationUtils.getCustomBitMapText({onClick: () => this.loadLevel(levelInstances[levelName]), text: levelName}));
        });
        this.levelsGrid.setContainersFromArray(...bitMapTexts);
        this.addChildAt(this.levelsGrid, 1);
    }

    private loadLevel(levelCallback: () => AbstractLevel): void {
        const level = levelCallback();
        this.parent.addChild(level);
        LevelInstance.getInstance(level);
        this.unStage();
    }

}