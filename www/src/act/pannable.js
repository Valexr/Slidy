export function pannable(node) {
    const options = { passive: false };
    let x = 0, y = 0

    function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

    function down(e) {
        x = unify(e).clientX;
        y = unify(e).clientY;

        node.dispatchEvent(new CustomEvent('panstart', {
            detail: { x, y }
        }));

        window.addEventListener('mousemove', move, options);
        window.addEventListener('mouseup', up, options);
        window.addEventListener('touchmove', move, options);
        window.addEventListener('touchend', up, options);
    }

    function move(e) {
        const dx = unify(e).clientX - x;
        const dy = unify(e).clientY - y;
        x = unify(e).clientX;
        y = unify(e).clientY;
        // if (dx !== 0) {
        // 	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        // }

        node.dispatchEvent(new CustomEvent('panmove', {
            detail: { x, y, dx, dy }
        }));
    }

    function up(e) {
        x = unify(e).clientX;
        y = unify(e).clientY;

        node.dispatchEvent(new CustomEvent('panend', {
            detail: { x, y }
        }));

        window.removeEventListener('mousemove', move, options);
        window.removeEventListener('mouseup', up, options);
        window.removeEventListener('touchmove', move, options);
        window.removeEventListener('touchend', up, options);
    }

    node.addEventListener('mousedown', down, options);
    node.addEventListener('touchstart', down, options);

    return {
        destroy() {
            node.removeEventListener('mousedown', down, options);
            node.removeEventListener('touchstart', down, options);
        }
    };
}