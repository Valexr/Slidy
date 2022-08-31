[![npm version](https://img.shields.io/npm/v/@slidy/animation)](https://www.npmjs.com/package/@slidy/animation)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@slidy/animation?label=minzip)](https://bundlephobia.com/package/@slidy/animation)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/animation)](https://www.npmjs.com/package/@slidy/animation)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)
[![npm license](https://img.shields.io/npm/l/@slidy/animation)](https://www.npmjs.com/package/@slidy/animation)

# @slidy/animation

Simple animation functions for inertion scrolling.

#### Try the [DEMO]

> - [Getting started](#getting-started-)
> - [Usage](#usage)
> - [Arguments](#arguments)
> - [Custom](#custom)


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

Includes `fade, flip, matrix, rotate, scale, stairs, translate` & `blur, deck, shuffle` in progress as functions. 

```ts
type Options = {
    index: number, // current active slide index
    snap: Snap; // snapping side
    _position: number; // current position
    _vertical: boolean, // node children flow
    _reverse: boolean, // node children reverse flow
}

type Snap = 'start' | 'center' | 'end' | 'deck' | undefined;

interface Child extends HTMLElement {
    i: number; // child index in array
    index: number; // child index
    active: number; // `options.loop ? cix : options.index`
    size: number; // `size + gap` by axis
    dist: number; // distance to snap position
    track: number; // move to the size of the slide from its snap point +/- in the direction
    turn: number; // `-1 <- child.track / child.size -> 1`
    exp: number; // interpolated child.track `0 <- exp -> 1`
}

type AnimationArgs = {
    node: HTMLElement; // target slidy node
    child: Child; // extended childNode object
    options: Options; // options: index, position, vertical, reverse, snap
    translate: string; // basic translate needed in any function `{ transform: translate }`
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
    <script src="https://unpkg.com/@slidy/animation/dist/index.js"></script>
</head>

<script>
    window.onload = () => animation = SlidyAnimation.matrix()
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


## Arguments

| Name        | Type          | Description |
| :---------- | :------------ | :---------- |
| `node`      | `HTMLElement` | Target slidy Node |
| `child`     | `Child`       | Extended childNode object |
| `options`   | `Options`     | Helped options from @slidy/core |
| `translate` | `string`      | Basic translate needed in any function `{ transform: translate }` |

### Child

| Name     | Type     | Description |
| :------- | :------- | :---------- |
| `i`      | `number` | Index in array |
| `index`  | `number` | Index in core |
| `active` | `number` | `options.loop ? cix : options.index` |
| `size`   | `number` | `size + gap` by options.vertical |
| `dist`   | `number` | Distance to snap position |
| `track`  | `number` | Move by slide size from its snap point +/- in the direction |
| `turn`   | `number` | `-1 <- child.track / child.size -> 1` |
| `exp`    | `number` | Interpolated child.track `0 <- exp -> 1` |

### Options

| Name        | Type      | Description |
| :---------- | :-------- | :---------- |
| `index`     | `number`  | Current active slide index |
| `snap`      | `Snap`    | Snapping side: `'start', 'center', 'end', 'deck', undefined` |
| `_position` | `number`  | Current position |
| `_vertical` | `number`  | Children axis flow: `0` or any `Number` as `true` |
| `_reverse`  | `number`  | Children reverse flow: `-1` or `1` |


## Custom

Like example `fade()` function. More in [animation.ts](https://github.com/Valexr/Slidy/blob/master/packages/animation/src/animation.ts) file.

```ts
function fade({ child, translate }: AnimationArgs) {
    return {
        opacity: child.exp, // custom fade by exp
        transform: translate, // basic translate for coordinates
    };
}
```


MIT &copy; [Valexr](https://github.com/Valexr)

[DEMO]: https://slidy-core.surge.sh
[NPM]: https://www.npmjs.com/package/@slidy/animation
[CDN]: https://unpkg.com/@slidy/animation/
[REPL]: https://svelte.dev/repl/e7a3683b13b342dc8ecfc1d9b2b806f6
