import { Container, Graphics } from "pixi.js";
import { BitMapTextGrid } from "../obj/bitMapText/BitMapTextGrid";
import { ApplicationUtils } from "../util/ApplicationUtils";
import { WindowPresets } from "../util/WindowPresets";

export class PauseMenu extends Container {
    private grid: BitMapTextGrid;
    private resumeCallback: () => void;
    private menuCallback: () => void;

    constructor(resumeCallback: () => void, menuCallback: () => void) {
        super();
        this.grid = BitMapTextGrid.of({
            columns: 1, 
            rows: 2, 
            gridCenterCoordinate: WindowPresets.CENTER_COORDINATE, 
            height: WindowPresets.WINDOW_HEIGHT * 0.15,
            width: WindowPresets.WINDOW_WIDTH * 0.15
        });
        this.resumeCallback = resumeCallback;
        this.menuCallback = menuCallback;
        this.build();
    }

    public static of(resumeCallback: () => void, menuCallback: () => void): PauseMenu {
        return new PauseMenu(resumeCallback, menuCallback);
    }

    public build() {
        const background: Graphics = new Graphics();
        background.beginFill(ApplicationUtils.PAUSE_MENU_BACKGROUND_COLOR, 0.5);
        background.drawRect(0, 0, WindowPresets.WINDOW_WIDTH, WindowPresets.WINDOW_HEIGHT);
        background.endFill();
        this.addChild(background);
        
        this.grid.setBitMapTextsFromArray(
            ApplicationUtils.getCustomBitMapText({text: "RESUME", onClick: this.resumeCallback}), 
            ApplicationUtils.getCustomBitMapText({text: "EXIT", onClick: this.menuCallback})
        );
        this.addChild(this.grid);
    }

    public unStage() {
        this.parent.removeChild(this);
        this.destroy({texture: false});
    }
}