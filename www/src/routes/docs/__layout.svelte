<script lang="ts">
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { Header, Link } from "@components";
	import styles from "./.docs.module.css";
	import stylesArticle from "./.page.module.css";

	const sections = [
		{
			section: "Core Script",
			items: [
				{ title: "Core", href: "/docs/core" }
			]
		},
		{
			section: "Integrations",
			items: [
				{ title: "Svelte", href: "/docs/svelte" }
			]
		},
		{
			section: "Extensions",
			items: [
				{ title: "Animation", href: "/docs/animation" },
				{ title: "Easing", href: "/docs/easing" },
				{ title: "Media", href: "/docs/media" }
			]
		}
	];
</script>

<main class="{styles.main}">
	<Header
		className="surface-2"
		title="{$page.params.section || "Documentation"}"
	/>
	<nav class="surface-2 {styles.nav}">
		{#each sections as { section, items }}
			<section>
				<h2>{section}</h2>
				<ul>
					{#each items as { title, href }}
						<li>
							<Link href="{base}{href}">
								{title}
							</Link>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</nav>
	<article class="{stylesArticle.article}">
		<slot />
	</article>
</main>
