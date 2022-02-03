var Slidy = (() => {
    var W = Object.defineProperty;
    var me = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var he = Object.prototype.hasOwnProperty;
    var Ee = (e) => W(e, '__esModule', { value: !0 });
    var be = (e, r) => {
            for (var t in r) W(e, t, { get: r[t], enumerable: !0 });
        },
        Me = (e, r, t, o) => {
            if ((r && typeof r == 'object') || typeof r == 'function')
                for (let s of fe(r))
                    !he.call(e, s) &&
                        (t || s !== 'default') &&
                        W(e, s, {
                            get: () => r[s],
                            enumerable: !(o = me(r, s)) || o.enumerable,
                        });
            return e;
        };
    var Te = (
        (e) => (r, t) =>
            (e && e.get(r)) || ((t = Me(Ee({}), r, 1)), e && e.set(r, t), t)
    )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
    var Ae = {};
    be(Ae, { slidy: () => de });
    function X(e) {
        return new Promise((r, t) => {
            let o,
                s = 0;
            clearInterval(o),
                (o = setInterval(() => {
                    s++,
                        console.log(s, e.children.length),
                        e.children.length > 2
                            ? (clearInterval(o),
                              Array.from(e.children).forEach((m, T) => {
                                  m.dataset.index = T;
                              }),
                              r(e.children))
                            : s >= 69 && (clearInterval(o), t("Slidy haven't items"));
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
            ? r || e.shiftKey
                ? e.deltaY
                : e.deltaX
            : r
            ? G(e).clientY
            : G(e).clientX;
    }
    var G = (e) => (e.changedTouches ? e.changedTouches[0] : e),
        ye = (e) => Math.floor(e.children.length / 2);
    var h = (e) => Array.from(e.children),
        Le = (e, r) => e.children[r],
        pe = (e) => (e ? 'offsetTop' : 'offsetLeft'),
        $ = (e) => (e ? 'offsetHeight' : 'offsetWidth'),
        ve = (e) => (e === 'middle' ? 0.5 : 1),
        He = (e, r) => (e !== 'start' ? r : 0),
        ge = (e, r, t) => e.parentElement[$(t)] - r[$(t)],
        I = (e, r, t, o) => r[pe(t)] - He(o, ge(e, r, t) * ve(o));
    function Q(e, r, t, o) {
        return h(e).reduce((s, m, T) => {
            let f = (H) => I(e, H, t, o);
            return Math.abs(f(m) - r) < Math.abs(f(s) - r) ? m : s;
        });
    }
    var E = {
            index: (e, r, t, o, s) =>
                t ? h(e).indexOf(t) : +Q(e, r, o, s).dataset.index,
            position: (e, r, t, o) => I(e, Le(e, r), t, o),
            target: (e, r, t, o) => I(e, Q(e, r, t, o), t, o),
            size: (e, r, t) => h(e)[r][$(t)],
            child: (e, r) => h(e).find((t) => +t.dataset.index === r),
        },
        we = (e, r) => e.slice(r).concat(e.slice(0, r));
    function B(e, r) {
        let t = e.children[e.children.length - 1];
        e.prepend(t);
    }
    function V(e, r) {
        let t = e.children[0];
        e.append(t);
    }
    function P(e, r, t) {
        t
            ? (e.replaceChildren(...we(h(e), r - ye(e))),
              (e.style.justifyContent = 'center'))
            : (e.replaceChildren(...h(e)), (e.style.justifyContent = 'start'));
    }
    function de(
        e,
        {
            gap: r = 0,
            index: t = 0,
            vertical: o = !1,
            loop: s = !1,
            snap: m = !1,
            clamp: T = !1,
            gravity: f = 1.2,
            duration: H = 375,
            align: y = 'start',
            indexer: Z = (L) => L,
            scroller: _ = (L) => L,
        }
    ) {
        let L,
            D,
            w = 0,
            S = 0,
            c = 0,
            d = 0,
            Y,
            ee = c,
            g = t,
            p = e.parentElement,
            A = (n, l, i = !1) =>
                l.forEach(([a, b]) =>
                    i ? n.removeEventListener(a, b, !0) : n.addEventListener(a, b, !0)
                ),
            q = [
                ['touchmove', j],
                ['mousemove', j],
                ['touchend', J],
                ['mouseup', J],
            ],
            x = [
                ['contextmenu', v],
                ['touchstart', U],
                ['mousedown', U],
                ['keydown', le],
                ['wheel', se],
                ['resize', () => u(t)],
            ],
            z = requestAnimationFrame,
            N = new ResizeObserver(() => {
                p.dispatchEvent(new CustomEvent('resize'));
            });
        X(e)
            .then((n) => {
                console.log('mounted'),
                    (e.style.userSelect = 'none'),
                    (e.style.touchAction = 'pan-y'),
                    (e.style.pointerEvents = 'none'),
                    (e.style.willChange = 'auto'),
                    (e.style.webkitUserSelect = 'none'),
                    P(e, t, s),
                    u(t),
                    p && (N.observe(p), (p.style.outline = 'none'), A(p, x));
            })
            .catch((n) => console.error(n));
        function C(n, l = 0) {
            (c += s ? te(n) : n), (t = E.index(e, c, void 0, o, y));
            let i = (a) => (a ? `0, ${-c}px, 0` : `${-c}px, 0, 0`);
            (e.style.transform = `translate3d(${i(o)})`),
                (e.style.transition = `${l}ms`),
                (e.dataset.position = `${c}`),
                (e.dataset.index = `${t}`),
                Z(t),
                _(c);
        }
        function te(n) {
            let l = ee - n,
                i = E.size(e, 0, o),
                a = E.size(e, e.children.length - 1, o),
                b = (F) => (F + r) * Math.sign(-n);
            return (
                g !== t &&
                    (n > 0 ? V(e, o) : B(e, o), (n += b(n > 0 ? i : a)), (d = c + n + l)),
                (g = t),
                n
            );
        }
        function u(n, l = null) {
            v(), (n = g = K(e, n, s));
            let i = E.child(e, n),
                a = s ? E.index(e, c, i, o, y) : n,
                b = l
                    ? m
                        ? E.target(e, l, o, y)
                        : l
                    : l === 0
                    ? 0
                    : E.position(e, a, o, y);
            C(b - c, H);
        }
        function ne(n) {
            z(function l(i) {
                let a = (1e3 * (c - d)) / (1 + (i - n));
                (w = (2 - f) * a + k(1, 0, 1 - f) * w), (n = i), (d = c), (D = z(l));
            });
        }
        function re({ target: n, amplitude: l, duration: i, timestamp: a }) {
            l &&
                z(function b(F) {
                    let ue = (F - a) / i,
                        R = l * Math.exp(-ue),
                        ae = c - (n - R);
                    C(s ? R / 16.7 : -ae),
                        (L = Math.abs(R) > 0.5 ? z(b) : 0),
                        s && Math.abs(R) < 5 && u(t);
                });
        }
        function U(n) {
            (e.style.pointerEvents = n.type !== 'mousedown' ? 'auto' : 'none'),
                v(),
                (d = c),
                (S = M(n, o)),
                ne(performance.now()),
                A(window, q);
        }
        function j(n) {
            let l = (S - M(n, o)) * (2 - f);
            (S = M(n, o)), C(l);
        }
        function J(n) {
            v();
            let { target: l, amplitude: i } = oe(c);
            Math.abs(i) > 10 &&
                (Math.abs(w) < 100
                    ? u(t)
                    : T
                    ? u(t, l)
                    : re({
                          target: l,
                          amplitude: i,
                          duration: H,
                          timestamp: performance.now(),
                      }));
        }
        function oe(n) {
            let l = (2 - f) * w,
                i = m ? E.target(e, n + l, o, y) : n + l;
            return (l = i - n), { target: i, amplitude: l };
        }
        let O = !1;
        function se(n) {
            v(),
                (O = !0),
                ((Math.abs(M(n, 'x')) && Math.abs(M(n, 'y')) < 15) || n.shiftKey) &&
                    n.preventDefault(),
                C(M(n, o) * (2 - f)),
                n.shiftKey
                    ? u(t - Math.sign(n.deltaY))
                    : (m || T) &&
                      (Y = setTimeout(() => {
                          u(t), (O = !1);
                      }, 100));
        }
        function le(n) {
            n.key === 'ArrowLeft' ? u(t - 1) : n.key === 'ArrowRight' && u(t + 1);
        }
        function v() {
            (g = O ? g : t),
                clearTimeout(Y),
                cancelAnimationFrame(L),
                cancelAnimationFrame(D),
                A(window, q, !0);
        }
        function ie(n) {
            (H = n.duration),
                (f = k(2, 0, n.gravity)),
                (o = n.vertical),
                (y = n.align),
                (m = n.snap),
                (T = n.clamp),
                (r = n.gap),
                t !== n.index && ((t = K(e, n.index, s)), u(t)),
                s !== n.loop && ((s = n.loop), P(e, t, s), u(t));
        }
        function ce() {
            v(), N.disconnect(), A(p, x, !0);
        }
        return { update: ie, destroy: ce, to: u };
    }
    return Te(Ae);
})();
