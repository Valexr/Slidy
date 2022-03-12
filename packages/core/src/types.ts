export interface Options {
    index: number;
    length: number;
    gravity: number;
    duration: number;
    align: string;
    vertical: boolean;
    clamp: boolean;
    snap: boolean;
    loop: boolean;
}

export interface Parent extends ParentNode {
    style: CssRules;
    offsetTop: number;
    offsetLeft: number;
    offsetWidth: number;
    offsetHeight: number;
}

export interface Slidy extends HTMLElement {
    parentNode: ParentNode | null;
    childNodes: NodeListOf<ChildNode> | NodeListOf<Child>;
    style: CSSStyleDeclaration;
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
    userSelect?: string;
    webkitUserSelect?: string;
    pointerEvents?: string;
    outline?: string;
    overflow?: string;
    transform?: string;
    transition?: string;
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

type EventsMap = [
    string, ((e: UniqEvent) => void) | ((e: KeyboardEvent) => void), boolean?
]