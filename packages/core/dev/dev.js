var Slidy = (() => {
    var $ = Object.defineProperty;
    var fe = Object.getOwnPropertyDescriptor;
    var he = Object.getOwnPropertyNames;
    var Ee = Object.prototype.hasOwnProperty;
    var be = (e) => $(e, '__esModule', { value: !0 });
    var Me = (e, t) => {
            for (var r in t) $(e, r, { get: t[r], enumerable: !0 });
        },
        Te = (e, t, r, l) => {
            if ((t && typeof t == 'object') || typeof t == 'function')
                for (let s of he(t))
                    !Ee.call(e, s) &&
                        (r || s !== 'default') &&
                        $(e, s, {
                            get: () => t[s],
                            enumerable: !(l = fe(t, s)) || l.enumerable,
                        });
            return e;
        };
    var pe = (
        (e) => (t, r) =>
            (e && e.get(t)) || ((r = Te(be({}), t, 1)), e && e.set(t, r), r)
    )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
    var Ae = {};
    Me(Ae, { slidy: () => de });
    function G(e) {
        return new Promise((t, r) => {
            let l,
                s = 0;
            clearInterval(l),
                (l = setInterval(() => {
                    s++,
                        console.log(s, e.children.length),
                        e.children.length > 2
                            ? (clearInterval(l),
                              Array.from(e.children).forEach((b, c) => {
                                  b.dataset.index = c;
                              }),
                              t(e.children))
                            : s >= 69 && (clearInterval(l), r("Slidy haven't items"));
                }, 16));
        });
    }
    function S(e, t, r) {
        return Math.min(e, Math.max(t, r)) || 0;
    }
    function K(e, t, r) {
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
            ? Q(e).clientY
            : Q(e).clientX;
    }
    var Q = (e) => (e.changedTouches ? e.changedTouches[0] : e),
        ye = (e) => Math.floor(e.children.length / 2);
    var f = (e) => Array.from(e.children),
        I = (e, t) => e.children[t],
        Le = (e) => (e ? 'offsetTop' : 'offsetLeft'),
        k = (e) => (e ? 'offsetHeight' : 'offsetWidth'),
        He = (e) => (e === 'middle' ? 0.5 : 1),
        ge = (e, t) => (e !== 'start' ? t : 0),
        ve = (e, t, r) => e.parentElement[k(r)] - t[k(r)],
        v = (e, t, r, l) => t[Le(r)] - ge(l, ve(e, t, r) * He(l));
    function B(e, t, r, l) {
        return f(e).reduce((s, b, c) => {
            let T = (E) => v(e, E, r, l);
            return Math.abs(T(b) - t) < Math.abs(T(s) - t) ? b : s;
        });
    }
    var h = {
            index: (e, t, r, l, s) =>
                r ? f(e).indexOf(r) : +B(e, t, l, s).dataset.index,
            position: (e, t, r, l) => v(e, I(e, t), r, l),
            target: (e, t, r, l) => v(e, B(e, t, r, l), r, l),
            size: (e, t, r) => f(e)[t][k(r)],
            child: (e, t) => f(e).find((r) => +r.dataset.index === t),
            gap: (e, t, r) =>
                Math.abs(v(e, I(e, 0), t, r)) -
                Math.abs(v(e, I(e, 1), t, r)) -
                Math.abs(f(e)[0][k(t)]),
        },
        we = (e, t) => e.slice(t).concat(e.slice(0, t));
    function V(e) {
        let t = e.children[e.children.length - 1];
        e.prepend(t);
    }
    function Z(e) {
        let t = e.children[0];
        e.append(t);
    }
    function P(e, t, r) {
        r
            ? (e.replaceChildren(...we(f(e), t - ye(e))),
              (e.style.justifyContent = 'center'))
            : (e.replaceChildren(...f(e)), (e.style.justifyContent = 'start'));
    }
    function de(
        e,
        {
            index: t = 0,
            gravity: r = 1.2,
            duration: l = 375,
            vertical: s = !1,
            clamp: b = !1,
            loop: c = !1,
            snap: T = !1,
            align: E = 'start',
            indexer: _ = (y) => y,
            scroller: ee = (y) => y,
        }
    ) {
        let y,
            D,
            w = 0,
            O = 0,
            u = 0,
            d = 0,
            Y,
            te = u,
            g = t,
            q = 0,
            L = e.parentElement,
            A = (n, o, i = !0) =>
                o.forEach(([m, M]) =>
                    i ? n.addEventListener(m, M, !0) : n.removeEventListener(m, M, !0)
                ),
            N = [
                ['touchmove', J],
                ['mousemove', J],
                ['touchend', X],
                ['mouseup', X],
            ],
            U = [
                ['contextmenu', H],
                ['touchstart', x],
                ['mousedown', x],
                ['keydown', ie],
                ['wheel', le],
                ['resize', () => a(t)],
            ],
            z = requestAnimationFrame,
            j = new ResizeObserver(() => {
                L.dispatchEvent(new CustomEvent('resize'));
            });
        G(e)
            .then((n) => {
                console.log('mounted'),
                    (e.style.userSelect = 'none'),
                    (e.style.touchAction = 'pan-y'),
                    (e.style.pointerEvents = 'none'),
                    (e.style.willChange = 'auto'),
                    (e.style.webkitUserSelect = 'none'),
                    P(e, t, c),
                    a(t),
                    L && (j.observe(L), (L.style.outline = 'none'), A(L, U));
            })
            .catch((n) => console.error(n));
        function C(n, o = 0) {
            (u += c ? ne(n) : n), (t = h.index(e, u, void 0, s, E));
            let i = (m) => (m ? `0, ${-u}px, 0` : `${-u}px, 0, 0`);
            (e.style.transform = `translate3d(${i(s)})`),
                (e.style.transition = `${o}ms`),
                (e.dataset.position = `${u}`),
                (e.dataset.index = `${t}`),
                _(t),
                ee(u);
        }
        function ne(n) {
            let o = te - n,
                i = h.size(e, 0, s),
                m = h.size(e, e.children.length - 1, s),
                M = (W) => (W + q) * Math.sign(-n);
            return (
                g !== t &&
                    (n > 0 ? Z(e) : V(e), (n += M(n > 0 ? i : m)), (d = u + n + o)),
                (g = t),
                n
            );
        }
        function a(n, o = null) {
            H(), (n = g = K(e, n, c));
            let i = h.child(e, n),
                m = c ? h.index(e, u, i, s, E) : n,
                M = o
                    ? T
                        ? h.target(e, o, s, E)
                        : o
                    : o === 0
                    ? 0
                    : h.position(e, m, s, E);
            C(M - u, l);
        }
        function re(n) {
            z(function o(i) {
                let m = (1e3 * (u - d)) / (1 + (i - n));
                (w = (2 - r) * m + S(1, 0, 1 - r) * w), (n = i), (d = u), (D = z(o));
            });
        }
        function se({ target: n, amplitude: o, duration: i, timestamp: m }) {
            o &&
                z(function M(W) {
                    let ae = (W - m) / i,
                        R = o * Math.exp(-ae),
                        me = u - (n - R);
                    C(c ? R / 16.7 : -me),
                        (y = Math.abs(R) > 0.5 ? z(M) : 0),
                        c && Math.abs(R) < 5 && a(t);
                });
        }
        function x(n) {
            (e.style.pointerEvents = n.type !== 'mousedown' ? 'auto' : 'none'),
                H(),
                (d = u),
                (O = p(n, s)),
                re(performance.now()),
                A(window, N);
        }
        function J(n) {
            let o = (O - p(n, s)) * (2 - r);
            (O = p(n, s)), C(o);
        }
        function X(n) {
            H();
            let { target: o, amplitude: i } = oe(u);
            Math.abs(i) > 10 &&
                (Math.abs(w) < 100
                    ? a(t)
                    : b
                    ? a(t, o)
                    : se({
                          target: o,
                          amplitude: i,
                          duration: l,
                          timestamp: performance.now(),
                      }));
        }
        function oe(n) {
            let o = (2 - r) * w,
                i = T ? h.target(e, n + o, s, E) : n + o;
            return (o = i - n), { target: i, amplitude: o };
        }
        let F = !1;
        function le(n) {
            H(),
                (F = !0),
                ((Math.abs(p(n, s)) && Math.abs(p(n, s)) < 15) || n.shiftKey) &&
                    n.preventDefault(),
                C(p(n, s) * (2 - r)),
                n.shiftKey
                    ? a(t - Math.sign(n.deltaY))
                    : (T || b) &&
                      (Y = setTimeout(() => {
                          a(t), (F = !1);
                      }, 100));
        }
        function ie(n) {
            n.key === 'ArrowLeft' ? a(t - 1) : n.key === 'ArrowRight' && a(t + 1);
        }
        function H() {
            (g = F ? g : t),
                clearTimeout(Y),
                cancelAnimationFrame(y),
                cancelAnimationFrame(D),
                A(window, N, !0);
        }
        function ue(n) {
            (l = n.duration),
                (r = S(2, 0, n.gravity)),
                (s = n.vertical),
                (E = n.align),
                (T = n.snap),
                (b = n.clamp),
                t !== n.index && ((t = K(e, n.index, c)), a(t)),
                c !== n.loop && ((c = n.loop), (q = h.gap(e, s, E)), P(e, t, c), a(t));
        }
        function ce() {
            H(), j.disconnect(), A(L, U, !1);
        }
        return { update: ue, destroy: ce, to: a };
    }
    return pe(Ae);
})();
