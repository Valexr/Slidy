import type { Child, Slidy } from './types';
import { init } from './utils';

function onMount(node: Slidy, length = 2): Promise<NodeListOf<Child>> {
    return new Promise((resolve, reject) => {
        let count = 0;

        const mounting = setInterval(() => {
            count++;
            // console.log(count, node.childNodes.length, length);
            if (count >= 69) {
                count = 0;
                clearInterval(mounting);
                reject(`Slidy haven't items`);
            } else if (length && node.childNodes.length >= length) {
                count = 0;
                clearInterval(mounting);
                resolve(init(node));
                // setTimeout(() => resolve(node.childNodes));
            }
        }, 16);
    });
}

function getFPS() {
    return new Promise((resolve) =>
        requestAnimationFrame((t1: number) => requestAnimationFrame((t2: number) => resolve(1000 / (t2 - t1))))
    );
}

// USE
// getFPS().then((fps: number) => {
//     let interval = 1000 / fps;
//     console.log(fps, interval);
// });

export { onMount, getFPS };
