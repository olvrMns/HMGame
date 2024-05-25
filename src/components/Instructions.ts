import { AnimatedSprite, Container, Graphics } from "pixi.js";
import { Buildable } from "../util/Buildable";
import { GridContainer } from "./GenericGrid";
import { WindowPresets } from "../util/WindowPresets";
import { Coordinate } from "../obj/Coordinate";
import { ApplicationSrpites, ApplicationTextures } from "../util/AssetLoader";
import { ApplicationUtils } from "../util/ApplicationUtils";



export class Instructions extends Container implements Buildable {
    private grid: GridContainer<Container>;

    constructor() {
        super()
        this.grid = new GridContainer<Container>({
            columns: 3, 
            rows: 4, 
            width: WindowPresets.WINDOW_WIDTH * 0.3, height: WindowPresets.WINDOW_HEIGHT * 0.3,
            centerCoordinate: Coordinate.of(WindowPresets.WINDOW_WIDTH * 0.3, WindowPresets.WINDOW_HEIGHT * 0.3),
            showBorders: true
        });
        this.build();
    }

    public static getInstance(): Instructions {
        return new Instructions();
    }
    
    public build() {
        const ship1 = new AnimatedSprite(ApplicationTextures.SPACESHIP1);
        ship1.play();

        const ship2 = new AnimatedSprite(ApplicationTextures.SPACESHIP2);
        ship2.play();

        this.grid.setContainerAt(ApplicationUtils.getCustomBitMapText({text: "Enemy"}), 0, 0);
        this.grid.setContainerAt(ship1, 0, 1);
        this.grid.setContainerAt(ship2, 0, 2);

        this.addChild(this.grid);
    }
}