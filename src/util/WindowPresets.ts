import { Coordinate } from "../obj/Coordinate";

/**
 * @description
 */
export class WindowPresets {
    public static readonly WINDOW_WIDTH = window.innerWidth;
    public static readonly WINDOW_HEIGHT = window.innerHeight;
    public static readonly CENTER_COORDINATE = new Coordinate(this.WINDOW_WIDTH/2, this.WINDOW_HEIGHT/2);
    public static readonly PSC_BOTTOM_RIGHT = new Coordinate(this.WINDOW_WIDTH, this.WINDOW_HEIGHT);
    public static readonly PSC_BOTTOM_LEFT = new Coordinate(0, this.WINDOW_HEIGHT);
    public static readonly PSC_BOTTOM_MIDDLE = new Coordinate(this.CENTER_COORDINATE.x, this.WINDOW_HEIGHT);
    public static readonly PSC_UPPER_RIGHT = new Coordinate(this.WINDOW_WIDTH, 0);
    public static readonly PSC_UPPER_LEFT = new Coordinate(0, 0);
    public static readonly PSC_UPPER_MIDDLE = new Coordinate(this.CENTER_COORDINATE.x, 0);
    public static readonly PSC_MIDDLE_LEFT = new Coordinate(0, this.CENTER_COORDINATE.y);
    public static readonly PSC_MIDDLE_RIGHT = new Coordinate(this.WINDOW_WIDTH, this.CENTER_COORDINATE.y);
}