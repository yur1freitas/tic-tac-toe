import { Player } from '../libs/core/models/player/Player.js'
import { Game } from '../libs/core/models/game/Game.js'
import { Cell } from '../libs/core/shared/Cell.js'
import { AI } from '../libs/core/models/ai/AI.js'

import { createCellElement } from './createCellElement.js'

export function createGame() {
    const player1 = new Player({
        type: Cell.Cross,
        name: 'Jogador 1'
    })

    const player2 = new Player({
        type: Cell.Circle,
        name: 'Jogador 2',
        isAI: true
    })

    let ai = new AI()
    let game = Game.create(player1, player2)

    const board = document.querySelector('.game__board')

    const tieScore = document.querySelector('.score--tie > .score__value')
    const player1Score = document.querySelector('.score--player-1 > .score__value')
    const player2Score = document.querySelector('.score--player-2 > .score__value')

    const resetBoard = () => {
        board.innerHTML = ''
    }

    const updateScorebar = () => {
        tieScore.textContent = `${game.tie}`
        player1Score.textContent = `${game.player1.score}`
        player2Score.textContent = `${game.player2.score}`
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
                    game = ai.mark(game)
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

        if (game.currentPlayer.isAI) {
            game = ai.mark(game)
        }

        render()
    }

    const nextRound = () => {
        game = game.nextRound()

        if (game.currentPlayer.isAI) {
            game = ai.mark(game)
        }

        render()
    }

    const changeDifficulty = (difficulty) => {
        ai = new AI(difficulty)
    }

    return { render, nextRound, resetGame, changeDifficulty }
}
