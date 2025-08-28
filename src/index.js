import './styles/font.css'
import './styles/index.css'

import './lucide.js'

import { createGame } from './components/createGame.js'

const { render, nextRound, resetGame, updateDifficulty } = createGame()

const resetBtn = document.querySelector('.game__reset-btn')
resetBtn.addEventListener('click', resetGame)

const nextRoundBtn = document.querySelector('.game__next-round-btn')
nextRoundBtn.addEventListener('click', nextRound)

const difficultySelect = document.getElementById('difficulty')

window.addEventListener('DOMContentLoaded', () => {
    updateDifficulty(difficultySelect.value)
})

difficultySelect.addEventListener('change', (e) => {
    updateDifficulty(e.currentTarget.value)
})

render()
