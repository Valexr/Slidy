export function wheel(node) {
    let dx = 0, dy = 0

    function handleWheel(e) {
        if ((navigator.platform.indexOf('Win') > -1) && e.shiftKey) {
            dx = e.deltaY;
        } else {
            dx = e.deltaX * 1.5;
            dy = e.deltaY * 1.5;
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

// window.addEventListener("gesturestart", function (e) {
//     e.preventDefault();
//     startX = e.pageX - posX;
//     startY = e.pageY - posY;
//     gestureStartRotation = rotation;
//     gestureStartScale = scale;
// });

// window.addEventListener("gesturechange", function (e) {
//     e.preventDefault();

//     rotation = gestureStartRotation + e.rotation;
//     scale = gestureStartScale * e.scale;

//     posX = e.pageX - startX;
//     posY = e.pageY - startY;

//     render();

// })

// window.addEventListener("gestureend", function (e) {
//     e.preventDefault();
// });

// MIDDLE-CLICK ----------------------------------------------
// document.body.onclick = function (e) {
//     if (e && (e.which == 2 || e.button == 4)) {
//         console.log('middleclicked')
//     }
// }