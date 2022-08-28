import { slidy } from '@slidy/core';
import type { Options, SlidyInstance } from '@slidy/core';

export default class Component extends HTMLElement {
    instance?: SlidyInstance;
    // mainComp: HTMLElement
    customStyle: string;
    __style: HTMLStyleElement;
    // shadowRoot!: ShadowRoot

    constructor() {
        super();
        console.log('My custom component got instantiated!');

        const shadow = this.attachShadow({ mode: 'open' });
        // this.mainComp = document.createElement('ul')
        // this.mainComp.setAttribute('class', 'slidy');
        // this.mainComp.id = 'node';

        this.customStyle = '';
        this.__style = document.createElement('style');
        this.__style.textContent = '';

        shadow.appendChild(this.__style);
        // shadow.appendChild(this.mainComp);
    }

    /**
     * Lifecycle method, called whenever an observed property changes
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        this.display();
    }

    /**
     * To be implemented by the child class
     */
    render() {
        return null;
    }

    display() {
        this.__style.textContent = this.customStyle;
        while (this.mainComp.children.length > 0) {
            this.mainComp.removeChild(this.mainComp.childNodes[0]);
        }
        const nodes = this.render();
        if (nodes) this.mainComp.appendChild(nodes);
    }

    /**
     * Turns a string split with "-" into camel case notation
     */
    sanitizeName(name: string) {
        let parts = name.split('-');
        return [parts.shift(), ...parts.map((n) => n[0].toUpperCase() + n.slice(1))].join('');
    }

    /**
     * Creates one property on this class for every
     * HTML property defined on the element
     */
    setUpAccessors() {
        let attrs = this.getAttributeNames();
        attrs.forEach((name) => {
            Object.defineProperty(this, this.sanitizeName(name), {
                set: (value) => this.setAttribute(name, value),
                get: () => this.getAttribute(name),
            });
        });
    }

    /**
     * Lifecycle method, called once the component is connected to the DOM
     */
    connectedCallback() {
        this.setUpAccessors();
        this.display();
        if (this.isConnected) {
            console.log(this.children.length);
            this.instance = slidy(this.mainComp, {
                index: +this.index,
                snap: this.snap as Options['snap'],
                loop: JSON.parse(this.loop) as Options['loop'],
            });
        }
    }
}
