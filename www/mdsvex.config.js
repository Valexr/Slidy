import slug from "rehype-slug";

/**
* Custom remark plugin for injecting information about `headings` into frontmatter.
*/
export const transformerTOC = () => {
	let visit;
	let tree_to_string;
	return async function transformer(tree, vFile) {
		if (!visit) {
			tree_to_string = (await import("mdast-util-to-string")).toString;
			visit = (await import("unist-util-visit")).visit;
		}

		vFile.data.toc = [];
		
		visit(tree, "heading", (node) => {
			const title = tree_to_string(node);
			vFile.data.toc.push({
				level: node.depth,
				title,
				id: title.toLowerCase().replace(/\s/g, "-")
			});
		});

		if (!vFile.data.fm) {
			vFile.data.fm = {};
		}

		vFile.data.fm.toc = vFile.data.toc;
	};
};

export const mdsvexConfig = {
	rehypePlugins: [ slug ],
	remarkPlugins: [ transformerTOC ],
	layout: {
		_: "./src/lib/components/page/Page.svelte"
	}
};
