<script>
    import { afterUpdate, tick } from 'svelte'
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
        align: 'middle',
        alignmargin: 0,
    }
    export let slide = {
        gap: 0,
        class: '',
        width: '50vw',
        height: '100%',
        backimg: false,
        imgsrckey: 'src',
        objectfit: 'cover',
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
    export let options = {
        axis: 'x',
        loop: true,
        duration: 350,
    }
    export let loader = {
        color: 'red',
        size: 75,
        thickness: 1,
        speed: options.duration,
    }
    export let index = Math.floor(slides.length / 2)
    export let slidyinit = false

    $: if (index < 0) {
        if (options.loop) {
            index = slides.length - 1
            i = slides.length
        } else {
            index = 0
        }
    } else if (index > slides.length - 1) {
        if (options.loop) {
            index = 0
            i = -1
        } else {
            index = slides.length - 1
        }
    }

    $: slidyinit && slidyIndex(index)

    // SLIDY-INIT ---------------------------------------------------
    let nodes = {},
        dots = slides

    let element = {
            active: null,
            activewidth: null,
            activeheight: null,
            first: null,
            firstwidth: null,
            firstheight: null,
            last: null,
            lastwidth: null,
            lastheight: null,
            beforewidth: null,
            beforeheight: null,
            afterwidth: null,
            afterheight: null,
            fullwidth: null,
            fullheight: null,
        },
        firstsize,
        lastsize,
        activesize,
        beforesize,
        aftersize,
        wrapsize,
        aligndiff,
        diffsize

    $: element = {
        active: slides[options.loop ? Math.floor(slides.length / 2) : index],
        activewidth: slides[index].width + slide.gap,
        activeheight: slides[index].height + slide.gap,
        first: slides[0],
        firstwidth: slides[0].width + slide.gap,
        firstheight: slides[0].height + slide.gap,
        last: slides[slides.length - 1],
        lastwidth: slides[slides.length - 1].width + slide.gap,
        lastheight: slides[slides.length - 1].height + slide.gap,
        beforewidth: slides.map((a, i) => (i < index ? a.width + slide.gap : null)).reduce((p, v) => p + v),
        beforeheight: slides.map((a, i) => (i < index ? a.height + slide.gap : null)).reduce((p, v) => p + v),
        afterwidth: slides.map((a, i) => (i > index ? a.width + slide.gap : null)).reduce((p, v) => p + v),
        afterheight: slides.map((a, i) => (i > index ? a.height + slide.gap : null)).reduce((p, v) => p + v),
        fullwidth: slides.reduce((p, v) => p + v.width + slide.gap, 0),
        fullheight: slides.reduce((p, v) => p + v.height + slide.gap, 0),
    }
    $: firstsize = options.axis === 'y' ? element.firstheight : element.firstwidth
    $: lastsize = options.axis === 'y' ? element.lastheight : element.lastwidth
    $: activesize = options.axis === 'y' ? element.activeheight : element.activewidth
    $: beforesize = options.axis === 'y' ? element.beforeheight : element.beforewidth
    $: aftersize = options.axis === 'y' ? element.afterheight : element.afterwidth
    $: wrapsize = options.axis === 'y' ? wrapheight : wrapwidth
    $: aligndiff = (wrapsize - activesize + slide.gap) / 2 - wrap.alignmargin
    $: diffsize = (beforesize - aftersize) / 2 - pos

    // LOADSTATE-CHECK -------------------------------------------------
    afterUpdate(() => slidyInit())
    function slidyInit() {
        slides = dots = slides.map((s, i) => ({
            ix: i,
            ...s,
            width: nodes[s.id].clientWidth,
            height: nodes[s.id].clientHeight,
        }))
        setTimeout(() => (slidyinit = true), 1000)
    }

    // RESIZE-OBSERVER ----------------------------------------------
    let wrapwidth, wrapheight
    function resizeWrap(e) {
        wrapwidth = e.detail.CR.width
        wrapheight = e.detail.CR.height
    }

    // CONTROLS & ANIMATION -----------------------------------------
    let pos = 0,
        comp = 0,
        translate = 0,
        transition = options.duration

    $: move = () => {
        if (options.axis === 'y') {
            return `transform: translate(0, ${translate}px); top: ${comp}px;`
        } else {
            return `transform: translate(${translate}px, 0); left: ${comp}px;`
        }
    }

    $: if (wrap.align === 'end') {
        translate = slides.length % 2 === 0 ? (options.loop ? pos + aligndiff - activesize / 2 : -diffsize + aligndiff) : options.loop ? pos + aligndiff : -diffsize + aligndiff
    } else if (wrap.align === 'start') {
        translate = slides.length % 2 === 0 ? (options.loop ? pos - aligndiff - activesize / 2 : -diffsize - aligndiff) : options.loop ? pos - aligndiff : -diffsize - aligndiff
    } else {
        translate = slides.length % 2 === 0 ? (options.loop ? pos - activesize / 2 : -diffsize) : options.loop ? pos : -diffsize
    }

    function prev() {
        slides = [slides[slides.length - 1], ...slides.slice(0, -1)]
    }
    function next() {
        slides = [...slides.slice(1), slides[0]]
    }

    // INDEX ------------------------------------------------------
    let i = Math.floor(slides.length / 2)
    function slidyIndex(id) {
        while (i > id) {
            transition = options.duration
            if (options.loop) {
                pos += lastsize
                comp = -pos
                prev()
            } else {
                null
            }
            i--
        }
        while (i < id) {
            transition = options.duration
            if (options.loop) {
                pos -= firstsize
                comp = -pos
                next()
            } else {
                null
            }
            i++
        }
    }

    // SLIDY ------------------------------------------------------
    function slidyLoop() {
        if (pos >= lastsize) {
            if (options.loop) {
                prev()
            } else {
                index = i -= 1
            }
            pos = 0
        } else if (pos <= -firstsize) {
            if (options.loop) {
                next()
            } else {
                index = i += 1
            }
            pos = 0
        }
        if (options.loop) {
            index = i = element.active.ix
        } else {
            pos >= beforesize || pos <= -aftersize ? (pos = pos / 1.5) : (pos = pos)
        }
    }

    function slidyStop() {
        transition = options.duration / 2
        const nulled = (direct) => {
            if (direct) {
                if (options.loop) {
                    direct()
                    pos = speed = transition = 0
                    tick().then(() => (index = i = element.active.ix))
                } else {
                    index = direct
                    pos = speed = 0
                }
            } else {
                pos = comp = speed = 0
            }
        }
        if (pos >= lastsize / 3 || speed < 0) {
            if (options.loop) {
                pos += lastsize - pos
                setTimeout(() => nulled(prev), transition)
            } else {
                nulled((i = index -= 1))
            }
        } else if (pos <= -firstsize / 3 || speed > 0) {
            if (options.loop) {
                pos -= firstsize + pos
                setTimeout(() => nulled(next), transition)
            } else {
                nulled((i = index += 1))
            }
        } else {
            nulled()
        }
    }

    function slidyNull() {
        if (comp !== 0) comp = pos = 0
    }

    // WHEELL -----------------------------------------------------
    let iswheel = false,
        wheeltime
    function slidyWheel(e) {
        slidyNull()
        iswheel = true
        transition = 0
        if (options.axis === 'y') {
            pos += -e.detail.dy
        } else {
            pos += -e.detail.dx
        }
        slidyLoop()
        if (wheeltime !== null) {
            clearTimeout(wheeltime)
        }
        wheeltime = setTimeout(() => {
            iswheel = false
            clearTimeout(wheeltime)
            slidyStop()
        }, options.duration / 2)
    }

    // DRAG -------------------------------------------------------
    let isdrag = false,
        htx = 0,
        speed = 0,
        tracker
    function dragStart() {
        slidyNull()
        isdrag = true
        transition = 0
        if (tracker !== null) {
            clearInterval(tracker)
        }
    }
    function dragSlide(e) {
        if (isdrag) {
            if (options.axis === 'y') {
                pos += e.detail.dy
            } else {
                pos += e.detail.dx
            }
            slidyLoop()
            tracker = setInterval(() => (htx = pos), options.duration / 2)
            speed = (htx - pos) / options.duration / 2
        }
    }
    function dragStop() {
        isdrag = false
        clearInterval(tracker)
        slidyStop()
    }

    // KEYS -------------------------------------------------------
    function slidyKeys(e) {
        if (e.keyCode === 37 || e.keyCode === 38) {
            index--
        } else if (e.keyCode === 39 || e.keyCode === 40) {
            index++
        }
    }
</script>

<section
    role="region"
    tabindex="0"
    aria-label="Slidy"
    id="{wrap.id}"
    class="slidy"
    class:loaded="{slidyinit}"
    class:axisy="{options.axis === 'y'}"
    class:autowidth="{slide.width === 'auto'}"
    class:antiloop="{options.loop === false}"
    class:alignmiddle="{wrap.align === 'middle'}"
    class:alignstart="{wrap.align === 'start'}"
    class:alignend="{wrap.align === 'end'}"
    use:resizeobserver
    on:resize="{resizeWrap}"
    use:wheel
    on:wheels="{controls.wheel ? slidyWheel : null}"
    on:keydown="{controls.keys ? slidyKeys : null}"
    style="--wrapw: {wrap.width}; --wraph: {wrap.height}; --wrapp: {wrap.padding || 0}; --slidew: {slide.width}; --slideh: {slide.height}; --slidef: {slide.objectfit || 'cover'}; --slideg: {options.axis === 'y' ? `${slide.gap / 2}px 0` : `0 ${slide.gap / 2}px`}; --dur: {options.duration}ms;"
>
    {#if !slidyinit}
        <slot name="loader">
            <Spinner size="{loader.size}" speed="{loader.speed}" color="{loader.color}" thickness="{loader.thickness}" gap="25" />
        </slot>
    {/if}

    <ul
        class="slidy-ul"
        use:pannable
        on:panstart="{controls.drag ? dragStart : null}"
        on:panmove="{controls.drag ? dragSlide : null}"
        on:panend="{controls.drag ? dragStop : null}"
        on:contextmenu="{() => (isdrag = false)}"
        style="{move()}; transition: transform {transition}ms; {options.axis === 'y' ? `height: ${element.fullheight}px;` : `width: ${element.fullwidth}px;`}"
    >
        {#if slides}
            {#each slides as item, i (item.id)}
                <li bind:this="{nodes[item.id]}" class="{slide.class}" class:active="{item.ix === index}" style="{slide.backimg === true ? `background-image: url(${item[slide.imgsrckey]})` : null}">
                    <slot item="{item}">
                        {#if slide.backimg === false}<img alt="{item.id}" src="{slide.imgsrckey ? item[slide.imgsrckey] : item.src}" width="{item.width}" height="{item.height}" />{/if}
                    </slot>
                </li>
            {/each}
        {/if}
    </ul>

    {#if controls.arrows && slidyinit}
        <button class="arrow-left" on:click="{() => index--}">
            <slot name="arrow-left">&#8592;</slot>
        </button>
        <button class="arrow-right" on:click="{() => index++}">
            <slot name="arrow-right">&#8594;</slot>
        </button>
    {/if}

    {#if controls.dots && slidyinit}
        <ul class="slidy-dots" class:pure="{controls.dotspure}">
            {#if controls.dotsarrow}
                <li class="dots-arrow-left" on:click="{() => index--}">
                    <slot name="dots-arrow-left"><button>&#8592;</button></slot>
                </li>
            {/if}
            {#each dots as dot, i}
                <li class:active="{i === index}" on:click="{() => (index = i)}">
                    <slot name="dot" dot="{dot}"><button>{controls.dotsnum && !controls.dotspure ? i : ''}</button></slot>
                </li>
            {/each}
            {#if controls.dotsarrow}
                <li class="dots-arrow-right" on:click="{() => index++}">
                    <slot name="dots-arrow-right"><button>&#8594;</button></slot>
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
        outline: 0;
    }
    .slidy ul {
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        list-style: none;
        margin: 0;
        border: 0;
        user-select: none;
        -webkit-user-select: none;
    }
    .slidy-ul {
        width: 100vw;
        height: 100vh;
        padding: var(--wrapp);
        position: relative;
        touch-action: pan-y;
        will-change: transform;
    }
    .slidy.loaded .slidy-ul li {
        opacity: 1;
    }
    .slidy.axisy .slidy-ul {
        flex-direction: column;
    }
    :global(.slidy-ul li img) {
        pointer-events: none;
        object-fit: var(--slidef);
        display: block;
        width: 100vw;
        height: 100vh;
    }
    :global(.slidy.autowidth .slidy-ul li img) {
        width: auto;
    }
    .slidy-ul li {
        flex-shrink: 0;
        max-width: 100vw;
        max-height: 100vh;
        position: relative;
        overflow: hidden;
        opacity: 0;
        transition: color var(--dur), opacity var(--dur);
        width: var(--slidew);
        height: var(--slideh);
        margin: var(--slideg);
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-position: center;
        background-size: var(--slidef);
        background-color: rgba(0, 0, 0, 0);
    }
    .slidy button {
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
    .slidy button:active {
        outline: 0;
    }
    .slidy li.active,
    .slidy li.active button {
        color: red;
        /* z-index: 1; */
    }
    .slidy-dots {
        position: absolute;
        bottom: 0;
        height: 50px;
        padding: 0;
        width: 100vw;
    }
    .slidy.axisy .slidy-dots {
        bottom: auto;
        right: 0;
        width: 50px;
        height: 100vh;
        flex-direction: column;
    }
    .slidy-dots li {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .slidy.axisy .dots-arrow-left,
    .slidy.axisy .dots-arrow-right {
        transform: rotate(90deg);
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
