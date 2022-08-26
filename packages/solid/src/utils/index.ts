import type { JSX } from 'solid-js';

type CSSProperties = JSX.CSSProperties;
type AnyCSSProperties = JSX.CSSProperties & Record<string, string | number | undefined>;

/**
 * A useless function, needed to increase bundle size and also to fool ts without significant damage to formatting
 */
const s = (styles: AnyCSSProperties) => styles as unknown as CSSProperties;

export { s };
