import { spring, tweened } from 'svelte/motion'
import { cubicOut, cubicIn, expoInOut, sineInOut, quintOut, expoOut } from 'svelte/easing'
import { arr, dots, nodes, element, leftW, translateX, send, receive, duration } from './stores/slidy.js'
import { get } from 'svelte/store';
import { setOpen } from './stores/settings.js'


export function prev() {
    arr.update(a => [a[a.length - 1], ...a.slice(0, -1)])
}
export function next() {
    arr.update(a => [...a.slice(1), a[0]])
}

export function previous(dur) {
    itemsCount += 1
    sly += get(element).last.width
    translateX.set(sly, { duration: dur })
    leftW.set(-sly, { duration: 0 })
    prev()
}
export function nextious(dur) {
    itemsCount -= 1
    sly -= get(element).first.width
    translateX.set(sly, { duration: dur })
    leftW.set(-sly)
    next()
}

// KEYS -------------------------------------------------------
let key = ''
let keyCode = 0
export function handleKeydown(e) {
    key = e.key
    keyCode = e.keyCode
    if (key === 'ArrowLeft') {
        previous(get(duration))
    } else if (key === 'ArrowRight') {
        nextious(get(duration))
    } else if (key === 'Escape') {
        e.preventDefault()
        setOpen.update(so => so = !so)
    }
}

// SLIDY -------------------------------------------------------
let count = 0
let itemsCount = 0
let firstN = 0
let lastN = 0
let sly = 0
let trans = 0
export function slidy() {
    if (count === itemsCount) {
        return
    } else if (count < itemsCount) {
        lastN = get(element).last.width
        sly += lastN
        leftW.set(-sly)
        trans = lastN
        prev()
    } else if (count > itemsCount) {
        firstN = get(element).first.width
        sly -= firstN
        leftW.set(-sly)
        trans = firstN
        next()
    }
    count = itemsCount
}


// SLIDY-DOT --------------------------------------------------
export function slidyDot(id, dur) {
    let i = get(element).active.num
    itemsCount = 0
    if (id > i && i !== get(element).last.num) {
        i = get(element).active.num + 1
        while (i <= id) {
            nextious(dur)
            i++
        }
    } else if (id < i && i !== get(element).first.num) {
        i = get(element).active.num - 1
        while (i >= id) {
            previous(dur)
            i--
        }
    }
}


// WHEELLING -------------------------------------------------------
let posX = 0
let isWheelling
export function wheeling(e) {
    posX += e.detail.dx
    itemsCount = Math.round(-posX / trans)
    translateX.set(-posX, { duration: 0 })
    slidy()

    window.clearTimeout(isWheelling)
    isWheelling = setTimeout(function () {
        count = 0
        itemsCount = 0
        posX = 0
        firstN = 0
        lastN = 0
        sly = 0
        trans = 0
        translateX.set(0, { duration: get(duration) / 2, easing: cubicOut }),
            leftW.set(0, { duration: get(duration) / 2, easing: cubicOut })
    }, get(duration))
}

// DRAG -------------------------------------------------------
const coords = spring({ x: 0, y: 0 }, { stiffness: 0.2, damping: 0.4 })
let mD = false
let posXDiffrence = 0
let htx
let tracker
let speedDrag = 0

export function dragStart(e) {
    mD = true
    count = 0
    itemsCount = 0
    sly = 0
    firstN = 0
    lastN = 0
    leftW.set(0)
    coords.set({ x: 0, y: 0 })
    translateX.set(0, { duration: 0 })
    coords.stiffness = coords.damping = 1
    e.target.style.setProperty('transition', 'none')
}
export function dragSlide(e) {
    if (mD) {
        coords.update((coords) => ({
            x: coords.x + e.detail.dx,
            y: coords.y + e.detail.dy,
        }))
        posXDiffrence = get(coords).x
        itemsCount = Math.round(posXDiffrence / trans)
        translateX.set(posXDiffrence, { duration: 0 })

        e.target.style.setProperty('user-select', get(coords).x !== 0 ? 'none' : null)
        e.target.style.setProperty('pointer-events', get(coords).x !== 0 ? 'none' : null)
        slidy()
        let time = get(duration)
        tracker = setInterval(function () {
            htx = posXDiffrence
        }, time)
        speedDrag = (htx - posXDiffrence) / time
    }
}
export function dragStop(e) {
    // coords.stiffness = 0.2
    // coords.damping = 0.4
    // coords.set({ x: 0, y: 0 })
    mD = false
    // posXDiffrence = 0
    // count = 0
    // itemsCount = 0
    // sly = 0
    // clearInterval(tracker)
    if (speedDrag < -0.025) {
        (previous(get(duration)), (speedDrag = 0), clearInterval(tracker))
    } else if (speedDrag > 0.025) {
        (nextious(get(duration)), (speedDrag = 0), clearInterval(tracker))
    } else {
        translateX.set(0, { duration: get(duration) / 2 }),
            leftW.set(0, { duration: get(duration) / 2 }),
            clearInterval(tracker)
    }
    e.target.style.setProperty('user-select', get(coords).x !== 0 ? 'inherit' : null)
    e.target.style.setProperty('pointer-events', get(coords).x !== 0 ? 'inherit' : null)
}


// ANIMATE --------------------------------------------
export function animate(node, posX, posY, dur) {
    window.requestAnimationFrame(() => {
        let tf = `translate3d(${posX}px, ${posY}px, 0)`
        let tt = `all ${dur}ms ease`
        node.style.transform = tf
        node.style.transition = tt
    })
}