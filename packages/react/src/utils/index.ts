import type { CSSProperties } from 'react';

type AnyCSSProperties = CSSProperties & Record<string, string | number | undefined>;

/**
 * Function, needed to increase bundle size and also to fool ts without significant damage to formatting
 */
const s = (styles: AnyCSSProperties) => styles as unknown as CSSProperties;

export { s };
