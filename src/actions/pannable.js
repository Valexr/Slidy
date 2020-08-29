export function pannable(node) {
    let x = 0, y = 0

    function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

    function handleMousedown(e) {
        x = unify(e).clientX;
        y = unify(e).clientY;

        node.dispatchEvent(new CustomEvent('panstart', {
            detail: { x, y }
        }));

        window.addEventListener('mousemove', handleMousemove);
        window.addEventListener('mouseup', handleMouseup);
        window.addEventListener('touchmove', handleMousemove);
        window.addEventListener('touchend', handleMouseup);
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

        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
        window.removeEventListener('touchmove', handleMousemove);
        window.removeEventListener('touchend', handleMouseup);
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