[![npm version](https://img.shields.io/npm/v/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@slidy/core)](https://bundlephobia.com/package/@slidy/core)
[![npm license](https://img.shields.io/npm/l/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)

# @slidy/core

Simple, configurable & reusable sliding action script.  

Сompletely mimics the behavior of a native scroll with mouse drag, index navigation, acceleration, gravity & infinite loop mode.

#### Try the [DEMO]

> - [Getting started](#getting-started)
> - [Usage](#usage)
> - [Options](#options)
> - [Events](#events)
> - [Methods](#methods)


## Getting started

The package is available via [NPM]:

```sh
npm i -D @slidy/core
```
or from [CDN]:

```html
<script src="https://unpkg.com/@slidy/core"></script>
```

Playground is available in svelte [REPL].


## Usage

Function `slidy(node, options)` is available via named import as `MJS/CJS` module or via global `Window.Slidy` object props as `IIFE`. 

All `options` are optional, but mount `node` required:

### MJS/CJS module import

```html
<head>
   <script type="module">
        import { slidy } from 'https://unpkg.com/@slidy/core/dist/index.mjs'; // MJS module
        // OR
        import { slidy } from 'https://unpkg.com/@slidy/core/dist/index.cjs'; // CJS module

        slidy(node)
    </script>
</head>

<section>
    <ul id="node">
        <li>...</li>
        ...
    </ul>
</section>
```

### IIFE as `Window` Object

```html
<head>
    <script src="https://unpkg.com/@slidy/core"></script>
</head>

<script>
    let slidy = null,
        node = document.querySelector('#slidy'),

        window.onload = () => {
            slidy = Slidy.core(node);
        }
</script>

<section>
    <ul id="slidy">
        <li>...</li>
        ...
    </ul>
</section>
```

### As third party module in any frameworks

```svelte
<!-- Svelte -->

<script>
    import { slidy } from '@slidy/core';
</script>

<section>
    <ul use:slidy>
        <li>...</li>
        ...
    </ul>
</section>
```


## Options

| Property     | Default            | Type       | Description |
| :----------- | :----------------- | :--------- | :---------- |
| `index`      | `0`                | `number`   | Start index |
| `gravity`    | `1.2`              | `number`   | Sliding gravity: `0(space) ~ 1(eath) ~ 2(underground)` |
| `duration`   | `375`              | `number`   | Scroll duration |
| `indent`     | `1`                | `number`   | Scroll indent: part of gap padding both start/end edges `gap * indent` |
| `clamp`      | `0`                | `number`   | Clamping scroll by index: `clamp - < index > + clamp` |
| `easing`     | `(t) => t`         | `function` | Easing function: `t value from 1 to 0` - predefined in [@slidy/easing](https://github.com/Valexr/Slidy/tree/master/packages/easing).|
| `loop`       | `false`            | `boolean`  | Infinite loop mode |
| `vertical`   | `false`            | `boolean`  | Vertical flow axis |
| `snap`       | `undefined`        | `string`   | Snapping side: `'start', 'center', 'end', undefined`. Default, scroll to index snap by `center` & prevent scroll by edges. |

### Usage

```html
<head>
    <script type="module">
        import { slidy } from 'https://unpkg.com/@slidy/core/dist/index.mjs';
        import { linear } from 'https://unpkg.com/@slidy/easing/dist/index.mjs'

        const options = {
                step: 1,
                index: 0,
                indent: 0,
                gravity: 1.2,
                duration: 375,
                easing: linear,
                vertical: false,
                snap: 'center',
                clamp: false,
                loop: false,
            }

        slidy(node, options)
    </script>
</head>

<section>
    <ul id="node">
        <li>...</li>
        ...
    </ul>
</section>
```

## Events

| Name     | Detail               | Description                                                                       |
| :------- | :------------------- | :-------------------------------------------------------------------------------- |
| `mount`  | `{childs,options}`   | Fires when `node.children.length >= (options.length or 2)` & childNodes connected |
| `resize` | `{node,options}`     | Fires on resize target node |
| `move`   | `{index,position}`   | Fires when slidy move. `index === every.index` |
| `index`  | `{index,position}`   | Fires on each index change. `index === target.index` |
| `keys`   | `{e.key}`            | Fires when target node focusing and any key pressed. Needed `tabindex="0"` attribute on target node. |
| `update` | `{updated.options}`  | Fires on each options update |
| `destroy`| `{node}`             | Fires before target node unmounted from the DOM |

### Usage

```html
<head>
    <script type="module">
        import { slidy } from 'https://unpkg.com/@slidy/core/dist/index.mjs';

        slidy(node)

        node.addEventListener('mount', (e) => console.log(e))

        node.onupdate = (e) => console.log(e.detail)

        function onMove(e) {
            const { index, position } = e.detail
            console.log(index, position)
        }
    </script>
</head>

<section>
    <ul id="node" onmove="onMove" tabindex="0">
        <li>...</li>
        ...
    </ul>
</section>
```

## Methods

| Name        | Arguments                 | Description |
| :---------- | :------------------------ | :---------- |
| `to()`      | `(index,duration)`        | Scroll to `index` with `duration` |
| `update()`  | `({options.prop:value})`  | Update any property in options |
| `destroy()` | `()`                      | Remove event listners, observers & defaulted props on `slidy()` instance |

### Usage

```html
<head>
    <script type="module">
        import { slidy } from 'https://unpkg.com/@slidy/core/dist/index.mjs';

        slidy(node)

        slidy.update({ snap: 'center' })
        
        prev.onclick = () => slidy.to(index - 1)
        next.onclick = () => slidy.to(index + 1)
    </script>
</head>

<section>
    <ul id="node">
        <li>...</li>
        ...
    </ul>
</section>

<nav>
    <button id="prev">←</button>
    <button id="next">→</button>
</nav>

<!-- if slidy() in global scope you can use global event handlers as atributes -->
<nav>
    <button onclick="slidy.to(index - 1)">←</button>
    <button onclick="slidy.to(index + 1)">→</button>
</nav>
```


MIT &copy; [Valexr](https://github.com/Valexr)

[DEMO]: https://slidy-core.surge.sh
[NPM]: https://www.npmjs.com/package/@slidy/core
[CDN]: https://unpkg.com/@slidy/core/
[REPL]: https://svelte.dev/repl/e7a3683b13b342dc8ecfc1d9b2b806f6
