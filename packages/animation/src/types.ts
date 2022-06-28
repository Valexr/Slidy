type Options = {
    index: number;
    position: number;
    vertical: number;
    reverse: number;
    snap: Snap;
};

type Snap = 'start' | 'center' | 'end' | 'deck';

interface Child extends HTMLElement {
    i: number;
    index: number;
    active: number;
    size: number;
    dist: number;
    track: number;
    turn: number;
    exp: number;
}

export type AnimationArgs = {
    node: HTMLElement;
    child: Child;
    options: Partial<Options>;
    translate: string;
};

export type AnimationFunc = (args: AnimationArgs) => CSSStyleDeclaration;
