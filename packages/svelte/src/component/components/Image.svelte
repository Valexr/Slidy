<img
	{alt}
	class="slidy-image {className}"
	loading={lazy ? "lazy" : undefined}
	{src}
	{width}
	{height}
	{style}
	{...$$restProps}
/>

<script lang="ts">
	export let src = "";
	export let width: number | string | undefined = undefined;
	export let height: number | string | undefined = undefined;
	export let alt = "";
	export let lazy = false;
	export let style = "";
	export let className = "";

	import "./image.module.css";
</script>
