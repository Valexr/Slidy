<script>
    import { onMount, afterUpdate, tick } from 'svelte'
    import { spring } from 'svelte/motion'
    import { wheel } from './actions/wheel.js'
    import { pannable } from './actions/pannable.js'
    import { resize } from './actions/resize.js'
    import { intersection } from './actions/intersection.js'

    export let slides = []
    export let wrap = {
        id: null,
        width: '100%',
        height: '50%',
        padding: '0',
        align: 'middle',
        alignmargin: 0,
    }
    export let slide = {
        gap: 0,
        class: '',
        width: '50%',
        height: '100%',
        backimg: true,
        imgsrckey: 'src',
        objectfit: 'cover',
        overflow: 'hidden',
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
        axisy: false,
        loop: true,
        duration: 350,
        intersecting: false,
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

    $: slidyinit, slidyIndex(index)

    // SLIDY-INIT ---------------------------------------------------
    let nodes = [],
        dots = slides

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
        beforewidth: slides
            .map((a, i) => (i < index ? a.width + slide.gap : null))
            .reduce((p, v) => p + v),
        beforeheight: slides
            .map((a, i) => (i < index ? a.height + slide.gap : null))
            .reduce((p, v) => p + v),
        afterwidth: slides
            .map((a, i) => (i > index ? a.width + slide.gap : null))
            .reduce((p, v) => p + v),
        afterheight: slides
            .map((a, i) => (i > index ? a.height + slide.gap : null))
            .reduce((p, v) => p + v),
        fullwidth: slides.reduce((p, v) => p + v.width + slide.gap, 0),
        fullheight: slides.reduce((p, v) => p + v.height + slide.gap, 0),
    }
    $: firstsize = options.axisy ? element.firstheight : element.firstwidth
    $: lastsize = options.axisy ? element.lastheight : element.lastwidth
    $: activesize = options.axisy ? element.activeheight : element.activewidth
    $: beforesize = options.axisy ? element.beforeheight : element.beforewidth
    $: aftersize = options.axisy ? element.afterheight : element.afterwidth
    $: fullsize = options.axisy ? element.fullheight : element.fullwidth
    $: wrapsize = options.axisy ? wrapheight : wrapwidth
    $: aligndiff = (wrapsize - activesize + slide.gap) / 2 - wrap.alignmargin
    $: diffsize = (beforesize - aftersize) / 2 - pos

    // LOADSTATE-CHECK -------------------------------------------------
    afterUpdate(() => slidyInit())

    function slidyInit() {
        // let t0 = performance.now()
        slides = dots = slides.map((s, i) => ({
            ix: i,
            ...s,
            width: nodes[i].offsetWidth,
            height: nodes[i].offsetHeight,
        }))
        // let t1 = performance.now()
        // console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.')
        setTimeout(() => (slidyinit = true), 1000)
        // tick().then(() => (slidyinit = true))
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
        transition = options.duration,
        coords = spring({ x: 0, y: 0 }, { stiffness: 0.05, damping: 0.5 })

    $: move = () => {
        return options.axisy
            ? `transform: translate(0, ${translate}px); top: ${comp}px;`
            : `transform: translate(${translate}px, 0); left: ${comp}px;`
    }

    $: if (wrap.align === 'end') {
        translate =
            slides.length % 2 === 0
                ? options.loop
                    ? pos + aligndiff - activesize / 2
                    : -diffsize + aligndiff
                : options.loop
                ? pos + aligndiff
                : -diffsize + aligndiff
    } else if (wrap.align === 'start') {
        translate =
            slides.length % 2 === 0
                ? options.loop
                    ? pos - aligndiff - activesize / 2
                    : -diffsize - aligndiff
                : options.loop
                ? pos - aligndiff
                : -diffsize - aligndiff
    } else {
        translate =
            slides.length % 2 === 0
                ? options.loop
                    ? pos - activesize / 2
                    : -diffsize
                : options.loop
                ? pos
                : -diffsize
        // comp = diffsize
    }
    // $: translate =
    //     wrap.align === 'end'
    //         ? slides.length % 2 === 0
    //             ? pos + aligndiff - activesize / 2
    //             : pos + aligndiff
    //         : wrap.align === 'start'
    //         ? slides.length % 2 === 0
    //             ? pos - aligndiff - activesize / 2
    //             : pos - aligndiff
    //         : slides.length % 2 === 0
    //         ? pos - activesize / 2
    //         : pos

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
            // pos += nodes[slides[i].id].clientWidth
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
            // pos -= nodes[slides[i].id].clientWidth
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

    function slidyDragAcl() {
        slidyLoop()
        // console.log(speed)
        let acl = speed
        // console.time('someFunction')

        // dragSlide() // Whatever is timed goes between the two "console.time"

        // console.timeEnd('someFunction')
        // let t0 = performance.now()

        // dragSlide() // <---- The function you're measuring time for

        // let t1 = performance.now()
        // console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.')
    }

    function slidyStop() {
        transition = options.duration
        // slidyLoop()
        const nulled = (direct) => {
            if (direct) {
                if (options.loop) {
                    direct()
                    // index += Math.floor(speed) + 1
                    // slidyLoop()
                    pos = px = htx = speed = time = transition = 0
                    tick().then(() => (index = i = element.active.ix))
                } else {
                    index = direct
                    pos = px = htx = 0
                }
            } else {
                pos = px = comp = speed = time = 0
            }
        }
        if (pos > lastsize / 2 || speed > 0.25) {
            pos += lastsize - pos + (dontdrag === true ? px * speed : 0)
            // setTimeout(() => {
            //     nulled(options.loop ? prev : (i = index -= dontdrag === true ? Math.round(1 * speed) : 1))
            // }, transition)
            if (options.loop) {
                // pos += lastsize - pos + (dontdrag === true ? px * speed : 0)
                setTimeout(
                    () => {
                        nulled(prev)
                    },
                    dontdrag === true ? transition * speed : transition
                )
            } else {
                // pos += lastsize - pos + (dontdrag === true ? px * speed : 0)
                nulled((i = index -= dontdrag === true ? Math.round(1 * speed) : 1))
                // setTimeout(() => {
                //     nulled((i = index -= dontdrag === true ? Math.round(1 * speed) : 1))
                // }, transition * speed)
            }
        } else if (pos < -firstsize / 2 || speed < -0.25) {
            pos -= firstsize + pos + (dontdrag === true ? px * speed : 0)
            // setTimeout(() => {
            //     nulled(options.loop ? next : (i = index += dontdrag === true ? Math.round(1 * -speed) : 1))
            // }, transition)
            if (options.loop) {
                // pos -= firstsize + pos + (dontdrag === true ? px * speed : 0)
                setTimeout(
                    () => {
                        nulled(next)
                    },
                    dontdrag === true ? transition * -speed : transition
                )
            } else {
                // pos -= firstsize + pos + (dontdrag === true ? px * speed : 0)
                dontdrag === true ? nulled((i += Math.round(1 * -speed))) : nulled((i += 1))
                // nulled((i = index += dontdrag === true ? Math.round(1 * -speed) : 1))
                // setTimeout(() => {
                //     nulled((i = index += dontdrag === true ? Math.round(1 * -speed) : 1))
                // }, transition * -speed)
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
        dontdrag = false
        transition = 0
        if (options.axisy) {
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
        tracker,
        speed = 0,
        timer,
        starttime = 0,
        time = undefined,
        endtime = 0,
        px = 0,
        dontdrag = false
    function dragStart(e) {
        slidyNull()
        isdrag = true
        dontdrag = false
        transition = 0
        if (tracker !== null) {
            clearInterval(tracker)
        }
        starttime = e.timeStamp
    }
    function dragSlide(e) {
        // slidyDragAcl()
        // let px = 0
        if (isdrag) {
            if (options.axisy) {
                pos += e.detail.dy
                px += e.detail.dy
            } else {
                pos += e.detail.dx
                px += e.detail.dx
            }
            slidyLoop()
            // tracker = setInterval(() => (htx = pos), 100)
            // speed = pos !== 0 ? (htx - pos) / 100 : 0
            // speed = htx / 100
        }
    }
    function dragStop(e) {
        isdrag = false
        dontdrag = true
        // console.log(speed)
        // pos = pos * speed * 100
        // slidyDragAcl()
        endtime = e.timeStamp
        time = endtime - starttime
        speed = px / time
        clearInterval(tracker)
        // clearTimeout(timer)

        // console.log('$:', speed)
        // setTimeout(() => clearInterval(tracker), transition)
        slidyStop()
        // setTimeout(() => slidyStop(), transition)
    }
    // $: console.log(speed, px, time, Math.round(speed))

    // KEYS -------------------------------------------------------
    function slidyKeys(e) {
        if (e.keyCode === 37 || e.keyCode === 38) {
            index--
        } else if (e.keyCode === 39 || e.keyCode === 40) {
            index++
        }
    }

    export let intersect = {
        options: {},
        entries: [],
        observer: null,
        index: 0,
    }

    let intinit = false,
        intopts = intersect.options
    $: if (options.intersecting && slidyinit) intinit = !intinit

    function onIntersection(e, i) {
        intersect.entries = e.detail.entries
        intersect.observer = e.detail.observer
        intersect.index = i
        // for (const entry of e.detail.entries) {
        //     if (entry.isIntersecting) {
        //         intersected = [...new Set([...intersected, i])]
        //         // eir = entry.intersectionRatio
        //     } else {
        //         // intersected = intersected.filter((x) => x !== i)
        //     }
        // }
    }
    // $: console.log(intersected, eir)

    // $: animated = entries.reduce((ids, entry) => {
    //     entry.isIntersecting ? ids.push(entry.target.dataset.id) : ids.filter((x) => x !== entry.target.dataset.id)
    //     return ids
    // }, [])
    // $: animated = entries.reduce((ids, entry) => {
    //     entry.isIntersecting && ids.push(entry.target.dataset.id)
    //     return ids
    // }, [])
    // $: console.log(animated)
    // let bgImg = new Image(),
    //     bgImgLoaded = [],
    //     bgImgSrc = ''
    // function bgImgLoad() {
    //     // bgImgLoaded = [...new Set([...bgImgLoaded, i])]
    //     // myDiv.style.backgroundImage = 'url(' + bgImg.src + ')'
    //     console.log(bgImg)
    //     return (bgImgSrc = bgImg.src)
    // }
    // bgImg.onload = () => bgImgLoad()
    // for( item of slides ) {
    //     bgImg.src = item.src
    // }
    // $: slides && (bgImgLoaded = [])
    // bgImg.src = '../img/torus.webp'
</script>

<!-- <svelte:window on:load="{winLoad}" /> -->
<section
    role="region"
    tabindex="0"
    aria-label="Slidy"
    id="{wrap.id}"
    class="slidy"
    class:loaded="{slidyinit}"
    class:axisy="{options.axisy}"
    class:autowidth="{slide.width === 'auto'}"
    class:antiloop="{options.loop === false}"
    class:alignmiddle="{wrap.align === 'middle'}"
    class:alignstart="{wrap.align === 'start'}"
    class:alignend="{wrap.align === 'end'}"
    use:resize
    on:resize="{resizeWrap}"
    use:wheel
    on:wheels="{controls.wheel ? slidyWheel : null}"
    use:pannable
    on:panstart="{controls.drag ? dragStart : null}"
    on:panmove="{controls.drag ? dragSlide : null}"
    on:panend="{controls.drag ? dragStop : null}"
    on:keydown="{controls.keys ? slidyKeys : null}"
    style="
        --wrapw: {wrap.width};
        --wraph: {wrap.height};
        --wrapp: {wrap.padding};
        --slidew: {slide.width};
        --slideh: {slide.height};
        --slidef: {slide.objectfit};
        --slideo: {slide.overflow};
        --slideg: {options.axisy
        ? `${slide.gap}px 0 0 0`
        : `0 0 0 ${slide.gap}px`};
        --dur: {options.duration}ms;"
>
    {#if !slidyinit}
        <section id="loader">
            <slot name="loader">Loading...</slot>
        </section>
    {/if}
    <ul
        class="slidy-ul"
        on:contextmenu="{() => (isdrag = false)}"
        style="{move()}; transition: transform {transition}ms;"
    >
        {#if slides}
            {#each slides as item, i (item.id)}
                <li
                    bind:this="{nodes[i]}"
                    use:intersection="{{ intinit, ...intopts }}"
                    on:intersection|stopPropagation="{(e) => onIntersection(e, item.ix)}"
                    class="{slide.class}"
                    class:active="{item.ix === index}"
                    style="{slide.backimg === true
                        ? `background-image: url(${item[slide.imgsrckey]})`
                        : null}"
                >
                    {#if slidyinit}
                        <slot item="{item}">
                            {#if slide.backimg === false}
                                <img
                                    alt="{item.id}"
                                    src="{item[slide.imgsrckey]}"
                                    width="{item.width}"
                                    height="{item.height}"
                                />
                            {/if}
                        </slot>
                    {/if}
                </li>
            {/each}
        {/if}
    </ul>

    {#if controls.arrows && slidyinit}
        {#if !options.loop}
            {#if index > 0}
                <button class="arrow-left" on:click="{() => index--}">
                    <slot name="arrow-left">&#8592;</slot>
                </button>
            {/if}
            {#if index < slides.length - 1}
                <button class="arrow-right" on:click="{() => index++}">
                    <slot name="arrow-right">&#8594;</slot>
                </button>
            {/if}
        {:else}
            <button class="arrow-left" on:click="{() => index--}">
                <slot name="arrow-left">&#8592;</slot>
            </button>
            <button class="arrow-right" on:click="{() => index++}">
                <slot name="arrow-right">&#8594;</slot>
            </button>
        {/if}
    {/if}

    {#if controls.dots && slidyinit}
        <ul class="slidy-dots" class:pure="{controls.dotspure}">
            {#if controls.dotsarrow}
                {#if !options.loop}
                    {#if index > 0}
                        <li class="dots-arrow-left" on:click="{() => index--}">
                            <slot name="dots-arrow-left"><button>&#8592;</button></slot>
                        </li>
                    {/if}
                {:else}
                    <li class="dots-arrow-left" on:click="{() => index--}">
                        <slot name="dots-arrow-left"><button>&#8592;</button></slot>
                    </li>
                {/if}
            {/if}
            {#each dots as dot, i}
                <li class:active="{i === index}" on:click="{() => (index = i)}">
                    <slot name="dot" dot="{dot}">
                        <button>{controls.dotsnum && !controls.dotspure ? i : ''}</button>
                    </slot>
                </li>
            {/each}
            {#if controls.dotsarrow}
                {#if !options.loop}
                    {#if index < slides.length - 1}
                        <li class="dots-arrow-right" on:click="{() => index++}">
                            <slot name="dots-arrow-right"><button>&#8594;</button></slot>
                        </li>
                    {/if}
                {:else}
                    <li class="dots-arrow-right" on:click="{() => index++}">
                        <slot name="dots-arrow-right"><button>&#8594;</button></slot>
                    </li>
                {/if}
            {/if}
        </ul>
    {/if}
</section>

<style>
    :root {
        --color: white;
        --color-active: red;
        --back-color: rgba(0, 0, 0, 0.09);
    }
    #loader {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        position: absolute;
    }
    .slidy {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        width: var(--wrapw);
        height: var(--wraph);
        outline: 0;
        margin: auto;
    }
    .slidy ul {
        display: flex;
        flex: 1 0 auto;
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
    .slidy-ul > * + * {
        margin: var(--slideg);
    }
    .slidy.loaded .slidy-ul li {
        opacity: 1;
    }
    .slidy.axisy .slidy-ul {
        flex-direction: column;
    }
    .slidy-ul li {
        flex: 1 0 auto;
        position: relative;
        overflow: var(--slideo);
        opacity: 0;
        transition: opacity var(--dur);
        width: var(--slidew);
        height: var(--slideh);
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-position: center;
        background-size: var(--slidef);
        background-color: var(--back-color);
        /* border: 1px solid transparent; */
    }
    /* .slidy-ul li.intersected {
        border: 1px solid red;
    } */
    :global(.slidy-ul li img) {
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
        max-width: var(--wrapw);
        max-height: var(--wraph);
        object-fit: var(--slidef);
    }
    :global(.slidy.autowidth .slidy-ul li img) {
        width: auto;
    }
    .slidy button {
        margin: 0;
        border: 0;
        padding: 0;
        border-radius: 0;
        width: 50px;
        height: 50px;
        line-height: 50px;
        color: var(--color);
        background: var(--back-color);
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
        color: var(--color-active);
    }
    .slidy-dots {
        position: absolute;
        bottom: 0;
        height: 50px;
        padding: 0;
        width: 100%;
    }
    .slidy.axisy .slidy-dots {
        bottom: auto;
        right: 0;
        width: 50px;
        height: 100%;
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
        width: 32px;
        height: 32px;
        background: none;
    }
    .slidy-dots.pure li button {
        border-radius: 50%;
        color: var(--color-active);
        width: 12px;
        height: 12px;
        /* transform: scale(1); */
        transition: color var(--dur);
    }
    .slidy-dots.pure li.active button {
        /* transform: scale(1.8); */
        background: var(--color-active);
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
