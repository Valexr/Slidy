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
                                e.preventDefault();
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
                        animates = [
                            'deck',
                            'fade',
                            'flip',
                            'matrix',
                            'perspective',
                            'rotate',
                            'scale',
                            'shuffle',
                            'stairs',
                            'translate',
                        ],
                        snaps = ['unset', 'start', 'center', 'end'],
                        layouts = ['deck', 'grid', 'reel', 'stack'];
                    snap.innerHTML = snaps.map(
                        (s) => `<option value="${s === 'unset' ? '' : s}">${s}</option>`
                    );
                    snap.value = options.snap;

                    layout.innerHTML = layouts.map(
                        (s) => `<option value="${s === 'unset' ? '' : s}">${s}</option>`
                    );
                    layout.value = options.layout;

                    easing.innerHTML = eases.map((e) => `<option value="${e}">${e}</option>`);
                    easing.value =
                        options.easing.name === 'easing' ? 'linear' : options.easing.name;
                    options.easing = easings[easing.value];

                    animation.innerHTML = animates.map((e) => `<option value="${e}">${e}</option>`);
                    animation.value = !options.animation ? 'translate' : options.animation.name;
                    options.animation = animations[animation.value];
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
                                    target.id === 'easing' || target.id === 'animation'
                                        ? e.detail[option].name
                                        : e.detail[option];
                            }
                        }
                    }
                    break;

                default:
                    // console.log(e);
                    break;
            }
        });
    });
}
