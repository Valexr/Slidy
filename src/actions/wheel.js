export function wheel(node) {
    let dx = 0, dy = 0

    function handleWheel(e) {
        if (e.shiftKey) {
            dx = e.deltaY;
        } else {
            dx = e.deltaX;
            dy = e.deltaY;
        }
        if (dx !== 0) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
        node.dispatchEvent(new CustomEvent('wheels', {
            detail: { dx, dy }
        }));
    }

    node.addEventListener('wheel', handleWheel, { passive: false });

    return {
        destroy() {
            node.removeEventListener('wheel', handleWheel);
        }
    };
};