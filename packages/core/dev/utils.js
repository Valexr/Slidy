export function scrolling(p, cb) {
    position = p;
    stats.innerHTML = `[<b>${options.index}</b>] / <b>${Math.trunc(position)}</b>px`;
}
export function indexing(x) {
    options.index = x;
    Array.from(node.children).forEach((n, i) =>
        +n.id === x ? n.classList.add('active') : n.classList.remove('active')
    );
    Array.from(thumbs.children).forEach((t, i) =>
        +t.id === x ? t.classList.add('active') : t.classList.remove('active')
    );
    Array.from(dots.children).forEach((d, i) =>
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
    node.classList.toggle('active');
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
    prop = !prop;
    return prop;
}

export async function getPhotos(node, page, limit) {
    slidy?.destroy();
    slidyT?.destroy();
    node.style.transform = '';
    node.innerHTML = `<li style="display: grid; place-items: center">Loading... 🚀</li>`;

    fetch(`https://picsum.photos/v2/list?limit=${limit}&page=${page}`)
        .then(async (res) => {
            const photos = await res.json();
            if (photos.length) {

                node.innerHTML = photos
                    .map((p, i) => {
                        const aspect = aspectQ(p.width, p.height, main.offsetWidth, main.offsetHeight);
                        return `<li id="${i}"><img src="https://picsum.photos/id/${p.id}/${aspect.width * window.devicePixelRatio}/${aspect.height * window.devicePixelRatio}.jpg" width="${aspect.width}" height="${aspect.height}" alt="${p.author}"/></li>`;
                    })
                    .join('');

                thumbs.innerHTML = photos
                    .map((p, i) => {
                        return `<button id="${i}" onclick="slidy.to(${i})" style="background-image: url(https://picsum.photos/id/${p.id}/${100 * window.devicePixelRatio}/${100 * window.devicePixelRatio}.jpg)" width="100" height="100" alt="${p.author}">${i}</button>`;
                    })
                    .join('');

                dots.innerHTML = photos
                    .map((p, i) => `<button onclick="slidy.to(${i})">${i}</button>`)
                    .join('');
            } else {
                node.style.transform = '';
                node.innerHTML = `<li style="display: grid; place-items: center">Slidy haven't items 🤷🏻‍♂️</li>`;
            }
        })
        .then(() => {
            slidy = Slidy(node, options);
            slidyT = Slidy(thumbs, options);
        })
        .catch((error) => {
            console.error(error);
        });

    function aspectQ(srcWidth, srcHeight, maxWidth, maxHeight) {
        let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {
            width: Math.round(srcWidth * ratio),
            height: Math.round(srcHeight * ratio),
        };
    }
}