<div align="center">
    <a href="https://www.npmjs.com/package/@slidy/svelte">
        <img alt="npm package version" src="https://badgen.net/npm/v/@slidy/svelte" />
    </a>
    <a href="https://www.npmjs.com/package/@slidy/svelte">
        <img alt="types included" src="https://badgen.net/npm/types/@slidy/svelte" />
    </a>
    <a href="https://www.npmjs.com/package/@slidy/svelte">
        <img alt="downloads count" src="https://badgen.net/npm/dt/@slidy/svelte" />
    </a>
    <a href="https://www.npmjs.com/package/@slidy/svelte">
        <img alt="licence" src="https://badgen.net/npm/license/@slidy/svelte" />
    </a>
</div>

<div align="center">
    <a href="https://bundlephobia.com/package/@slidy/svelte">
        <img alt="minified size" src="https://badgen.net/bundlephobia/min/@slidy/svelte/" />
    </a>
    <a href="https://bundlephobia.com/package/@slidy/svelte">
        <img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/@slidy/svelte/" />
    </a>
    <a href="https://bundlephobia.com/package/@slidy/svelte">
        <img alt="dependency count" src="https://badgen.net/bundlephobia/dependency-count/@slidy/svelte/" />
    </a>
    <a href="https://bundlephobia.com/package/@slidy/svelte">
        <img alt="tree-shaking" src="https://badgen.net/bundlephobia/tree-shaking/@slidy/svelte/" />
    </a>
</div>

# @slidy/svelte

Simple, configurable & reusable carousel component built with SvelteJS based on [`@slidy/core`](https://github.com/Valexr/slidy/tree/master/packages/core).

Try the [demo](https://valexr.github.io/Slidy).

## Getting started

The package is available via [npm](https://www.npmjs.com/package/@slidy/svelte):

```
npm i @slidy/svelte
```

REPL is available
[here](https://svelte.dev/repl/de699aa1f8c04874b0402352ac93df96).

## Usage

`Slidy` component is available via named import. All props are optional. The only props required to get started are `slides` - an array of objects with image related data:

```svelte
<Slidy {slides} />

<script>
    import { Slidy } from 'svelte-slidy';

    const slides = [
        {
            id: 1,
            width: 800,
            height: 1200,
            src: 'static/img/some-image.webp',
        },
    ];
</script>
```

## API

<details>
    <summary>
        <code>
            align = "center"
        </code>
    </summary>

Sets the `snap` points to align the slides.
</details>

<details>
    <summary>
        <code>
            background = false
        </code>
    </summary>

Creates slides from `background-image` CSS property instead of `<img />` nodes.
</details>

<details>
    <summary>
        <code>
            clamp = false
        </code>
    </summary>

Clamps.
</details>

<details>
    <summary>
        <code>
            className = undefined
        </code>
    </summary>

Sets the `class` on the parent node.
</details>

<details>
    <summary>
        <code>
            controlArrows = true
        </code>
    </summary>

Controls presence of the `arrow` button controls for slide management.
</details>

<details>
    <summary>
        <code>
            controlDots = true
        </code>
    </summary>

Controls presence of the `dots` button controls for slide management.
</details>

<details>
    <summary>
        <code>
            controlDotsOrdinal = false
        </code>
    </summary>

Manages the type of `dots` button controls view.
</details>

<details>
    <summary>
        <code>
            duration = 450
        </code>
    </summary>

The duration value for slide transitions.
</details>

<details>
    <summary>
        <code>
            gravity = 1.2
        </code>
    </summary>

Controls the `gravity` value for better swipe behaviour.
</details>

<details>
    <summary>
        <code>
            id = undefined
        </code>
    </summary>

Sets the `id` attribute on component's parent node.
</details>

<details>
    <summary>
        <code>
            imgSrcKey = "src"
        </code>
    </summary>

Describes the custom `key` where the `src` attribute of the image is stored in `slides` prop. Defaults to `src`.
</details>

<details>
    <summary>
        <code>
            index = 0
        </code>
    </summary>

Stores the index of the current slide. Usefull for external control with binding.
</details>

<details>
    <summary>
        <code>
            loop = false
        </code>
    </summary>

Sets the looping mode.
</details>

<details>
    <summary>
        <code>
            position = 0
        </code>
    </summary>

Stores the current position value of the carousel. Usefull for external control with binding.
</details>

<details>
    <summary>
        <code>
            slides = []
        </code>
    </summary>

Stores the an array of objects with image related metadata.
</details>

<details>
    <summary>
        <code>
            snap = true
        </code>
    </summary>

Creates the `snap` anchors to align images after swiping.
</details>

<details>
    <summary>
        <code>
            vertical = false
        </code>
    </summary>

Sets the carousel into the vertical orientation.
</details>

## Custom Properties API

For easier style customization `Slidy` provides a set of predefined custom properties.

For example, to recolor dots controls, provide the color as `--slidy-dot-color`:

```html
<script>
    import { Slidy } from "@slidy/svelte";
</script>

<div class="parent">
    <Slidy />
</div>

<style>
    .parent {
        --slidy-dot-color: red;
    }
</style>
```

List of available properties:

--slidy-height: 100%;
--slidy-width: 100%;
--slidy-slide-gap: 1rem;
--slidy-slide-height: 100%;
--slidy-slide-width: auto;
--slidy-slide-object-fit: cover;
--slidy-dot-size: 12px;
--slidy-dot-color: white;
--slidy-arrow-size: 24px;

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
<section class="slidy">
    <ul class="slidy-ul">
        <!-- slides node -->
    </ul>
    <output class="slidy-counter">
        <!-- slide counter -->
    </output>
    <ul class="slidy-slides">
        <li class="slidy-slide">
            <!-- slide -->
        </li>
    </ul>
    <button class="slidy-arrow left">
        <!-- previous slide control node -->
    </button>
    <button class="slidy-arrow right">
        <!-- next slide control node -->
    </button>
    <fieldset class="slidy-dots">
        <!-- slidy dot controls -->
        <button class=slidy-dot" />
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

It is possible to control `Slidy` instance from the parent component via binding.

There are two variables available to control the component externally: `index` and `position`.

Declare the variables to hold the values and bind it to the `Slidy` instance to control the carousel state.

```html
<script>
    import { Slidy } from 'svelte-slidy';

    let index = 0;
    let position = 0;
</script>

<button on:click={() => index += 1}>
    Next slide
</button>

<button on:click={() => position += 50}>
    Move
</button>

<Slidy
    bind:index
    bind:position
/>
```

## Custom slides

Sometimes the default markup is not enough. For custom slides markup use `let:item` directive:

```html
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

<Slidy slides let:item>
    <figure>
        <img src={item.src} alt={item.figcaption} />
        <figcaption>
            {item.figcaption}
        </figcaption>
    </figure>
</Slidy>
```

## Slots

Available `slot` names:

-   `<slot />` for slides;
-   `<slot name="counter">`;
-   `<slot name="arrow-prev">` for the previous slide control;
-   `<slot name="arrow-next">` for the next slide control;
-   `<slot name="dot">` for custom dots controls.

Example:

```html
<script>
    import { Slidy } from 'svelte-slidy';

    const slides = [];
</script>

<Slidy slides>
    <!-- custom dots indicators -->
    <button slot="dot" />
</Slidy>
```

## License

MIT &copy; [Valexr](https://github.com/Valexr)
