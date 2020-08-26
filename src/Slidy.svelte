<script>
    import { wheel } from './actions/wheel.js'
    import { pannable } from './actions/pannable.js'
    import { resizeobserver } from './actions/resizeobserver.js'
    import Spinner from './Spinner.svelte'
    import Svg from './Svg.svelte'

    export let slidys = []
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
        dotsthumbs: false,
        arrows: true,
        keys: true,
        drag: true,
        wheel: true,
    }
    export let duration = 350
    export let slidyx = Math.round(slidys.length / 2)

    $: slidyinit && slidyTo(slidyx)

    function slidyTo(i) {
        if (i < 1) {
            slidyx = arr.length
            slidyIndex(i)
        } else if (i > arr.length) {
            slidyx = 1
            slidyIndex(i)
        } else {
            slidyIndex(i)
        }
    }

    // SLIDY-INIT ---------------------------------------------------
    let arr = slidys,
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
        arr = slidys.map((s, i) => {
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
        arr = slidys.map((s, i) => {
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
        transition = duration / 2
        const nulled = () => {
            posx = sly = speed = transition = 0
            setTimeout(() => (slidyx = element.active.ix), transition)
        }
        if (posx >= element.lastwidth / 3 || speed <= -0.01) {
            posx += element.lastwidth - posx
            setTimeout(() => (prev(), nulled()), transition)
        } else if (posx <= -element.firstwidth / 3 || speed >= 0.01) {
            posx -= element.lastwidth + posx
            setTimeout(() => (next(), nulled()), transition)
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
        }, duration / 2)
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
            tracker = setInterval(() => (htx = posx), duration / 2)
            speed = (htx - posx) / duration / 2
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
            slidyx--
        } else if (e.keyCode === 39) {
            slidyx++
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
    class="svelte-slidy"
    use:resizeobserver
    on:resizeob="{resizeWrap}"
    use:wheel
    on:wheels="{controls.wheel ? slidyWheel : null}"
    style="--wrapwidth: {wrap.width}; --wrapheight: {wrap.height}; --wrappadding: {wrap.padding || 0}; --slidewidth: {slide.width}; --slideheight: {slide.height}; --slidegap: {slide.gap / 2}px; --duration: {duration}ms;"
>
    {#if !slidyinit}
        <slot name="loader">
            <Spinner size="75" speed="750" color="red" thickness="1" gap="25" />
        </slot>
    {/if}

    <ul
        class="svelte-slidy-ul"
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
            {#each arr as item, i (item.id)}
                <li bind:this="{nodes[item.id]}" class:active="{item.id === element.active.id}">
                    <slot name="slide" {item}>
                        <img alt="{item.id}" src="{item.src}" />
                    </slot>
                </li>
            {/each}
        {/if}
    </ul>

    {#if controls.arrows && slidyinit}
        <button class="svelte-slidy-arrow-left" on:click="{(e) => slidyx--}">
            <slot name="arrow-left">
                <Svg name="{'slidy-chevron-left'}" />
            </slot>
        </button>
        <button class="svelte-slidy-arrow-right" on:click="{(e) => slidyx++}">
            <slot name="arrow-right">
                <Svg name="{'slidy-chevron-right'}" />
            </slot>
        </button>
    {/if}

    {#if controls.dots && slidyinit}
        <ul class="svelte-slidy-dots" class:pure="{controls.dotspure}" class:thumbs="{controls.dotsthumbs}">
            {#if controls.dotsarrow}
                <li>
                    <button class="svelte-slidy-arrow-left" on:click="{(e) => slidyx--}">
                        <slot name="dots-arrow-letf">
                            <Svg name="{'slidy-arrow-left'}" />
                        </slot>
                    </button>
                </li>
            {/if}
            {#each dots as dot (dot.id)}
                <li class:active="{dot.id === element.active.id}" on:click="{() => (slidyx = dot.ix)}">
                    <slot name="slidy-dot" {dot}>
                        <button style="{controls.dotsthumbs ? `background-image: url(${dot.src})` : null}">{controls.dotsnum && !controls.dotspure ? dot.ix : ''}</button>
                    </slot>
                </li>
            {/each}
            {#if controls.dotsarrow}
                <li>
                    <button class="svelte-slidy-arrow-right" on:click="{(e) => slidyx++}">
                        <slot name="dots-arrow-right">
                            <Svg name="{'slidy-arrow-right'}" />
                        </slot>
                    </button>
                </li>
            {/if}
        </ul>
    {/if}
</section>

<style>
    .svelte-slidy {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        width: var(--wrapwidth);
        height: var(--wrapheight);
    }
    .svelte-slidy ul {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        margin: 0;
        border: 0;
        user-select: none;
        -webkit-user-select: none;
    }
    .svelte-slidy-ul {
        width: 100%;
        height: 100%;
        padding: var(--wrappadding);
        position: relative;
        touch-action: pan-y;
        will-change: transform;
    }
    .svelte-slidy-ul.loaded li {
        opacity: 1;
    }
    :global(.svelte-slidy img) {
        pointer-events: none;
        object-fit: cover;
        display: block;
        width: 100%;
        height: 100%;
    }
    :global(.svelte-slidy-ul.autowidth li img) {
        width: auto;
    }
    .svelte-slidy-ul li {
        flex-shrink: 0;
        max-width: 100%;
        max-height: 100%;
        position: relative;
        color: currentColor;
        transition: color var(--duration), opacity var(--duration);
        opacity: 0;
        width: var(--slidewidth);
        height: var(--slideheight);
        margin: 0 var(--slidegap);
        box-sizing: border-box;
    }
    .svelte-slidy-ul li.active {
        color: red;
    }
    .svelte-slidy-dots {
        position: absolute;
        bottom: 0;
        height: 50px;
        padding: 0;
    }
    .svelte-slidy-dots li {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .svelte-slidy-dots li.active,
    .svelte-slidy-dots li.active button {
        color: red;
    }
    .svelte-slidy-dots.pure li {
        width: 27px;
        height: 27px;
    }
    .svelte-slidy-dots.pure li button {
        border-radius: 50%;
        color: red;
        width: 9px;
        height: 9px;
        transform: scale(1);
        transition: color calc(var(--duration) / 2), transform calc(var(--duration) / 2);
        box-shadow: none;
    }
    .svelte-slidy-dots.pure li button.svelte-slidy-arrow-left,
    .svelte-slidy-dots.pure li button.svelte-slidy-arrow-right {
        background: none;
        width: auto;
        height: auto;
    }
    .svelte-slidy-dots.pure li.active button {
        transform: scale(1.8);
        background: red;
    }
    .svelte-slidy-dots.thumbs li button {
        width: 100px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        filter: grayscale(1) opacity(0.45);
        transition: filter var(--duration);
    }
    .svelte-slidy-dots.thumbs li:hover button,
    .svelte-slidy-dots.thumbs li.active button {
        filter: grayscale(0) opacity(1);
    }
    .svelte-slidy button {
        margin: 0;
        border: 0;
        padding: 0;
        border-radius: 0;
        width: 50px;
        height: 50px;
        line-height: 50px;
        color: white;
        background: rgba(0, 0, 0, 0.18);
        cursor: pointer;
        outline: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .svelte-slidy button:active {
        background: red;
        color: white;
        outline: 0;
    }
    .svelte-slidy .svelte-slidy-arrow-left {
        left: 0;
    }
    .svelte-slidy .svelte-slidy-arrow-right {
        right: 0;
    }
    .svelte-slidy .svelte-slidy-arrow-right,
    .svelte-slidy .svelte-slidy-arrow-left {
        position: absolute;
        color: white;
        cursor: pointer;
    }
    .svelte-slidy-dots li button.svelte-slidy-arrow-left,
    .svelte-slidy-dots li button.svelte-slidy-arrow-right {
        position: relative;
    }
</style>
