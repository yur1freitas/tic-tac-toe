import { Player } from '../libs/core/models/player/Player.js'
import { Game } from '../libs/core/models/game/Game.js'
import { Cell } from '../libs/core/shared/Cell.js'
import { AI } from '../libs/core/models/ai/AI.js'

import { createCellElement } from './createCellElement.js'

export function GameArea() {
    let cpu = new AI()

    const user = new Player({
        type: Cell.Cross,
        name: 'Player'
    })

    const ai = new Player({
        type: Cell.Circle,
        name: 'AI',
        isAI: true
    })

    let game = Game.create(user, ai)

    const board = document.querySelector('.game__board')

    const playerScore = document.querySelector('.score--user > .score__value')
    const aiScore = document.querySelector('.score--ai > .score__value')
    const tieScore = document.querySelector('.score--tie > .score__value')

    const resetBoard = () => {
        board.innerHTML = ''
    }

    const updateScorebar = () => {
        playerScore.textContent = `${game.user.score}`
        aiScore.textContent = `${game.ai.score}`
        tieScore.textContent = `${game.tie}`
    }

    const render = () => {
        resetBoard()
        updateScorebar()

        const { cells } = game.board

        for (const cell of cells) {
            const cellArea = createCellElement(cell)

            cellArea.addEventListener('click', () => {
                game = game.mark(cell.row, cell.col)

                if (game.currentPlayer.isAI) {
                    game = cpu.mark(game)
                }

                if (game.result.isFinished) {
                    updateScorebar()
                }

                render()
            })

            board.appendChild(cellArea)
        }
    }

    const resetGame = () => {
        game = game.reset()

        if (game.firstPlayer === game.ai) {
            game = cpu.mark(game)
        }

        render()
    }

    const nextRound = () => {
        game = game.nextRound()

        if (game.firstPlayer === game.ai) {
            game = cpu.mark(game)
        }

        render()
    }

    const updateDifficulty = (difficulty) => {
        cpu = new AI(difficulty)
        nextRound()
    }

    return { render, nextRound, resetGame, updateDifficulty }
}
