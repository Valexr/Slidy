export function scrolling(p, cb) {
    position = p;
    stats.innerHTML = `[<b>${options.index}</b>] / <b>${Math.trunc(position)}</b>px`;
}

export function getVar(node, name) {
    return getComputedStyle(node).getPropertyValue(name);
}
export function setVar(node, name, value) {
    return node.style.setProperty(`--${name}`, value);
}
