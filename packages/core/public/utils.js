export function moving(e) {
    position = e.position;
    options.index = e.index;
    stats.innerHTML = `[<b>${options.index}</b>] / <b>${Math.trunc(position)}</b>px`;

    node.childNodes.forEach((n, i) =>
        +n.id === e.index ? n.classList.add('active') : n.classList.remove('active')
    );
    thumbs.childNodes.forEach((t, i) =>
        +t.id === e.index ? t.classList.add('active') : t.classList.remove('active')
    );
}
export function indexing(x) {
    slidyT.to(x);
}

export function changeLength(target) {
    limit = +target.value;
    return getSlides(+target.value);
}
export function getVar(name) {
    return getComputedStyle(main).getPropertyValue(name);
}
export function setVar(target) {
    main.style.setProperty(`--${target.name}`, target.value);
    return slidy.to(options.index);
}
export function setFlow(value) {
    main.style.setProperty('--flow', value === 'grid' ? 'row wrap' : `${value} nowrap`);
    value === 'grid' ? node.classList.add('grid') : node.classList.remove('grid');
    return slidy.to(options.index);
}

export function randomQ(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isNum(number) {
    return !isNaN(parseFloat(number)) && isFinite(+number);
}
