import { Slidy } from '../components';
import { useState } from 'react';
import { useChannel } from './lib';
import { ControlPanel, Sidemenu } from './components';
import { flip } from '@slidy/animation';
import { linear } from '@slidy/easing';
import { version } from '../../package.json';

import logo from '@slidy/assets/static/Slidy.svg';
import '@slidy/assets/styles/dev/app.module.css';

import { darkTheme } from '@slidy/assets/scripts/theme-store';

import type { Slide } from '..';
import type { FC } from 'react';

const App: FC = () => {
    const clamp = useChannel(false);
    const duration = useChannel(450);
    const gravity = useChannel(1.45);
    const width = useChannel('auto');
    const snap = useChannel<'start' | 'center' | 'end' | undefined>('center');
    const loop = useChannel(false);
    const gap = useChannel(15);

    const [index, setIndex] = useState(3);
    const [autoplay, setAutoplay] = useState(true);

    const controlPanel = useChannel(false);

    const slides: Slide[] = [
        { src: 'https://picsum.photos/id/497/665/375.jpg', width: '665', height: '375' },
        { src: 'https://picsum.photos/id/498/563/375.jpg', width: '563', height: '375' },
        { src: 'https://picsum.photos/id/499/563/375.jpg', width: '563', height: '375' },
        { src: 'https://picsum.photos/id/5/562/375.jpg', width: '562', height: '375' },
        { src: 'https://picsum.photos/id/50/563/375.jpg', width: '563', height: '375' },
        { src: 'https://picsum.photos/id/500/563/375.jpg', width: '563', height: '375' },
        { src: 'https://picsum.photos/id/501/564/375.jpg', width: '564', height: '375' },
        { src: 'https://picsum.photos/id/502/563/375.jpg', width: '563', height: '375' },
        { src: 'https://picsum.photos/id/503/563/375.jpg', width: '563', height: '375' },
    ];

    return (
        <>
            <header className="header">
                <picture>
                    <img aria-hidden={true} alt="slidy" width="35" height="35" src={logo} />
                </picture>
                <h1>
                    Slidy <small>v.{version}</small>
                </h1>
                <fieldset className="nav-controls">
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
                <Slidy
                    animation={flip}
                    easing={linear}
                    axis={'x'}
                    background={false}
                    slides={slides}
                    clamp={clamp() ? 1 : 0}
                    duration={duration()}
                    gravity={gravity()}
                    indent={0}
                    navigation
                    snap={snap()}
                    loop={loop()}
                    thumbnail={false}
                    progress
                    // bind:index
                    index={index}
                    setIndex={setIndex}
                    // bind:autoplay
                    autoplay={autoplay}
                    setAutoplay={setAutoplay}
                    autoplayControl
                />
            </main>
            <Sidemenu controlPanel={controlPanel}>
                <ControlPanel
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
