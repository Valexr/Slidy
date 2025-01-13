const isBrowser = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export { isBrowser }