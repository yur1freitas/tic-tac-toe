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
    #player1
    #player2

    #firstPlayer
    #currentPlayer

    #tie
    #board
    #result

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

        this.#tie = tie
        this.#board = board
        this.#result = result
        this.#player1 = player1
        this.#player2 = player2
        this.#firstPlayer = firstPlayer
        this.#currentPlayer = currentPlayer
    }

    get player1() {
        return this.#player1
    }

    get player2() {
        return this.#player2
    }

    get firstPlayer() {
        return this.#firstPlayer
    }

    get currentPlayer() {
        return this.#currentPlayer
    }

    get tie() {
        return this.#tie
    }

    get board() {
        return this.#board
    }

    get result() {
        return this.#result
    }

    /** @returns {Game} */
    get props() {
        return {
            tie: this.#tie,
            board: this.#board,
            result: this.#result,
            player1: this.#player1,
            player2: this.#player2,
            firstPlayer: this.#firstPlayer,
            currentPlayer: this.#currentPlayer
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

        const result = this.#verifyResult(board)

        const { player1, player2, tie } = this.#updateScore(result)

        const game = this.clone({
            player1,
            player2,
            result,
            board,
            tie
        })

        return game.#switchCurrentPlayers()
    }

    /** @returns {Game} */
    nextRound() {
        const firstPlayer = this.#firstPlayer.type === this.#player1.type ? this.#player2 : this.#player1

        const board = Board.create()
        const result = new Result()

        return this.clone({
            currentPlayer: firstPlayer,
            firstPlayer,
            result,
            board
        })
    }

    /** @returns {Game} */
    reset() {
        const player1 = this.#player1.reset()
        const player2 = this.#player2.reset()

        const firstPlayer = this.#firstPlayer.type === this.#player1.type ? player2 : player1

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
    #switchCurrentPlayers() {
        if (!this.result.inProgress) {
            return this
        }

        const currentPlayer = this.#currentPlayer.type === this.#player1.type ? this.#player2 : this.#player1

        return this.clone({ currentPlayer })
    }

    /**
     * @param {Result} result
     * @returns {{player1: Player, player2: Player, tie: number}}
     */
    #updateScore(result) {
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
     * @param {Board} board
     * @returns {Result}
     */
    #verifyResult(board) {
        const colsResult = new ColsChecker().verifyBoard(board)
        const rowsResult = new RowsChecker().verifyBoard(board)
        const diagonalsResult = new DiagonalsChecker().verifyBoard(board)

        const results = [colsResult, rowsResult, diagonalsResult]

        return results.find((result) => result.isFinished) ?? new TieChecker().verifyBoard(board)
    }

    /**
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
