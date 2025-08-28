import { Result } from '../result/Result.js'
import { Player } from '../player/Player.js'
import { Board } from './Board.js'

import { RowsChecker } from '../result/RowsChecker.js'
import { ColsChecker } from '../result/ColsChecker.js'
import { DiagonalsChecker } from '../result/DiagonalsChecker.js'
import { TieChecker } from '../result/TieChecker.js'
import { Model } from '../../shared/Model.js'

/**
 * @typedef GameProps
 * @prop {Player} user
 * @prop {Player} ai
 * @prop {Player} firstPlayer
 * @prop {Player} currentPlayer
 * @prop {number} tie
 * @prop {Board} board
 * @prop {Result} result
 *
 * @extends {Model<GameProps>}
 * @class Game
 */
export class Game extends Model {
    _user
    _ai

    _firstPlayer
    _currentPlayer

    _tie
    _board
    _result

    /** @param {GameProps} */
    constructor({ user, ai, firstPlayer, currentPlayer, tie = 0, board = Board.create(), result = new Result() }) {
        super()

        this._user = user
        this._ai = ai
        this._firstPlayer = firstPlayer
        this._currentPlayer = currentPlayer
        this._tie = tie
        this._board = board
        this._result = result
    }

    get user() {
        return this._user
    }

    get ai() {
        return this._ai
    }

    get firstPlayer() {
        return this._firstPlayer
    }

    get currentPlayer() {
        return this._currentPlayer
    }

    get tie() {
        return this._tie
    }

    get board() {
        return this._board
    }

    get result() {
        return this._result
    }

    /** @returns {Game} */
    get props() {
        return {
            ai: this._ai,
            tie: this._tie,
            user: this._user,
            board: this._board,
            result: this._result,
            firstPlayer: this._firstPlayer,
            currentPlayer: this._currentPlayer
        }
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {Game}
     */
    mark(row, col) {
        if (this.board.isMarkedCell(row, col) || this.result.isFinished) {
            return this
        }

        const board = this.board.markCell({
            type: this.currentPlayer.type,
            row,
            col
        })

        const result = this._verifyResult(board)

        const { user, ai, tie } = this._updateScore(result)

        const game = this.clone({
            result,
            board,
            user,
            tie,
            ai
        })

        return game._switchCurrentPlayers()
    }

    /** @returns {Game} */
    nextRound() {
        const firstPlayer = this._firstPlayer.type === this._user.type ? this._ai : this._user

        const board = Board.create()
        const result = new Result()

        return this.clone({
            currentPlayer: firstPlayer,
            firstPlayer,
            result,
            board
        })
    }

    /**
     *
     * @returns {Game}
     */
    reset() {
        const user = this._user.reset()
        const ai = this._ai.reset()

        const firstPlayer = this._firstPlayer.type === this._user.type ? ai : user

        const tie = 0
        const board = Board.create()
        const result = new Result()

        return this.clone({
            currentPlayer: firstPlayer,
            firstPlayer,
            result,
            board,
            user,
            tie,
            ai
        })
    }

    /** @returns {Game} */
    _switchCurrentPlayers() {
        if (!this.result.inProgress) {
            return this
        }

        const currentPlayer = this._currentPlayer.type === this._user.type ? this._ai : this._user

        return this.clone({ currentPlayer })
    }

    /**
     *
     * @param {Result} result
     * @returns {{user: Player, ai: Player, tie: number}}
     */
    _updateScore(result) {
        const { user, ai, tie } = this

        if (result.isWinner(this.user)) {
            return { tie, ai, user: user.addScore(1) }
        }

        if (result.isWinner(this.ai)) {
            return { tie, user, ai: ai.addScore(1) }
        }

        if (result.isTie) {
            return { user, ai, tie: tie + 1 }
        }

        return { user, ai, tie }
    }

    /**
     *
     * @param {Board} board
     * @returns {Result}
     */
    _verifyResult(board) {
        const colsResult = new ColsChecker().verifyBoard(board)
        const rowsResult = new RowsChecker().verifyBoard(board)
        const diagonalsResult = new DiagonalsChecker().verifyBoard(board)

        const results = [colsResult, rowsResult, diagonalsResult]

        return results.find((result) => result.isFinished) ?? new TieChecker().verifyBoard(board)
    }

    /**
     *
     * @param {Player} user
     * @param {Player} ai
     * @returns {Game}
     */
    static create(user, ai) {
        return new Game({
            currentPlayer: user,
            firstPlayer: user,
            user,
            ai
        })
    }
}
