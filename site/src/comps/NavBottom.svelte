<script>
    import { settings } from '../utils/settings.js'

    let align = 1,
        alignvals = ['start', 'middle', 'end']

    $: switch (align) {
        case 0:
            $settings.wrap.align = 'start'
            break
        case 1:
            $settings.wrap.align = 'middle'
            break
        case 2:
            $settings.wrap.align = 'end'
            break
        default:
            $settings.wrap.align = 'middle'
            break
    }
</script>

<nav id="slidy-controls-bottom">
    <label id="slidy-align">
        <div>
            {#each alignvals as val, i}
                <span class:active="{i === align}" on:click="{() => (align = i)}">{val}</span>
            {/each}
        </div>
        <input type="range" min="0" max="2" step="1" bind:value="{align}" />
    </label>
</nav>

<style lang="scss">
    #slidy-controls-bottom {
        position: fixed;
        display: flex;
        justify-content: center;
        bottom: 100px;
        width: 100%;
        height: 50px;
        #slidy-align {
            div {
                display: flex;
                width: 180px;
                justify-content: space-between;
                span {
                    cursor: pointer;
                    &.active {
                        color: var(--color-active);
                    }
                }
            }
            input[type='range'] {
                width: 180px;
                &::-webkit-slider-thumb,
                &::-moz-range-thumb,
                &::-webkit-slider-runnable-track {
                    width: 0;
                    height: 0;
                    border-left: 15px solid transparent;
                    border-right: 15px solid transparent;
                    border-bottom: 15px solid var(--color-active);
                    background: transparent;
                    margin-bottom: -100px;
                    top: -100px;
                }
            }
        }
    }
    input[type='range']::-webkit-slider-thumb {
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 15px solid var(--color-active);
        background: transparent;
    }
</style>
