import type { Child } from './types';
import { init } from './utils';

function onMount(node: HTMLElement, length: number = 2): Promise<NodeList> {
    return new Promise((resolve, reject) => {
        let mounting: NodeJS.Timer,
            count: number = 0;

        clearInterval(mounting);

        mounting = setInterval(() => {
            count++;
            // console.log(count, node.children.length, length);
            if (length && node.children.length >= length) {
                clearInterval(mounting);
                Array.from(node.childNodes).forEach((c, i) => {
                    c.dataset.index = i;
                });
                resolve(node.childNodes);
            } else if (count >= 69) {
                clearInterval(mounting);
                reject(`Slidy haven't items`);
            }
        }, 16);
    });
}

function getFPS() {
    return new Promise((resolve) =>
        requestAnimationFrame((t1: number) =>
            requestAnimationFrame((t2: number) => resolve(1000 / (t2 - t1)))
        )
    );
}

// USE
// getFPS().then((fps: number) => {
//     let interval = 1000 / fps;
//     console.log(fps, interval);
// });

export { onMount, getFPS };
