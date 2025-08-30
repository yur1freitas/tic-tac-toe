import { randomInt } from '../../../utils/randomInt.js'
import { Game } from '../game/Game.js'

/**
 * @typedef Difficulty
 * @type {'easy' | 'normal' | 'medium' | 'hard'}
 */

export const DifficultyLevels = {
    easy: 0.75,
    normal: 0.5,
    medium: 0.25,
    hard: 0
}

export class AI {
    _difficulty

    /** @param {Difficulty} difficulty */
    constructor(difficulty = 'normal') {
        this._difficulty = difficulty
    }

    get difficulty() {
        return this._difficulty
    }

    /**
     * @param {Game} game
     * @returns {Game}
     */
    mark(game) {
        const [row, col] = game.board.isEmpty
            ? AI._getRandomMove(game)
            : AI._positionByDifficulty(game, this._difficulty)

        return game.mark(row, col)
    }

    /**
     *
     * @param {Game} game
     * @returns {[number, number]}
     */
    static _getRandomMove(game) {
        const row = randomInt(0, game.board.size - 1)
        const col = randomInt(0, game.board.size - 1)

        const cell = game.board.getCell(row, col)

        if (cell === null || cell.isMarked) {
            return this._getRandomMove(game)
        }

        return [row, col]
    }

    static _positionByDifficulty(game, mode) {
        const probability = Object.prototype.hasOwnProperty.call(DifficultyLevels, mode)
            ? DifficultyLevels[mode]
            : 'normal'
        const value = Math.random()

        return value > probability ? AI._findBestMove(game) : AI._getRandomMove(game)
    }

    /**
     *
     * @param {Game} game
     * @returns {[number, number]}
     */
    static _findBestMove(game) {
        let bestScore = -Infinity
        let bestPosition = [-1, -1]

        for (const cell of game.board.cells) {
            if (cell.isEmpty) {
                const _temp = game.mark(cell.row, cell.col)
                const score = AI._minimax(_temp)

                if (score > bestScore) {
                    bestScore = score
                    bestPosition = [cell.row, cell.col]
                }
            }
        }

        return bestPosition
    }

    /**
     *
     * @param {Game} game
     * @param {number} beta
     * @param {number} alpha
     * @param {number} depth
     * @returns {number}
     */
    static _minimax(game, beta = Infinity, alpha = -Infinity, depth = 0) {
        const [user, bot] = game.player1.isAI ? [game.player1, game.player2] : [game.player2, game.player1]

        const isAI = game.currentPlayer.isAI

        if (game.result.isWinner(user)) return -10 + depth
        if (game.result.isWinner(bot)) return +10 + depth
        if (game.result.isTie) return 0

        if (isAI) {
            for (const cell of game.board.cells) {
                if (cell.isEmpty) {
                    const _temp = game.mark(cell.row, cell.col)

                    const score = AI._minimax(_temp, beta, alpha, depth + 1)
                    alpha = Math.max(alpha, score)

                    if (beta <= alpha) {
                        break
                    }
                }
            }

            return alpha
        } else {
            for (const cell of game.board.cells) {
                if (cell.isEmpty) {
                    const _temp = game.mark(cell.row, cell.col)

                    const score = AI._minimax(_temp, beta, alpha, depth + 1)
                    beta = Math.min(beta, score)

                    if (beta <= alpha) {
                        break
                    }
                }
            }

            return beta
        }
    }
}
