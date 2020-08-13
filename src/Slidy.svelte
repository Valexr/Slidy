<script>
	import { onMount, afterUpdate, beforeUpdate, tick } from 'svelte'
	import { spring, tweened } from 'svelte/motion'
	import { cubicOut, cubicIn, expoInOut, sineInOut, quintOut, expoOut } from 'svelte/easing'
	import { fly, fade, scale, crossfade } from 'svelte/transition'
	import { pannable } from './actions/pannable.js'
	import { wheel } from './actions/wheel.js'
	import { resizeobserver } from './actions/resizeobserver.js'

	export let slidys = []
	export let wrap = {
		id: null,
		width: '100%',
		height: '50vh',
		padding: '0',
	}
	export let slide = {
		gap: 0,
		width: 'auto',
		height: '100%',
	}
	export let controls = {
		dots: true,
		dotsnum: true,
		dotsarrow: true,
		dotspure: false,
		arrows: true,
		keys: true,
		drag: true,
		wheel: true,
	}
	export let duration = 350
	export let slidyGO = {
		play: false,
		playduration: 350,
		prev: false,
		next: false,
	}
	$: slidyGO.play ? slidyPlay() : slidyStop()
	$: if (slidyGO.prev) {
		slidyPrev()
	} else if (slidyGO.next) {
		slidyNext()
	}

	let timerId
	function slidyPlay() {
		timerId = setInterval(() => slidyNext(), slidyGO.playduration)
	}
	function slidyStop() {
		clearInterval(timerId)
	}

	let arr = slidys
	let dots = arr
	let nodes = []
	$: element = {
		all: arr.length,
		active: arr[Math.floor(arr.length / 2)],
		first: arr[0],
		last: arr[arr.length - 1],
		// maxwidth: arr.map((a) => a.width).reduce((p, v) => (p > v ? p : v)),
		// minwidth: arr.map((a) => a.width).reduce((p, v) => (p < v ? p : v)),
		// fullwidth: arr.map((a) => a.width).reduce((p, v) => p + v),
		beforewidth: arr.map((a, i) => (i < 4 ? a.width : null)).reduce((p, v) => p + v),
		afterwidth: arr.map((a, i) => (i > 4 ? a.width : null)).reduce((p, v) => p + v),
	}
	$: diff = (element.beforewidth - element.afterwidth) / 2

	let slidyinit = false
	function slidyLoad() {
		arr = slidys.map((s, i) => {
			return {
				num: i + 1,
				...s,
				width: nodes[s.id].clientWidth,
				height: nodes[s.id].clientHeight,
			}
		})
		dots = arr
		slidyinit = true
	}

	// RESIZE-OBSERVER ---------------------------------
	function resizeWrap(e) {
		arr = slidys.map((s, i) => {
			return {
				num: i + 1,
				...s,
				width: nodes[s.id].clientWidth,
				height: nodes[s.id].clientHeight,
			}
		})
	}

	// CONTROLS & ANIMATION -----------------------------------------------
	const translate = tweened(0, {
		delay: 0,
		duration: duration,
		// easing: cubicOut,
	})
	const left = tweened(0, {
		delay: 0,
		duration: 0,
		// easing: cubicIn,
	})

	function prev() {
		arr = [arr[arr.length - 1], ...arr.slice(0, -1)]
	}
	function next() {
		arr = [...arr.slice(1), arr[0]]
	}

	let sly = 0
	function slidyPrev() {
		sly += lastN
		translate.set(sly, { duration: duration })
		left.set(-sly)
		prev()
	}
	function slidyNext() {
		itemsCount -= 1
		sly -= firstN
		translate.set(sly, { duration: duration })
		left.set(-sly)
		next()
	}

	// KEYS -------------------------------------------------------
	let key = ''
	let keyCode = 0
	function slidyKeys(e) {
		key = e.key
		keyCode = e.keyCode
		if (key === 'ArrowLeft') {
			slidyPrev()
		} else if (key === 'ArrowRight') {
			slidyNext()
		}
	}

	// SLIDY-DOT --------------------------------------------------
	function slidyDots(id) {
		let i = element.active.num
		itemsCount = 0
		if (id < i && i !== element.first.num) {
			i = element.active.num - 1
			while (i >= id) {
				slidyPrev()
				i--
			}
		} else if (id > i && i !== element.last.num) {
			i = element.active.num + 1
			while (i <= id) {
				slidyNext()
				i++
			}
		}
	}

	// SLIDY -------------------------------------------------------
	let trans = null,
		count = null,
		itemsCount = null
	$: firstN = element.first.width + slide.gap
	$: lastN = element.last.width + slide.gap

	function slidy() {
		itemsCount = Math.round(posX / trans)
		if (count === itemsCount) {
			return
		} else if (count < itemsCount) {
			trans = lastN
			sly += trans
			left.set(-sly)
			prev()
		} else if (count > itemsCount) {
			trans = firstN
			sly -= trans
			left.set(-sly)
			next()
		}
		count = itemsCount
	}
	// $: console.log(posX, trans, itemsCount, count)

	// WHEELLING -------------------------------------------------------
	let posX = null
	let isWheelling

	function slidyWheel(e) {
		posX += -e.detail.dx
		translate.set(posX, { duration: 0 })
		slidy()

		clearTimeout(isWheelling)
		isWheelling = setTimeout(() => {
			itemsCount = count = posX = sly = 0
			translate.set(0, { duration: duration / 2 })
			left.set(0, { duration: duration / 2 })
		}, duration / 2)
	}

	// DRAG -------------------------------------------------------
	let mD = false
	let htx
	let tracker
	let speedDrag = 0

	function dragStart(e) {
		mD = true
		itemsCount = count = posX = sly = 0
		left.set(0)
		translate.set(0, { duration: 0 })
	}
	function dragSlide(e) {
		if (mD) {
			posX += e.detail.dx
			translate.set(posX, { duration: 0 })
			e.target.style.setProperty('user-select', posX !== 0 ? 'none' : null)
			e.target.style.setProperty('-webkit-user-select', posX !== 0 ? 'none' : null)
			e.target.style.setProperty('pointer-events', posX !== 0 ? 'none' : null)
			slidy()
			tracker = setInterval(() => (htx = posX), duration)
			speedDrag = (htx - posX) / duration
		}
	}
	function dragStop(e) {
		mD = false
		if (speedDrag < -0.015) {
			clearInterval(tracker)
			slidyPrev()
			// speedDrag = itemsCount = count = posX = sly = 0
		} else if (speedDrag > 0.015) {
			clearInterval(tracker)
			slidyNext()
			// speedDrag = itemsCount = count = posX = sly = 0
		} else {
			clearInterval(tracker)
			translate.set(0, { duration: duration / 2 })
			left.set(0, { duration: duration / 2 })
			itemsCount = count = posX = sly = 0
		}
		e.target.style.setProperty('user-select', posX !== 0 ? 'inherit' : null)
		e.target.style.setProperty('-webkit-user-select', posX !== 0 ? 'inherit' : null)
		e.target.style.setProperty('pointer-events', posX !== 0 ? 'inherit' : null)
	}
</script>

<svelte:window on:load="{slidyLoad}" on:keydown="{controls.keys ? slidyKeys : ''}" />

<section
	class="svelte-slidy"
	use:resizeobserver
	on:resizeob="{resizeWrap}"
	id="{wrap.id}"
	use:wheel
	on:wheels="{controls.wheel ? slidyWheel : null}"
	style="--wrapwidth: {wrap.width}; --wrapheight: {wrap.height};"
>
	<ul
		class="svelte-slidy-ul"
		use:pannable
		on:panstart="{controls.drag ? dragStart : ''}"
		on:panmove="{controls.drag ? dragSlide : ''}"
		on:panend="{controls.drag ? dragStop : ''}"
		on:contextmenu="{() => (mD = false)}"
		style="--wrappadding: {wrap.padding}; --left: {$left}px; --transformx: {$translate - diff}px;"
	>
		{#if arr.length > 0}
			{#each arr as item, i (item.id)}
				<li
					bind:this="{nodes[item.id]}"
					class="svelte-slidy-li"
					class:active="{item.id === element.active.id}"
					class:first="{item.id === element.first.id}"
					class:last="{item.id === element.last.id}"
					class:drag="{controls.drag ? true : false}"
					style="--liwidth:{slide.width}; --ligap:{slide.gap / 2}px; --liheight: {slide.height};"
				>
					<slot name="slide" {item}>
						<img alt="{item.id}" src="{item.src}" style="--imgwidth: {slide.width === 'auto' ? 'auto' : '100%'}" onmousedown="if (event.preventDefault) event.preventDefault()" />
						<span>
							<strong>{item.num} {i}</strong>
							<sub>{item.width}x{item.height}</sub>
						</span>
					</slot>
				</li>
			{/each}
		{/if}
	</ul>
	{#if controls.arrows}
		<button class="svelte-slidy-arrow-left" on:click="{() => slidyPrev()}">&#8592;</button>
		<button class="svelte-slidy-arrow-right" on:click="{() => slidyNext()}">&#8594;</button>
	{/if}

	{#if controls.dots}
		<ul class="svelte-slidy-dots" class:pure="{controls.dotspure}">
			{#if controls.dotsarrow}
				<li>
					<button class="svelte-slidy-arrow-left" on:click="{() => slidyPrev()}">&#8592;</button>
				</li>
			{/if}
			{#each dots as dot (dot.id)}
				<li class:active="{dot.id === element.active.id}">
					<button on:click="{() => slidyDots(dot.num)}">{controls.dotsnum && !controls.dotspure ? dot.num : ''}</button>
				</li>
			{/each}
			{#if controls.dotsarrow}
				<li>
					<button class="svelte-slidy-arrow-right" on:click="{() => slidyNext()}">&#8594;</button>
				</li>
			{/if}
		</ul>
	{/if}
</section>

<style>
	.svelte-slidy {
		display: flex;
		flex-flow: column;
		flex-shrink: 0;
		align-items: center;
		position: relative;
		overflow-x: hidden;
		justify-content: center;
		box-sizing: border-box;
		width: var(--wrapwidth);
		height: var(--wrapheight);
		margin: 0 auto;
	}
	.svelte-slidy-ul {
		box-sizing: border-box;
		display: flex;
		flex-wrap: nowrap;
		margin: 0 auto;
		padding: var(--wrappadding);
		list-style: none;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		user-select: none;
		touch-action: pan-y;
		will-change: transform;
		position: relative;
		left: var(--left);
		transform: translate3d(var(--transformx), 0, 0);
		-webkit-transform: translate3d(var(--transformx), 0, 0);
	}
	.svelte-slidy-li {
		flex: none;
		max-width: 100%;
		width: var(--liwidth);
		height: var(--liheight);
		max-height: var(--ulheight);
		margin: 0 var(--ligap);
		box-sizing: border-box;
		position: relative;
		justify-content: center;
		/* touch-action: none; */
	}
	.svelte-slidy-li.active {
		color: red;
	}
	.svelte-slidy-li.active span {
		color: red;
	}
	.svelte-slidy-li.drag {
		cursor: grab;
	}
	.svelte-slidy-li span {
		color: white;
		position: absolute;
		top: 0;
		left: 0;
		padding: 1em;
		background: rgba(0, 0, 0, 0.18);
		text-align: left;
		box-sizing: border-box;
	}
	.svelte-slidy-li img {
		width: var(--imgwidth);
		height: 100%;
		max-height: var(--wraph);
		box-sizing: border-box;
		vertical-align: middle;
		object-fit: cover;
	}

	.svelte-slidy-dots {
		display: flex;
		flex-wrap: nowrap;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
		position: absolute;
		bottom: 0;
		height: 50px;
	}
	.svelte-slidy-dots li {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.svelte-slidy-dots li.active button {
		color: red;
		outline: 0;
	}
	.svelte-slidy-dots.pure {
		position: relative;
	}
	.svelte-slidy-dots.pure li {
		width: 25px;
		height: 25px;
	}
	.svelte-slidy-dots.pure li button {
		border-radius: 50%;
		color: red;
		width: 10px;
		height: 10px;
		line-height: 10px;
		transition: color 250ms ease, width 250ms ease, height 250ms ease;
		outline: none;
		box-shadow: none;
	}
	.svelte-slidy-dots.pure li button.svelte-slidy-arrow-left,
	.svelte-slidy-dots.pure li button.svelte-slidy-arrow-right {
		background: none;
		width: 15px;
	}
	.svelte-slidy-dots.pure li.active button {
		width: 15px;
		height: 15px;
		background: red;
	}
	.svelte-slidy button {
		margin: 0;
		border: 0;
		padding: 0;
		border-radius: 0;
		width: 50px;
		height: 50px;
		line-height: 50px;
		color: white;
		background: rgba(0, 0, 0, 0.18);
		cursor: pointer;
		outline: 0;
		overflow: hidden;
	}
	.svelte-slidy button:active {
		background: red;
		color: white;
		outline: 0;
	}
	.svelte-slidy .svelte-slidy-arrow-right,
	.svelte-slidy .svelte-slidy-arrow-left {
		position: absolute;
		color: white;
		cursor: pointer;
	}
	.svelte-slidy .svelte-slidy-arrow-left {
		left: 0;
	}
	.svelte-slidy .svelte-slidy-arrow-right {
		right: 0;
	}
	.svelte-slidy-dots li button.svelte-slidy-arrow-left,
	.svelte-slidy-dots li button.svelte-slidy-arrow-right {
		position: relative;
	}
</style>
