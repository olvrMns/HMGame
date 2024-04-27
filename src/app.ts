import GameInstance from "../test/GameInstance";

// const WS = WindowService.getInstance(0.9);

// const app = new Application<HTMLCanvasElement>({
// 	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
// 	resolution: 2,
// 	autoDensity: true,
// 	backgroundColor: "rgb(13,14,53)",
// 	width: WS.gameWindowWidth,
// 	height: WS.gameWindowHeight,
// 	autoStart: false
// });

const instance: GameInstance = new GameInstance();
instance.load("testLevel1");
