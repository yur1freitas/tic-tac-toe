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
        div.classList.add(cell.type === Cell.Circle ? 'cell--ai' : 'cell--user')
    }

    const markup = createMarkupElement(cell.type)
    div.appendChild(markup)

    return div
}
