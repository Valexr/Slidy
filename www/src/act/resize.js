export function resize(node) {
    let CR
    let ET

    const ro = new ResizeObserver((entries, observer) => {
        for (let entry of entries) {
            CR = entry.contentRect
            ET = entry.target
        }
        node.dispatchEvent(new CustomEvent('resize', {
            detail: { CR, ET }
        }));
    });

    ro.observe(node);

    return {
        destroy() {
            ro.disconnect();
        }
    }
}