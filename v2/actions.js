export function drag(node) {
    let x = 0,
        y = 0;

    function start(e) {
        x = e.clientX;
        y = e.clientY;

        node.onpointermove = move;
        node.setPointerCapture(e.pointerId);
        node.dispatchEvent(
            new CustomEvent('start', {
                detail: { x, y },
            })
        );
    }

    function stop(e) {
        x = e.clientX;
        y = e.clientY;

        node.onpointermove = null;
        node.releasePointerCapture(e.pointerId);
        node.dispatchEvent(
            new CustomEvent('stop', {
                detail: { x, y },
            })
        );
    }

    function move(e) {
        const dx = e.clientX - x;
        const dy = e.clientY - y;
        x = e.clientX;
        y = e.clientY;

        node.dispatchEvent(
            new CustomEvent('move', {
                detail: { x, y, dx, dy },
            })
        );
    }

    node.onpointerdown = start;
    node.onpointerup = stop;
}

export function resize(node) {
    let CR;
    let ET;

    const ro = new ResizeObserver((entries, observer) => {
        for (let entry of entries) {
            CR = entry.contentRect;
            ET = entry.target;
        }
        node.dispatchEvent(
            new CustomEvent('resize', {
                detail: { CR, ET },
            })
        );
    });

    ro.observe(node);

    return {
        destroy() {
            ro.disconnect();
        },
    };
}

export function wheel(node) {
    let dx = 0,
        dy = 0;

    function pointer(e) {
        console.log(e);
    }
    node.onpointerdown = pointer;

    function handleWheel(e) {
        e.preventDefault();
        if (navigator.platform.indexOf('Win') > -1 && e.shiftKey) {
            dx = e.deltaY;
        } else {
            dx = e.deltaX;
            dy = e.deltaY;
        }
        if (dx !== 0) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
        node.dispatchEvent(
            new CustomEvent('wheels', {
                detail: { dx, dy },
            })
        );
    }

    node.addEventListener('wheel', handleWheel, { passive: false });

    return {
        destroy() {
            node.removeEventListener('wheel', handleWheel);
        },
    };
}
