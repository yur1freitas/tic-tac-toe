import { Model } from './Model.js'

/**
 * @typedef CellProps
 * @prop {2 | 1 | 0} type
 * @prop {number} row
 * @prop {number} col
 *
 * @extends {Model<CellProps>}
 * @class Cell
 */
export class Cell extends Model {
    #type
    #row
    #col

    static Cross = 2
    static Circle = 1
    static Empty = 0

    /** @param {CellProps} */
    constructor({ row, col, type = Cell.Empty }) {
        super()

        this.#type = type
        this.#row = row
        this.#col = col
    }

    get type() {
        return this.#type
    }

    get row() {
        return this.#row
    }

    get col() {
        return this.#col
    }

    /** @returns {CellProps} */
    get props() {
        return {
            type: this.#type,
            row: this.#row,
            col: this.#col
        }
    }

    get isMarked() {
        return this.#type !== Cell.Empty
    }

    get isEmpty() {
        return this.#type === Cell.Empty
    }

    mark(type) {
        if (this.#type !== Cell.Empty) {
            return this
        }

        return this.clone({ type })
    }
}
