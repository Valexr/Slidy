import { slidy, type Options, SlidyInstance, AnimationFunc, EasingFunc } from '@slidy/core';
import { options } from './options'
import { valued } from './utils'

import './slidy.css'

export default class Slidy extends HTMLElement {
    _slidy?: SlidyInstance;
    _options?: Options;

    static observedAttributes = Object.keys(options);

    constructor() {
        super();
        this.setUpAccessors();
        this._options = {}
    }

    set options(value) {
        this._options = value;
    }

    get options() {
        return this._options;
    }

    setUpAccessors() {
        Slidy.observedAttributes.forEach((name) => {
            Object.defineProperty(this, name, {
                set: (value) => this.setAttribute(name, value),
                get: () => this.getAttribute(name),
            });
        });
    }

    connectedCallback() {
        const opts = this.getAttributeNames().reduce((acc: Partial<Options>, attribute) => {
            const value = this[attribute as keyof Slidy]
            if (attribute in options && value)
                acc[attribute as keyof Options] = valued(value)
            return acc
        }, {})
        if (this.isConnected) {
            console.log(this.id, this.options, opts)
            this.init(opts);
        }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        const option = { [name]: newValue };
        this.update(option);
    }

    init(opts: Partial<Options>) {
        this.destroy()
        this._slidy = slidy(this, { ...this.options, ...opts });
    }

    goto(index: number) {
        this._slidy?.to(index)
    }

    update(opts: Partial<Options>) {
        this._slidy?.update(opts)
    }

    destroy() {
        this._slidy?.destroy()
    }
}

customElements.define('slidy-element', Slidy);
