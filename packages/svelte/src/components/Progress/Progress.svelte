<script>
	import "./progress.module.css";

	export let value;
	export let max;
	export let vertical;
</script>

<div class="slidy-progress" class:vertical>
	<span
		style:--_slidy-progress-size={`${Math.ceil(100 / max)}%`}
		style:--_slidy-progress="{Math.ceil(value * 100 / max)}%"
	/>
</div>