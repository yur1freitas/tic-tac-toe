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
 * @prop {Player} player1
 * @prop {Player} player2
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
    _player1
    _player2

    _firstPlayer
    _currentPlayer

    _tie
    _board
    _result

    /** @param {GameProps} */
    constructor({
        tie = 0,
        board = Board.create(),
        result = new Result(),
        player1,
        player2,
        firstPlayer,
        currentPlayer
    }) {
        super()

        this._tie = tie
        this._board = board
        this._result = result
        this._player1 = player1
        this._player2 = player2
        this._firstPlayer = firstPlayer
        this._currentPlayer = currentPlayer
    }

    get player1() {
        return this._player1
    }

    get player2() {
        return this._player2
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
            tie: this._tie,
            board: this._board,
            result: this._result,
            player1: this._player1,
            player2: this._player2,
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

        const { player1, player2, tie } = this._updateScore(result)

        const game = this.clone({
            player1,
            player2,
            result,
            board,
            tie
        })

        return game._switchCurrentPlayers()
    }

    /** @returns {Game} */
    nextRound() {
        const firstPlayer = this._firstPlayer.type === this._player1.type ? this._player2 : this._player1

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
        const player1 = this._player1.reset()
        const player2 = this._player2.reset()

        const firstPlayer = this._firstPlayer.type === this._player1.type ? player2 : player1

        const tie = 0
        const board = Board.create()
        const result = new Result()

        return this.clone({
            currentPlayer: firstPlayer,
            firstPlayer,
            player1,
            player2,
            result,
            board,
            tie
        })
    }

    /** @returns {Game} */
    _switchCurrentPlayers() {
        if (!this.result.inProgress) {
            return this
        }

        const currentPlayer = this._currentPlayer.type === this._player1.type ? this._player2 : this._player1

        return this.clone({ currentPlayer })
    }

    /**
     *
     * @param {Result} result
     * @returns {{player1: Player, player2: Player, tie: number}}
     */
    _updateScore(result) {
        const { player1, player2, tie } = this

        if (result.isWinner(this.player1)) {
            return { tie, player2, player1: player1.addScore(1) }
        }

        if (result.isWinner(this.player2)) {
            return { tie, player1, player2: player2.addScore(1) }
        }

        if (result.isTie) {
            return { player1, player2, tie: tie + 1 }
        }

        return { player1, player2, tie }
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
     * @param {Player} player1
     * @param {Player} player2
     * @returns {Game}
     */
    static create(player1, player2) {
        return new Game({
            currentPlayer: player1,
            firstPlayer: player1,
            player1,
            player2
        })
    }
}
