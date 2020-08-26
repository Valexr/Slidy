export function pannable(node) {
    let x = 0, y = 0

    function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

    function handleMousedown(e) {
        x = unify(e).clientX;
        y = unify(e).clientY;

        node.dispatchEvent(new CustomEvent('panstart', {
            detail: { x, y }
        }));

        node.addEventListener('mousemove', handleMousemove);
        node.addEventListener('mouseup', handleMouseup);
        node.addEventListener('touchmove', handleMousemove);
        node.addEventListener('touchend', handleMouseup);
    }

    function handleMousemove(e) {
        const dx = unify(e).clientX - x;
        const dy = unify(e).clientY - y;
        x = unify(e).clientX;
        y = unify(e).clientY;
        if (dx !== 0) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }

        node.dispatchEvent(new CustomEvent('panmove', {
            detail: { x, y, dx, dy }
        }));
    }

    function handleMouseup(e) {
        x = unify(e).clientX;
        y = unify(e).clientY;

        node.dispatchEvent(new CustomEvent('panend', {
            detail: { x, y }
        }));

        node.removeEventListener('mousemove', handleMousemove);
        node.removeEventListener('mouseup', handleMouseup);
        node.removeEventListener('touchmove', handleMousemove);
        node.removeEventListener('touchend', handleMouseup);
    }

    node.addEventListener('mousedown', handleMousedown);
    node.addEventListener('touchstart', handleMousedown);

    return {
        destroy() {
            node.removeEventListener('mousedown', handleMousedown);
            node.removeEventListener('touchstart', handleMousedown);
        }
    };
}