# SLIDY – simple configurable carousel component on SvelteJS.

[![NPM version](https://img.shields.io/npm/v/svelte-slidy.svg?style=flat)](https://www.npmjs.com/package/svelte-slidy) [![NPM downloads](https://img.shields.io/npm/dm/svelte-slidy.svg?style=flat)](https://www.npmjs.com/package/svelte-slidy)  
[**8.6kb** gzip](https://bundlephobia.com/result?p=svelte-slidy "bundlephobia.com")


## Changelog
- [New external controls](#external)   
- [Internal option thumbs](https://svelte.dev/repl/5979bd8521324a9b82a584521fbca6f9)   
- [Internal option shift + mousewheel](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd)

## Site
[**https://valexr.github.io/slidy-site/**](https://valexr.github.io/slidy-site/)

## Playground
[**https://svelte.dev/repl/**](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd)

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
            dotsthumbs: false, // new future in 2.0
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


## Customize slide skin

[Example](https://svelte.dev/repl/61bddcb0ec1e45be87dbd56f43f7c660)

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


## Customize default Slidy styles

```html
<script>
    import Slidy from 'svelte-slidy'

    $: slidy_default = {
        ...
        wrap: {
            id: 'slidy_default', // custom #id for this instance Slidy
            ...
        }
    }
</script>

<Slidy {...slidy_default} />

<style>
    :global(#slidy_default) {
        ... yours new styles for default
    }
</style>
```

## Slidy nodes tree & slots for customize

```html
<section id="yours custom #id" class="svelte-slidy">
    <slot name="loader"> <!--for yours custom loader -->
    <ul class="svelte-slidy-ul">
        <li>
            <slot name="slide" {item}> <!--for yours custom slide skin -->
        </li>
    </ul>
    <button class="svelte-slidy-arrow-left">
        <slot name="arrow-left"> <!--for yours custom arrow-left -->
    </button>
    <button class="svelte-slidy-arrow-right">
        <slot name="arrow-right"> <!--for yours custom arrow-right -->
    </button>
    <ul class="svelte-slidy-dots">
        <li>
            <button class="svelte-slidy-arrow-left">
                <slot name="dots-arrow-left"> <!--for yours custom dots-arrow-left -->
            </button>
        </li>
        <li>
            <button>
                <slot name="dot"> <!--for yours custom dot -->
            </button>
        </li>
        <li>
            <button class="svelte-slidy-arrow-right">
                <slot name="dots-arrow-right"> <!--for yours custom dots-arrow-right -->
            </button>
        </li>
    </ul>
</section>
```

## <a name="external"></a> !!! NEW External controls 

[Example](https://svelte.dev/repl/c3f50a4277384ebf860fcb1bb8d26dae)

You can controls yours Slidy instance externally from parent component:

```html
<script>
    import Slidy from 'svelte-slidy'

    $: slidy_unic = {
        ...
    }

    let index = 5 // declarate yours prop, if it not empty, onmount this number will be active slide
</script>

<button on:click="{() => index = 7}">Go to 7 slide</button> <!-- navigate to 7 slide -->

<Slidy {...slidy_unic} bind:slidyx={index}/> <!-- Just bind:slidyx – dinamic prop for current active slide to yours prop -->
```


## Media queries (not implemented yet, but...)
I recomended use [svelte-match-media](https://github.com/pearofducks/svelte-match-media) by @pearofducks.

### Instal svelte-match-media
```bash
yarn add -D svelte-match-media
```

### Default settings mediaquery:
```js
{
    desktop: 'screen and (min-width: 769px)',
    mobile: 'screen and (max-width: 768px)'
}
```
### Just call function ```setup()``` with default:

```js
/* main.js */

import { setup } from 'svelte-match-media' // import setting function

setup()
```

### or setup it in yours "root" ```main/howitcall.js``` file:
```js
/* main.js */

import { setup } from 'svelte-match-media' // import setting function

setup({
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
```

### & use it in Slidy settings by importing store ```$media```:
```html
<script>
    import Slidy from 'svelte-slidy' // import $media store from Slidy
    import { media } from 'svelte-match-media'
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

### Also you can make responsive by CSS media-queries inside default Slidy styles – rewrite it with yours unic #ID

```html
<script>
    import Slidy from 'svelte-slidy'

    $: slidy_unic = {
        ...
        wrap: {
            id: 'youunicid', // custom #id for this instance Slidy
            ...
        }
    }
</script>

<Slidy {...slidy_unic}/>

<style>
    @media screen and (max-width: 425px) {
        :global(#youunicid .svelte-slidy-ul li) {width: 100vw;}
    }
</style>
```

Let`s slidyGO! ...tnx

## License

MIT &copy; [Valexr](https://github.com/Valexr)