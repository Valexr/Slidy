import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

interface Data {
	title: string;
	description: string;
	toc: {
		level: number;
		title: string;
		id: string;
	}[];
	pages: ConstructorOfATypedSvelteComponent[];
}

interface Page {
	default: ConstructorOfATypedSvelteComponent;
	metadata: {
		title: string;
		description: string;
		toc: { level: number; title: string; id: string }[];
	};
}

export const load: PageLoad = async ({ params }) => {
	const { section } = params;
	const pages: ConstructorOfATypedSvelteComponent[] = [];

	const toc: Data['toc'] = [];
	let title: Data['title'] = null;
	let description: Data['description'] = null;

	try {
		const contents = import.meta.glob<Page>('/src/content/**/*.svx');
		for (const [filepath, module] of Object.entries(contents)) {
			if (filepath.includes(`/${section}`)) {
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
			pages,
			title,
			description,
			toc
		} as Data;
	} catch (err) {
		throw error(404, `Not Found: ${err.message}`);
	}
};
