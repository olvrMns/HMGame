import { EnemiesData } from "../../types";
import { ApplicationTextures } from "../util/AssetLoader";
import { TriggerKeys } from "./abstract/AbstractLevel";

export enum Enemies {
    SHIP1,
    SHIP2,
    SHIP3
}

export const enemiesData: EnemiesData = {
    [Enemies.SHIP1]: {baseTextures: () => ApplicationTextures.SPACESHIP1, destructionTextures: () => ApplicationTextures.SPACESHIP1_EXPLOSION, triggerKey: TriggerKeys.X},
    [Enemies.SHIP2]: {baseTextures: () => ApplicationTextures.SPACESHIP2, destructionTextures: () => ApplicationTextures.SPACESHIP2_EXPLOSION, triggerKey: TriggerKeys.Y},
    [Enemies.SHIP3]: {baseTextures: () => ApplicationTextures.SPACESHIP3, destructionTextures: () => ApplicationTextures.EXPLOSION3, triggerKey: TriggerKeys.A, scale: 1.3}
}