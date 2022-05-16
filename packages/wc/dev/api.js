export async function getPhotos(node, page, limit) {
    node.style.transform = '';
    node.innerHTML = `<li style="display: grid; place-items: center">Loading... 🚀</li>`;

    fetch(`https://picsum.photos/v2/list?limit=${limit}&page=${page}`)
        .then(async (res) => {
            const photos = await res.json();
            if (photos.length) {
                node.innerHTML = thumbs.innerHTML = dots.innerHTML = '';

                photos.forEach((p, i) => {
                    const aspect = aspectQ(p.width, p.height, main.offsetWidth, main.offsetHeight);

                    node.innerHTML += `<img src="https://picsum.photos/id/${p.id}/${
                        aspect.width * window.devicePixelRatio
                    }/${aspect.height * window.devicePixelRatio}.jpg" width="${
                        aspect.width
                    }" height="${aspect.height}" alt="${p.author}"/>`;

                    thumbs.innerHTML += `<button id="${i}" onclick="slidy.to(${i})" style="background-image: url(https://picsum.photos/id/${
                        p.id
                    }/${100 * window.devicePixelRatio}/${
                        100 * window.devicePixelRatio
                    }.jpg)" width="100" height="100" alt="${p.author}">${i}</button>`;

                    dots.innerHTML += `<button onclick="slidy.to(${i})">${i}</button>`;
                });
            } else {
                node.style.transform = '';
                node.innerHTML = `<li style="display: grid; place-items: center">Slidy haven't items 🤷🏻‍♂️</li>`;
            }
        })
        .then(() => {
            // slidy = Slidy(node, options);
            // slidyT = Slidy(thumbs);
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
