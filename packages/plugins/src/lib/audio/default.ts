import type { AudioProps } from './types';

const frequencies = {
    C4: 261.63,
    E4: 329.63,
    G4: 392.0,

    Bell: 1567.98,
    Beep: 493.88,
} as const;

const melodies = {
    index: [
        { freq: frequencies.C4, dur: 0.5 },
        { freq: frequencies.E4, dur: 0.5 },
        { freq: frequencies.G4, dur: 0.5 },
        { freq: frequencies.C4, dur: 1 },
    ],
    keys: [
        { freq: frequencies.Beep, dur: 1 },
        { freq: frequencies.Bell, dur: 0.5 },
    ],
} satisfies AudioProps;

export { frequencies, melodies };
