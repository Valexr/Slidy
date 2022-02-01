export function drag(node: HTMLElement) {
    let x = 0,
        y = 0;

    function start(e: PointerEvent) {
        x = e.clientX;
        y = e.clientY;

        node.style.touchAction = 'none';
        node.style.pointerEvents = 'pan-y';

        node.dispatchEvent(
            new CustomEvent('start', {
                detail: { x, y },
            })
        );

        node.onpointermove = move;
        node.setPointerCapture(e.pointerId);
    }

    function stop(e: PointerEvent) {
        x = e.clientX;
        y = e.clientY;

        node.style.touchAction = 'auto';

        node.dispatchEvent(
            new CustomEvent('stop', {
                detail: { x, y },
            })
        );

        node.onpointermove = null;
        node.releasePointerCapture(e.pointerId);
    }

    function cancel(e: PointerEvent) {
        x = e.clientX;
        y = e.clientY;

        // node.style.touchAction = 'auto';

        node.dispatchEvent(
            new CustomEvent('cancel', {
                detail: { x, y },
            })
        );

        // node.onpointermove = null;
        // node.releasePointerCapture(e.pointerId);
    }

    function move(e: PointerEvent) {
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
    node.onpointercancel = cancel;
    node.oncontextmenu = stop;

    return {
        destroy(e: PointerEvent) {
            node.releasePointerCapture(e.pointerId);
        },
    };
}

export function wheel(node: HTMLElement) {
    let dx = 0,
        dy = 0;

    function handleWheel(e: WheelEvent) {
        // e.preventDefault();
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

export function resize(node: HTMLElement) {
    let CR: DOMRectReadOnly;
    let ET: Element;

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

// let options = {
//     root: parent,
//     rootMargin: '0px',
//     threshold: [1.0],
// };
// observer.observe(node);

// let intersected = [];
// let callback = (entries, observer) => {
//     console.log('entries:', entries);
//     // intersected = entries.filter(e => e.isIntersecting);
//     for (const entry of entries) {
//         // console.log(entry.intersectionRect.x);
//         const right = entry.boundingClientRect.right;
//         const center = entry.rootBounds.width / 2;
//         const end = entry.rootBounds.width * 0.75;
//         if (entry.intersectionRatio && right > center && right < end) {
//             entry.target.style.outline = '1px dashed blue';
//             entry.target.style.color = 'blue';
//             // observer.unobserve(entry.target);
//             console.log(+entry.target.id, entry.boundingClientRect, entry.boundingClientRect.right, entry.rootBounds.width);
//         } else {
//             entry.target.style.outline = '0';
//             entry.target.style.color = 'inherit';
//         }
//     }
//     // console.log('int:', intersected);
//     // for (const entry of entries) {
//     //     if (entry.isIntersecting) {
//     //         // console.log(entry.target.id, entry);
//     //         // intersected.filter(e => e !== +entry.target.id);
//     //         intersected = [...new Set([...intersected.filter(e => e !== +entry.target.id), +entry.target.id])];
//     //         observer.unobserve(entry.target);
//     //         console.log('intersected:', intersected);
//     //     } else {
//     //         // intersected.filter(e => e !== +entry.target.id);
//     //         console.log('untersected:', intersected, +entry.target.id);
//     //     }
//     // }
//     // entries.forEach((entry, i) => {
//     //     // console.log('io:', entry.target.id, entry);
//     //     if (entry.isIntersecting) {
//     //         // console.log(entry.target.id, entry);
//     //         intersected = [...new Set([...intersected, +entry.target.id])];
//     //         observer.unobserve(entry.target);
//     //         intersected.filter(e => e !== +entry.target.id);
//     //         console.log('intersected:', intersected);
//     //     } else {
//     //         // intersected.filter(e => e !== +entry.target.id);
//     //         console.log('untersected:', intersected, +entry.target.id);
//     //     }
//     //     // Each entry describes an intersection change for one observed
//     //     // target element:
//     //     //   entry.boundingClientRect
//     //     //   entry.intersectionRatio
//     //     //   entry.intersectionRect
//     //     //   entry.isIntersecting
//     //     //   entry.rootBounds
//     //     //   entry.target
//     //     //   entry.time
//     // });
// };