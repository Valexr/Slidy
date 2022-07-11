<script lang="ts">
	import styles from "./icon.module.css";

	export let className = "";
	export let path: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let viewBox = "0 0 100 100";  
</script>

<svelte:options namespace="svg" />

<svg
	class="{styles.icon} {className}"
  xmlns="http://www.w3.org/2000/svg"
  {viewBox}
  aria-labelledby={title}
  role="presentation">
    {#if title}
      <title>{title}</title>
    {/if}
    {#if path}
      <path d={path} />
    {/if}
    <slot />
</svg>
