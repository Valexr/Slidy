export function scrolling(p, cb) {
    position = p;
    stats.innerHTML = `[<b>${options.index}</b>] / <b>${Math.trunc(position)}</b>px`;
}
export function indexing(x) {
    options.index = x;

    node.childNodes.forEach((n, i) =>
        +n.id === x ? n.classList.add('active') : n.classList.remove('active')
    );
    thumbs.childNodes.forEach((t, i) =>
        +t.id === x ? t.classList.add('active') : t.classList.remove('active')
    );
    dots.childNodes.forEach((d, i) =>
        i === x ? d.classList.add('active') : d.classList.remove('active')
    );
}

export function changeValue(target, options) {
    const value = isNum(target.value) ? +target.value : target.value;

    slidy.update({ [target.name]: value });
    options[target.name] = value;

    if (target.name === 'length') {
        getPhotos(node, utils.randomQ(1, 69), value);
    }
}
export function getVar(node, name) {
    return getComputedStyle(node).getPropertyValue(name);
}
export function setVar(node, name, value) {
    return node.style.setProperty(`--${name}`, value);
}

export function randomQ(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isNum(number) {
    return !isNaN(parseFloat(number)) && isFinite(+number);
}

export function activate(target, prop) {
    switch (target.id) {
        case 'dark':
            document.documentElement.setAttribute('scheme', !dark ? 'dark' : 'light');
            dark = !dark;
            break;
        case 'vertical':
            utils.setVar(main, 'flow', vertical ? 'column' : 'row');
            vertical = !vertical;
            break;

        default:
            break;
    }
    target.classList.toggle('active');
    prop = !prop;
    return prop;
}