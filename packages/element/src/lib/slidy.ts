import { slidy as slidyCore } from '@slidy/core';
import { prepareValue } from './utils';

import type { Options, SlidyInstance } from '../types';

export default class Slidy extends HTMLElement {
    _slidy?: SlidyInstance;
    _options?: Partial<Options>;

    static observedAttributes = [
        'index',
        'clamp',
        'indent',
        'sensity',
        'gravity',
        'duration',
        'animation',
        'plugins',
        'easing',
        'snap',
        'axis',
        'loop',
    ];

    constructor() {
        super();
        const style = document.createElement('style')
        const css = `:host{display:flex;flex-flow:var(--flow);gap:var(--gap,1rem);width:100%;height:var(--height,20rem)}::slotted(*){flex:0 0 var(--width,auto);width:var(--width,auto);height:100%}`
        const slot = document.createElement('slot')
        style.append(css)

        this.attachShadow({ mode: 'closed' }).append(style, slot);
        this.setUpAccessors(Slidy.observedAttributes);
        this._options = this.setUpOptions(Slidy.observedAttributes);
    }

    set options(value) {
        this._options = value;
    }

    get options() {
        return this._options;
    }

    setUpAccessors(attributes: string[]): void {
        attributes.forEach((name) => {
            Object.defineProperty(this, name, {
                set: (value) => this.setAttribute(name, value),
                get: () => this.getAttribute(name),
            });
        });
    }

    setUpOptions(attributes: string[]): Partial<Options> {
        const attributeOptions = attributes.reduce((acc: Partial<Options>, attribute) => {
            const value = this[attribute as keyof Slidy] as string;
            if (value) {
                acc[attribute as keyof Options] = prepareValue(attribute, value);
            }
            return acc;
        }, {});
        return { ...attributeOptions, ...this.options };
    }

    connectedCallback(): void {
        if (this.isConnected) {
            // console.log(this.id, this._options);
            this.init(this._options);
        }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        const value = prepareValue(name, newValue as string);
        const option = { [name]: value };
        this.update(option);
    }

    init(options: Partial<Options> = {}) {
        this._slidy = slidyCore(this, options);
    }

    to(index: number) {
        this._slidy?.to(index);
    }

    update(opts: Partial<Options>) {
        this._slidy?.update(opts);
    }

    destroy() {
        this._slidy?.destroy();
    }
}

if (typeof window === 'object' && 'customElements' in window) {
    customElements.define('slidy-element', Slidy);
}
