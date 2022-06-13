export interface Child extends HTMLElement {
    active: boolean;
    index: number;
    zindex: number;
    size: number;
    dist: number;
    pos: number;
    track: number;
    exp: number;
    turn: number;
}

export type AnimationArgs = {
    child: Child;
    position: number;
    translate: string;
    vertical?: boolean;
};

type Styles = {
    [key: string]: string
}

export type AnimationFunc = (args: AnimationArgs) => Styles;
