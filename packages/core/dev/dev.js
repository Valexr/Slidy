var Slidy = (() => {
    var $ = Object.defineProperty;
    var ae = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var he = Object.prototype.hasOwnProperty;
    var Ee = (e) => $(e, '__esModule', { value: !0 });
    var Me = (e, r) => {
            for (var t in r) $(e, t, { get: r[t], enumerable: !0 });
        },
        be = (e, r, t, s) => {
            if ((r && typeof r == 'object') || typeof r == 'function')
                for (let l of fe(r))
                    !he.call(e, l) &&
                        (t || l !== 'default') &&
                        $(e, l, {
                            get: () => r[l],
                            enumerable: !(s = ae(r, l)) || s.enumerable,
                        });
            return e;
        };
    var ve = (
        (e) => (r, t) =>
            (e && e.get(r)) || ((t = be(Ee({}), r, 1)), e && e.set(r, t), t)
    )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
    var Ae = {};
    Me(Ae, { slidy: () => de });
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
                              Array.from(e.children).forEach((a, b) => {
                                  a.dataset.index = b;
                              }),
                              r(e.children))
                            : l >= 69 && (clearInterval(s), t("Slidy haven't items"));
                }, 16));
        });
    }
    function k(e, r, t) {
        return Math.min(e, Math.max(r, t)) || 0;
    }
    function P(e, r, t = !1) {
        return t
            ? r < 0
                ? h(e).length - 1
                : r > h(e).length - 1
                ? 0
                : r
            : k(h(e).length - 1, 0, r);
    }
    function v(e, r) {
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
        I = (e) => (e === 'y' ? 'offsetHeight' : 'offsetWidth'),
        Le = (e) => (e === 'middle' ? 0.5 : 1),
        He = (e, r) => (e !== 'start' ? r : 0),
        pe = (e, r, t) => e.parentElement[I(t)] - r[I(t)],
        K = (e, r, t, s) => r[Te(t)] - He(s, pe(e, r, t) * Le(s));
    function B(e, r, t, s) {
        return h(e).reduce((l, a, b) => {
            let f = (H) => K(e, H, t, s);
            return Math.abs(f(a) - r) < Math.abs(f(l) - r) ? a : l;
        });
    }
    var E = {
            index: (e, r, t, s, l) =>
                t ? h(e).indexOf(t) : +B(e, r, s, l).dataset.index,
            position: (e, r, t, s) => K(e, ye(e, r), t, s),
            target: (e, r, t, s) => K(e, B(e, r, t, s), t, s),
            size: (e, r, t) => h(e)[r][I(t)],
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
    function O(e, r, t) {
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
            clamp: b = !1,
            gravity: f = 1.2,
            duration: H = 375,
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
            p = t,
            T = e?.parentElement,
            A = (n, i, o = !1) =>
                i.forEach(([m, M]) =>
                    o ? n?.removeEventListener(m, M, !0) : n?.addEventListener(m, M, !0)
                ),
            q = [
                ['touchmove', U],
                ['mousemove', U],
                ['touchend', X],
                ['mouseup', X],
            ],
            N = [
                ['contextmenu', L],
                ['touchstart', J],
                ['mousedown', J],
                ['keydown', ie],
                ['wheel', le],
                ['resize', () => u(t)],
            ],
            C = requestAnimationFrame,
            j = new ResizeObserver(() => {
                T?.dispatchEvent(new CustomEvent('resize'));
            });
        G(e)
            .then((n) => {
                console.log('mounted'),
                    (e.style.userSelect = 'none'),
                    (e.style.touchAction = 'pan-y'),
                    (e.style.pointerEvents = 'none'),
                    (e.style.willChange = 'auto'),
                    O(e, t, l),
                    u(t),
                    T && ((T.style.outline = 'none'), A(T, N), j.observe(T));
            })
            .catch((n) => console.error(n));
        function z(n, i = 0) {
            (c += l ? te(n) : n), (t = E.index(e, c, void 0, s, g));
            let o = (m) => (m === 'y' ? `0, ${-c}px, 0` : `${-c}px, 0, 0`);
            (e.style.transform = `translate3d(${o(s)})`),
                (e.style.transition = `${i}ms`),
                (e.dataset.position = `${c}`),
                (e.dataset.index = `${t}`),
                _(t),
                x(c);
        }
        function te(n) {
            let i = ee - n,
                o = E.size(e, 0, s),
                m = E.size(e, e.children.length - 1, s),
                M = (W) => (W + r) * Math.sign(-n);
            return (
                p !== t &&
                    (n > 0 ? Z(e, s) : V(e, s), (n += M(n > 0 ? o : m)), (d = c + n + i)),
                (p = t),
                n
            );
        }
        function u(n, i = null) {
            L(), (n = p = P(e, n, l));
            let o = E.child(e, n),
                m = l ? E.index(e, c, o, s, g) : n,
                M = i
                    ? a
                        ? E.target(e, i, s, g)
                        : i
                    : i === 0
                    ? 0
                    : E.position(e, m, s, g);
            z(M - c, H), b && l && O(e, n, l);
        }
        function ne(n) {
            C(function i(o) {
                let m = (1e3 * (c - d)) / (1 + (o - n));
                (w = (2 - f) * m + k(1, 0, 1 - f) * w), (n = o), (d = c), (D = C(i));
            });
        }
        function re({ target: n, amplitude: i, duration: o, timestamp: m }) {
            i &&
                C(function M(W) {
                    let ue = (W - m) / o,
                        R = i * Math.exp(-ue),
                        me = c - (n - R);
                    z(l ? R / 16.7 : -me),
                        (y = Math.abs(R) > 0.5 ? C(M) : 0),
                        l && Math.abs(R) < 5 && u(t);
                });
        }
        function J(n) {
            (e.style.pointerEvents = n.type !== 'mousedown' ? 'auto' : 'none'),
                L(),
                (d = c),
                (S = v(n, s)),
                ne(performance.now()),
                A(window, q);
        }
        function U(n) {
            let i = (S - v(n, s)) * (2 - f);
            (S = v(n, s)), z(i);
        }
        function X(n) {
            L();
            let { target: i, amplitude: o } = se(c);
            Math.abs(o) > 10 &&
                (Math.abs(w) < 100
                    ? u(t)
                    : b
                    ? u(t, i)
                    : re({
                          target: i,
                          amplitude: o,
                          duration: H,
                          timestamp: performance.now(),
                      }));
        }
        function se(n) {
            let i = (2 - f) * w,
                o = a ? E.target(e, n + i, s, g) : n + i;
            return (i = o - n), { target: o, amplitude: i };
        }
        let F = !1;
        function le(n) {
            L(),
                (F = !0),
                ((Math.abs(v(n, 'x')) && Math.abs(v(n, 'y')) < 15) || n.shiftKey) &&
                    n.preventDefault(),
                z(v(n, s) * (2 - f)),
                n.shiftKey
                    ? u(t - Math.sign(n.deltaY))
                    : (a || b) &&
                      (Y = setTimeout(() => {
                          u(t), (F = !1);
                      }, 100));
        }
        function ie(n) {
            n.key === 'ArrowLeft' ? u(t - 1) : n.key === 'ArrowRight' && u(t + 1);
        }
        function L() {
            (p = F ? p : t),
                clearTimeout(Y),
                cancelAnimationFrame(y),
                cancelAnimationFrame(D),
                A(window, q, !0);
        }
        function oe(n) {
            (H = n.duration),
                (f = k(2, 0, n.gravity)),
                (s = n.axis),
                (g = n.align),
                (a = n.snap),
                (b = n.clamp),
                (r = n.gap),
                t !== n.index && ((t = P(e, n.index, l)), u(t)),
                l !== n.loop && ((l = n.loop), O(e, t, l), u(t));
        }
        function ce() {
            L(), j.disconnect(), A(T, N, !0);
        }
        return { update: oe, destroy: ce, to: u };
    }
    return ve(Ae);
})();
