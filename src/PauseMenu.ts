import { BitmapText, Container } from "pixi.js";
import { BitMapTextGrid } from "./obj/bitMapText/BitMapTextGrid";
import { WindowPresets } from "./util/WindowPresets";


export class PauseMenu extends Container {
    private static instance: PauseMenu;
    private grid: BitMapTextGrid;
    private resumeCallback: () => void;
    private menuCallback: () => void;

    constructor(resumeCallback: () => void, menuCallback: () => void) {
        super();
        this.grid = BitMapTextGrid.of({
            columns: 1, 
            rows: 2, 
            gridCenterCoordinate: WindowPresets.CENTER_COORDINATE, 
            height: WindowPresets.WINDOW_HEIGHT * 0.2,
            width: WindowPresets.WINDOW_WIDTH * 0.2
        });
        this.resumeCallback = resumeCallback;
        this.menuCallback = menuCallback;
        this.build();
    }

    public static getInstance(resumeCallback: () => void, menuCallback: () => void): PauseMenu {
        if (!this.instance) this.instance = new PauseMenu(resumeCallback, menuCallback);
        return this.instance;
    }

    public build() {
        const resumeButton = new BitmapText("Resume", {fontName: "MenuFont"});
        resumeButton.eventMode = 'static';
        resumeButton.onclick = () => this.resumeCallback();
        this.grid.setBitMapTextAt(resumeButton, 0, 0);

        const backButton = new BitmapText("Back to Menu", {fontName: "MenuFont"});
        backButton.eventMode = 'static';
        backButton.onclick = () => this.menuCallback();
        this.grid.setBitMapTextAt(backButton, 0, 1);

        this.addChild(this.grid);
    }

    public dispose() {
        this.parent.removeChild(this);
        this.destroy({texture: false});
    }
}