export function clickout(node) {

    window.addEventListener('click', handleClick);

    function handleClick(e) {
        if (!node.contains(e.target)) {
            node.dispatchEvent(new CustomEvent('clickout'))
        }
    }

    return {
        destroy() {
            // the node has been removed from the DOM
            window.removeEventListener('click', handleClick)
        }
    };
} 