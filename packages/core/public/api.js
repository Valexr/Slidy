export async function getSlides(node, limit, gap = 32) {
    node.innerHTML = `Loading... 🚀`;
    try {
        const photos = await getPhotos(node, limit);
        if (node.isConnected && photos.length) {
            node.innerHTML = createSlides(node, photos);
            thumbs.innerHTML = createSlides(thumbs, photos);
            dots.innerHTML = createSlides(dots, photos);
        } else {
            node.innerHTML = `Slidy haven't items 🤷🏻‍♂️`;
        }
    } catch (error) {
        console.error(error);
        node.innerHTML = error;
    }

    function getPhotos(node, limit) {
        return new Promise((resolve, reject) => {
            const photos = [...Array(limit).keys()].map(() => {
                const { clientWidth, clientHeight } = node;
                const dPR = (size) => size * devicePixelRatio;
                const width = utils.randomQ(dPR(clientWidth), dPR(clientHeight));
                const height = utils.randomQ(dPR(clientHeight), dPR(clientWidth));
                const src = `https://source.unsplash.com/random/${width}x${height}`;
                return { width, height, src };
            });
            if (node.isConnected && photos.length === limit) {
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
            } else return `<button id="${i}">${i}</button>`;
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
