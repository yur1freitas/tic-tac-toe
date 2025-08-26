import { CellsChecker } from './CellsChecker.js'
import { Board } from '../game/Board.js'
import { Result } from './Result.js'

export class ColsChecker {
    /**
     * @param {Board} board
     * @returns {Result}
     */
    verifyBoard(board) {
        for (const col of board.grid.cols()) {
            const checker = new CellsChecker(col)
            const result = checker.verifyResult()

            if (result.isFinished) {
                return result
            }
        }

        return new Result()
    }
}
