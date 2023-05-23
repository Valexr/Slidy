# @slidy/plugins - share

Plugin is available via named export

```tsx
import { share } from '@slidy/plugins';
```

The plugin has the following options to configure:

```tsx
/**
 * What to share
 */
type ShareType = 'url';

/**
 * Where to mount the button
 */
type ShareMountTarget = HTMLElement | string | undefined;

export interface ShareProps {
    type: ShareType;
    target: ShareMountTarget;
}
```

## Usage

```tsx
import { share } from '@slidy/plugins';

export default function () {
  return (
    <Slidy
      plugins={[share()]}
    >
  )
}
```

### Custom Properties API

For easier style customization `share` provides predefined custom properties to inherit:

| Property                         |  Default  |    Type    | Description                             |
| :------------------------------- | :-------: | :--------: | :-------------------------------------- |
| `--slidy-share-control-size`     |  2.25em   | `<length>` | The share button control size.          |
