export function resizeobserver(node) {
    let cR
    let eT

    const ro = new ResizeObserver((entries, observer) => {
        for (let entry of entries) {
            const cr = entry.contentRect;
            const et = entry.target;
            cR = cr
            eT = et
        }
        node.dispatchEvent(new CustomEvent('resize', {
            detail: { cR, eT }
        }));
    });

    ro.observe(node);

    return {
        destroy() {
            ro.disconnect();
        }
    }
}