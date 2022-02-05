var Slidy = (() => {
    var R = Object.defineProperty;
    var me = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var ve = Object.prototype.hasOwnProperty;
    var de = (t) => R(t, '__esModule', { value: !0 });
    var he = (t, e) => {
            for (var r in e) R(t, r, { get: e[r], enumerable: !0 });
        },
        Ee = (t, e, r, i) => {
            if ((e && typeof e == 'object') || typeof e == 'function')
                for (let a of fe(e))
                    !ve.call(t, a) &&
                        (r || a !== 'default') &&
                        R(t, a, {
                            get: () => e[a],
                            enumerable: !(i = me(e, a)) || i.enumerable,
                        });
            return t;
        };
    var be = (
        (t) => (e, r) =>
            (t && t.get(e)) || ((r = Ee(de({}), e, 1)), t && t.set(e, r), r)
    )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
    var we = {};
    he(we, { slidy: () => He });
    function N(t) {
        return new Promise((e, r) => {
            let i,
                a = 0;
            clearInterval(i),
                (i = setInterval(() => {
                    a++,
                        console.log(a, t.children.length),
                        t.children.length > 2
                            ? (clearInterval(i),
                              Array.from(t.children).forEach((o, c) => {
                                  o.dataset.index = c;
                              }),
                              e(t.children))
                            : a >= 69 && (clearInterval(i), r("Slidy haven't items"));
                }, 16));
        });
    }
    function C(t, e, r) {
        return Math.min(t, Math.max(e, r)) || 0;
    }
    function S(t, e, r) {
        return r
            ? e < 0
                ? f(t).length - 1
                : e > f(t).length - 1
                ? 0
                : e
            : C(f(t).length - 1, 0, e);
    }
    function E(t, e) {
        return t.type === 'wheel'
            ? e || t.shiftKey
                ? t.deltaY
                : t.deltaX
            : e
            ? U(t).clientY
            : U(t).clientX;
    }
    var U = (t) => (t.changedTouches ? t.changedTouches[0] : t),
        Me = (t) => Math.floor(t.children.length / 2);
    var f = (t) => Array.from(t.children),
        ge = (t, e) => t.children[e],
        G = (t) => (t ? 'offsetTop' : 'offsetLeft'),
        p = (t) => (t ? 'offsetHeight' : 'offsetWidth'),
        Te = (t) => (t === 'middle' ? 0.5 : 1),
        xe = (t, e) => (t !== 'start' ? e : 0),
        ye = (t, e, r) => t.parentElement[p(r)] - e[p(r)],
        O = (t, e, r, i) => e[G(r)] - xe(i, ye(t, e, r) * Te(i)),
        J = (t, e, r) => Math.abs(f(t)[e][G(r)]);
    function X(t, e, r, i) {
        return f(t).reduce((a, o, c) => {
            let h = (T) => O(t, T, r, i);
            return Math.abs(h(o) - e) < Math.abs(h(a) - e) ? o : a;
        });
    }
    var v = {
        index: (t, e, r, i, a) => (r ? f(t).indexOf(r) : +X(t, e, i, a).dataset.index),
        position: (t, e, r, i) => O(t, ge(t, e), r, i),
        target: (t, e, r, i) => O(t, X(t, e, r, i), r, i),
        size: (t, e, r) => f(t)[e][p(r)],
        child: (t, e) => f(t).find((r) => +r.dataset.index === e),
        gap: (t, e) => J(t, 0, e) - J(t, 1, e) - f(t)[0][p(e)],
    };
    function g(t, e) {
        for (let r in e) t.style[r] = e[r];
    }
    function F(t, e, r) {
        t.dispatchEvent(new CustomEvent(e, { ...r }));
    }
    function Q(t) {
        let e = t.children[t.children.length - 1];
        t.prepend(e);
    }
    function j(t) {
        let e = t.children[0];
        t.append(e);
    }
    var Le = (t, e) => t.slice(e).concat(t.slice(0, e));
    function W(t, e, r) {
        let i = (o) => t.replaceChildren(...o),
            a = r
                ? Le(f(t), e - Me(t))
                : f(t).sort((o, c) => o.dataset.index - c.dataset.index);
        i(a);
    }
    function He(
        t,
        e = {
            index: 0,
            gravity: 1.2,
            duration: 375,
            vertical: !1,
            clamp: !1,
            loop: !1,
            snap: !1,
            align: 'start',
        }
    ) {
        let r,
            i,
            a = 0,
            o = 0,
            c = 0,
            h = 0,
            T,
            B = c,
            M = e.index,
            x = 0,
            y = t.parentElement,
            L = (n, l, s = !0) =>
                l.forEach(([m, d]) =>
                    s ? n.addEventListener(m, d, !0) : n.removeEventListener(m, d, !0)
                ),
            I = [
                ['touchmove', $],
                ['mousemove', $],
                ['touchend', q],
                ['mouseup', q],
            ],
            K = [
                ['contextmenu', b],
                ['touchstart', Y],
                ['mousedown', Y],
                ['keydown', le],
                ['wheel', re],
                ['resize', ie],
                ['mutate', ae],
            ],
            H = requestAnimationFrame,
            P = new ResizeObserver(() => {
                t.dispatchEvent(new CustomEvent('resize'));
            }),
            D = new MutationObserver(() => {
                t.dispatchEvent(new CustomEvent('mutate'));
            }),
            V = { childList: !0, attributes: !0, subtree: !0 };
        N(t)
            .then((n) => {
                console.log('mounted'),
                    P.observe(t),
                    D.observe(t, V),
                    g(t, {
                        userSelect: 'none',
                        touchAction: 'pan-y',
                        willChange: 'auto',
                        webkitUserSelect: 'none',
                    }),
                    (x = v.gap(t, e.vertical)),
                    W(t, e.index, e.loop),
                    u(e.index),
                    console.log('gap:', x),
                    y && (g(y, { outline: 'none' }), L(y, K)),
                    F(t, 'mounted', { childs: n });
            })
            .catch((n) => console.error(n));
        function w({ pos: n, transition: l = 0 }) {
            (c += e.loop ? Z(n) : n),
                (e.index = v.index(t, c, void 0, e.vertical, e.align));
            function s(d) {
                return d ? `0, ${-c}px, 0` : `${-c}px, 0, 0`;
            }
            let m = { transform: `translate3d(${s(e.vertical)})`, transition: `${l}ms` };
            g(t, m), F(t, 'move', { detail: { index: e.index, position: c } });
        }
        function Z(n) {
            let l = B - n,
                s = v.size(t, 0, e.vertical),
                m = v.size(t, t.children.length - 1, e.vertical),
                d = (z) => (z + x) * Math.sign(-n);
            return (
                M !== e.index &&
                    (n > 0 ? j(t) : Q(t), (n += d(n > 0 ? s : m)), (h = c + n + l)),
                (M = e.index),
                n
            );
        }
        let _ = !1;
        function u(n, l = null) {
            (_ = !0), b(), (n = M = S(t, n, e.loop));
            let s = v.child(t, n),
                m = e.loop ? v.index(t, c, s, e.vertical, e.align) : n,
                d = l
                    ? e.snap
                        ? v.target(t, l, e.vertical, e.align)
                        : l
                    : l === 0
                    ? 0
                    : v.position(t, m, e.vertical, e.align);
            w({ pos: d - c, transition: e.duration });
        }
        function ee(n) {
            H(function l(s) {
                let m = (1e3 * (c - h)) / (1 + (s - n));
                (a = (2 - e.gravity) * m + C(1, 0, 1 - e.gravity) * a),
                    (n = s),
                    (h = c),
                    (i = H(l));
            });
        }
        function te({ target: n, amplitude: l, duration: s, timestamp: m }) {
            l &&
                H(function d(z) {
                    let oe = (z - m) / s,
                        k = l * Math.exp(-oe),
                        ue = c - (n - k);
                    w({ pos: e.loop ? k / 27 : -ue }),
                        (r = Math.abs(k) > 0.5 ? H(d) : 0),
                        e.loop && Math.abs(k) < 5 && u(e.index);
                });
        }
        function Y(n) {
            console.log(n.type),
                b(),
                g(t, { pointerEvents: n.type !== 'mousedown' ? 'auto' : 'none' }),
                (h = c),
                (o = E(n, e.vertical)),
                ee(performance.now()),
                L(window, I);
        }
        function $(n) {
            let l = (o - E(n, e.vertical)) * (2 - e.gravity);
            (o = E(n, e.vertical)), w({ pos: l });
        }
        function q(n) {
            b();
            let { target: l, amplitude: s } = ne(c);
            Math.abs(s) > 10 &&
                (Math.abs(a) < 100
                    ? u(e.index)
                    : e.clamp
                    ? u(e.index, l)
                    : te({
                          target: l,
                          amplitude: s,
                          duration: e.duration,
                          timestamp: performance.now(),
                      }));
        }
        function ne(n) {
            let l = (2 - e.gravity) * a,
                s = e.snap ? v.target(t, n + l, e.vertical, e.align) : n + l;
            return (l = s - n), { target: s, amplitude: l };
        }
        let A = !1;
        function re(n) {
            b(),
                (A = !0),
                ((Math.abs(E(n, e.vertical)) && Math.abs(E(n, e.vertical)) < 15) ||
                    n.shiftKey) &&
                    n.preventDefault(),
                w({ pos: E(n, e.vertical) * (2 - e.gravity) }),
                n.shiftKey
                    ? u(e.index - Math.sign(n.deltaY))
                    : (e.snap || e.clamp) &&
                      (T = setTimeout(() => {
                          u(e.index), (A = !1);
                      }, 100));
        }
        function le(n) {
            n.key === 'ArrowLeft'
                ? u(e.index - 1)
                : n.key === 'ArrowRight' && u(e.index + 1);
        }
        function ie(n) {
            (x = v.gap(t, e.vertical)), u(e.index);
        }
        function ae(n) {}
        function b() {
            (M = A ? M : e.index),
                clearTimeout(T),
                cancelAnimationFrame(r),
                cancelAnimationFrame(i),
                L(window, I, !1);
        }
        function ce(n) {
            for (let l in n)
                if (e[l] !== n[l])
                    switch (l) {
                        case 'index':
                            (e[l] = S(t, n[l], e.loop)), u(e[l]);
                            break;
                        case 'loop':
                            (e[l] = n[l]), W(t, e.index, e[l]), u(e.index);
                            break;
                        case 'gravity':
                            e[l] = C(2, 0, n[l]);
                            break;
                        default:
                            e[l] = n[l];
                            break;
                    }
        }
        function se() {
            b(), P.disconnect(), D.disconnect(), L(y, K, !1);
        }
        return { update: (n) => ce({ ...e, ...n }), destroy: se, to: u };
    }
    return be(we);
})();
