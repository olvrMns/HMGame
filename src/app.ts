import { AnimatedSprite, Application, Assets, Graphics, Resource, Sprite, Spritesheet, Texture } from "pixi.js";
import planet2Data from "../static/sprites/planet2Data.json";
import planet1Data from "../static/sprites/planet1Data.json";
import fighter1Data from "../static/sprites/fighter1Data.json";
import fighter2Data from "../static/sprites/fighter2Data.json";

(async() => {
    const instance: Application = new Application({width: window.innerWidth, height: window.innerHeight, resizeTo: window, view: document.getElementById("pixi-canvas") as HTMLCanvasElement});

    //MADE WITH TEXTUREPACKER
    const planet1Spritesheet = new Spritesheet(Texture.from("sprites/planet1Data.png"), planet1Data);
    const planet2Spritesheet = new Spritesheet(Texture.from("sprites/planet2Data.png"), planet2Data);
    const fighter1Spritesheet = new Spritesheet(Texture.from("sprites/fighter1Data.png"), fighter1Data);
    const fighter2Spritesheet = new Spritesheet(Texture.from("sprites/fighter2Data.png"), fighter2Data);
    const testBackground: Sprite = Sprite.from("sprites/SpaceBackground1.png");

    const Enemy: {[key:string]:Texture<Resource>[]} = {
        fighter1: fighter1Spritesheet.animations.fighter1,
        fighter2: fighter2Spritesheet.animations.fighter2
    }

    await planet1Spritesheet.parse();
    await planet2Spritesheet.parse();
    await fighter1Spritesheet.parse();
    await fighter2Spritesheet.parse();

    instance.stage.addChild(testBackground);
    instance.stage.addChild(getAnimation(planet2Spritesheet.animations.planet2));

})();


function getAnimation(textures: Texture<Resource>[]): AnimatedSprite {
    const animation = new AnimatedSprite(textures);
    animation.animationSpeed = 0.5;
    animation.x = window.innerWidth/2;
    animation.y = window.innerHeight/2;
    animation.anchor.x = 0.5;
    animation.anchor.y = 0.5;
    animation.scale.x = 1.8;
    animation.scale.y =  1.8;
    animation.play();
    return animation;
}