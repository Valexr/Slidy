export const local = [
    { id: 1, header: 'What is Slidy?', text: `<strong>SLIDY</strong> – simple configurable carousel component on SvelteJS`, src: '../img/face.webp' },
    { id: 2, header: 'What is Slidy?', text: `<strong>SLIDY</strong> – simple configurable carousel component on SvelteJS`, src: '../img/photo.webp' },
    { id: 3, header: 'What is Slidy?', text: `<strong>SLIDY</strong> – simple configurable carousel component on SvelteJS`, src: '../img/platonic.webp' },
    { id: 4, header: 'What is Slidy?', text: `<strong>SLIDY</strong> – simple configurable carousel component on SvelteJS`, src: '../img/dark.webp' },
    { id: 5, header: 'What is Slidy?', text: `<strong>SLIDY</strong> – simple configurable carousel component on SvelteJS`, src: '../img/reading.webp' },
    { id: 6, header: 'What is Slidy?', text: `<strong>SLIDY</strong> – simple configurable carousel component on SvelteJS`, src: '../img/light.webp' },
    { id: 7, header: 'What is Slidy?', text: `<strong>SLIDY</strong> – simple configurable carousel component on SvelteJS`, src: '../img/atom.webp' },
    { id: 8, header: 'What is Slidy?', text: `<strong>SLIDY</strong> – simple configurable carousel component on SvelteJS`, src: '../img/photo2.webp' },
    { id: 9, header: 'What is Slidy?', text: `<strong>SLIDY</strong> – simple configurable carousel component on SvelteJS`, src: '../img/torus.webp' },
]

export const video = [
    { id: 1, type: 'video', src: 'https://www.youtube.com/embed/s5HEOmawFOA' },
    { id: 2, src: 'img/photo.jpg' },
    { id: 3, type: 'video', src: 'https://www.youtube.com/embed/tNf5onOYEtY' },
    { id: 4, src: 'img/dark.jpg' },
    { id: 5, type: 'video', src: 'https://www.youtube.com/embed/UEjXuD7R7hM' },
    { id: 6, src: 'img/light.jpg' },
    { id: 7, type: 'video', src: 'https://player.vimeo.com/video/265045525' },
    { id: 8, src: 'img/photo2.jpg' },
    { id: 9, type: 'video', src: 'https://player.vimeo.com/video/259411563' },
]

import { writable } from 'svelte/store'
export const slides = writable([])