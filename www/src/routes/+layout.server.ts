import type { LayoutServerLoad } from './$types';

export const load = (({ cookies }) => {
    const media = JSON.parse(cookies.get('media') || '{}');
    return { media };
}) satisfies LayoutServerLoad;

export const prerender = true;
export const trailingSlash = 'always';
