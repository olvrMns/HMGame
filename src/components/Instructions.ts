import { AnimatedSprite, BitmapText, Container, Graphics } from "pixi.js";
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
            columns: 3, 
            rows: Object.keys(enemiesData).length + 1, 
            width: WindowPresets.WINDOW_WIDTH * 0.3, height: WindowPresets.WINDOW_HEIGHT * 0.3,
            centerCoordinate: Coordinate.of(WindowPresets.WINDOW_WIDTH * 0.3, WindowPresets.WINDOW_HEIGHT * 0.3),
            showBorders: false
        });
        this.build();
    }

    public static getInstance(): Instructions {
        return new Instructions();
    }
    
    public build(): void {
        for (let elem = 0; elem < Object.keys(enemiesData).length; elem++) {
            let animatedSprite: AnimatedSprite = new AnimatedSprite(enemiesData[elem].baseTextures());
            //animatedSprite.play();
            //animatedSprite.anchor.set(0.5);
            let bitMapText: BitmapText = ApplicationUtils.getCustomBitMapText({text: enemiesData[elem].triggerKey, color: "green"});
            //bitMapText.anchor.set(0.5);

            this.grid.setContainerAt(animatedSprite, 0, elem + 1);
            this.grid.setContainerAt(bitMapText, 1, elem + 1);
        }

        this.addChild(this.grid);
    }
}