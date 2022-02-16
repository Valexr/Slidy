<div align="center">
    <a href="https://www.npmjs.com/package/@slidy/svelte">
        <img alt="npm package version" src="https://img.shields.io/npm/v/@slidy/svelte?style=flat-square" />
    </a>
    <a href="https://www.npmjs.com/package/@slidy/svelte">
        <img alt="types included" src="https://img.shields.io/npm/types/@slidy/svelte?style=flat-square" />
    </a>
    <a href="https://www.npmjs.com/package/@slidy/svelte">
        <img alt="downloads count" src="https://img.shields.io/npm/dm/@slidy/svelte?style=flat-square" />
    </a>
    <a href="https://www.npmjs.com/package/@slidy/svelte">
        <img alt="licence" src="https://img.shields.io/npm/l/@slidy/svelte?style=flat-square" />
    </a>
    <a href="https://img.shields.io/bundlephobia/minzip/@slidy/svelte?style=flat-square">
        <img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/@slidy/svelte/" />
    </a>
    <a href="https://bundlephobia.com/package/@slidy/svelte">
        <img alt="dependency count" src="https://badgen.net/bundlephobia/dependency-count/@slidy/svelte/" />
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

Controls the position of the `snap` points to align the slides after the scrolling operation has completed.

</details>

<details>
    <summary>
        <code>
            background = false
        </code>
    </summary>

Instead of creating `<img />` HTML tags for slide images, uses CSS `background-image` property.

</details>

<details>
    <summary>
        <code>
            clamp = false
        </code>
    </summary>

Controls the inertia of the scrolling between the slides.

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
            arrows = true
        </code>
    </summary>

Renders the `arrow` button controls for accessible slide management. Removing the controls is not recommened for accessibility.

</details>

<details>
    <summary>
        <code>
            navigation = true
        </code>
    </summary>

Renders the navigation controls for pagination-like slide management.

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

Controls the `gravity` value for more granular control over inertia of the scrolling operation.

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
            getImgSrc = item => item.src
        </code>
    </summary>

The slide's `src` attribute builder function. Useful, when the `src` is build from metadata, like an `url`.

</details>

<details>
    <summary>
        <code>
            index = 0
        </code>
    </summary>

Stores the index of the current slide. Usefull with binding for external controls. More at [External Controls](#external-controls).

</details>

<details>
    <summary>
        <code>
            loop = false
        </code>
    </summary>

Makes the slideshow continious. Not recommended for better performance.

</details>

<details>
    <summary>
        <code>
            position = 0
        </code>
    </summary>

Stores the current position value of the carousel. Usefull with binding for external controls. More at [External Controls](#external-controls).

</details>

<details>
    <summary>
        <code>
            slides = []
        </code>
    </summary>

An array of objects with slide image related metadata such as `src`, `alt`, etc.

</details>

<details>
    <summary>
        <code>
            snap = true
        </code>
    </summary>

Enforces the scroll positions that a scroll container's scrollport may end after a scrolling operation has completed.

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

For easier style customization `Slidy` provides a set of predefined custom properties to inherit.

For example, to recolor pagination controls, let the component inherit a `--slidy-navigation-color` custom property from any parent:

```svelte
<div class="parent">
    <Slidy />
</div>

<script>
    import { Slidy } from '@slidy/svelte';
</script>

<style>
    .parent {
        --slidy-navigation-color: red;
    }
</style>
```

List of available custom properties:

-   `--slidy-height: 100%;`
-   `--slidy-width: 100%;`
-   `--slidy-slide-gap: 1rem;`
-   `--slidy-slide-height: 100%;`
-   `--slidy-slide-width: auto;`
-   `--slidy-slide-object-fit: cover;`
-   `--slidy-navigation-size: 12px;`
-   `--slidy-navigation-color: white;`
-   `--slidy-arrow-size: 24px;`

## Overriding the styles

In cases where the custom properties are not enough, Svelte provides a `:global()` modifier. To customize default `Slidy` markup styles, provide an `id` or `className` attribute and use `:global()` modifier to get necessary specifity.

```svelte
<Slidy {id} />

<script>
    import { Slidy } from 'svelte-slidy';

    export let id = 'unique-id';
</script>

<style>
    :global(#unique-id) {
        /* your CSS styles */
    }
</style>
```

To target specific parts of the markup, use the component's internal markup classes:

```html
<section class="slidy">
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
    <fieldset class="slidy-navigation">
        <!-- slidy dot controls -->
        <button class="slidy-navigation-item" />
    </ul>
</section>
```

For example, to override styles of specific section, use the classes described above:

```svelte
<style>
    :global(.slidy .slidy-arrow) {
        /* your custom CSS styles */
    }
</style>
```

## Slots

Available `slot` names:

<details>
    <summary>
        <code>
            default
        </code>
    </summary>

Usually the default markup is not enough. The `default` slot solves this problem. To use custom slide markup slot expose each `slides` prop item as `let:item` directive.

```svelte
<Slidy let:item>
    <figure>
        <img src={item.src} alt={item.figcaption} />
        <figcaption>
            {item.figcaption}
        </figcaption>
    </figure>
</Slidy>
```

</details>

<details>
    <summary>
        <code>
            counter
        </code>
    </summary>

Custom counter slot. To indicate the progress, component provide `index` and `amount` props:

```svelte
<Slidy let:index let:amount>
    <output slot="counter">
        {index / amount}%
    </output>
</Slidy>
```

</details>

<details>
    <summary>
        <code>
            arrow-prev (arrow-next)
        </code>
    </summary>

Provides a slot for custom button contents the _previous_ and _next_ slide controls, like icons for example.

```svelte
<Slidy>
    <svg slot="arrow-prev" />
    <svg slot="arrow-next" />
</Slidy>
```

</details>

<details>
    <summary>
        <code>
            nav-item
        </code>
    </summary>

Provides a slot for custom pagination buttons.
Slot receives optional `index` and `active` props for proper functionality.

Custom navigation item should be a `<button />` and have `data-index` attribute to function. Otherwise, control the component [externally](#external-controls).

```svelte
<Slidy let:active let:index>
    <button slot="nav-item" data-index={index} {active} {index} />
</Slidy>
```

</details>

## External controls

It is possible to control the navigation of the `Slidy` instance from the parent component via binding.

There are two variables available to control the component externally: `index` and `position`. Declare the variables to hold the values and bind them to the instance for the carousel control.

```svelte
<button on:click={() => (index += 1)}> Next slide </button>

<button on:click={() => (position += 50)}> Move </button>

<Slidy bind:index bind:position />

<script>
    import { Slidy } from 'svelte-slidy';

    let index = 0;
    let position = 0;
</script>
```

## License

MIT &copy; [Valexr](https://github.com/Valexr)
