import { Grid } from '../../shared/Grid.js'
import { Cell } from '../../shared/Cell.js'

export class Board {
    /** @type {Grid<Cell>} */
    _grid

    /** @param {Grid<Cell>} */
    constructor(grid) {
        this._grid = grid
    }

    get grid() {
        return this._grid
    }

    get size() {
        return this._grid.size
    }

    get cells() {
        return this._grid.values()
    }

    get isFull() {
        return this.cells.every((cell) => cell.isMarked)
    }

    get isEmpty() {
        return this.cells.every((cell) => cell.isEmpty)
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {Cell | null}
     */
    getCell(row, col) {
        return this._grid.get(row, col)
    }

    /**
     *
     * @param {{ type: 2 | 1, row: number, col: number }}
     * @returns {Board}
     */
    markCell({ type, row, col }) {
        const cell = this._grid.get(row, col)

        if (cell === null || cell.isMarked) {
            return this
        }

        const grid = this._grid.set(row, col, cell.mark(type))

        return new Board(grid)
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {boolean}
     */
    isMarkedCell(row, col) {
        return Boolean(this._grid.get(row, col)?.isMarked)
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {boolean}
     */
    isEmptyCell(row, col) {
        return Boolean(this._grid.get(row, col)?.isEmpty)
    }

    static create(size = 3) {
        const grid = Grid.create(size, (row, col) => new Cell({ row, col }))
        return new Board(grid)
    }
}
