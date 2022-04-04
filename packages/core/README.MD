[![npm version](https://img.shields.io/npm/v/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@slidy/core)](https://bundlephobia.com/package/@slidy/core)
[![npm license](https://img.shields.io/npm/l/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)

# @slidy/core

👨🏻‍💻 docs in progress...

Simple, configurable & reusable sliding action script.

Try the [demo]


## Getting started

The package is available via [npm][]:

```sh
npm i @slidy/core
```
REPL is available [here](REPL).


## Usage

`Slidy` component is available via named import. All props are optional. The only preperty to get started is `slides` - an array of objects with image related data:

```sv
<head>
    <script defer src="https://unpkg.com/@slidy/core/dist/slidy.js"></script>
</head>

<script>
    let slidy, node, index = 0, position, childs

    window.onload = () => {
        node = document.querySelector('#slidy');

        slidy = Slidy.slidy(node, {
                    index,
                    align: 'middle',
                    duration: 375,
                    gravity: 1.2,
                    snap: true,
                    loop: false,
                    clamp: false,
                    vertical: false,
                });
        
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

<section tabindex="0">
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
[repl]: https://svelte.dev/repl/8edad715f4054a20ac9b43af28b17083