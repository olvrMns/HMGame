import { Assets, BitmapFont, Resource, Sprite, Spritesheet, Texture } from "pixi.js";
import fighter1Data from "../static/assets/fighter1Data.json";
import fighter2Data from "../static/assets/fighter2Data.json";
import planet1Data from "../static/assets/planet1Data.json";
import planet2Data from "../static/assets/planet2Data.json";
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
        ApplicationTextures.SPACESHIP1 = await this.getTextures(`${this.PATH}fighter1.png`, fighter1Data, "fighter1");
        ApplicationTextures.SPACESHIP2 = await this.getTextures(`${this.PATH}fighter2.png`, fighter2Data, "fighter2");
        ApplicationSrpites.SPACE_BACKGROUND1 = Sprite.from("assets/SpaceBackground1.png");
        await Assets.load('fonts/pixelFont1.ttf');
        await Assets.load('fonts/pixelFont2.ttf');
        
    }
}

export class ApplicationTextures {
    public static PLANET1: Texture<Resource>[];
    public static PLANET2: Texture<Resource>[];
    public static SPACESHIP1: Texture<Resource>[];
    public static SPACESHIP2: Texture<Resource>[];
}

export class ApplicationSrpites {
    public static SPACE_BACKGROUND1: Sprite;
}   


