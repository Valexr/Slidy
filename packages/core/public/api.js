export async function getSlides(limit = 9) {
    node.innerHTML = `Loading... 🚀`;
    try {
        const photos = await getImages(limit);
        if (node.isConnected && photos.length) {
            node.innerHTML = createSlides(node, photos);
            thumbs.innerHTML = createSlides(thumbs, photos);
        } else {
            node.innerHTML = `Slidy haven't items 🤷🏻‍♂️`;
        }
    } catch (error) {
        console.error(error);
        node.innerHTML = error;
    }

    function createSlides(node, photos) {
        const slides = photos.map(({ width, height, src, alt }, i) => {
            const source = { width, height };
            const max = { width: node.clientWidth, height: node.clientHeight };
            const { W, H } = aspect(source, max);
            const imgSize = `width="${W}" height="${H}"`;
            const thumbsSize = `width="100" height="100"`;
            const background = `background-image: url(${src})`;

            if (node.id === 'node') {
                return `<li id="${i}"><img src="${src}" ${imgSize} alt="${alt}"/></li>`;
            } else if (node.id === 'thumbs') {
                return `<button id="${i}" style="${background}" ${thumbsSize}>${i}</button>`;
            }
        });
        return slides.join('');
    }

    async function getImages(limit, size = { width: 1280, height: 800 }) {
        const url = 'https://raw.githubusercontent.com/Valexr/Slidy/master/assets/static/photos.json';
        const indexes = Array.from({ length: limit }, () => Math.floor(Math.random() * 25000));
        const res = await fetch(url);
        const json = await res.json();

        return json.reduce((acc, [src, width, height, alt], i) => {
            if (indexes.includes(i)) {
                const source = { width, height };
                const max = { width: size.width, height: size.height };
                const { W, H } = aspect(source, max);
                acc.push({
                    src: `https://images.unsplash.com${src}?w=${ratio(W)}`,
                    width: W,
                    height: H,
                    alt: `Image by ${alt} from Unsplash`
                });
            }
            return acc;
        }, []);

        function ratio(size) {
            return size * devicePixelRatio;
        }
    }

    function aspect(src, max) {
        let ratio = Math.min(max.width / src.width, max.height / src.height);
        return {
            W: Math.round(src.width * ratio),
            H: Math.round(src.height * ratio),
        };
    }
}
