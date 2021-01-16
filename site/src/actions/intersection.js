export function intersection(node, { init, ...options }) {
    const observer = new IntersectionObserver((entries, observer) => {
        node.dispatchEvent(new CustomEvent('intersection', {
            detail: { entries, observer }
        }));
    }, options);
    console.log(options)

    function update({ init }) {
        destroy();
        observer.observe(node);
    }

    function destroy() {
        observer.disconnect();
    }

    return { update, destroy, };
}