import { NotImplementedError } from '../errors/NotImplementedError.js'

/**
 * @template T
 * @class Model
 */
export class Model {
    /** @abstract */
    get props() {
        throw new NotImplementedError("O método getter 'props' não foi definida")
    }

    /**
     *
     * @param {T} props
     * @returns {this}
     */
    clone(props) {
        return new this.constructor({ ...this.props, ...props })
    }
}
