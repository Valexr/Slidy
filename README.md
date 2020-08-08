# SLIDY – simple configurable carousel component on SvelteJS.

[![NPM version](https://img.shields.io/npm/v/svelte-slidy.svg?style=flat)](https://www.npmjs.com/package/svelte-slidy) [![NPM downloads](https://img.shields.io/npm/dm/svelte-slidy.svg?style=flat)](https://www.npmjs.com/package/svelte-slidy)

## Install

```bash
yarn add -D slidy
```

## Usage

### By default setiings looks like.

```html
<script>
    import Slidy from 'svelte-slidy' // import component

    const local = [
        { id: 1, src: 'img/img.webp' },
        ...
    ]; // slides items

    $: slidy_default = { // any name you like
		slidys: local,
		wrap: {
			id: 'slidy_default',
			width: '100%',
			height: '50vh',
			padding: '0',
		},
		slide: {
			gap: 0,
			width: 'auto',
			height: '100%',
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
		duration: 250,
	} // slidy settings for current instance
</script>

<Slidy {...slidy_default} />
```

``` diff
- !!! IMPORTANT – you need declared all the settings objects for each instance of Slidy. 
```

<!-- ```diff
- text in red
+ text in green
! text in orange
# text in gray
@@ text in purple (and bold)@@
``` -->

## Customize

### Custome slide skin

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
    ];

    $: slidy_cards = {
		slidys: local,
		... //all setting for this instance
	}
</script>

<Slidy {...slidy_cards}>
	<div slot="slide" let:item class="slide"> <!--!!! slot="slide" let:item -->
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

``` diff
- !!! IMPORTANT – slot="slide" & let:item derectives for each yous items in new skin ;). 
```


### Custome default Slidy styles

```html
<script>
    import Slidy from 'svelte-slidy' // import component

    const local = [
        { id: 1, src: 'img/img.webp' },
        ...
    ]; // slides items

    $: slidy_default = { // any name you like
		slidys: local,
		wrap: {
			id: 'slidy_default', // custom #id for this instance Slidy
			width: '100%',
			height: '50vh',
			padding: '0',
		},
		slide: {
			gap: 0,
			width: 'auto',
			height: '100%',
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
		duration: 250,
	} // slidy settings for current instance
</script>

<Slidy {...slidy_default} />

<style>
	:global(#slidy_default) {
		... yours new styles for default
	}
</style>
```

### Slidy nodes tree

```html
<section id="yours custom #id" class="slidy">
	<ul class="svelte-slidy-ul">
		<li class="svelte-slidy-li">
			<slot name="slide" {item}> // for yours custom slide skin
		</li>
	</ul>
	<button class="svelte-slidy-arrow-left"></button>
	<button class="svelte-slidy-arrow-right"></button>
	<ul class="svelte-slidy-dots">
		<li><button class="svelte-slidy-arrow-left"></button></li>
		<li>
			<button></button> // first & last arrows not in each (optional)
		</li>
		<li><button class="svelte-slidy-arrow-right"></button></li>
	</ul>
</section>
```
<!-- ```diff
+ Slidy nodes tree
``` -->

## License

MIT &copy; [Valexr](https://github.com/Valexr)