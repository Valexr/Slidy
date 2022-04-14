[![npm version](https://img.shields.io/npm/v/@slidy/media)](https://www.npmjs.com/package/@slidy/media)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@slidy/media)](https://bundlephobia.com/package/@slidy/media)
[![npm license](https://img.shields.io/npm/l/@slidy/media)](https://www.npmjs.com/package/@slidy/media)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/media)](https://www.npmjs.com/package/@slidy/media)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)

# @slidy/media

> 👨🏻‍💻 docs in progress

Simple, persistent & reactive media-query browser storage.

SSR compartible.

<!-- #### Try the [DEMO] -->

> - [Getting started](#getting-started-)
> - [Usage](#usage-)
> - [Storage](#storage-)
> - [Queries](#queries-)


## Getting started 🚀

The package is available via [NPM]:

```sh
npm i -D @slidy/media
```
or from [CDN]:

```js
import { slidy } from 'https://unpkg.com/@slidy/media';
```

<!-- Playground is available in svelte [REPL]. -->


## Usage

Function `mediaStorage(storage, queries)` is available via named import as `MJS/CJS` module or via global `Window.MediaStorage` object props as `IIFE`. 

All arguments are optional.

### MJS/CJS module import

```html
<head>
   <script type="module">
        import { mediaStorage } from 'https://unpkg.com/@slidy/media/dist/index.mjs'; // MJS module
        // OR
        import { mediaStorage } from 'https://unpkg.com/@slidy/media/dist/index.cjs'; // CJS module

        const media = mediaStorage()
    </script>
</head>
```

### IIFE as `Window` Object

```html
<head>
    <script defer src="https://unpkg.com/@slidy/media/dist/index.js"></script>
</head>

<script>
    let media = null,
        node = document.querySelector('#slidy'),

        window.onload = () => media = MediaStorage.mediaStorage()
</script>
```

### As third party module in any frameworks

```svelte
<!-- Svelte -->

<script>
    import { readable } from 'svelte/store';
    import { mediaStorage } from '@slidy/media';

    const media = readable({}, set => set(mediaStorage()))
</script>
```


## Storage

### Default

```ts
type BrowserStorage = {
    type: string
    key: string
}
const storage: BrowserStorage = { type: 'session', key: 'media-storage' }
```

### Props

| Property     | Default          | Type       | Description |
| :----------- | :--------------: | :--------: | :---------- |
| `type`       | `session`        | `string`   | Browser storage type: `'session', 'local'` |
| `key`        | `media-storage`  | `string`   | Browser storage key |

### Usage

```html
<head>
    <script type="module">
        import { mediaStorage } from 'https://unpkg.com/@slidy/media/dist/index.mjs';

        const media = mediaStorage({key: 'my-storage-key'})
    </script>
</head>
```

## Queries

### Default

```ts
type MediaQuery = {
    [key: string]: boolean | string | undefined;
};

const queries: MediaQuery = {
    xs: '(max-width: 480px)',
    sm: '(max-width: 600px)',
    md: '(max-width: 840px)',
    lg: '(max-width: 960px)',
    xl: '(max-width: 1280px)',
    xxl: '(min-width: 1281px)',
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
    mouse: '(hover: hover)',
    touch: '(hover: none)'
}
```

### Usage

```html
<head>
    <script type="module">
        import { mediaStorage } from 'https://unpkg.com/@slidy/media/dist/index.mjs';

        const queries: MediaQuery = {
            xs: '(max-width: 480px)',
            sm: '(max-width: 600px)',
            md: '(max-width: 840px)',
            lg: '(max-width: 960px)',
            xl: '(max-width: 1280px)',
            xxl: '(min-width: 1281px)',
            landscape: '(orientation: landscape)',
            portrait: '(orientation: portrait)',
            dark: '(prefers-color-scheme: dark)',
            light: '(prefers-color-scheme: light)',
            mouse: '(hover: hover)',
            touch: '(hover: none)'
        }
        const media = mediaStorage(queries)
    </script>
</head>
```

MIT &copy; [Valexr](https://github.com/Valexr)

[DEMO]: https://slidy-core.surge.sh
[NPM]: https://www.npmjs.com/package/@slidy/media
[CDN]: https://unpkg.com/@slidy/media/
[REPL]: https://svelte.dev/repl/8edad715f4054a20ac9b43af28b17083
