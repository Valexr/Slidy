export function round5(x) {
    return Math.round(x / 5) * 5
}

export function itemsQ(q, i) {
    return i.slice(0, q === i.length ? i.length : q - i.length)
}

export function minQ(obj) { return Math.min(...obj) }

export function aspectQ(srcWidth, srcHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: Math.round(srcWidth * ratio), height: Math.round(srcHeight * ratio) };
}

export function randomQ(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function filterObj(obj, keys) {
    const newobj = {};
    for (const [k, v] of Object.entries(obj)) {
        if (keys.includes(k) && v != null)
            newobj[k] = v;
    }
    return newobj;
}
export function objectMap(obj, fn) {
    return Object.entries(obj).reduce((cobj, [k, v]) => {
        cobj[k] = fn(v);
    }, {});
}

const objectsMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))
const objectReduce = (obj, value) => Object.values(obj, value).reduce((t, { value }) => t + value, 0)
// export function prev(arr) { arr = [{ ...arr[arr.length - 1] }, ...arr.slice(0, -1)] }
// export function next(arr) { arr = [...arr.slice(1), { ...arr[0] }] }

function debounce(f, ms) {
    let isCooldown = false

    return function () {
        if (isCooldown) return
        f.apply(this, arguments)
        isCooldown = true
        setTimeout(() => (isCooldown = false), ms)
    }
}

function isInteger(num) {
    return (num ^ 0) === num
}
// export function slidy(arr, item, count, dist, delt) {
//     if (count === item) {
//         return
//     } else if (count > item) {
//         dist = delt * item
//         arr = [...arr.slice(1), { ...arr[0] }]
//     } else if (count < item) {
//         dist = delt * item
//         arr = [{ ...arr[arr.length - 1] }, ...arr.slice(0, -1)]
//     }
//     count = item
// }

// export function resize(img, maxh, maxw) {
//     let ratio = maxh / maxw;
//     if (img.height / img.width > ratio) {
//         // height is the problem
//         if (img.height > maxh) {
//             img.width = Math.round(img.width * (maxh / img.height));
//             img.height = maxh;
//         }
//     } else {
//         // width is the problem
//         if (img.width > maxh) {
//             img.height = Math.round(img.height * (maxw / img.width));
//             img.width = maxw;
//         }
//     }
// };

// function gcd (a, b) {
//     return (b == 0) ? a : gcd (b, a%b);
// }
// var w = screen.width;
// var h = screen.height;
// var r = gcd (w, h);
// document.write ("<pre>");
// document.write ("Dimensions = ", w, " x ", h, "<br>");
// document.write ("Gcd        = ", r, "<br>");
// document.write ("Aspect     = ", w/r, ":", h/r);
// document.write ("</pre>");


// export function randomInteger(min, max) {
//     let rand = min + Math.random() * (max + 1 - min);
//     return Math.floor(rand);
// }

// export function randomInteger(min, max) {
//     let rand = min - 0.5 + Math.random() * (max - min + 1);
//     return Math.round(rand);
// }

// function diff(a1, a2) {
//     return a1.filter((i) => !a2.includes(i)).concat(a2.filter((i) => !a1.includes(i)))
// }
// function replaceI(a1, a2) {
//     return a1.map((n) => a2[n])
// }
// function replaceV(a1, a2, val) {
//     a1.map((n) => {
//         return { ...n, val: a2[n].val }
//     })
// }