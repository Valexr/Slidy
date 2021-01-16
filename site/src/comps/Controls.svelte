<script>
    import { fly } from 'svelte/transition'
    import { settings, con, index } from '../utils/settings.js'
    import { clickout } from '../actions/clickout.js'
    import { slides } from '../api/items.js'
    import Svg from './Svg.svelte'

    let play = false,
        playduration = 550,
        timerPlay
    function slidyPlay() {
        if (timerPlay !== null) {
            clearInterval(timerPlay)
        }
        timerPlay = setInterval(() => $index++, playduration)
    }
    $: if ($slides)
        (!$settings.options.loop && $index >= $slides.length - 1) ||
        (!$settings.options.loop && $index <= 0)
            ? (play = false)
            : null
    $: play && $con.open ? slidyPlay() : clearInterval(timerPlay)
</script>

<section
    id="controls"
    use:clickout
    on:clickout="{() => ($con.open = false)}"
    transition:fly="{{ x: -350, duration: 350 }}"
>
    <h2>Controls</h2>
    <h3>Goto <strong>{$index}</strong> index</h3>
    <label>
        <input type="range" min="0" max="{$slides.length - 1}" step="1" bind:value="{$index}" />
    </label>
    <h3>Buttons</h3>
    <nav id="slidy-controls">
        <button class="slidy-ext-controls" on:click="{() => $index--}">
            <Svg name="slidy-back" />
        </button>
        <button class="slidy-ext-controls" class:play on:click="{() => (play = !play)}">
            {#if play}
                <Svg name="slidy-pause" />
            {:else}
                <Svg name="slidy-play" />
            {/if}
        </button>
        <button class="slidy-ext-controls" on:click="{() => $index++}">
            <Svg name="slidy-forward" />
        </button>
    </nav>
    <h3>Dots</h3>
    <nav id="dots">
        <button on:click="{() => $index--}">&#8592;</button>
        {#each $slides as dot, i}
            <button
                class:active="{i === $index}"
                on:click="{() => ($index = i)}"
                style="--imgback: url('{dot.src ? dot.src : dot.download_url}')"
            ></button>
        {/each}
        <button on:click="{() => $index++}">&#8594;</button>
    </nav>
    <h3>Thumbs</h3>
    <nav id="thumbs">
        {#each $slides as thumb, i}
            <button
                style="background-image: url({thumb.src ? thumb.src : thumb.download_url})"
                class:active="{i === $index}"
                on:click="{() => ($index = i)}">{thumb.id}</button
            >
        {/each}
    </nav>
</section>

<style lang="scss">
    #controls {
        height: 80px;
        position: fixed;
        bottom: 0;
        top: 0;
        left: 0;
        padding: 0 2rem 2rem;
        box-sizing: border-box;
        z-index: 999;
        background: rgba(255, 255, 255, 0.96);
        display: flex;
        flex-direction: column;
        width: auto;
        max-width: 300px;
        height: 100%;
        box-shadow: 0 28px 50px rgba(0, 0, 0, 0.18);
        overflow-y: auto;
        h2,
        h3 {
            color: #2c333a;
            strong {
                color: red;
                font-size: inherit;
            }
        }
    }
    :global(input[type='range']) {
        -webkit-appearance: none;
        appearance: none;
        background: rgba(0, 0, 0, 0.18);
        height: 1px;
        width: 100%;
        border-radius: 5px;
        &::-webkit-slider-thumb,
        &::-moz-range-thumb,
        &::-webkit-slider-runnable-track {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: red;
            border: 0;
            cursor: pointer;
            position: relative;
            z-index: 2;
        }
        &:focus {
            outline: none;
        }
    }
    :global(input[type='range']::-webkit-slider-thumb) {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: red;
        border: 0;
        cursor: pointer;
        position: relative;
        z-index: 2;
    }
    #slidy-controls {
        display: flex;
        justify-content: center;
        bottom: 20px;
        width: 100%;
        height: 50px;
        z-index: 1;
        top: 100px;
        .slidy-ext-controls {
            background: none;
            border: 0;
            outline: none;
            padding: 0;
            margin: 0;
            color: red;
            cursor: pointer;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:active {
                color: blue;
            }
            &.play {
                color: blue;
            }
        }
    }
    #thumbs {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        padding-bottom: 2rem;
        button {
            border: 0;
            width: 78px;
            height: 78px;
            background-size: cover;
            background-repeat: no-repeat;
            color: white;
            filter: grayscale(1) opacity(0.18);
            transition: filter 550ms;
            will-change: filter;
            outline: 0;
            &.active {
                color: red;
            }
            &.active,
            &:hover {
                filter: grayscale(0) opacity(1);
            }
        }
    }
    #dots {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        button {
            position: relative;
            flex-shrink: 0;
            flex-shrink: 0;
            border: 0;
            margin: 0;
            padding: 0;
            border-radius: 50%;
            color: red;
            width: 9px;
            height: 9px;
            transform: scale(1);
            transition: color 250, transform 250;
            cursor: pointer;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.09);
            outline: 0;
            &:first-of-type,
            &:last-of-type {
                background: none;
                width: auto;
                height: auto;
            }
            &:after {
                content: '';
                background: center var(--imgback) no-repeat;
                background-size: cover;
                width: 78px;
                height: 78px;
                display: block;
                left: -35px;
                bottom: 100%;
                transform: translate(0, 0);
                -webkit-transform: translate(0, 0);
                transition: opacity 350ms, transform 350ms;
                will-change: transform;
                opacity: 0;
                position: absolute;
                visibility: hidden;
                // filter: drop-shadow(0px 0px 9px rgba(0, 0, 0, 0.27));
            }
            &:hover,
            &:focus {
                overflow: visible;
                background: red;
                &:first-of-type,
                &:last-of-type {
                    background: none;
                }
                &:after {
                    opacity: 1;
                    transform: translate(0, -15%);
                    -webkit-transform: translate(0, -15%);
                    visibility: visible;
                }
            }
            &.active {
                transform: scale(2);
                background: red;
                &:after {
                    transform: scale(0.5) translate(0, 40%);
                    -webkit-transform: scale(0.5) translate(0, 40%);
                }
            }
        }
    }
</style>
