import { Show, createSignal } from 'solid-js';
import { Slidy, i18nDefaults } from '..';
import { channel } from './lib';
import { ControlPanel, Sidemenu } from './components';
import { translate } from '@slidy/animation';
import { linear } from '@slidy/easing';
import { version } from '../../package.json';
import { autoplay } from '@slidy/plugins'

import logo from '@slidy/assets/static/Slidy.svg';
import '@slidy/assets/styles/dev/app.module.css';

import { getRandomSlides, darkTheme } from '@slidy/assets/scripts';

import type { Slide } from '..';
import type { Component } from 'solid-js';

const App: Component = () => {
    const animation = channel(translate);
    const axis = channel<'x' | 'y'>('y');
    const easing = channel(linear);
    const groups = channel(0);

    const vertical = channel(true);
    const clamp = channel(0);
    const duration = channel(450);
    const gravity = channel(1.45);
    const width = channel('auto');
    const snap = channel<'start' | 'center' | 'end' | undefined>('center');
    const loop = channel(false);
    const gap = channel(15);

    const [index, setIndex] = createSignal(0);

    const controlPanel = channel(false);

    const slides = channel<Slide[]>([]);

    const loadSlides = () => {
        let slides$ = localStorage.getItem('slides');

        if (slides$) {
            return slides(JSON.parse(slides$));
        }

        getRandomSlides().then((s) => {
            if (s?.length) {
                return localStorage.setItem('slides', JSON.stringify(s)), slides(s);
            }

            loadSlides();
        });
    };

    loadSlides();

    return (
        <>
            <header class="header">
                <picture>
                    <img aria-hidden={true} alt="slidy" width="35" height="35" src={logo} />
                </picture>
                <h1>
                    Slidy <small>v.{version}</small>
                </h1>
                <fieldset class="nav-controls">
                    <button onClick={loadSlides} title="Shuffle slides">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path d="M3.56,10.56H9a3.62,3.62,0,0,1,2.88,1.55,12.14,12.14,0,0,1,1.85-2.58A6.61,6.61,0,0,0,9,7.44H3.56a1.56,1.56,0,0,0,0,3.12Zm12,4.84c.86-2.58,3.51-4.84,5.68-4.84h2.86l-2,2a1.57,1.57,0,0,0,0,2.2,1.59,1.59,0,0,0,1.1.45,1.55,1.55,0,0,0,1.1-.45L30,9,24.23,3.23A1.56,1.56,0,0,0,22,5.43l2,2H21.19c-3.54,0-7.33,3.06-8.63,7l-.74,2.2c-1,3-3.22,4.83-4.38,4.83H3.56a1.56,1.56,0,0,0,0,3.12H7.44c2.86,0,6-3,7.34-7ZM22,17.23a1.57,1.57,0,0,0,0,2.2l2,2H20.41a4.44,4.44,0,0,1-4.19-3.27,14.51,14.51,0,0,1-1.69,3.39,7.4,7.4,0,0,0,5.88,3h3.64l-2,2a1.57,1.57,0,0,0,0,2.2,1.59,1.59,0,0,0,1.1.45,1.55,1.55,0,0,0,1.1-.45L30,23l-5.77-5.77A1.57,1.57,0,0,0,22,17.23Z" />
                        </svg>
                    </button>
                    <button onClick={darkTheme.switch} title="Switch theme">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path d="M30,21.4a14.74,14.74,0,0,1-19,7.5A13.89,13.89,0,0,1,3.14,10.5,14.48,14.48,0,0,1,14.8,2a.83.83,0,0,1,.86.46.76.76,0,0,1-.15.93A10.48,10.48,0,0,0,12.26,11a11,11,0,0,0,11.25,10.7,11.62,11.62,0,0,0,5.25-1.31.91.91,0,0,1,1,.11A.83.83,0,0,1,30,21.4Z" />
                        </svg>
                    </button>
                    <button onClick={() => controlPanel((v) => !v)} title="Open sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path d="M28.31,13.12H27.2a1.71,1.71,0,0,1-1.66-1.71,1.58,1.58,0,0,1,.55-1.2l.71-.7A1.79,1.79,0,0,0,26.8,7L25.18,5.35a1.86,1.86,0,0,0-2.56,0L21.93,6a1.64,1.64,0,0,1-1.24.56A1.7,1.7,0,0,1,19,5V3.83A1.83,1.83,0,0,0,17.19,2H15a1.81,1.81,0,0,0-1.78,1.83V4.94a1.71,1.71,0,0,1-1.72,1.65,1.62,1.62,0,0,1-1.21-.54l-.71-.7a1.82,1.82,0,0,0-1.27-.51A1.86,1.86,0,0,0,7,5.35L5.36,7a1.79,1.79,0,0,0,0,2.53l.68.69a1.63,1.63,0,0,1,.57,1.23A1.71,1.71,0,0,1,5,13.12H3.84A1.81,1.81,0,0,0,2,14.89V17.1a1.82,1.82,0,0,0,1.84,1.78H5a1.7,1.7,0,0,1,1.66,1.7A1.61,1.61,0,0,1,6,21.81l-.68.68a1.8,1.8,0,0,0,0,2.54L7,26.65a1.82,1.82,0,0,0,1.27.51,1.86,1.86,0,0,0,1.28-.51l.71-.7a1.58,1.58,0,0,1,1.21-.54,1.71,1.71,0,0,1,1.72,1.65v1.11A1.81,1.81,0,0,0,15,30h2.22A1.81,1.81,0,0,0,19,28.17V27.06a1.71,1.71,0,0,1,1.72-1.65,1.69,1.69,0,0,1,1.24.56l.69.68a1.82,1.82,0,0,0,1.27.51,1.86,1.86,0,0,0,1.28-.51L26.79,25a1.81,1.81,0,0,0,0-2.55l-.72-.7a1.59,1.59,0,0,1-.54-1.2,1.7,1.7,0,0,1,1.66-1.71H28.3A1.7,1.7,0,0,0,30,17.11V14.89A1.68,1.68,0,0,0,28.31,13.12ZM21.91,16h0a5.84,5.84,0,0,1-11.68,0h0a5.84,5.84,0,0,1,11.68,0Z" />
                        </svg>
                    </button>
                </fieldset>
            </header>
            <main>
                <Show when={slides().length > 0}>
                    <Slidy
                        animation={animation()}
                        axis={axis()}
                        background={false}
                        easing={easing()}
                        slides={slides()}
                        clamp={clamp()}
                        duration={duration()}
                        gravity={gravity()}
                        indent={0}
                        navigation
                        snap={snap()}
                        loop={loop()}
                        thumbnail
                        progress
                        index={index}
                        setIndex={setIndex}
                        groups={groups()}
                        vertical={vertical()}
                        plugins={[autoplay({ i18n: i18nDefaults, duration: 1500, delay: 1000, autoplay: false })]}
                    />
                </Show>
            </main>
            <Sidemenu controlPanel={controlPanel}>
                <ControlPanel
                    vertical={vertical}
                    clamp={clamp}
                    duration={duration}
                    gravity={gravity}
                    width={width}
                    snap={snap}
                    loop={loop}
                    gap={gap}
                />
            </Sidemenu>
        </>
    );
};

export default App;
