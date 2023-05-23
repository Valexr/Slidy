import type { SharePluginFunc } from './types';
import { createButton } from './button';

const share: SharePluginFunc = ({ target, type } = { target: undefined, type: 'url' }) => {
    return ({ node, options }) => {
        const button = createButton(() => {
            const index = options.index;

            /**
             * Can't get slide without an index
             */
            if (!index) return;

            const current = node.childNodes[index] as HTMLElement;

            /**
             * Just in case
             */
            if (!current) return;

            const img = current.querySelector<HTMLImageElement>('[src]')?.src || current.style.backgroundImage || undefined;
            const title = current.querySelector('img')?.alt || undefined;

            /**
             * Image was not found
             */
            if (!img) return;

            try {
                if (type === 'url') {
                    navigator.share({
                        url: img,
                        title,
                    });
                }
            } finally {}
        });

        function destroy() {
            button.remove();
            node.removeEventListener('destroy', destroy);
        }

        node.addEventListener('destroy', destroy);
        
        if (!target) {
            node.insertAdjacentElement('afterend', button);
        } else if (typeof target === 'string') {
            // it's done like that because if error happens it would not be silent
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            document.querySelector(target)!.appendChild(button);
        } else {
            target.appendChild(button);
        }
    };
};

export { share }