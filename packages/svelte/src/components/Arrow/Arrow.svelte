<script lang="ts">
	import "./arrow.module.css";

	// describes slide management the direction: previous / next
	export let type: -1 | 1 | number = 1;
	export let loop: boolean;
	export let index: number;
	export let items: number;
	export let vertical = false;

	$: disabled = type < 1
		? index === 0 && !loop
		: index === items - 1 && !loop;

	$: ariaLabel = type < 1
		? `Go to the previous slide: #${index}`
		: `Go to the next slide: #${index}`;
</script>

<button
	aria-label={ariaLabel}
	class="slidy-arrow"
	class:prev={type < 0}
	class:vertical
	data-step={type}
	{disabled}
>
	<slot />
</button>
