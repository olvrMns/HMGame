import { Ticker, TickerCallback } from "pixi.js";

/**
 * @description will be it's own data structure for the whole application at some point
 * - UnPausable tickers are the ones that shouldn't be stopped (ex: input reading ticker, so we can unpause)
 * - Pausable tickers (ex: mian game loop)
 */
export class TickerController {
    private unPausableTickers: Ticker[] = [];
    private pausableTickers: Ticker[] = [];
    private paused: boolean = false;

    constructor(...pausableTickers: TickerCallback<any>[]) {
        this.addAllPausableTickers(...pausableTickers);
    }

    public static of(...pausableTickers: TickerCallback<any>[]) {
        return new TickerController(...pausableTickers);
    }

    public getTicker(callback: TickerCallback<any>): Ticker {
        const nTicker: Ticker = new Ticker();
        nTicker.add(callback);
        nTicker.start();
        return nTicker;
    }

    public pause() {
        this.paused = true;
        this.stopPausableTickers();
    }

    public unPause() {
        this.paused = false;
        this.startPausableTickers();
    }

    public isPaused() {
        return this.paused == true;
    }

    public addPausableTicker(callback: TickerCallback<any>) {
        this.pausableTickers.push(this.getTicker(callback));
    }

    public addAllPausableTickers(...pausableTickers: TickerCallback<any>[]) {
        for (let elem of pausableTickers) this.addPausableTicker(elem);
    }

    public addUnPausableTicker(callback: TickerCallback<any>) {
        this.unPausableTickers.push(this.getTicker(callback));
    }

    public addAllUnPausableTickers(...unPausableTickers: TickerCallback<any>[]) {
        for (let elem of unPausableTickers) this.addUnPausableTicker(elem);
    }

    public clear() {
        this.unPausableTickers = [];
        this.pausableTickers = [];
    }

    public destroyAll() {
        this.pausableTickers.forEach(tickter => tickter.destroy());
        this.unPausableTickers.forEach(tickter => tickter.destroy());
        this.clear();
    }

    public stopPausableTickers() {
        this.pausableTickers.forEach(ticker => ticker.stop());
    }

    public startPausableTickers() {
        this.pausableTickers.forEach(ticker => ticker.start());
    }

    /**
     * @Note NOT YET IMPLEMENTED
     * @param callback 
     */
    public remove(callback: () => Ticker) {
        throw new Error("NOT YET IMPLEMENTED");
    }
}