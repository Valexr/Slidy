export interface Options {
    index?: number;
    length?: number;
    gravity?: number;
    duration?: number;
    snap?: 'start' | 'center' | 'end';
    vertical?: boolean;
    clamp?: boolean;
    loop?: boolean;
}

export interface Parent extends HTMLElement {
    style: CSSStyleDeclaration;
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
    willChange?: string;
    userSelect?: string;
    webkitUserSelect?: string;
    pointerEvents?: string;
    outline?: string;
    overflow?: string;
    transform?: string;
    transition?: string;
    opacity?: number
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
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    clientX: number;
    clientY: number;
    shiftKey: boolean;
    target: EventTarget;
}

export type DispathDetail =
    | { [key: string]: any }
    | CustomEventInit<unknown>
    | NodeListOf<Child>
    | Options
    | Slidy
    | string
    | undefined;

type EventsMap = [string, ((e: UniqEvent) => void) | ((e: KeyboardEvent) => void), boolean?];
