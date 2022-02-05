var Slidy = (() => {
    var O = Object.defineProperty;
    var oe = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var he = Object.prototype.hasOwnProperty;
    var ve = (t) => O(t, '__esModule', { value: !0 });
    var Ee = (t, e) => {
            for (var r in e) O(t, r, { get: e[r], enumerable: !0 });
        },
        be = (t, e, r, a) => {
            if ((e && typeof e == 'object') || typeof e == 'function')
                for (let i of fe(e))
                    !he.call(t, i) &&
                        (r || i !== 'default') &&
                        O(t, i, {
                            get: () => e[i],
                            enumerable: !(a = oe(e, i)) || a.enumerable,
                        });
            return t;
        };
    var de = (
        (t) => (e, r) =>
            (t && t.get(e)) || ((r = be(ve({}), e, 1)), t && t.set(e, r), r)
    )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
    var we = {};
    Ee(we, { slidy: () => He });
    function U(t) {
        return new Promise((e, r) => {
            let a,
                i = 0;
            clearInterval(a),
                (a = setInterval(() => {
                    i++,
                        t.children.length > 2
                            ? (clearInterval(a),
                              Array.from(t.children).forEach((u, c) => {
                                  u.dataset.index = c;
                              }),
                              e(t.children))
                            : i >= 69 && (clearInterval(a), r("Slidy haven't items"));
                }, 16));
        });
    }
    function A(t, e, r) {
        return Math.min(t, Math.max(e, r)) || 0;
    }
    function p(t, e, r) {
        return r
            ? e < 0
                ? h(t).length - 1
                : e > h(t).length - 1
                ? 0
                : e
            : A(h(t).length - 1, 0, e);
    }
    function b(t, e) {
        return t.type === 'wheel'
            ? e || t.shiftKey
                ? t.deltaY
                : t.deltaX
            : e
            ? J(t).clientY
            : J(t).clientX;
    }
    var J = (t) => (t.changedTouches ? t.changedTouches[0] : t),
        Me = (t) => Math.floor(t.children.length / 2);
    var h = (t) => Array.from(t.children),
        ge = (t, e) => t.children[e],
        Q = (t) => (t ? 'offsetTop' : 'offsetLeft'),
        C = (t) => (t ? 'offsetHeight' : 'offsetWidth'),
        Te = (t) => (t === 'middle' ? 0.5 : 1),
        xe = (t, e) => (t !== 'start' ? e : 0),
        Le = (t, e, r) => t.parentElement[C(r)] - e[C(r)],
        S = (t, e, r, a) => e[Q(r)] - xe(a, Le(t, e, r) * Te(a)),
        X = (t, e, r) => Math.abs(h(t)[e][Q(r)]);
    function G(t, e, r, a) {
        return h(t).reduce((i, u, c) => {
            let E = (x) => S(t, x, r, a);
            return Math.abs(E(u) - e) < Math.abs(E(i) - e) ? u : i;
        });
    }
    var f = {
        index: (t, e, r, a, i) => (r ? h(t).indexOf(r) : +G(t, e, a, i).dataset.index),
        position: (t, e, r, a) => S(t, ge(t, e), r, a),
        target: (t, e, r, a) => S(t, G(t, e, r, a), r, a),
        size: (t, e, r) => h(t)[e][C(r)],
        child: (t, e) => h(t).find((r) => +r.dataset.index === e),
        gap: (t, e) => X(t, 0, e) - X(t, 1, e) - h(t)[0][C(e)],
    };
    function T(t, e) {
        for (let r in e) t.style[r] = e[r];
    }
    function F(t, e, r) {
        t.dispatchEvent(new CustomEvent(e, { ...r }));
    }
    function j(t) {
        let e = t.children[t.children.length - 1];
        t.prepend(e);
    }
    function B(t) {
        let e = t.children[0];
        t.append(e);
    }
    var ye = (t, e) => t.slice(e).concat(t.slice(0, e));
    function W(t, e, r) {
        let a = (u) => t.replaceChildren(...u),
            i = r
                ? ye(h(t), e - Me(t))
                : h(t).sort((u, c) => u.dataset.index - c.dataset.index);
        a(i);
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
            a,
            i = 0,
            u = 0,
            c = 0,
            E = 0,
            x,
            V = c,
            M = e.index,
            g = 0,
            L = t.parentElement,
            y = (n, l, s = !0) =>
                l.forEach(([o, v]) =>
                    s ? n.addEventListener(o, v, !0) : n.removeEventListener(o, v, !0)
                ),
            I = [
                ['touchmove', $],
                ['mousemove', $],
                ['touchend', q],
                ['mouseup', q],
            ],
            K = [
                ['contextmenu', d],
                ['touchstart', Y],
                ['mousedown', Y],
                ['keydown', ae],
                ['wheel', le],
                ['resize', ie],
                ['mutate', ce],
            ],
            H = requestAnimationFrame,
            P = new ResizeObserver(() => {
                t.dispatchEvent(new CustomEvent('resize'));
            }),
            D = new MutationObserver(() => {
                t.dispatchEvent(new CustomEvent('mutate'));
            }),
            Z = { childList: !0, attributes: !0, subtree: !0 };
        U(t)
            .then((n) => {
                P.observe(t),
                    D.observe(t, Z),
                    T(t, {
                        userSelect: 'none',
                        touchAction: 'pan-y',
                        willChange: 'auto',
                        webkitUserSelect: 'none',
                    }),
                    (g = f.gap(t, e.vertical)),
                    W(t, e.index, e.loop),
                    m(e.index),
                    console.log('gap:', g),
                    L && (T(L, { outline: 'none' }), y(L, K)),
                    F(t, 'mounted', { childs: n });
            })
            .catch((n) => console.error(n));
        function w(n, l = 0) {
            (c += e.loop ? _(n) : n),
                (e.index = f.index(t, c, void 0, e.vertical, e.align));
            let o = {
                transform: `translate3d(${((v) =>
                    v ? `0, ${-c}px, 0` : `${-c}px, 0, 0`)(e.vertical)})`,
                transition: `${l}ms`,
            };
            T(t, o), F(t, 'move', { detail: { index: e.index, position: c } });
        }
        function _(n) {
            let l = V - n,
                s = f.size(t, 0, e.vertical),
                o = f.size(t, t.children.length - 1, e.vertical),
                v = (R) => (R + g) * Math.sign(-n);
            return (
                M !== e.index &&
                    (n > 0 ? B(t) : j(t), (n += v(n > 0 ? s : o)), (E = c + n + l)),
                (M = e.index),
                n
            );
        }
        let ee = !1;
        function m(n, l = null) {
            (ee = !0), d(), (n = M = p(t, n, e.loop));
            let s = f.child(t, n),
                o = e.loop ? f.index(t, c, s, e.vertical, e.align) : n,
                v = l
                    ? e.snap
                        ? f.target(t, l, e.vertical, e.align)
                        : l
                    : l === 0
                    ? 0
                    : f.position(t, o, e.vertical, e.align);
            w(v - c, e.duration);
        }
        function te(n) {
            H(function l(s) {
                let o = (1e3 * (c - E)) / (1 + (s - n));
                (i = (2 - e.gravity) * o + A(1, 0, 1 - e.gravity) * i),
                    (n = s),
                    (E = c),
                    (a = H(l));
            });
        }
        function ne({ target: n, amplitude: l, duration: s, timestamp: o }) {
            l &&
                H(function v(R) {
                    let ue = (R - o) / s,
                        k = l * Math.exp(-ue),
                        me = c - (n - k);
                    w(e.loop ? k / 16.7 : -me),
                        (r = Math.abs(k) > 0.5 ? H(v) : 0),
                        e.loop && Math.abs(k) < 5 && m(e.index);
                });
        }
        function Y(n) {
            T(t, { pointerEvents: n.type !== 'mousedown' ? 'auto' : 'none' }),
                d(),
                (E = c),
                (u = b(n, e.vertical)),
                te(performance.now()),
                y(window, I);
        }
        function $(n) {
            let l = (u - b(n, e.vertical)) * (2 - e.gravity);
            (u = b(n, e.vertical)), w(l);
        }
        function q(n) {
            d();
            let { target: l, amplitude: s } = re(c);
            Math.abs(s) > 10 &&
                (Math.abs(i) < 100
                    ? m(e.index)
                    : e.clamp
                    ? m(e.index, l)
                    : ne({
                          target: l,
                          amplitude: s,
                          duration: e.duration,
                          timestamp: performance.now(),
                      }));
        }
        function re(n) {
            let l = (2 - e.gravity) * i,
                s = e.snap ? f.target(t, n + l, e.vertical, e.align) : n + l;
            return (l = s - n), { target: s, amplitude: l };
        }
        let z = !1;
        function le(n) {
            d(),
                (z = !0),
                ((Math.abs(b(n, e.vertical)) && Math.abs(b(n, e.vertical)) < 15) ||
                    n.shiftKey) &&
                    n.preventDefault(),
                w(b(n, e.vertical) * (2 - e.gravity)),
                n.shiftKey
                    ? m(e.index - Math.sign(n.deltaY))
                    : (e.snap || e.clamp) &&
                      (x = setTimeout(() => {
                          m(e.index), (z = !1);
                      }, 100));
        }
        function ae(n) {
            n.key === 'ArrowLeft'
                ? m(e.index - 1)
                : n.key === 'ArrowRight' && m(e.index + 1);
        }
        function ie(n) {
            (g = f.gap(t, e.vertical)), m(e.index);
        }
        function ce(n) {}
        function d() {
            (M = z ? M : e.index),
                clearTimeout(x),
                cancelAnimationFrame(r),
                cancelAnimationFrame(a),
                y(window, I, !1);
        }
        N(e);
        function N(n) {
            for (let l in n)
                if (e[l] !== n[l])
                    switch (l) {
                        case 'index':
                            (e[l] = p(t, n[l], e.loop)), m(e[l]);
                            break;
                        case 'loop':
                            (e[l] = n[l]),
                                (g = f.gap(t, e.vertical)),
                                W(t, e.index, e[l]),
                                m(e.index);
                            break;
                        case 'gravity':
                            e[l] = A(2, 0, n[l]);
                            break;
                        default:
                            e[l] = n[l];
                            break;
                    }
        }
        function se() {
            d(), P.disconnect(), D.disconnect(), y(L, K, !1);
        }
        return { update: (n) => N({ ...e, ...n }), destroy: se, to: m };
    }
    return de(we);
})();
