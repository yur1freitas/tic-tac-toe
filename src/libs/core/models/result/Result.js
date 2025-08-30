import { Cell } from '../../shared/Cell.js'

/**
 * @typedef ResultProps
 *
 * @prop {Cell[]} moves
 * @prop {boolean} isTie
 */

export class Result {
    #moves
    #isTie

    /** @param {ResultProps} */
    constructor({ moves = [], isTie = false } = {}) {
        this.#moves = moves
        this.#isTie = isTie
    }

    get moves() {
        return this.#moves
    }

    get isCrossWinner() {
        return this.#moves[0]?.type === Cell.Cross
    }

    get isCircleWinner() {
        return this.#moves[0]?.type === Cell.Circle
    }

    get isTie() {
        return !this.isCrossWinner && !this.isCircleWinner && this.#isTie
    }

    get inProgress() {
        return this.#moves.length === 0 && !this.#isTie
    }

    get isFinished() {
        return !this.inProgress
    }

    /**
     * @param {Player} player
     * @returns {boolean}
     */
    isWinner(player) {
        return this.#moves[0]?.type === player.type && this.isFinished
    }

    /**
     * @param {number} row
     * @param {number} col
     * @returns {boolean}
     */
    hasCell(row, col) {
        const cell = this.#moves.find((cell) => cell.row === row && cell.col === col)
        return Boolean(cell)
    }
}
