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
                const pr = ratio ? window.devicePixelRatio : 1;
                return aspectQ(p.width, p.height, node.clientWidth, node.clientHeight)[value] * pr;
            };

            node.innerHTML += `<li id="${i}"><img src="https://picsum.photos/id/${p.id}/${aspect(
                'width',
                true
            )}/${aspect('height', true)}.jpg" width="${aspect('width')}" height="${aspect(
                'height'
            )}" alt="${p.author}"/></li>`;

            thumbs.innerHTML += `<button id="${i}" style="background-image: url(https://picsum.photos/id/${p.id
                }/${100 * window.devicePixelRatio}/${100 * window.devicePixelRatio
                }.jpg)" width="100" height="100">${i}</button>`;

            dots.innerHTML += `<button id="${i}">${i}</button>`;
        });
    }
}
