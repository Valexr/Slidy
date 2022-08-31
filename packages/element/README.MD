[![npm version](https://img.shields.io/npm/v/@slidy/element)](https://www.npmjs.com/package/@slidy/element)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@slidy/element?label=minzip)](https://bundlephobia.com/package/@slidy/element)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/element)](https://www.npmjs.com/package/@slidy/element)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)
[![npm license](https://img.shields.io/npm/l/@slidy/element)](https://www.npmjs.com/package/@slidy/element)

# @slidy/element

Simple, configurable & reusable carousel CustomElement based on [@slidy/core](https://github.com/Valexr/slidy/tree/master/packages/core).

#### Try the [DEMO]

> - [Getting started](#getting-started)
> - [Usage](#usage)
> - [Options](#options)
> - [Events](#events)
> - [Methods](#methods)


## Getting started

The package is available via [NPM]:

```sh
npm i -D @slidy/element
```
or from [CDN]:

```html
<script src="https://unpkg.com/@slidy/element"></script>
```

Playground is available in svelte [REPL].


## Usage

CustomElement `<slidy-element>` is available via import as `MJS/CJS` module or via global `Window.Slidy` object props as `IIFE`.

### MJS/CJS module import

```html
<head>
   <script type="module">
        import 'https://unpkg.com/@slidy/core/dist/index.mjs'; // MJS module
        // OR
        import 'https://unpkg.com/@slidy/core/dist/index.cjs'; // CJS module
    </script>
</head>

<slidy-element id="slidy" index="5">
    <img src="..." width="..." height="..."/>
    ...
</slidy-element>
```

### IIFE as `Window` Object

window.Slidy object contain Slidy Class like `element` props, [@slidy/animation],  [@slidy/easing] & [@slidy/media] functions.

```js
window.Slidy = {
    animation, // animation functions
    easing, // easing functions
    element, // Slidy Class
    media // global media store
}
```

```html
<head>
    <script src="https://unpkg.com/@slidy/element/dist/index.js"></script>
</head>

<script>
    let animation = Slidy.animation.flip
        easing = Slidy.easing.cubic
        media = Slidy.media
        node = document.querySelector('#slidy')

    node.setAttribute('easing', easing.toString())
    // options set after attributes on init <slidy-element> & merged/rewrite
    node.options = {animation: animation.toString()}
</script>

<slidy-element id="slidy" index="5" snap="center">
    <img src="..." width="..." height="..."/>
    ...
</slidy-element>
```


## Options

All `options` are optional & can be passed through element attributes or like options keys. Options set after attributes on init `<slidy-element>` & merged/rewrite.

`animation` & `easing` functions also can be passed through attributes with: `key: function.tostring()` transformation.

@slidy/element does not style the DOM, but uses the browser render, except for 3 rules for target node: `outline: none, overflow: hidden, user-select: none`.

If you need reversed flow use css rules on target node, like: `flex-flow: row-reverse / column-reverse`, `direction: rtl` or html attribute `dir="rtl"`.

If you need keyboard navigation just set `tabindex=0` on `<slidy-element>`.

⚠️ Don't positioning childs `absolute`, because @slidy use coordinates from childNodes. For deck flow use `options.snap: 'deck'`.


| Key         | Default     | Type       | Description |
| :---------- | :---------- | :--------- | :---------- |
| `index`     | `0`         | `number`   | Start index |
| `clamp`     | `0`         | `number`   | Clamping sliding by index: `clamp - index + clamp` |
| `indent`    | `1`         | `number`   | Sliding indent: part of gap padding both start/end edges of slide `gap * indent` |
| `sensity`   | `5`         | `number`   | Sliding sensity: how many pixels to drag in the RAF `~16ms` to start move, `0` when sliding |
| `gravity`   | `1.2`       | `number`   | Sliding gravity: `0(space) ~ 1(eath) ~ 2(underground)` |
| `duration`  | `375`       | `number`   | Sliding duration in ms |
| `animation` | `undefuned` | `function` | Animation function: `AnimationFunc = (args: AnimationArgs) => Styles` - predefined in [@slidy/animation]. |
| `easing`    | `undefined` | `function` | Easing function: `t value from 1 to 0` - predefined in [@slidy/easing]. |
| `snap`      | `undefined` | `string`   | Snapping side: `'start', 'center', 'end', 'deck', undefined`. Default clamp sliding by edges. |
| `axis`      | `undefined` | `string`   | Control coordinate axis: `'x', 'y'`. |
| `loop`      | `false`     | `boolean`  | Infinite loop mode |

### Internal calculated - readonly

| Key         | Type     | Description |
| :---------- | :------- | :---------- |
| `position`  | `number` | Current position |
| `direction` | `number` | Children move direction |
| `vertical`  | `number` | Children axis flow: `0` or any `Number` as `true` |
| `reverse`   | `number` | Children reverse flow: `-1` or `1` |

### Usage

```html
<head>
    <script src="https://unpkg.com/@slidy/element/dist/index.js"></script>
</head>

<script>
    let animation = Slidy.animation.flip
        easing = Slidy.easing.cubic
        media = Slidy.media
        node = document.querySelector('#slidy')

    node.setAttribute('easing', easing.toString())
    // options set after attributes on init <slidy-element> & merged/rewrite
    node.options = {animation: animation.toString()}
</script>

<slidy-element id="slidy" index="5" snap="center">
    <img src="..." width="..." height="..."/>
    ...
</slidy-element>
```


## Events

Slidy instance reinit on every change childNodes.length in `on:mutate` event.

| Name      | Detail              | Description |
| :-------- | :------------------ | :---------- |
| `mount`   | `{options}`         | Fires when `node.children.length` & node.children isConnected |
| `resize`  | `{ROE}`             | Fires on resize target node `ROE: ResizeObserverEntry[]`|
| `mutate`  | `{ML}`              | Fires on mutation `childNodes` in target node `ML: MutationRecord[]`|
| `move`    | `{index,position}`  | Fires on any sliding |
| `index`   | `{index}`           | Fires on each index change: `index === changed.index` |
| `keys`    | `{e.key}`           | Fires if target node focusing and any key pressed. Predefined keys: `['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']` is `defaultPrevented` & navigate `to(index + options.clamp)`. Focus not in core & can do programaticaly or with `tabindex` attribute on target node. |
| `update`  | `{updated.options}` | Fires on each options update |
| `destroy` | `{node}`            | Fires when async [`destroy()`](#methods) resolved or before target node unmounted from the DOM |

### Usage

```html
<head>
    <script src="https://unpkg.com/@slidy/element/dist/index.js"></script>
</head>

<slidy-element id="slidy" index="5" snap="center" onmove="onMove">
    <img src="..." width="..." height="..."/>
    ...
</slidy-element>

 <script>
    const node = document.querySelector('#slidy');

    node.addEventListener('mount', (e) => console.log(e))

    node.onupdate = (e) => console.log(e.detail) // ???

    function onMove(e) {
        const { index, position } = e.detail
        console.log(index, position)
    }
</script>
```


## Methods

| Name        | Arguments          | Description |
| :---------- | :----------------- | :---------- |
| `to()`      | `(index)`          | Scroll to `index` |
| `init()`    | `(node)`           | Init slidy() instance |
| `update()`  | `({option:value})` | Update any property in options |
| `destroy()` | `()`               | Remove event listners, observers & defaulted props on `slidy()` instance |

### Usage

```html
<head>
    <script src="https://unpkg.com/@slidy/core/dist/index.js"></script>
</head>

<slidy-element id="slidy" index="5" snap="center" onmove="onMove">
    <img src="..." width="..." height="..."/>
    ...
</slidy-element>

<script src="https://unpkg.com/@slidy/core/dist/index.mjs">;
    const slidy = document.querySelector('#slidy');
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');

    slidy.update({ snap: 'center' })
    
    prev.onclick = () => slidy.to(index - 1)
    next.onclick = () => slidy.to(index + 1)
</script>

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
[NPM]: https://www.npmjs.com/package/@slidy/element
[CDN]: https://unpkg.com/@slidy/element/
[REPL]: https://svelte.dev/repl/4336a0d56f9049c98b85245a8cc33f7f
[@slidy/animation]: https://github.com/Valexr/Slidy/tree/master/packages/animation
[@slidy/easing]: https://github.com/Valexr/Slidy/tree/master/packages/easing
[@slidy/media]: https://github.com/Valexr/Slidy/tree/master/packages/media
