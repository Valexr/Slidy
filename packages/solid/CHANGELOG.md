# Changelog

## 1.5.0

-   Removed `position` and `setPosition` public properties.

<details>
<summary style="cursor: pointer;">Workarounds and causes</summary>
Now, to get the position, the `onMove` event should be listened, as in the code example below:

```jsx
export default () => {
    const [position, setPosition] = createSignal(0);

    return <Slidy onMove={(e) => setPosition(e.detail.position)} />;
};
```

In previous version the `position` property has no effect, and `setPosition` was used to get the actual position. In such conditions, it is generally not necessary, especially since it slows down the code by calling the signal setting to the current value.

</details>

## 1.4.0

-   Removed autoplay functionality with `autoplay`, `setAutoplay`, `autoplayControl`, and `interval` props. Now for autoplay functionality should be used autoplay plugin, which can be found in [plugins](https://github.com/Valexr/Slidy/tree/master/packages/plugins)

## 1.3.1

-   Fixed SSR

## 1.3.0

-   Added [@slidy/plugins](https://github.com/Valexr/Slidy/tree/master/packages/plugins) support
-   Implement `groups` prop to control the number of items displayed per viewport

## 1.2.0

-   Added `i18n` support. The `i18n` dictionary can be passed as prop to localize aria attributes and control titles.

## 1.1.0

-   Added autoplay functionality with `autoplay`, `setAutoplay`, `autoplayControl`, and `interval` props.

## 1.0.1 - 1.0.4

-   Various bug fixes

## 1.0.0

-   Initial Release. 🎉
