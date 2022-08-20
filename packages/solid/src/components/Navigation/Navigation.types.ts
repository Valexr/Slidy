export interface IndexGeneratorParams {
    current: number;
    start: number;
    end: number;
    limit: number;
    siblings: number;
}

export type IndexGenerator = (params: IndexGeneratorParams) => number[];
