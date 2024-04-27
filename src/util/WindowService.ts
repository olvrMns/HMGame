import Coordinate from "../entities/Coordinate";

/**
 * @Ref
 * - https://refactoring.guru/design-patterns/singleton/typescript/example
 * @Note
 * - Singleton window utility class
 */
export default class WindowService {
    private static instance: WindowService;
    public windowWidth: number;
    public windowHeight: number;
    /**
     * @Important these are the coordinate of the center of the browser
     * window, and not the game window
     * - gameWindowCenterCoordinate <- to get the center
     */
    public centerCoordinate: Coordinate;
    public gameWindowCenterCoordinate: Coordinate;
    public PSC_UPPER_RIGHT: Coordinate;
    public PSC_UPPER_MIDDLE: Coordinate;
    public PSC_UPPER_LEFT: Coordinate;
    public PSC_BOTTOM_RIGHT: Coordinate;
    public PSC_BOTTOM_MIDDLE: Coordinate;
    public PSC_BOTTOM_LEFT: Coordinate;
    public PSC_MIDDLE_RIGHT: Coordinate;
    public PSC_MIDDLE_LEFT: Coordinate;

    private constructor() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.centerCoordinate = new Coordinate(this.windowWidth/2, this.windowHeight/2);
        this.gameWindowCenterCoordinate = new Coordinate(0, 0);
        this.PSC_BOTTOM_RIGHT = new Coordinate(this.windowWidth, this.windowHeight);
        this.PSC_UPPER_RIGHT = new Coordinate(this.windowWidth, -this.windowHeight);
        this.PSC_BOTTOM_LEFT = new Coordinate(-this.windowWidth, this.windowHeight)
        this.PSC_UPPER_LEFT = new Coordinate(-this.windowWidth, -this.windowHeight);
        this.PSC_MIDDLE_RIGHT = new Coordinate(this.centerCoordinate.x, 0);
        this.PSC_MIDDLE_LEFT = new Coordinate(-this.centerCoordinate.x, 0);
        this.PSC_UPPER_MIDDLE = new Coordinate(0, -this.centerCoordinate.y);
        this.PSC_BOTTOM_MIDDLE = new Coordinate(0, this.centerCoordinate.y);
    }

    public getGameWindowCenterCoordinate(): Coordinate {
        return this.gameWindowCenterCoordinate;
    }

    public static getInstance(): WindowService {
        if (!WindowService.instance) WindowService.instance = new WindowService();
        return WindowService.instance;
    }
}   