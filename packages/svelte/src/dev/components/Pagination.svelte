<script lang="ts">
	import "@slidy/assets/styles/dev/pagination.module.css";

	let {current = 0, pages = 0} = $props()
</script>

<nav class="pagination">
	{#each { length: pages } as _, i}
		<button
			class="pagination-item"
			class:active={i === current}
			onclick={() => (current = i)}
		>
			{i}
		</button>
	{/each}
</nav>
