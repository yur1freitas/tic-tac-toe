import './styles/font.css'
import './styles/index.css'

import './lucide.js'

import { createGame } from './components/createGame.js'

const { render, nextRound, resetGame, changeDifficulty } = createGame()

const resetBtn = document.querySelector('.game__reset-btn')
resetBtn.addEventListener('click', resetGame)

const nextRoundBtn = document.querySelector('.game__next-round-btn')
nextRoundBtn.addEventListener('click', nextRound)

const difficultySelect = document.getElementById('difficulty')

window.addEventListener('DOMContentLoaded', () => {
    changeDifficulty(difficultySelect.value)
})

difficultySelect.addEventListener('change', (e) => {
    changeDifficulty(e.currentTarget.value)
})

render()
