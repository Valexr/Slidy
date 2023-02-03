<script lang="ts" context="module">
	import { page } from '$app/stores';
	import { Footer, Masthead } from '@components';

	import '../styles/globals.css';
	import '../styles/tokens.css';
	import '../styles/utility.css';
	import '../styles/typography.css';
</script>

<script lang="ts">
	import { media } from '$lib/media';
	console.log($media, $page.data.media);
</script>

<Masthead />
<slot />
<Footer />
