<script>
    export let id = '',
        style = '',
        open = false,
        check = false
</script>

<button id="{id}" class:open class:check on:click|stopPropagation style="{style}">
    <slot />
</button>

<style lang="scss">
    button {
        position: fixed;
        bottom: 20px;
        width: 50px;
        height: 50px;
        z-index: 1000;
        border: 2px solid var(--color-active);
        border-radius: 50%;
        background: var(--color-active);
        outline: 0;
        margin: 0;
        padding: 0;
        color: var(--color);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 250ms, color 250ms, border-color 250ms;
        cursor: pointer;
        &.open {
            background: transparent;
            color: var(--color-active);
        }
    }
    button.check {
        color: var(--color);
        background: var(--color-accent);
        border-color: var(--color-accent);
    }
</style>
