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
	export let duration = 250

	let arr = slidys
	let dots = arr
	let nodes = []
	$: element = {
		all: arr.length,
		active: arr[Math.floor(arr.length / 2)],
		first: arr[0],
		last: arr[arr.length - 1],
	}

	let domLoaded
	function windowR() {}
	function firstLoad() {
		arr = slidys.map((s, i) => {
			return {
				num: i + 1,
				...s,
				width: nodes[s.id].clientWidth,
				height: nodes[s.id].clientHeight,
			}
		})
		// dots = arr
	}

	// RESIZE-OBSERVER ---------------------------------
	let wrapCR, wrapWpx, wrapHpx
	function resizeWrap(e) {
		wrapCR = e.detail.cR
		wrapWpx = e.detail.cR.width
		wrapHpx = e.detail.cR.height
	}

	function resizeLi(e) {}

	function resizeUl(e) {
		arr = slidys.map((s, i) => {
			return {
				num: i + 1,
				...s,
				width: nodes[s.id].clientWidth,
				height: nodes[s.id].clientHeight,
			}
		})
		dots = arr
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
	const [send, receive] = crossfade({
		duration: duration,
		easing: cubicOut,
		fallback: scale,
	})

	function prev() {
		arr = [arr[arr.length - 1], ...arr.slice(0, -1)]
	}
	function next() {
		arr = [...arr.slice(1), arr[0]]
	}

	let itemsCount = 0
	let sly = 0
	function previous() {
		itemsCount += 1
		sly += element.last.width
		translate.set(sly, { duration: duration })
		left.set(-sly, { duration: 0 })
		prev()
	}
	function nextious() {
		itemsCount -= 1
		sly -= element.first.width
		translate.set(sly, { duration: duration })
		left.set(-sly)
		next()
	}

	// KEYS -------------------------------------------------------
	let key = ''
	let keyCode = 0
	function handleKeydown(e) {
		key = e.key
		keyCode = e.keyCode
		if (key === 'ArrowLeft') {
			previous()
		} else if (key === 'ArrowRight') {
			nextious()
		}
	}

	// SLIDY-DOT --------------------------------------------------
	function slidyDot(id) {
		let i = element.active.num
		itemsCount = 0
		if (id > i && i !== element.last.num) {
			i = element.active.num + 1
			while (i <= id) {
				nextious()
				i++
			}
		} else if (id < i && i !== element.first.num) {
			i = element.active.num - 1
			while (i >= id) {
				previous()
				i--
			}
		}
	}

	// SLIDY -------------------------------------------------------
	let count = 0
	let firstN = 0
	let lastN = 0
	let trans = 0
	function slidy() {
		if (count === itemsCount) {
			return
		} else if (count < itemsCount) {
			lastN = element.last.width
			sly += lastN
			left.set(-sly)
			trans = lastN
			prev()
		} else if (count > itemsCount) {
			firstN = element.first.width
			sly -= firstN
			left.set(-sly)
			trans = firstN
			next()
		}
		count = itemsCount
	}

	// WHEELLING -------------------------------------------------------
	let posX = 0
	let isWheelling
	function wheeling(e) {
		posX += e.detail.dx
		itemsCount = Math.round(-posX / trans)
		translate.set(-posX, { duration: 0 })
		slidy()

		window.clearTimeout(isWheelling)
		isWheelling = setTimeout(function () {
			count = 0
			itemsCount = 0
			posX = 0
			firstN = 0
			lastN = 0
			sly = 0
			trans = 0
			translate.set(0, { duration: duration / 2, easing: cubicOut }), left.set(0, { duration: duration / 2, easing: cubicOut })
		}, duration / 2)
	}

	// DRAG -------------------------------------------------------
	const coords = spring({ x: 0, y: 0 }, { stiffness: 0.2, damping: 0.4 })
	let mD = false
	let posXDiffrence = 0
	let htx
	let tracker
	let speedDrag = 0

	function dragStart(e) {
		mD = true
		count = 0
		itemsCount = 0
		sly = 0
		firstN = 0
		lastN = 0
		left.set(0)
		coords.set({ x: 0, y: 0 })
		translate.set(0, { duration: 0 })
		coords.stiffness = coords.damping = 1
		e.target.style.setProperty('transition', 'none')
	}
	function dragSlide(e) {
		if (mD) {
			coords.update(($coords) => ({
				x: $coords.x + e.detail.dx,
				y: $coords.y + e.detail.dy,
			}))
			posXDiffrence = $coords.x
			itemsCount = Math.round(posXDiffrence / trans)
			translate.set(posXDiffrence, { duration: 0 })

			e.target.style.setProperty('user-select', $coords.x !== 0 ? 'none' : null)
			e.target.style.setProperty('pointer-events', $coords.x !== 0 ? 'none' : null)
			slidy()
			let time = duration
			tracker = setInterval(function () {
				htx = posXDiffrence
			}, time)
			speedDrag = (htx - posXDiffrence) / time
		}
	}
	function dragStop(e) {
		// coords.stiffness = 0.2
		// coords.damping = 0.4
		// coords.set({ x: 0, y: 0 })
		mD = false
		// posXDiffrence = 0
		// count = 0
		// itemsCount = 0
		// sly = 0
		// clearInterval(tracker)
		if (speedDrag < -0.025) {
			previous(), (speedDrag = 0), clearInterval(tracker)
		} else if (speedDrag > 0.025) {
			nextious(), (speedDrag = 0), clearInterval(tracker)
		} else {
			translate.set(0, { duration: duration / 2 }), left.set(0, { duration: duration / 2 }), clearInterval(tracker)
		}
		e.target.style.setProperty('user-select', $coords.x !== 0 ? 'inherit' : null)
		e.target.style.setProperty('pointer-events', $coords.x !== 0 ? 'inherit' : null)
	}
</script>

<svelte:window on:load="{firstLoad}" on:resize="{windowR}" on:keydown="{controls.keys ? handleKeydown : ''}" />
<svelte:body on:touchstart|preventDefault />

<section id="{wrap.id}" class="svelte-slidy" use:wheel on:wheels="{controls.wheel ? wheeling : ''}" style="--wrapwidth: {wrap.width}; --wrapheight: {wrap.height};">
	<ul
		class="svelte-slidy-ul"
		use:resizeobserver
		on:resizeob="{resizeUl}"
		use:pannable
		on:panstart="{controls.drag ? dragStart : ''}"
		on:panmove="{controls.drag ? dragSlide : ''}"
		on:panend="{controls.drag ? dragStop : ''}"
		on:contextmenu="{() => (mD = false)}"
		style="--ulwidth: {wrap.width}; --ulheight: {wrap.height}; --wrappadding: {wrap.padding}; --left: {$left}px; --transformx: {$translate}px;"
	>
		{#each arr as item (item.id)}
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
						<strong>{item.num}</strong>
						<sub>{item.width - slide.gap}x{item.height}</sub>
					</span>
				</slot>
			</li>
		{/each}
	</ul>
	{#if controls.arrows}
		<button class="svelte-slidy-arrow-left" on:click="{() => previous()}">&#8592;</button>
		<button class="svelte-slidy-arrow-right" on:click="{() => nextious()}">&#8594;</button>
	{/if}

	{#if controls.dots}
		<ul class="svelte-slidy-dots" class:pure="{controls.dotspure}">
			{#if controls.dotsarrow}
				<li>
					<button class="svelte-slidy-arrow-left" on:click="{() => previous()}">&#8592;</button>
				</li>
			{/if}
			{#each dots as dot (dot.id)}
				<li class:active="{dot.id === element.active.id}">
					<button on:click="{() => slidyDot(dot.num)}">{controls.dotsnum && !controls.dotspure ? dot.num : ''}</button>
				</li>
			{/each}
			{#if controls.dotsarrow}
				<li>
					<button class="svelte-slidy-arrow-right" on:click="{() => nextious()}">&#8594;</button>
				</li>
			{/if}
		</ul>
	{/if}
</section>

<style>
	.svelte-slidy {
		display: flex;
		align-items: center;
		width: 100%;
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
		height: var(--ulheight);
		user-select: none;
		touch-action: pan-y;
		will-change: transform;
		position: relative;
		left: var(--left);
		width: var(--ulwidth);
		transform: translate3d(var(--transformx), 0, 0);
		-webkit-transform: translate3d(var(--transformx), 0, 0);
	}
	.svelte-slidy-li {
		flex: none;
		width: var(--liwidth);
		height: var(--liheight);
		max-height: var(--ulheight);
		padding: 0 var(--ligap);
		box-sizing: content-box;
		position: relative;
		justify-content: center;
		touch-action: none;
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
		background: rgba(0, 0, 0, 0.45);
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
	}
	.svelte-slidy-dots.pure li {
		width: 25px;
	}
	.svelte-slidy-dots.pure li button {
		border-radius: 50%;
		color: red;
		width: 10px;
		height: 10px;
		line-height: 10px;
		transition: all 250ms ease;
	}
	.svelte-slidy-dots li button.svelte-slidy-arrow-left,
	.svelte-slidy-dots li button.svelte-slidy-arrow-right {
		position: relative;
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
		background: rgba(0, 0, 0, 0.45);
		cursor: pointer;
	}
	.svelte-slidy button:active {
		background: red;
		color: white;
	}
	.svelte-slidy-arrow-right,
	.svelte-slidy-arrow-left {
		position: absolute;
		color: white;
		cursor: pointer;
	}
	.svelte-slidy-arrow-left {
		left: 0;
	}
	.svelte-slidy-arrow-right {
		right: 0;
	}
</style>
