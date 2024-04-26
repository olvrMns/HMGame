import { Application, Graphics } from 'pixi.js'
import Coordinate from './entities/Coordinate';
import Line from "./entities/Line";
import WindowService from "./util/WindowService";

const WS = WindowService.getInstance(0.9);

const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6435ed,
	width: WS.gameWindowWidth,
	height: WS.gameWindowHeight,
	autoStart: false
});
const from = new Coordinate(0, 0);
const g: Graphics = new Graphics;
g.x = WS.centerCoordinate.x;
g.y = WS.centerCoordinate.y;
g.lineStyle(5, 'rgb(170, 170, 224)');
const l1 = new Line(g, from, WS.PSC_MIDDLE_RIGHT);
app.stage.addChild(g);
app.start();


// function getCirle(): Graphics {
// 	let g: Graphics = new Graphics();
// 	g.x = GAME_WINDOW_CENTER.getX();
// 	g.y = GAME_WINDOW_CENTER.getY();
// 	g.lineStyle(4, 'rgb(170, 170, 100)');
// 	//g.beginFill('rgb(170, 170, 150)');
// 	g.drawCircle(0, 0, 10);
// 	return g;
// }

// let line1 = getLine(new Coordinate(100, 100), new Coordinate(100, 300), 6);
// let line2 = getLine(new Coordinate(100, 100), new Coordinate(150, 300), 6);
// let circle1 = getCirle();

// app.stage.addChild(line1);
// app.stage.addChild(line2);
// app.stage.addChild(circle1);

// console.log("CIRCLE : " + circle1.x + " " + circle1.y);
// console.log("LINE : " + line1.x + " " + line1.y);

