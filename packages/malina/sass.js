import { compileStringAsync } from 'sass';

function sassPlugin() {
    return {
        name: 'sass',
        dom: async ctx => {
            for (let node of ctx.DOM.body) {
                if (node.type != 'style') continue;
                let type = node.attributes.filter(a => a.name == 'type' || a.name == 'lang')[0];
                if (!type || type.value != 'sass' && type.value != 'scss') continue;

                node.content = await (new Promise((resolve, reject) => {
                    compileStringAsync({
                        file: ctx.config.path,
                        data: node.content,
                        indentedSyntax: type.value == 'sass'
                    }, function (e, result) {
                        if (e) return reject(e);
                        resolve(result.css.toString());
                        type.value = 'css';
                    });
                }));
            };
        }
    };
};