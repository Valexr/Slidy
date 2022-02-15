function onMounted(node: HTMLElement): Promise<HTMLCollection> {
    return new Promise((resolve, reject) => {
        let mounting: NodeJS.Timer,
            count: number = 0;

        clearInterval(mounting);

        mounting = setInterval(() => {
            count++;
            console.log(count, node.children.length);
            if (node.children.length > 2) {
                clearInterval(mounting);
                Array.from(node.children).forEach((c, i) => {
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

function onResize(this: GlobalEventHandlers, ev: UIEvent, node: HTMLElement) {
    console.log(ev);
    let CR;
    let ET;

    const ro = new ResizeObserver((entries, observer) => {
        for (let entry of entries) {
            CR = entry.contentRect;
            ET = entry.target;
        }
        node.dispatchEvent(
            new CustomEvent('resize', {
                detail: { CR, ET },
            })
        );
    });

    ro.observe(node);

    return {
        destroy() {
            ro.disconnect();
        },
    };
}

export { onMounted, onResize, getFPS };

// parent.id = 'slidy';
// const style = document.head.appendChild(document.createElement("style"));
// style.innerHTML = `#slidy::after {
//     content: 'slidy';
//     display: block;
//     width: 2rem;
//     height: 1rem;
//     background: red;
//     position: absolute;
//     left: ${parent.offsetWidth}px;
// }`;

// if (!node.SLIDY) node.SLIDY = {}; // ???? extend default NodeType
