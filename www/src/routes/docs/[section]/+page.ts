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
	pages: unknown[];
}

export const load: PageLoad = async ({ params }) => {
	const { section } = params;
	const pages = [];

	const toc: Data['toc'] = [];
	let title: Data['title'] = null;
	let description: Data['description'] = null;

	try {
		const contents = import.meta.glob('/src/content/**/*.svx');

		for await (const [filename, module] of Object.entries(contents)) {
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
			pages,
			title,
			description,
			toc
		} as Data;
	} catch (err) {
		throw error(404, `Not Found: ${err.message}`);
	}
};
