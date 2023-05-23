const ARIA_LABEL = 'Share';
const NAME = 'slidy-share-button';

class ShareButton extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' }).innerHTML = `<style>:host{width:var(--slidy-share-control-size,2.25em);height:var(--slidy-share-control-size,2.25em);grid-area:slides;place-content:center;place-items:center;display:grid;position:absolute;bottom:1em;left:1em}:host>button{pointer-events:all;fill:var(--slidy-arrow-icon-color,currentColor);background-color:var(--slidy-counter-bg,#4e4e4ebf);cursor:pointer;width:var(--slidy-share-control-size,2.25em);height:var(--slidy-share-control-size,2.25em);border:none;border-radius:50%;outline:none;justify-content:center;align-items:center;padding:.25em;font-family:inherit;display:flex}:host>button svg{width:calc(.9*var(--slidy-share-control-size,2.25em));height:calc(.9*var(--slidy-share-control-size,2.25em))}</style><button type="button" aria-label="${ARIA_LABEL}"><svg viewBox="1 0 15 15" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M5 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm.713 1.164a2.5 2.5 0 1 1 0-2.328l3.391-2.12A2.5 2.5 0 1 1 14 3.5a2.5 2.5 0 0 1-4.484 1.52l-3.53 2.207a2.526 2.526 0 0 1 0 .546l3.53 2.206a2.5 2.5 0 1 1-.411.804l-3.392-2.12ZM11.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm1.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" clip-rule="evenodd"/></svg></button>`;
    }
}

let defined = false;

const createButton = (onclick: () => void) => {
    if (!defined) {
        customElements.define(NAME, ShareButton);
        defined = true;
    }

    const button = document.createElement(NAME) as ShareButton;

    /**
     * Add listener
     */
    button.onclick = onclick;

    return button;
};

export { createButton };
