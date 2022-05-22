import * as easing from './build/easing.js';

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
                            let duration = 0;
                            button.onpointerdown = (e) => {
                                duration = e.timeStamp;
                                e.target.onpointermove = null;
                                e.target.onpointermove = (e) => {
                                    e.target.onpointerup = null;
                                };
                                e.target.onpointerup = (e) => {
                                    slidy.to(+e.target.id, e.timeStamp - duration);
                                };
                            };
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

                    const eases = [
                        'linear',
                        'sine',
                        'quad',
                        'cubic',
                        'quart',
                        'quint',
                        'expo',
                        'circ',
                        'back',
                        'elastic',
                        'bounce',
                    ];
                    easings.innerHTML = eases.map((e) => `<option value="${e}">${e}</option>`);
                    easings.value = options.easing.name;
                    options.easing = easing[easings.value];
                    snap.value = options.snap;
                    break;

                case 'move':
                    utils.moving(e.detail);
                    break;

                case 'index':
                    utils.indexing(e.detail.index);
                    break;

                case 'update':
                    // console.log(e);
                    break;

                default:
                    // console.log(e);
                    break;
            }
        });
    });
}
