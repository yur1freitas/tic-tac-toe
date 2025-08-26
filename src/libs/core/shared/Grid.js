/**
 * @template T
 * @class Grid
 */
export class Grid {
    /** @type {T[][]} */
    _data

    /** @param {T[][]} data */
    constructor(data) {
        this._data = data
    }

    get size() {
        return this._data.length
    }

    values() {
        return this._data.flat()
    }

    data() {
        return this._copy()
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {T | null}
     */
    get(row, col) {
        if (row < 0 || col < 0 || row >= this.size || col >= this.size) {
            return null
        }

        return this._data[row][col]
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @param {T} value
     * @returns {Grid}
     */
    set(row, col, value) {
        if (row < 0 || col < 0 || row >= this.size || col >= this.size) {
            return this
        }

        const grid = this._copy()
        grid[row][col] = value

        return new Grid(grid)
    }

    /**
     * @returns {T[][]}
     */
    rows() {
        return this._data.map((row) => [...row])
    }

    /**
     * @returns {T[][]}
     */
    cols() {
        return this._data.map((row, i) => row.map((_, j) => this._data[j][i]))
    }

    /**
     * @returns {T[][]}
     */
    diagonals() {
        const primary = this._data.map((_, i) => this._data[i][i])
        const secondary = this._data.map((_, i) => this._data[i][this.size - 1 - i])

        return [primary, secondary]
    }

    _copy() {
        return this._data.map((row) => [...row])
    }

    /**
     *
     * @param {number} size
     * @param {(row: number, col: number) => T | undefined} handler
     * @returns {Grid}
     */
    static create(size, handler) {
        const grid = Array.from({ length: size }, (_, row) => {
            return Array.from({ length: size }, (_, col) => handler(row, col))
        })

        return new Grid(grid)
    }
}
