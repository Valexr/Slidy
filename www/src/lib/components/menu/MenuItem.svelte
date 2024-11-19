<script lang="ts">
	import { getContext } from 'svelte';
	import { Link } from '../link';
	import { active } from './active';
	import styles from './menu.module.css';

	import type { MenuContext } from './Menu.svelte';

	let { href = '', disabled = false, pattern = null, children } = $props();

	const page = getContext<MenuContext>('page');
</script>

<li class={styles['menu-item']} use:active={{ current: $page.url.pathname, pattern }}>
	<Link {href} {disabled}>
		{@render children?.()}
	</Link>
</li>
