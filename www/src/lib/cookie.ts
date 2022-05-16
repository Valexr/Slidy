function get(name: string) {
	let matches = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function set(name: string, value: string, options = {}) {
	options = {
		path: '/',
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += '; ' + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += '=' + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

function del(name: string) {
	set(name, '', {
		'max-age': -1
	});
}

function parse(cookies: string): { [key: string]: string } {
	const query = cookies?.replace(/; /g, '&');
	const params = new URLSearchParams(query);

	return [...params.entries()].reduce((acc = {}, [key, value]) => {
		acc[key] = value;
		return acc;
	}, {});
}

export { get, set, del, parse };
