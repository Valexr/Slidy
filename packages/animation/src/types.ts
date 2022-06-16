type Layout = 'deck' | 'grid' | 'reel' | 'stack';
type Options = {
    index: number;
    vertical: boolean;
    layout: Layout;
};
export interface Child extends HTMLElement {
    active: boolean;
    index: number;
    size: number;
    dist: number;
    pos: number;
    track: number;
    exp: number;
    turn: number;
}

export type AnimationArgs = {
    node: HTMLElement;
    child: Child;
    options: Partial<Options>;
    position: number;
    translate: string;
};

export type AnimationFunc = (args: AnimationArgs) => CSSStyleDeclaration;
