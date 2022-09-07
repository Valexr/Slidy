export async function getPhotos(node, page, limit) {
    node.innerHTML = `Loading... 🚀`;
    //page: 38 - END,  61 - START, 28

    try {
        const indexes = [...Array(limit).keys()];
        const width = node.clientWidth * devicePixelRatio;
        const height = node.clientHeight * devicePixelRatio;
        const sizes = indexes.map(() => [utils.randomQ(width, height), utils.randomQ(height, width)]);

        if (node.isConnected && sizes.length) {
            node.innerHTML = createSlides(node, sizes);
            thumbs.innerHTML = createSlides(thumbs, sizes);
            dots.innerHTML = createSlides(dots, sizes);
        } else {
            node.innerHTML = `Slidy haven't items 🤷🏻‍♂️`;
        }
    } catch (error) {
        console.error(error);
        node.innerHTML = error;
    }

    function createSlides(node, sizes) {
        const slides = sizes.map(([width, height], i) => {
            const aspect = (value, ratio = false) => {
                const pr = ratio ? devicePixelRatio : 1;
                const nodeW = node.clientWidth;
                const nodeH = node.clientHeight;
                const asp = aspectQ(width, height, nodeW, nodeH)[value] * pr;
                return Math.round(asp);
            };
            const src = `https://source.unsplash.com/random/${aspect('width', true)}x${aspect('height', true)}`;
            const imgSize = `width="${aspect('width')}" height="${aspect('height')}"`;
            const background = `background-image: url(${src})`;
            const alt = `unsplashPhoto#${i}`;

            if (node.id === 'node') {
                return `<li id="${i}"><img src="${src}" ${imgSize} alt="${alt}"/></li>`;
            } else if (node.id === 'thumbs') {
                return `<button id="${i}" style="${background}" width="100" height="100">${i}</button>`;
            } else return `<button id="${i}">${i}</button>`;
        });
        return slides.join('');
    }

    function aspectQ(srcWidth, srcHeight, maxWidth, maxHeight) {
        let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {
            width: Math.round(srcWidth * ratio),
            height: Math.round(srcHeight * ratio),
        };
    }
}
