// https://malinajs.github.io/docs/#compile-options
const sassPlugin = require('malinajs/plugins/sass.js');

module.exports = function (option, filename) {
    option.passClass = false;
    option.immutable = true;
    option.plugins = [sassPlugin()];
    option.autoimport = (name) => `import ${name} from './${name}.xht';`;
    return option;
};
