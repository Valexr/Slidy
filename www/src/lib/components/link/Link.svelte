<script lang="ts">
	import styles from './link.module.css';

	let {
		className = '',
		href = '',
		targetBlank = false,
		nofollow = false,
		disabled = false,
		title = '',
		restProps = '',
		children
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
	{...restProps}
	aria-disabled={disabled ? 'true' : undefined}
	class:disabled
	tabIndex={disabled ? -1 : undefined}
>
	{@render children?.()}
</a>
