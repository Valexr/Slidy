<!--
	TODO:
	Prevent stacking multiple entries into the browser history
-->
<aside class="side-menu" {id}>
	<!-- svelte-ignore a11y-missing-content -->
	<a
		class="backdrop"
		href="/#"
		id={`${id}-close`}
		title="Close sidebar"
		aria-label="Close sidebar"
	/>
	<slot />
</aside>

<svelte:window
	on:keydown={handleKeydown}
	on:transitionend={handleFocus}
/>

<script lang="ts">
	/**
	 * side-menu ID for `:target`
	 */
	export let id: string;

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.code === "Escape") {
			document.location.hash = "";
		}
	};

	const handleFocus = () => {
		const open = document.location.hash === `#${id}`;
		open
			? document.querySelector<HTMLAnchorElement>(`#${id}-close`)?.focus()
			: document.querySelector<HTMLButtonElement>(`#${id}-button`)?.focus();
	};
</script>

<style>
	.side-menu {
		--side-menu-duration: 250ms;

		display: flex;
		flex-flow: row nowrap;
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		max-width: 100%;
		height: 100vh;
		overflow-y: auto;
		overscroll-behavior-y: contain;
		z-index: 10;		
		
		visibility: hidden;
		will-change: transform;
		transform: translateX(110vw);
		transition: 
			transform var(--side-menu-duration) ease-in-out,
			visibility var(--side-menu-duration) linear;
	}

	.side-menu:target {
		visibility: visible;
		transform: translateX(0);
	}

	.backdrop {
		height: 100%;
		width: 100%;
	}

	@media (prefers-reduced-motion: reduce) {
		.side-menu {
			--side-menu-duration: 1ms;
		}
	}
</style>