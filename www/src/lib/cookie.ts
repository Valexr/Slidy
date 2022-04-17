function get(name: string) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
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

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}


function del(name: string) {
    set(name, "", {
        'max-age': -1
    })
}

const parse = (cookiesHeader: string) => {
    // The final goal is to return an object with key/value reflecting
    // the cookies. So, this functions always returns an object.

    // If we do not receive a string, we won't do anything.
    if (typeof cookiesHeader != 'string') return {};

    const cookies = cookiesHeader.split(/;\s*/);

    // If we have something similar to cookie, we want to add them
    // to the final object
    const parsedCookie = {};
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split('=');
        parsedCookie[key] = value;
    }

    // The reason I'm using JSON here is to make sure the final
    // object won't have any undefined value.
    return JSON.parse(JSON.stringify(parsedCookie));
};

export { get, set, del, parse }