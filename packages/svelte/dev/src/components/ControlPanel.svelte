<form class="controls">
    <header>
        <h2>Control Panel</h2>
    </header>
    <section>
        <header>
            <h3>Mode</h3>
        </header>
        <fieldset class="flex-horizontal">
            <label>
                <input
                    type="checkbox"
                    checked={vertical}
                    on:change={() => (vertical = !vertical)}
                />
                <span>Vertical</span>
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={clamp}
                    on:change={() => (clamp = !clamp)}
                />
                <span>Clamp</span>
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={snap}
                    on:change={() => (snap = !snap)}
                />
                <span>Snap</span>
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={loop}
                    on:change={() => (loop = !loop)}
                />
                <span>Loop</span>
            </label>
        </fieldset>
    </section>
    <section>
        <header>
            <h3>Swipe</h3>
        </header>
        <fieldset>
            <label>
                <span>Duration</span>
                <input
                    type="number"
                    bind:value={duration}
                    size="5"
                    step="1"
                    min="100"
                    max="1000"
                />
            </label>
            <label>
                <span>Gravity</span>
                <input
                    type="number"
                    bind:value={gravity}
                    size="5"
                    step="0.1"
                    min="0.1"
                    max="2"
                    width="auto"
                />
            </label>
            <label>
                <span>Align</span>
                <select bind:value={align}>
                    <option value="start">← start</option>
                    <option value="middle">middle</option>
                    <option value="end">end →</option>
                </select>
            </label>
        </fieldset>
    </section>
    <section>
        <header>
            <h3>Slides</h3>
        </header>
        <fieldset>
            <label>
                <span>Width</span>
                <input bind:value={width} size="5" width="auto" />
            </label>
            <label>
                <span>Gap</span>
                <input type="text" bind:value={gap} size="5" />
            </label>
        </fieldset>
    </section>
</form>

<script lang="ts">
    //export let limit = 9;
    export let vertical = false;
    export let clamp = true;
    export let align: 'start' | 'middle' | 'end' = 'middle';
    export let duration = 450;
    export let gravity = 1.45;
    export let width = 'auto';
    export let snap = true;
    export let loop = false;
    export let gap = 15;
</script>

<style>
    .controls {
        display: grid;
        grid-auto-rows: min-content;
        gap: 0.75rem;
        padding: var(--space-xl) var(--space-l) var(--space-xxl) var(--space-l);
        background-color: var(--surface-2);
        min-width: 300px;
        width: auto;
        min-height: 100%;
        height: max-content;
    }

    .controls h2 {
        font-size: 1.25rem;
        text-align: center;
    }

    .controls h3 {
        font-size: 1rem;
        font-weight: 500;
    }

    .controls section {
        display: grid;
        grid-auto-rows: auto;
        gap: var(--space-s);
    }

    .controls fieldset {
        display: flex;
        flex-flow: column nowrap;
        gap: var(--space-m);
        border: none;
        background-color: var(--surface-3);
        border-radius: 1rem;
        padding: var(--space-l);
    }

    .controls label {
        display: flex;
        flex-flow: column nowrap;
        gap: 0.35rem;
    }

    .controls .flex-horizontal label {
        flex-direction: row;
        align-items: center;
    }
</style>
