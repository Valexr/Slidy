# SLIDY – simple configurable carousel component on SvelteJS.

[![NPM version](https://img.shields.io/npm/v/svelte-slidy.svg?style=flat)](https://www.npmjs.com/package/svelte-slidy) [![NPM downloads](https://img.shields.io/npm/dm/svelte-slidy.svg?style=flat)](https://www.npmjs.com/package/svelte-slidy)

## Site
[**https://valexr.github.io/slidy-site/**](https://valexr.github.io/slidy-site/)

## Playground
[**https://svelte.dev/repl/**](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd?version=3.24.1)

## Install

```bash
yarn add -D slidy
```

## Usage

### By default setiings looks like:

```html
<script>
    import Slidy from 'svelte-slidy' // import component

    const local = [
        { id: 1, src: 'img/img.webp' },
        ...
    ]; // slides items

    $: slidy_default = { // any name you like
        slidys: local,
        wrap: {
            id: 'slidy_default',
            width: '100%',
            height: '50vh',
            padding: '0',
        },
        slide: {
            gap: 0,
            width: 'auto',
            height: '100%',
        },
        controls: {
            dots: true,
            dotsnum: true,
            dotsarrow: true,
            dotspure: false,
            arrows: true,
            keys: true,
            drag: true,
            wheel: true,
        },
        duration: 250,
    } // slidy settings for current instance
</script>

<Slidy {...slidy_default} />
```


>**!!!MPORTANT** – you need declared all the settings objects for each instance of Slidy.


## Custome slide skin
You can use any tags what you want inside Slidy component for ```{#each it}``` by ```slot="slide"``` wrapper & ```let:item``` derective:

```html
<script>
    import Slidy from 'svelte-slidy'

    const local = [
        { 
            id: 1, 
            src: 'img/img.webp', 
            header: 'What is Slidy?',
            text: 'SLIDY – simple configurable carousel component on SvelteJS.' },
        ...
    ]; // items with text & header

    $: slidy_cards = {
        slidys: local,
        ...
    }
</script>

<Slidy {...slidy_cards}>
    <div slot="slide" let:item class="slide"> <!-- wrapper for new skin -->
        <img alt="{item.header}" src="{item.src}"/>
        <article>
            <h2>{item.header</h2>
            <p>
                {item.text}
            </p>
        </article>
    </div>
</Slidy>

<style>
    .slide {
        ...yours style for slide
    }
</style>
```

>**!!!MPORTANT** – slot="slide" & let:item derectives for each yours items in new skin ;). 


## Custome default Slidy styles

```html
<script>
    import Slidy from 'svelte-slidy'

    $: slidy_default = {
        ...
        wrap: {
            id: 'slidy_default', // custom #id for this instance Slidy
            ...
    }
</script>

<Slidy {...slidy_default} />

<style>
    :global(#slidy_default) {
        ... yours new styles for default
    }
</style>
```

## Slidy nodes tree

```html
<section id="yours custom #id" class="svelte-slidy">
    <ul class="svelte-slidy-ul">
        <li class="svelte-slidy-li">
            <slot name="slide" {item}> <!--for yours custom slide skin -->
        </li>
    </ul>
    <button class="svelte-slidy-arrow-left"></button>
    <button class="svelte-slidy-arrow-right"></button>
    <ul class="svelte-slidy-dots">
        <li><button class="svelte-slidy-arrow-left"></button></li>
        <li>
            <button></button>
        </li>
        <li><button class="svelte-slidy-arrow-right"></button></li>
    </ul>
</section>
```

## Media queries
By default in Slidy implemented [svelte-match-media](https://github.com/pearofducks/svelte-match-media) by @pearofducks.
Also you can use any like you plugins or technology.

### Default settings mediaquery:
```js
{
    desktop: 'screen and (min-width: 769px)',
    mobile: 'screen and (max-width: 768px)'
}
```
### You can use it at once in yours Slidy settings:
```html
<script>
    import Slidy, {media} from 'svelte-slidy' // import $media store from Slidy
    ...

    $: slidy_default = { 
        ...
        slide: {
            width: $media.mobile ? '100%' : '50%' // rule for $media.mobile query
        },
        ...
    }
</script>

<Slidy {...slidy_default} />
```

### Or you can setup it in yours root component in script context="module" tag:
```html
<!-- App.svelte -->

<script context="module">
    import { mediaquery } from './Slidy.svelte' // import setting function
    mediaquery({
        desktop: 'screen and (min-width: 769px)',
        tablet: 'screen and (max-width: 768px)',
		mobile: 'screen and (max-width: 425px)',
		landscape: 'only screen and (orientation:landscape)',
		portrait: 'only screen and (orientation:portrait)',
		dark: '(prefers-color-scheme: dark)',
		light: '(prefers-color-scheme: light)',
		no_color: '(prefers-color-scheme: no-preference)',
		standalone: '(display-mode: standalone)',
		touchscreen: '(hover: none) and (pointer: coarse)',
        pointerscreen: '(hover: hover) and (pointer: fine)',
        short: '(max-height: 399px)',
        tiny: '(orientation: portrait) and (max-height: 599px)',
        //... & all what you want ;)
	})
</script>
```

### Or you can setup it in yours root main/howitcall.js file:
```js
/* main.js */

import { mediaquery } from './Slidy.svelte' // import setting function

mediaquery({
    desktop: 'screen and (min-width: 769px)',
    tablet: 'screen and (max-width: 768px)',
    mobile: 'screen and (max-width: 425px)',
    //... & all what you want ;)
})
```

## License

MIT &copy; [Valexr](https://github.com/Valexr)