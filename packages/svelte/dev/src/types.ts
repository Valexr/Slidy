import type { Slide } from '../../src/types';
export type { Slide } from '../../src/types';

/**
 * Defines the `GetPhoto` params.
 */
interface SlideParams {
    limit?: number;
    page?: number;
    width?: number;
    height?: number;
}

export type GetPhotos = (params: SlideParams) => Promise<Slide[]>;
