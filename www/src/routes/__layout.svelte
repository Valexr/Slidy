<script context="module" lang="ts">
	import { slides } from "@stores/slides";
	import { browser } from "$app/env";
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async () => {
		if (browser) {
			await slides.init(25);
		}

		return {
			status: 200
		};
	};
</script>

<script>
	import { Footer, Masthead } from "@components";

	import "../styles/globals.css";
	import "../styles/tokens.css";
	import "../styles/utility.css";
</script>

<Masthead />
<slot />
<Footer />