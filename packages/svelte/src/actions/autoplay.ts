type Action = (node: HTMLElement, parameters: unknown) => {
	update?: (parameters: Options) => void,
	destroy?: () => void
}

interface Options {
	status: boolean,
	interval?: number,
}

type EventName = "play" | "pause" | "stop";

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

	const dispatch = (event: EventName) => {
		node.dispatchEvent(
			new CustomEvent(event)
		);
	};

	const play = () => {
		status = true;
		window.clearInterval(timerInterval);
		timerInterval = window.setInterval(() => {
			console.log(status);
			dispatch("play");
		}, interval);
	};

	const pause = () => {
		window.clearInterval(timerInterval);
		dispatch("pause");
	};

	const handlePointerover = () => {
		if (status) {
			pause();
		}
	};

	const handlePointerout = () => {
		if (status) {
			play();
		}
	};

	const handleFocusin = () => {
		if (status) {
			pause();
		}
	};

	const handleFocusout = () => {
		if (status) {
			play();
		}
	};

	const handleVisibilityChange = () => {
		if (!status && document.visibilityState === "hidden") {
			pause();
		} else {
			play();
		}
	};

	const connectEvents = () => {
		window.addEventListener("visibilitychange", handleVisibilityChange, false);
		node.addEventListener("pointerover", handlePointerover, { passive: true });
		node.addEventListener("pointerout", handlePointerout, { passive: true });
		node.addEventListener("focusin", handleFocusin, { passive: true });
		node.addEventListener("focusout", handleFocusout, { passive: true });
	};

	const disconnectEvents = () => {
		window.clearInterval(timerInterval);
		window.removeEventListener("visibilitychange", handleVisibilityChange);
		node.removeEventListener("pointerover", handlePointerover);
		node.removeEventListener("pointerout", handlePointerout);
		node.removeEventListener("focusin", handleFocusin);
		node.removeEventListener("focusout", handleFocusout);
	};

	const start = () => {
		connectEvents();
		play();
	};

	const stop = () => {
		status = false;
		disconnectEvents();
		dispatch("stop");
	};

	if (status) {
		start();
	}

	return {
		update({ status }: Options) {
			if (status) {
				start();
			} else {
				stop();
			}
		},
		destroy() {
			stop();
		}
	};
}
