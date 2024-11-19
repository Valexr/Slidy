<script lang="ts" module>
	import { Footer, Masthead } from '@components';

	import '../styles/globals.css';
	import '../styles/tokens.css';
	import '../styles/utility.css';
	import '../styles/typography.css';
</script>

<script lang="ts">
	let { children } = $props();
</script>

<Masthead />
{@render children?.()}
<Footer />
