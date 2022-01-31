<svelte:window on:keydown={$set.open ? onKeydown : null} />

<section
    id="settings"
    use:clickout
    on:clickout={() => ($set.open = false)}
    transition:fly={{ x: 350, duration: 350 }}
>
    <h2>Settings</h2>
    <pre>
        <code
            contenteditable="true"
            bind:textContent={text}
            on:input={() => ($set.input = true)}
        />
    </pre>
</section>

<script>
    import { fly } from 'svelte/transition';
    import { settings, set } from '@settings';
    import { clickout } from '@act';

    let text = JSON.stringify($settings, 0, 2);

    export let open = false,
        input = false,
        check = false;

    $: check && setSettings();

    function onKeydown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            if (input) {
                check = !check;
                input = false;
            }
        } else if (e.keyCode === 27) {
            e.preventDefault();
            check = !check;
            input = false;
            open = !open;
        }
    }

    function setSettings() {
        $settings = JSON.parse(text);
        check = !check;
    }
</script>

<style lang="scss">
    #settings {
        height: 80px;
        position: fixed;
        bottom: 0;
        top: 0;
        right: 0;
        padding: 0 2rem;
        box-sizing: border-box;
        z-index: 999;
        background: rgba(255, 255, 255, 0.96);
        display: flex;
        flex-direction: column;
        width: auto;
        height: 100%;
        box-shadow: 0 28px 50px rgba(0, 0, 0, 0.18);
        h2 {
            color: #2c333a;
        }
        pre {
            overflow-y: auto;
            code {
                color: #2c333a;
                outline: none;
                font-family: monospace;
                &::-moz-selection {
                    background: yellow;
                }
                &::selection {
                    background: yellow;
                }
            }
        }
    }
</style>
