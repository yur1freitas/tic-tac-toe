import { createElement, X, Circle } from 'lucide'

import { Cell } from '../libs/core/shared/Cell.js'

/**
 * @param {2 | 1 | 0} type
 * @returns {HTMLDivElement}
 */
export function createMarkupElement(type) {
    const element = document.createElement('div')
    element.classList.add('markup')

    if (type === Cell.Cross) {
        const icon = createElement(X)
        element.appendChild(icon)
    }

    if (type === Cell.Circle) {
        const icon = createElement(Circle)
        element.appendChild(icon)
    }

    return element
}
