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
    function X(e) {
        return new Promise((n, r) => {
            let i,
                s = 0;
            clearInterval(i),
                (i = setInterval(() => {
                    s++,
                        console.log(s, e.children.length),
                        e.children.length > 2
                            ? (clearInterval(i),
                              Array.from(e.children).forEach((a, E) => {
                                  a.dataset.index = E;
                              }),
                              n(e.children))
                            : s >= 69 && (clearInterval(i), r("Slidy haven't items"));
                }, 16));
        });
    }
    function S(e, n, r) {
        return Math.min(e, Math.max(n, r)) || 0;
    }
    function I(e, n, r = !1) {
        return r
            ? n < 0
                ? h(e).length - 1
                : n > h(e).length - 1
                ? 0
                : n
            : S(h(e).length - 1, 0, n);
    }
    function b(e, n) {
        return e.type === 'wheel'
            ? n === 'y' || e.shiftKey
                ? e.deltaY
                : e.deltaX
            : n === 'y'
            ? G(e).clientY
            : G(e).clientX;
    }
    var G = (e) => (e.changedTouches ? e.changedTouches[0] : e),
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
        return h(e).reduce((s, a, E) => {
            let g = (v) => P(e, v, r, i);
            return Math.abs(g(a) - n) < Math.abs(g(s) - n) ? a : s;
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
                loop: a = !1,
                snap: E = !1,
                clamp: g = !1,
                gravity: v = 1.2,
                duration: O = 375,
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
            N,
            ee = c,
            y = i,
            u = e.parentElement,
            x = requestAnimationFrame,
            U = new ResizeObserver(() => {
                e.dispatchEvent(new CustomEvent('resize')), m(i);
            });
        X(e)
            .then((t) => {
                console.log('mounted'),
                    (e.style.userSelect = 'none'),
                    (e.style.touchAction = 'pan-y'),
                    (e.style.pointerEvents = 'none'),
                    (e.style.willChange = 'auto'),
                    (e.style.webkitUserSelect = 'none'),
                    D(e, i, a),
                    m(i),
                    u &&
                        (u.addEventListener('touchstart', A),
                        u.addEventListener('mousedown', A),
                        u.addEventListener('keydown', J),
                        u.addEventListener('wheel', j),
                        (u.oncontextmenu = () => M()),
                        (u.style.outline = 'none'),
                        U.observe(u));
            })
            .catch((t) => console.error(t));
        function H(t, o = 0) {
            (c += a ? te(t) : t), (i = d.index(e, c, void 0, s, p));
            let l = (f) => (f === 'y' ? `0, ${-c}px, 0` : `${-c}px, 0, 0`);
            (e.style.transform = `translate3d(${l(s)})`),
                (e.style.transition = `${o}ms`),
                (e.dataset.position = `${c}`),
                (e.dataset.index = `${i}`),
                Z(i),
                _(c);
        }
        function te(t) {
            let o = ee - t,
                l = d.size(e, 0, s),
                f = d.size(e, e.children.length - 1, s),
                L = (W) => (W + r) * Math.sign(-t);
            return (
                y !== i &&
                    (t > 0 ? V(e, s) : B(e, s), (t += L(t > 0 ? l : f)), (T = c + t + o)),
                (y = i),
                t
            );
        }
        function m(t, o = null) {
            M(), (t = y = I(e, t, a));
            let l = d.child(e, t),
                f = a ? d.index(e, c, l, s, p) : t,
                L = o
                    ? E
                        ? d.target(e, o, s, p)
                        : o
                    : o === 0
                    ? 0
                    : d.position(e, f, s, p);
            H(L - c, O);
        }
        function ne(t) {
            x(function o(l) {
                let f = (1e3 * (c - T)) / (1 + (l - t));
                (w = (2 - v) * f + S(1, 0, 1 - v) * w), (t = l), (T = c), (q = x(o));
            });
        }
        function re({ target: t, amplitude: o, duration: l, timestamp: f }) {
            o &&
                x(function L(W) {
                    let le = (W - f) / l,
                        R = o * Math.exp(-le),
                        ae = c - (t - R);
                    H(a ? R / 16.7 : -ae),
                        (Y = Math.abs(R) > 0.5 ? x(L) : 0),
                        a && Math.abs(R) < 5 && m(i);
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
            let { target: o, amplitude: l } = ie(c);
            Math.abs(l) > 10 &&
                (Math.abs(w) < 100
                    ? m(i)
                    : g
                    ? m(i, o)
                    : re({
                          target: o,
                          amplitude: l,
                          duration: O,
                          timestamp: performance.now(),
                      }));
        }
        function ie(t) {
            let o = (2 - v) * w,
                l = E ? d.target(e, t + o, s, p) : t + o;
            return (o = l - t), { target: l, amplitude: o };
        }
        let F = !1;
        function j(t) {
            M(),
                (F = !0),
                ((Math.abs(b(t, 'x')) && Math.abs(b(t, 'y')) < 15) || t.shiftKey) &&
                    t.preventDefault(),
                H(b(t, s) * (2 - v)),
                t.shiftKey
                    ? m(i - Math.sign(t.deltaY))
                    : (E || g) &&
                      (N = setTimeout(() => {
                          m(i), (F = !1);
                      }, 100));
        }
        function J(t) {
            t.key === 'ArrowLeft' ? m(i - 1) : t.key === 'ArrowRight' && m(i + 1);
        }
        function M() {
            (y = F ? y : i),
                clearTimeout(N),
                cancelAnimationFrame(Y),
                cancelAnimationFrame(q),
                window.removeEventListener('touchmove', C),
                window.removeEventListener('mousemove', C),
                window.removeEventListener('touchend', z),
                window.removeEventListener('mouseup', z);
        }
        function se(t) {
            (O = t.duration || 375),
                (v = S(2, 0, t.gravity || 1.2)),
                (s = t.axis || 'x'),
                (p = t.align || 'middle'),
                (E = t.snap || !0),
                (g = t.clamp || !1),
                (r = t.gap || 0),
                i !== t.index && ((i = I(e, t.index || 0, a)), m(i)),
                a !== t.loop && ((a = t.loop || !1), D(e, i, a), m(i));
        }
        function oe() {
            M(),
                U.disconnect(),
                u &&
                    ((u.onresize = null),
                    (u.oncontextmenu = null),
                    u.removeEventListener('touchstart', A),
                    u.removeEventListener('mousedown', A),
                    u.removeEventListener('keydown', J),
                    u.removeEventListener('wheel', j));
        }
        return { update: se, destroy: oe, to: m };
    }
    return ve(Te);
})();
