import { AnimatedSprite, Application, Assets, Container, Graphics, Resource, Sprite, Spritesheet, Texture } from "pixi.js";
import { Coordinate } from "../test/Coordinate";
import { WindowPresets } from "../test/WindowPresets";
import planet2Data from "../static/sprites/planet2Data.json";
import planet1Data from "../static/sprites/planet1Data.json";
import fighter1Data from "../static/sprites/fighter1Data.json";
import fighter2Data from "../static/sprites/fighter2Data.json";
import { GameInstance} from "../test/GameInstance"

(async() => {
    const instance: GameInstance = GameInstance.getInstance();

    interface SpriteOptions {
        startCoordinate?: Coordinate;
        anchorCoordinate?: Coordinate;
        positionCoordinate?: Coordinate;
        animationSpeed?: number;
        scale?: Coordinate;
        textures?: Texture<Resource>[];
    }
    
    
    // function getAnimation(options: SpriteOptions = {}): AnimatedSprite {
    //     const animation = new AnimatedSprite(options.textures);
    //     animation.animationSpeed = 0.5;
    //     animation.x = options.positionCoordinate.x;
    //     animation.y = options.positionCoordinate.y;
    //     animation.anchor.x = options.anchorCoordinate.x;
    //     animation.anchor.y = options.anchorCoordinate.y;
    //     animation.scale.x = options.scale.x;
    //     animation.scale.y =  options.scale.y;
    //     animation.play();
    //     return animation;
    // }

    //MADE WITH TEXTUREPACKER
    const planet1Spritesheet = new Spritesheet(Texture.from("sprites/planet1Data.png"), planet1Data);
    const planet2Spritesheet = new Spritesheet(Texture.from("sprites/planet2Data.png"), planet2Data);
    const fighter1Spritesheet = new Spritesheet(Texture.from("sprites/fighter1Data.png"), fighter1Data);
    const fighter2Spritesheet = new Spritesheet(Texture.from("sprites/fighter2Data.png"), fighter2Data);

    await planet1Spritesheet.parse();
    await planet2Spritesheet.parse();
    await fighter1Spritesheet.parse();
    await fighter2Spritesheet.parse();

    enum AnimationTypes {
        PLANET1,
        PLANET2,
        FIGHTER1,
        FIGHTER2
    }

    const Test: {[key in AnimationTypes]?:Texture<Resource>[]} = {
        [AnimationTypes.FIGHTER1]: fighter1Spritesheet.animations.fighter1,
        [AnimationTypes.FIGHTER2]: fighter2Spritesheet.animations.fighter2,
        [AnimationTypes.PLANET1]: planet1Spritesheet.animations.planet1,
        [AnimationTypes.PLANET2]: planet2Spritesheet.animations.planet2
        
    }

    // function getAnim(type: AnimationTypes): Texture<Resource>[] {

    // }

    // const testBackground: Sprite = Sprite.from("sprites/SpaceBackground1.png");
    const test: AnimatedSprite = Sprite.from("sprites/SpaceBackground1.png") as AnimatedSprite;
    // const test2: Container = Sprite.from("sprites/SpaceBackground1.png") as Container;
    const planet: AnimatedSprite = new AnimatedSprite(Test[AnimationTypes.PLANET1] as Texture<Resource>[]);
    const planet2: AnimatedSprite = new AnimatedSprite(Test[AnimationTypes.PLANET2] as Texture<Resource>[]);
    planet2.play();
    planet2.x = WindowPresets.CENTER_COORDINATE.getX();
    planet2.y = WindowPresets.CENTER_COORDINATE.getY();
    planet.play();
    // const Enemy: {type: EnemyNodeType, sprite: (options: SpriteOptions) => AnimatedSprite}[] = [
    //     {type: EnemyNodeType.FIGHTER1, sprite: (options: SpriteOptions) => getAnimation(options)}
    // ]
    instance.stage.addChild(test);
    instance.stage.addChild(planet, planet2);

})();