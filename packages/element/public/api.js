export async function getPhotos(page = 9, limit = 9) {
    node.innerHTML = `<span style="display: grid; place-items: center">Loading... 🚀</span>`;
    try {
        const res = await fetch(`https://picsum.photos/v2/list?limit=${limit}&page=${page}`);
        const photos = await res.json();

        if (photos.length === limit && node.isConnected) {
            node.innerHTML = createSlides(node, photos);
            thumbs.innerHTML = createSlides(thumbs, photos);
            dots.innerHTML = createSlides(dots, photos);
        } else {
            node.innerHTML = `<span style="display: grid; place-items: center">Slidy haven't items 🤷🏻‍♂️</span>`;
        }
    } catch (error) {
        console.error(error);
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
                return `<img id="${i}" src="${src}" width="${aspect('width')}" height="${aspect(
                    'height'
                )}" alt="${p.author}"/>`;
            } else if (node.id === 'thumbs') {
                return `<button id="${i}" style="${background}" width="100" height="100">${i}</button>`;
            } else return `<button id="${i}">${i}</button>`;
        });
        return nodes.join('');
    }

    function aspectQ(srcWidth, srcHeight, maxWidth, maxHeight) {
        let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {
            width: Math.round(srcWidth * ratio),
            height: Math.round(srcHeight * ratio),
        };
    }
}
