import { BitmapText, Container } from "pixi.js";
import { BitMapTextGridOptions } from "../../../types";
import { Coordinate } from "../Coordinate";

class GridSpace {
    public bitMapText: BitmapText | null;
    public coordinate: Coordinate;

    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate;
        this.bitMapText = null;
    }

    public static of(coordinate: Coordinate): GridSpace {
        return new GridSpace(coordinate);
    }

    public setBitMapText(bitMapText: BitmapText) {
        this.bitMapText = bitMapText;
        this.bitMapText.x = this.coordinate.x;
        this.bitMapText.y = this.coordinate.y;
    }
}

/**
 * @description [Fixed and not responsive] Object (Container) representing a grid of BitMapTexts
 * will be able to be able to auto resize (set columns/rows automatically) 
 * @Note https://www.html5gamedevs.com/topic/25730-pixicontainer-setting-width-bugs/
 * - virtualWidth and virtualHeight => the width/height property of a container doesn't change (stays at 0) if it's empty
 */
export class BitMapTextGrid extends Container {
    private columns: number;
    private rows: number;
    private virtualWidth: number;
    private virtualHeight: number;
    private columnsWidth: number;
    private rowsHeight: number;
    private gridElements: GridSpace[][] = [];

    constructor(params: BitMapTextGridOptions) {
        super()
        this.width = params.width;
        this.height = params.height;
        this.virtualWidth = params.width;
        this.virtualHeight = params.height;
        this.columns = params.columns;
        this.rows = params.rows;
        this.x = params.x;
        this.y = params.y;
        this.columnsWidth = this.virtualWidth/this.columns;
        this.rowsHeight = this.virtualHeight/this.rows;
        this.build();
    }

    public static of(params: BitMapTextGridOptions): BitMapTextGrid {
        return new BitMapTextGrid(params);
    }

    /**
     * @description the center of a GridSpace is 
     * - ((the current X position + half of the width of a column) and (the current y position + half of the height of a row))
     * - after reaching the last column of a row, the current Y position is incremented by the height of a row to "switch" rows
     */
    public build() {
        let currentXPosition: number;
        let currentYPosition: number = this.y;
        for (let row = 0; row < this.rows; row++) {
            currentXPosition = this.x;
            this.gridElements.push([]);
            for (let column = 0; column < this.columns; column++) {
                this.gridElements[row].push(GridSpace.of(Coordinate.of(currentXPosition + this.columnsWidth/2, currentYPosition + this.rowsHeight/2)));
                currentXPosition+=this.columnsWidth;
            };
            currentYPosition+=this.rowsHeight;
        };
    }

    public getBitMapTextAt(column: number, row: number): BitmapText | null{
        return this.gridElements[row][column].bitMapText;
    }

    public reSizeBitMapTextToSpace(bitMapText: BitmapText): void {
        throw new Error("NOT YET IMPLEMENTED");
    }

    public setBitMapTextAt(bitMapText: BitmapText, column: number, row: number): void {
        this.gridElements[row][column].setBitMapText(bitMapText);
    }

    public unSetBitMapTextAt(column: number, row: number) {
        this.gridElements[row][column].bitMapText = null;
    }

    public setBitMapTextsFromArray(...bitMapTexts: BitmapText[]) {
        let currentRow: number = 0; 
        let currentColumn: number = 0;
        for (let elem = 0; elem < bitMapTexts.length; elem++) {
            this.addChild(bitMapTexts[elem]);
            this.setBitMapTextAt(bitMapTexts[elem], currentColumn, currentRow);
            currentColumn++;
            if (currentColumn >= this.columns) {
                currentColumn = 0;
                currentRow++;
            };
        };
        console.log(this.gridElements);
    }
}