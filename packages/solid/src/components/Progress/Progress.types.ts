import type { JSX } from 'solid-js';

export interface Props {
    value: number;
    max: number;
    vertical: boolean;
    onInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
}
