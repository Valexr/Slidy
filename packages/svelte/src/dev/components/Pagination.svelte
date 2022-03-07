<script lang="ts">
	import "./pagination.module.css";

	export let current: number;
	export let pages: number;
</script>

<nav class="pagination">
	{#each { length: pages } as _, i}
		<button
			class="pagination-item"
			on:click={() => (current = i)}
			class:active={i === current}
		>
			{i}
		</button>
	{/each}
</nav>
