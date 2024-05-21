import { Assets, BitmapFont, Resource, Sprite, Spritesheet, Texture } from "pixi.js";
import fighter1Data from "../static/assets/fighter1Data.json";
import fighter1ExplosionData from "../static/assets/fighter1ExplosionData.json";
import fighter2Data from "../static/assets/fighter2Data.json";
import fighter2ExplosionData from "../static/assets/fighter2ExplosionData.json";
import fighter3Data from "../static/assets/fighter3Data.json";
import explosion3Data from "../static/assets/explosion3Data.json";
import planet1Data from "../static/assets/planet1Data.json";
import planet2Data from "../static/assets/planet2Data.json";
import planet3Data from "../static/assets/planet3Data.json";
import planet4Data from "../static/assets/planet4Data.json";
/**
 * @description Utility class containing Assets/Animations of the application and methods
 * @Note returns a clone of a texture/sprite so that the .destroy() method of containers doesn't destroy the referenced object
 */
export class AssetLoader {
    private static readonly PATH: string = "assets/";

    private static async getTextures(path: string, data: any, name: string): Promise<Texture<Resource>[]> {
        const textures = new Spritesheet(Texture.from(path), data);
        textures.parse();
        return textures.animations?.[name];
    }

    public static async load() {
        ApplicationTextures.PLANET1 = await this.getTextures(`${this.PATH}planet1.png`, planet1Data, "planet1");
        ApplicationTextures.PLANET2 = await this.getTextures(`${this.PATH}planet2.png`, planet2Data, "planet2");
        ApplicationTextures.PLANET3 = await this.getTextures(`${this.PATH}planet3.png`, planet3Data, "planet3");
        ApplicationTextures.PLANET4 = await this.getTextures(`${this.PATH}planet4.png`, planet4Data, "planet4");
        ApplicationTextures.SPACESHIP1 = await this.getTextures(`${this.PATH}fighter1.png`, fighter1Data, "fighter1");
        ApplicationTextures.SPACESHIP1_EXPLOSION = await this.getTextures(`${this.PATH}fighter1Explosion.png`, fighter1ExplosionData, "fighter1Explosion");
        ApplicationTextures.SPACESHIP2 = await this.getTextures(`${this.PATH}fighter2.png`, fighter2Data, "fighter2");
        ApplicationTextures.SPACESHIP2_EXPLOSION = await this.getTextures(`${this.PATH}fighter2Explosion.png`, fighter2ExplosionData, "fighter2Exp");
        ApplicationTextures.SPACESHIP3 = await this.getTextures(`${this.PATH}fighter3.png`, fighter3Data, "fighter3");
        ApplicationTextures.EXPLOSION3 = await this.getTextures(`${this.PATH}explosion3.png`, explosion3Data, "explosion3");
        ApplicationSrpites.SPACE_BACKGROUND1 = Sprite.from("assets/SpaceBackground1.png");
        ApplicationSrpites.SPACE_BACKGROUND2 = Sprite.from("assets/SpaceBackground2.png");
        ApplicationSrpites.SPACE_BACKGROUND3 = Sprite.from("assets/SpaceBackground3.png");
        await Assets.load('fonts/pixelFont1.ttf');
        await Assets.load('fonts/pixelFont2.ttf');
        
    }
}

export class ApplicationTextures {
    public static PLANET1: Texture<Resource>[];
    public static PLANET2: Texture<Resource>[];
    public static PLANET3: Texture<Resource>[];
    public static PLANET4: Texture<Resource>[];
    public static SPACESHIP1: Texture<Resource>[];
    public static SPACESHIP2: Texture<Resource>[];
    public static SPACESHIP3: Texture<Resource>[];

    public static SPACESHIP1_EXPLOSION: Texture<Resource>[];
    public static SPACESHIP2_EXPLOSION: Texture<Resource>[];
    public static EXPLOSION3: Texture<Resource>[];
}

export class ApplicationSrpites {
    public static SPACE_BACKGROUND1: Sprite;
    public static SPACE_BACKGROUND2: Sprite;
    public static SPACE_BACKGROUND3: Sprite;
}   


