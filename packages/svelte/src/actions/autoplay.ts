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

export function autoplayable(node: HTMLElement, parameters: Options = defaults): ReturnType<Action> {
	let { status = false } = parameters;
	const { interval = 1000 } = parameters;

	let timerInterval: number | undefined = undefined;

	const play = () => {
		timerInterval = window.setInterval(() => {
			if (status) {
				node.dispatchEvent(new CustomEvent("autoplay"));
			}
		}, interval);
	};

	const pause = () => {
		status = false;
	};

	const handlePointerover = () => pause();
	const handlePointerout = () => status = true;
	const handleFocusin = () => pause();
	const handleFocusout = () => status = true;

	const start = () => {
		node.addEventListener("pointerover", handlePointerover, { passive: true });
		node.addEventListener("pointerout", handlePointerout, { passive: true });
		node.addEventListener("focusin", handleFocusin, { passive: true });
		node.addEventListener("focusout", handleFocusout, { passive: true });
		play();
	};

	const stop = () => {
		window.clearInterval(timerInterval);
		node.removeEventListener("pointerover", handlePointerover);
		node.removeEventListener("pointerout", handlePointerout);
		node.removeEventListener("focusin", handleFocusin);
		node.removeEventListener("focusout", handleFocusout);
		node.dispatchEvent(new CustomEvent("autoplay-stop"));
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
