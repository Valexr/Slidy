<aside class="side-menu" class:open>
    <div
        class="backdrop"
        title="Close sidebar"
        aria-label="Close sidebar"
        on:click={close}
        tabindex="0"
    />
    <section class="contents">
        <slot />
    </section>
</aside>

<svelte:window on:keydown={handleKeydown} />

<script lang="ts">
    export let open = false;

    const close = () => (open = !open);
    const handleKeydown = (event: KeyboardEvent) =>
        event.code === 'Escape' && close();
</script>

<style>
    .side-menu {
        --side-menu-duration: 250ms;

        display: flex;
        flex-flow: row nowrap;
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        max-width: 100%;
        height: 100vh;
        overflow-y: auto;
        overscroll-behavior-y: contain;
        z-index: 10;

        visibility: hidden;
        will-change: transform;
        transform: translateX(110vw);
        transition: transform var(--side-menu-duration) ease-in-out,
            visibility var(--side-menu-duration) linear;
    }

    .side-menu.open {
        visibility: visible;
        transform: translateX(0);
    }

    .backdrop {
        height: 100vh;
        width: auto;
        flex-grow: 1;
        transition: background-color var(--side-menu-duration) linear
            var(--side-menu-duration);
        z-index: 9;
    }

    .side-menu.open .backdrop {
        background-color: rgb(0 0 0 / 0.75);
    }

    .contents {
        width: max-content;
        margin-left: auto;
        overflow-y: auto;
        overscroll-behavior-y: contain;
        z-index: 11;
    }

    @media (prefers-reduced-motion: reduce) {
        .side-menu {
            --side-menu-duration: 1ms;
        }
    }
</style>
