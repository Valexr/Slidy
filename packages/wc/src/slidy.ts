import { slidy } from '@slidy/core';
import type { Options } from '@slidy/core';

export default class Slidy extends HTMLElement {
    // options?: Partial<Options>;
    // render: () => void;
    constructor() {
        super();
        // this.render = () => { };
    }

    // toggleOverflowClass(elem: Element) {
    //     elem.classList.toggle('overflowing', this.scrollWidth > this.clientWidth);
    // }

    // get options() {
    //     return this.getAttribute('options') || 'auto';
    // }

    // set options(val) {
    //     this.setAttribute('options', val);
    // }

    get itemWidth() {
        return this.getAttribute('itemWidth') || 'auto';
    }

    set itemWidth(val) {
        this.setAttribute('itemWidth', val);
    }

    get height() {
        return this.getAttribute('height') || 'auto';
    }

    set height(val) {
        this.setAttribute('height', val);
    }

    get space() {
        return this.getAttribute('space') || 'var(--s0)';
    }

    set space(val) {
        this.setAttribute('space', val);
    }

    get noBar() {
        return this.hasAttribute('noBar');
    }

    set noBar(val) {
        if (val) {
            this.setAttribute('noBar', '');
        } else {
            this.removeAttribute('noBar');
        }
    }

    static get observedAttributes() {
        return ['options', 'itemWidth', 'height', 'space', 'noBar'];
    }

    connectedCallback() {
        // this.render();
        // if ('ResizeObserver' in window) {
        //     new ResizeObserver(entries => {
        //         console.log('resize');
        //         this.toggleOverflowClass(entries[0].target);
        //     }).observe(this);
        // }

        // if ('MutationObserver' in window) {
        //     new MutationObserver(entries => {
        //         this.toggleOverflowClass(entries[0].target as Element);
        //     }).observe(this, { childList: true });
        // }
        // console.log(this)
        if (this.isConnected) slidy(this, JSON.parse(this.attributes.options.value))
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        // this.render();
        console.log(name, oldValue, newValue)
        if (name === 'options') console.log(JSON.parse(newValue))
        // if (this.isConnected) slidy(this)
        // slidy(this)
    }
    adoptedCallback() {
        // if (this.isConnected) slidy(this)
    }
}

if ('customElements' in window) {
    customElements.define('slidy-wc', Slidy);
    customElements.whenDefined('slidy-wc').then(c => console.log(c));
}