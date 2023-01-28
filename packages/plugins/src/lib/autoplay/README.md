# @slidy/plugins - autoplay

Plugin is available via named export

```tsx
import { autoplay } from '@slidy/plugins';
```

The plugin has the following options to configure:

```tsx
export interface PlayI18NDict {
    play: string;
    stop: string;
}

export interface PlayProps {
    /**
     * The i18n localization dictionary
     */
    i18n?: PlayI18NDict;
    /**
     * Defines the autoplay duration time in ms
     */
    duration?: number;
    /**
     * Defines the autoplay delay time in ms
     */
    delay?: number;
    /**
     * Defines the autoplay state - `Idle` or `Running`
     * @default false
     */
    autoplay?: boolean;
    /**
     * Node, into which the button will be mounted
     * @default undefined
     */
    target?: HTMLElement | string;
}
```

## Usage

```tsx
import { autoplay } from '@slidy/plugins';

export default function () {
  const i18n = {
    play: 'Start autoplay',
    stop: 'Stop autoplay'
  }

  return (
    <Slidy
      plugins={[autoplay({ i18n, duration: 1500, delay: 1000, autoplay: false, target: undefined })]}
    >
  )
}
```

### Custom Properties API

For easier style customization `autoplay` provides predefined custom properties to inherit:

| Property                            |  Default  |    Type    | Description                                |
| :---------------------------------- | :-------: | :--------: | :----------------------------------------- |
| `--slidy-autoplay-control-size`     |  2.25em   | `<length>` | The autoplay control size.                 |
| `--slidy-autoplay-indicator-accent` | lightpink | `<color>`  | The autoplay control indicator ring color. |
