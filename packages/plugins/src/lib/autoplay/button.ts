import { iconPause, iconPlay, iconStop } from '@slidy/assets/icons';
import { defineCustomElement } from '../../utils/defineCustomElement';

const r = 15;
const stroke = 2;

const iconPath = {
    play: iconPlay.path,
    pause: iconPause.path,
    stop: iconStop.path,
};

const viewBox = `0 0 ${2 * r + stroke} ${2 * r + stroke}`;
const strokeWidth = `${stroke}px`;

// prettier-ignore
const d = `M ${r + stroke / 2}, ${r + stroke / 2} m -${r}, 0 a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 ${-2 * r},0`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AutoplayButton = defineCustomElement('autoplay-button', () => class AutoplayButton extends HTMLElement {
    constructor() {
        super();

        // prettier-ignore
        this.attachShadow({ mode: "open" }).innerHTML = `<style>:host{grid-area:slides;--slidy-autoplay-stroke-length: ${2 * Math.PI * r};width:var(--slidy-autoplay-control-size,2.25em);height:var(--slidy-autoplay-control-size,2.25em);grid-template:1fr/1fr;place-content:center;place-items:center;display:grid;position:absolute;bottom:1em;right:1em}:host>svg{width:var(--slidy-autoplay-control-size,2.25em);height:var(--slidy-autoplay-control-size,2.25em)}:host>*{grid-area:1/1}:host>button{pointer-events:all;fill:var(--slidy-arrow-icon-color,currentColor);background-color:var(--slidy-counter-bg,#4e4e4ebf);cursor:pointer;border:none;border-radius:1em;outline:none;justify-content:center;align-items:center;padding:.25em;font-family:inherit;display:flex}:host>button,:host>button svg{width:calc(.9*var(--slidy-autoplay-control-size,2.25em));height:calc(.9*var(--slidy-autoplay-control-size,2.25em))}:host>button:disabled{opacity:.75;cursor:not-allowed}:host>button:focus-visible{outline:2px dashed var(--slidy-focus-ring-color,#c9c9c9e6);outline-offset:calc(.25*var(--slidy-autoplay-control-size,2.25em));border-radius:50%}.slidy-autoplay-indicator{stroke-dasharray:var(--slidy-autoplay-stroke-length);stroke-dashoffset:var(--slidy-autoplay-stroke-length);animation:slidy-autoplay-indicator var(--slidy-autoplay-interval)linear forwards infinite}.slidy-autoplay-indicator.stop{animation:unset}.slidy-autoplay-indicator.pause{animation-play-state:paused}@keyframes slidy-autoplay-indicator{to{stroke-dashoffset:0}}</style><svg viewBox="${viewBox}"><path stroke="var(--slidy-counter-bg, #4e4e4ebf)" stroke-width="${strokeWidth}" fill="none" d="${d}"></path><path class="slidy-autoplay-indicator stop" stroke="var(--slidy-autoplay-indicator-accent, lightpink)" stroke-width="${strokeWidth}" fill="none" d="${d}"></path></svg><button type="button"><svg viewBox="0 0 24 24"><path d=""></path></svg></button>`
    }

    setDuration(duration: number) {
        this.style.setProperty('--slidy-autoplay-interval', duration + 'ms');
    }

    get path0() {
        const el =
            this.shadowRoot!.firstElementChild!.nextElementSibling!.firstElementChild!
                .nextElementSibling;

        return el as SVGPathElement;
    }

    get button() {
        const el = this.shadowRoot!.firstElementChild!.nextElementSibling!.nextElementSibling;

        return el as HTMLButtonElement;
    }

    get path1() {
        const el = this.button.firstElementChild!.firstElementChild!;

        return el as SVGPathElement;
    }

    get animation() {
        const classList = this.path0.classList;

        return {
            pause() {
                classList.add('pause');
            },
            cancel() {
                classList.add('stop');
            },
            play() {
                classList.remove('stop', 'pause');
            },
        };
    }
});

function button(onclick: () => void) {
    const element = document.createElement('autoplay-button') as InstanceType<typeof AutoplayButton>;
    const button = element.button;

    button.onclick = onclick;

    return [element, button, element.path1] as const;
}

export { button, iconPath };
export type { AutoplayButton };
