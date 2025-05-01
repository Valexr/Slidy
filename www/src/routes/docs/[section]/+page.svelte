<script lang="ts" module>
	import { base } from '$app/paths';
	import { Header, Link } from '@components';
	import styles from './docs.module.css';
	import stylesArticle from './page.module.css';
	import type { PageData } from './$types';
</script>

<script lang="ts">
	let { data }: { data: PageData } = $props();
</script>

<main class={styles.main}>
	<Header className="surface-2" title={data.title}>
		<p>{data.description}</p>
	</Header>
	<nav class="surface-1 {styles.nav}">
		<ol>
			{#each data.toc as { level, title, id }}
				<li style:--toc-level={level} data-level={level}>
					<Link href="#{id}">
						{title}
					</Link>
				</li>
			{/each}
		</ol>
	</nav>
	<article class={stylesArticle.article}>
		{#key data.pages}
			{#each data.pages as Page}
				<Page />
			{/each}
		{/key}
	</article>
</main>
