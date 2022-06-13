[![npm version](https://img.shields.io/npm/v/@slidy/animation)](https://www.npmjs.com/package/@slidy/animation)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@slidy/animation)](https://bundlephobia.com/package/@slidy/animation)
[![npm license](https://img.shields.io/npm/l/@slidy/animation)](https://www.npmjs.com/package/@slidy/animation)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/animation)](https://www.npmjs.com/package/@slidy/animation)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)

# @slidy/animation

Simple animation functions for inertion scrolling.

#### Try the [DEMO]

> - [Getting started](#getting-started-)
> - [Usage](#usage)


## Getting started 🚀

The package is available via [NPM]:

```sh
npm i -D @slidy/animation
```
or from [CDN]:

```html
<script src="https://unpkg.com/@slidy/animation"></script>
```


## Usage

Animation functions available via named import as `MJS/CJS` module or via global `Window.Slidy` object props as `IIFE`.  
Includes `fade, matrix, perspective, rotate, scale, shuffle, translate` as functions. 

```ts
interface Child extends HTMLElement {
    active: boolean; // `child.index === options.index`
    index: number; // index
    zindex: number; // zindex in `options.layout === 'stack'` mode
    size: number; // `size + gap` by axis
    dist: number; // distance to snap position
    pos: number; // position
    track: number; // move to the size of the slide from its snap point +/- in the direction
    exp: number; // interpolated child.track `0 <- exp -> 1`
    turn: number; // `-1 <- child.track / child.size -> 1`
}

type AnimationArgs = {
    child: Child; // extended childNode object
    position: number; // slidy position
    translate: string; // basic translate needed in any function `{transform: translate}`
    vertical?: boolean; // vertical axis for coordinate
};

type AnimationFunc = (args: AnimationArgs) => CSSStyleDeclaration;
```


### MJS/CJS module import

```html
<head>
   <script type="module">
        import * as animation from 'https://unpkg.com/@slidy/animation/dist/index.mjs'; // MJS module
        // OR
        import * as animation from 'https://unpkg.com/@slidy/animation/dist/index.cjs'; // CJS module
    </script>
</head>
```

### IIFE as `Window` Object

```html
<head>
    <script src="https://unpkg.com/@slidy/animation"></script>
</head>

<script>
    window.onload = () => animation = Slidy.matrix()
</script>
```

### As third party module in any frameworks

```svelte
<!-- Svelte -->

<script>
    import { fade } from '@slidy/animation';

    <Slidy animation={fade} />
</script>
```


MIT &copy; [Valexr](https://github.com/Valexr)

[DEMO]: https://slidy-core.surge.sh
[NPM]: https://www.npmjs.com/package/@slidy/animation
[CDN]: https://unpkg.com/@slidy/animation/
[REPL]: https://svelte.dev/repl/e7a3683b13b342dc8ecfc1d9b2b806f6
