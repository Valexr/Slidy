<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ params }) => {
		const { section } = params;
		const pages = [];

		try {
			let contents = import.meta.glob("/src/content/**/*.svx");

			for await (const [ filename, module ] of Object.entries(contents)) {
				if (filename.includes(`/${section}`)) {
					const page = await module();
					pages.push(page.default);
				}
			}

			return {
				props: {
					pages
				}
			};

		} catch (error) {
			return {
				status: 404,
				error: "Page Not Found"
			};
		}
	};
</script>

<script>
	export let pages;
</script>

{#key pages}
	{#each pages as Page}
		<Page />
	{/each}
{/key}
