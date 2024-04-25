import { Application, Graphics, Sprite } from 'pixi.js'
import Coordinate from './entities/Coordinate';

const GAME_WINDOW_WIDTH = Math.round(window.innerWidth * 0.5); //90%
const GAME_WINDOW_HEIGHT = Math.round(window.innerHeight * 0.5);
const GAME_WINDOW_CENTER: Coordinate = new Coordinate(GAME_WINDOW_WIDTH/2, GAME_WINDOW_HEIGHT/2); 

const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6435ed,
	width: GAME_WINDOW_WIDTH,
	height: GAME_WINDOW_HEIGHT,
	autoStart: false
});

function getLine(from: Coordinate, to: Coordinate, lineThickness: number): Graphics {
	let g: Graphics = new Graphics();
	g.x = GAME_WINDOW_CENTER.getX();
	g.y = GAME_WINDOW_CENTER.getY();
	g.lineStyle(lineThickness, 'rgb(170, 170, 224)');
	g.moveTo(from.getX(), from.getY());
	g.lineTo(to.getX(), to.getY());
	return g;
}

function getCirle(): Graphics {
	let g: Graphics = new Graphics();
	g.x = GAME_WINDOW_CENTER.getX();
	g.y = GAME_WINDOW_CENTER.getY();
	g.lineStyle(4, 'rgb(170, 170, 100)');
	//g.beginFill('rgb(170, 170, 150)');
	g.drawCircle(0, 0, 10);
	return g;
}

let line1 = getLine(new Coordinate(100, 100), new Coordinate(100, 300), 6);
let line2 = getLine(new Coordinate(100, 100), new Coordinate(150, 300), 6);
let circle1 = getCirle();

app.stage.addChild(line1);
app.stage.addChild(line2);
app.stage.addChild(circle1);

console.log("CIRCLE : " + circle1.x + " " + circle1.y);
console.log("LINE : " + line1.x + " " + line1.y);

app.start();
