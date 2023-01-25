type VoidFunction = (() => void)
type AwaitQueueItem = { await: number };

type Queue = (VoidFunction | AwaitQueueItem)[];

type Timeout = /** number */ NodeJS.Timeout;

const now = performance.now.bind(performance);

class TaskQueue {
  protected originalQueue: Queue;
  protected queue: Queue;
  protected index: number;
  protected timeoutId: Timeout;

  protected time = now();

  constructor(queue: Queue) {
    this.originalQueue = queue;
    this.queue = this.resetQueue();
    this.index = 0;
    this.timeoutId = null as any as Timeout;
  }

  public start() {
    this.time = now();
    this.runNextTask();
  }

  public pause() {
    clearTimeout(this.timeoutId);

    const nextAwaitQueueItem = this.getNextAwaitQueueItem();

    if (nextAwaitQueueItem) {
      const remained = now() - this.time;

      nextAwaitQueueItem.await = nextAwaitQueueItem.await - remained;
    }
  }

  public stop() {
    clearTimeout(this.timeoutId);

    this.index = 0;
    this.resetQueue();
  }

  protected runNextTask() {
    if (this.index === this.queue.length) {
      this.index = 0;
      this.resetQueue();
    }

    const task = this.queue[this.index];

    if (typeof task === 'function') {
      let elapsed = now();
      task(), elapsed = now() - elapsed;

      const nextAwaitQueueItem = this.getNextAwaitQueueItem();

      if (nextAwaitQueueItem) {
        nextAwaitQueueItem.await = nextAwaitQueueItem.await - elapsed;
      }

      this.index++;
      this.runNextTask();
    } else {
      this.timeoutId = setTimeout(() => {
        this.index++;
        this.time = now();
        this.runNextTask();
      }, task.await)
    }
  }

  protected getNextAwaitQueueItem() {
    let i = this.index;

    while (i < this.queue.length) {
      if ('await' in this.queue[i]) {
        return this.queue[i] as AwaitQueueItem;
      }

      i++;
    }

    return null;
  }

  protected resetQueue() {
    this.queue = this.originalQueue.map(item => {
      if ('await' in item) {
        return { await: item.await };
      } else {
        return item;
      }
    });

    return this.queue;
  }
}

export { TaskQueue }