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


## Customize slide skin

[Example](https://svelte.dev/repl/61bddcb0ec1e45be87dbd56f43f7c660?version=3.24.1)

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
		:global(#youunicid .svelte-slidy-li) {width: 100vw;}
	}
</style>
```
## External controls!

[Example](https://svelte.dev/repl/c3f50a4277384ebf860fcb1bb8d26dae?version=3.24.1)

You can controls yours Slidy instance externamlly from parent component:

```html
<script>
    import Slidy from 'svelte-slidy'

    $: slidy_unic = {
        ...
        slidyGO: { // new portion settings for external controls Slidy instance )))
            prev: false,
            play: false,
            playduration: 350, // duration only for slidyPlay() external function
			next: false,
        }
    }

    function slidy_unicGOplay() { // any name what you like & inside you have prop for controls unic instance Slidy
		slidy_unic.slidyGO.play = !slidy_unic.slidyGO.play
	}
</script>

<button on:click="{slidy_unicGOplay}">{slidy_unic.slidyGO.play ? 'STOP' : 'PLAY'}</button> <!--just call function from any you like element on the page -->

<Slidy {...slidy_unic}/>
``

Let`s slidyGO! ...tnx

## License

MIT &copy; [Valexr](https://github.com/Valexr)