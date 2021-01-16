import { aspectQ } from '../utils/utils.js'

// export async function getPhotos(limit, page) {
//     const res = await fetch(`https://picsum.photos/v2/list?limit=${limit}&page=${page}`);
//     return res.json();
// }

export async function getPhotos(limit, page, width = 1280, height = 800) {
    const res = await fetch(`https://picsum.photos/v2/list?limit=${limit}&page=${page}`);
    let it = await res.json()
    let dat = it.map((item) => {
        let aspect = aspectQ(item.width, item.height, width, height)
        let data = { ...item, src: `https://picsum.photos/id/${item.id}/${aspect.width}/${aspect.height}.jpg`, width: aspect.width, height: aspect.height }
        return data
    });
    return dat
}