/**
 * @template T
 * @class Grid
 */
export class Grid {
    /** @type {T[][]} */
    #data

    /** @param {T[][]} data */
    constructor(data) {
        this.#data = data
    }

    get size() {
        return this.#data.length
    }

    data() {
        return this._copy()
    }

    _copy() {
        return this.#data.map((row) => [...row])
    }

    values() {
        return this.#data.flat()
    }

    /**
     * @returns {T[][]}
     */
    rows() {
        return this.#data.map((row) => [...row])
    }

    /**
     * @returns {T[][]}
     */
    cols() {
        return this.#data.map((row, i) => row.map((_, j) => this.#data[j][i]))
    }

    /**
     * @returns {T[][]}
     */
    diagonals() {
        const primary = this.#data.map((_, i) => this.#data[i][i])
        const secondary = this.#data.map((_, i) => this.#data[i][this.size - 1 - i])

        return [primary, secondary]
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

        return this.#data[row][col]
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
