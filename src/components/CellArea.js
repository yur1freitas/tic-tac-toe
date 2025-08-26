import { Cell } from '../libs/core/shared/Cell.js'

import { Markup } from './Markup.js'

/**
 * @param {Cell} cell
 * @returns {HTMLDivElement}
 */
export function CellArea(cell) {
    const element = document.createElement('div')
    element.classList.add('cell')

    if (cell.isMarked) {
        element.classList.add(cell.type === Cell.Circle ? 'cell--ai' : 'cell--user')
    }

    const markup = Markup(cell.type)
    element.appendChild(markup)

    return element
}
