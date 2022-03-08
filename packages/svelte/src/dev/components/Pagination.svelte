<script lang="ts">
	import "./pagination.module.css";

	export let current: number;
	export let pages: number;
</script>

<nav class="pagination">
	{#each { length: pages } as _, i}
		<button
			class="pagination-item"
			class:active={i === current}
			on:click={() => (current = i)}			
		>
			{i}
		</button>
	{/each}
</nav>
