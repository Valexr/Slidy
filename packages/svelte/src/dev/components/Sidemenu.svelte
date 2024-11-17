<svelte:window onkeydown={handleKeydown} />

<script lang="ts">
	import "@slidy/assets/styles/dev/side-menu.module.css";

	let { open = $bindable(false), children } = $props();

	const close = () => (open = !open);
	const handleKeydown = (event: KeyboardEvent) => {
		return event.code === "Escape" && close();
	};
</script>

<aside class="side-menu" class:open>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="backdrop"
		title="Close sidebar"
		aria-label="Close sidebar"
		aria-roledescription="button"
		onclick={close}
	></div>
	<section class="contents">
		{@render children?.()}
	</section>
</aside>
