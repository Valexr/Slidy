import { writable } from 'svelte/store';

let settingX = {
    wrap: {
        id: 'slidy',
        width: '100%',
        height: '100%',
        padding: '0',
        align: 'middle',
        alignmargin: 50
    },
    slide: {
        gap: 50,
        class: 'slide',
        width: '50%',
        height: '50%',
        backimg: false,
        imgsrckey: 'src',
        objectfit: 'cover',
        overflow: 'hidden',
    },
    controls: {
        dots: true,
        dotsnum: true,
        dotsarrow: true,
        dotspure: true,
        arrows: false
    },
    options: {
        duration: 375,
        gravity: 1.2,
        snap: true,
        loop: false,
        clamp: false,
        vertical: false,
        intersecting: false
    }
};

export const settings = writable(JSON.parse(sessionStorage.getItem("slidySettings")) || settingX);
settings.subscribe(val => sessionStorage.setItem("slidySettings", JSON.stringify(val)));

export const set = writable({
    open: false,
    input: false,
    check: false
})

export const con = writable({
    open: false
})

export const index = writable(4)
