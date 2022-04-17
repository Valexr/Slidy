[![npm version](https://img.shields.io/npm/v/@slidy/media)](https://www.npmjs.com/package/@slidy/media)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@slidy/media)](https://bundlephobia.com/package/@slidy/media)
[![npm license](https://img.shields.io/npm/l/@slidy/media)](https://www.npmjs.com/package/@slidy/media)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/media)](https://www.npmjs.com/package/@slidy/media)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)

# @slidy/media

Simple, observable & cookie-persisted media-query storage enspired by svelte/stores.  
SSR compartible.

#### Try the [DEMO]

> - [Getting started](#getting-started-)
> - [Usage](#usage)
> - [Options](#options)
>   - [Queries](#queries)
>   - [Getter](#getter)
>   - [Cookie](#cookie)


## Getting started 🚀

The package is available via [NPM]:

```sh
npm i -D @slidy/media
```
or from [CDN]:

```js
import { slidy } from 'https://unpkg.com/@slidy/media';
```


## Usage

Function `mediaStorage({ queries, getter, storage, cookie })` is available via named import as `MJS/CJS` module or via global `Window.MediaStorage` object props as `IIFE`. 

All arguments are optional, only `queries` required.

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

    const media = mediaStorage()

    $: console.log($media)
</script>
```


## Options

```ts
interface Options {
    queries?: MediaQuery;
    getter?: Getter;
    cookie?: boolean;
}
```


### Queries

Media queries rules object like `{ dark: '(prefers-color-scheme: dark)' }`. Support multiple conditions like `'(max-width: 840px) or (prefers-color-scheme: light)'` more `@media` rules on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#logical_operators)

```ts
type MediaQuery = {
    [key: string]: boolean | string | undefined;
};
```

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
        const media = mediaStorage({ queries })
    </script>
</head>
```


### Getter

Callback function with matches object results.

```ts
type Getter = (matches: MediaQuery) => void
```

```html
<head>
    <script type="module">
        import { mediaStorage } from 'https://unpkg.com/@slidy/media/dist/index.mjs';

        const getter = (mq) => console.log(mq)
        const media = mediaStorage({ getter })
    </script>
</head>
```


### Cookie

Persist media-query matches object in browser cookie like JSON string. Cookie key `mediaStorage`.

```ts
const cookie: boolean
```

```html
<head>
    <script type="module">
        import { mediaStorage } from 'https://unpkg.com/@slidy/media/dist/index.mjs';

        const media = mediaStorage({ cookie: true })
    </script>
</head>
```



MIT &copy; [Valexr](https://github.com/Valexr)

[DEMO]: https://svelte.dev/repl/e015c399d7b0442b9a75b71ede67fb61
[NPM]: https://www.npmjs.com/package/@slidy/media
[CDN]: https://unpkg.com/@slidy/media/
[REPL]: https://svelte.dev/repl/e015c399d7b0442b9a75b71ede67fb61
