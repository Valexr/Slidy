export function pannable(node) {
	const eventHandlerOptions = { passive: false };
	let x = 0, y = 0

	function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

	function handleMousedown(e) {
		x = unify(e).clientX;
		y = unify(e).clientY;

		node.dispatchEvent(new CustomEvent('panstart', {
			detail: { x, y }
		}));

		window.addEventListener('mousemove', handleMousemove, eventHandlerOptions);
		window.addEventListener('mouseup', handleMouseup, eventHandlerOptions);
		window.addEventListener('touchmove', handleMousemove, eventHandlerOptions);
		window.addEventListener('touchend', handleMouseup, eventHandlerOptions);
	}

	function handleMousemove(e) {
		const dx = unify(e).clientX - x;
		const dy = unify(e).clientY - y;
		x = unify(e).clientX;
		y = unify(e).clientY;
		// if (dx !== 0) {
		// 	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		// }

		node.dispatchEvent(new CustomEvent('panmove', {
			detail: { x, y, dx, dy }
		}));
	}

	function handleMouseup(e) {
		x = unify(e).clientX;
		y = unify(e).clientY;

		node.dispatchEvent(new CustomEvent('panend', {
			detail: { x, y }
		}));

		window.removeEventListener('mousemove', handleMousemove, eventHandlerOptions);
		window.removeEventListener('mouseup', handleMouseup, eventHandlerOptions);
		window.removeEventListener('touchmove', handleMousemove, eventHandlerOptions);
		window.removeEventListener('touchend', handleMouseup, eventHandlerOptions);
	}

	node.addEventListener('mousedown', handleMousedown, eventHandlerOptions);
	node.addEventListener('touchstart', handleMousedown, eventHandlerOptions);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown, eventHandlerOptions);
			node.removeEventListener('touchstart', handleMousedown, eventHandlerOptions);
		}
	};
}

export function resize(node) {
	let CR
	let ET

	const ro = new ResizeObserver((entries, observer) => {
		for (let entry of entries) {
			CR = entry.contentRect
			ET = entry.target
		}
		node.dispatchEvent(new CustomEvent('resize', {
			detail: { CR, ET }
		}));
	});

	ro.observe(node);

	return {
		destroy() {
			ro.disconnect();
		}
	}
}

export function wheel(node) {
	let dx = 0, dy = 0

	function handleWheel(e) {
		if ((navigator.platform.indexOf('Win') > -1) && e.shiftKey) {
			dx = e.deltaY;
		} else {
			dx = e.deltaX * 1.5;
			dy = e.deltaY * 1.5;
		}
		if (dx !== 0) {
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}
		node.dispatchEvent(new CustomEvent('wheels', {
			detail: { dx, dy }
		}));
	}

	node.addEventListener('wheel', handleWheel, { passive: false });

	return {
		destroy() {
			node.removeEventListener('wheel', handleWheel);
		}
	};
};
