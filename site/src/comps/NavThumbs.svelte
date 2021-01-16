<script>
    import { settings, index } from '../utils/settings.js'
    import { slides } from '../api/items.js'
</script>

<nav id="thumbs" class:axisx="{!$settings.options.axisy}">
    {#each $slides as dot, i (dot.id)}
        <button
            style="background-image: url({dot.src ? dot.src : dot.download_url})"
            class:active="{i === $index}"
            on:click="{() => ($index = i)}">{dot.id}</button
        >
    {/each}
</nav>

<style lang="scss">
    #thumbs {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 1;
        button {
            flex: 1;
            border: 0;
            height: 100px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            color: var(--color);
            filter: grayscale(1) opacity(0.18);
            transition: filter 550ms;
            will-change: filter;
            outline: 0;
            &.active {
                color: var(--color-active);
            }
            &.active,
            &:hover {
                filter: grayscale(0) opacity(1);
                color: var(--color-active);
            }
        }
        &.axisx {
            flex-flow: column;
            top: 0;
            width: 100px;
            z-index: 1;
            right: 0;
        }
    }
</style>
