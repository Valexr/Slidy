<div align="center">
    <a href="https://www.npmjs.com/package/@slidy/solid">
        <img alt="npm package version" src="https://img.shields.io/npm/v/@slidy/solid?style=flat-square" />
    </a>
    <a href="https://www.npmjs.com/package/@slidy/solid">
        <img alt="types included" src="https://img.shields.io/npm/types/@slidy/solid?style=flat-square" />
    </a>
    <a href="https://www.npmjs.com/package/@slidy/solid">
        <img alt="downloads count" src="https://img.shields.io/npm/dm/@slidy/solid?style=flat-square" />
    </a>
    <a href="https://www.npmjs.com/package/@slidy/solid">
        <img alt="licence" src="https://img.shields.io/npm/l/@slidy/solid?style=flat-square" />
    </a>
    <a href="https://img.shields.io/bundlephobia/minzip/@slidy/solid?style=flat-square">
        <img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/@slidy/solid/" />
    </a>
    <a href="https://bundlephobia.com/package/@slidy/solid">
        <img alt="dependency count" src="https://badgen.net/bundlephobia/dependency-count/@slidy/solid/" />
    </a>
</div>

# @slidy/solid

Simple, configurable & reusable carousel component built with SolidJS based on [@slidy/core](https://github.com/Valexr/slidy/tree/master/packages/core).

Try the [demo](https://playground.solidjs.com/?hash=-1777461998&version=1.4.1).

## Getting started

The package is available via [npm](https://www.npmjs.com/package/@slidy/solid):

```
npm i @slidy/solid
```

## Usage

The most simple way to get started is to use named import of `<Slidy />` component:

```jsx
import { Slidy } from '@slidy/solid';

const slides = [
    {
        id: 1,
        width: 800,
        height: 1200,
        src: 'static/img/some-image.webp',
    },
];

export default () => {
    return <Slidy slides={slides} />;
};
```

All props are optional. The only property to get started is `slides` - an array of objects with image related data.

## Core Component

`Core` is a wrapper component for [@slidy/core](https://github.com/Valexr/slidy/tree/master/packages/core) available via named import. It is best to use to build up the custom component for specific needs or when just the basic functionality is needed.

```tsx
import { Core } from '@slidy/solid';

export default () => {
    return <Core />;
};
```

### Core Component API

| Property    |   Default   |                                Type                                 | Description                                                           |
| :---------- | :---------: | :-----------------------------------------------------------------: | :-------------------------------------------------------------------- |
| `animation` | `undefined` |                          `AnimationFunc `                           | Custom slide animation.                                               |
| `axis`      |    `"x"`    |                           `"x"` or `"y"`                            | The scroll direction.                                                 |
| `clamp`     |     `0`     |                              `number`                               | Clamps sliding index as `{clamp} - {index} + {clamp}`                 |
| `className` |    `""`     |                              `string`                               | Passes the `class` to the node.                                       |
| `duration`  |    `450`    |                              `number`                               | Slide transitions duration value.                                     |
| `easing`    | `undefined` |                       `(t: number => number)`                       | Inertion scroll easing behaviour.                                     |
| `gravity`   |    `1.2`    |                              `number`                               | Scroll inertia value.                                                 |
| `indent`    |     `0`     |                              `number`                               | Custom scroll indent value, calculates as `gap * indent`.             |
| `index`     |     `0`     |                              `number`                               | The index of the initial slide.                                       |
| `loop`      |   `false`   |                              `boolean`                              | Makes the slideshow continious.                                       |
| `position`  |     `0`     |                              `number`                               | The current position value of the carousel.                           |
| `sensity`   |     `5`     |                              `number`                               | Defines the sliding sensity as the number of pixels required to drag. |
| `snap`      | `undefined` |           `"start"` or `"center"` or `"end"` or `"deck"`            | Enforces the scroll stop positions.                                   |
| `tag`       |    `ol`     |                              `string`                               | The HTML tag name to render.                                          |
| `onResize`  | `undefined` |   `(event: CustomEvent<{ ROE: ResizeObserverEntry[] }>) => void`    | Listen to the core event `resize` to fire.                            |
| `onMount`   | `undefined` |               `(event: CustomEvent<Options>) => void`               | Listen to the core event `mount` to fire.                             |
| `onMove`    | `undefined` | `(event: CustomEvent<{ index: number; position: number }>) => void` | Listen to the core event `move` to fire.                              |
| `onIndex`   | `undefined` |          `(event: CustomEvent<{ index: number }>) => void`          | Listen to the core event `index` to fire.                             |
| `onKeys`    | `undefined` |               `(event: CustomEvent<string>) => void`                | Listen to the core event `keys` to fire.                              |
| `onUpdate`  | `undefined` |               `(event: CustomEvent<Options>) => void`               | Listen to the core event `update` to fire.                            |
| `onDestroy` | `undefined` |             `(event: CustomEvent<HTMLElement>) => void`             | Listen to the core event `destroy` to fire.                           |

For TypeScript users there is the `SlidyCoreOptions` interface available via named import.

## Slidy Component

`<Slidy />` component uses `<Core />` internally and provides more features expected from carousel.

### Slidy Component API

The `<Slidy />` component interface extends the `<Core />`. There are a list of additional options available:

| Property      |      Default       |                                Type                                 | Description                                                              |
| :------------ | :----------------: | :-----------------------------------------------------------------: | :----------------------------------------------------------------------- |
| `arrows`      |       `true`       |                   `boolean` or `() => JSXElement`                   | Renders the arrow button controls for accessible slide navigation.       |
| `arrow`       |    `undefined`     |                         `() => JSXElement`                          | Renders the arrow.                                                       |
| `children`    |    `undefined`     |                    `(item: Slide) => JSXElement`                    | Renders each slide.                                                      |
| `overlay`     |    `undefined`     |                         `() => JSXElement`                          | Renders the overlay.                                                     |
| `background`  |      `false`       |                              `boolean`                              | Sets `background-image` instead of `<img />` elements to display slides. |
| `classNames`  |   `SlidyStyles`    |                        `SlidyStylesDefault`                         | The class names object used over the component.                          |
| `getImgSrc`   | `item => item.src` |                             `function`                              | The slide's `src` attribute getter.                                      |
| `getThumbSrc` | `item => item.src` |                             `function`                              | The thumbnail's `src` attribute getter.                                  |
| `navigation`  |      `false`       |                              `boolean`                              | Renders the navigation controls for pagination-like slide navigation.    |
| `progress`    |      `false`       |                              `boolean`                              | Renders the progress bar.                                                |
| `slides`      |        `[]`        |                             `Slides[]`                              | An array of objects with image metadata.                                 |
| `thumbnail`   |      `false`       |                   `boolean` or `() => JSXElement`                   | Renders the thumbnail navigation panel.                                  |
| `onResize`    |    `undefined`     |   `(event: CustomEvent<{ ROE: ResizeObserverEntry[] }>) => void`    | Listen to the core event `resize` to fire.                               |
| `onMount`     |    `undefined`     |               `(event: CustomEvent<Options>) => void`               | Listen to the core event `mount` to fire.                                |
| `onMove`      |    `undefined`     | `(event: CustomEvent<{ index: number; position: number }>) => void` | Listen to the core event `move` to fire.                                 |
| `onIndex`     |    `undefined`     |          `(event: CustomEvent<{ index: number }>) => void`          | Listen to the core event `index` to fire.                                |
| `onKeys`      |    `undefined`     |               `(event: CustomEvent<string>) => void`                | Listen to the core event `keys` to fire.                                 |
| `onUpdate`    |    `undefined`     |               `(event: CustomEvent<Options>) => void`               | Listen to the core event `update` to fire.                               |
| `onDestroy`   |    `undefined`     |             `(event: CustomEvent<HTMLElement>) => void`             | Listen to the core event `destroy` to fire.                              |

By default component works with images. Image object should contain `width` and `height` attributes to prevent layout shifts and `alt` for accessibility.

## Styling

### Extending/Overriding classes

To extend default component styles use `classNames` property. Default classes are available via object, that can be extended or overridden:

```jsx
import { Slidy, classNames } from '@slidy/solid';

export default () => {
    return (
        <Slidy
            classNames={{
                root: `${classNames.root} custom-class`,
                ...classNames,
            }}
        />
    );
};
```

The `classNames` consist of `{ target: className }` pairs:

| Target    |   Default class    | Description             |
| :-------- | :----------------: | :---------------------- |
| arrow     |   `slidy-arrow`    | Arrow controls.         |
| counter   |  `slidy-counter`   | Slide progress counter. |
| img       |    `slidy-img`     | Slide image node.       |
| nav       |    `slidy-nav`     | Slide navigation panel. |
| nav-item  |  `slidy-nav-item`  | Navigtion panel item.   |
| overlay   |  `slidy-overlay`   | Slides overlay node.    |
| progress  |  `slidy-progress`  | Slide progress bar.     |
| root      |      `slidy`       | Component's root node.  |
| slide     |   `slidy-slide`    | Slide item node.        |
| slides    |   `slidy-slides`   | Slides list node.       |
| thumbnail | `slidy-thumbnail`  | Thumbnail item.         |
| thumbnail | `slidy-thumbnails` | Thumbnails bar.         |

### Custom Properties API

For easier style customization `Slidy` provides a set of predefined custom properties to inherit:

List of available public custom properties:

| Property                       |   Default    |    Type     | Description                                          |
| :----------------------------- | :----------: | :---------: | :--------------------------------------------------- |
| `--slidy-arrow-bg`             |  #4e4e4ebf   |  `<color>`  | The arrow control background color.                  |
| `--slidy-arrow-bg-hover`       |  #4e4e4e54   |  `<color>`  | The arrow control hover background color.            |
| `--slidy-arrow-icon-color`     | currentColor |  `<color>`  | The arrow control icon fill color.                   |
| `--slidy-arrow-size`           |     24px     | `<length>`  | The arrow controls size.                             |
| `--slidy-counter-bg`           |  #4e4e4ebf   |  `<color>`  | The counter's background color.                      |
| `--slidy-focus-ring-color`     |  #c9c9c9e6   |  `<color>`  | Focus ring color for all focusable elements.         |
| `--slidy-height`               |     100%     | `<length>`  | The height of the component's node.                  |
| `--slidy-nav-item-color`       |    white     |  `<color>`  | The navigation elements color.                       |
| `--slidy-nav-item-radius`      |     50%      | `<length>`  | The navigation elements border radius.               |
| `--slidy-nav-item-size`        |     16px     | `<length>`  | The navigation elements size.                        |
| `--slidy-progress-thumb-color` |   #c44f61    |  `<color>`  | The progress bar active track color.                 |
| `--slidy-progress-track-color` |  #96969680   |  `<color>`  | The progress bar track color.                        |
| `--slidy-progress-track-size`  |     5px      | `<length>`  | The progress bar height.                             |
| `--slidy-slide-aspect-ratio`   |    unset     | `<int/int>` | Defines the slide aspect-ratio.                      |
| `--slidy-slide-bg-color`       |   darkgray   |  `<color>`  | The placeholder background color for loading images. |
| `--slidy-slide-gap`            |     1rem     | `<length>`  | The gap between items in carousel.                   |
| `--slidy-slide-height`         |     100%     | `<length>`  | The carousel items height.                           |
| `--slidy-slide-object-fit`     |    cover     |      -      | The carousel items (images) resize behaviour.        |
| `--slidy-slide-radius`         |     1rem     | `<length>`  | The slide's border radius value.                     |
| `--slidy-slide-width`          |     auto     | `<length>`  | The carousel items width.                            |
| `--slidy-thumbnail-radius`     |    0.5rem    | `<length>`  | The thumbnail `border-radius` value.                 |
| `--slidy-thumbnail-size`       |     50px     | `<length>`  | The thumbnail panel size.                            |
| `--slidy-width`                |     100%     | `<length>`  | The width of the component's node.                   |

#### Inherited custom properties

All supported custom properties starts with `--slidy-`. For example, to recolor navigation controls, let the component inherit a `--slidy-nav-item-color` custom property from any parent:

```css
.parent {
    --slidy-navigation-color: red;
}
```

```jsx
export default () => {
    return (
        <div class="parent">
            <Slidy />
        </div>
    );
};
```

Or just pass a class with a set of custom properties:

```css
.some-class {
    --slidy-navigation-color: red;
    --slidy-nav-item-size: 1rem;
}
```

```jsx
import { Slidy, classNames } from '@slidy/solid';

export default () => {
    return (
        <Slidy
            classNames={{
                root: `${classNames.root} .some-class`,
                ...classNames,
            }}
        />
    );
};
```

## Recipes

### External controls

It is possible to control the navigation of the `Slidy` instance from the parent component via binding.

There are two variables available to control the component externally: `index` and `position`. Declare the variables to hold the values and bind them to the instance for the carousel control.

```jsx
import { Slidy } from '@slidy/solid';
import { createSignal } from 'solid-js';

export default () => {
    const [index, setIndex] = createSignal(0);
    const [position, setPosition] = createSignal(0);

    return (
        <>
            <Slidy
                index={index}
                setIndex={setIndex}
                position={position}
                setPosition={setPosition}
            />
            <button onClick={() => setIndex((prev) => prev + 1)}>Next slide</button>
            <button onClick={() => setPosition((prev) => prev + 50)}>Move</button>
        </>
    );
};
```

## Possible issues

-   Slides should not have `absolute` positioning, otherwise the core script won't get correct dimentions;
-   Using the `background` option usually is not recommended. In case you need to use it, specify the slide sizes with custom properties: `width` and `height`, or just `aspect-ratio`.

## License

Slidy is distributed under the MIT license
