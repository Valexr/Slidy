type MediaQuery = {
    [key: string]: boolean | string | undefined;
};
type BrowserStorage = {
    type: string
    key: string
}

export type { MediaQuery, BrowserStorage }