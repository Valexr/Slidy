interface Options {
  pattern?: RegExp | null;
  current: string;
}

/**
 * Action for marking active links via "aria-current" attribute.
 * 
 * Args:
 *  - pattern?: the regexp literal to test the if the link should be active;
 *  - current: the current href of the page;
 * 
 * If the pattern is not provided, the href attribute are compated with the current.
 */
export function active(node: HTMLLIElement, { pattern, current }: Options)  {
	const a = node.firstElementChild as HTMLAnchorElement;
	const href = a.getAttribute("href");
  
	function update({ pattern, current }: Options): void {
		if (pattern && pattern instanceof RegExp) {
			(pattern.test(current))
				? a.setAttribute("aria-current", "page")
				: a.removeAttribute("aria-current");
		} else {
			(!pattern && current === href)
				? a.setAttribute("aria-current", "page")
				: a.removeAttribute("aria-current");
		}
	}
  
	update({ pattern, current });
  
	return {
		update
	};
}