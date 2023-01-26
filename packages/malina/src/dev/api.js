export async function getImgs(page, limit) {
    const path = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    const res = await fetch(path);
    return await res.json();
}
