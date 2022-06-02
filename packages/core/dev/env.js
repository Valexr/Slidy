export function setEvents() {
    const events = ['mount', 'move', 'index', 'resize', 'keys', 'update', 'destroy'];

    events.forEach((event) => {
        node.addEventListener(event, (e) => {
            switch (event) {
                case 'mount':
                    Object.assign(options, e.detail.options);
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
                                input.value = utils.getVar('--width');
                                break;
                            case 'height':
                                input.value = utils.getVar('--height');
                                break;
                            case 'gap':
                                input.value = utils.getVar('--gap');
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
                    ],
                        snaps = ['unset', 'start', 'center', 'end'];
                    easing.innerHTML = eases.map((e) => `<option value="${e}">${e}</option>`);
                    snap.innerHTML = snaps.map(
                        (s) => `<option value="${s === 'unset' ? '' : s}">${s}</option>`
                    );
                    easing.value = options.easing.name;
                    options.easing = easings[easing.value];
                    snap.value = options.snap;
                    break;

                case 'move':
                    utils.moving(e.detail);
                    break;

                case 'index':
                    utils.indexing(e.detail.index);
                    break;

                case 'update':
                    Object.assign(options, e.detail);

                    for (const option in e.detail) {
                        const target = document.getElementById(option);
                        if (target) {
                            if (target.tagName === 'BUTTON') {
                                target.classList.toggle('active');
                                target.id === 'vertical' &&
                                    main.style.setProperty(
                                        `--flow`,
                                        e.detail[option] ? 'column' : 'row'
                                    );
                            } else {
                                target.value =
                                    target.id === 'easing'
                                        ? e.detail[option].name
                                        : e.detail[option];
                            }
                        }
                    }
                    // console.log(e);
                    break;

                default:
                    // console.log(e);
                    break;
            }
        });
    });
}
