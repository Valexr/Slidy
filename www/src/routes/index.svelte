<script lang="ts">
	import { Header, Icon } from "@components";

	const features = [
		{
			title: "Simple and Configurable.",
			description: "Easy to use.",
		},
		{
			title: "Rich Ecosystem",
			description: "Templates, animations, easings, and plugins available.",
		},
		{
			title: "TypeScript",
			description: "Build with Typescript. Ships with types included.",
		},
		{
			title: "Dependency-Free",
			description: "No dependencies used.",
		}
	];
</script>

<svelte:head>
	<title>Slidy</title>
</svelte:head>

<main>
	<Header className="surface-2">
		<Icon viewBox="0 0 36 36">
			<path fill="#e94280" d="M25.05,27,11,32.88c-.85.34-1.53-.08-1.53-.93V25.16A2.62,2.62,0,0,1,11,23l14.1-5.78c.85-.34,1.53.09,1.53.94V24.9A2.49,2.49,0,0,1,25.05,27Z" />
			<path fill="#655aa3" d="M9.42,17.87v-6.8c0-.85.68-1.27,1.53-.93l14.1,5.77a2.62,2.62,0,0,1,1.53,2.21v6.79c0,.85-.68,1.28-1.53.94L11,20A2.5,2.5,0,0,1,9.42,17.87Z" />
			<path fill="#fdc21a" d="M25.05,13,11,18.83c-.85.34-1.53-.09-1.53-.94V11.1A2.62,2.62,0,0,1,11,8.89l14.1-5.77c.85-.34,1.53.08,1.53.93v6.79A2.5,2.5,0,0,1,25.05,13Z" />			
		</Icon>
		<h1>Slidy</h1>
		<p>
			Simple, configurable, nested & reusable sliding action script with rich ecosystem: templates, animations, easings & plugins.
		</p>
	</Header>
	<section class="contents">
		<ul class="features grid-flexible">
			{#each features as { title, description }}
				<li>
					<article class="surface-2 feature">
						<h2>{title}</h2>
						<p>{description}</p>
					</article>
				</li>
			{/each}
		</ul>
	</section>
</main>

<style>
	main {
		--icon-size: calc(2 * var(--font-size-8));
	}

	h2 {
		margin-bottom: var(--size-1);
	}

	main section {
		padding-block: var(--size-8);
		display: flex;
		flex-flow: column;
		align-items: center;
		gap: var(--size-2);
		text-align: center;
	}

	.features {
		gap: var(--size-4);
		width: 100%;
		margin: var(--size-8) auto;
	}

	.feature {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: flex-start;
		padding: var(--size-3);
		border-radius: var(--size-3);
	}
</style>
