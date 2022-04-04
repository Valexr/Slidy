[![npm version](https://img.shields.io/npm/v/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@slidy/core)](https://bundlephobia.com/package/@slidy/core)
[![npm license](https://img.shields.io/npm/l/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)

# @slidy/core

> 👨🏻‍💻 in progress...

Simple, configurable & reusable sliding action script.

Try the [demo]


## Getting started

The package is available via [npm]:

```sh
npm i -D @slidy/core
```
or from [cdn].

Playground is available in svelte [repl].


## Usage

Function `slidy(node, options)` is available via named import as `MJS/CJS` module or via global `Window` object props as `IIFE`. 

All `options` are optional. The only mount `node` required by default:

### MJS/CJS module import

```html
<head>
   <script type="module">
        import { slidy } from 'https://unpkg.com/@slidy/core/dist/slidy.mjs';

        // OR

        import { slidy } from 'https://unpkg.com/@slidy/core/dist/slidy.cjs';

        const node = document.querySelector('#slidy');
        const options = {
                index: 0,
                length: 1,
                gravity: 1.2,
                duration: 375,
                loop: false,
                clamp: false,
                snap: undefined,
                vertical: false,
            }

        slidy(node, options)
    </script>
</head>

<section>
    <ul id="slidy">
        <li>...</li>
        ...
    </ul>
</section>
```

### IIFE as `Window` prop

```html
<head>
    <script defer src="https://unpkg.com/@slidy/core/dist/slidy.js">

        let slidy, node, index = 0, position, childs
    
        const options = {
                index: 0,
                length: 1,
                gravity: 1.2,
                duration: 375,
                loop: false,
                clamp: false,
                snap: undefined,
                vertical: false,
            }

        window.onload = () => {
            node = document.querySelector('#slidy');

            slidy = Slidy.slidy(node, options);
            
            slidy.to(5);

            node.addEventListener('mounted', (e) => {
                childs = e.detail
            }

            node.addEventListener('move', (e) => {
                index = e.detail.index;
                position = e.detail.position;
            });
        }
    </script>
</head>

<section>
    <ul id="slidy">
        <li>...</li>
        ...
    </ul>
</section>

<nav>
    <button onclick="slidy.to(index - 1)">←</button>
    <button onclick="slidy.to(index + 1)">→</button>
</nav>
```

### As third party module in any frameworks

```svelte
<script>
    import { slidy } from '@slidy/core';

    const options = {
            index: 0,
            length: 1,
            gravity: 1.2,
            duration: 375,
            loop: false,
            clamp: false,
            snap: undefined,
            vertical: false,
        }
</script>

<section>
    <ul use:slidy={options}>
        <li>...</li>
        ...
    </ul>
</section>
```


## Options

| Property     | Default          | Type       | Description |
| :----------- | :--------------: | :--------: | :---------- |
| 'index'      | 0                | `number`   | Start index |
| 'length'     | 2                | `number`   | Child nodes length – needed for more accurate `slidy` init |
| 'gravity'    | 1.2              | `number`   | Sliding gravity – `0 (sky) ~ 2 (ground)` |
| 'duration'   | 375              | `number`   | Scroll duration |
| 'loop'       | false            | `boolean`  | Infinite sliding mode |
| 'clamp'      | false            | `boolean`  | Clamping scroll by index |
| 'vertical'   | false            | `boolean`  | Vertical flow axis |
| 'snap'       | undefined        | `string`   | Snapping side - `'start', 'center', 'end', undefined` |


## Events

| Name     | Detail               | Description |
| :------- | :------------------: | :---------- |
| 'mount'  | { childs, options }  | Fires when `node.children.length` equals `options.length` or `2` & childNodes connected |
| 'resize' | { node, options }    | Fires on resize target node |
| 'move'   | { index, position }  | Fires on each sliding |
| 'keys'   | { e.key }            | Fires when target node focusing and any key pressed |
| 'update' | { options }          | Fires on each options update |
| 'destroy'| { node }             | Fires before target node unmounted from the DOM |


## Methods

| Name        | Arguments                 | Description |
| :---------- | :-----------------------: | :---------- |
| 'to()'      | ( index, duration )       | Scroll to `index` with `duration` |
| 'update()'  | ({ options.prop: value }) | Update any property in options |
| 'destroy()' | ()                        | Remove event listners, observers & defaulted props on `slidy()` instance |



MIT &copy; [Valexr](https://github.com/Valexr)

[demo]: https://slidy-core.surge.sh
[npm]: https://www.npmjs.com/package/@slidy/core
[cdn]: https://unpkg.com/@slidy/core/
[repl]: https://svelte.dev/repl/8edad715f4054a20ac9b43af28b17083