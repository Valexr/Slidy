import slug from "rehype-slug";

export const mdsvexConfig = {
	rehypePlugins: [ slug ],
	layout: {
		"_": "./src/lib/components/page/Page.svelte"
	}
};