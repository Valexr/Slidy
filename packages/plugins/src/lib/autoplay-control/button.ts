import { iconPause, iconPlay, iconStop } from '../../../../../assets/icons';

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

function template(html: string, t: HTMLTemplateElement) {
    return t.innerHTML = html, t.content.firstChild as unknown as Element;
}

function button() {
    let path0: SVGPathElement, path1: SVGPathElement, button: HTMLButtonElement;

    const el = template(
        // prettier-ignore
        `<div class="slidy-autoplay" style="--slidy-autoplay-stroke-length: ${2 * Math.PI * r}"><svg viewBox="${viewBox}"><path stroke="var(--slidy-counter-bg, #4e4e4ebf)" stroke-width="${strokeWidth}" fill="none" d="${d}"></path><path stroke="var(--slidy-autoplay-indicator-accent, lightpink)" stroke-width="${strokeWidth}" fill="none" d="${d}"></path></svg><button type="button"><svg viewBox="0 0 24 24"><path d=""></path></svg></button></div>`,
        document.createElement('template')
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars, prefer-const
    path0 = el.firstElementChild!.firstElementChild!.nextElementSibling! as SVGPathElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars, prefer-const
    button = el.firstElementChild!.nextElementSibling! as HTMLButtonElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars, prefer-const
    path1 = button.firstElementChild!.firstElementChild! as SVGPathElement;

    return [el, button, path0, path1, iconPath] as const;
}

export { button }