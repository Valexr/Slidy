import { slidy, type Options, SlidyInstance, AnimationFunc, EasingFunc } from '@slidy/core';
import { options } from './options'
import { valued } from './utils'

import './slidy.css'

export default class Slidy extends HTMLElement {
    slidy?: SlidyInstance;
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
        this.getAttributeNames().forEach((name) => {
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
            console.log(this.options, opts)
            this.slidy = slidy(this, { ...this.options, ...opts });
        }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        const option = { [name]: newValue };
        this.slidy?.update(option);
    }
}

customElements.define('slidy-element', Slidy);
