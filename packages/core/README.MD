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
npm i @slidy/core
```
or CDN like exmaple [unpkg](cdn)

Playground is available [here](repl).


## Usage

`slidy(node, options)` function is available via named import as mjs module or via global window object props. All `options` are optional. The only mount `node` required:

### MJS module import

```html
<head>
   <script type="module">
        import { slidy } from 'https://unpkg.com/@slidy/core/dist/slidy.mjs';

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
    <script defer src="https://unpkg.com/@slidy/core/dist/slidy.js"></script>
</head>

<script>
    let slidy, node, index = 0, position, childs

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

MIT &copy; [Valexr](https://github.com/Valexr)

[demo]: https://slidy-core.surge.sh
[npm]: https://www.npmjs.com/package/@slidy/core
[cdn]: https://unpkg.com/@slidy/core/
[repl]: https://svelte.dev/repl/8edad715f4054a20ac9b43af28b17083