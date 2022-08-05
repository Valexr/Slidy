<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	interface TOCItem {
		level: number;
		title: string;
		id: string;
	}

	export const load: Load = async ({ params }) => {
		const { section } = params;
		const pages = [];

		const toc = [];
		let title = null;
		let description = null;

		try {
			let contents = import.meta.glob("/src/content/**/*.svx");

			for await (const [ filename, module ] of Object.entries(contents)) {
				if (filename.includes(`/${section}`)) {
					const page = await module();
					const { metadata } = page;

					// title and description are taken from the 1st page
					if (metadata.title) {
						title = metadata.title;
						description = metadata.description;
					}

					toc.push(...metadata.toc);
					pages.push(page.default);
				}
			}

			return {
				props: {
					pages,
					title,
					description,
					toc
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

<script lang="ts">
	import { base } from "$app/paths";
	import { Header, Link } from "@components";
	import styles from "./.docs.module.css";
	import stylesArticle from "./.page.module.css";

	export let pages = [];
	export let title: string;
	export let description: string;
	export let toc: TOCItem[];
</script>

<main class="{styles.main}">
	<Header	className="surface-2"	{title}>
		<p>{description}</p>
	</Header>
	<nav class="surface-1 {styles.nav}">
		<ol>
			{#each toc as { level, title, id }}
				<li style:--toc-level={level} data-level={level}>
					<Link href="{base}#{id}">
						{title}
					</Link>
				</li>
			{/each}
		</ol>
	</nav>
	<article class="{stylesArticle.article}">
		{#key pages}
			{#each pages as Page}
				<Page />
			{/each}
		{/key}
	</article>
</main>
