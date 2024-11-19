<script>
	import './code.styles.css';
	import './code-theme.styles.css';

	let { children } = $props();
</script>

<!--
	@component
	
	Custom `code` html element to use in blogposts.
	Provides a syntax highlight.

	! Highlight styles are global, should be careful.
-->
<pre>
	<code>
		{@render children?.()}
	</code>
</pre>
