export async function getSlides(limit, themes = '', gap = 32) {
    node.innerHTML = `Loading... 🚀`;
    try {
        const photos = await getPhotos({ width: 1280, height: 800 }, limit);
        if (node.isConnected && photos.length) {
            node.innerHTML = createSlides(node, photos);
            thumbs.innerHTML = createSlides(thumbs, photos);
            // dots.innerHTML = createSlides(dots, photos);
        } else {
            node.innerHTML = `Slidy haven't items 🤷🏻‍♂️`;
        }
    } catch (error) {
        console.error(error);
        node.innerHTML = error;
    }

    function getPhotos(size, limit) {
        return new Promise((resolve, reject) => {
            const photos = [...Array(limit).keys()].map(() => {
                const dPR = (size) => size * devicePixelRatio;
                const width = utils.randomQ(size.width, dPR(size.width));
                const height = utils.randomQ(size.height, dPR(size.height));
                const src = `https://source.unsplash.com/random/${width}x${height}?${themes.split(',')}`;
                return { width, height, src };
            });
            if (photos.length === limit) {
                setTimeout(() => resolve(photos), 500);
            } else reject('No photos');
        });
    }

    function createSlides(node, photos) {
        const slides = photos.map(({ width, height, src }, i) => {
            const { W, H } = aspectQ(width, height, node.clientWidth, node.clientHeight - gap * 2);
            const imgSize = `width="${W}" height="${H}"`;
            const thumbsSize = `width="100" height="100"`;
            const background = `background-image: url(${src})`;
            const alt = `unsplashPhoto#${i}`;

            if (node.id === 'node') {
                return `<li id="${i}"><img src="${src}" ${imgSize} alt="${alt}"/></li>`;
            } else if (node.id === 'thumbs') {
                return `<button id="${i}" style="${background}" ${thumbsSize}>${i}</button>`;
            }
            // else return `<button id="${i}">${i}</button>`;
        });
        return slides.join('');
    }

    function aspectQ(srcWidth, srcHeight, maxWidth, maxHeight) {
        let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {
            W: Math.round(srcWidth * ratio),
            H: Math.round(srcHeight * ratio),
        };
    }
}
