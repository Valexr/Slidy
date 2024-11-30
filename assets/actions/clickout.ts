interface DocumentClick extends MouseEvent {
    target: EventTarget | null
}

export function clickOut(node: HTMLElement) {
    const handleClick = (event: DocumentClick) => {
        if (!node.contains(event.target as Node)) {
            node.dispatchEvent(new CustomEvent('outclick'));
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
}