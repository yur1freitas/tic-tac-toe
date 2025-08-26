import './styles/font.css'
import './styles/index.css'

import './lucide.js'

import { GameArea } from './components/GameArea.js'

const { render, nextRound, resetGame } = GameArea()

const resetBtn = document.querySelector('.game__reset-btn')
resetBtn.addEventListener('click', resetGame)

const nextRoundBtn = document.querySelector('.game__next-round-btn')
nextRoundBtn.addEventListener('click', nextRound)

render()
