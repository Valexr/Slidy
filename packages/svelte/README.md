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

The most simple way to get started is to use named import of `<Slidy />` component:

```svelte
<script>
	import { Slidy } from "@slidy/svelte";

	const slides = [
		{
			id: 1,
			width: 800,
			height: 1200,
			src: "static/img/some-image.webp",
		},
	];
</script>

<Slidy {slides} />
```

All props are optional. The only property to get started is `slides` - an array of objects with image related data.

## Core Component

`Core` is a wrapper component for [@slidy/core][core-package] available via named import. It is best to use to build up the custom component for specific needs or when just the basic functionality is needed.

```svelte
<script>
	import { Core } from "@slidy/svelte";
</script>

<Core>
	<!-- your carousel items passed via slot -->
</Core>
```

### Core Component API

| Property      |     Default      |    Type    | Description |
| :------------ | :--------------: | :--------: | :------------------ |
| `animation` | `undefined` | `AnimationFunc ` | Custom slide animation. |
| `axis` | `"x"` | `"x" | "y"` | The scroll direction. |
| `clamp` | `0` | `number` | Clamps sliding index as `{clamp} - {index} + {clamp}` |
| `className` | `""` | `string` | Passes the `class` to the node. |
| `duration` | `450` | `number` | Slide transitions duration value. |
| `easing` | `undefined` | `(t: number => number)` | Inertion scroll easing behaviour. |
| `gravity` | `1.2` | `number` | Scroll inertia value. |
| `indent` | `0` | `number` | Custom scroll indent value, calculates as `gap * indent`. |
| `index` | `0` | `number` | The index of the initial slide. |
| `loop` | `false` | `boolean` | Makes the slideshow continious. |
| `position` | `0` | `number` | The current position value of the carousel. |
| `sensity`| `5` | `number` | Defines the sliding sensity as the number of pixels required to drag. |
| `snap` | `undefined` | `"start"  | "center" | "end" | "deck"` | Enforces the scroll stop positions. |
| `tag` | `"ol"` | `string`  | The HTML tag name to render. |

For TypeScript users there is the `SlidyCoreOptions` interface available via named import.

## Slidy Component

`<Slidy />` component uses `<Core />` internally and provides more features expected from carousel.

### Slidy Component API

The `<Slidy />` component interface extends the `<Core />`. There are a list of additional options available:

| Property | Default | Type | Description |
| :------- | :-----: | :--: | :---------- |
| `arrows` | `true` | `boolean`  | Renders the arrow button controls for accessible slide navigation. |
| `autoplay` | `false` | `boolean` | Set's up automatic sliding of the carousel items. |
| `autoplayControl` | `false` | `boolean` | Renders the autoplay control and indicator. |
| `background` | `false` | `boolean` | Sets `background-image` instead of `<img />` elements to display slides. |
| `classNames` | `SlidyStyles` | `SlidyStylesDefault` | The class names object used over the component. |
| `getImgSrc` | `item => item.src` | `function` | The slide's `src` attribute getter. |
| `getThumbSrc` | `item => item.src` | `function` | The thumbnail's `src` attribute getter. |
| `i18n` | `i18nDefaults` | `I18NDict` | The i18n localization dictionary. |
| `interval` | `1500` | `number` | Defines the autoplay interval time in ms. |
| `navigation` | `false` | `boolean` | Renders the navigation controls for pagination-like slide navigation. |
| `progress` | `false` | `boolean` | Renders the progress bar. |
| `slides` | `[]` | `Slides[]` | An array of objects with image metadata. |
| `thumbnail` | `false` | `boolean`  | Renders the thumbnail navigation panel. |

By default component works with images. Image object should contain `width` and `height` attributes to prevent layout shifts and `alt` for accessibility.

## Styling

### Extending/Overriding classes

To extend default component styles use `classNames` property. Default classes are available via object, that can be extended or overridden:

```svelte
<script>
	import { Slidy, classNames } from "@slidy/svelte";
</script>

<Slidy
	classNames={{
		root: `${classNames.root} custom-class`,
		...classNames
	}}
/>
```

The `classNames` consist of `{ target: className }` pairs: 

| Target    | Default class      | Description |
| :-------- | :----------------: | :-----------|
| arrow     | `slidy-arrow`      | Arrow controls. |
| autoplay  | `slidy-autoplay`   | Autoplay control. |
| counter   | `slidy-counter`    | Slide progress counter. |
| img       | `slidy-img`        | Slide image node. |
| nav       | `slidy-nav`        | Slide navigation panel. |
| nav-item  | `slidy-nav-item`   | Navigtion panel item. |
| overlay   | `slidy-overlay`    | Slides overlay node. |
| progress  | `slidy-progress`   | Slide progress bar. |
| root      | `slidy`            | Component's root node. |
| slide     | `slidy-slide`      | Slide item node. |
| slides    | `slidy-slides`     | Slides list node. |
| thumbnail | `slidy-thumbnail`  | Thumbnail item. |
| thumbnail | `slidy-thumbnails` | Thumbnails bar. |

The `classNames` object is available via [context](https://svelte.dev/docs#run-time-svelte-getcontext) using `classNames` key.

### Custom Properties API

For easier style customization `Slidy` provides a set of predefined custom properties to inherit:

List of available public custom properties:

| Property                       |  Default   |    Type     | Description                                          |
| :----------------------------- | :--------: | :---------: | :--------------------------------------------------- |
| `--slidy-arrow-bg`             |  #4e4e4ebf | `<color>`   | The arrow control background color.                  |
| `--slidy-arrow-bg-hover`       |  #4e4e4e54 | `<color>`   | The arrow control hover background color.            |
| `--slidy-arrow-icon-color`     |  currentColor | `<color>`   | The arrow control icon fill color.                |
| `--slidy-arrow-size`           |  24px      | `<length>`  | The arrow controls size.                             |
| `--slidy-autoplay-control-size`|  2.25em    | `<length>`  | The autoplay control size.                           |
| `--slidy-autoplay-indicator-accent` | lightpink | <color> | The autoplay control indicator ring color.           |
| `--slidy-counter-bg`           |  #4e4e4ebf | `<color>`   | The counter's background color.                      |
| `--slidy-focus-ring-color`     |  #c9c9c9e6 | `<color>`   | Focus ring color for all focusable elements.         |
| `--slidy-height`               |  100%      | `<length>`  | The height of the component's node.                  |
| `--slidy-nav-item-color`       |  white     | `<color>`   | The navigation elements color.                       |
| `--slidy-nav-item-radius`      |  50%       | `<length>`  | The navigation elements border radius.               |
| `--slidy-nav-item-size`        |  16px      | `<length>`  | The navigation elements size.                        |
| `--slidy-progress-thumb-color` |  #c44f61   | `<color>`   | The progress bar active track color.                 |
| `--slidy-progress-track-color` |  #96969680 | `<color>`   | The progress bar track color.                        |
| `--slidy-progress-track-size`  |  5px       | `<length>`  | The progress bar height.                             |
| `--slidy-slide-aspect-ratio`   |  unset     | `<int/int>` | Defines the slide aspect-ratio.                      |
| `--slidy-slide-bg-color`       |  darkgray  | `<color>`   | The placeholder background color for loading images. |
| `--slidy-slide-gap`            |  1rem      | `<length>`  | The gap between items in carousel.                   |
| `--slidy-slide-height`         |  100%      | `<length>`  | The carousel items height.                           |
| `--slidy-slide-object-fit`     |  cover     |     -       | The carousel items (images) resize behaviour.        |
| `--slidy-slide-radius`         |  1rem      | `<length>`  | The slide's border radius value.                     |
| `--slidy-slide-width`          |  auto      | `<length>`  | The carousel items width.                            |
| `--slidy-thumbnail-radius`     |  0.5rem    | `<length>`  | The thumbnail `border-radius` value.                 |
| `--slidy-thumbnail-size`       |  50px      | `<length>`  | The thumbnail panel size.                            |
| `--slidy-width`                |  100%      | `<length>`  | The width of the component's node.                   |

There are two options:

#### --style-props

Svelte supports passing down custom properties to component via [`--style-props`][svelte-custom-props]:

```svelte
<Slidy --slidy-slide-gap="1rem" />
```

Bear in mind that this way Svelte wraps the component in extra `<div />` with `display: contents`.

#### Inherited custom properties

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
<script>
	import { Slidy, classNames } from "@slidy/svelte";
</script>

<Slidy
	classNames={{
		root: `${classNames.root} .some-class`,
		...classNames
	}}
/>

<style>
	.some-class {
		--slidy-navigation-color: red;
		--slidy-nav-item-size: 1rem;
	}
</style>
```

## Slots

### `arrow`

Customizes the content of the default arrow controls.

### `arrows`

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

### `default`

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

### `nav-item`

Provides a slot for custom pagination buttons.
Slot receives optional `index` and `active` props for proper functionality.

Custom navigation item should be a `<button />` and have `data-index` attribute to function. Otherwise, control the component [externally](#external-controls).

```svelte
<Slidy let:active let:index>
	<button slot="nav-item" data-index={index} {active} {index} />
</Slidy>
```

### `overlay`

Slot to display content overlaid content. It covers the slides area and can be customized by overriding the `.slidy-overlay`. For example, it is used to display the counter.

```svelte
<Slidy>
	<svelte:fragment slot="overlay">
		<button> Share </button>
	</svelte:fragment>
</Slidy>
```

### `thumbnail`

_Work in progress_

## Events

The component forwards custom events:

| Name      | Description                      |             Event detail              |
| :-------- | :------------------------------- | :-----------------------------------: |
| `destroy` | Component is destroyed.          |                `node`                 |
| `index`   | The current slide index changes. | `{ index: number, position: number }` |
| `keys`    | The key pressed on focus.        |             `event.code`              |
| `mount`   | Component is mounted to the DOM. |         `{ childs, options }`         |
| `move`    | Navigation occurs.               | `{ index: number, position: number }` |
| `pause`   | Autoplay is paused.              |                  -                    |
| `play`    | Autoplay interval had passed.    |                  -                    |
| `resize`  | Component's dimentions changes.  |          `{ node, options }`          |
| `stop`    | Autoplay is stopped.             |                  -                    |
| `update`  | Component's props changes.       |               `options`               |

## i18n

To modify all texts used in the component use pass the dictionary as `i18n` prop. For the sake of accessibility, it is recommended translating defaults:

| Key       | Default                         |             Event detail              |
| :-------- | :------------------------------ | :-----------------------------------: |
| `carousel`| "carousel"                      | `aria-label` of a root element.       |
| `counter` | "%s of %s"                      | `aria-label` of each slide as {slide number} of {slide length} |
| `first`   | "Go to the first slide"         | `aria-label` of the first item at the navigation. |
| `last`    | "Go to the last slide"          | `aria-label` of the last item at the navigation. |
| `next`    | "Go to the next slide"          | `aria-label` of the arrow control. |
| `play`    | "Start autoplay"                | `aria-label` of the autoplay control. |
| `prev`    | "Return back to previous slide" | `aria-label` of the arrow control. |
| `slide`   | "Slide"                         | `aria-roledescription` of each slide item. |
| `slideN`  | "Go to the slide %s"            | `aria-label` of pagination of each slide item. |
| `stop`    | "Stop autoplay"                 | `aria-label` of the autoplay control. |

## Recipes

### External controls

It is possible to control the navigation of the `Slidy` instance from the parent component via binding.

There are two variables available to control the component externally: `index` and `position`. Declare the variables to hold the values and bind them to the instance for the carousel control.

```svelte
<script>
	import { Slidy } from "svelte-slidy";

	let index = 0;
	let position = 0;
</script>

<button on:click={() => (index += 1)}> Next slide </button>

<button on:click={() => (position += 50)}> Move </button>

<Slidy bind:index bind:position />
```

## Possible issues

- Slides should not have `absolute` positioning, otherwise the [core-package][] script won't get correct dimentions;
- Using the `background` option usually is not recommended. In case you need to use it, specify the slide sizes with custom properties: `width` and `height`, or just `aspect-ratio`.

## License

MIT &copy; [EricRovell](https://github.com/EricRovell)

[core-package]: https://github.com/Valexr/slidy/tree/master/packages/core
[demo]: https://valexr.github.io/Slidy
[npm]: https://www.npmjs.com/package/@slidy/svelte
[repl]: https://svelte.dev/repl/de699aa1f8c04874b0402352ac93df96
[svelte-custom-props]: https://svelte.dev/docs#template-syntax-component-directives---style-props
