import { slidy as slidyCore } from './build/core.js';

export async function getPhotos(node, page, limit) {
    slidy?.destroy();
    slidyT?.destroy();
    node.innerHTML = `<li style="display: grid; place-items: center">Loading... 🚀</li>`;
    //page: 38 - END,  61 - START, 28
    try {
        const res = await fetch(`https://picsum.photos/v2/list?limit=${limit}&page=${page}`, {
            mode: 'cors',
        });
        const photos = await res.json();
        if (photos.length === limit && node.isConnected) {
            node.innerHTML = createSlides(node, photos);
            thumbs.innerHTML = createSlides(thumbs, photos);
            dots.innerHTML = createSlides(dots, photos);

            if (node.children.length === limit) {
                const mounted = Array.from(node.children).every(
                    (child) => child && child.isConnected
                );
                if (mounted) {
                    slidy = slidyCore(node, options);
                    slidyT = slidyCore(thumbs, { index: options.index });
                }
            }
        } else {
            node.innerHTML = `<li style="display: grid; place-items: center">Slidy haven't items 🤷🏻‍♂️</li>`;
        }
    } catch {
        (error) => {
            console.error(error);
        };
    }

    function aspectQ(srcWidth, srcHeight, maxWidth, maxHeight) {
        let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {
            width: Math.round(srcWidth * ratio),
            height: Math.round(srcHeight * ratio),
        };
    }

    function createSlides(node, photos) {
        const nodes = photos.map((p, i) => {
            const aspect = (value, ratio = false) => {
                const pr = ratio ? devicePixelRatio : 1;
                const asp =
                    aspectQ(p.width, p.height, node.clientWidth, node.clientHeight)[value] * pr;
                return Math.round(asp);
            };
            const src = `https://picsum.photos/id/${p.id}/${aspect('width', true)}/${aspect(
                'height',
                true
            )}.jpg`;
            const background = `background-image: url(https://picsum.photos/id/${p.id}/${
                100 * devicePixelRatio
            }/${100 * devicePixelRatio}.jpg)`;

            if (node.id === 'node') {
                return `<li id="${i}"><img src="${src}" width="${aspect('width')}" height="${aspect(
                    'height'
                )}" alt="${p.author}"/></li>`;
            } else if (node.id === 'thumbs') {
                return `<button id="${i}" style="${background}" width="100" height="100">${i}</button>`;
            } else return `<button id="${i}">${i}</button>`;
        });
        return nodes.join('');
    }
}
