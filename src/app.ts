import { Application, Graphics } from 'pixi.js'
import Coordinate from './entities/Coordinate';
import Line from "./entities/Line";
import WindowService from "./util/WindowService";
import {CircleCore, RectangularCore} from "./implementation/Cores"

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

const g: Graphics = new Graphics;
g.x = WS.centerCoordinate.x;
g.y = WS.centerCoordinate.y;
g.lineStyle(5, 'rgb(190, 170, 224)');
//g.beginFill('rgb(170, 170, 150)');
//const t1 = new RectangularCore(g);
const t2 = new CircleCore(g);
app.stage.addChild(g);
app.start();