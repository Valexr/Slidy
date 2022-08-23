import { cpSync } from 'fs';
import { join, dirname } from 'path';

export default function copy(paths = []) {
	return {
		name: 'copy',
		setup(build) {
			build.onEnd((end) => {
				paths.forEach(({ from, to }) => {
					cpSync(from, join(dirname(build.initialOptions.outfile), to), {
						recursive: true,
						force: true,
						dereference: true
					});
				});
			});
		}
	};
}
