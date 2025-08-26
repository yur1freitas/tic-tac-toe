import { CellsChecker } from './CellsChecker.js'
import { Board } from '../game/Board.js'
import { Result } from './Result.js'

export class RowsChecker {
    /**
     * @param {Board} board
     * @returns {Result}
     */
    verifyBoard(board) {
        for (const row of board.grid.rows()) {
            const checker = new CellsChecker(row)
            const result = checker.verifyResult()

            if (result.isFinished) {
                return result
            }
        }

        return new Result()
    }
}
