import { Result } from './Result.js'
import { Board } from '../game/Board.js'

export class TieChecker {
    /**
     *
     * @param {Board} board
     * @returns {Result}
     */
    verifyBoard(board) {
        return board.isFull ? new Result({ moves: [], isTie: true }) : new Result()
    }
}
