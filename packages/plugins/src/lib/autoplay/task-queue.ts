type VoidFunction = (() => void)
type AwaitQueueItem = { await: number };

type Queue = (VoidFunction | AwaitQueueItem)[];

type Timeout = /** number */ NodeJS.Timeout;

const now = performance.now.bind(performance);

class TaskQueue {
    protected queue: Queue;
    protected timeoutId!: Timeout;
    protected index: number;
    protected off: number;

    protected time = now();

    constructor(queue: Queue) {
        this.queue = queue;
        this.index = 0;
        this.off = 0
    }

    public start() {
        this.time = now();
        this.runNextTask();
    }

    public pause() {
        clearTimeout(this.timeoutId);
        this.off += now() - this.time;
    }

    public stop() {
        clearTimeout(this.timeoutId);

        this.off = 0;
        this.index = 0;
    }

    protected runNextTask() {
        if (this.index === this.queue.length) {
            this.stop();
        }

        const task = this.queue[this.index];

        if (typeof task === 'function') {
            const start = now();
            task();

            this.index++;
            this.off += now() - start;
            this.runNextTask();
        } else {
            this.timeoutId = setTimeout(() => {
                this.index++;
                this.time = now();
                this.off = 0;
                this.runNextTask();
            }, task.await - this.off)
        }
    }
}

export { TaskQueue }