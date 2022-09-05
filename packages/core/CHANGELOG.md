# Changelog


## 3.6.0 - `on:mutate` event, auto reinit & other improvments
- [fix `snap` behaviour]()
- [add `scrollable` option](https://github.com/Valexr/Slidy/commit/fb6feabddfcaef98e5474ded4642770a71d46ba4)
- [add reactive `position`](https://github.com/Valexr/Slidy/commit/ede73065fdd13bffc3281a5905735b30c810784f)
- [fix `axis: 'y'` behaviour](https://github.com/Valexr/Slidy/commit/e042f8feb152c57dba024c5a11c50c6df267f9eb)
- [add `on:mutate` event & auto reinit](https://github.com/Valexr/Slidy/commit/ec03d72ca6303de89019adc7f37761605ccffd80)
- [add `-webkit-user-select:none` css rule](https://github.com/Valexr/Slidy/commit/ad84096c7ecf8cf88d1a678d7b2d94c1550817f9)


## 3.5.3 - reach `window.Slidy` object in IIFE bundle
- decrease bundle size
- `window.Slidy` object contain `@slidy/core`, `@slidy/animation`,  `@slidy/easing` & `@slidy/media` functions
```js
window.Slidy = {
    animation, // animation functions
    core, // core function
    easing, // easing functions
    media // global media store
}
```


## 3.5.2 - improvments
- remove `browser` field for modern bundlers & CDN compatibility
- remove `duration` from  `to(index)` method


## 3.5.1 - fix issues & updates
-   [remove duration from to() function](https://github.com/Valexr/Slidy/commit/f4b0226305755a6e2736ba184022924684294f3a)


## 3.5.0 - first release