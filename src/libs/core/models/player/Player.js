/**
 * @typedef PlayerProps
 *
 * @prop {2|1} type
 * @prop {string} name
 * @prop {number} score
 * @prop {boolean} isAI
 */

export class Player {
    _type
    _name
    _score
    _isAI

    /** @param {PlayerProps} */
    constructor({ type, name, score = 0, isAI = false }) {
        this._type = type
        this._name = name
        this._score = score
        this._isAI = isAI
    }

    get type() {
        return this._type
    }

    get name() {
        return this._name
    }

    get score() {
        return this._score
    }

    get isAI() {
        return this._isAI
    }

    /** @returns {PlayerProps} */
    get props() {
        return {
            type: this._type,
            name: this._name,
            isAI: this._isAI,
            score: this._score
        }
    }

    /**
     *
     * @param {number} score
     * @returns {Player}
     */
    addScore(score) {
        if (score === 0) {
            return this
        }

        return new Player({
            ...this.props,
            score: this._score + score
        })
    }

    /** @returns {Player}*/
    reset() {
        return new Player({
            ...this.props,
            score: 0
        })
    }
}
