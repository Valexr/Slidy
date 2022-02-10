[![npm version](https://img.shields.io/npm/v/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@slidy/core)](https://bundlephobia.com/package/@slidy/core)
[![npm license](https://img.shields.io/npm/l/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)

# @slidy/core

Simple, configurable & reusable sliding action script

👨🏻‍💻 docs in progress...

[Demo here](https://svelte.dev/repl/8edad715f4054a20ac9b43af28b17083)

```html
<head>
    <script defer src="https://unpkg.com/browse/@slidy/core@<version>/dist/slidy.js"></script>
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
