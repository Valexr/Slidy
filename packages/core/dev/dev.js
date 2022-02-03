var Slidy = (() => {
    var $ = Object.defineProperty;
    var me = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var he = Object.prototype.hasOwnProperty;
    var Ee = (e) => $(e, '__esModule', { value: !0 });
    var be = (e, t) => {
            for (var r in t) $(e, r, { get: t[r], enumerable: !0 });
        },
        Me = (e, t, r, l) => {
            if ((t && typeof t == 'object') || typeof t == 'function')
                for (let o of fe(t))
                    !he.call(e, o) &&
                        (r || o !== 'default') &&
                        $(e, o, {
                            get: () => t[o],
                            enumerable: !(l = me(t, o)) || l.enumerable,
                        });
            return e;
        };
    var Te = (
        (e) => (t, r) =>
            (e && e.get(t)) || ((r = Me(Ee({}), t, 1)), e && e.set(t, r), r)
    )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
    var de = {};
    be(de, { slidy: () => we });
    function J(e) {
        return new Promise((t, r) => {
            let l,
                o = 0;
            clearInterval(l),
                (l = setInterval(() => {
                    o++,
                        console.log(o, e.children.length),
                        e.children.length > 2
                            ? (clearInterval(l),
                              Array.from(e.children).forEach((b, u) => {
                                  b.dataset.index = u;
                              }),
                              t(e.children))
                            : o >= 69 && (clearInterval(l), r("Slidy haven't items"));
                }, 16));
        });
    }
    function S(e, t, r) {
        return Math.min(e, Math.max(t, r)) || 0;
    }
    function I(e, t, r = !1) {
        return r
            ? t < 0
                ? f(e).length - 1
                : t > f(e).length - 1
                ? 0
                : t
            : S(f(e).length - 1, 0, t);
    }
    function p(e, t) {
        return e.type === 'wheel'
            ? t || e.shiftKey
                ? e.deltaY
                : e.deltaX
            : t
            ? X(e).clientY
            : X(e).clientX;
    }
    var X = (e) => (e.changedTouches ? e.changedTouches[0] : e),
        pe = (e) => Math.floor(e.children.length / 2);
    var f = (e) => Array.from(e.children),
        G = (e, t) => e.children[t],
        ye = (e) => (e ? 'offsetTop' : 'offsetLeft'),
        k = (e) => (e ? 'offsetHeight' : 'offsetWidth'),
        Le = (e) => (e === 'middle' ? 0.5 : 1),
        He = (e, t) => (e !== 'start' ? t : 0),
        ve = (e, t, r) => e.parentElement[k(r)] - t[k(r)],
        R = (e, t, r, l) => t[ye(r)] - He(l, ve(e, t, r) * Le(l));
    function Q(e, t, r, l) {
        return f(e).reduce((o, b, u) => {
            let T = (E) => R(e, E, r, l);
            return Math.abs(T(b) - t) < Math.abs(T(o) - t) ? b : o;
        });
    }
    var h = {
            index: (e, t, r, l, o) =>
                r ? f(e).indexOf(r) : +Q(e, t, l, o).dataset.index,
            position: (e, t, r, l) => R(e, G(e, t), r, l),
            target: (e, t, r, l) => R(e, Q(e, t, r, l), r, l),
            size: (e, t, r) => f(e)[t][k(r)],
            child: (e, t) => f(e).find((r) => +r.dataset.index === t),
            gap: (e, t, r) => R(e, G(e, 1), t, r) - f(e)[0][k(t)],
        },
        ge = (e, t) => e.slice(t).concat(e.slice(0, t));
    function B(e, t) {
        let r = e.children[e.children.length - 1];
        e.prepend(r);
    }
    function V(e, t) {
        let r = e.children[0];
        e.append(r);
    }
    function K(e, t, r) {
        r
            ? (e.replaceChildren(...ge(f(e), t - pe(e))),
              (e.style.justifyContent = 'center'))
            : (e.replaceChildren(...f(e)), (e.style.justifyContent = 'start'));
    }
    function we(
        e,
        {
            index: t = 0,
            gravity: r = 1.2,
            duration: l = 375,
            vertical: o = !1,
            clamp: b = !1,
            loop: u = !1,
            snap: T = !1,
            align: E = 'start',
            indexer: Z = (y) => y,
            scroller: _ = (y) => y,
        }
    ) {
        let y,
            P,
            g = 0,
            O = 0,
            c = 0,
            w = 0,
            D,
            ee = c,
            v = t,
            L = e.parentElement,
            d = (n, s, i = !1) =>
                s.forEach(([m, M]) =>
                    i ? n.removeEventListener(m, M, !0) : n.addEventListener(m, M, !0)
                ),
            Y = [
                ['touchmove', U],
                ['mousemove', U],
                ['touchend', j],
                ['mouseup', j],
            ],
            q = [
                ['contextmenu', H],
                ['touchstart', N],
                ['mousedown', N],
                ['keydown', le],
                ['wheel', se],
                ['resize', () => a(t)],
            ],
            A = requestAnimationFrame,
            x = new ResizeObserver(() => {
                L.dispatchEvent(new CustomEvent('resize'));
            });
        J(e)
            .then((n) => {
                (e.style.userSelect = 'none'),
                    (e.style.touchAction = 'pan-y'),
                    (e.style.pointerEvents = 'none'),
                    (e.style.willChange = 'auto'),
                    (e.style.webkitUserSelect = 'none'),
                    K(e, t, u),
                    a(t),
                    L && (x.observe(L), (L.style.outline = 'none'), d(L, q));
            })
            .catch((n) => console.error(n));
        function z(n, s = 0) {
            (c += u ? te(n) : n), (t = h.index(e, c, void 0, o, E));
            let i = (m) => (m ? `0, ${-c}px, 0` : `${-c}px, 0, 0`);
            (e.style.transform = `translate3d(${i(o)})`),
                (e.style.transition = `${s}ms`),
                (e.dataset.position = `${c}`),
                (e.dataset.index = `${t}`),
                Z(t),
                _(c);
        }
        function te(n) {
            let s = ee - n,
                i = h.size(e, 0, o),
                m = h.size(e, e.children.length - 1, o),
                M = (W) => (W + h.gap(e, o, E)) * Math.sign(-n);
            return (
                v !== t &&
                    (n > 0 ? V(e, o) : B(e, o), (n += M(n > 0 ? i : m)), (w = c + n + s)),
                (v = t),
                n
            );
        }
        function a(n, s = null) {
            H(), (n = v = I(e, n, u));
            let i = h.child(e, n),
                m = u ? h.index(e, c, i, o, E) : n,
                M = s
                    ? T
                        ? h.target(e, s, o, E)
                        : s
                    : s === 0
                    ? 0
                    : h.position(e, m, o, E);
            z(M - c, l);
        }
        function ne(n) {
            A(function s(i) {
                let m = (1e3 * (c - w)) / (1 + (i - n));
                (g = (2 - r) * m + S(1, 0, 1 - r) * g), (n = i), (w = c), (P = A(s));
            });
        }
        function re({ target: n, amplitude: s, duration: i, timestamp: m }) {
            s &&
                A(function M(W) {
                    let ue = (W - m) / i,
                        C = s * Math.exp(-ue),
                        ae = c - (n - C);
                    z(u ? C / 16.7 : -ae),
                        (y = Math.abs(C) > 0.5 ? A(M) : 0),
                        u && Math.abs(C) < 5 && a(t);
                });
        }
        function N(n) {
            (e.style.pointerEvents = n.type !== 'mousedown' ? 'auto' : 'none'),
                H(),
                (w = c),
                (O = p(n, o)),
                ne(performance.now()),
                d(window, Y);
        }
        function U(n) {
            let s = (O - p(n, o)) * (2 - r);
            (O = p(n, o)), z(s);
        }
        function j(n) {
            H();
            let { target: s, amplitude: i } = oe(c);
            Math.abs(i) > 10 &&
                (Math.abs(g) < 100
                    ? a(t)
                    : b
                    ? a(t, s)
                    : re({
                          target: s,
                          amplitude: i,
                          duration: l,
                          timestamp: performance.now(),
                      }));
        }
        function oe(n) {
            let s = (2 - r) * g,
                i = T ? h.target(e, n + s, o, E) : n + s;
            return (s = i - n), { target: i, amplitude: s };
        }
        let F = !1;
        function se(n) {
            H(),
                (F = !0),
                ((Math.abs(p(n, 'x')) && Math.abs(p(n, 'y')) < 15) || n.shiftKey) &&
                    n.preventDefault(),
                z(p(n, o) * (2 - r)),
                n.shiftKey
                    ? a(t - Math.sign(n.deltaY))
                    : (T || b) &&
                      (D = setTimeout(() => {
                          a(t), (F = !1);
                      }, 100));
        }
        function le(n) {
            n.key === 'ArrowLeft' ? a(t - 1) : n.key === 'ArrowRight' && a(t + 1);
        }
        function H() {
            (v = F ? v : t),
                clearTimeout(D),
                cancelAnimationFrame(y),
                cancelAnimationFrame(P),
                d(window, Y, !0);
        }
        function ie(n) {
            (l = n.duration),
                (r = S(2, 0, n.gravity)),
                (o = n.vertical),
                (E = n.align),
                (T = n.snap),
                (b = n.clamp),
                t !== n.index && ((t = I(e, n.index, u)), a(t)),
                u !== n.loop && ((u = n.loop), K(e, t, u), a(t));
        }
        function ce() {
            H(), x.disconnect(), d(L, q, !0);
        }
        return { update: ie, destroy: ce, to: a };
    }
    return Te(de);
})();
