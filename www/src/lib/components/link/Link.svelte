<script lang="ts" module>
	import styles from './link.module.css';
</script>

<script lang="ts">
	let {
		className = '',
		href = '',
		targetBlank = false,
		nofollow = false,
		disabled = false,
		title = '',
		children,
		active
	} = $props();

	// if no `href` is provided -> link will be disabled
	// disabled = $derived(href ? disabled : true);
	const external = $derived(href.indexOf('://') !== -1);
	const target = $derived(targetBlank || external ? '_blank' : undefined);
	const rel = $derived(
		`${external ? 'noopener noreferrer' : ''}` + `${nofollow ? 'nofollow' : ''}`
	);
</script>

<a
	class={`${styles.link} ${className}`}
	{href}
	{target}
	{rel}
	{title}
	aria-disabled={(!href && 'true') || undefined}
	class:disabled
	class:active
	tabIndex={disabled ? -1 : undefined}
>
	{@render children?.()}
</a>

<style>
	.active {
		text-decoration: underline;
	}
</style>
