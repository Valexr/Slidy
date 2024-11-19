<script lang="ts">
	import styles from './header.module.css';

	let { className = '', title = '', children } = $props();
</script>

<header class="{styles.hero} {className}">
	{#if title}
		<h1 class={styles.title}>
			{title}
		</h1>
	{/if}
	{@render children?.()}
</header>
