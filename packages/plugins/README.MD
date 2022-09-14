[![npm version](https://img.shields.io/npm/v/@slidy/plugins)](https://www.npmjs.com/package/@slidy/plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@slidy/plugins?label=minzip)](https://bundlephobia.com/package/@slidy/plugins)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/plugins)](https://www.npmjs.com/package/@slidy/plugins)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)
[![npm license](https://img.shields.io/npm/l/@slidy/plugins)](https://www.npmjs.com/package/@slidy/plugins)

# @slidy/plugins

Plugins functions for @slidy/core script.

#### Try the [DEMO]

> - [Getting started](#getting-started-)
> - [Usage](#usage)


## Getting started 🚀

The package is available via [NPM]:

```sh
npm i -D @slidy/plugins
```
or from [CDN]:

```html
<script src="https://unpkg.com/@slidy/plugins"></script>
```


## Usage

Plugin functions available via named import as `MJS/CJS` module or via global `Window.Slidy` object props as `IIFE`. 

```ts
export type PluginArgs = {
    node: HTMLElement,
    options: Options,
    instance: SlidyInstance
}

type PluginFunc = (args: PluginArgs) => void;
```


### MJS/CJS module import

```html
<head>
   <script type="module">
        import * as plugins from 'https://unpkg.com/@slidy/plugins/dist/index.mjs'; // MJS module
        // OR
        import * as plugins from 'https://unpkg.com/@slidy/plugins/dist/index.cjs'; // CJS module
    </script>
</head>
```

### IIFE as `Window` Object

```html
<head>
    <script src="https://unpkg.com/@slidy/plugins/dist/index.js"></script>
</head>

<script>
    window.onload = () => marquee = SlidyPlugins.marquee()
</script>
```

### As third party module in any frameworks

```svelte
<!-- Svelte -->

<script>
    import { marquee } from '@slidy/plugins';

    <Slidy plugins={[marquee]} />
</script>
```


MIT &copy; [Valexr](https://github.com/Valexr)

[DEMO]: https://slidy-core.surge.sh
[NPM]: https://www.npmjs.com/package/@slidy/plugins
[CDN]: https://unpkg.com/@slidy/plugins/
[REPL]: https://svelte.dev/repl/e7a3683b13b342dc8ecfc1d9b2b806f6
