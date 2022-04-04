[![npm version](https://img.shields.io/npm/v/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@slidy/core)](https://bundlephobia.com/package/@slidy/core)
[![npm license](https://img.shields.io/npm/l/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![npm downloads](https://img.shields.io/npm/dt/@slidy/core)](https://www.npmjs.com/package/@slidy/core)
[![github issues](https://img.shields.io/github/issues/valexr/slidy)](https://github.com/Valexr/slidy/issues)

# @Slidy

<img align="right" width="180" height="180" src="Slidy.png"> Simple, configurable & reusable carousel sliding action script with templates.

Сompletely mimics the behavior of a native scroll with index navigation, acceleration, gravity & infinite loop mode.

Since version 3.0 Slidy have separate monorepo [packages](https://github.com/Valexr/slidy/tree/master/packages) structure:

- [@slidy/core](https://github.com/Valexr/slidy/tree/master/packages/core) - Core sliding nativeJS script
- [@slidy/svelte](https://github.com/Valexr/slidy/tree/master/packages/svelte) - SvelteJS template
- [@slidy/react](https://github.com/Valexr/slidy/tree/master/packages/react) - ReactJS template
- [@slidy/wc](https://github.com/Valexr/slidy/tree/master/packages/wc) - WebComponent template
- [@slidy/malina](https://github.com/Valexr/slidy/tree/master/packages/malina) - MalinaJS template
- [@slidy/vue](https://github.com/Valexr/slidy/tree/master/packages/vue) - VueJS template
- [@slidy/solid](https://github.com/Valexr/slidy/tree/master/packages/solid) - SolidJS template

And npm organization [@slidy](https://www.npmjs.com/org/slidy).

> ## ⚠️ version 3.0 in beta now [demo](https://svelte.dev/repl/8edad715f4054a20ac9b43af28b17083)

> Version 2 is no longer supported, but have packages on [npm](https://www.npmjs.com/package/svelte-slidy) or [cdn](https://unpkg.com/browse/svelte-slidy@2.8.7/).  
Source files temporally live in [`./_v2`](https://github.com/Valexr/slidy/tree/master/_v2) folder.

## Development

For monorepos behavior @slidy use `pnpm workspaces`.

## Todo

-   Demo docs site based on SvelteKit
-   @slidy/wc - WebComponent template
-   @slidy/malina - MalinaJS template
-   @slidy/solid - SolidJS template
-   @slidy/react - ReactJS template
-   @slidy/vue - VueJS template

## Thanks 🎉

[@ariya](https://github.com/ariya) for [kinetic](https://github.com/ariya/kinetic) - examples & explanations of scroll kinetic principles  
[@argyleink](https://github.com/argyleink) for [open-props](https://github.com/argyleink/open-props) - Open Source CSS Variables 👍🏻  
[@evanw](https://github.com/evanw) for [esbuild](https://github.com/evanw/esbuild) - an extremely fast JS bundler  
[@rodshtein](https://github.com/rodshtein) for the idea of implementing the action function  
[@EricRovell](https://github.com/EricRovell) for collaboration & ideas of modulating `@slidy`  
[@AlexxNB](https://github.com/AlexxNB) for [esbuild starter](https://github.com/AlexxNB/svelte-esbuild-starter) based on [derver](https://github.com/AlexxNB/derver) - simple but powerfull dev/prod nodejs server  
[@PaulMaly](https://github.com/PaulMaly) for idea of simplifing reactive updates of options object  

MIT &copy; [Valexr](https://github.com/Valexr)
