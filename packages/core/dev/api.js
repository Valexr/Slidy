import { slidy as slidyCore } from './build/core.js';

export async function getPhotos(node, page, limit) {
    slidy?.destroy();
    slidyT?.destroy();
    node.style.transform = '';
    node.innerHTML = `<li style="display: grid; place-items: center">Loading... 🚀</li>`;
    //page: 38 - END,  61 - START
    fetch(`https://picsum.photos/v2/list?limit=${limit}&page=${page}`)
        .then(async (res) => {
            const photos = await res.json();
            if (photos.length && node.isConnected) {
                node.innerHTML = thumbs.innerHTML = dots.innerHTML = '';

                createSlides(photos).then(() => {
                    slidy = slidyCore(node, options);
                    slidyT = slidyCore(thumbs);
                });
            } else {
                node.style.transform = '';
                node.innerHTML = `<li style="display: grid; place-items: center">Slidy haven't items 🤷🏻‍♂️</li>`;
            }
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

    async function createSlides(photos) {
        photos.forEach((p, i) => {
            const aspect = (value, ratio = false) => {
                const pr = ratio ? devicePixelRatio : 1;
                return Math.round(
                    aspectQ(p.width, p.height, node.clientWidth, node.clientHeight)[value] * pr
                );
            };
            const src = `https://picsum.photos/id/${p.id}/${aspect('width', true)}/${aspect(
                'height',
                true
            )}.jpg`;
            const background = `background-image: url(https://picsum.photos/id/${p.id}/${
                100 * devicePixelRatio
            }/${100 * devicePixelRatio}.jpg)`;

            node.innerHTML += `<li id="${i}">
                <img src="${src}" width="${aspect('width')}" height="${aspect('height')}" alt="${
                p.author
            }"/>
            </li>`;

            thumbs.innerHTML += `<button id="${i}" style="${background}" width="100" height="100">${i}</button>`;

            dots.innerHTML += `<button id="${i}">${i}</button>`;
        });
    }
}
