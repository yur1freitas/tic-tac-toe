import { Cell } from '../../shared/Cell.js'

/**
 * @typedef ResultProps
 *
 * @prop {Cell[]} moves
 * @prop {boolean} isTie
 */

export class Result {
    _moves
    _isTie

    /** @param {ResultProps} */
    constructor({ moves = [], isTie = false } = {}) {
        this._moves = moves
        this._isTie = isTie
    }

    get moves() {
        return this._moves
    }

    get isCrossWinner() {
        return this._moves[0]?.type === Cell.Cross
    }

    get isCircleWinner() {
        return this._moves[0]?.type === Cell.Circle
    }

    get isTie() {
        return !this.isCrossWinner && !this.isCircleWinner && this._isTie
    }

    get inProgress() {
        return this._moves.length === 0 && !this._isTie
    }

    get isFinished() {
        return !this.inProgress
    }

    /**
     *
     * @param {Player} player
     * @returns {boolean}
     */
    isWinner(player) {
        return this._moves[0]?.type === player.type && this.isFinished
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {boolean}
     */
    hasCell(row, col) {
        const cell = this._moves.find((cell) => cell.row === row && cell.col === col)
        return Boolean(cell)
    }
}
