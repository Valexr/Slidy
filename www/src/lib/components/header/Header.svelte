<script lang="ts">
	import styles from "./header.module.css";

	export let className = "";
	export let title: string | undefined = undefined;
</script>

<header class="{styles.hero} {className}">
	{#if title}
		<h1 class="{styles.title}">
			{title}
		</h1>
	{/if}
	<slot />
</header>