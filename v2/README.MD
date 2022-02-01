<div align="center">
    <a href="https://www.npmjs.com/package/svelte-slidy">
        <img alt="npm package version" src="https://badgen.net/npm/v/svelte-slidy" />
    </a>
    <a href="https://www.npmjs.com/package/svelte-slidy">
        <img alt="types included" src="https://badgen.net/npm/types/svelte-slidy" />
    </a>
    <a href="https://www.npmjs.com/package/svelte-slidy">
        <img alt="downloads count" src="https://badgen.net/npm/dt/svelte-slidy" />
    </a>
    <a href="https://www.npmjs.com/package/svelte-slidy">
        <img alt="licence" src="https://badgen.net/npm/license/svelte-slidy" />
    </a>
</div>

<div align="center">
    <a href="https://bundlephobia.com/package/svelte-slidy">
        <img alt="minified size" src="https://badgen.net/bundlephobia/min/svelte-slidy/" />
    </a>
    <a href="https://bundlephobia.com/package/svelte-slidy">
        <img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/svelte-slidy/" />
    </a>
    <a href="https://bundlephobia.com/package/svelte-slidy">
        <img alt="dependency count" src="https://badgen.net/bundlephobia/dependency-count/svelte-slidy/" />
    </a>
    <a href="https://bundlephobia.com/package/svelte-slidy">
        <img alt="tree-shaking" src="https://badgen.net/bundlephobia/tree-shaking/svelte-slidy/" />
    </a>
</div>

# @slidy/svelte

Simple, configurable & reusable carousel component built with SvelteJS.

Try the [demo](https://valexr.github.io/slidy).

## Getting started

The package is available via [npm](https://www.npmjs.com/package/svelte-slidy):

```
npm i svelte-slidy
```

REPL is available
[here](https://svelte.dev/repl/d33251a407df44b8ba48e93916b13588?version=3.46.3).

## Usage

To use `Slidy` use named import. The only required props are `slides` - an array
of objects with image related data:

```svelte
<Slidy {slides} />

<script>
    import { Slidy } from 'svelte-slidy';

    const slides = [
        {
            id: 1,
            src: 'static/img/some-image.webp',
        },
    ];
</script>
```

## Options

Component's behaviour can be customized with object. All settings are broken
into 4 categories. Most of the options are self-explanatory. Each `Slidy`
instance should have it's own options.

Example with all available options and their default values:

```svelte
<Slidy {...options} />;

<script>
    import { Slidy } from 'svelte-slidy';

    const options = {
        slides: [],
        key: (item) => item.id || item[slide.imgsrckey],
        wrap: {
            id: '',
            width: '100%',
            height: '50%',
            padding: '0',
            align: 'middle',
            alignmargin: 50,
        },
        slide: {
            gap: 50,
            class: '',
            width: '50%',
            height: '100%',
            backimg: true,
            imgsrckey: 'src',
            objectfit: 'cover',
            overflow: 'hidden',
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
        options: {
            axis: 'x',
            loop: false,
            duration: 550,
        },
    };
</script>
```

## Custom styling

To customize default `Slidy` nodes markup styles, provide an `id` use
`:global()` to get necessary specifity.

```svelte
<Slidy {...options} />

<script>
    import { Slidy } from 'svelte-slidy';

    const options = {
        slides: [],
        id: 'slidy-id',
    };
</script>

<style>
    :global(#slidy-id) {
        /* your CSS styling */
    }
</style>
```

`Slidy`'s markup structure with it's classes:

```svelte
<section id="yours custom #id" class="slidy">
    <ul class="slidy-ul">
        <!-- slides node -->
    </ul>
    <button class="arrow-left">
        <!-- previous slide control node -->
    </button>
    <button class="arrow-right">
        <!-- next slide control node -->
    </button>
    <ul class="slidy-dots">
        <li class="dots-arrow-left">
            <!-- next slide dots control node -->
        </li>
        <li>
            <!-- dots node -->
        </li>
        <li class="dots-arrow-left">
            <!-- previous slide dots control node -->
        </li>
    </ul>
</section>
```

For example, to override styles of specific section, use the classes described
above:

```svelte
<style>
    :global('slidy-instance-id' .dots-arrow-left) {
        /* your custom CSS styles */
    }
</style>
```

## External controls

It is possible to control `Slidy` instance from parent component. Declare the
variable to hold the index and bind it to the `Slidy` instance to control the
slides navigation.

```svelte
<button on:click={() => (index += 1)}> Next slide </button>

<Slidy bind:index slides />

<script>
    import { Slidy } from 'svelte-slidy';

    const slides = [];

    let index = 0;
</script>
```

## Custom slides

Sometimes the default markup is not enough. For custom slides markup use
`let:item` directive:

```svelte
<Slidy slides let:item>
    <figure>
        <img src={item.src} alt={item.figcaption} />
        <figcaption>
            {item.figcaption}
        </figcaption>
    </figure>
</Slidy>

<script>
    import { Slidy } from 'svelte-slidy';

    const slides = [
        {
            id: 1,
            src: '/img.webp',
            figcaption: 'Some text here',
        },
    ];
</script>
```

## Custom nodes

`Slidy` supports customization of it's nodes via slots:

-   `<slot />` for slides;
-   `<slot name="loader" />` for loading indicator;
-   `<slot name="arrow-left">` for the previous slide control;
-   `<slot name="arrow-right">` for the next slide control;
-   `<slot name="dots-arrow-left">` for previous slide control at dots;
-   `<slot name="dots-arrow-right">` for next slide control at dots;
-   `<slot name="dots">` for custom dots controls.

Example:

```svelte
<Slidy slides>
    <!-- custom dots indicators -->
    <button slot="dot" />
</Slidy>

<script>
    import { Slidy } from 'svelte-slidy';

    const slides = [];
</script>
```

### SvelteKit

> Important note: slots are [not SSR compatible](https://github.com/Valexr/slidy/issues/21) yet.
> Check if the code runs in the browser before render.

Example for `svelte\kit` users:

```svelte
{#if browser}
    <Slidy slides>
        <!-- custom dots indicators -->
        <button slot="dot" />
    </Slidy>
{/if}

<script>
    import { Slidy } from 'svelte-slidy';
    import { browser } from '$app/env';

    const slides = [];
</script>
```

## License

MIT &copy; [Valexr](https://github.com/Valexr)
