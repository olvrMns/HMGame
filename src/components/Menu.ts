import { BitmapFont, BitmapText, Container } from "pixi.js";
import { LevelInstances } from "../../types";
import { LevelInstance } from "../LevelInstance";
import { Coordinate } from "../obj/Coordinate";
import { ClassicGH, Space1, Space2, Space3 } from "../obj/Levels";
import { AbstractLevel } from "../obj/abstract/AbstractLevel";
import { GridContainer } from "../components/GenericGrid";
import { ApplicationUtils } from "../util/ApplicationUtils";
import { ApplicationSrpites } from "../util/AssetLoader";
import { WindowPresets } from "../util/WindowPresets";
import { Buildable } from "../util/Buildable";
import { Instructions } from "./Instructions";

export enum Levels {
    SPACE1 = "Pinky Winky",
    SPACE2 = "Milky Way",
    SPACE3 = "Rusty",
    CGH = "Hero"
}

/**
 * @description as a callback as value so it can return a NEW level after unload(level/container destruction)
 */
export const levelInstances: LevelInstances = {
    [Levels.SPACE1]: () => new Space1(),
    [Levels.SPACE2]: () => new Space2(),
    [Levels.SPACE3]: () => new Space3(),
    [Levels.CGH]: () => new ClassicGH()
}

/**
 * @description 
 * - Parent : Stage Container object of application
 */
export class Menu extends Container implements Buildable {
    private static instance: Menu;
    private levelsGrid: GridContainer<BitmapText>;

    constructor() {
        super();
        this.levelsGrid = new GridContainer<BitmapText>({
            columns: 1, 
            rows: Object.keys(levelInstances).length, 
            height: WindowPresets.WINDOW_HEIGHT * 0.2, 
            width: WindowPresets.WINDOW_WIDTH * 0.15, 
            centerCoordinate: Coordinate.of(WindowPresets.CENTER_COORDINATE.x, WindowPresets.CENTER_COORDINATE.y + (WindowPresets.CENTER_COORDINATE.y * 0.5)), 
            showBorders: false,
            xSpacing: 10,
            ySpacing: 20
        });
        this.build();
    }

    public static getInstance(): Menu {
        if (!this.instance) this.instance = new Menu();
        return this.instance;
    }

    private unStage(): void {
        this.parent.removeChild(this);
    }

    public build(): void {
        BitmapFont.from("MenuFont", {fontFamily: 'Pixelfont2', fontSize: 30, fill: '#c4d4b1'});
        
        this.addChild(ApplicationSrpites.MENU_BACKGROUND);
        this.addChild(Instructions.getInstance());
        this.addChild(ApplicationUtils.getTitleSprite(ApplicationSrpites.MENU_TITLE2, 0.4));
        this.setLevelsGrid();
    }

    private setLevelsGrid(): void {
        let bitMapTexts: BitmapText[] = [];
        Object.keys(levelInstances).forEach((levelName) => {
            bitMapTexts.push(ApplicationUtils.getCustomBitMapText({onClick: () => this.loadLevel(levelInstances[levelName]), text: levelName}));
        });
        this.levelsGrid.setContainersFromArray(true, ...bitMapTexts);
        this.addChildAt(this.levelsGrid, 1);
    }

    private loadLevel(levelCallback: () => AbstractLevel): void {
        const level = levelCallback();
        this.parent.addChild(level);
        LevelInstance.getInstance(level);
        this.unStage();
    }

}