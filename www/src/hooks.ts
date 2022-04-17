import * as cookie from '$lib/cookie';

export async function getSession(event) {
    const { mediaStorage } = cookie.parse(event.request.headers.get('cookie') || '');
    return {
        user: { theme: mediaStorage }
    }
}