<script>
    import { wheel } from './actions/wheel.js'
    import { pannable } from './actions/pannable.js'
    import { resizeobserver } from './actions/resizeobserver.js'
    import Spinner from './Spinner.svelte'

    export let slides = []
    export let wrap = {
        id: null,
        width: '100%',
        height: '50vh',
        padding: '0',
    }
    export let slide = {
        gap: 0,
        width: 'auto',
        height: '100%',
    }
    export let controls = {
        dots: true,
        dotsnum: true,
        dotsarrow: true,
        dotspure: false,
        arrows: true,
        keys: true,
        drag: true,
        wheel: true,
    }
    export let duration = 350
    export let loader = {
        color: 'red',
        size: 75,
        thickness: 1,
        speed: duration,
    }
    export let index = Math.round(slides.length / 2)

    $: slidyinit && slidyTo(index)

    function slidyTo(i) {
        if (i < 1) {
            index = arr.length
            slidyIndex(i)
        } else if (i > arr.length) {
            index = 1
            slidyIndex(i)
        } else {
            slidyIndex(i)
        }
    }

    // SLIDY-INIT ---------------------------------------------------
    let arr = slides,
        dots = arr,
        nodes = []

    $: element = {
        active: arr[Math.floor(arr.length / 2)],
        activewidth: arr[Math.floor(arr.length / 2)].width + slide.gap,
        first: arr[0],
        firstwidth: arr[0].width + slide.gap,
        last: arr[arr.length - 1],
        lastwidth: arr[arr.length - 1].width + slide.gap,
        beforewidth: arr.map((a, i) => (i < Math.floor(arr.length / 2) ? a.width + slide.gap : null)).reduce((p, v) => p + v),
        afterwidth: arr.map((a, i) => (i > Math.floor(arr.length / 2) ? a.width + slide.gap : null)).reduce((p, v) => p + v),
    }
    $: diff = (element.beforewidth - element.afterwidth) / 2

    let slidyinit = false
    function slidyLoad() {
        arr = slides.map((s, i) => {
            return {
                ix: i + 1,
                ...s,
                width: nodes[s.id].clientWidth,
                height: nodes[s.id].clientHeight,
            }
        })
        dots = arr
        slidyinit = true
    }

    // RESIZE-OBSERVER ----------------------------------------------
    function resizeWrap(e) {
        arr = slides.map((s, i) => {
            return {
                ix: i + 1,
                ...s,
                width: nodes[s.id].clientWidth,
                height: nodes[s.id].clientHeight,
            }
        })
    }

    // CONTROLS & ANIMATION -----------------------------------------
    let sly = 0,
        posx = 0,
        left = 0,
        translate = 0,
        transition = 0

    const move = (x, y, l) => `transform: translate(${x}px, ${y}px); left: ${l}px`

    $: translate = posx
    $: left = -sly

    function prev() {
        arr = [arr[arr.length - 1], ...arr.slice(0, -1)]
    }
    function next() {
        arr = [...arr.slice(1), arr[0]]
    }

    function slidyPrev() {
        posx += element.lastwidth
        transition = duration
        slidyX()
    }
    function slidyNext() {
        posx -= element.firstwidth
        transition = duration
        slidyX()
    }

    let count = 0
    function slidyX() {
        if (count === posx) {
            return
        } else if (count < posx) {
            sly = posx
            prev()
        } else if (count > posx) {
            sly = posx
            next()
        }
        count = posx
    }

    // SLIDY ------------------------------------------------------
    function slidy() {
        if (posx >= element.lastwidth) {
            prev()
            posx = 0
        } else if (posx <= -element.firstwidth) {
            next()
            posx = 0
        }
    }

    function slidyStop() {
        transition = duration / 3
        const nulled = () => {
            posx = sly = speed = 0
            setTimeout(() => (index = element.active.ix), transition)
        }
        if (posx >= element.lastwidth / 3 || speed <= -0.005) {
            posx += element.lastwidth - posx
            setTimeout(() => (prev(), nulled(), (transition = 0)), transition)
        } else if (posx <= -element.firstwidth / 3 || speed >= 0.005) {
            posx -= element.lastwidth + posx
            setTimeout(() => (next(), nulled(), (transition = 0)), transition)
        } else {
            nulled()
        }
    }
    function toDefault() {
        if (sly !== 0) sly = posx = count = 0
    }

    // WHEELL -----------------------------------------------------
    let iswheel = 0
    function slidyWheel(e) {
        posx += -e.detail.dx
        transition = 0
        toDefault()
        slidy()
        if (iswheel !== null) {
            clearTimeout(iswheel)
        }
        iswheel = setTimeout(() => {
            slidyStop()
        }, duration / 3)
    }

    // DRAG -------------------------------------------------------
    let isdrag = false,
        htx,
        tracker,
        speed
    function dragStart(e) {
        isdrag = true
        transition = 0
        toDefault()
        if (tracker !== null) {
            clearInterval(tracker)
        }
    }
    function dragSlide(e) {
        if (isdrag) {
            posx += e.detail.dx
            slidy()
            tracker = setInterval(() => (htx = posx), duration / 3)
            speed = (htx - posx) / duration / 3
        }
    }
    function dragStop(e) {
        isdrag = false
        clearInterval(tracker)
        slidyStop()
    }

    // KEYS -------------------------------------------------------
    function slidyKeys(e) {
        if (e.keyCode === 37) {
            index--
        } else if (e.keyCode === 39) {
            index++
        }
    }

    // INDEX -----------------------------------------------------
    function slidyIndex(id) {
        let i = element.active.ix
        if (id < i && i !== element.first.ix) {
            i = element.active.ix - 1
            while (i >= id) {
                slidyPrev()
                i--
            }
        } else if (id > i && i !== element.last.ix) {
            i = element.active.ix + 1
            while (i <= id) {
                slidyNext()
                i++
            }
        }
    }
    $: stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(stateCheck)
            slidyLoad()
        }
    }, 100)
</script>

<svelte:window on:keydown="{controls.keys ? slidyKeys : ''}" />
<section
    id="{wrap.id}"
    class="slidy"
    use:resizeobserver
    on:resize="{resizeWrap}"
    use:wheel
    on:wheels="{controls.wheel ? slidyWheel : null}"
    style="--wrapw: {wrap.width}; --wraph: {wrap.height}; --wrapp: {wrap.padding || 0}; --slidew: {slide.width}; --slideh: {slide.height}; --slideg: {slide.gap / 2}px; --dur: {duration}ms;"
>
    {#if !slidyinit}
        <slot name="loader">
            <Spinner size="{loader.size}" speed="{loader.speed}" color="{loader.color}" thickness="{loader.thickness}" gap="25" />
        </slot>
    {/if}

    <ul
        class="slidy-ul"
        class:loaded="{slidyinit}"
        class:autowidth="{slide.width === 'auto'}"
        use:pannable
        on:panstart="{controls.drag ? dragStart : null}"
        on:panmove="{controls.drag ? dragSlide : null}"
        on:panend="{controls.drag ? dragStop : null}"
        on:contextmenu="{() => (isdrag = false)}"
        style="{move(translate - diff, 0, left)}; transition: transform {transition}ms;"
    >
        {#if arr.length > 0}
            {#each arr as slide, i (slide.id)}
                <li bind:this="{nodes[slide.id]}" class:active="{slide.id === element.active.id}">
                    <slot {slide}>
                        <img alt="{slide.id}" src="{slide.src}" />
                    </slot>
                </li>
            {/each}
        {/if}
    </ul>

    {#if controls.arrows && slidyinit}
        <button class="arrow-left" on:click="{(e) => index--}">
            <slot name="arrow-left">&#8592;</slot>
        </button>
        <button class="arrow-right" on:click="{(e) => index++}">
            <slot name="arrow-right">&#8594;</slot>
        </button>
    {/if}

    {#if controls.dots && slidyinit}
        <ul class="slidy-dots" class:pure="{controls.dotspure}">
            {#if controls.dotsarrow}
                <li class="dots-arrow-left" on:click="{(e) => index--}">
                    <slot name="dots-arrow-left">
                        <button>&#8592;</button>
                    </slot>
                </li>
            {/if}
            {#each dots as dot (dot.id)}
                <li class:active="{dot.id === element.active.id}" on:click="{() => (index = dot.ix)}">
                    <slot name="dot" {dot}>
                        <button>{controls.dotsnum && !controls.dotspure ? dot.ix : ''}</button>
                    </slot>
                </li>
            {/each}
            {#if controls.dotsarrow}
                <li class="dots-arrow-right" on:click="{(e) => index++}">
                    <slot name="dots-arrow-right">
                        <button>&#8594;</button>
                    </slot>
                </li>
            {/if}
        </ul>
    {/if}
</section>

<style>
    .slidy {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        width: var(--wrapw);
        height: var(--wraph);
    }
    .slidy ul {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        margin: 0;
        border: 0;
        user-select: none;
        -webkit-user-select: none;
    }
    .slidy-ul {
        width: 100%;
        height: 100%;
        padding: var(--wrapp);
        position: relative;
        touch-action: pan-y;
        will-change: transform;
    }
    .slidy-ul.loaded li {
        opacity: 1;
    }
    :global(.slidy-ul li img) {
        pointer-events: none;
        object-fit: cover;
        display: block;
        width: 100%;
        height: 100%;
    }
    :global(.slidy-ul.autowidth li img) {
        width: auto;
    }
    .slidy-ul li {
        flex-shrink: 0;
        max-width: 100%;
        max-height: 100%;
        position: relative;
        color: currentColor;
        transition: color var(--dur), opacity var(--dur);
        opacity: 0;
        width: var(--slidew);
        height: var(--slideh);
        margin: 0 var(--slideg);
        box-sizing: border-box;
    }
    .slidy li.active {
        color: red;
    }
    .slidy-dots {
        position: absolute;
        bottom: 0;
        height: 50px;
        padding: 0;
    }
    .slidy-dots li {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .slidy-dots.pure li {
        width: 27px;
        height: 27px;
        background: none;
    }
    .slidy-dots.pure li button {
        border-radius: 50%;
        color: red;
        width: 9px;
        height: 9px;
        transform: scale(1);
        transition: color calc(var(--dur) / 2), transform calc(var(--dur) / 2);
    }
    .slidy-dots.pure li.active button {
        transform: scale(1.8);
        background: red;
    }
    .slidy button {
        margin: 0;
        border: 0;
        padding: 0;
        border-radius: 0;
        width: 50px;
        height: 50px;
        line-height: 50px;
        color: inherit;
        background: rgba(0, 0, 0, 0.18);
        cursor: pointer;
        outline: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .slidy button:active {
        background: red;
        color: white;
        outline: 0;
    }
    .arrow-left,
    .dots-arrow-left {
        left: 0;
    }
    .arrow-right,
    .dots-arrow-right {
        right: 0;
    }
    .arrow-right,
    .arrow-left {
        position: absolute;
    }
    .slidy-dots.pure .dots-arrow-left button,
    .slidy-dots.pure .dots-arrow-right button {
        background: none;
        width: auto;
        height: auto;
    }
    .dots-arrow-left,
    .dots-arrow-right {
        width: 50px;
        height: 50px;
    }
</style>
