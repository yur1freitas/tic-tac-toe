import { Cell } from '../../shared/Cell.js'
import { Result } from './Result.js'

export class CellsChecker {
    /** @type {Cell[]} */
    #cells

    /** @param {Cell[]} cells */
    constructor(cells) {
        this.#cells = cells
    }

    /**
     *
     * @returns {Result}
     */
    verifyResult() {
        const types = this.#cells.map((cell) => cell.type)

        const firstType = types[0]
        const sameType = types.every((type) => type !== Cell.Empty && type === firstType)

        return sameType ? new Result({ moves: this.#cells }) : new Result()
    }
}
