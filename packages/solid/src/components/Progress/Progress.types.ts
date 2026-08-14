import type { JSX } from '@solidjs/web';

export interface Props {
    value: number;
    max: number;
    vertical: boolean;
    onInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
}
