<script lang="ts">
	export let src: string = "";
	export let width: number | string | undefined = undefined;
	export let height: number | string | undefined = undefined;
	export let alt: string = "";
	export let lazy = false;
	export let style = "";
	export let className: string = "";

	import "./image.module.css";
</script>

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