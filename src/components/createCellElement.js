import { Cell } from '../libs/core/shared/Cell.js'

import { createMarkupElement } from './createMarkupElement.js'

/**
 * @param {Cell} cell
 * @returns {HTMLDivElement}
 */
export function createCellElement(cell) {
    const div = document.createElement('div')
    div.classList.add('cell')

    if (cell.isMarked) {
        div.classList.add(cell.type === Cell.Cross ? 'cell--player-1' : 'cell--player-2')
    }

    const markup = createMarkupElement(cell.type)
    div.appendChild(markup)

    return div
}
