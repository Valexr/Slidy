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

Simple, configurable & reusable carousel component built with SvelteJS based on [@slidy/core][core-package].

Try the [demo][].

## Getting started

The package is available via [npm][]:

```
npm i @slidy/svelte
```

REPL is available [here](REPL).

## Usage

`Slidy` component is available via named import. All props are optional. The only preperty to get started is `slides` - an array of objects with image related data:

```svelte
<script>
    import { Slidy } from '@slidy/svelte';

    const slides = [
        {
            id: 1,
            width: 800,
            height: 1200,
            src: 'static/img/some-image.webp',
        },
    ];
</script>

<Slidy slides="{slides}" />
```

By default component works with images. Image object should contain `width` and `height` attributes to prevent layout shifts and `alt` for accessibility, all these attributes are _required_.

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

Instead of creating `<img />` elements as contents, `background-image` property used to display images. Not recommended for SEO and should be used only for presentational content.

</details>

<details>
    <summary>
        <code>
            clamp = false
        </code>
    </summary>

Controls the inertia while scrolling the slides.

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

Makes the slideshow continious. Not recommended for better performance and considered as bad practice.

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

An array of objects with image related metadata such as `src`, `alt`, etc.

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

Sets the component into the vertical orientation.

</details>

## Custom Properties API

For easier style customization `Slidy` provides a set of predefined custom properties to inherit:

List of available public custom properties:

| Property                   | Default  |    Type    | Description                                          |
| :------------------------- | :------: | :--------: | :--------------------------------------------------- |
| `--slidy-height`           |   100%   | `<length>` | The height of the component's node.                  |
| `--slidy-width`            |   100%   | `<length>` | The width of the component's node.                   |
| `--slidy-slide-gap`        |   1rem   | `<length>` | The gap between items in carousel.                   |
| `--slidy-slide-height`     |   100%   | `<length>` | The carousel items height.                           |
| `--slidy-slide-width`      |   auto   | `<length>` | The carousel items width.                            |
| `--slidy-slide-object-fit` |  cover   |     -      | The carousel items (images) resize behaviour.        |
| `--slidy-slide-bg-color`   | darkgray | `<color>`  | The placeholder background color for loading images. |
| `--slidy-nav-item-size`    |   16px   | `<length>` | The navigation elements size.                        |
| `--slidy-nav-item-radius`  |   50%    | `<length>` | The navigation elements border radius.               |
| `--slidy-nav-item-color`   |  white   | `<color>`  | The navigation elements color.                       |
| `--slidy-arrow-size`       |   24px   | `<length>` | The arrow controls size.                             |

There are two options:

### --style-props

Svelte supports passing down custom properties to component via [`--style-props`][svelte-custom-props]:

```svelte
<Slidy --slidy-slide-gap="1rem" />
```

Bear in mind that this way Svelte wraps the component in extra `<div />` with `display: contents`.

### Inherited custom properties

More optimal way is to use cascade. All supported custom properties starts with `--slidy-`. For example, to recolor navigation controls, let the component inherit a `--slidy-nav-item-color` custom property from any parent:

```svelte
<div class="parent">
    <Slidy />
</div>

<style>
    .parent {
        --slidy-navigation-color: red;
    }
</style>
```

Or just pass a class with a set of custom properties:

```svelte
<Slidy className="some-class" />

<style>
    .some-class {
        --slidy-navigation-color: red;
        --slidy-nav-item-size: 1rem;
    }
</style>
```

## Overriding the styles

In cases where the custom properties are not enough, Svelte provides a `:global()` modifier. To customize default `Slidy` markup styles, provide an `id` or `className` attribute and use `:global()` modifier to get necessary specifity.

```svelte
<script>
    import { Slidy } from 'svelte-slidy';

    export let id = 'unique-id';
</script>

<Slidy id="{id}" />

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
        <img src="{item.src}" alt="{item.figcaption}" />
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
            arrows
        </code>
    </summary>

Provides a slot for custom arrow buttons.

If the nodes are `<button /> ` and the `data-step` attribute is present, the event listener is not needed. Just provide the values `-1` and `1` for `data-step` on custom buttons.

Also, there are `grid-area` is present in the layout for this custom controls: `prev-slide` and `next-slide` respectively.

```svelte
<Slidy>
    <svelte:fragment slot="arrows">
        <button data-step="-1"> Show the previous slide </button>
        <button data-step="1"> Show the next slide </button>
    </svelte:fragment>
</Slidy>

<style>
    button:first-of-type {
        grid-area: prev-slide;
    }

    button:last-of-type {
        grid-area: next-slide;
    }
</style>
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
    <button slot="nav-item" data-index="{index}" active="{active}" index="{index}"></button>
</Slidy>
```

</details>

## Events

The component forwards custom events:

<details>
    <summary>
        <code>
            mount
        </code>
    </summary>

Fires a `mount` event when component is mounted to the DOM.

```svelte
<Slidy on:mount="{(event) => console.log(event)}" />
```

</details>

<details>
    <summary>
        <code>
            move
        </code>
    </summary>

Fires a `move` event when on user navigation. Retuns the `index` and `position` values within `details` object.

```svelte
<Slidy
    on:mount="{(event) => {
        const { index, position } = event.details;
        console.log({ index, position });
    }}"
/>
```

</details>

<details>
    <summary>
        <code>
            resize
        </code>
    </summary>

Fires a `resize` event when the size of the component changes.

```svelte
<Slidy
    on:resize={event => console.log(event)}}
/>
```

</details>

<details>
    <summary>
        <code>
            update
        </code>
    </summary>

Fires a `update` event when the properties of the component changes.

```svelte
<Slidy
    on:update={event => console.log(event)}}
/>
```

</details>

## External controls

It is possible to control the navigation of the `Slidy` instance from the parent component via binding.

There are two variables available to control the component externally: `index` and `position`. Declare the variables to hold the values and bind them to the instance for the carousel control.

```svelte
<script>
    import { Slidy } from 'svelte-slidy';

    let index = 0;
    let position = 0;
</script>

<button on:click="{() => (index += 1)}"> Next slide </button>

<button on:click="{() => (position += 50)}"> Move </button>

<Slidy bind:index bind:position />
```

## License

MIT &copy; [Valexr](https://github.com/Valexr)

[core-package]: https://github.com/Valexr/slidy/tree/master/packages/core
[demo]: https://valexr.github.io/Slidy
[npm]: https://www.npmjs.com/package/@slidy/svelte
[repl]: https://svelte.dev/repl/de699aa1f8c04874b0402352ac93df96
[svelte-custom-props]: https://svelte.dev/docs#template-syntax-component-directives---style-props
