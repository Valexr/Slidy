import type { Child } from './types';
import { init } from './utils';

function onMount(node: HTMLElement, length: number = 2): Promise<NodeList> {
    return new Promise((resolve, reject) => {
        let mounting: NodeJS.Timer,
            count: number = 0;

        // clearInterval(mounting);

        mounting = setInterval(() => {
            count++;
            console.log(count, node.children.length, length);
            if (count >= 69) {
                count = 0
                clearInterval(mounting);
                reject(`Slidy haven't items`);
            } else if (length && node.children.length >= length) {
                Array.from(node.childNodes).forEach((c, i) => {
                    c.index = i;
                });
                count = 0
                clearInterval(mounting);
                resolve(node.childNodes)
                // setTimeout(() => resolve(node.childNodes), 100);
                // setImmediate(() => resolve(node.childNodes));
                // process.nextTick(() => resolve(node.childNodes))
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
