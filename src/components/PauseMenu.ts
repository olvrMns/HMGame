import { BitmapText, Container, Graphics } from "pixi.js";
import { GridContainer } from "./GenericGrid";
import { ApplicationUtils } from "../util/ApplicationUtils";
import { WindowPresets } from "../util/WindowPresets";
import { ApplicationSrpites } from "../util/AssetLoader";
import { Buildable } from "../util/Buildable";
import { Instructions } from "./Instructions";

export class PauseMenu extends Container implements Buildable {
    private grid: GridContainer<BitmapText>;
    private resumeCallback: () => void;
    private menuCallback: () => void;

    constructor(resumeCallback: () => void, menuCallback: () => void) {
        super();
        this.grid = new GridContainer<BitmapText>({
            columns: 1, 
            rows: 2, 
            centerCoordinate: WindowPresets.CENTER_COORDINATE, 
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
        this.addChild(Instructions.getInstance());
        this.addChild(ApplicationUtils.getTitleSprite(ApplicationSrpites.PAUSE_TITLE, 0.6, 0.4));
        
        this.grid.setContainersFromArray(
            true,
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