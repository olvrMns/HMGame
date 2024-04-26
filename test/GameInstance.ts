import { Application } from "pixi.js";
import LevelInstance from "./LevelInstance";
import { Levels } from "../src/util/typings";


export default class GameInstance extends Application {
    private levelInstance: LevelInstance;
    private levels: Levels;

}
