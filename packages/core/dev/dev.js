var Slidy = (() => {
    var $ = Object.defineProperty;
    var ce = Object.getOwnPropertyDescriptor;
    var ue = Object.getOwnPropertyNames;
    var me = Object.prototype.hasOwnProperty;
    var fe = (e) => $(e, '__esModule', { value: !0 });
    var he = (e, n) => {
            for (var r in n) $(e, r, { get: n[r], enumerable: !0 });
        },
        de = (e, n, r, i) => {
            if ((n && typeof n == 'object') || typeof n == 'function')
                for (let s of ue(n))
                    !me.call(e, s) &&
                        (r || s !== 'default') &&
                        $(e, s, {
                            get: () => n[s],
                            enumerable: !(i = ce(n, s)) || i.enumerable,
                        });
            return e;
        };
    var ve = (
        (e) => (n, r) =>
            (e && e.get(n)) || ((r = de(fe({}), n, 1)), e && e.set(n, r), r)
    )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
    var Te = {};
    he(Te, { slidy: () => we });
    function G(e) {
        return new Promise((n, r) => {
            let i,
                s = 0;
            clearInterval(i),
                (i = setInterval(() => {
                    s++,
                        console.log(s, e.children.length),
                        e.children.length > 2
                            ? (clearInterval(i),
                              Array.from(e.children).forEach((l, E) => {
                                  l.dataset.index = E;
                              }),
                              n(e.children))
                            : s >= 69 && (clearInterval(i), r("Slidy haven't items"));
                }, 16));
        });
    }
    function O(e, n, r) {
        return Math.min(e, Math.max(n, r)) || 0;
    }
    function I(e, n, r = !1) {
        return r
            ? n < 0
                ? h(e).length - 1
                : n > h(e).length - 1
                ? 0
                : n
            : O(h(e).length - 1, 0, n);
    }
    function b(e, n) {
        return e.type === 'wheel'
            ? n === 'y' || e.shiftKey
                ? e.deltaY
                : e.deltaX
            : n === 'y'
            ? J(e).clientY
            : J(e).clientX;
    }
    var J = (e) => (e.changedTouches ? e.changedTouches[0] : e),
        Ee = (e) => Math.floor(e.children.length / 2),
        h = (e) => Array.from(e.children),
        be = (e, n) => e.children[n],
        ge = (e) => (e === 'y' ? 'offsetTop' : 'offsetLeft'),
        K = (e) => (e === 'y' ? 'offsetHeight' : 'offsetWidth'),
        pe = (e) => (e === 'middle' ? 0.5 : 1),
        Me = (e, n) => (e !== 'start' ? n : 0),
        ye = (e, n, r) => e.parentElement[K(r)] - n[K(r)],
        P = (e, n, r, i) => n[ge(r)] - Me(i, ye(e, n, r) * pe(i));
    function Q(e, n, r, i) {
        return h(e).reduce((s, l, E) => {
            let g = (v) => P(e, v, r, i);
            return Math.abs(g(l) - n) < Math.abs(g(s) - n) ? l : s;
        });
    }
    var d = {
            index: (e, n, r, i, s) =>
                r ? h(e).indexOf(r) : +Q(e, n, i, s).dataset.index,
            position: (e, n, r, i) => P(e, be(e, n), r, i),
            target: (e, n, r, i) => P(e, Q(e, n, r, i), r, i),
            size: (e, n, r) => h(e)[n][K(r)],
            child: (e, n) => h(e).find((r) => +r.dataset.index === n),
        },
        Le = (e, n) => e.slice(n).concat(e.slice(0, n));
    function B(e, n) {
        let r = e.children[e.children.length - 1];
        e.prepend(r);
    }
    function V(e, n) {
        let r = e.children[0];
        e.append(r);
    }
    function D(e, n, r) {
        r
            ? (e.replaceChildren(...Le(h(e), n - Ee(e))),
              (e.style.justifyContent = 'center'))
            : (e.replaceChildren(...h(e)), (e.style.justifyContent = 'start'));
    }
    function we(e, n = {}) {
        let {
                gap: r = 0,
                index: i = 0,
                axis: s = 'x',
                loop: l = !1,
                snap: E = !1,
                clamp: g = !1,
                gravity: v = 1.2,
                duration: S = 375,
                align: p = 'start',
                indexer: Z = (t) => t,
                scroller: _ = (t) => t,
            } = n,
            Y,
            q,
            w = 0,
            k = 0,
            c = 0,
            T = 0,
            U = 0,
            ee = c,
            y = i,
            u = e.parentElement,
            x = requestAnimationFrame,
            j = new ResizeObserver(() => {
                e.dispatchEvent(new CustomEvent('resize')), m(i);
            });
        G(e)
            .then((t) => {
                console.log('mounted'),
                    (e.style.userSelect = 'none'),
                    (e.style.touchAction = 'pan-y'),
                    (e.style.pointerEvents = 'none'),
                    (e.style.willChange = 'auto'),
                    (e.style.webkitUserSelect = 'none'),
                    D(e, i, l),
                    m(i),
                    u &&
                        (u.addEventListener('touchstart', A),
                        u.addEventListener('mousedown', A),
                        u.addEventListener('keydown', X),
                        u.addEventListener('wheel', N),
                        (u.oncontextmenu = () => M()),
                        (u.style.outline = 'none'),
                        j.observe(u));
            })
            .catch((t) => console.error(t));
        function H(t, o = 0) {
            (c += l ? te(t) : t), (i = d.index(e, c, void 0, s, p, l));
            let a = (f) => (f === 'y' ? `0, ${-c}px, 0` : `${-c}px, 0, 0`);
            (e.style.transform = `translate3d(${a(s)})`),
                (e.style.transition = `${o}ms`),
                (e.dataset.position = `${c}`),
                (e.dataset.index = `${i}`),
                Z(i),
                _(c);
        }
        function te(t) {
            let o = ee - t,
                a = d.size(e, 0, s),
                f = d.size(e, e.children.length - 1, s),
                L = (W) => (W + r) * Math.sign(-t);
            return (
                y !== i &&
                    (t > 0 ? V(e, s) : B(e, s), (t += L(t > 0 ? a : f)), (T = c + t + o)),
                (y = i),
                t
            );
        }
        function m(t, o = null) {
            M(), (t = y = I(e, t, l));
            let a = d.child(e, t),
                f = l ? d.index(e, c, a, s, p, l) : t,
                L = o
                    ? E
                        ? d.target(e, o, s, p, l)
                        : o
                    : o === 0
                    ? 0
                    : d.position(e, f, s, p, l);
            H(L - c, S);
        }
        function ne(t) {
            x(function o(a) {
                let f = (1e3 * (c - T)) / (1 + (a - t));
                (w = (2 - v) * f + O(1, 0, 1 - v) * w), (t = a), (T = c), (q = x(o));
            });
        }
        function re({ target: t, amplitude: o, duration: a, timestamp: f }) {
            o &&
                x(function L(W) {
                    let le = (W - f) / a,
                        R = o * Math.exp(-le),
                        ae = c - (t - R);
                    H(l ? R / 16.7 : -ae),
                        (Y = Math.abs(R) > 0.5 ? x(L) : 0),
                        l && Math.abs(R) < 5 && m(i);
                });
        }
        function A(t) {
            (e.style.pointerEvents = t.type !== 'mousedown' ? 'auto' : 'none'),
                M(),
                (T = c),
                (k = b(t, s)),
                ne(performance.now()),
                window.addEventListener('touchmove', C),
                window.addEventListener('mousemove', C),
                window.addEventListener('touchend', z),
                window.addEventListener('mouseup', z);
        }
        function C(t) {
            let o = (k - b(t, s)) * (2 - v);
            (k = b(t, s)), H(o);
        }
        function z(t) {
            M();
            let { target: o, amplitude: a } = ie(c);
            Math.abs(a) > 10 &&
                (Math.abs(w) < 100
                    ? m(i)
                    : g
                    ? m(i, o)
                    : re({
                          target: o,
                          amplitude: a,
                          duration: S,
                          timestamp: performance.now(),
                      }));
        }
        function ie(t) {
            let o = (2 - v) * w,
                a = E ? d.target(e, t + o, s, p, l) : t + o;
            return (o = a - t), { target: a, amplitude: o };
        }
        let F = !1;
        function N(t) {
            M(),
                (F = !0),
                ((Math.abs(b(t, 'x')) && Math.abs(b(t, 'y')) < 15) || t.shiftKey) &&
                    t.preventDefault(),
                H(b(t, s) * (2 - v)),
                t.shiftKey
                    ? m(i - Math.sign(t.deltaY))
                    : (E || g) &&
                      (U = setTimeout(() => {
                          m(i), (F = !1);
                      }, 100));
        }
        function X(t) {
            t.key === 'ArrowLeft' ? m(i - 1) : t.key === 'ArrowRight' && m(i + 1);
        }
        function M() {
            (y = F ? y : i),
                clearTimeout(U),
                cancelAnimationFrame(Y),
                cancelAnimationFrame(q),
                window.removeEventListener('touchmove', C),
                window.removeEventListener('mousemove', C),
                window.removeEventListener('touchend', z),
                window.removeEventListener('mouseup', z);
        }
        function se(t) {
            (S = t.duration ?? 375),
                (v = O(2, 0, t.gravity ?? 1.2)),
                (s = t.axis ?? 'x'),
                (p = t.align ?? 'middle'),
                (E = t.snap ?? !0),
                (g = t.clamp ?? !1),
                (r = t.gap ?? 0),
                i !== t.index && ((i = I(e, t.index ?? 0, l)), m(i)),
                l !== t.loop && ((l = t.loop ?? !1), D(e, i, l), m(i));
        }
        function oe() {
            M(),
                j.disconnect(),
                u &&
                    ((u.onresize = null),
                    (u.oncontextmenu = null),
                    u.removeEventListener('touchstart', A),
                    u.removeEventListener('mousedown', A),
                    u.removeEventListener('keydown', X),
                    u.removeEventListener('wheel', N));
        }
        return { update: se, destroy: oe, to: m };
    }
    return ve(Te);
})();
