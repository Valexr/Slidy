var Slidy = (() => {
    var W = Object.defineProperty;
    var ae = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var he = Object.prototype.hasOwnProperty;
    var Ee = (e) => W(e, '__esModule', { value: !0 });
    var be = (e, r) => {
            for (var t in r) W(e, t, { get: r[t], enumerable: !0 });
        },
        Me = (e, r, t, s) => {
            if ((r && typeof r == 'object') || typeof r == 'function')
                for (let l of fe(r))
                    !he.call(e, l) &&
                        (t || l !== 'default') &&
                        W(e, l, {
                            get: () => r[l],
                            enumerable: !(s = ae(r, l)) || s.enumerable,
                        });
            return e;
        };
    var ve = (
        (e) => (r, t) =>
            (e && e.get(r)) || ((t = Me(Ee({}), r, 1)), e && e.set(r, t), t)
    )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
    var Ae = {};
    be(Ae, { slidy: () => de });
    function G(e) {
        return new Promise((r, t) => {
            let s,
                l = 0;
            clearInterval(s),
                (s = setInterval(() => {
                    l++,
                        console.log(l, e.children.length),
                        e.children.length > 2
                            ? (clearInterval(s),
                              Array.from(e.children).forEach((a, v) => {
                                  a.dataset.index = v;
                              }),
                              r(e.children))
                            : l >= 69 && (clearInterval(s), t("Slidy haven't items"));
                }, 16));
        });
    }
    function k(e, r, t) {
        return Math.min(e, Math.max(r, t)) || 0;
    }
    function K(e, r, t = !1) {
        return t
            ? r < 0
                ? h(e).length - 1
                : r > h(e).length - 1
                ? 0
                : r
            : k(h(e).length - 1, 0, r);
    }
    function M(e, r) {
        return e.type === 'wheel'
            ? r === 'y' || e.shiftKey
                ? e.deltaY
                : e.deltaX
            : r === 'y'
            ? Q(e).clientY
            : Q(e).clientX;
    }
    var Q = (e) => (e.changedTouches ? e.changedTouches[0] : e),
        ge = (e) => Math.floor(e.children.length / 2);
    var h = (e) => Array.from(e.children),
        ye = (e, r) => e.children[r],
        Te = (e) => (e === 'y' ? 'offsetTop' : 'offsetLeft'),
        $ = (e) => (e === 'y' ? 'offsetHeight' : 'offsetWidth'),
        Le = (e) => (e === 'middle' ? 0.5 : 1),
        pe = (e, r) => (e !== 'start' ? r : 0),
        He = (e, r, t) => e.parentElement[$(t)] - r[$(t)],
        I = (e, r, t, s) => r[Te(t)] - pe(s, He(e, r, t) * Le(s));
    function B(e, r, t, s) {
        return h(e).reduce((l, a, v) => {
            let f = (p) => I(e, p, t, s);
            return Math.abs(f(a) - r) < Math.abs(f(l) - r) ? a : l;
        });
    }
    var E = {
            index: (e, r, t, s, l) =>
                t ? h(e).indexOf(t) : +B(e, r, s, l).dataset.index,
            position: (e, r, t, s) => I(e, ye(e, r), t, s),
            target: (e, r, t, s) => I(e, B(e, r, t, s), t, s),
            size: (e, r, t) => h(e)[r][$(t)],
            child: (e, r) => h(e).find((t) => +t.dataset.index === r),
        },
        we = (e, r) => e.slice(r).concat(e.slice(0, r));
    function V(e, r) {
        let t = e.children[e.children.length - 1];
        e.prepend(t);
    }
    function Z(e, r) {
        let t = e.children[0];
        e.append(t);
    }
    function P(e, r, t) {
        t
            ? (e.replaceChildren(...we(h(e), r - ge(e))),
              (e.style.justifyContent = 'center'))
            : (e.replaceChildren(...h(e)), (e.style.justifyContent = 'start'));
    }
    function de(
        e,
        {
            gap: r = 0,
            index: t = 0,
            axis: s = 'x',
            loop: l = !1,
            snap: a = !1,
            clamp: v = !1,
            gravity: f = 1.2,
            duration: p = 375,
            align: g = 'start',
            indexer: _ = (y) => y,
            scroller: x = (y) => y,
        }
    ) {
        let y,
            D,
            w = 0,
            S = 0,
            c = 0,
            d = 0,
            Y,
            ee = c,
            H = t,
            T = e?.parentElement,
            A = (n, o, i = !1) =>
                o.forEach(([m, b]) =>
                    i ? n?.removeEventListener(m, b, !0) : n?.addEventListener(m, b, !0)
                ),
            q = [
                ['touchmove', J],
                ['mousemove', J],
                ['touchend', X],
                ['mouseup', X],
            ],
            N = [
                ['contextmenu', L],
                ['touchstart', j],
                ['mousedown', j],
                ['keydown', oe],
                ['wheel', le],
                ['resize', () => u(t)],
            ],
            C = requestAnimationFrame,
            U = new ResizeObserver(() => {
                T?.dispatchEvent(new CustomEvent('resize'));
            });
        G(e)
            .then((n) => {
                console.log('mounted'),
                    (e.style.userSelect = 'none'),
                    (e.style.touchAction = 'pan-y'),
                    (e.style.pointerEvents = 'none'),
                    (e.style.willChange = 'auto'),
                    (e.style.webkitUserSelect = 'none'),
                    P(e, t, l),
                    u(t),
                    T && (U.observe(T), (T.style.outline = 'none'), A(T, N));
            })
            .catch((n) => console.error(n));
        function z(n, o = 0) {
            (c += l ? te(n) : n), (t = E.index(e, c, void 0, s, g));
            let i = (m) => (m === 'y' ? `0, ${-c}px, 0` : `${-c}px, 0, 0`);
            (e.style.transform = `translate3d(${i(s)})`),
                (e.style.transition = `${o}ms`),
                (e.dataset.position = `${c}`),
                (e.dataset.index = `${t}`),
                _(t),
                x(c);
        }
        function te(n) {
            let o = ee - n,
                i = E.size(e, 0, s),
                m = E.size(e, e.children.length - 1, s),
                b = (F) => (F + r) * Math.sign(-n);
            return (
                H !== t &&
                    (n > 0 ? Z(e, s) : V(e, s), (n += b(n > 0 ? i : m)), (d = c + n + o)),
                (H = t),
                n
            );
        }
        function u(n, o = null) {
            L(), (n = H = K(e, n, l));
            let i = E.child(e, n),
                m = l ? E.index(e, c, i, s, g) : n,
                b = o
                    ? a
                        ? E.target(e, o, s, g)
                        : o
                    : o === 0
                    ? 0
                    : E.position(e, m, s, g);
            z(b - c, p);
        }
        function ne(n) {
            C(function o(i) {
                let m = (1e3 * (c - d)) / (1 + (i - n));
                (w = (2 - f) * m + k(1, 0, 1 - f) * w), (n = i), (d = c), (D = C(o));
            });
        }
        function re({ target: n, amplitude: o, duration: i, timestamp: m }) {
            o &&
                C(function b(F) {
                    let ue = (F - m) / i,
                        R = o * Math.exp(-ue),
                        me = c - (n - R);
                    z(l ? R / 16.7 : -me),
                        (y = Math.abs(R) > 0.5 ? C(b) : 0),
                        l && Math.abs(R) < 5 && u(t);
                });
        }
        function j(n) {
            (e.style.pointerEvents = n.type !== 'mousedown' ? 'auto' : 'none'),
                L(),
                (d = c),
                (S = M(n, s)),
                ne(performance.now()),
                A(window, q);
        }
        function J(n) {
            let o = (S - M(n, s)) * (2 - f);
            (S = M(n, s)), z(o);
        }
        function X(n) {
            L();
            let { target: o, amplitude: i } = se(c);
            Math.abs(i) > 10 &&
                (Math.abs(w) < 100
                    ? u(t)
                    : v
                    ? u(t, o)
                    : re({
                          target: o,
                          amplitude: i,
                          duration: p,
                          timestamp: performance.now(),
                      }));
        }
        function se(n) {
            let o = (2 - f) * w,
                i = a ? E.target(e, n + o, s, g) : n + o;
            return (o = i - n), { target: i, amplitude: o };
        }
        let O = !1;
        function le(n) {
            L(),
                (O = !0),
                ((Math.abs(M(n, 'x')) && Math.abs(M(n, 'y')) < 15) || n.shiftKey) &&
                    n.preventDefault(),
                z(M(n, s) * (2 - f)),
                n.shiftKey
                    ? u(t - Math.sign(n.deltaY))
                    : (a || v) &&
                      (Y = setTimeout(() => {
                          u(t), (O = !1);
                      }, 100));
        }
        function oe(n) {
            n.key === 'ArrowLeft' ? u(t - 1) : n.key === 'ArrowRight' && u(t + 1);
        }
        function L() {
            (H = O ? H : t),
                clearTimeout(Y),
                cancelAnimationFrame(y),
                cancelAnimationFrame(D),
                A(window, q, !0);
        }
        function ie(n) {
            (p = n.duration),
                (f = k(2, 0, n.gravity)),
                (s = n.axis),
                (g = n.align),
                (a = n.snap),
                (v = n.clamp),
                (r = n.gap),
                t !== n.index && ((t = K(e, n.index, l)), u(t)),
                l !== n.loop && ((l = n.loop), P(e, t, l), u(t));
        }
        function ce() {
            L(), U.disconnect(), A(T, N, !0);
        }
        return { update: ie, destroy: ce, to: u };
    }
    return ve(Ae);
})();
