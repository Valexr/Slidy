export function wheel(node) {
    let dx = 0, dy = 0

    function handleWheel(e) {
        dx = e.deltaX;
        dy = e.deltaY;
        if (dx !== 0) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
        node.dispatchEvent(new CustomEvent('wheels', {
            detail: { dx, dy }
        }));
    }

    node.addEventListener('wheel', handleWheel);

    return {
        destroy() {
            node.removeEventListener('wheel', handleWheel);
        }
    };
};