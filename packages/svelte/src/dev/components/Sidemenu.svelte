<svelte:window on:keydown={handleKeydown} />

<script lang="ts">
	import "./side-menu.module.css";

	export let open = false;

	const close = () => (open = !open);
	const handleKeydown = (event: KeyboardEvent) => {
		return event.code === "Escape" && close();
	};
</script>

<aside class="side-menu" class:open>
	<div
		class="backdrop"
		title="Close sidebar"
		aria-label="Close sidebar"
		on:click={close}
		tabindex="0"
	/>
	<section class="contents">
		<slot />
	</section>
</aside>
