import { Container, Graphics } from "pixi.js";
import { GridOptions } from "../../types";
import { Coordinate } from "../obj/Coordinate";
import { ApplicationUtils } from "../util/ApplicationUtils";

class GridSpace<T extends Container> {
    public container: T | null;
    public coordinate: Coordinate;

    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate;
        this.container = null;
    }

    public setContainer(container: T) {
        this.container = container;
        this.container.x = this.coordinate.x;
        this.container.y = this.coordinate.y;
    }
}

/**
 * @Note (generic should probably be removed?)
 * - could be renamed to VirtualContainerGrid
 * - virtualWidth and virtualHeight => the width/height property of a container doesn't change (stays at 0) if it's empty
 * @description Container representing a customizable (only on initialization) grid
 * - still need to add spacing between GridSpaces
 */
export class GridContainer<T extends Container> extends Container {
    private columns: number;
    private rows: number;
    private virtualWidth: number;
    private virtualHeight: number;
    private columnsWidth: number;
    private rowsHeight: number;
    private xSpacing: number;
    private ySpacing: number;
    private gridElements: GridSpace<T>[][] = [];

    constructor(params: GridOptions) {
        super()
        this.width = params.width;
        this.height = params.height;
        this.virtualWidth = params.width;
        this.virtualHeight = params.height;
        this.columns = params.columns;
        this.rows = params.rows;
        this.columnsWidth = this.virtualWidth/this.columns;
        this.rowsHeight = this.virtualHeight/this.rows;
        this.xSpacing = params.xSpacing ? params.xSpacing : 0;
        this.ySpacing = params.ySpacing ? params.ySpacing : 0;
        this.setGridSpaces();
        if (params.showBorders === true) this.drawBorders();
        if (params.centerCoordinate) this.rePosition(params.centerCoordinate); 
    }

    /**
     * @description the center of a GridSpace is 
     * - ((the current X position + half of the width of a column) and (the current y position + half of the height of a row))
     * - after reaching the last column of a row, the current Y position is incremented by the height of a row to "switch" rows
     */
    public setGridSpaces(): void {
        let currentXPosition: number;
        let currentYPosition: number = this.y;
        for (let row = 0; row < this.rows; row++) {
            currentXPosition = this.x;
            this.gridElements.push([]);
            for (let column = 0; column < this.columns; column++) {
                this.gridElements[row].push(new GridSpace<T>(Coordinate.of(currentXPosition + this.columnsWidth/2, currentYPosition + this.rowsHeight/2)));
                currentXPosition+=(this.columnsWidth + this.xSpacing);
            };
            currentYPosition+=(this.rowsHeight + this.ySpacing);
        };
    }

    /**
     * @description probably needs to be optimized...
     */
    public drawBorders(): void {
        const graphics: Graphics = new Graphics();
        let currentXPosition: number;
        let currentYPosition: number = this.y;
        graphics.lineStyle(ApplicationUtils.DEFAULT_LINE_STYLE);
        for (let row = 0; row < this.rows; row++) {
            currentXPosition = this.x;
            for (let column = 0; column < this.columns; column++) {
                graphics.moveTo(currentXPosition, currentYPosition);
                graphics.lineTo(currentXPosition, currentYPosition + this.rowsHeight);
                graphics.moveTo(currentXPosition, currentYPosition);
                graphics.lineTo(currentXPosition + this.columnsWidth, currentYPosition);
                graphics.lineTo(currentXPosition + this.columnsWidth, currentYPosition + this.rowsHeight);
                currentXPosition+=(this.columnsWidth + this.xSpacing);
                graphics.lineTo(currentXPosition - this.columnsWidth - this.xSpacing, currentYPosition + this.rowsHeight);
                graphics.moveTo(currentXPosition, currentYPosition);
            }
            currentYPosition+=(this.rowsHeight + this.ySpacing);
        };
        graphics.x+=this.columnsWidth/2;
        graphics.y+=this.rowsHeight/2;
        this.addChild(graphics);
    }

    /**
     * @description the [position] of a container is its left upper corner and not its actual center,
     * so we need to substract the width/height to center from coordinates passed in parameters
     * @param coordinate where the center of the container will be moved 
     */
    public rePosition(coordinate: Coordinate): void {
        this.x = coordinate.x - this.virtualWidth;
        this.y = coordinate.y - this.virtualHeight;
    }

    public addContainer(container: T, resize: boolean): void {
        if (resize) this.reSizeContainerToGridSpace(container);
        this.addChild(container);
    }

    public getContainer(column: number, row: number): T | null{
        return this.gridElements[row][column].container;
    }

    public reSizeContainerToGridSpace(container: T): void {
        container.width = this.columnsWidth;
        container.height = this.rowsHeight;
    }

    public setContainerAt(container: T, resize: boolean, column: number, row: number): void {
        this.addContainer(container, resize);
        this.gridElements[row][column].setContainer(container);
    }

    public unSetContainerAt(column: number, row: number): void {
        this.gridElements[row][column].container = null;
    }

    public setContainersFromArray(resize: boolean, ...containers: T[]): void {
        let currentRow: number = 0; 
        let currentColumn: number = 0;
        for (let elem = 0; elem < containers.length; elem++) {
            this.setContainerAt(containers[elem], resize, currentColumn, currentRow);
            currentColumn++;
            if (currentColumn >= this.columns) {
                currentColumn = 0;
                currentRow++;
            };
        };
    }
}