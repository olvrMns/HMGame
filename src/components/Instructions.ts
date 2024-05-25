import { AnimatedSprite, BitmapText, Container, Graphics, Sprite } from "pixi.js";
import { Buildable } from "../util/Buildable";
import { GridContainer } from "./GenericGrid";
import { WindowPresets } from "../util/WindowPresets";
import { Coordinate } from "../obj/Coordinate";
import { ApplicationSrpites, ApplicationTextures } from "../util/AssetLoader";
import { ApplicationUtils } from "../util/ApplicationUtils";
import { Enemies, enemiesData } from "../obj/EnemyData";



export class Instructions extends Container implements Buildable {
    private grid: GridContainer<Container>;

    constructor() {
        super()
        this.grid = new GridContainer<Container>({
            columns: 2, 
            rows: Object.keys(enemiesData).length + 1, 
            width: WindowPresets.WINDOW_WIDTH * 0.1, height: WindowPresets.WINDOW_HEIGHT * 0.3,
            centerCoordinate: Coordinate.of(WindowPresets.WINDOW_WIDTH * 0.3, WindowPresets.WINDOW_HEIGHT * 0.3),
            showBorders: false,
            xSpacing: 10,
            ySpacing: 10
        });
        this.build();
    }

    public static getInstance(): Instructions {
        return new Instructions();
    }
    
    public build(): void {
        let enemyHeader = ApplicationUtils.getCustomBitMapText({text: "Enemy", color: "red"});
        enemyHeader.scale.set(0.8);
        this.grid.setContainerAt(enemyHeader, true, 0, 0);
        this.grid.setContainerAt(ApplicationSrpites.P_CONTROLLER, true, 1, 0);
        let buttonArray: Sprite[] = [ApplicationSrpites.X_BUTTON, ApplicationSrpites.Y_BUTTON, ApplicationSrpites.A_BUTTON];
        for (let elem = 0; elem < Object.keys(enemiesData).length; elem++) {
            let animatedSprite: AnimatedSprite = new AnimatedSprite(enemiesData[elem].baseTextures());
            animatedSprite.animationSpeed = 0.4;
            animatedSprite.play();
            this.grid.setContainerAt(animatedSprite, true, 0, elem + 1);
            this.grid.setContainerAt(buttonArray[elem], true, 1, elem + 1);
        }

        this.addChild(this.grid);
    }
}