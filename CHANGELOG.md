# Changelog

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

## 2.6.5

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
