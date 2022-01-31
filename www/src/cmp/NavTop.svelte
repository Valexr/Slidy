<nav id="slidy-controls">
    <div>
        <button class="slidy-ext-controls" on:click={setLoop}>
            <Svg
                name="slidy-repeat"
                transform="scale(0.69)"
                color={setColor($settings.options.loop)}
            />
        </button>
        <button class="slidy-ext-controls" on:click={() => index--}>
            <Svg name="slidy-back" />
        </button>
        <button
            class="slidy-ext-controls"
            class:play
            on:click={() => (play = !play)}
        >
            <Svg name={play ? 'slidy-pause' : 'slidy-play'} />
        </button>
        <button class="slidy-ext-controls" on:click={() => index++}>
            <Svg name="slidy-forward" />
        </button>
        <button
            class="slidy-ext-controls"
            on:click={() =>
                ($settings.options.intersecting =
                    !$settings.options.intersecting)}
        >
            <Svg
                name={!$settings.options.intersecting
                    ? 'slidy-eye-off'
                    : 'slidy-eye'}
                transform="scale(0.69)"
                color={$settings.options.intersecting ? 'blue' : 'white'}
            />
        </button>
    </div>
    <div>
        <button class="slidy-ext-controls" on:click={() => limit--}>
            <Svg name="slidy-mines" />
        </button>
        <button
            class="slidy-ext-controls"
            on:click={() => (page = randomQ(0, 96))}
        >
            <Svg name="slidy-refresh" />
        </button>
        <button class="slidy-ext-controls" on:click={() => limit++}>
            <Svg name="slidy-plus" />
        </button>
    </div>
</nav>

<script>
    import { settings } from '@settings';
    import { randomQ } from '@utils';
    import { Svg } from '@cmp';

    export let limit = 9,
        page = 25,
        index,
        slides = [];

    let play = false,
        playduration = 550,
        timerPlay,
        loop = false;

    function slidyPlay() {
        if (timerPlay !== null) {
            clearInterval(timerPlay);
        }
        timerPlay = setInterval(() => index++, playduration);
    }
    function setLoop() {
        $settings.options.loop = !$settings.options.loop;
    }
    const setColor = (opt) => (opt ? 'blue' : 'white');

    $: if (
        (!$settings.options.loop && index >= slides.length - 1) ||
        (!$settings.options.loop && index <= 0)
    )
        play = false;
    $: play ? slidyPlay() : clearInterval(timerPlay);
</script>

<style lang="scss">
    #slidy-controls {
        display: flex;
        flex-direction: column;
        bottom: 20px;
        width: 100%;
        height: 100px;
        position: fixed;
        z-index: 1;
        top: 100px;
        div {
            display: flex;
            width: 100%;
            height: 50px;
            flex-direction: row;
            justify-content: center;
        }
        .slidy-ext-controls {
            background: none;
            border: 0;
            outline: none;
            padding: 0;
            margin: 0;
            color: var(--color-active);
            cursor: pointer;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:active {
                color: var(--color-accent);
            }
            &.play {
                color: var(--color-accent);
            }
        }
    }
</style>
