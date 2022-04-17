async function getPhotos(page: number, wrap: HTMLElement): Promise<any> {
    const path = `https://picsum.photos/v2/list?page=${page}&limit=15`;
    const res = await fetch(path);
    const json = await res.json();

    return wrap && json.map((p: { width: number; height: number; id: number }) => {
        const { offsetWidth, offsetHeight } = wrap
        const { width, height } = aspectQ(
            p.width,
            p.height,
            offsetWidth,
            offsetHeight
        );
        const download_url = `https://picsum.photos/id/${p.id}/${width * window.devicePixelRatio
            }/${height * window.devicePixelRatio}.jpg`;

        return { ...p, width, height, download_url };
    });
}

function aspectQ(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
        width: Math.round(srcWidth * ratio),
        height: Math.round(srcHeight * ratio)
    };
}

export { getPhotos }