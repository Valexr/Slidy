<svelte:options namespace="svg" />

<script lang="ts">
	import styles from './icon.module.css';

	let { className = '', path = '', title = '', viewBox = '0 0 100 100', children } = $props();
</script>

<svg
	class="{styles.icon} {className}"
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
	aria-labelledby={title}
	role="presentation"
>
	{#if title}
		<title>{title}</title>
	{/if}
	{#if path}
		<path d={path} />
	{/if}
	{@render children?.()}
</svg>
