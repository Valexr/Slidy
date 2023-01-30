<svelte:window on:keydown={handleKeydown} />

<script lang="ts">
	import "@slidy/assets/styles/dev/side-menu.module.css";

	export let open = false;

	const close = () => (open = !open);
	const handleKeydown = (event: KeyboardEvent) => {
		return event.code === "Escape" && close();
	};
</script>

<aside class="side-menu" class:open>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		class="backdrop"
		title="Close sidebar"
		aria-label="Close sidebar"
		on:click={close}
		on:keydown={event => {
			if (event.key === 'Enter') close();
		}}
		tabindex="0"
	/>
	<section class="contents">
		<slot />
	</section>
</aside>
