import * as easing from './build/src/easing.js';

export function setEvents() {
    const events = ['mount', 'move', 'index', 'resize', 'keys', 'update', 'destroy'];

    events.forEach((event) => {
        node.addEventListener(event, (e) => {
            switch (event) {
                case 'mount':
                    options = e.detail.options;

                    for (const button of document.querySelectorAll('button')) {
                        if (options[button.id]) {
                            button.classList.add('active');
                        } else if (!isNaN(button.id)) {
                            button.onclick = (e) => slidy.to(+e.target.id);
                        }
                    }

                    for (const input of document.querySelectorAll('input')) {
                        switch (input.name) {
                            case 'width':
                                input.value = utils.getVar(main, '--width');
                                break;
                            case 'height':
                                input.value = utils.getVar(main, '--height');
                                break;
                            case 'gap':
                                input.value = utils.getVar(main, '--gap');
                                break;
                            case 'index':
                                input.value = options.index;
                                input.max = options.length - 1;
                                break;

                            default:
                                input.value = options[input.name];
                                break;
                        }
                    }
                    easings.innerHTML = '';
                    const eases = new Map([
                        ['linear', easing.linear],
                        ['sine', easing.sine],
                        ['quad', easing.quad],
                        ['cubic', easing.cubic],
                        ['quart', easing.quart],
                        ['quint', easing.quint],
                        ['expo', easing.expo],
                        ['circ', easing.circ],
                        ['back', easing.back],
                        ['elastic', easing.elastic],
                        ['bounce', easing.bounce],
                    ]);
                    for (const [k, v] of eases) {
                        easings.innerHTML += `<option value="${k + '<:>' + v}">${k}</option>`;
                    }
                    options.easing = easing.linear;
                    snap.value = options.snap;
                    break;

                case 'move':
                    utils.scrolling(e.detail.position);
                    // console.log(e);
                    break;

                case 'index':
                    utils.indexing(e.detail.index);
                    break;

                case 'update':
                    console.log(e);
                    break;

                default:
                    console.log(e);
                    break;
            }
        });
    });
}
