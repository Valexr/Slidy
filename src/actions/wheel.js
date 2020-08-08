export let pD

export function wheel(node) {
    let dx
    let dy

    function handleWheel(e) {
        dx = e.deltaX;
        dy = e.deltaY;
        // if (pD === 'pDx') {
        if (dx > 0) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        } else if (dx < 0) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
        // }

        node.dispatchEvent(new CustomEvent('wheels', {
            detail: { dx, dy }
        }));
    }
    // const wheelStop = function (callback) {
    //     // Make sure a valid callback was provided
    //     if (!callback || typeof callback !== 'function') return;
    //     // Setup scrolling variable
    //     var isWheelling;

    //     // Listen for scroll events
    //     window.addEventListener('wheel', function (event) {

    //         // Clear our timeout throughout the scroll
    //         window.clearTimeout(isWheelling);

    //         // Set a timeout to run after scrolling ends
    //         isWheelling = setTimeout(function () {

    //             // Run the callback
    //             callback();

    //         }, 66);

    //     }, false);

    // };

    // node.addEventListener('wheel', handleWheel);
    if (node.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            node.addEventListener("wheel", handleWheel);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            node.addEventListener("mousewheel", handleWheel);
        } else {
            // Firefox < 17
            node.addEventListener("MozMousePixelScroll", handleWheel);
        }
    } else { // IE8-
        node.attachEvent("onmousewheel", handleWheel);
    }

    return {
        // update(pD) {
        //     if (pD === 'pDx') {
        //         if (dx > 0) {
        //             handleWheel().preventDefault()
        //         } else if (dx < 0) {
        //             handleWheel().preventDefault()
        //         }
        //     } else if (pD === 'pDy') {
        //         if (delty > 0) {
        //             e.preventDefault()
        //         } else if (delty < 0) {
        //             e.preventDefault()
        //         }
        //     } else if (pD === 'pDall') {
        //         e.preventDefault()
        //     }
        // },
        destroy() {
            // node.removeEventListener('wheel', handleWheel);
            if (node.addEventListener) {
                if ('onwheel' in document) {
                    // IE9+, FF17+, Ch31+
                    node.removeEventListener("wheel", handleWheel);
                } else if ('onmousewheel' in document) {
                    // устаревший вариант события
                    node.removeEventListener("mousewheel", handleWheel);
                } else {
                    // Firefox < 17
                    node.removeEventListener("MozMousePixelScroll", handleWheel);
                }
            } else { // IE8-
                node.detachEvent("onmousewheel", handleWheel);
            }
        }
    };
};

// MIDDLE-CLICK ----------------------------------------------
// document.body.onclick = function (e) {
//     if (e && (e.which == 2 || e.button == 4)) {
//         console.log('middleclicked')
//     }
// }