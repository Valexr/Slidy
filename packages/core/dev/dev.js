var Slidy = (() => {
    var I = Object.defineProperty;
    var de = Object.getOwnPropertyDescriptor;
    var ge = Object.getOwnPropertyNames;
    var Te = Object.prototype.hasOwnProperty;
    var Le = (e) => I(e, '__esModule', { value: !0 });
    var He = (e, t) => {
            for (var n in t) I(e, n, { get: t[n], enumerable: !0 });
        },
        ye = (e, t, n, r) => {
            if ((t && typeof t == 'object') || typeof t == 'function')
                for (let l of ge(t))
                    !Te.call(e, l) &&
                        (n || l !== 'default') &&
                        I(e, l, {
                            get: () => t[l],
                            enumerable: !(r = de(t, l)) || r.enumerable,
                        });
            return e;
        };
    var we = (
        (e) => (t, n) =>
            (e && e.get(t)) || ((n = ye(Le({}), t, 1)), e && e.set(t, n), n)
    )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
    var Se = {};
    He(Se, { slidy: () => ke });
    function Z(e) {
        return new Promise((t, n) => {
            let r,
                l = 0;
            clearInterval(r),
                (r = setInterval(() => {
                    l++,
                        e.children.length > 2
                            ? (clearInterval(r),
                              Array.from(e.children).forEach((s, M) => {
                                  s.dataset.index = M;
                              }),
                              t(e.children))
                            : l >= 69 && (clearInterval(r), n("Slidy haven't items"));
                }, 16));
        });
    }
    function k(e, t, n) {
        return Math.min(e, Math.max(t, n)) || 0;
    }
    function P(e, t, n) {
        return n
            ? t < 0
                ? E(e).length - 1
                : t > E(e).length - 1
                ? 0
                : t
            : k(E(e).length - 1, 0, t);
    }
    function p(e, t) {
        return e.type === 'wheel'
            ? t || e.shiftKey
                ? e.deltaY
                : e.deltaX
            : t
            ? _(e).clientY
            : _(e).clientX;
    }
    var _ = (e) => (e.changedTouches ? e.changedTouches[0] : e),
        xe = (e) => Math.floor(e.children.length / 2);
    var E = (e) => Array.from(e.children),
        Ce = (e, t) => e.children[t],
        ne = (e) => (e ? 'offsetTop' : 'offsetLeft'),
        R = (e) => (e ? 'offsetHeight' : 'offsetWidth'),
        Ae = (e) => (e === 'middle' ? 0.5 : 1),
        ze = (e, t) => (e !== 'start' ? t : 0),
        Oe = (e, t, n) => e.parentElement[R(n)] - t[R(n)],
        K = (e, t, n, r) => t[ne(n)] - ze(r, Oe(e, t, n) * Ae(r)),
        ee = (e, t, n) => Math.abs(E(e)[t][ne(n)]);
    function te(e, t, n, r) {
        return E(e).reduce((l, s, M) => {
            let c = (v) => K(e, v, n, r);
            return Math.abs(c(s) - t) < Math.abs(c(l) - t) ? s : l;
        });
    }
    var h = {
        index: (e, t, n, r, l) => (n ? E(e).indexOf(n) : +te(e, t, r, l).dataset.index),
        position: (e, t, n, r) => K(e, Ce(e, t), n, r),
        target: (e, t, n, r) => K(e, te(e, t, n, r), n, r),
        size: (e, t, n) => E(e)[t][R(n)],
        child: (e, t) => E(e).find((n) => +n.dataset.index === t),
        gap: (e, t) => ee(e, 0, t) - ee(e, 1, t) - E(e)[0][R(t)],
    };
    function H(e, t) {
        for (let n in t) e.style[n] = t[n];
    }
    function D(e, t, n) {
        e.dispatchEvent(new CustomEvent(t, { ...n }));
    }
    function oe(e) {
        let t = e.children[e.children.length - 1];
        e.prepend(t);
    }
    function re(e) {
        let t = e.children[0];
        e.append(t);
    }
    var Re = (e, t) => e.slice(t).concat(e.slice(0, t));
    function Y(e, t, n) {
        let r = (s) => e.replaceChildren(...s),
            l = n
                ? Re(E(e), t - xe(e))
                : E(e).sort((s, M) => s.dataset.index - M.dataset.index);
        r(l);
    }
    function ke(e, t) {
        let {
                index: n = 0,
                gravity: r = 1.2,
                duration: l = 375,
                vertical: s = !1,
                clamp: M = !1,
                loop: c = !1,
                snap: v = !1,
                align: d = 'start',
            } = t,
            $,
            q,
            y = 0,
            S = 0,
            u = 0,
            w = 0,
            N,
            se = u,
            T = n,
            L = 0,
            x = e.parentElement,
            C = (o, i, a = !0) =>
                i.forEach(([f, b]) =>
                    a ? o.addEventListener(f, b, !0) : o.removeEventListener(f, b, !0)
                ),
            U = [
                ['touchmove', j],
                ['mousemove', j],
                ['touchend', B],
                ['mouseup', B],
            ],
            J = [
                ['contextmenu', g],
                ['touchstart', Q],
                ['mousedown', Q],
                ['keydown', he],
                ['wheel', fe],
                ['resize', Ee],
                ['mutate', be],
            ],
            A = requestAnimationFrame,
            X = new ResizeObserver(() => {
                e.dispatchEvent(new CustomEvent('resize'));
            }),
            G = new MutationObserver(() => {
                e.dispatchEvent(new CustomEvent('mutate'));
            }),
            ie = { childList: !0, attributes: !0, subtree: !0 };
        Z(e)
            .then((o) => {
                X.observe(e),
                    G.observe(e, ie),
                    H(e, {
                        userSelect: 'none',
                        touchAction: 'pan-y',
                        willChange: 'auto',
                        webkitUserSelect: 'none',
                    }),
                    (L = h.gap(e, s)),
                    Y(e, n, c),
                    m(n),
                    console.log('gap:', L),
                    x && (H(x, { outline: 'none' }), C(x, J)),
                    D(e, 'mounted', { childs: o });
            })
            .catch((o) => console.error(o));
        function z(o, i = 0) {
            (u += c ? le(o) : o), (n = h.index(e, u, void 0, s, d));
            let f = {
                transform: `translate3d(${((b) =>
                    b ? `0, ${-u}px, 0` : `${-u}px, 0, 0`)(s)})`,
                transition: `${i}ms`,
            };
            H(e, f), D(e, 'move', { detail: { index: n, position: u } });
        }
        function le(o) {
            let i = se - o,
                a = h.size(e, 0, s),
                f = h.size(e, e.children.length - 1, s),
                b = (W) => (W + L) * Math.sign(-o);
            return (
                T !== n &&
                    (o > 0 ? re(e) : oe(e), (o += b(o > 0 ? a : f)), (w = u + o + i)),
                (T = n),
                o
            );
        }
        let ae = !1;
        function m(o, i = null) {
            (ae = !0), g(), (o = T = P(e, o, c));
            let a = h.child(e, o),
                f = c ? h.index(e, u, a, s, d) : o,
                b = i
                    ? v
                        ? h.target(e, i, s, d)
                        : i
                    : i === 0
                    ? 0
                    : h.position(e, f, s, d);
            z(b - u, l);
        }
        function ce(o) {
            A(function i(a) {
                let f = (1e3 * (u - w)) / (1 + (a - o));
                (y = (2 - r) * f + k(1, 0, 1 - r) * y), (o = a), (w = u), (q = A(i));
            });
        }
        function ue({ target: o, amplitude: i, duration: a, timestamp: f }) {
            i &&
                A(function b(W) {
                    let pe = (W - f) / a,
                        O = i * Math.exp(-pe),
                        ve = u - (o - O);
                    z(c ? O / 16.7 : -ve),
                        ($ = Math.abs(O) > 0.5 ? A(b) : 0),
                        c && Math.abs(O) < 5 && m(n);
                });
        }
        function Q(o) {
            H(e, { pointerEvents: o.type !== 'mousedown' ? 'auto' : 'none' }),
                g(),
                (w = u),
                (S = p(o, s)),
                ce(performance.now()),
                C(window, U);
        }
        function j(o) {
            let i = (S - p(o, s)) * (2 - r);
            (S = p(o, s)), z(i);
        }
        function B(o) {
            g();
            let { target: i, amplitude: a } = me(u);
            Math.abs(a) > 10 &&
                (Math.abs(y) < 100
                    ? m(n)
                    : M
                    ? m(n, i)
                    : ue({
                          target: i,
                          amplitude: a,
                          duration: l,
                          timestamp: performance.now(),
                      }));
        }
        function me(o) {
            let i = (2 - r) * y,
                a = v ? h.target(e, o + i, s, d) : o + i;
            return (i = a - o), { target: a, amplitude: i };
        }
        let F = !1;
        function fe(o) {
            g(),
                (F = !0),
                ((Math.abs(p(o, s)) && Math.abs(p(o, s)) < 15) || o.shiftKey) &&
                    o.preventDefault(),
                z(p(o, s) * (2 - r)),
                o.shiftKey
                    ? m(n - Math.sign(o.deltaY))
                    : (v || M) &&
                      (N = setTimeout(() => {
                          m(n), (F = !1);
                      }, 100));
        }
        function he(o) {
            o.key === 'ArrowLeft' ? m(n - 1) : o.key === 'ArrowRight' && m(n + 1);
        }
        function Ee(o) {
            (L = h.gap(e, s)), m(n);
        }
        function be(o) {}
        function g() {
            (T = F ? T : n),
                clearTimeout(N),
                cancelAnimationFrame($),
                cancelAnimationFrame(q),
                C(window, U, !1);
        }
        V(t);
        function V(o) {
            (l = o.duration),
                (r = k(2, 0, o.gravity)),
                (s = o.vertical),
                (d = o.align),
                (v = o.snap),
                (M = o.clamp),
                console.log(c, o),
                n !== o.index && ((n = P(e, o.index, c)), m(n)),
                c !== o.loop && ((c = o.loop), (L = h.gap(e, s)), Y(e, n, c), m(n));
        }
        function Me() {
            g(), X.disconnect(), G.disconnect(), C(x, J, !1);
        }
        return { update: (o) => V({ ...t, ...o }), destroy: () => Me(), to: m };
    }
    return we(Se);
})();
