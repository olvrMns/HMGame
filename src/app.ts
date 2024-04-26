import { Application, Graphics } from 'pixi.js'
import Coordinate from './entities/Coordinate';
import Line from "./entities/Line";
import WindowService from "./util/WindowService";
import {CircleLevel, RectangularLevel} from "./implementation/Levels"
import Level from './entities/abstract/AbstractLevel';

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
const level1: Level = new RectangularLevel(g);
level1.draw();
app.stage.addChild(g);
app.start();