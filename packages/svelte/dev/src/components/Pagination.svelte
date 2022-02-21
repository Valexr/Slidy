<nav class="pagination">
	{#each { length: pages} as _, i}
			<button
				class="pagination-item"
				on:click={() => (current = i)}
				class:active={i === current}>
					{i}
			</button>
	{/each}
</nav>

<script lang="ts">
	export let current: number;
	export let pages: number;
</script>

<style>
	.pagination {
		display: flex;
		flex-flow: row wrap;
		gap: var(--space-s);
	}

	.pagination-item {
		border: none;
		background-color: var(--surface-3);
	}

	.pagination-item.active {
		background-color: var(--accent);
	}
</style>