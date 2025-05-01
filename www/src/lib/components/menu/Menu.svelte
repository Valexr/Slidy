<script module lang="ts">
	import { page } from '$app/state';
	import { setContext } from 'svelte';
	import styles from './menu.module.css';
	import type { Page } from '@sveltejs/kit';

	export type MenuContext = Page;
</script>

<script lang="ts">
	let { children } = $props();

	setContext<MenuContext>('page', page);
</script>

<nav class={styles['menu-container']}>
	<ul class={styles['menu-items']}>
		{@render children?.()}
	</ul>
</nav>
