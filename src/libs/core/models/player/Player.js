import { Model } from '../../shared/Model.js'

/**
 * @typedef PlayerProps
 *
 * @prop {2|1} type
 * @prop {string} name
 * @prop {number} score
 * @prop {boolean} isAI
 *
 * @extends {Model<PlayerProps>}
 * @class Player
 */
export class Player extends Model {
    _type
    _name
    _score
    _isAI

    /** @param {PlayerProps} */
    constructor({ type, name, score = 0, isAI = false }) {
        super()

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

        return this.clone({ score: this._score + score })
    }

    /** @returns {Player} */
    reset() {
        return this.clone({ score: 0 })
    }
}
