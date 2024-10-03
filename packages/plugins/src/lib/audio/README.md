# @slidy/plugins - audio 8bit

Plugin is available via named export

```tsx
import { audio } from '@slidy/plugins';
```

The plugin has the following options to configure:

```tsx
/**
 * Events to listen to
 */
type Events = 'resize' | 'mutate' | 'mount' | 'move' | 'index' | 'keys' | 'update' | 'destroy';

/**
 * Note Block to play a melody
 */
type Note = {
    /**
     * Note frequency
     */
    freq: number;
    /**
     * Note duration
     */
    dur: number;
};

/**
 * This is going to be configured
 */
export type AudioProps = Partial<Record<Events, Note[]>>;
```

## Usage

```tsx
import { audio } from '@slidy/plugins';

export default function () {
  return (
    <Slidy
      plugins={[
        audio({
            /**
             * Play the following 8-bit melody when `index` core event fires
             */
            index: [
                {
                    freq: 261.63, dur: 0.5,
                },
                {
                    freq: 329.63, dur: 0.5,
                },
                {
                    freq: 392.0, dur: 0.5,
                },
                {
                    freq: 261.63, dur: 1,
                }
            ]
        })
      ]}
    >
  )
}
```

All the events are optional and you get `index` and `keys` melody included!
