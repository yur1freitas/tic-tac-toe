import { CellsChecker } from './CellsChecker.js'
import { Board } from '../game/Board.js'
import { Result } from './Result.js'

export class DiagonalsChecker {
    /**
     * @param {Board} board
     * @returns {Result}
     */
    verifyBoard(board) {
        for (const diagonal of board.grid.diagonals()) {
            const checker = new CellsChecker(diagonal)
            const result = checker.verifyResult()

            if (result.isFinished) {
                return result
            }
        }

        return new Result()
    }
}
