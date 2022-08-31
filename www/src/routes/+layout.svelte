<script>
	import { Footer, Masthead } from '@components';

	import '../styles/globals.css';
	import '../styles/tokens.css';
	import '../styles/utility.css';
	import '../styles/typography.css';

	export const prerender = true;
</script>

<Masthead />
<slot />
<Footer />
