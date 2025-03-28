export async function getSlides(limit = 9) {
    node.innerHTML = `Loading... 🚀`;
    try {
        const photos = await getImages(limit, {
            width: node.clientWidth,
            height: node.clientHeight - 64,
        });
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

    window.test = function (node) {
        node.textContent = 'loading';
        setTimeout(() => (node.textContent = 'check'), 500);
    };

    function createSlides(node, photos) {
        const slides = photos.map(({ src, width, height, alt }, i) => {
            // const imgSize = `width="${width}" height="${height}"`;
            // const thumbsSize = `width="100" height="100"`;
            // const background = `background-image: url(${src})`;

            if (node.id === 'node') {
                return `
                <li id="${i}">
                    <!-- button onclick="test(this)">check</button -->
                    <img src="${src}" width="${width}" height="${height}" alt="${alt}"/>
                </li>`;
            } else if (node.id === 'thumbs') {
                return `<button id="${i}" style="background-image: url(${src})" width="100" height="100">${i}</button>`;
            }
        });
        return slides.join('');
    }

    async function getImages(limit, size = { width: 1280, height: 800 }) {
        const url =
            'https://raw.githubusercontent.com/Valexr/Slidy/master/assets/static/photos.json';
        const indexes = Array.from({ length: limit }, () => Math.floor(Math.random() * 24644));
        const res = await fetch(url);
        const photos = await res.json();

        return photos.reduce((acc, [src, aspectRatio, author], i) => {
            if (indexes.includes(i)) {
                const source = { width: size.height * (aspectRatio / 10), height: size.height };
                const max = { width: size.width, height: size.height };
                const query = `?w=${ratio(aspect(source, max).width)}`;
                acc.push({
                    src: `https://images.unsplash.com/photo-${src}${query}`,
                    alt: `Image by ${author} from Unsplash`,
                    ...aspect(source, max),
                });
            }
            return acc;
        }, []);

        function ratio(size) {
            return size * devicePixelRatio;
        }

        function aspect(src, max) {
            const ratio = Math.min(max.width / src.width, max.height / src.height);
            return {
                width: Math.round(src.width * ratio),
                height: Math.round(src.height * ratio),
            };
        }
    }
}
