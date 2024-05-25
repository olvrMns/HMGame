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
                currentXPosition+=this.columnsWidth;
            };
            currentYPosition+=this.rowsHeight;
        };
    }

    public drawBorders(): void {
        const graphics: Graphics = new Graphics();
        let currentXPosition: number;
        let currentYPosition: number = this.y;
        graphics.lineStyle(ApplicationUtils.DEFAULT_LINE_STYLE);
        for (let row = 0; row < this.rows; row++) {
            currentXPosition = this.x;
            graphics.moveTo(currentXPosition, currentYPosition);
            graphics.lineTo(currentXPosition, currentYPosition + this.rowsHeight);
            graphics.moveTo(currentXPosition, currentYPosition);
            for (let column = 0; column < this.columns; column++) {
                currentXPosition+=this.columnsWidth;
                graphics.lineTo(currentXPosition, currentYPosition);
                graphics.lineTo(currentXPosition, currentYPosition + this.rowsHeight);
                graphics.lineTo(currentXPosition - this.columnsWidth, currentYPosition + this.rowsHeight);
                graphics.moveTo(currentXPosition, currentYPosition);
            }
            currentYPosition+=this.rowsHeight;
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

    public addContainer(container: T): void {
        this.reSizeContainerToGridSpace(container);
        this.addChild(container);
    }

    public getContainer(column: number, row: number): T | null{
        return this.gridElements[row][column].container;
    }

    public reSizeContainerToGridSpace(container: T): void {
        container.width = this.columnsWidth;
        container.height = this.rowsHeight;
    }

    public setContainerAt(container: T, column: number, row: number): void {
        this.addContainer(container);
        this.gridElements[row][column].setContainer(container);
    }

    public unSetContainerAt(column: number, row: number): void {
        this.gridElements[row][column].container = null;
    }

    public setContainersFromArray(...containers: T[]): void {
        let currentRow: number = 0; 
        let currentColumn: number = 0;
        for (let elem = 0; elem < containers.length; elem++) {
            this.setContainerAt(containers[elem], currentColumn, currentRow);
            currentColumn++;
            if (currentColumn >= this.columns) {
                currentColumn = 0;
                currentRow++;
            };
        };
    }
}