export interface Options {
    index: number;
    length: number;
    gravity: number;
    duration: number;
    vertical: boolean;
    clamp: boolean;
    snap: boolean;
    loop: boolean;
}

export interface Parent extends ParentNode {
    style: CSSRuleList;
    offsetTop: number;
    offsetLeft: number;
    offsetWidth: number;
    offsetHeight: number;
}

export interface Slidy extends Node {
    parentNode: ParentNode;
    children: NodeListOf<Child>;
    style: CSSRuleList;
    offsetTop: number;
    offsetLeft: number;
    offsetWidth: number;
    offsetHeight: number;
    scrollWidth: number;
    scrollHeight: number;
    replaceChildren: (...nodes: (string | Node)[]) => void;
    append: (...nodes: (string | Node)[]) => void;
    prepend: (...nodes: (string | Node)[]) => void;
}

export interface Child extends ChildNode {
    index: number;
    offsetTop: number;
    offsetLeft: number;
    offsetWidth: number;
    offsetHeight: number;
}

export interface CssRules {
    [key: string]: string;
}

export interface Delta {
    target: number;
    amplitude: number;
}

export interface Scroll {
    target: number;
    amplitude: number;
    duration: number;
    timestamp: number;
}

export interface UniqEvent extends Event {
    changedTouches: Array<{ [key: string]: number }>;
    deltaX: number;
    deltaY: number;
    clientX: number;
    clientY: number;
    shiftKey: boolean;
}
