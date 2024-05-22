import { Ticker, TickerCallback } from "pixi.js";

/**
     * @description will be it's own data structure for the whole application at some point
     */
export class TickerController {
    private tickers: Ticker[] = [];

    constructor(...tickers: TickerCallback<any>[]) {
        this.addAll(...tickers);
    }

    public static of(...tickers: TickerCallback<any>[]) {
        return new TickerController(...tickers);
    }

    public addAll(...tickers: TickerCallback<any>[]) {
        for (let elem of tickers) this.add(elem);
    }

    public add(callback: TickerCallback<any>) {
        const nTicker: Ticker = new Ticker();
        nTicker.add(callback);
        nTicker.start();
        this.tickers.push(nTicker);
    }

    public destroyAll() {
        this.tickers.forEach(tickter => tickter.destroy());
    }

    /**
     * @Note NOT YET IMPLEMENTED
     * @param callback 
     */
    public remove(callback: () => Ticker) {
        throw new Error("NOT YET IMPLEMENTED");
    }
}