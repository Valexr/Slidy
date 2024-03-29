[![npm version](https://img.shields.io/npm/v/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@slidy/core?label=minzip)](https://bundlephobia.com/package/@slidy/core)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)
[![npm license](https://img.shields.io/npm/l/@slidy/core)](https://www.npmjs.com/package/@slidy/core)

# @slidy/core

### Simple, configurable, nested & reusable sliding action script.  

Сompletely mimics the behavior of a native scroll with mouse drag, index navigation, acceleration, gravity, easings, custom animations & infinite loop mode.

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

window.Slidy object contain core script, [@slidy/animation],  [@slidy/easing],  [@slidy/plugins] & [@slidy/media] functions

```js
window.Slidy = {
    animation, // animation functions
    core, // core script
    easing, // easing functions
    media // global media store
}
```

```html
<head>
    <script src="https://unpkg.com/@slidy/core/dist/index.js"></script>
</head>

<script>
    let slidy = null,
        animation = null,
        easing = null,
        node = document.querySelector('#slidy'),

        window.onload = () => {
            animation = Slidy.animation.flip
            easing = Slidy.easing.cubic
            plugin = Slidy.plugin.play
            slidy = Slidy.core(node, { animation, easing, plugins: [ plugin() ] });
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

@slidy/core does not style the DOM, but uses the browser render, except for 4 rules for target node: `outline: none, overflow: hidden, user-select: none; -webkit-user-select:none;`.

If you need reversed flow use css rules on target node, like: `flex-flow: row-reverse / column-reverse`, `direction: rtl` or html attribute `dir="rtl"`.

If you need keyboard navigation just set `tabindex=0` on target node.

⚠️ Don't positioning childs `absolute`, becouse @slidy use coordinates from childNodes. For deck flow use `options.snap: 'deck'`.


| Key         | Default     | Type       | Description |
| :---------- | :---------- | :--------- | :---------- |
| `index`     | `0`         | `number`   | Sliding index |
| `position`  | `0`         | `number`   | Sliding position. Setter working only in `snap: undefined` mode. |
| `clamp`     | `0`         | `number`   | Clamping sliding by index: `clamp - index + clamp` |
| `indent`    | `1`         | `number`   | Sliding indent: part of gap padding both start/end edges of slide `gap * indent` |
| `sensity`   | `2.5`       | `number`   | Sliding sensity: how many pixels to drag in the RAF `~16ms` to start move, `0` when sliding |
| `gravity`   | `1.2`       | `number`   | Sliding gravity: `0(space) ~ 1(eath) ~ 2(underground)` |
| `duration`  | `450`       | `number`   | Sliding duration in ms |
| `animation` | `undefined` | `function` | Animation function: `AnimationFunc = (args: AnimationArgs) => Styles` - predefined in [@slidy/animation]. |
| `easing`    | `undefined` | `function` | Easing function: `t value from 1 to 0` - predefined in [@slidy/easing]. For proper operation minimal `duration: 450` needed. |
| `plugins`   | `undefined` | `function` | Plugins functions: `t value from 1 to 0` - predefined in [@slidy/plugins]. |
| `snap`      | `undefined` | `string`   | Snapping side: `'start', 'center', 'end', 'deck', undefined`. Default clamp sliding by edges. |
| `axis`      | `undefined` | `string`   | Control coordinate axis: `'x', 'y'`. |
| `loop`      | `false`     | `boolean`  | Infinite loop mode |

### Internal calculated - readonly

| Key          | Type      | Description |
| :----------- | :-------- | :---------- |
| `direction`  | `number`  | Children move direction: `-1` <- `0` -> `1`|
| `reverse`    | `number`  | Children reverse flow: `-1` or `1` |
| `vertical`   | `number`  | Children vertical flow |
| `scrollable` | `number`  | Children full size with gaps > target node size |
| `edged`      | `boolean` | Scroll position on one of the edges |

### Usage

```html
<head>
    <script type="module">
        import { slidy } from 'https://unpkg.com/@slidy/core/dist/index.mjs';
        import { linear } from 'https://unpkg.com/@slidy/easing/dist/index.mjs'
        import { fade } from 'https://unpkg.com/@slidy/animation/dist/index.mjs'

        const options = {
                index: 0,
                clamp: 0,
                indent: 1,
                sensity: 5,
                gravity: 1.2,
                duration: 375,
                animation: fade,
                easing: linear,
                snap: 'center',
                axis: 'x',
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

Slidy instance reinit on every change childNodes.length in `on:mutate` event.

| Name      | Detail              | Description |
| :-------- | :------------------ | :---------- |
| `mount`   | `{options}`         | Fires when `node.children.length` & node.children isConnected |
| `resize`  | `{ROE,options}`     | Fires on resize target node `ROE: ResizeObserverEntry[]`|
| `mutate`  | `{ML,options}`      | Fires on mutation `childNodes` in target node `ML: MutationRecord[]`|
| `move`    | `{index,position}`  | Fires on any sliding |
| `index`   | `{index}`           | Fires on each index change: `index === changed.index` |
| `keys`    | `{e.key}`           | Fires if target node focusing and any key pressed. Predefined keys: `['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']` is `defaultPrevented` & navigate `to(index + options.clamp)`. Focus not in core & can do programaticaly or with `tabindex` attribute on target node. |
| `update`  | `{updated.options}` | Fires on each options update |
| `destroy` | `{node}`            | Fires when [`destroy()`](#methods) is done or before target node unmounted from the DOM |

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

| Name        | Arguments           | Description |
| :---------- | :------------------ | :---------- |
| `to()`      | `(index, position)` | Scroll to `index` or `position` (only `snap: undefined`) |
| `init()`    | `(node)`            | Init slidy() instance |
| `update()`  | `({option:value})`  | Update any property in options |
| `destroy()` | `()`                | Remove event listners, observers & defaulted props on `slidy()` instance |

### Usage

```html
<head>
    <script type="module">
        import { slidy } from 'https://unpkg.com/@slidy/core/dist/index.mjs';

        slidy(node)

        slidy.update({ snap: 'center' })
        
        prev.onclick = () => slidy.to(index - 1)
        next.onclick = () => slidy.to(index + 1, 100)
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
[REPL]: https://svelte.dev/repl/e9195dce6b564393b433784803eabe51
[@slidy/animation]: https://github.com/Valexr/Slidy/tree/master/packages/animation
[@slidy/easing]: https://github.com/Valexr/Slidy/tree/master/packages/easing
[@slidy/plugins]: https://github.com/Valexr/Slidy/tree/master/packages/plugins
[@slidy/media]: https://github.com/Valexr/Slidy/tree/master/packages/media
