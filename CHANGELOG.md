# Changelog

## 3.8.0 - @slidy/svelte

## 3.7.8 - @slidy/www

## 3.7.0 - @slidy/plugins

### @slidy/plugins
#### 1.1.0 - add autoplay() plugin
#### 1.0.0 - first release

### @slidy/core
#### 3.7.2 - cleanup
#### 3.7.1 - fix duplicated options

- [fix duplicated options](https://github.com/Valexr/Slidy/commit/0e33d46fe6fec592b702fc9991e7ba285ce34cd6)

#### 3.7.0 - add `options.plugins`, fix issues & updates

-   [add plugins to iife](https://github.com/Valexr/Slidy/commit/f8b0442273392f5ba4e48cfcb83431e1ebc4ab6a)
-   [fix default options](https://github.com/Valexr/Slidy/commit/9b2fb4c3e7e48b76feee42340b23caf6717261b8)
-   [options.plugins: []](https://github.com/Valexr/Slidy/commit/59be47539bd27622079dbd571ee9daa50b995073)
-   [fix unsnapped loop mode](https://github.com/Valexr/Slidy/commit/49a730394f0d8040e9bb19d792b23c0553555a1d)
-   [guard loop in mutate](https://github.com/Valexr/Slidy/commit/50b2a6ecb79d5724db3c6b1b357bad86c997dfc6)
-   [fix snap === 'deck'](https://github.com/Valexr/Slidy/commit/02a0d4868db5f99461147309f09043c34bb3ff58)
-   [ix types](https://github.com/Valexr/Slidy/commit/0656cc5153da1e21a570a5d5522cba80314e0499)

### @slidy/element

#### 1.2.2 - update core
#### 1.2.1 - update core
#### 1.2.0 - add `options.plugins`

-   [add plugins to iife](https://github.com/Valexr/Slidy/commit/8b829ca7d1961161e0390d0bd5da55f230c153f1)

### @slidy/solid
#### 1.4.0 - add plugins option

### @slidy/svelte
#### 3.4.0 - add plugins option

### @slidy/react
#### 1.2.0 - add plugins option

## 3.6.0 - @slidy/element

### @slidy/element

#### 1.1.0 - fix issues & updates

-   [add window check](https://github.com/Valexr/Slidy/commit/60199ed16d344c73f44083fc2b9d8dad45b2e447)
-   [improve init, optimise & cleanup](https://github.com/Valexr/Slidy/commit/81d3139c0553cbd44b0c34284a2e18ce068eb9b4)
-   [add core methods & cleanup](https://github.com/Valexr/Slidy/commit/c2480c98d4b410ad95170f1621700a62a2bc993c)

#### 1.0.0 - first pre-release

### @slidy/core

#### 3.6.0 - `on:mutate` event, auto reinit, improvments & fixes

-   [fix `dom()` init](https://github.com/Valexr/Slidy/commit/f5a0d0bf9b2fe6ea4735009ad145657ea9ba818c)
-   [fix `snap` behaviour](https://github.com/Valexr/Slidy/commit/110d6cda970e0c0fbffc25f948cf26f6c8d2cbc5)
-   [add `scrollable` option](https://github.com/Valexr/Slidy/commit/fb6feabddfcaef98e5474ded4642770a71d46ba4)
-   [add reactive `position`](https://github.com/Valexr/Slidy/commit/ede73065fdd13bffc3281a5905735b30c810784f)
-   [fix `axis: 'y'` behaviour](https://github.com/Valexr/Slidy/commit/e042f8feb152c57dba024c5a11c50c6df267f9eb)
-   [add `on:mutate` event & auto reinit](https://github.com/Valexr/Slidy/commit/ec03d72ca6303de89019adc7f37761605ccffd80)
-   [add `-webkit-user-select:none` css rule](https://github.com/Valexr/Slidy/commit/ad84096c7ecf8cf88d1a678d7b2d94c1550817f9)

### @slidy/svelte

#### 3.3.0 - core futures & fixes

#### 3.2.2 - test release

### @slidy/solid

#### 1.3.0 - core futures & fixes

## @slidy/react

#### 1.1.0 - core futures & fixes

## 3.5.3 - @slidy/react

### @slidy/react

#### 1.0.0

-   first release

### @slidy/solid

#### 1.2.1

-   implement `groups` prop to control the number of items displayed per viewport

### @slidy/svelte

#### 3.2.1

-   implement `groups` prop to control the number of items displayed per viewport;
-   inherit `clamp` value by control buttons;

### @slidy/core

#### 3.5.3

-   decrease bundle size
-   `window.Slidy` object contain `@slidy/core`, `@slidy/animation`, `@slidy/easing` & `@slidy/media` functions

```js
window.Slidy = {
    animation, // animation functions
    core, // core function
    easing, // easing functions
    media, // global media store
};
```

### @slidy/media

#### 1.2.7

-   IIFE global name `window.SlidyMedia`

### @slidy/animation

#### 1.0.7

-   IIFE global name `window.SlidyAnimation`

### @slidy/easing

#### 1.0.5

-   IIFE global name `window.SlidyEasing`

## 3.5.2 - @slidy/solid

### @slidy/solid

#### 1.2.0

-   first release

### @slidy/svelte

#### 3.2.0

-   add autoplay action
-   add i18n localization script

#### 3.1.3 - 3.1.5

-   testing releases

### @slidy/core

#### 3.5.2

-   remove `browser` field for modern bundlers & CDN compatibility
-   remove `duration` from `to(index)` method

### @slidy/media

#### 1.2.6

-   fix window availability

#### 1.2.5

-   use generic for better DX https://github.com/Valexr/Slidy/commit/36ecdd8c086d18e0a72805de11b63fdcfd4b58f9

## 3.5.1 - fix issues & updates

### @slidycore

#### 3.5.1

-   [remove duration from to() function](https://github.com/Valexr/Slidy/commit/f4b0226305755a6e2736ba184022924684294f3a)

### @slidy/svelte

#### 3.1.2

-   [correct classname for arrow orientation](https://github.com/Valexr/Slidy/commit/55c9f4bd195b4ad038c53eebe1bff470a56b9fe5)

#### 3.1.1

-   [update overlay slot description](https://github.com/Valexr/Slidy/commit/f68d65522e810c5c7b639a6070bdfd03c05c5a25)
-   [typo within a classname](https://github.com/Valexr/Slidy/commit/cd71fefc2ade71336a3ee5d55d61196d836241ec)

## 3.5.0 - modulated & fully rethinkin

### Simple, configurable, nested & reusable sliding action script with templates, animations, easings & some useful plugins.

Сompletely mimics the behavior of a native scroll with mouse drag, index navigation, acceleration, gravity & infinite loop mode.

### Packages

-   [@slidy/core](https://github.com/Valexr/slidy/tree/master/packages/core) - Core sliding script
-   [@slidy/media](https://github.com/Valexr/slidy/tree/master/packages/media) - Observable media
-   [@slidy/easing](https://github.com/Valexr/slidy/tree/master/packages/easing) - Easing functions
-   [@slidy/animation](https://github.com/Valexr/slidy/tree/master/packages/animation) - Animation functions
-   [@slidy/svelte](https://github.com/Valexr/slidy/tree/master/packages/svelte) - SvelteJS template

### Todo

-   [Demo docs site](https://github.com/Valexr/slidy/tree/master/www) based on SvelteKit
-   [@slidy/react](https://github.com/Valexr/slidy/tree/master/packages/react) - ReactJS template
-   [@slidy/vue](https://github.com/Valexr/slidy/tree/master/packages/vue) - VueJS template
-   [@slidy/wc](https://github.com/Valexr/slidy/tree/master/packages/wc) - WebComponent template
-   [@slidy/malina](https://github.com/Valexr/slidy/tree/master/packages/malina) - MalinaJS template
-   [@slidy/solid](https://github.com/Valexr/slidy/tree/master/packages/solid) - SolidJS template

## 2.8.2

-   fix index on stop;

## 2.8.1

-   fix index limits;

## 2.8.0

-   new option `immutable={true}`;

## 2.7.1

-   new prop `options.sensity: 0.3` for next slidy scroll sensitivity;

## 2.7.0

-   rename `slidyinit` to `init`, now it's `true` by default.
    [Example](https://svelte.dev/repl/c4b8e256b4eb45a9be8487a891799076);

## 2.6.9

-   `keyExtractor()` now `key()` & by default:

```js
key = (item) => item.id || item[slide.imgsrckey];
```

Slides may not have `id`'s, but you must have `imgsrckey` (by default
`imgsrckey="src"`). Svelte needs some unique identifier for `{#each}` loop.

You can customize key() in template instead:

```svelte
<Slidy key="{(item) => uid()}" />
```

# 2.6.5

-   Add `keyExtractor` props as function to customize svelte loop key. The default
    return value is `item.id`, defaults to array's index if there is no id key.

```js
keyExtractor = (item, i) => item.id || i;
```

Tx @axmad386👍🏻 for [PR](https://github.com/Valexr/svelte-slidy/pull/22) &
@tehnolog for [issue](https://github.com/Valexr/svelte-slidy/issues/18)

Usage example:

```svelte
<Slidy keyExtractor="{(item, index) => item.id + index + uid()}" />
```

or

```svelte
<Slidy keyExtractor="{(item) => item.id.toString()}" />
```

## Previous changes (Pre 2.6.5)

-   `timeout` prop: 0 `Number` - set timeout to `slidyinit: true` - like example
    time for spinner;
-   Named export `import { Slidy } from 'svelte-slidy';` and `esbuild` bundler;
-   `<Spinner />` removed loader from tje core and replaced with custom slot
    `<slot name="loader" />`;
-   Simplified sizes props initializion;
-   Move `pannable.js` listeners to wrap <section> node;
-   Rename `resobserver.js` to `resize.js`
-   [`{ overflow: 'hidden' }` option](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd);
-   [Fully reactive Slidy for update slides in runtime](https://slidy.valexr.online);
-   New block of [options: { axis: 'x', loop: false, duration: 550 }](#usage) in
    settings object;
-   [{ loop: true/false } option](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd);
-   [{ objectfit: 'cover' } option](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd);
-   [{ align: 'middle', alignmargin: 50 } option](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd);
-   Slide now places in default slot, `<slot name="slide" />` was removed;
-   Add functionality for external slides control;
-   [External thumbs/dots navigation](https://svelte.dev/repl/5979bd8521324a9b82a584521fbca6f9);
-   [Internal option shift + mousewheel functionality](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd);
-   New props names & settings;
-   [New classNames && slots in Slidy nodes tree](#-slidy-nodes-tree--slots-for-customize);
-   [New settings for preloader](#usage);
-   [Axis Y direction](https://svelte.dev/repl/08622ad02f884859ae8c8b4d0fa617d4);
-   Classnames on state:
    -   `.loaded` – on init Slidy;
    -   `.autowidth` – on slide.width: 'auto';
    -   `.axisy` – on axis: 'y' direction;
-   Keyboard arrowkeys navigation only Slidy in focus;
-   ["slide.backimg", "slide.imgsrckey", "slide.class" options](#usage),
    [example](https://svelte.dev/repl/8910cf8db1c947dba57faaf5711c8314);
-   If you are using slot content and `slide.backimg` option: as `false` you need
    to tag `<img />` inside slot. By default empty slot have `<img />` tag;
-   Rename directive property name `let:slide` to `let:item`;
