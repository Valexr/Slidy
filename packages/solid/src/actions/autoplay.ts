type Action = (node: HTMLElement, parameters: unknown) => {
	update?: (parameters: Options) => void,
	destroy?: () => void
}

interface Options {
	status: boolean,
	interval?: number,
}

const defaults: Options = {
	status: true,
	interval: 1000
};

/**
 * Sets the interval timer and fires `play`, `pause`, and `stop` events.
 */
export function autoplay(node: HTMLElement, parameters: Options = defaults): ReturnType<Action> {
	let { status = false } = parameters;
	const { interval = 1000 } = parameters;

	let timerInterval: number | undefined = undefined;

	const play = () => {
		timerInterval = window.setInterval(() => {
			if (status) {
				node.dispatchEvent(new CustomEvent("play"));
			}
		}, interval);
	};

	const pause = () => {
		status = false;
		node.dispatchEvent(new CustomEvent("pause"));
	};

	const handlePointerover = () => pause();
	const handlePointerout = () => status = true;
	const handleFocusin = () => pause();
	const handleFocusout = () => status = true;
	const handleVisibilityChange = () => {
		if (document.visibilityState === "hidden") {
			pause();
		} else {
			status = true;
		}
	};

	const start = () => {
		window.addEventListener("visibilitychange", handleVisibilityChange, false);
		node.addEventListener("pointerover", handlePointerover, { passive: true });
		node.addEventListener("pointerout", handlePointerout, { passive: true });
		node.addEventListener("focusin", handleFocusin, { passive: true });
		node.addEventListener("focusout", handleFocusout, { passive: true });
		play();
	};

	const stop = () => {
		window.clearInterval(timerInterval);
		window.removeEventListener("visibilitychange", handleVisibilityChange);
		node.removeEventListener("pointerover", handlePointerover);
		node.removeEventListener("pointerout", handlePointerout);
		node.removeEventListener("focusin", handleFocusin);
		node.removeEventListener("focusout", handleFocusout);
		node.dispatchEvent(new CustomEvent("stop"));
	};

	if (status) {
		start();
	}

	return {
		update({ status }: Options) {
			status
				? start()
				: stop();
		},
		destroy() {
			stop();
		}
	};
}
