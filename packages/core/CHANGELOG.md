# Changelog

## 3.7.2 - cleanup

## 3.7.1 - fix duplicated options

- [fix duplicated options](https://github.com/Valexr/Slidy/commit/0e33d46fe6fec592b702fc9991e7ba285ce34cd6)

## 3.7.0 - add `options.plugins`, fix issues & updates

-   [add plugins to iife](https://github.com/Valexr/Slidy/commit/f8b0442273392f5ba4e48cfcb83431e1ebc4ab6a)
-   [fix default options](https://github.com/Valexr/Slidy/commit/9b2fb4c3e7e48b76feee42340b23caf6717261b8)
-   [options.plugins: []](https://github.com/Valexr/Slidy/commit/59be47539bd27622079dbd571ee9daa50b995073)
-   [fix unsnapped loop mode](https://github.com/Valexr/Slidy/commit/49a730394f0d8040e9bb19d792b23c0553555a1d)
-   [guard loop in mutate](https://github.com/Valexr/Slidy/commit/50b2a6ecb79d5724db3c6b1b357bad86c997dfc6)
-   [fix snap === 'deck'](https://github.com/Valexr/Slidy/commit/02a0d4868db5f99461147309f09043c34bb3ff58)
-   [ix types](https://github.com/Valexr/Slidy/commit/0656cc5153da1e21a570a5d5522cba80314e0499)

## 3.6.0 - `on:mutate` event, auto reinit, improvments & fixes

-   [fix `dom()` init](https://github.com/Valexr/Slidy/commit/f5a0d0bf9b2fe6ea4735009ad145657ea9ba818c)
-   [fix `snap` behaviour](https://github.com/Valexr/Slidy/commit/110d6cda970e0c0fbffc25f948cf26f6c8d2cbc5)
-   [add `scrollable` option](https://github.com/Valexr/Slidy/commit/fb6feabddfcaef98e5474ded4642770a71d46ba4)
-   [add reactive `position`](https://github.com/Valexr/Slidy/commit/ede73065fdd13bffc3281a5905735b30c810784f)
-   [fix `axis: 'y'` behaviour](https://github.com/Valexr/Slidy/commit/e042f8feb152c57dba024c5a11c50c6df267f9eb)
-   [add `on:mutate` event & auto reinit](https://github.com/Valexr/Slidy/commit/ec03d72ca6303de89019adc7f37761605ccffd80)
-   [add `-webkit-user-select:none` css rule](https://github.com/Valexr/Slidy/commit/ad84096c7ecf8cf88d1a678d7b2d94c1550817f9)

## 3.5.3 - reach `window.Slidy` object in IIFE bundle

-   decrease bundle size
-   `window.Slidy` object contain `@slidy/core`, `@slidy/animation`, `@slidy/easing` & `@slidy/media` functions

```js
window.Slidy = {
    animation, // animation functions
    core, // core function
    easing, // easing functions
    media, // global media store
};
```

## 3.5.2 - improvments

-   remove `browser` field for modern bundlers & CDN compatibility
-   remove `duration` from `to(index)` method

## 3.5.1 - fix issues & updates

-   [remove duration from to() function](https://github.com/Valexr/Slidy/commit/f4b0226305755a6e2736ba184022924684294f3a)

## 3.5.0 - first release
