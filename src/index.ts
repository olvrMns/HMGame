import { Application, Sprite } from 'pixi.js'
//https://github.com/miltoncandelero/pixi-hotwire

function init(app: Application<HTMLCanvasElement>): void {
		
}

const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6435ed,
	width: 640,
	height: 480
});

const clampy: Sprite = Sprite.from("clampy.png");
clampy.height = 100;
clampy.width = 100;
clampy.anchor.set(0.1);
clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;
app.stage.addChild(clampy);

const t = app.ticker;

t.add((delta) => {

})

t.start();
