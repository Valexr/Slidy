<script>
	import { tick } from "svelte";
	import * as action from "./actions.js";

	export let slides = [],
		keyExtractor=(item,i)=>item.id||i,
		wrap = {
			id: null,
			width: "100%",
			height: "50%",
			padding: "0",
			align: "middle",
			alignmargin: 0,
		},
		slide = {
			gap: 0,
			class: "",
			width: "50%",
			height: "100%",
			backimg: false,
			imgsrckey: "src",
			objectfit: "cover",
			overflow: "hidden",
		},
		controls = {
			dots: true,
			dotsnum: true,
			dotsarrow: true,
			dotspure: false,
			arrows: true,
			keys: true,
			drag: true,
			wheel: true,
		},
		options = {
			axis: "x",
			loop: true,
			duration: 450,
		},
		index = 0,
		slidyinit = false,
		timeout = 0;

	// LOADSTATE-CHECK -------------------------------------------------
	$: render && slidyInit(slides);

	async function slidyInit() {
		if (slides) {
			slides = dots = slides.map((s, i) => {
				return { ix: i, ...s };
			});
			timeout ? setTimeout(() => (slidyinit = true), timeout) : tick().then(() => (slidyinit = true));
		}
	}

	// SIZES ---------------------------------------------------
	let nodes = [],
		dots = [],
		el = {
			active: { node: 0, width: 0, height: 0 },
			first: { node: 0, width: 0, height: 0 },
			last: { node: 0, width: 0, height: 0 },
			before: { width: 0, height: 0 },
			after: { width: 0, height: 0 },
		},
		aix = 0;
	$: nodes = nodes.filter(Boolean);
	$: render = nodes.length !== 0 && slides.length !== 0 && nodes.length === slides.length;

	$: render && slidySizes(pos, index);

	function slidySizes() {
		if (render) {
			aix = options.loop ? Math.floor(slides.length / 2) : index;
			el = {
				active: {
					node: slides[aix],
					width: nodes[aix].offsetWidth + slide.gap,
					height: nodes[aix].offsetHeight + slide.gap,
				},
				first: {
					node: slides[0],
					width: nodes[0].offsetWidth + slide.gap,
					height: nodes[0].offsetHeight + slide.gap,
				},
				last: {
					node: slides[slides.length - 1],
					width: nodes[slides.length - 1].offsetWidth + slide.gap,
					height: nodes[slides.length - 1].offsetHeight + slide.gap,
				},
				before: {
					width: nodes.map((a, i) => (i < index ? a.offsetWidth + slide.gap : null)).reduce((p, v) => p + v),
					height: nodes.map((a, i) => (i < index ? a.offsetHeight + slide.gap : null)).reduce((p, v) => p + v),
				},
				after: {
					width: nodes.map((a, i) => (i > index ? a.offsetWidth + slide.gap : null)).reduce((p, v) => p + v),
					height: nodes.map((a, i) => (i > index ? a.offsetHeight + slide.gap : null)).reduce((p, v) => p + v),
				},
				// full: {
				//     width: nodes.reduce((p, v) => p + v.offsetWidth + slide.gap, 0),
				//     height: nodes.reduce((p, v) => p + v.offsetHeight + slide.gap, 0),
				// },
			};
		}
	}

	let size = { first: 0, last: 0, active: 0, before: 0, after: 0, wrap: 0 },
		diff = { align: 0, pos: 0 };

	$: render && slidyMatch(el);

	function slidyMatch() {
		if (render) {
			size = {
				first: options.axis === "y" ? el.first.height : el.first.width,
				last: options.axis === "y" ? el.last.height : el.last.width,
				active: options.axis === "y" ? el.active.height : el.active.width,
				before: options.axis === "y" ? el.before.height : el.before.width,
				after: options.axis === "y" ? el.after.height : el.after.width,
				wrap: options.axis === "y" ? wh : ww,
				// full: options.axis === 'y' ? el.full.height : el.full.width,
			};
			diff = {
				align: (size.wrap - size.active + slide.gap) / 2 - wrap.alignmargin,
				pos: (size.before - size.after) / 2 - pos,
			};
		}
	}

	// RESIZE-OBSERVER ----------------------------------------------
	let ww, wh;
	function resizeWrap(e) {
		ww = e.detail.CR.width;
		wh = e.detail.CR.height;
		slidySizes();
	}

	// CONTROLS & ANIMATION -----------------------------------------
	let pos = 0,
		comp = 0,
		translate = 0,
		transition = options.duration;

	$: move = () => {
		if (options.axis === "y") {
			return `transform: translate(0, ${translate}px); top: ${comp}px; transition: transform ${transition}ms;`;
		} else {
			return `transform: translate(${translate}px, 0); left: ${comp}px; transition: transform ${transition}ms;`;
		}
	};

	// $: fullsize = () => {
	// 	if (options.axis === "y") {
	// 		return `height: ${size.full}px;`;
	// 	} else {
	// 		return `width: ${size.full}px;`;
	// 	}
	// };

	$: if (wrap.align === "end") {
		translate = slides.length % 2 === 0 ? (options.loop ? pos + diff.align - size.active / 2 : -diff.pos + diff.align) : options.loop ? pos + diff.align : -diff.pos + diff.align;
	} else if (wrap.align === "start") {
		translate = slides.length % 2 === 0 ? (options.loop ? pos - diff.align - size.active / 2 : -diff.pos - diff.align) : options.loop ? pos - diff.align : -diff.pos - diff.align;
	} else {
		translate = slides.length % 2 === 0 ? (options.loop ? pos - size.active / 2 : -diff.pos) : options.loop ? pos : -diff.pos;
	}

	function prev() {
		slides = [slides[slides.length - 1], ...slides.slice(0, -1)];
	}
	function next() {
		slides = [...slides.slice(1), slides[0]];
	}

	// INDEX ------------------------------------------------------
	$: if (slidyinit)
		if (index < 0) {
			if (options.loop) {
				index = slides.length - 1;
				ix = slides.length;
			} else {
				index = 0;
			}
		} else if (index > slides.length - 1) {
			if (options.loop) {
				index = 0;
				ix = -1;
			} else {
				index = slides.length - 1;
			}
		}

	$: render && slidyIndex(index);

	let ix = index;
	function slidyIndex(id) {
		while (ix > id) {
			transition = options.duration;
			if (options.loop) {
				pos += size.last;
				comp = -pos;
				prev();
			}
			ix--;
		}
		while (ix < id) {
			transition = options.duration;
			if (options.loop) {
				pos -= size.first;
				comp = -pos;
				next();
			}
			ix++;
		}
	}

	// SLIDY ------------------------------------------------------
	function slidyLoop() {
		if (pos >= size.last) {
			if (options.loop) {
				prev();
			} else {
				index = ix -= 1;
			}
			pos = comp = 0;
		} else if (pos <= -size.first) {
			if (options.loop) {
				next();
			} else {
				index = ix += 1;
			}
			pos = comp = 0;
		}
		if (options.loop) {
			index = ix = el.active.node.ix;
		} else {
			pos >= size.before || pos <= -size.after ? (pos = pos / 1.5) : (pos = pos);
		}
	}

	function slidyStop() {
		transition = options.duration;
		const nulled = (direct) => {
			if (direct) {
				if (options.loop) {
					direct();
					pos = speed = transition = 0;
					tick().then(() => (index = ix = el.active.node.ix));
				} else {
					index = direct;
					pos = speed = 0;
				}
			} else {
				pos = comp = speed = 0;
			}
		};
		if (pos > size.last / 3 || speed < 0) {
			if (options.loop) {
				pos += size.last - pos;
				setTimeout(() => nulled(prev), transition);
			} else {
				nulled((index = ix -= 1));
			}
		} else if (pos < -size.first / 3 || speed > 0) {
			if (options.loop) {
				pos -= size.first + pos;
				setTimeout(() => nulled(next), transition);
			} else {
				nulled((index = ix += 1));
			}
		} else {
			nulled();
		}
	}

	function slidyNull() {
		if (comp !== 0) comp = pos = 0;
	}

	// WHEELL -----------------------------------------------------
	let iswheel = false,
		wheeltime;
	function slidyWheel(e) {
		slidyNull();
		iswheel = true;
		transition = 0;
		if (options.axis === "y") {
			pos += -e.detail.dy;
		} else {
			pos += -e.detail.dx;
		}
		slidyLoop();
		if (wheeltime !== null) {
			clearTimeout(wheeltime);
		}
		wheeltime = setTimeout(() => {
			iswheel = false;
			clearTimeout(wheeltime);
			slidyStop();
		}, options.duration / 2);
	}

	// DRAG -------------------------------------------------------
	let isdrag = false,
		htx = 0,
		speed = 0,
		tracker;
	function dragStart() {
		slidyNull();
		isdrag = true;
		transition = 0;
		if (tracker !== null) {
			clearInterval(tracker);
		}
	}
	function dragSlide(e) {
		if (isdrag) {
			if (options.axis === "y") {
				pos += e.detail.dy * 1.6;
			} else {
				pos += e.detail.dx * 1.6;
			}
			slidyLoop();
			tracker = setInterval(() => (htx = pos), 60);
			speed = (htx - pos) / 60;
		}
	}
	function dragStop() {
		isdrag = false;
		clearInterval(tracker);
		slidyStop();
	}

	// KEYS -------------------------------------------------------
	function slidyKeys(e) {
		if (e.keyCode === 37 || e.keyCode === 38) {
			index--;
		} else if (e.keyCode === 39 || e.keyCode === 40) {
			index++;
		}
	}
</script>

<section
	role="region"
	tabindex="0"
	aria-label="Slidy"
	id={wrap.id}
	class="slidy"
	class:loaded={slidyinit}
	class:axisy={options.axis === "y"}
	class:autowidth={slide.width === "auto"}
	class:antiloop={options.loop === false}
	class:alignmiddle={wrap.align === "middle"}
	class:alignstart={wrap.align === "start"}
	class:alignend={wrap.align === "end"}
	use:action.resize
	on:resize={resizeWrap}
	use:action.wheel
	on:wheels={controls.wheel ? slidyWheel : null}
	on:keydown={controls.keys ? slidyKeys : null}
	style="
        --wrapw: {wrap.width};
        --wraph: {wrap.height};
        --wrapp: {wrap.padding};
        --slidew: {slide.width};
        --slideh: {slide.height};
        --slidef: {slide.objectfit};
        --slideo: {slide.overflow};
        --slideg: {options.axis ===
	'y'
		? `${slide.gap}px 0 0 0`
		: `0 0 0 ${slide.gap}px`};
        --dur: {options.duration}ms;"
>
	{#if !slidyinit}
		<section id="loader">
			<slot name="loader">Loading...</slot>
		</section>
	{/if}

	<ul class="slidy-ul" on:contextmenu={() => (isdrag = false)} style={move()}>
		{#if slides}
			{#each slides as item, i (keyExtractor(item,i))}
				<li
					bind:this={nodes[i]}
					data-id={i}
					use:action.pannable
					on:panstart={controls.drag ? dragStart : null}
					on:panmove={controls.drag ? dragSlide : null}
					on:panend={controls.drag ? dragStop : null}
					class={slide.class}
					class:active={item.ix === index}
					style={slide.backimg === true ? `background-image: url(${item[slide.imgsrckey]})` : null}
				>
					{#if slidyinit}
						<slot {item}>
							{#if slide.backimg === false}
								<img alt={keyExtractor(item,i)} src={item[slide.imgsrckey]} width={item.width} height={item.height} />
							{/if}
						</slot>
					{/if}
				</li>
			{/each}
		{/if}
	</ul>

	{#if controls.arrows && slidyinit}
		{#if !options.loop}
			{#if index > 0}
				<button class="arrow-left" on:click={() => index--}>
					<slot name="arrow-left">&#8592;</slot>
				</button>
			{/if}
			{#if index < slides.length - 1}
				<button class="arrow-right" on:click={() => index++}>
					<slot name="arrow-right">&#8594;</slot>
				</button>
			{/if}
		{:else}
			<button class="arrow-left" on:click={() => index--}>
				<slot name="arrow-left">&#8592;</slot>
			</button>
			<button class="arrow-right" on:click={() => index++}>
				<slot name="arrow-right">&#8594;</slot>
			</button>
		{/if}
	{/if}
	{#if controls.dots && slidyinit}
		<ul class="slidy-dots" class:pure={controls.dotspure}>
			{#if controls.dotsarrow}
				{#if !options.loop}
					{#if index > 0}
						<li class="dots-arrow-left" on:click={() => index--}>
							<slot name="dots-arrow-left"><button>&#8592;</button></slot>
						</li>
					{/if}
				{:else}
					<li class="dots-arrow-left" on:click={() => index--}>
						<slot name="dots-arrow-left"><button>&#8592;</button></slot>
					</li>
				{/if}
			{/if}
			{#each dots as dot, i}
				<li class:active={i === index} on:click|stopPropagation={() => (index = i)}>
					<slot name="dot" {dot}>
						<button>{controls.dotsnum && !controls.dotspure ? i : ""}</button>
					</slot>
				</li>
			{/each}
			{#if controls.dotsarrow}
				{#if !options.loop}
					{#if index < slides.length - 1}
						<li class="dots-arrow-right" on:click={() => index++}>
							<slot name="dots-arrow-right"><button>&#8594;</button></slot>
						</li>
					{/if}
				{:else}
					<li class="dots-arrow-right" on:click={() => index++}>
						<slot name="dots-arrow-right"><button>&#8594;</button></slot>
					</li>
				{/if}
			{/if}
		</ul>
	{/if}
</section>

<style>
	#loader {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		position: absolute;
	}
	.slidy {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		width: var(--wrapw);
		height: var(--wraph);
		outline: 0;
		margin: auto;
	}
	.slidy ul {
		display: flex;
		align-items: center;
		justify-content: center;
		list-style: none;
		margin: 0;
		border: 0;
		user-select: none;
		-webkit-user-select: none;
	}
	.slidy-ul {
		/* flex: 1 0 var(--slidew); */
		width: 100%;
		height: 100%;
		padding: var(--wrapp);
		position: relative;
		touch-action: pan-y;
		will-change: transform;
	}
	.slidy-ul > * + * {
		margin: var(--slideg);
	}
	.slidy.loaded .slidy-ul li {
		opacity: 1;
	}
	.slidy.axisy .slidy-ul {
		flex-direction: column;
	}
	.slidy-ul li {
		flex: 1 0 auto;
		position: relative;
		overflow: var(--slideo);
		opacity: 0;
		z-index: 0;
		transition: opacity var(--dur);
		width: var(--slidew);
		height: var(--slideh);
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-attachment: scroll;
		background-position: center;
		background-size: var(--slidef);
		background-color: transparent;
	}
	:global(.slidy-ul li img) {
		width: 100%;
		height: 100%;
		display: block;
		pointer-events: none;
		max-width: var(--wrapw);
		max-height: var(--wraph);
		object-fit: var(--slidef);
	}
	:global(.slidy.autowidth .slidy-ul li img) {
		width: auto;
	}
	.slidy button {
		margin: 0;
		border: 0;
		padding: 0;
		border-radius: 0;
		width: 50px;
		height: 50px;
		line-height: 50px;
		color: white;
		background-color: rgba(0, 0, 0, 0.09);
		cursor: pointer;
		outline: 0;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.slidy button:active {
		outline: 0;
	}
	.slidy li.active,
	.slidy li.active button {
		color: red;
	}
	.slidy-dots {
		position: absolute;
		bottom: 0;
		height: 50px;
		padding: 0;
		width: 100%;
	}
	.slidy.axisy .slidy-dots {
		bottom: auto;
		right: 0;
		width: 50px;
		height: 100%;
		flex-direction: column;
	}
	.slidy-dots li {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.slidy.axisy .dots-arrow-left,
	.slidy.axisy .dots-arrow-right {
		transform: rotate(90deg);
	}
	.slidy-dots.pure li {
		width: 32px;
		height: 32px;
		background: none;
	}
	.slidy-dots.pure li button {
		border-radius: 50%;
		color: red;
		width: 12px;
		height: 12px;
		transition: color var(--dur);
	}
	.slidy-dots.pure li.active button {
		background: red;
	}
	.arrow-left,
	.dots-arrow-left {
		left: 0;
	}
	.arrow-right,
	.dots-arrow-right {
		right: 0;
	}
	.arrow-right,
	.arrow-left {
		position: absolute;
	}
	.slidy-dots.pure .dots-arrow-left button,
	.slidy-dots.pure .dots-arrow-right button {
		background: none;
		width: auto;
		height: auto;
	}
	.dots-arrow-left,
	.dots-arrow-right {
		width: 50px;
		height: 50px;
	}
</style>
