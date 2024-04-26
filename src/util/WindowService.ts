import Coordinate from "../entities/Coordinate";

/**
 * @Ref
 * - https://refactoring.guru/design-patterns/singleton/typescript/example
 * @Note
 * - Singleton window utility class
 */
export default class WindowService {
    private static instance: WindowService;
    private static DEFAULT_RP = 1;
    public windowWidth: number;
    public windowHeight: number;
    /**
     * @Important these are the coordinate of the center of the browser
     * window, and not the game window
     * - gameWindowCenterCoordinate <- to get the center
     */
    public centerCoordinate: Coordinate;
    public gameWindowCenterCoordinate: Coordinate;
    /**
     * @Note Window reduction percentage (RP) 0.6 - 1
     */
    public reductionPercentage: number;
    public gameWindowWidth: number;
    public gameWindowHeight: number;

    public PSC_UPPER_RIGHT: Coordinate;
    public PSC_UPPER_MIDDLE: Coordinate;
    public PSC_UPPER_LEFT: Coordinate;
    public PSC_BOTTOM_RIGHT: Coordinate;
    public PSC_BOTTOM_MIDDLE: Coordinate;
    public PSC_BOTTOM_LEFT: Coordinate;
    public PSC_MIDDLE_RIGHT: Coordinate;
    public PSC_MIDDLE_LEFT: Coordinate;

    private constructor(reductionPercentage: number = WindowService.DEFAULT_RP) {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.reductionPercentage = reductionPercentage;
        this.gameWindowWidth = this.windowWidth * this.reductionPercentage;
        this.gameWindowHeight = this.windowHeight * this.reductionPercentage;
        this.centerCoordinate = new Coordinate(this.gameWindowWidth/2, this.gameWindowHeight/2);
        this.gameWindowCenterCoordinate = new Coordinate(0, 0);
        this.PSC_BOTTOM_RIGHT = new Coordinate(this.gameWindowWidth, this.gameWindowHeight);
        this.PSC_UPPER_RIGHT = new Coordinate(this.gameWindowWidth, -this.gameWindowHeight);
        this.PSC_BOTTOM_LEFT = new Coordinate(-this.gameWindowWidth, this.gameWindowHeight)
        this.PSC_UPPER_LEFT = new Coordinate(-this.gameWindowWidth, -this.gameWindowHeight);
        this.PSC_MIDDLE_RIGHT = new Coordinate(this.centerCoordinate.x, 0);
        this.PSC_MIDDLE_LEFT = new Coordinate(-this.centerCoordinate.x, 0);
        this.PSC_UPPER_MIDDLE = new Coordinate(0, -this.centerCoordinate.y);
        this.PSC_BOTTOM_MIDDLE = new Coordinate(0, this.centerCoordinate.y);
    }

    public getGameWindowCenterCoordinate(): Coordinate {
        return this.gameWindowCenterCoordinate;
    }

    public static getInstance(reductionPercentage: number = WindowService.DEFAULT_RP): WindowService {
        if (!WindowService.instance) WindowService.instance = new WindowService(reductionPercentage);
        return WindowService.instance;
    }

    public static getResizedInstance(): WindowService {
        this.instance = new WindowService();
        return this.instance;
    }
}   