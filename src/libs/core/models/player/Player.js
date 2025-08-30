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
    #type
    #name
    #score
    #isAI

    /** @param {PlayerProps} */
    constructor({ type, name, score = 0, isAI = false }) {
        super()

        this.#type = type
        this.#name = name
        this.#score = score
        this.#isAI = isAI
    }

    get type() {
        return this.#type
    }

    get name() {
        return this.#name
    }

    get score() {
        return this.#score
    }

    get isAI() {
        return this.#isAI
    }

    /** @returns {PlayerProps} */
    get props() {
        return {
            type: this.#type,
            name: this.#name,
            isAI: this.#isAI,
            score: this.#score
        }
    }

    /**
     * @param {number} score
     * @returns {Player}
     */
    addScore(score) {
        if (score === 0) {
            return this
        }

        return this.clone({ score: this.#score + score })
    }

    /** @returns {Player} */
    reset() {
        return this.clone({ score: 0 })
    }
}
