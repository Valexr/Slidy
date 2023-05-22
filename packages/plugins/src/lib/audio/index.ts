import type { AudioPluginFunc, Events } from './types';
import { melodies } from './default';
import { play } from './audio';

const audio: AudioPluginFunc = (params = melodies) => {
    let audioContext: AudioContext;
    let playing = false;

    const map = Object.entries(params).reduce((acc, [key, value]) => {
        acc[key as Events] = () => {
            /**
             * Make a try to create an AudioContext. It may be unavailable if user has not interacted with document (i.e. `index` fired because of autoplay)
             */
            if (!audioContext) {
                try {
                    audioContext = new AudioContext(); 
                } catch {
                    return;
                }
            }

            /**
             * Return in case audio is already playing. In my opinion it's better to play the melody to the end, then stop it and play another one
             */
            if (playing) {
                return;
            }

            value.forEach((note, index, melody) => {
                const delay = index > 0 ? melody[index - 1].dur * 1000 : 0;

                setTimeout(() => {
                    play(audioContext, note.freq, note.dur);
                    
                    if (index === 0) playing = true;
                    if (index === melody.length - 1) playing = false;
                }, delay);
            });
        }

        return acc;
    }, {} as Record<Events, EventListener>);

    return ({ node }) => {
        /**
         * Remove all listeners on destroy
         */
        function destroy() {
            for (const [name, fn] of Object.entries(map)) {
                node.removeEventListener(name, fn);
            }

            /**
             * Remove itself
             */
            node.removeEventListener('destroy', destroy);
        }

        node.addEventListener('destroy', destroy);

        for (const [name, fn] of Object.entries(map)) {
            node.addEventListener(name, fn);
        }
    }
}

export { audio }
export type { Events, Note, AudioProps, AudioPluginFunc } from './types';