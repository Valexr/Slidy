import type { Child, Slidy } from './types';

function onMount(node: Slidy, length: number = 2): Promise<NodeList> {
    return new Promise((resolve, reject) => {
        let mounting: NodeJS.Timer,
            count: number = 0;

        mounting = setInterval(() => {
            count++;
            // console.log(count, node.childNodes.length, length);
            if (count >= 69) {
                count = 0;
                clearInterval(mounting);
                reject(`Slidy haven't items`);
            } else if (length && node.childNodes.length >= length) {
                const childs = node.childNodes as NodeListOf<Child>;
                for (let index = 0; index < childs.length; index++) {
                    const child = node.childNodes[index] as Child;
                    child.index = index;
                }
                count = 0;
                clearInterval(mounting);
                resolve(node.childNodes);
                // setTimeout(() => resolve(node.childNodes));
            }
        }, 16);
    });
}

function getFPS() {
    return new Promise((resolve) => requestAnimationFrame((t1: number) => requestAnimationFrame((t2: number) => resolve(1000 / (t2 - t1)))));
}

// USE
// getFPS().then((fps: number) => {
//     let interval = 1000 / fps;
//     console.log(fps, interval);
// });

export { onMount, getFPS };
