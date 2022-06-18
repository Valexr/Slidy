type Options = {
    index: number;
    vertical: boolean;
    deck: boolean;
};
export interface Child extends HTMLElement {
    active: number;
    index: number;
    size: number;
    dist: number;
    pos: number;
    track: number;
    exp: number;
    turn: number;
    i: number;
}

export type AnimationArgs = {
    node: HTMLElement;
    child: Child;
    options: Partial<Options>;
    position: number;
    translate: string;
};

export type AnimationFunc = (args: AnimationArgs) => CSSStyleDeclaration;
