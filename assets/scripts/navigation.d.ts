import type { IndexGenerator } from '../types';
/**
 * Generates an array of numbers in given range [ start, start + 1, ... );
 */
export declare const range: (start: number, end: number) => number[];
/**
 * Generates an array of indexes for responsive pagination: [ start, end ].
 */
export declare const generateIndexes: IndexGenerator;
