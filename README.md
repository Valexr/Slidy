# SLIDY – simple, configurable & reusable carousel component built with SvelteJS.

[![NPM version](https://img.shields.io/npm/v/svelte-slidy.svg)](https://www.npmjs.com/package/svelte-slidy) [![NPM downloads](https://img.shields.io/npm/dm/svelte-slidy.svg)](https://www.npmjs.com/package/svelte-slidy)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/svelte-slidy.svg)](https://www.npmjs.com/package/svelte-slidy)


## Changelog
- Sorry, remove `<Spinner />` loader from core & now just `<slot name="loader" />` (you can get Spinner [here](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd) ;)))
- Simplifyed sizes props initializion (prepare for intersection events...)
- Move pannable.js listeners to wrap node <sections>
- Rename resobserver.js > resize.js
- [New { overflow: 'hidden' } setting](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd)
- **IMPORTANT** - index = i
- [Fully reactive Slidy for update slides in runtime](https://valexr.github.io/slidy-site/)
- New block [options: {
            axis: 'x',
            loop: false,
            duration: 550
        }](#newpropsname) in settings object
- [New { loop: true/false } setting](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd)
- [New { objectfit: 'cover' } setting](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd)
- [New { align: 'middle',
        alignmargin: 50 } setting](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd)
- **!!!New** – slot for slide (slot="slide") without name now. 
- [New external controls](#external)   
- [Make external thumbs/dots nav](https://svelte.dev/repl/5979bd8521324a9b82a584521fbca6f9)   
- [Internal option shift + mousewheel](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd)
- [New props names & settings](#newpropsname)
- [New classNames && slots in Slidy nodes tree](#newclassname)
- [New settings for preloader](#newpropsname)
- [Axis Y direction](https://svelte.dev/repl/08622ad02f884859ae8c8b4d0fa617d4)
- Classnames on state:
  - .loaded – on init Slidy
  - .autowidth – on slide.width: 'auto'  
  - .axisy – on axis: 'y' direction
- Keyboard arrowkeys navigation only Slidy in focus
- [New props 'slide.backimg', 'slide.imgsrckey' & 'slide.class'](#newpropsname) – [example](https://svelte.dev/repl/8910cf8db1c947dba57faaf5711c8314)
- If you are using yours content in slot & slide.backimg: 'false' you need tag ```<img />``` inside slot. By default empty slot have ```<img />``` tag.
- New props rename let:slide > let:item


## Site
[https://valexr.github.io/slidy-site/](https://valexr.github.io/slidy-site/)

## Playground
[https://svelte.dev/repl/](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd)

## Install

```bash
npm i -D svelte-slidy
```
or
```
yarn add -D svelte-slidy
```

## Usage

### <a name="newpropsname"></a> By default setiings looks like:

```html
<script>
    import Slidy from 'svelte-slidy' // import component

    const local = [
        { id: 1, src: 'img/img.webp' },
        ...
    ]; // slides items

    $: slidy_default = { // any name you like
        slides: local, // new name "slides" for arr yours slides elements in 2.0
        wrap: {
            id: 'slidy_default', // customize this instance Slidy by #id
            width: '100%',
            height: '50%',
            padding: '0',
            align: 'middle',
            alignmargin: 50
        },
        slide: {
            gap: 0,
            class: '', // classname for styling slide
            width: '50%',
            height: '100%',
            backimg: true, // if true image on background slidewrap & slot for content empty
            imgsrckey: 'src', // prop for ypurs image src key
            objectfit: 'cover', // new in 2.3.0
            overflow: 'hidden' // new in 2.4.1
        },
        controls: {
            dots: true,
            dotsnum: true,
            dotsarrow: true,
            dotspure: false, // dotnav like realy dots :)
            arrows: true,
            keys: true, // nav by arrow keys
            drag: true, // nav by mousedrag
            wheel: true, // nav by mousewheel (shift + wheel) or swipe on touch/trackpads
        },
        options: {
            axis: 'x', // new in 2.2.0 axis direction
            loop: false, // new in 2.3.0 loop/no options
            duration: 550, // duration slides animation
        },
        loader: { // new in 2.0 settings for preloader spinner
            color: 'red',
            size: 75,
            speed: duration,
            thickness: 1,
        }
    } // slidy settings for current instance
</script>

<Slidy {...slidy_default} bind:index let:item /> <!-- bind:index new prop in 2.0 for external controls & let:item new name for prop to eached elements -->
```


>**!MPORTANT** – you need declared all the settings objects for each instance of Slidy.


## Customize slide skin

[Example](https://svelte.dev/repl/61bddcb0ec1e45be87dbd56f43f7c660)

You can use any tags what you want inside Slidy component for ```{#each it}``` by ```let:item``` derective:

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
        slides: local,
        ...
    }
</script>

<Slidy {...slidy_cards} let:item>
    <div class="slide"> <!-- wrapper for new skin -->
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

>**!MPORTANT** – let:item derectives for each yours items in new skin & can be without wrappers ;).


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

## <a name="newclassname"></a> Slidy nodes tree & slots for customize

```html
<section id="yours custom #id" class="slidy">
    <slot name="loader"> <!--for yours custom loader -->
    <ul class="slidy-ul">
        {#each}
            <li>
                <slot {slide}> <!--for yours custom slide skin -->
            </li>
        {/each}
    </ul>
    <button class="arrow-left">
        <slot name="arrow-left"> <!--for yours custom arrow-left -->
    </button>
    <button class="arrow-right">
        <slot name="arrow-right"> <!--for yours custom arrow-right -->
    </button>
    <ul class="slidy-dots">
        <li class="dots-arrow-left">
            <slot name="dots-arrow-left"> <!--for yours custom dots-arrow-left -->
        </li>
        {#each}
            <li>
                <slot name="dot"> <!--for yours custom dot -->
            </li>
        {/each}
        <li class="dots-arrow-right">
            <slot name="dots-arrow-right"> <!--for yours custom dots-arrow-right -->
        </li>
    </ul>
</section>
```

## <a name="external"></a> NEW External controls 

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

<Slidy {...slidy_unic} bind:index /> <!-- Just bind:index – dinamic prop for current active slide to yours prop -->
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

[**Example**](https://svelte.dev/repl/63eabf4de9ef40108da038cf55cba8dd)

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
