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
    _type
    _row
    _col

    static Cross = 2
    static Circle = 1
    static Empty = 0

    /** @param {CellProps} */
    constructor({ row, col, type = Cell.Empty }) {
        super()

        this._type = type
        this._row = row
        this._col = col
    }

    get type() {
        return this._type
    }

    get row() {
        return this._row
    }

    get col() {
        return this._col
    }

    /** @returns {CellProps} */
    get props() {
        return {
            type: this._type,
            row: this._row,
            col: this._col
        }
    }

    get isMarked() {
        return this._type !== Cell.Empty
    }

    get isEmpty() {
        return this._type === Cell.Empty
    }

    mark(type) {
        if (this._type !== Cell.Empty) {
            return this
        }

        return this.clone({ type })
    }
}
