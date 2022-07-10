[![npm version](https://img.shields.io/npm/v/@slidy/easing)](https://www.npmjs.com/package/@slidy/easing)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@slidy/easing?label=minzip)](https://bundlephobia.com/package/@slidy/easing)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/easing)](https://www.npmjs.com/package/@slidy/easing)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)
[![npm license](https://img.shields.io/npm/l/@slidy/easing)](https://www.npmjs.com/package/@slidy/easing)

# @slidy/easing

Simple easings function for inertion scrolling.

#### Try the [DEMO]

> - [Getting started](#getting-started-)
> - [Usage](#usage)


## Getting started 🚀

The package is available via [NPM]:

```sh
npm i -D @slidy/easing
```
or from [CDN]:

```html
<script src="https://unpkg.com/@slidy/easing"></script>
```


## Usage

Easing functions available via named import as `MJS/CJS` module or via global `Window.Slidy` object props as `IIFE`.  
Includes `linear, quad, cubic, quart, quint, bounce, sine, expo, elastic, circ, back` as EaseIn functions.  
More info: https://easings.net.

```ts
/** Easing function.
 * @param t value from 0 to 1
 * @returns value from 0 to 1
 * @default linear
 * @see https://easings.net
 */

type Easing = (t: number) => number;
```


### MJS/CJS module import

```html
<head>
   <script type="module">
        import * as easing from 'https://unpkg.com/@slidy/easing/dist/index.mjs'; // MJS module
        // OR
        import * as easing from 'https://unpkg.com/@slidy/easing/dist/index.cjs'; // CJS module
    </script>
</head>
```

### IIFE as `Window` Object

```html
<head>
    <script src="https://unpkg.com/@slidy/easing"></script>
</head>

<script>
    window.onload = () => easing = Slidy.linear()
</script>
```

### As third party module in any frameworks

```svelte
<!-- Svelte -->

<script>
    import { linear } from '@slidy/easing';

    <Slidy easing={linear} />
</script>
```


MIT &copy; [Valexr](https://github.com/Valexr)

[DEMO]: https://slidy-core.surge.sh
[NPM]: https://www.npmjs.com/package/@slidy/easing
[CDN]: https://unpkg.com/@slidy/easing/
[REPL]: https://svelte.dev/repl/e7a3683b13b342dc8ecfc1d9b2b806f6
