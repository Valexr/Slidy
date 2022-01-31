(() => {
    // ../../node_modules/.pnpm/svelte@3.46.3/node_modules/svelte/internal/index.mjs
    function noop() {}
    function assign(tar, src) {
        for (const k in src) tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return (
            value &&
            typeof value === 'object' &&
            typeof value.then === 'function'
        );
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return /* @__PURE__ */ Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    var src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function not_equal(a, b) {
        return a != a ? b == b : a !== b;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === void 0) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(
        slot,
        slot_definition,
        ctx,
        $$scope,
        slot_changes,
        get_slot_context_fn
    ) {
        if (slot_changes) {
            const slot_context = get_slot_context(
                slot_definition,
                ctx,
                $$scope,
                get_slot_context_fn
            );
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy)
            ? action_result.destroy
            : noop;
    }
    var is_hydrating = false;
    function start_hydrating() {
        is_hydrating = true;
    }
    function end_hydrating() {
        is_hydrating = false;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i]) iterations[i].d(detaching);
        }
    }
    function element(name2) {
        return document.createElement(name2);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null) node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element2) {
        return Array.from(element2.childNodes);
    }
    function set_data(text2, data) {
        data = '' + data;
        if (text2.wholeText !== data) text2.data = data;
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        } else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1;
    }
    function select_value(select) {
        const selected_option =
            select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function toggle_class(element2, name2, toggle) {
        element2.classList[toggle ? 'add' : 'remove'](name2);
    }
    var current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    var dirty_components = [];
    var binding_callbacks = [];
    var render_callbacks = [];
    var flush_callbacks = [];
    var resolved_promise = Promise.resolve();
    var update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    var seen_callbacks = /* @__PURE__ */ new Set();
    var flushidx = 0;
    function flush() {
        const saved_component = current_component;
        do {
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length) binding_callbacks.pop()();
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    var outroing = /* @__PURE__ */ new Set();
    var outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros,
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach2, callback) {
        if (block && block.o) {
            if (outroing.has(block)) return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach2) block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function handle_promise(promise, info) {
        const token = (info.token = {});
        function update2(type, index, key, value) {
            if (info.token !== token) return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== void 0) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block2, i) => {
                        if (i !== index && block2) {
                            group_outros();
                            transition_out(block2, 1, 1, () => {
                                if (info.blocks[i] === block2) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                } else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks) info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component2 = get_current_component();
            promise.then(
                (value) => {
                    set_current_component(current_component2);
                    update2(info.then, 1, info.value, value);
                    set_current_component(null);
                },
                (error) => {
                    set_current_component(current_component2);
                    update2(info.catch, 2, info.error, error);
                    set_current_component(null);
                    if (!info.hasCatch) {
                        throw error;
                    }
                }
            );
            if (info.current !== info.pending) {
                update2(info.pending, 0);
                return true;
            }
        } else {
            if (info.current !== info.then) {
                update2(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
    }
    var globals =
        typeof window !== 'undefined'
            ? window
            : typeof globalThis !== 'undefined'
            ? globalThis
            : global;
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(
        old_blocks,
        dirty,
        get_key,
        dynamic,
        ctx,
        list,
        lookup,
        node,
        destroy,
        create_each_block3,
        next2,
        get_context
    ) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--) old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = /* @__PURE__ */ new Map();
        const deltas = /* @__PURE__ */ new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block3(key, child_ctx);
                block.c();
            } else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, (new_blocks[i] = block));
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = /* @__PURE__ */ new Set();
        const did_move = /* @__PURE__ */ new Set();
        function insert2(block) {
            transition_in(block, 1);
            block.m(node, next2);
            lookup.set(block.key, block);
            next2 = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                next2 = new_block.first;
                o--;
                n--;
            } else if (!new_lookup.has(old_key)) {
                destroy(old_block, lookup);
                o--;
            } else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert2(new_block);
            } else if (did_move.has(old_key)) {
                o--;
            } else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert2(new_block);
            } else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
        }
        while (n) insert2(new_blocks[n - 1]);
        return new_blocks;
    }
    function bind(component, name2, callback) {
        const index = component.$$.props[name2];
        if (index !== void 0) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                } else {
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
    }
    function init(
        component,
        options,
        instance3,
        create_fragment3,
        not_equal2,
        props,
        append_styles,
        dirty = [-1]
    ) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = (component.$$ = {
            fragment: null,
            ctx: null,
            props,
            update: noop,
            not_equal: not_equal2,
            bound: blank_object(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(
                options.context ||
                    (parent_component ? parent_component.$$.context : [])
            ),
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root,
        });
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance3
            ? instance3(component, options.props || {}, (i, ret, ...rest) => {
                  const value = rest.length ? rest[0] : ret;
                  if ($$.ctx && not_equal2($$.ctx[i], ($$.ctx[i] = value))) {
                      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
                      if (ready) make_dirty(component, i);
                  }
                  return ret;
              })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment3 ? create_fragment3($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                start_hydrating();
                const nodes2 = children(options.target);
                $$.fragment && $$.fragment.l(nodes2);
                nodes2.forEach(detach);
            } else {
                $$.fragment && $$.fragment.c();
            }
            if (options.intro) transition_in(component.$$.fragment);
            mount_component(
                component,
                options.target,
                options.anchor,
                options.customElement
            );
            end_hydrating();
            flush();
        }
        set_current_component(parent_component);
    }
    var SvelteElement;
    if (typeof HTMLElement === 'function') {
        SvelteElement = class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            connectedCallback() {
                const { on_mount } = this.$$;
                this.$$.on_disconnect = on_mount.map(run).filter(is_function);
                for (const key in this.$$.slotted) {
                    this.appendChild(this.$$.slotted[key]);
                }
            }
            attributeChangedCallback(attr2, _oldValue, newValue) {
                this[attr2] = newValue;
            }
            disconnectedCallback() {
                run_all(this.$$.on_disconnect);
            }
            $destroy() {
                destroy_component(this, 1);
                this.$destroy = noop;
            }
            $on(type, callback) {
                const callbacks =
                    this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
                callbacks.push(callback);
                return () => {
                    const index = callbacks.indexOf(callback);
                    if (index !== -1) callbacks.splice(index, 1);
                };
            }
            $set($$props) {
                if (this.$$set && !is_empty($$props)) {
                    this.$$.skip_bound = true;
                    this.$$set($$props);
                    this.$$.skip_bound = false;
                }
            }
        };
    }
    var SvelteComponent = class {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks =
                this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1) callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };

    // package.json
    var version = '3.0.0';

    // ../core/dist/slidy.mjs
    function onMounted(node) {
        return new Promise((resolve, reject) => {
            let mounting,
                count = 0;
            clearInterval(mounting);
            mounting = setInterval(() => {
                count++;
                console.log(count, node.children.length);
                if (node.children.length > 2) {
                    clearInterval(mounting);
                    Array.from(node.children).forEach((c, i) => {
                        c.dataset.index = i;
                    });
                    resolve(node.children);
                } else if (count >= 69) {
                    clearInterval(mounting);
                    reject(`Slidy haven't items`);
                }
            }, 16);
        });
    }
    function maxMin(max, min, val) {
        return Math.min(max, Math.max(min, val)) || 0;
    }
    function indexing(node, index, loop = false) {
        if (loop) {
            if (index < 0) {
                return nodes(node).length - 1;
            } else if (index > nodes(node).length - 1) {
                return 0;
            } else return index;
        } else return maxMin(nodes(node).length - 1, 0, index);
    }
    function axisCoord(e, axis) {
        if (e.type === 'wheel') {
            return axis === 'y' ? e.deltaY : e.shiftKey ? e.deltaY : e.deltaX;
        } else return axis === 'y' ? uniQ(e).clientY : uniQ(e).clientX;
    }
    var uniQ = (e) => (e.changedTouches ? e.changedTouches[0] : e);
    var nodes = (node) => Array.from(node.children);
    var child = (node, index) => node.children[index];
    var coord = (axis) => (axis === 'y' ? 'offsetTop' : 'offsetLeft');
    var size = (axis) => (axis === 'y' ? 'offsetHeight' : 'offsetWidth');
    var part = (align) => (align === 'middle' ? 0.5 : 1);
    var diff = (align, pos) => (align !== 'start' ? pos : 0);
    var offset = (node, child2, axis) =>
        node.parentElement[size(axis)] - child2[size(axis)];
    var position = (node, child2, axis, align, loop = false) =>
        child2[coord(axis)] -
        diff(align, offset(node, child2, axis) * part(align));
    function closest(node, target, axis, align, loop = false) {
        return nodes(node).reduce((prev2, curr, i) => {
            const pos = (child2) => position(node, child2, axis, align, loop);
            return Math.abs(pos(curr) - target) < Math.abs(pos(prev2) - target)
                ? curr
                : prev2;
        });
    }
    var find = {
        index: (node, target, child2, axis, align, loop = false) =>
            child2
                ? nodes(node).indexOf(child2)
                : +closest(node, target, axis, align, loop).dataset.index,
        position: (node, index, axis, align, loop = false) =>
            position(node, child(node, index), axis, align, loop),
        target: (node, target, axis, align, loop = false) =>
            position(
                node,
                closest(node, target, axis, align, loop),
                axis,
                align,
                loop
            ),
        size: (node, index, axis) => nodes(node)[index][size(axis)],
        child: (node, index) =>
            nodes(node).find((child2) => +child2.dataset.index === index),
    };
    var rotate = (array, key) => array.slice(key).concat(array.slice(0, key));
    function prev(node, axis) {
        const last = node.children[node.children.length - 1];
        node.prepend(last);
    }
    function next(node, axis) {
        const first = node.children[0];
        node.append(first);
    }
    function slidy(node, options = {}) {
        let {
            gap = 0,
            index = 0,
            axis = 'x',
            loop = false,
            snap = false,
            clamp = false,
            gravity = 1.2,
            duration = 375,
            align = 'start',
            indexer = (x) => x,
            scroller = (p) => p,
        } = options;
        let raf,
            rak,
            velocity = 0,
            reference = 0,
            position2 = 0,
            frame = 0,
            dragtime,
            wheeltime,
            hip = position2,
            hix = index;
        const PARENT = node.parentElement;
        const CIX = Math.floor(node.children.length / 2);
        const RAF = requestAnimationFrame;
        onMounted(node)
            .then((childs) => {
                console.log('mounted');
                if (PARENT) PARENT.style.outline = 'none';
                node.style.userSelect = 'none';
                node.style.touchAction = 'pan-y';
                node.style.pointerEvents = 'none';
                node.style.willChange = 'auto';
                node.style.webkitUserSelect = 'none';
                if (loop) {
                    node.replaceChildren(
                        ...rotate(Array.from(childs), index - CIX)
                    );
                    node.style.justifyContent = 'center';
                }
                to(index);
                if (PARENT) {
                    PARENT.onresize = () => to(index);
                    PARENT.oncontextmenu = () => clear();
                    PARENT.addEventListener('touchstart', onDown);
                    PARENT.addEventListener('mousedown', onDown);
                    PARENT.addEventListener('keydown', onKeys);
                    PARENT.addEventListener('wheel', onWheel);
                }
            })
            .catch((error) => console.error(error));
        function move(pos, transition = 0) {
            position2 += loop ? looping(pos) : pos;
            index = find.index(node, position2, void 0, axis, align, loop);
            const translate = (axis2) => {
                return axis2 === 'y'
                    ? `0, ${-position2}px, 0`
                    : `${-position2}px, 0, 0`;
            };
            node.style.transform = `translate3d(${translate(axis)})`;
            node.style.transition = `${transition}ms`;
            node.dataset.position = `${position2}`;
            node.dataset.index = `${index}`;
            indexer(index);
            scroller(position2);
        }
        function looping(pos) {
            const delta = hip - pos;
            const first = find.size(node, 0, axis);
            const last = find.size(node, node.children.length - 1, axis);
            const history = (size2) => (size2 + gap) * Math.sign(-pos);
            if (hix !== index) {
                pos > 0 ? next(node, axis) : prev(node, axis);
                pos += history(pos > 0 ? first : last);
                frame = position2 + pos + delta;
            }
            hix = index;
            return pos;
        }
        function to(index2, target = null) {
            clear();
            index2 = hix = indexing(node, index2, loop);
            const child2 = find.child(node, index2);
            const ix = loop
                ? find.index(node, position2, child2, axis, align, loop)
                : index2;
            let pos = target
                ? snap
                    ? find.target(node, target, axis, align, loop)
                    : target
                : target === 0
                ? 0
                : find.position(node, ix, axis, align, loop);
            move(pos - position2, duration);
        }
        function track(timestamp) {
            RAF(function track2(time) {
                const v =
                    (1e3 * (position2 - frame)) / (1 + (time - timestamp));
                velocity =
                    (2 - gravity) * v + maxMin(1, 0, 1 - gravity) * velocity;
                timestamp = time;
                frame = position2;
                rak = RAF(track2);
            });
        }
        function scroll({ target, amplitude, duration: duration2, timestamp }) {
            if (amplitude) {
                RAF(function scroll2(time) {
                    const elapsed = (time - timestamp) / duration2;
                    const delta = amplitude * Math.exp(-elapsed);
                    const dist = position2 - (target - delta);
                    move(loop ? delta / 16.7 : -dist);
                    raf = Math.abs(delta) > 0.5 ? RAF(scroll2) : null;
                    if (loop && Math.abs(delta) < 5) to(index);
                });
            }
        }
        function onDown(e) {
            node.style.pointerEvents = e.type !== 'mousedown' ? 'auto' : 'none';
            clear();
            frame = position2;
            reference = axisCoord(e, axis);
            track(performance.now());
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
            window.addEventListener('touchmove', onMove);
            window.addEventListener('touchend', onUp);
        }
        function onMove(e) {
            const delta = (reference - axisCoord(e, axis)) * (2 - gravity);
            reference = axisCoord(e, axis);
            move(delta);
        }
        function onUp(e) {
            clear();
            const { target, amplitude } = delting(position2);
            if (Math.abs(amplitude) > 10)
                Math.abs(velocity) < 100
                    ? to(index)
                    : clamp
                    ? to(index, target)
                    : scroll({
                          target,
                          amplitude,
                          duration,
                          timestamp: performance.now(),
                      });
        }
        function delting(position3) {
            let amplitude = (2 - gravity) * velocity;
            const target = snap
                ? find.target(node, position3 + amplitude, axis, align, loop)
                : position3 + amplitude;
            amplitude = target - position3;
            return { target, amplitude };
        }
        let wheeling = false;
        function onWheel(e) {
            clear();
            wheeling = true;
            if (
                (Math.abs(axisCoord(e, 'x')) &&
                    Math.abs(axisCoord(e, 'y')) < 15) ||
                e.shiftKey
            )
                e.preventDefault();
            move(axisCoord(e, axis) * (2 - gravity));
            if (e.shiftKey) to(index - Math.sign(e.deltaY));
            else if (snap || clamp)
                wheeltime = setTimeout(
                    () => (to(index), (wheeling = false)),
                    100
                );
        }
        function onKeys(e) {
            if (e.key === 'ArrowLeft') {
                to(index - 1);
            } else if (e.key === 'ArrowRight') {
                to(index + 1);
            }
        }
        function clear() {
            hix = wheeling ? hix : index;
            clearInterval(dragtime);
            clearTimeout(wheeltime);
            cancelAnimationFrame(raf);
            cancelAnimationFrame(rak);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onUp);
        }
        function update2(options2) {
            duration = options2.duration ?? 375;
            gravity = maxMin(2, 0, options2.gravity ?? 1.2);
            axis = options2.axis ?? 'x';
            align = options2.align ?? 'middle';
            snap = options2.snap ?? true;
            clamp = options2.clamp ?? false;
            gap = options2.gap ?? 0;
            if (index !== options2.index) {
                index = indexing(node, options2.index ?? 0, loop);
                to(index);
            }
            if (loop !== options2.loop) {
                console.log(Array.from(node.children));
                loop = options2.loop ?? false;
                if (loop) {
                    node.replaceChildren(
                        ...rotate(Array.from(node.children), index - CIX)
                    );
                    node.style.justifyContent = 'center';
                    to(index);
                } else {
                    node.replaceChildren(...Array.from(node.children));
                    node.style.justifyContent = 'start';
                    to(index);
                }
            }
        }
        function destroy() {
            clear();
            if (PARENT) {
                PARENT.onresize = null;
                PARENT.oncontextmenu = null;
                PARENT.removeEventListener('touchstart', onDown);
                PARENT.removeEventListener('mousedown', onDown);
                PARENT.removeEventListener('keydown', onKeys);
                PARENT.removeEventListener('wheel', onWheel);
            }
        }
        return { update: update2, destroy, to };
    }

    // src/Slidy.svelte
    var get_dots_arrow_right_slot_changes_1 = (dirty) => ({
        item: dirty & 768,
    });
    var get_dots_arrow_right_slot_context_1 = (ctx) => ({ item: ctx[27] });
    var get_dots_arrow_right_slot_changes = (dirty) => ({ item: dirty & 768 });
    var get_dots_arrow_right_slot_context = (ctx) => ({ item: ctx[27] });
    function get_each_context(ctx, list, i) {
        const child_ctx = ctx.slice();
        child_ctx[24] = list[i];
        child_ctx[26] = i;
        return child_ctx;
    }
    var get_dot_slot_changes = (dirty) => ({
        dot: dirty & 768,
        item: dirty & 768,
    });
    var get_dot_slot_context = (ctx) => ({
        dot: ctx[24],
        item: ctx[27],
    });
    var get_dots_arrow_left_slot_changes_1 = (dirty) => ({ item: dirty & 768 });
    var get_dots_arrow_left_slot_context_1 = (ctx) => ({ item: ctx[27] });
    var get_dots_arrow_left_slot_changes = (dirty) => ({ item: dirty & 768 });
    var get_dots_arrow_left_slot_context = (ctx) => ({ item: ctx[27] });
    var get_arrow_right_slot_changes_1 = (dirty) => ({ item: dirty & 768 });
    var get_arrow_right_slot_context_1 = (ctx) => ({ item: ctx[27] });
    var get_arrow_left_slot_changes_1 = (dirty) => ({ item: dirty & 768 });
    var get_arrow_left_slot_context_1 = (ctx) => ({ item: ctx[27] });
    var get_arrow_right_slot_changes = (dirty) => ({ item: dirty & 768 });
    var get_arrow_right_slot_context = (ctx) => ({ item: ctx[27] });
    var get_arrow_left_slot_changes = (dirty) => ({ item: dirty & 768 });
    var get_arrow_left_slot_context = (ctx) => ({ item: ctx[27] });
    function get_each_context_1(ctx, list, i) {
        const child_ctx = ctx.slice();
        child_ctx[27] = list[i];
        child_ctx[26] = i;
        return child_ctx;
    }
    var get_default_slot_changes = (dirty) => ({ item: dirty & 768 });
    var get_default_slot_context = (ctx) => ({ item: ctx[27] });
    var get_loader_slot_changes = (dirty) => ({ item: dirty & 768 });
    var get_loader_slot_context = (ctx) => ({ item: ctx[27] });
    function create_catch_block(ctx) {
        return {
            c: noop,
            m: noop,
            p: noop,
            i: noop,
            o: noop,
            d: noop,
        };
    }
    function create_then_block(ctx) {
        let t0;
        let ul;
        let each_blocks = [];
        let each_1_lookup = /* @__PURE__ */ new Map();
        let slidy_action;
        let t1;
        let t2;
        let if_block2_anchor;
        let current;
        let mounted;
        let dispose;
        let if_block0 = !ctx[7] && create_if_block_12(ctx);
        let each_value_1 = ctx[9];
        const get_key = (ctx2) => ctx2[2](ctx2[27]);
        for (let i = 0; i < each_value_1.length; i += 1) {
            let child_ctx = get_each_context_1(ctx, each_value_1, i);
            let key = get_key(child_ctx);
            each_1_lookup.set(
                key,
                (each_blocks[i] = create_each_block_1(key, child_ctx))
            );
        }
        let if_block1 = ctx[5].arrows && ctx[7] && create_if_block_7(ctx);
        let if_block2 = ctx[5].dots && ctx[7] && create_if_block(ctx);
        return {
            c() {
                if (if_block0) if_block0.c();
                t0 = space();
                ul = element('ul');
                for (let i = 0; i < each_blocks.length; i += 1) {
                    each_blocks[i].c();
                }
                t1 = space();
                if (if_block1) if_block1.c();
                t2 = space();
                if (if_block2) if_block2.c();
                if_block2_anchor = empty();
                attr(ul, 'class', 'slidy-ul svelte-1jcs13h');
            },
            m(target, anchor) {
                if (if_block0) if_block0.m(target, anchor);
                insert(target, t0, anchor);
                insert(target, ul, anchor);
                for (let i = 0; i < each_blocks.length; i += 1) {
                    each_blocks[i].m(ul, null);
                }
                insert(target, t1, anchor);
                if (if_block1) if_block1.m(target, anchor);
                insert(target, t2, anchor);
                if (if_block2) if_block2.m(target, anchor);
                insert(target, if_block2_anchor, anchor);
                current = true;
                if (!mounted) {
                    dispose = action_destroyer(
                        (slidy_action = slidy.call(null, ul, {
                            index: ctx[0],
                            axis: ctx[6].axis,
                            align: ctx[3].align,
                            duration: ctx[6].duration,
                            clamp: ctx[6].clamp,
                            gravity: ctx[6].gravity,
                            snap: ctx[6].snap,
                            loop: ctx[6].loop,
                            gap: ctx[4].gap,
                            indexer: ctx[13],
                            scroller: ctx[14],
                        }))
                    );
                    mounted = true;
                }
            },
            p(ctx2, dirty) {
                if (!ctx2[7]) {
                    if (if_block0) {
                        if_block0.p(ctx2, dirty);
                        if (dirty & 128) {
                            transition_in(if_block0, 1);
                        }
                    } else {
                        if_block0 = create_if_block_12(ctx2);
                        if_block0.c();
                        transition_in(if_block0, 1);
                        if_block0.m(t0.parentNode, t0);
                    }
                } else if (if_block0) {
                    group_outros();
                    transition_out(if_block0, 1, 1, () => {
                        if_block0 = null;
                    });
                    check_outros();
                }
                if (dirty & 2837) {
                    each_value_1 = ctx2[9];
                    group_outros();
                    each_blocks = update_keyed_each(
                        each_blocks,
                        dirty,
                        get_key,
                        1,
                        ctx2,
                        each_value_1,
                        each_1_lookup,
                        ul,
                        outro_and_destroy_block,
                        create_each_block_1,
                        null,
                        get_each_context_1
                    );
                    check_outros();
                }
                if (
                    slidy_action &&
                    is_function(slidy_action.update) &&
                    dirty & 91
                )
                    slidy_action.update.call(null, {
                        index: ctx2[0],
                        axis: ctx2[6].axis,
                        align: ctx2[3].align,
                        duration: ctx2[6].duration,
                        clamp: ctx2[6].clamp,
                        gravity: ctx2[6].gravity,
                        snap: ctx2[6].snap,
                        loop: ctx2[6].loop,
                        gap: ctx2[4].gap,
                        indexer: ctx2[13],
                        scroller: ctx2[14],
                    });
                if (ctx2[5].arrows && ctx2[7]) {
                    if (if_block1) {
                        if_block1.p(ctx2, dirty);
                        if (dirty & 160) {
                            transition_in(if_block1, 1);
                        }
                    } else {
                        if_block1 = create_if_block_7(ctx2);
                        if_block1.c();
                        transition_in(if_block1, 1);
                        if_block1.m(t2.parentNode, t2);
                    }
                } else if (if_block1) {
                    group_outros();
                    transition_out(if_block1, 1, 1, () => {
                        if_block1 = null;
                    });
                    check_outros();
                }
                if (ctx2[5].dots && ctx2[7]) {
                    if (if_block2) {
                        if_block2.p(ctx2, dirty);
                        if (dirty & 160) {
                            transition_in(if_block2, 1);
                        }
                    } else {
                        if_block2 = create_if_block(ctx2);
                        if_block2.c();
                        transition_in(if_block2, 1);
                        if_block2.m(
                            if_block2_anchor.parentNode,
                            if_block2_anchor
                        );
                    }
                } else if (if_block2) {
                    group_outros();
                    transition_out(if_block2, 1, 1, () => {
                        if_block2 = null;
                    });
                    check_outros();
                }
            },
            i(local) {
                if (current) return;
                transition_in(if_block0);
                for (let i = 0; i < each_value_1.length; i += 1) {
                    transition_in(each_blocks[i]);
                }
                transition_in(if_block1);
                transition_in(if_block2);
                current = true;
            },
            o(local) {
                transition_out(if_block0);
                for (let i = 0; i < each_blocks.length; i += 1) {
                    transition_out(each_blocks[i]);
                }
                transition_out(if_block1);
                transition_out(if_block2);
                current = false;
            },
            d(detaching) {
                if (if_block0) if_block0.d(detaching);
                if (detaching) detach(t0);
                if (detaching) detach(ul);
                for (let i = 0; i < each_blocks.length; i += 1) {
                    each_blocks[i].d();
                }
                if (detaching) detach(t1);
                if (if_block1) if_block1.d(detaching);
                if (detaching) detach(t2);
                if (if_block2) if_block2.d(detaching);
                if (detaching) detach(if_block2_anchor);
                mounted = false;
                dispose();
            },
        };
    }
    function create_if_block_12(ctx) {
        let section;
        let current;
        const loader_slot_template = ctx[12].loader;
        const loader_slot = create_slot(
            loader_slot_template,
            ctx,
            ctx[11],
            get_loader_slot_context
        );
        const loader_slot_or_fallback = loader_slot || fallback_block_10(ctx);
        return {
            c() {
                section = element('section');
                if (loader_slot_or_fallback) loader_slot_or_fallback.c();
                attr(section, 'id', 'loader');
                attr(section, 'class', 'svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, section, anchor);
                if (loader_slot_or_fallback) {
                    loader_slot_or_fallback.m(section, null);
                }
                current = true;
            },
            p(ctx2, dirty) {
                if (loader_slot) {
                    if (loader_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            loader_slot,
                            loader_slot_template,
                            ctx2,
                            ctx2[11],
                            !current
                                ? get_all_dirty_from_scope(ctx2[11])
                                : get_slot_changes(
                                      loader_slot_template,
                                      ctx2[11],
                                      dirty,
                                      get_loader_slot_changes
                                  ),
                            get_loader_slot_context
                        );
                    }
                }
            },
            i(local) {
                if (current) return;
                transition_in(loader_slot_or_fallback, local);
                current = true;
            },
            o(local) {
                transition_out(loader_slot_or_fallback, local);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(section);
                if (loader_slot_or_fallback)
                    loader_slot_or_fallback.d(detaching);
            },
        };
    }
    function fallback_block_10(ctx) {
        let t;
        return {
            c() {
                t = text('Loading...');
            },
            m(target, anchor) {
                insert(target, t, anchor);
            },
            d(detaching) {
                if (detaching) detach(t);
            },
        };
    }
    function create_if_block_11(ctx) {
        let img;
        let img_alt_value;
        let img_src_value;
        let img_width_value;
        let img_height_value;
        return {
            c() {
                img = element('img');
                attr(img, 'alt', (img_alt_value = ctx[27][ctx[4].imgsrckey]));
                if (
                    !src_url_equal(
                        img.src,
                        (img_src_value = ctx[27][ctx[4].imgsrckey])
                    )
                )
                    attr(img, 'src', img_src_value);
                attr(img, 'width', (img_width_value = ctx[27].width));
                attr(img, 'height', (img_height_value = ctx[27].height));
            },
            m(target, anchor) {
                insert(target, img, anchor);
            },
            p(ctx2, dirty) {
                if (
                    dirty & 784 &&
                    img_alt_value !==
                        (img_alt_value = ctx2[27][ctx2[4].imgsrckey])
                ) {
                    attr(img, 'alt', img_alt_value);
                }
                if (
                    dirty & 784 &&
                    !src_url_equal(
                        img.src,
                        (img_src_value = ctx2[27][ctx2[4].imgsrckey])
                    )
                ) {
                    attr(img, 'src', img_src_value);
                }
                if (
                    dirty & 768 &&
                    img_width_value !== (img_width_value = ctx2[27].width)
                ) {
                    attr(img, 'width', img_width_value);
                }
                if (
                    dirty & 768 &&
                    img_height_value !== (img_height_value = ctx2[27].height)
                ) {
                    attr(img, 'height', img_height_value);
                }
            },
            d(detaching) {
                if (detaching) detach(img);
            },
        };
    }
    function fallback_block_9(ctx) {
        let if_block_anchor;
        let if_block = !ctx[4].backimg && create_if_block_11(ctx);
        return {
            c() {
                if (if_block) if_block.c();
                if_block_anchor = empty();
            },
            m(target, anchor) {
                if (if_block) if_block.m(target, anchor);
                insert(target, if_block_anchor, anchor);
            },
            p(ctx2, dirty) {
                if (!ctx2[4].backimg) {
                    if (if_block) {
                        if_block.p(ctx2, dirty);
                    } else {
                        if_block = create_if_block_11(ctx2);
                        if_block.c();
                        if_block.m(if_block_anchor.parentNode, if_block_anchor);
                    }
                } else if (if_block) {
                    if_block.d(1);
                    if_block = null;
                }
            },
            d(detaching) {
                if (if_block) if_block.d(detaching);
                if (detaching) detach(if_block_anchor);
            },
        };
    }
    function create_each_block_1(key_2, ctx) {
        let li;
        let t;
        let li_data_id_value;
        let li_class_value;
        let li_style_value;
        let current;
        const default_slot_template = ctx[12].default;
        const default_slot = create_slot(
            default_slot_template,
            ctx,
            ctx[11],
            get_default_slot_context
        );
        const default_slot_or_fallback = default_slot || fallback_block_9(ctx);
        return {
            key: key_2,
            first: null,
            c() {
                li = element('li');
                if (default_slot_or_fallback) default_slot_or_fallback.c();
                t = space();
                attr(li, 'data-id', (li_data_id_value = ctx[27].ix));
                attr(
                    li,
                    'class',
                    (li_class_value =
                        null_to_empty(ctx[4].class) + ' svelte-1jcs13h')
                );
                attr(
                    li,
                    'style',
                    (li_style_value =
                        ctx[4].backimg === true
                            ? `background-image: url(${
                                  ctx[27][ctx[4].imgsrckey]
                              })`
                            : null)
                );
                toggle_class(li, 'active', ctx[27].ix === ctx[0]);
                this.first = li;
            },
            m(target, anchor) {
                insert(target, li, anchor);
                if (default_slot_or_fallback) {
                    default_slot_or_fallback.m(li, null);
                }
                append(li, t);
                current = true;
            },
            p(new_ctx, dirty) {
                ctx = new_ctx;
                if (default_slot) {
                    if (default_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            default_slot,
                            default_slot_template,
                            ctx,
                            ctx[11],
                            !current
                                ? get_all_dirty_from_scope(ctx[11])
                                : get_slot_changes(
                                      default_slot_template,
                                      ctx[11],
                                      dirty,
                                      get_default_slot_changes
                                  ),
                            get_default_slot_context
                        );
                    }
                } else {
                    if (
                        default_slot_or_fallback &&
                        default_slot_or_fallback.p &&
                        (!current || dirty & 784)
                    ) {
                        default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
                    }
                }
                if (
                    !current ||
                    (dirty & 768 &&
                        li_data_id_value !== (li_data_id_value = ctx[27].ix))
                ) {
                    attr(li, 'data-id', li_data_id_value);
                }
                if (
                    !current ||
                    (dirty & 16 &&
                        li_class_value !==
                            (li_class_value =
                                null_to_empty(ctx[4].class) +
                                ' svelte-1jcs13h'))
                ) {
                    attr(li, 'class', li_class_value);
                }
                if (
                    !current ||
                    (dirty & 784 &&
                        li_style_value !==
                            (li_style_value =
                                ctx[4].backimg === true
                                    ? `background-image: url(${
                                          ctx[27][ctx[4].imgsrckey]
                                      })`
                                    : null))
                ) {
                    attr(li, 'style', li_style_value);
                }
                if (dirty & 785) {
                    toggle_class(li, 'active', ctx[27].ix === ctx[0]);
                }
            },
            i(local) {
                if (current) return;
                transition_in(default_slot_or_fallback, local);
                current = true;
            },
            o(local) {
                transition_out(default_slot_or_fallback, local);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(li);
                if (default_slot_or_fallback)
                    default_slot_or_fallback.d(detaching);
            },
        };
    }
    function create_if_block_7(ctx) {
        let current_block_type_index;
        let if_block;
        let if_block_anchor;
        let current;
        const if_block_creators = [create_if_block_8, create_else_block_2];
        const if_blocks = [];
        function select_block_type(ctx2, dirty) {
            if (!ctx2[6].loop) return 0;
            return 1;
        }
        current_block_type_index = select_block_type(ctx, -1);
        if_block = if_blocks[current_block_type_index] =
            if_block_creators[current_block_type_index](ctx);
        return {
            c() {
                if_block.c();
                if_block_anchor = empty();
            },
            m(target, anchor) {
                if_blocks[current_block_type_index].m(target, anchor);
                insert(target, if_block_anchor, anchor);
                current = true;
            },
            p(ctx2, dirty) {
                let previous_block_index = current_block_type_index;
                current_block_type_index = select_block_type(ctx2, dirty);
                if (current_block_type_index === previous_block_index) {
                    if_blocks[current_block_type_index].p(ctx2, dirty);
                } else {
                    group_outros();
                    transition_out(
                        if_blocks[previous_block_index],
                        1,
                        1,
                        () => {
                            if_blocks[previous_block_index] = null;
                        }
                    );
                    check_outros();
                    if_block = if_blocks[current_block_type_index];
                    if (!if_block) {
                        if_block = if_blocks[current_block_type_index] =
                            if_block_creators[current_block_type_index](ctx2);
                        if_block.c();
                    } else {
                        if_block.p(ctx2, dirty);
                    }
                    transition_in(if_block, 1);
                    if_block.m(if_block_anchor.parentNode, if_block_anchor);
                }
            },
            i(local) {
                if (current) return;
                transition_in(if_block);
                current = true;
            },
            o(local) {
                transition_out(if_block);
                current = false;
            },
            d(detaching) {
                if_blocks[current_block_type_index].d(detaching);
                if (detaching) detach(if_block_anchor);
            },
        };
    }
    function create_else_block_2(ctx) {
        let button0;
        let t;
        let button1;
        let current;
        let mounted;
        let dispose;
        const arrow_left_slot_template = ctx[12]['arrow-left'];
        const arrow_left_slot = create_slot(
            arrow_left_slot_template,
            ctx,
            ctx[11],
            get_arrow_left_slot_context_1
        );
        const arrow_left_slot_or_fallback =
            arrow_left_slot || fallback_block_8(ctx);
        const arrow_right_slot_template = ctx[12]['arrow-right'];
        const arrow_right_slot = create_slot(
            arrow_right_slot_template,
            ctx,
            ctx[11],
            get_arrow_right_slot_context_1
        );
        const arrow_right_slot_or_fallback =
            arrow_right_slot || fallback_block_7(ctx);
        return {
            c() {
                button0 = element('button');
                if (arrow_left_slot_or_fallback)
                    arrow_left_slot_or_fallback.c();
                t = space();
                button1 = element('button');
                if (arrow_right_slot_or_fallback)
                    arrow_right_slot_or_fallback.c();
                attr(button0, 'class', 'arrow-left svelte-1jcs13h');
                attr(button1, 'class', 'arrow-right svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, button0, anchor);
                if (arrow_left_slot_or_fallback) {
                    arrow_left_slot_or_fallback.m(button0, null);
                }
                insert(target, t, anchor);
                insert(target, button1, anchor);
                if (arrow_right_slot_or_fallback) {
                    arrow_right_slot_or_fallback.m(button1, null);
                }
                current = true;
                if (!mounted) {
                    dispose = [
                        listen(button0, 'click', ctx[17]),
                        listen(button1, 'click', ctx[18]),
                    ];
                    mounted = true;
                }
            },
            p(ctx2, dirty) {
                if (arrow_left_slot) {
                    if (arrow_left_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            arrow_left_slot,
                            arrow_left_slot_template,
                            ctx2,
                            ctx2[11],
                            !current
                                ? get_all_dirty_from_scope(ctx2[11])
                                : get_slot_changes(
                                      arrow_left_slot_template,
                                      ctx2[11],
                                      dirty,
                                      get_arrow_left_slot_changes_1
                                  ),
                            get_arrow_left_slot_context_1
                        );
                    }
                }
                if (arrow_right_slot) {
                    if (arrow_right_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            arrow_right_slot,
                            arrow_right_slot_template,
                            ctx2,
                            ctx2[11],
                            !current
                                ? get_all_dirty_from_scope(ctx2[11])
                                : get_slot_changes(
                                      arrow_right_slot_template,
                                      ctx2[11],
                                      dirty,
                                      get_arrow_right_slot_changes_1
                                  ),
                            get_arrow_right_slot_context_1
                        );
                    }
                }
            },
            i(local) {
                if (current) return;
                transition_in(arrow_left_slot_or_fallback, local);
                transition_in(arrow_right_slot_or_fallback, local);
                current = true;
            },
            o(local) {
                transition_out(arrow_left_slot_or_fallback, local);
                transition_out(arrow_right_slot_or_fallback, local);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(button0);
                if (arrow_left_slot_or_fallback)
                    arrow_left_slot_or_fallback.d(detaching);
                if (detaching) detach(t);
                if (detaching) detach(button1);
                if (arrow_right_slot_or_fallback)
                    arrow_right_slot_or_fallback.d(detaching);
                mounted = false;
                run_all(dispose);
            },
        };
    }
    function create_if_block_8(ctx) {
        let t;
        let if_block1_anchor;
        let current;
        let if_block0 = ctx[0] > 0 && create_if_block_10(ctx);
        let if_block1 = ctx[0] < ctx[9].length - 1 && create_if_block_9(ctx);
        return {
            c() {
                if (if_block0) if_block0.c();
                t = space();
                if (if_block1) if_block1.c();
                if_block1_anchor = empty();
            },
            m(target, anchor) {
                if (if_block0) if_block0.m(target, anchor);
                insert(target, t, anchor);
                if (if_block1) if_block1.m(target, anchor);
                insert(target, if_block1_anchor, anchor);
                current = true;
            },
            p(ctx2, dirty) {
                if (ctx2[0] > 0) {
                    if (if_block0) {
                        if_block0.p(ctx2, dirty);
                        if (dirty & 1) {
                            transition_in(if_block0, 1);
                        }
                    } else {
                        if_block0 = create_if_block_10(ctx2);
                        if_block0.c();
                        transition_in(if_block0, 1);
                        if_block0.m(t.parentNode, t);
                    }
                } else if (if_block0) {
                    group_outros();
                    transition_out(if_block0, 1, 1, () => {
                        if_block0 = null;
                    });
                    check_outros();
                }
                if (ctx2[0] < ctx2[9].length - 1) {
                    if (if_block1) {
                        if_block1.p(ctx2, dirty);
                        if (dirty & 769) {
                            transition_in(if_block1, 1);
                        }
                    } else {
                        if_block1 = create_if_block_9(ctx2);
                        if_block1.c();
                        transition_in(if_block1, 1);
                        if_block1.m(
                            if_block1_anchor.parentNode,
                            if_block1_anchor
                        );
                    }
                } else if (if_block1) {
                    group_outros();
                    transition_out(if_block1, 1, 1, () => {
                        if_block1 = null;
                    });
                    check_outros();
                }
            },
            i(local) {
                if (current) return;
                transition_in(if_block0);
                transition_in(if_block1);
                current = true;
            },
            o(local) {
                transition_out(if_block0);
                transition_out(if_block1);
                current = false;
            },
            d(detaching) {
                if (if_block0) if_block0.d(detaching);
                if (detaching) detach(t);
                if (if_block1) if_block1.d(detaching);
                if (detaching) detach(if_block1_anchor);
            },
        };
    }
    function fallback_block_8(ctx) {
        let t;
        return {
            c() {
                t = text('\u2190');
            },
            m(target, anchor) {
                insert(target, t, anchor);
            },
            d(detaching) {
                if (detaching) detach(t);
            },
        };
    }
    function fallback_block_7(ctx) {
        let t;
        return {
            c() {
                t = text('\u2192');
            },
            m(target, anchor) {
                insert(target, t, anchor);
            },
            d(detaching) {
                if (detaching) detach(t);
            },
        };
    }
    function create_if_block_10(ctx) {
        let button;
        let current;
        let mounted;
        let dispose;
        const arrow_left_slot_template = ctx[12]['arrow-left'];
        const arrow_left_slot = create_slot(
            arrow_left_slot_template,
            ctx,
            ctx[11],
            get_arrow_left_slot_context
        );
        const arrow_left_slot_or_fallback =
            arrow_left_slot || fallback_block_6(ctx);
        return {
            c() {
                button = element('button');
                if (arrow_left_slot_or_fallback)
                    arrow_left_slot_or_fallback.c();
                attr(button, 'class', 'arrow-left svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, button, anchor);
                if (arrow_left_slot_or_fallback) {
                    arrow_left_slot_or_fallback.m(button, null);
                }
                current = true;
                if (!mounted) {
                    dispose = listen(button, 'click', ctx[15]);
                    mounted = true;
                }
            },
            p(ctx2, dirty) {
                if (arrow_left_slot) {
                    if (arrow_left_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            arrow_left_slot,
                            arrow_left_slot_template,
                            ctx2,
                            ctx2[11],
                            !current
                                ? get_all_dirty_from_scope(ctx2[11])
                                : get_slot_changes(
                                      arrow_left_slot_template,
                                      ctx2[11],
                                      dirty,
                                      get_arrow_left_slot_changes
                                  ),
                            get_arrow_left_slot_context
                        );
                    }
                }
            },
            i(local) {
                if (current) return;
                transition_in(arrow_left_slot_or_fallback, local);
                current = true;
            },
            o(local) {
                transition_out(arrow_left_slot_or_fallback, local);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(button);
                if (arrow_left_slot_or_fallback)
                    arrow_left_slot_or_fallback.d(detaching);
                mounted = false;
                dispose();
            },
        };
    }
    function fallback_block_6(ctx) {
        let t;
        return {
            c() {
                t = text('\u2190');
            },
            m(target, anchor) {
                insert(target, t, anchor);
            },
            d(detaching) {
                if (detaching) detach(t);
            },
        };
    }
    function create_if_block_9(ctx) {
        let button;
        let current;
        let mounted;
        let dispose;
        const arrow_right_slot_template = ctx[12]['arrow-right'];
        const arrow_right_slot = create_slot(
            arrow_right_slot_template,
            ctx,
            ctx[11],
            get_arrow_right_slot_context
        );
        const arrow_right_slot_or_fallback =
            arrow_right_slot || fallback_block_5(ctx);
        return {
            c() {
                button = element('button');
                if (arrow_right_slot_or_fallback)
                    arrow_right_slot_or_fallback.c();
                attr(button, 'class', 'arrow-right svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, button, anchor);
                if (arrow_right_slot_or_fallback) {
                    arrow_right_slot_or_fallback.m(button, null);
                }
                current = true;
                if (!mounted) {
                    dispose = listen(button, 'click', ctx[16]);
                    mounted = true;
                }
            },
            p(ctx2, dirty) {
                if (arrow_right_slot) {
                    if (arrow_right_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            arrow_right_slot,
                            arrow_right_slot_template,
                            ctx2,
                            ctx2[11],
                            !current
                                ? get_all_dirty_from_scope(ctx2[11])
                                : get_slot_changes(
                                      arrow_right_slot_template,
                                      ctx2[11],
                                      dirty,
                                      get_arrow_right_slot_changes
                                  ),
                            get_arrow_right_slot_context
                        );
                    }
                }
            },
            i(local) {
                if (current) return;
                transition_in(arrow_right_slot_or_fallback, local);
                current = true;
            },
            o(local) {
                transition_out(arrow_right_slot_or_fallback, local);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(button);
                if (arrow_right_slot_or_fallback)
                    arrow_right_slot_or_fallback.d(detaching);
                mounted = false;
                dispose();
            },
        };
    }
    function fallback_block_5(ctx) {
        let t;
        return {
            c() {
                t = text('\u2192');
            },
            m(target, anchor) {
                insert(target, t, anchor);
            },
            d(detaching) {
                if (detaching) detach(t);
            },
        };
    }
    function create_if_block(ctx) {
        let ul;
        let t0;
        let t1;
        let current;
        let if_block0 = ctx[5].dotsarrow && create_if_block_4(ctx);
        let each_value = { length: ctx[9].length };
        let each_blocks = [];
        for (let i = 0; i < each_value.length; i += 1) {
            each_blocks[i] = create_each_block(
                get_each_context(ctx, each_value, i)
            );
        }
        const out = (i) =>
            transition_out(each_blocks[i], 1, 1, () => {
                each_blocks[i] = null;
            });
        let if_block1 = ctx[5].dotsarrow && create_if_block_1(ctx);
        return {
            c() {
                ul = element('ul');
                if (if_block0) if_block0.c();
                t0 = space();
                for (let i = 0; i < each_blocks.length; i += 1) {
                    each_blocks[i].c();
                }
                t1 = space();
                if (if_block1) if_block1.c();
                attr(ul, 'class', 'slidy-dots svelte-1jcs13h');
                toggle_class(ul, 'pure', ctx[5].dotspure);
            },
            m(target, anchor) {
                insert(target, ul, anchor);
                if (if_block0) if_block0.m(ul, null);
                append(ul, t0);
                for (let i = 0; i < each_blocks.length; i += 1) {
                    each_blocks[i].m(ul, null);
                }
                append(ul, t1);
                if (if_block1) if_block1.m(ul, null);
                current = true;
            },
            p(ctx2, dirty) {
                if (ctx2[5].dotsarrow) {
                    if (if_block0) {
                        if_block0.p(ctx2, dirty);
                        if (dirty & 32) {
                            transition_in(if_block0, 1);
                        }
                    } else {
                        if_block0 = create_if_block_4(ctx2);
                        if_block0.c();
                        transition_in(if_block0, 1);
                        if_block0.m(ul, t0);
                    }
                } else if (if_block0) {
                    group_outros();
                    transition_out(if_block0, 1, 1, () => {
                        if_block0 = null;
                    });
                    check_outros();
                }
                if (dirty & 2849) {
                    each_value = { length: ctx2[9].length };
                    let i;
                    for (i = 0; i < each_value.length; i += 1) {
                        const child_ctx = get_each_context(ctx2, each_value, i);
                        if (each_blocks[i]) {
                            each_blocks[i].p(child_ctx, dirty);
                            transition_in(each_blocks[i], 1);
                        } else {
                            each_blocks[i] = create_each_block(child_ctx);
                            each_blocks[i].c();
                            transition_in(each_blocks[i], 1);
                            each_blocks[i].m(ul, t1);
                        }
                    }
                    group_outros();
                    for (
                        i = each_value.length;
                        i < each_blocks.length;
                        i += 1
                    ) {
                        out(i);
                    }
                    check_outros();
                }
                if (ctx2[5].dotsarrow) {
                    if (if_block1) {
                        if_block1.p(ctx2, dirty);
                        if (dirty & 32) {
                            transition_in(if_block1, 1);
                        }
                    } else {
                        if_block1 = create_if_block_1(ctx2);
                        if_block1.c();
                        transition_in(if_block1, 1);
                        if_block1.m(ul, null);
                    }
                } else if (if_block1) {
                    group_outros();
                    transition_out(if_block1, 1, 1, () => {
                        if_block1 = null;
                    });
                    check_outros();
                }
                if (dirty & 32) {
                    toggle_class(ul, 'pure', ctx2[5].dotspure);
                }
            },
            i(local) {
                if (current) return;
                transition_in(if_block0);
                for (let i = 0; i < each_value.length; i += 1) {
                    transition_in(each_blocks[i]);
                }
                transition_in(if_block1);
                current = true;
            },
            o(local) {
                transition_out(if_block0);
                each_blocks = each_blocks.filter(Boolean);
                for (let i = 0; i < each_blocks.length; i += 1) {
                    transition_out(each_blocks[i]);
                }
                transition_out(if_block1);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(ul);
                if (if_block0) if_block0.d();
                destroy_each(each_blocks, detaching);
                if (if_block1) if_block1.d();
            },
        };
    }
    function create_if_block_4(ctx) {
        let current_block_type_index;
        let if_block;
        let if_block_anchor;
        let current;
        const if_block_creators = [create_if_block_5, create_else_block_1];
        const if_blocks = [];
        function select_block_type_1(ctx2, dirty) {
            if (!ctx2[6].loop) return 0;
            return 1;
        }
        current_block_type_index = select_block_type_1(ctx, -1);
        if_block = if_blocks[current_block_type_index] =
            if_block_creators[current_block_type_index](ctx);
        return {
            c() {
                if_block.c();
                if_block_anchor = empty();
            },
            m(target, anchor) {
                if_blocks[current_block_type_index].m(target, anchor);
                insert(target, if_block_anchor, anchor);
                current = true;
            },
            p(ctx2, dirty) {
                let previous_block_index = current_block_type_index;
                current_block_type_index = select_block_type_1(ctx2, dirty);
                if (current_block_type_index === previous_block_index) {
                    if_blocks[current_block_type_index].p(ctx2, dirty);
                } else {
                    group_outros();
                    transition_out(
                        if_blocks[previous_block_index],
                        1,
                        1,
                        () => {
                            if_blocks[previous_block_index] = null;
                        }
                    );
                    check_outros();
                    if_block = if_blocks[current_block_type_index];
                    if (!if_block) {
                        if_block = if_blocks[current_block_type_index] =
                            if_block_creators[current_block_type_index](ctx2);
                        if_block.c();
                    } else {
                        if_block.p(ctx2, dirty);
                    }
                    transition_in(if_block, 1);
                    if_block.m(if_block_anchor.parentNode, if_block_anchor);
                }
            },
            i(local) {
                if (current) return;
                transition_in(if_block);
                current = true;
            },
            o(local) {
                transition_out(if_block);
                current = false;
            },
            d(detaching) {
                if_blocks[current_block_type_index].d(detaching);
                if (detaching) detach(if_block_anchor);
            },
        };
    }
    function create_else_block_1(ctx) {
        let li;
        let current;
        let mounted;
        let dispose;
        const dots_arrow_left_slot_template = ctx[12]['dots-arrow-left'];
        const dots_arrow_left_slot = create_slot(
            dots_arrow_left_slot_template,
            ctx,
            ctx[11],
            get_dots_arrow_left_slot_context_1
        );
        const dots_arrow_left_slot_or_fallback =
            dots_arrow_left_slot || fallback_block_4(ctx);
        return {
            c() {
                li = element('li');
                if (dots_arrow_left_slot_or_fallback)
                    dots_arrow_left_slot_or_fallback.c();
                attr(li, 'class', 'dots-arrow-left svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, li, anchor);
                if (dots_arrow_left_slot_or_fallback) {
                    dots_arrow_left_slot_or_fallback.m(li, null);
                }
                current = true;
                if (!mounted) {
                    dispose = listen(li, 'click', ctx[20]);
                    mounted = true;
                }
            },
            p(ctx2, dirty) {
                if (dots_arrow_left_slot) {
                    if (dots_arrow_left_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            dots_arrow_left_slot,
                            dots_arrow_left_slot_template,
                            ctx2,
                            ctx2[11],
                            !current
                                ? get_all_dirty_from_scope(ctx2[11])
                                : get_slot_changes(
                                      dots_arrow_left_slot_template,
                                      ctx2[11],
                                      dirty,
                                      get_dots_arrow_left_slot_changes_1
                                  ),
                            get_dots_arrow_left_slot_context_1
                        );
                    }
                }
            },
            i(local) {
                if (current) return;
                transition_in(dots_arrow_left_slot_or_fallback, local);
                current = true;
            },
            o(local) {
                transition_out(dots_arrow_left_slot_or_fallback, local);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(li);
                if (dots_arrow_left_slot_or_fallback)
                    dots_arrow_left_slot_or_fallback.d(detaching);
                mounted = false;
                dispose();
            },
        };
    }
    function create_if_block_5(ctx) {
        let if_block_anchor;
        let current;
        let if_block = ctx[0] > 0 && create_if_block_6(ctx);
        return {
            c() {
                if (if_block) if_block.c();
                if_block_anchor = empty();
            },
            m(target, anchor) {
                if (if_block) if_block.m(target, anchor);
                insert(target, if_block_anchor, anchor);
                current = true;
            },
            p(ctx2, dirty) {
                if (ctx2[0] > 0) {
                    if (if_block) {
                        if_block.p(ctx2, dirty);
                        if (dirty & 1) {
                            transition_in(if_block, 1);
                        }
                    } else {
                        if_block = create_if_block_6(ctx2);
                        if_block.c();
                        transition_in(if_block, 1);
                        if_block.m(if_block_anchor.parentNode, if_block_anchor);
                    }
                } else if (if_block) {
                    group_outros();
                    transition_out(if_block, 1, 1, () => {
                        if_block = null;
                    });
                    check_outros();
                }
            },
            i(local) {
                if (current) return;
                transition_in(if_block);
                current = true;
            },
            o(local) {
                transition_out(if_block);
                current = false;
            },
            d(detaching) {
                if (if_block) if_block.d(detaching);
                if (detaching) detach(if_block_anchor);
            },
        };
    }
    function fallback_block_4(ctx) {
        let button;
        return {
            c() {
                button = element('button');
                button.textContent = '\u2190';
                attr(button, 'class', 'svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, button, anchor);
            },
            d(detaching) {
                if (detaching) detach(button);
            },
        };
    }
    function create_if_block_6(ctx) {
        let li;
        let current;
        let mounted;
        let dispose;
        const dots_arrow_left_slot_template = ctx[12]['dots-arrow-left'];
        const dots_arrow_left_slot = create_slot(
            dots_arrow_left_slot_template,
            ctx,
            ctx[11],
            get_dots_arrow_left_slot_context
        );
        const dots_arrow_left_slot_or_fallback =
            dots_arrow_left_slot || fallback_block_3(ctx);
        return {
            c() {
                li = element('li');
                if (dots_arrow_left_slot_or_fallback)
                    dots_arrow_left_slot_or_fallback.c();
                attr(li, 'class', 'dots-arrow-left svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, li, anchor);
                if (dots_arrow_left_slot_or_fallback) {
                    dots_arrow_left_slot_or_fallback.m(li, null);
                }
                current = true;
                if (!mounted) {
                    dispose = listen(li, 'click', ctx[19]);
                    mounted = true;
                }
            },
            p(ctx2, dirty) {
                if (dots_arrow_left_slot) {
                    if (dots_arrow_left_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            dots_arrow_left_slot,
                            dots_arrow_left_slot_template,
                            ctx2,
                            ctx2[11],
                            !current
                                ? get_all_dirty_from_scope(ctx2[11])
                                : get_slot_changes(
                                      dots_arrow_left_slot_template,
                                      ctx2[11],
                                      dirty,
                                      get_dots_arrow_left_slot_changes
                                  ),
                            get_dots_arrow_left_slot_context
                        );
                    }
                }
            },
            i(local) {
                if (current) return;
                transition_in(dots_arrow_left_slot_or_fallback, local);
                current = true;
            },
            o(local) {
                transition_out(dots_arrow_left_slot_or_fallback, local);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(li);
                if (dots_arrow_left_slot_or_fallback)
                    dots_arrow_left_slot_or_fallback.d(detaching);
                mounted = false;
                dispose();
            },
        };
    }
    function fallback_block_3(ctx) {
        let button;
        return {
            c() {
                button = element('button');
                button.textContent = '\u2190';
                attr(button, 'class', 'svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, button, anchor);
            },
            d(detaching) {
                if (detaching) detach(button);
            },
        };
    }
    function fallback_block_2(ctx) {
        let button;
        let t_value = (ctx[5].dotsnum && !ctx[5].dotspure ? ctx[26] : '') + '';
        let t;
        return {
            c() {
                button = element('button');
                t = text(t_value);
                attr(button, 'class', 'svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, button, anchor);
                append(button, t);
            },
            p(ctx2, dirty) {
                if (
                    dirty & 32 &&
                    t_value !==
                        (t_value =
                            (ctx2[5].dotsnum && !ctx2[5].dotspure
                                ? ctx2[26]
                                : '') + '')
                )
                    set_data(t, t_value);
            },
            d(detaching) {
                if (detaching) detach(button);
            },
        };
    }
    function create_each_block(ctx) {
        let li;
        let current;
        let mounted;
        let dispose;
        const dot_slot_template = ctx[12].dot;
        const dot_slot = create_slot(
            dot_slot_template,
            ctx,
            ctx[11],
            get_dot_slot_context
        );
        const dot_slot_or_fallback = dot_slot || fallback_block_2(ctx);
        function click_handler_6() {
            return ctx[21](ctx[26]);
        }
        return {
            c() {
                li = element('li');
                if (dot_slot_or_fallback) dot_slot_or_fallback.c();
                attr(li, 'class', 'svelte-1jcs13h');
                toggle_class(li, 'active', ctx[26] === ctx[0]);
            },
            m(target, anchor) {
                insert(target, li, anchor);
                if (dot_slot_or_fallback) {
                    dot_slot_or_fallback.m(li, null);
                }
                current = true;
                if (!mounted) {
                    dispose = listen(
                        li,
                        'click',
                        stop_propagation(click_handler_6)
                    );
                    mounted = true;
                }
            },
            p(new_ctx, dirty) {
                ctx = new_ctx;
                if (dot_slot) {
                    if (dot_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            dot_slot,
                            dot_slot_template,
                            ctx,
                            ctx[11],
                            !current
                                ? get_all_dirty_from_scope(ctx[11])
                                : get_slot_changes(
                                      dot_slot_template,
                                      ctx[11],
                                      dirty,
                                      get_dot_slot_changes
                                  ),
                            get_dot_slot_context
                        );
                    }
                } else {
                    if (
                        dot_slot_or_fallback &&
                        dot_slot_or_fallback.p &&
                        (!current || dirty & 32)
                    ) {
                        dot_slot_or_fallback.p(ctx, !current ? -1 : dirty);
                    }
                }
                if (dirty & 1) {
                    toggle_class(li, 'active', ctx[26] === ctx[0]);
                }
            },
            i(local) {
                if (current) return;
                transition_in(dot_slot_or_fallback, local);
                current = true;
            },
            o(local) {
                transition_out(dot_slot_or_fallback, local);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(li);
                if (dot_slot_or_fallback) dot_slot_or_fallback.d(detaching);
                mounted = false;
                dispose();
            },
        };
    }
    function create_if_block_1(ctx) {
        let current_block_type_index;
        let if_block;
        let if_block_anchor;
        let current;
        const if_block_creators = [create_if_block_2, create_else_block];
        const if_blocks = [];
        function select_block_type_2(ctx2, dirty) {
            if (!ctx2[6].loop) return 0;
            return 1;
        }
        current_block_type_index = select_block_type_2(ctx, -1);
        if_block = if_blocks[current_block_type_index] =
            if_block_creators[current_block_type_index](ctx);
        return {
            c() {
                if_block.c();
                if_block_anchor = empty();
            },
            m(target, anchor) {
                if_blocks[current_block_type_index].m(target, anchor);
                insert(target, if_block_anchor, anchor);
                current = true;
            },
            p(ctx2, dirty) {
                let previous_block_index = current_block_type_index;
                current_block_type_index = select_block_type_2(ctx2, dirty);
                if (current_block_type_index === previous_block_index) {
                    if_blocks[current_block_type_index].p(ctx2, dirty);
                } else {
                    group_outros();
                    transition_out(
                        if_blocks[previous_block_index],
                        1,
                        1,
                        () => {
                            if_blocks[previous_block_index] = null;
                        }
                    );
                    check_outros();
                    if_block = if_blocks[current_block_type_index];
                    if (!if_block) {
                        if_block = if_blocks[current_block_type_index] =
                            if_block_creators[current_block_type_index](ctx2);
                        if_block.c();
                    } else {
                        if_block.p(ctx2, dirty);
                    }
                    transition_in(if_block, 1);
                    if_block.m(if_block_anchor.parentNode, if_block_anchor);
                }
            },
            i(local) {
                if (current) return;
                transition_in(if_block);
                current = true;
            },
            o(local) {
                transition_out(if_block);
                current = false;
            },
            d(detaching) {
                if_blocks[current_block_type_index].d(detaching);
                if (detaching) detach(if_block_anchor);
            },
        };
    }
    function create_else_block(ctx) {
        let li;
        let current;
        let mounted;
        let dispose;
        const dots_arrow_right_slot_template = ctx[12]['dots-arrow-right'];
        const dots_arrow_right_slot = create_slot(
            dots_arrow_right_slot_template,
            ctx,
            ctx[11],
            get_dots_arrow_right_slot_context_1
        );
        const dots_arrow_right_slot_or_fallback =
            dots_arrow_right_slot || fallback_block_1(ctx);
        return {
            c() {
                li = element('li');
                if (dots_arrow_right_slot_or_fallback)
                    dots_arrow_right_slot_or_fallback.c();
                attr(li, 'class', 'dots-arrow-right svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, li, anchor);
                if (dots_arrow_right_slot_or_fallback) {
                    dots_arrow_right_slot_or_fallback.m(li, null);
                }
                current = true;
                if (!mounted) {
                    dispose = listen(li, 'click', ctx[23]);
                    mounted = true;
                }
            },
            p(ctx2, dirty) {
                if (dots_arrow_right_slot) {
                    if (dots_arrow_right_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            dots_arrow_right_slot,
                            dots_arrow_right_slot_template,
                            ctx2,
                            ctx2[11],
                            !current
                                ? get_all_dirty_from_scope(ctx2[11])
                                : get_slot_changes(
                                      dots_arrow_right_slot_template,
                                      ctx2[11],
                                      dirty,
                                      get_dots_arrow_right_slot_changes_1
                                  ),
                            get_dots_arrow_right_slot_context_1
                        );
                    }
                }
            },
            i(local) {
                if (current) return;
                transition_in(dots_arrow_right_slot_or_fallback, local);
                current = true;
            },
            o(local) {
                transition_out(dots_arrow_right_slot_or_fallback, local);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(li);
                if (dots_arrow_right_slot_or_fallback)
                    dots_arrow_right_slot_or_fallback.d(detaching);
                mounted = false;
                dispose();
            },
        };
    }
    function create_if_block_2(ctx) {
        let if_block_anchor;
        let current;
        let if_block = ctx[0] < ctx[9].length - 1 && create_if_block_3(ctx);
        return {
            c() {
                if (if_block) if_block.c();
                if_block_anchor = empty();
            },
            m(target, anchor) {
                if (if_block) if_block.m(target, anchor);
                insert(target, if_block_anchor, anchor);
                current = true;
            },
            p(ctx2, dirty) {
                if (ctx2[0] < ctx2[9].length - 1) {
                    if (if_block) {
                        if_block.p(ctx2, dirty);
                        if (dirty & 769) {
                            transition_in(if_block, 1);
                        }
                    } else {
                        if_block = create_if_block_3(ctx2);
                        if_block.c();
                        transition_in(if_block, 1);
                        if_block.m(if_block_anchor.parentNode, if_block_anchor);
                    }
                } else if (if_block) {
                    group_outros();
                    transition_out(if_block, 1, 1, () => {
                        if_block = null;
                    });
                    check_outros();
                }
            },
            i(local) {
                if (current) return;
                transition_in(if_block);
                current = true;
            },
            o(local) {
                transition_out(if_block);
                current = false;
            },
            d(detaching) {
                if (if_block) if_block.d(detaching);
                if (detaching) detach(if_block_anchor);
            },
        };
    }
    function fallback_block_1(ctx) {
        let button;
        return {
            c() {
                button = element('button');
                button.textContent = '\u2192';
                attr(button, 'class', 'svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, button, anchor);
            },
            d(detaching) {
                if (detaching) detach(button);
            },
        };
    }
    function create_if_block_3(ctx) {
        let li;
        let current;
        let mounted;
        let dispose;
        const dots_arrow_right_slot_template = ctx[12]['dots-arrow-right'];
        const dots_arrow_right_slot = create_slot(
            dots_arrow_right_slot_template,
            ctx,
            ctx[11],
            get_dots_arrow_right_slot_context
        );
        const dots_arrow_right_slot_or_fallback =
            dots_arrow_right_slot || fallback_block(ctx);
        return {
            c() {
                li = element('li');
                if (dots_arrow_right_slot_or_fallback)
                    dots_arrow_right_slot_or_fallback.c();
                attr(li, 'class', 'dots-arrow-right svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, li, anchor);
                if (dots_arrow_right_slot_or_fallback) {
                    dots_arrow_right_slot_or_fallback.m(li, null);
                }
                current = true;
                if (!mounted) {
                    dispose = listen(li, 'click', ctx[22]);
                    mounted = true;
                }
            },
            p(ctx2, dirty) {
                if (dots_arrow_right_slot) {
                    if (dots_arrow_right_slot.p && (!current || dirty & 2816)) {
                        update_slot_base(
                            dots_arrow_right_slot,
                            dots_arrow_right_slot_template,
                            ctx2,
                            ctx2[11],
                            !current
                                ? get_all_dirty_from_scope(ctx2[11])
                                : get_slot_changes(
                                      dots_arrow_right_slot_template,
                                      ctx2[11],
                                      dirty,
                                      get_dots_arrow_right_slot_changes
                                  ),
                            get_dots_arrow_right_slot_context
                        );
                    }
                }
            },
            i(local) {
                if (current) return;
                transition_in(dots_arrow_right_slot_or_fallback, local);
                current = true;
            },
            o(local) {
                transition_out(dots_arrow_right_slot_or_fallback, local);
                current = false;
            },
            d(detaching) {
                if (detaching) detach(li);
                if (dots_arrow_right_slot_or_fallback)
                    dots_arrow_right_slot_or_fallback.d(detaching);
                mounted = false;
                dispose();
            },
        };
    }
    function fallback_block(ctx) {
        let button;
        return {
            c() {
                button = element('button');
                button.textContent = '\u2192';
                attr(button, 'class', 'svelte-1jcs13h');
            },
            m(target, anchor) {
                insert(target, button, anchor);
            },
            d(detaching) {
                if (detaching) detach(button);
            },
        };
    }
    function create_pending_block(ctx) {
        return {
            c: noop,
            m: noop,
            p: noop,
            i: noop,
            o: noop,
            d: noop,
        };
    }
    function create_fragment(ctx) {
        let section;
        let promise;
        let section_id_value;
        let current;
        let info = {
            ctx,
            current: null,
            token: null,
            hasCatch: false,
            pending: create_pending_block,
            then: create_then_block,
            catch: create_catch_block,
            value: 9,
            blocks: [, , ,],
        };
        handle_promise((promise = slidyInit(ctx[9], ctx[8])), info);
        return {
            c() {
                section = element('section');
                info.block.c();
                attr(section, 'tabindex', '0');
                attr(section, 'aria-label', 'Slidy');
                attr(section, 'id', (section_id_value = ctx[3].id));
                attr(section, 'class', 'slidy svelte-1jcs13h');
                set_style(section, '--wrapw', ctx[3].width);
                set_style(section, '--wraph', ctx[3].height);
                set_style(section, '--wrapp', ctx[3].padding);
                set_style(section, '--slidew', ctx[4].width);
                set_style(section, '--slideh', ctx[4].height);
                set_style(section, '--slidef', ctx[4].objectfit);
                set_style(section, '--slideo', ctx[4].overflow);
                set_style(
                    section,
                    '--slideg',
                    ctx[10] ? `${ctx[4].gap}px 0 0 0` : `0 0 0 ${ctx[4].gap}px`
                );
                set_style(section, '--dur', ctx[6].duration + 'ms');
                toggle_class(section, 'loaded', ctx[7]);
                toggle_class(section, 'axisy', ctx[10]);
                toggle_class(section, 'autowidth', ctx[4].width === 'auto');
                toggle_class(section, 'antiloop', ctx[6].loop === false);
                toggle_class(section, 'alignmiddle', ctx[3].align === 'middle');
                toggle_class(section, 'alignstart', ctx[3].align === 'start');
                toggle_class(section, 'alignend', ctx[3].align === 'end');
            },
            m(target, anchor) {
                insert(target, section, anchor);
                info.block.m(section, (info.anchor = null));
                info.mount = () => section;
                info.anchor = null;
                current = true;
            },
            p(new_ctx, [dirty]) {
                ctx = new_ctx;
                info.ctx = ctx;
                if (
                    dirty & 768 &&
                    promise !== (promise = slidyInit(ctx[9], ctx[8])) &&
                    handle_promise(promise, info)
                ) {
                } else {
                    update_await_block_branch(info, ctx, dirty);
                }
                if (
                    !current ||
                    (dirty & 8 &&
                        section_id_value !== (section_id_value = ctx[3].id))
                ) {
                    attr(section, 'id', section_id_value);
                }
                if (!current || dirty & 8) {
                    set_style(section, '--wrapw', ctx[3].width);
                }
                if (!current || dirty & 8) {
                    set_style(section, '--wraph', ctx[3].height);
                }
                if (!current || dirty & 8) {
                    set_style(section, '--wrapp', ctx[3].padding);
                }
                if (!current || dirty & 16) {
                    set_style(section, '--slidew', ctx[4].width);
                }
                if (!current || dirty & 16) {
                    set_style(section, '--slideh', ctx[4].height);
                }
                if (!current || dirty & 16) {
                    set_style(section, '--slidef', ctx[4].objectfit);
                }
                if (!current || dirty & 16) {
                    set_style(section, '--slideo', ctx[4].overflow);
                }
                if (!current || dirty & 1040) {
                    set_style(
                        section,
                        '--slideg',
                        ctx[10]
                            ? `${ctx[4].gap}px 0 0 0`
                            : `0 0 0 ${ctx[4].gap}px`
                    );
                }
                if (!current || dirty & 64) {
                    set_style(section, '--dur', ctx[6].duration + 'ms');
                }
                if (dirty & 128) {
                    toggle_class(section, 'loaded', ctx[7]);
                }
                if (dirty & 1024) {
                    toggle_class(section, 'axisy', ctx[10]);
                }
                if (dirty & 16) {
                    toggle_class(section, 'autowidth', ctx[4].width === 'auto');
                }
                if (dirty & 64) {
                    toggle_class(section, 'antiloop', ctx[6].loop === false);
                }
                if (dirty & 8) {
                    toggle_class(
                        section,
                        'alignmiddle',
                        ctx[3].align === 'middle'
                    );
                }
                if (dirty & 8) {
                    toggle_class(
                        section,
                        'alignstart',
                        ctx[3].align === 'start'
                    );
                }
                if (dirty & 8) {
                    toggle_class(section, 'alignend', ctx[3].align === 'end');
                }
            },
            i(local) {
                if (current) return;
                transition_in(info.block);
                current = true;
            },
            o(local) {
                for (let i = 0; i < 3; i += 1) {
                    const block = info.blocks[i];
                    transition_out(block);
                }
                current = false;
            },
            d(detaching) {
                if (detaching) detach(section);
                info.block.d();
                info.token = null;
                info = null;
            },
        };
    }
    async function slidyInit(slides, timeout = 0, init2 = false) {
        slides = slides.map((s, i) => ({ ix: i, ...s }));
        timeout > 0
            ? setTimeout(() => (init2 = true), timeout)
            : (init2 = init2);
        return slides;
    }
    function instance($$self, $$props, $$invalidate) {
        let axisy;
        let { $$slots: slots = {}, $$scope } = $$props;
        let {
            slides = [],
            key = (item) => item.id || item[slide.imgsrckey],
            wrap = {
                id: null,
                width: '100%',
                height: '50%',
                padding: '0',
                align: 'middle',
                alignmargin: 0,
            },
            slide = {
                gap: 0,
                class: '',
                width: '50%',
                height: '100%',
                backimg: false,
                imgsrckey: 'src',
                objectfit: 'cover',
                overflow: 'hidden',
            },
            controls = {
                dots: true,
                dotsnum: true,
                dotsarrow: true,
                dotspure: false,
                arrows: true,
                keys: true,
                drag: true,
                wheel: true,
            },
            options = {
                axis: 'x',
                loop: false,
                duration: 450,
                clamp: false,
                snap: true,
                gravity: 1.2,
            },
            index = 4,
            init: init2 = true,
            timeout = 0,
            position: position2 = 0,
        } = $$props;
        const slidy_function = (x) => $$invalidate(0, (index = x));
        const slidy_function_1 = (p) => $$invalidate(1, (position2 = p));
        const click_handler = () => $$invalidate(0, index--, index);
        const click_handler_1 = () => $$invalidate(0, index++, index);
        const click_handler_2 = () => $$invalidate(0, index--, index);
        const click_handler_3 = () => $$invalidate(0, index++, index);
        const click_handler_4 = () => $$invalidate(0, index--, index);
        const click_handler_5 = () => $$invalidate(0, index--, index);
        const click_handler_6 = (i) => $$invalidate(0, (index = i));
        const click_handler_7 = () => $$invalidate(0, index++, index);
        const click_handler_8 = () => $$invalidate(0, index++, index);
        $$self.$$set = ($$props2) => {
            if ('slides' in $$props2)
                $$invalidate(9, (slides = $$props2.slides));
            if ('key' in $$props2) $$invalidate(2, (key = $$props2.key));
            if ('wrap' in $$props2) $$invalidate(3, (wrap = $$props2.wrap));
            if ('slide' in $$props2) $$invalidate(4, (slide = $$props2.slide));
            if ('controls' in $$props2)
                $$invalidate(5, (controls = $$props2.controls));
            if ('options' in $$props2)
                $$invalidate(6, (options = $$props2.options));
            if ('index' in $$props2) $$invalidate(0, (index = $$props2.index));
            if ('init' in $$props2) $$invalidate(7, (init2 = $$props2.init));
            if ('timeout' in $$props2)
                $$invalidate(8, (timeout = $$props2.timeout));
            if ('position' in $$props2)
                $$invalidate(1, (position2 = $$props2.position));
            if ('$$scope' in $$props2)
                $$invalidate(11, ($$scope = $$props2.$$scope));
        };
        $$self.$$.update = () => {
            if ($$self.$$.dirty & 64) {
                $: $$invalidate(10, (axisy = options.axis === 'y'));
            }
        };
        return [
            index,
            position2,
            key,
            wrap,
            slide,
            controls,
            options,
            init2,
            timeout,
            slides,
            axisy,
            $$scope,
            slots,
            slidy_function,
            slidy_function_1,
            click_handler,
            click_handler_1,
            click_handler_2,
            click_handler_3,
            click_handler_4,
            click_handler_5,
            click_handler_6,
            click_handler_7,
            click_handler_8,
        ];
    }
    var Slidy = class extends SvelteComponent {
        constructor(options) {
            super();
            init(this, options, instance, create_fragment, not_equal, {
                slides: 9,
                key: 2,
                wrap: 3,
                slide: 4,
                controls: 5,
                options: 6,
                index: 0,
                init: 7,
                timeout: 8,
                position: 1,
            });
        }
    };
    var Slidy_default = Slidy;

    // dev/src/scripts/api.ts
    async function getPhotos(limit, page, width = 1280, height = 800) {
        const res = await fetch(
            `https://picsum.photos/v2/list?limit=${limit}&page=${page}`,
            {
                mode: 'cors',
                headers: {},
            }
        ).then((res2) => res2.json());
        return res.map((item) => {
            let aspect = aspectQ(item.width, item.height, width, height);
            let data = {
                ...item,
                src: `https://picsum.photos/id/${item.id}/${aspect.width}/${aspect.height}.jpg`,
                width: aspect.width,
                height: aspect.height,
            };
            return data;
        });
    }
    function aspectQ(srcWidth, srcHeight, maxWidth, maxHeight) {
        let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {
            width: Math.round(srcWidth * ratio),
            height: Math.round(srcHeight * ratio),
        };
    }
    var randomQ = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    // dev/src/App.svelte
    function get_each_context2(ctx, list, i) {
        const child_ctx = ctx.slice();
        child_ctx[39] = list[i];
        child_ctx[41] = i;
        return child_ctx;
    }
    function create_catch_block2(ctx) {
        return {
            c: noop,
            m: noop,
            p: noop,
            i: noop,
            o: noop,
            d: noop,
        };
    }
    function create_then_block2(ctx) {
        let slidy2;
        let updating_index;
        let updating_position;
        let current;
        function slidy_index_binding(value) {
            ctx[23](value);
        }
        function slidy_position_binding(value) {
            ctx[24](value);
        }
        let slidy_props = {
            slides: ctx[17],
            wrap: {
                id: null,
                width: '100%',
                height: '100%',
                padding: '0',
                align: ctx[6],
                alignmargin: 0,
            },
            slide: {
                gap: ctx[14],
                class: '',
                width: ctx[10],
                height: '100%',
                backimg: false,
                imgsrckey: 'src',
                objectfit: 'cover',
                overflow: 'hidden',
            },
            controls: {
                dots: true,
                dotsnum: true,
                dotsarrow: true,
                dotspure: true,
                arrows: true,
                keys: true,
                drag: true,
                wheel: true,
            },
            options: {
                axis: ctx[16],
                loop: ctx[13],
                duration: ctx[7],
                clamp: ctx[5],
                snap: ctx[11],
                gravity: ctx[9],
            },
            $$slots: {
                default: [
                    create_default_slot,
                    ({ item }) => ({ 42: item }),
                    ({ item }) => [0, item ? 2048 : 0],
                ],
            },
            $$scope: { ctx },
        };
        if (ctx[4] !== void 0) {
            slidy_props.index = ctx[4];
        }
        if (ctx[1] !== void 0) {
            slidy_props.position = ctx[1];
        }
        slidy2 = new Slidy_default({ props: slidy_props });
        binding_callbacks.push(() =>
            bind(slidy2, 'index', slidy_index_binding)
        );
        binding_callbacks.push(() =>
            bind(slidy2, 'position', slidy_position_binding)
        );
        return {
            c() {
                create_component(slidy2.$$.fragment);
            },
            m(target, anchor) {
                mount_component(slidy2, target, anchor);
                current = true;
            },
            p(ctx2, dirty) {
                const slidy_changes = {};
                if (dirty[0] & 12) slidy_changes.slides = ctx2[17];
                if (dirty[0] & 64)
                    slidy_changes.wrap = {
                        id: null,
                        width: '100%',
                        height: '100%',
                        padding: '0',
                        align: ctx2[6],
                        alignmargin: 0,
                    };
                if (dirty[0] & 17408)
                    slidy_changes.slide = {
                        gap: ctx2[14],
                        class: '',
                        width: ctx2[10],
                        height: '100%',
                        backimg: false,
                        imgsrckey: 'src',
                        objectfit: 'cover',
                        overflow: 'hidden',
                    };
                if (dirty[0] & 76448)
                    slidy_changes.options = {
                        axis: ctx2[16],
                        loop: ctx2[13],
                        duration: ctx2[7],
                        clamp: ctx2[5],
                        snap: ctx2[11],
                        gravity: ctx2[9],
                    };
                if ((dirty[0] & 4096) | (dirty[1] & 6144)) {
                    slidy_changes.$$scope = { dirty, ctx: ctx2 };
                }
                if (!updating_index && dirty[0] & 16) {
                    updating_index = true;
                    slidy_changes.index = ctx2[4];
                    add_flush_callback(() => (updating_index = false));
                }
                if (!updating_position && dirty[0] & 2) {
                    updating_position = true;
                    slidy_changes.position = ctx2[1];
                    add_flush_callback(() => (updating_position = false));
                }
                slidy2.$set(slidy_changes);
            },
            i(local) {
                if (current) return;
                transition_in(slidy2.$$.fragment, local);
                current = true;
            },
            o(local) {
                transition_out(slidy2.$$.fragment, local);
                current = false;
            },
            d(detaching) {
                destroy_component(slidy2, detaching);
            },
        };
    }
    function create_if_block2(ctx) {
        let img;
        let img_src_value;
        let img_alt_value;
        let img_width_value;
        let img_height_value;
        return {
            c() {
                img = element('img');
                if (!src_url_equal(img.src, (img_src_value = ctx[42].src)))
                    attr(img, 'src', img_src_value);
                attr(img, 'alt', (img_alt_value = ctx[42].ix));
                attr(img, 'width', (img_width_value = ctx[42].width));
                attr(img, 'height', (img_height_value = ctx[42].height));
            },
            m(target, anchor) {
                insert(target, img, anchor);
            },
            p(ctx2, dirty) {
                if (
                    dirty[1] & 2048 &&
                    !src_url_equal(img.src, (img_src_value = ctx2[42].src))
                ) {
                    attr(img, 'src', img_src_value);
                }
                if (
                    dirty[1] & 2048 &&
                    img_alt_value !== (img_alt_value = ctx2[42].ix)
                ) {
                    attr(img, 'alt', img_alt_value);
                }
                if (
                    dirty[1] & 2048 &&
                    img_width_value !== (img_width_value = ctx2[42].width)
                ) {
                    attr(img, 'width', img_width_value);
                }
                if (
                    dirty[1] & 2048 &&
                    img_height_value !== (img_height_value = ctx2[42].height)
                ) {
                    attr(img, 'height', img_height_value);
                }
            },
            d(detaching) {
                if (detaching) detach(img);
            },
        };
    }
    function create_default_slot(ctx) {
        let if_block_anchor;
        let if_block = ctx[12] && create_if_block2(ctx);
        return {
            c() {
                if (if_block) if_block.c();
                if_block_anchor = empty();
            },
            m(target, anchor) {
                if (if_block) if_block.m(target, anchor);
                insert(target, if_block_anchor, anchor);
            },
            p(ctx2, dirty) {
                if (ctx2[12]) {
                    if (if_block) {
                        if_block.p(ctx2, dirty);
                    } else {
                        if_block = create_if_block2(ctx2);
                        if_block.c();
                        if_block.m(if_block_anchor.parentNode, if_block_anchor);
                    }
                } else if (if_block) {
                    if_block.d(1);
                    if_block = null;
                }
            },
            d(detaching) {
                if (if_block) if_block.d(detaching);
                if (detaching) detach(if_block_anchor);
            },
        };
    }
    function create_pending_block2(ctx) {
        let t;
        return {
            c() {
                t = text('loading...');
            },
            m(target, anchor) {
                insert(target, t, anchor);
            },
            p: noop,
            i: noop,
            o: noop,
            d(detaching) {
                if (detaching) detach(t);
            },
        };
    }
    function create_each_block2(ctx) {
        let button;
        let t0;
        let t1;
        let mounted;
        let dispose;
        function click_handler_2() {
            return ctx[25](ctx[41]);
        }
        return {
            c() {
                button = element('button');
                t0 = text(ctx[41]);
                t1 = text('\xA0');
                toggle_class(button, 'active', ctx[41] === ctx[4]);
            },
            m(target, anchor) {
                insert(target, button, anchor);
                append(button, t0);
                insert(target, t1, anchor);
                if (!mounted) {
                    dispose = listen(button, 'click', click_handler_2);
                    mounted = true;
                }
            },
            p(new_ctx, dirty) {
                ctx = new_ctx;
                if (dirty[0] & 16) {
                    toggle_class(button, 'active', ctx[41] === ctx[4]);
                }
            },
            d(detaching) {
                if (detaching) detach(button);
                if (detaching) detach(t1);
                mounted = false;
                dispose();
            },
        };
    }
    function create_fragment2(ctx) {
        let fieldset0;
        let legend;
        let h1;
        let t0;
        let t1_value = version.replace(/\.[^.]*$/, '') + '';
        let t1;
        let sup;
        let t3;
        let button0;
        let t5;
        let button1;
        let t7;
        let button2;
        let t9;
        let p;
        let t10;
        let b0;
        let t11;
        let t12;
        let b1;
        let t13_value = Math.trunc(ctx[1]) + '';
        let t13;
        let t14;
        let t15;
        let main;
        let promise;
        let t16;
        let nav0;
        let t17;
        let nav1;
        let button3;
        let t18;
        let button3_disabled_value;
        let t19;
        let button4;
        let t20;
        let button4_disabled_value;
        let t21;
        let button5;
        let t22;
        let button6;
        let t24;
        let button7;
        let t26;
        let button8;
        let t28;
        let button9;
        let t30;
        let form;
        let fieldset1;
        let label0;
        let t31;
        let input0;
        let t32;
        let label1;
        let t33;
        let input1;
        let t34;
        let label2;
        let t35;
        let input2;
        let t36;
        let fieldset2;
        let label3;
        let t37;
        let input3;
        let t38;
        let label4;
        let t39;
        let input4;
        let t40;
        let label5;
        let t41;
        let select;
        let option0;
        let option1;
        let option2;
        let current;
        let mounted;
        let dispose;
        let info = {
            ctx,
            current: null,
            token: null,
            hasCatch: false,
            pending: create_pending_block2,
            then: create_then_block2,
            catch: create_catch_block2,
            value: 17,
            blocks: [, , ,],
        };
        handle_promise((promise = ctx[18](ctx[3], ctx[2])), info);
        let each_value = { length: ctx[17].length };
        let each_blocks = [];
        for (let i = 0; i < each_value.length; i += 1) {
            each_blocks[i] = create_each_block2(
                get_each_context2(ctx, each_value, i)
            );
        }
        return {
            c() {
                fieldset0 = element('fieldset');
                legend = element('legend');
                h1 = element('h1');
                t0 = text('Slidy ');
                t1 = text(t1_value);
                sup = element('sup');
                sup.textContent = 'svelteJS';
                t3 = space();
                button0 = element('button');
                button0.textContent = 'stend';
                t5 = space();
                button1 = element('button');
                button1.textContent = 'images';
                t7 = space();
                button2 = element('button');
                button2.textContent = 'dark';
                t9 = space();
                p = element('p');
                t10 = text('index: [');
                b0 = element('b');
                t11 = text(ctx[4]);
                t12 = text('], position: ');
                b1 = element('b');
                t13 = text(t13_value);
                t14 = text('px');
                t15 = space();
                main = element('main');
                info.block.c();
                t16 = space();
                nav0 = element('nav');
                for (let i = 0; i < each_blocks.length; i += 1) {
                    each_blocks[i].c();
                }
                t17 = space();
                nav1 = element('nav');
                button3 = element('button');
                t18 = text('\u2190');
                t19 = space();
                button4 = element('button');
                t20 = text('\u2192');
                t21 = space();
                button5 = element('button');
                button5.innerHTML = `<i class="icon icon-refresh svelte-12ijjr9"></i>`;
                t22 = space();
                button6 = element('button');
                button6.textContent = 'axisY';
                t24 = space();
                button7 = element('button');
                button7.textContent = 'clamp';
                t26 = space();
                button8 = element('button');
                button8.textContent = 'snap';
                t28 = space();
                button9 = element('button');
                button9.textContent = 'loop';
                t30 = space();
                form = element('form');
                fieldset1 = element('fieldset');
                label0 = element('label');
                t31 = text('width\n            ');
                input0 = element('input');
                t32 = space();
                label1 = element('label');
                t33 = text('limit\n            ');
                input1 = element('input');
                t34 = space();
                label2 = element('label');
                t35 = text('gap\n            ');
                input2 = element('input');
                t36 = space();
                fieldset2 = element('fieldset');
                label3 = element('label');
                t37 = text('duration\n            ');
                input3 = element('input');
                t38 = space();
                label4 = element('label');
                t39 = text('gravity\n            ');
                input4 = element('input');
                t40 = space();
                label5 = element('label');
                t41 = text('align\n            ');
                select = element('select');
                option0 = element('option');
                option0.textContent = '\u2190 start';
                option1 = element('option');
                option1.textContent = 'middle';
                option2 = element('option');
                option2.textContent = 'end \u2192';
                toggle_class(button0, 'active', ctx[8]);
                toggle_class(button1, 'active', ctx[12]);
                toggle_class(button2, 'active', ctx[15]);
                attr(nav0, 'id', 'dots');
                attr(nav0, 'class', 'svelte-12ijjr9');
                button3.disabled = button3_disabled_value = !ctx[13] && !ctx[4];
                button4.disabled = button4_disabled_value =
                    !ctx[13] && ctx[4] === ctx[17].length - 1;
                toggle_class(button6, 'active', ctx[0]);
                toggle_class(button7, 'active', ctx[5]);
                toggle_class(button8, 'active', ctx[11]);
                toggle_class(button9, 'active', ctx[13]);
                attr(nav1, 'class', 'svelte-12ijjr9');
                attr(input0, 'size', '5');
                attr(input0, 'width', 'auto');
                attr(label0, 'class', 'svelte-12ijjr9');
                attr(input1, 'type', 'number');
                attr(input1, 'size', '5');
                attr(input1, 'step', '1');
                attr(input1, 'min', '1');
                attr(input1, 'max', '100');
                attr(label1, 'class', 'svelte-12ijjr9');
                attr(input2, 'type', 'number');
                attr(input2, 'size', '5');
                attr(input2, 'step', '1');
                attr(input2, 'min', '0');
                attr(input2, 'max', '100');
                attr(label2, 'class', 'svelte-12ijjr9');
                attr(fieldset1, 'class', 'svelte-12ijjr9');
                attr(input3, 'type', 'number');
                attr(input3, 'size', '5');
                attr(input3, 'step', '1');
                attr(input3, 'min', '100');
                attr(input3, 'max', '1000');
                attr(label3, 'class', 'svelte-12ijjr9');
                attr(input4, 'type', 'number');
                attr(input4, 'size', '5');
                attr(input4, 'step', '0.1');
                attr(input4, 'min', '0.1');
                attr(input4, 'max', '2');
                attr(input4, 'width', 'auto');
                attr(label4, 'class', 'svelte-12ijjr9');
                option0.__value = 'start';
                option0.value = option0.__value;
                option1.__value = 'middle';
                option1.value = option1.__value;
                option2.__value = 'end';
                option2.value = option2.__value;
                attr(select, 'class', 'svelte-12ijjr9');
                if (ctx[6] === void 0)
                    add_render_callback(() => ctx[37].call(select));
                attr(label5, 'class', 'svelte-12ijjr9');
                attr(fieldset2, 'class', 'svelte-12ijjr9');
                attr(form, 'class', 'svelte-12ijjr9');
            },
            m(target, anchor) {
                insert(target, fieldset0, anchor);
                append(fieldset0, legend);
                append(legend, h1);
                append(h1, t0);
                append(h1, t1);
                append(h1, sup);
                append(legend, t3);
                append(legend, button0);
                append(legend, t5);
                append(legend, button1);
                append(legend, t7);
                append(legend, button2);
                append(legend, t9);
                append(legend, p);
                append(p, t10);
                append(p, b0);
                append(b0, t11);
                append(p, t12);
                append(p, b1);
                append(b1, t13);
                append(p, t14);
                insert(target, t15, anchor);
                insert(target, main, anchor);
                info.block.m(main, (info.anchor = null));
                info.mount = () => main;
                info.anchor = null;
                insert(target, t16, anchor);
                insert(target, nav0, anchor);
                for (let i = 0; i < each_blocks.length; i += 1) {
                    each_blocks[i].m(nav0, null);
                }
                insert(target, t17, anchor);
                insert(target, nav1, anchor);
                append(nav1, button3);
                append(button3, t18);
                append(nav1, t19);
                append(nav1, button4);
                append(button4, t20);
                append(nav1, t21);
                append(nav1, button5);
                append(nav1, t22);
                append(nav1, button6);
                append(nav1, t24);
                append(nav1, button7);
                append(nav1, t26);
                append(nav1, button8);
                append(nav1, t28);
                append(nav1, button9);
                insert(target, t30, anchor);
                insert(target, form, anchor);
                append(form, fieldset1);
                append(fieldset1, label0);
                append(label0, t31);
                append(label0, input0);
                set_input_value(input0, ctx[10]);
                append(fieldset1, t32);
                append(fieldset1, label1);
                append(label1, t33);
                append(label1, input1);
                set_input_value(input1, ctx[3]);
                append(fieldset1, t34);
                append(fieldset1, label2);
                append(label2, t35);
                append(label2, input2);
                set_input_value(input2, ctx[14]);
                append(form, t36);
                append(form, fieldset2);
                append(fieldset2, label3);
                append(label3, t37);
                append(label3, input3);
                set_input_value(input3, ctx[7]);
                append(fieldset2, t38);
                append(fieldset2, label4);
                append(label4, t39);
                append(label4, input4);
                set_input_value(input4, ctx[9]);
                append(fieldset2, t40);
                append(fieldset2, label5);
                append(label5, t41);
                append(label5, select);
                append(select, option0);
                append(select, option1);
                append(select, option2);
                select_option(select, ctx[6]);
                current = true;
                if (!mounted) {
                    dispose = [
                        listen(button0, 'click', ctx[21]),
                        listen(button1, 'click', ctx[22]),
                        listen(button2, 'click', ctx[19]),
                        listen(button3, 'click', ctx[26]),
                        listen(button4, 'click', ctx[27]),
                        listen(button5, 'click', ctx[20]),
                        listen(button6, 'click', ctx[28]),
                        listen(button7, 'click', ctx[29]),
                        listen(button8, 'click', ctx[30]),
                        listen(button9, 'click', ctx[31]),
                        listen(input0, 'input', ctx[32]),
                        listen(input1, 'input', ctx[33]),
                        listen(input2, 'input', ctx[34]),
                        listen(input3, 'input', ctx[35]),
                        listen(input4, 'input', ctx[36]),
                        listen(select, 'change', ctx[37]),
                    ];
                    mounted = true;
                }
            },
            p(new_ctx, dirty) {
                ctx = new_ctx;
                if (dirty[0] & 256) {
                    toggle_class(button0, 'active', ctx[8]);
                }
                if (dirty[0] & 4096) {
                    toggle_class(button1, 'active', ctx[12]);
                }
                if (dirty[0] & 32768) {
                    toggle_class(button2, 'active', ctx[15]);
                }
                if (!current || dirty[0] & 16) set_data(t11, ctx[4]);
                if (
                    (!current || dirty[0] & 2) &&
                    t13_value !== (t13_value = Math.trunc(ctx[1]) + '')
                )
                    set_data(t13, t13_value);
                info.ctx = ctx;
                if (
                    dirty[0] & 12 &&
                    promise !== (promise = ctx[18](ctx[3], ctx[2])) &&
                    handle_promise(promise, info)
                ) {
                } else {
                    update_await_block_branch(info, ctx, dirty);
                }
                if (dirty[0] & 131088) {
                    each_value = { length: ctx[17].length };
                    let i;
                    for (i = 0; i < each_value.length; i += 1) {
                        const child_ctx = get_each_context2(ctx, each_value, i);
                        if (each_blocks[i]) {
                            each_blocks[i].p(child_ctx, dirty);
                        } else {
                            each_blocks[i] = create_each_block2(child_ctx);
                            each_blocks[i].c();
                            each_blocks[i].m(nav0, null);
                        }
                    }
                    for (; i < each_blocks.length; i += 1) {
                        each_blocks[i].d(1);
                    }
                    each_blocks.length = each_value.length;
                }
                if (
                    !current ||
                    (dirty[0] & 8208 &&
                        button3_disabled_value !==
                            (button3_disabled_value = !ctx[13] && !ctx[4]))
                ) {
                    button3.disabled = button3_disabled_value;
                }
                if (
                    !current ||
                    (dirty[0] & 139280 &&
                        button4_disabled_value !==
                            (button4_disabled_value =
                                !ctx[13] && ctx[4] === ctx[17].length - 1))
                ) {
                    button4.disabled = button4_disabled_value;
                }
                if (dirty[0] & 1) {
                    toggle_class(button6, 'active', ctx[0]);
                }
                if (dirty[0] & 32) {
                    toggle_class(button7, 'active', ctx[5]);
                }
                if (dirty[0] & 2048) {
                    toggle_class(button8, 'active', ctx[11]);
                }
                if (dirty[0] & 8192) {
                    toggle_class(button9, 'active', ctx[13]);
                }
                if (dirty[0] & 1024 && input0.value !== ctx[10]) {
                    set_input_value(input0, ctx[10]);
                }
                if (dirty[0] & 8 && to_number(input1.value) !== ctx[3]) {
                    set_input_value(input1, ctx[3]);
                }
                if (dirty[0] & 16384 && to_number(input2.value) !== ctx[14]) {
                    set_input_value(input2, ctx[14]);
                }
                if (dirty[0] & 128 && to_number(input3.value) !== ctx[7]) {
                    set_input_value(input3, ctx[7]);
                }
                if (dirty[0] & 512 && to_number(input4.value) !== ctx[9]) {
                    set_input_value(input4, ctx[9]);
                }
                if (dirty[0] & 64) {
                    select_option(select, ctx[6]);
                }
            },
            i(local) {
                if (current) return;
                transition_in(info.block);
                current = true;
            },
            o(local) {
                for (let i = 0; i < 3; i += 1) {
                    const block = info.blocks[i];
                    transition_out(block);
                }
                current = false;
            },
            d(detaching) {
                if (detaching) detach(fieldset0);
                if (detaching) detach(t15);
                if (detaching) detach(main);
                info.block.d();
                info.token = null;
                info = null;
                if (detaching) detach(t16);
                if (detaching) detach(nav0);
                destroy_each(each_blocks, detaching);
                if (detaching) detach(t17);
                if (detaching) detach(nav1);
                if (detaching) detach(t30);
                if (detaching) detach(form);
                mounted = false;
                run_all(dispose);
            },
        };
    }
    function instance2($$self, $$props, $$invalidate) {
        let dark;
        let axis;
        ('use strict');
        let items = [],
            position2 = 0,
            page = randomQ(0, 90),
            limit = 3,
            index = 0,
            axisY = false,
            clamp = true,
            align = 'middle',
            duration = 375,
            stend = false,
            gravity = 1.2,
            width = 'auto',
            snap = true,
            images = true,
            loop = false,
            gap = 16;
        async function loadPhotos(limit2, page2) {
            $$invalidate(17, (items = await getPhotos(limit2, page2)));
            return items;
        }
        function changeScheme(scheme) {
            const html = document.documentElement;
            html.setAttribute('scheme', !dark ? 'dark' : 'light');
            $$invalidate(15, (dark = !dark));
        }
        const shuffle = () => $$invalidate(2, (page = randomQ(0, 90)));
        const mqList = window.matchMedia('(prefers-color-scheme: dark)');
        const click_handler = () => $$invalidate(8, (stend = !stend));
        const click_handler_1 = () => $$invalidate(12, (images = !images));
        function slidy_index_binding(value) {
            index = value;
            $$invalidate(4, index);
        }
        function slidy_position_binding(value) {
            position2 = value;
            $$invalidate(1, position2);
        }
        const click_handler_2 = (i) => $$invalidate(4, (index = i));
        const click_handler_3 = () => $$invalidate(4, index--, index);
        const click_handler_4 = () => $$invalidate(4, index++, index);
        const click_handler_5 = () => $$invalidate(0, (axisY = !axisY));
        const click_handler_6 = () => $$invalidate(5, (clamp = !clamp));
        const click_handler_7 = () => $$invalidate(11, (snap = !snap));
        const click_handler_8 = () => $$invalidate(13, (loop = !loop));
        function input0_input_handler() {
            width = this.value;
            $$invalidate(10, width);
        }
        function input1_input_handler() {
            limit = to_number(this.value);
            $$invalidate(3, limit);
        }
        function input2_input_handler() {
            gap = to_number(this.value);
            $$invalidate(14, gap);
        }
        function input3_input_handler() {
            duration = to_number(this.value);
            $$invalidate(7, duration);
        }
        function input4_input_handler() {
            gravity = to_number(this.value);
            $$invalidate(9, gravity);
        }
        function select_change_handler() {
            align = select_value(this);
            $$invalidate(6, align);
        }
        $$self.$$.update = () => {
            if ($$self.$$.dirty[0] & 1) {
                $: $$invalidate(16, (axis = axisY ? 'y' : 'x'));
            }
        };
        $: $$invalidate(
            15,
            (dark = window.matchMedia('(prefers-color-scheme: dark)').matches)
        );
        return [
            axisY,
            position2,
            page,
            limit,
            index,
            clamp,
            align,
            duration,
            stend,
            gravity,
            width,
            snap,
            images,
            loop,
            gap,
            dark,
            axis,
            items,
            loadPhotos,
            changeScheme,
            shuffle,
            click_handler,
            click_handler_1,
            slidy_index_binding,
            slidy_position_binding,
            click_handler_2,
            click_handler_3,
            click_handler_4,
            click_handler_5,
            click_handler_6,
            click_handler_7,
            click_handler_8,
            input0_input_handler,
            input1_input_handler,
            input2_input_handler,
            input3_input_handler,
            input4_input_handler,
            select_change_handler,
        ];
    }
    var App = class extends SvelteComponent {
        constructor(options) {
            super();
            init(
                this,
                options,
                instance2,
                create_fragment2,
                not_equal,
                {},
                null,
                [-1, -1]
            );
        }
    };
    var App_default = App;

    // dev/src/main.ts
    var app = new App_default({
        target: document.body,
    });
    var main_default = app;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3N2ZWx0ZUAzLjQ2LjMvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9pbnRlcm5hbC9pbmRleC5tanMiLCAiLi4vLi4vLi4vLi4vY29yZS9kaXN0L3NsaWR5Lm1qcyIsICIuLi8uLi8uLi9zcmMvU2xpZHkuc3ZlbHRlIiwgIi4uLy4uL3NyYy9zY3JpcHRzL2FwaS50cyIsICIuLi8uLi9zcmMvQXBwLnN2ZWx0ZSIsICIuLi8uLi9zcmMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZnVuY3Rpb24gbm9vcCgpIHsgfVxuY29uc3QgaWRlbnRpdHkgPSB4ID0+IHg7XG5mdW5jdGlvbiBhc3NpZ24odGFyLCBzcmMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZm9yIChjb25zdCBrIGluIHNyYylcbiAgICAgICAgdGFyW2tdID0gc3JjW2tdO1xuICAgIHJldHVybiB0YXI7XG59XG5mdW5jdGlvbiBpc19wcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhZGRfbG9jYXRpb24oZWxlbWVudCwgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyKSB7XG4gICAgZWxlbWVudC5fX3N2ZWx0ZV9tZXRhID0ge1xuICAgICAgICBsb2M6IHsgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gcnVuKGZuKSB7XG4gICAgcmV0dXJuIGZuKCk7XG59XG5mdW5jdGlvbiBibGFua19vYmplY3QoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5mdW5jdGlvbiBydW5fYWxsKGZucykge1xuICAgIGZucy5mb3JFYWNoKHJ1bik7XG59XG5mdW5jdGlvbiBpc19mdW5jdGlvbih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBzYWZlX25vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGIgfHwgKChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicpO1xufVxubGV0IHNyY191cmxfZXF1YWxfYW5jaG9yO1xuZnVuY3Rpb24gc3JjX3VybF9lcXVhbChlbGVtZW50X3NyYywgdXJsKSB7XG4gICAgaWYgKCFzcmNfdXJsX2VxdWFsX2FuY2hvcikge1xuICAgICAgICBzcmNfdXJsX2VxdWFsX2FuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB9XG4gICAgc3JjX3VybF9lcXVhbF9hbmNob3IuaHJlZiA9IHVybDtcbiAgICByZXR1cm4gZWxlbWVudF9zcmMgPT09IHNyY191cmxfZXF1YWxfYW5jaG9yLmhyZWY7XG59XG5mdW5jdGlvbiBub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiO1xufVxuZnVuY3Rpb24gaXNfZW1wdHkob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfc3RvcmUoc3RvcmUsIG5hbWUpIHtcbiAgICBpZiAoc3RvcmUgIT0gbnVsbCAmJiB0eXBlb2Ygc3RvcmUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7bmFtZX0nIGlzIG5vdCBhIHN0b3JlIHdpdGggYSAnc3Vic2NyaWJlJyBtZXRob2RgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJzY3JpYmUoc3RvcmUsIC4uLmNhbGxiYWNrcykge1xuICAgIGlmIChzdG9yZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBub29wO1xuICAgIH1cbiAgICBjb25zdCB1bnN1YiA9IHN0b3JlLnN1YnNjcmliZSguLi5jYWxsYmFja3MpO1xuICAgIHJldHVybiB1bnN1Yi51bnN1YnNjcmliZSA/ICgpID0+IHVuc3ViLnVuc3Vic2NyaWJlKCkgOiB1bnN1Yjtcbn1cbmZ1bmN0aW9uIGdldF9zdG9yZV92YWx1ZShzdG9yZSkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBzdWJzY3JpYmUoc3RvcmUsIF8gPT4gdmFsdWUgPSBfKSgpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNvbXBvbmVudF9zdWJzY3JpYmUoY29tcG9uZW50LCBzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zbG90KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICBjb25zdCBzbG90X2N0eCA9IGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbik7XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uWzBdKHNsb3RfY3R4KTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXSAmJiBmblxuICAgICAgICA/IGFzc2lnbigkJHNjb3BlLmN0eC5zbGljZSgpLCBkZWZpbml0aW9uWzFdKGZuKGN0eCkpKVxuICAgICAgICA6ICQkc2NvcGUuY3R4O1xufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY2hhbmdlcyhkZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvblsyXSAmJiBmbikge1xuICAgICAgICBjb25zdCBsZXRzID0gZGVmaW5pdGlvblsyXShmbihkaXJ0eSkpO1xuICAgICAgICBpZiAoJCRzY29wZS5kaXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbGV0cztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxldHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWF4KCQkc2NvcGUuZGlydHkubGVuZ3RoLCBsZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkW2ldID0gJCRzY29wZS5kaXJ0eVtpXSB8IGxldHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkJHNjb3BlLmRpcnR5IHwgbGV0cztcbiAgICB9XG4gICAgcmV0dXJuICQkc2NvcGUuZGlydHk7XG59XG5mdW5jdGlvbiB1cGRhdGVfc2xvdF9iYXNlKHNsb3QsIHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBzbG90X2NoYW5nZXMsIGdldF9zbG90X2NvbnRleHRfZm4pIHtcbiAgICBpZiAoc2xvdF9jaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY29udGV4dCA9IGdldF9zbG90X2NvbnRleHQoc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGdldF9zbG90X2NvbnRleHRfZm4pO1xuICAgICAgICBzbG90LnAoc2xvdF9jb250ZXh0LCBzbG90X2NoYW5nZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZV9zbG90KHNsb3QsIHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbiwgZ2V0X3Nsb3RfY29udGV4dF9mbikge1xuICAgIGNvbnN0IHNsb3RfY2hhbmdlcyA9IGdldF9zbG90X2NoYW5nZXMoc2xvdF9kZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbik7XG4gICAgdXBkYXRlX3Nsb3RfYmFzZShzbG90LCBzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgc2xvdF9jaGFuZ2VzLCBnZXRfc2xvdF9jb250ZXh0X2ZuKTtcbn1cbmZ1bmN0aW9uIGdldF9hbGxfZGlydHlfZnJvbV9zY29wZSgkJHNjb3BlKSB7XG4gICAgaWYgKCQkc2NvcGUuY3R4Lmxlbmd0aCA+IDMyKSB7XG4gICAgICAgIGNvbnN0IGRpcnR5ID0gW107XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9ICQkc2NvcGUuY3R4Lmxlbmd0aCAvIDMyO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkaXJ0eVtpXSA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZnVuY3Rpb24gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyhwcm9wcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3VsdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjb21wdXRlX3Jlc3RfcHJvcHMocHJvcHMsIGtleXMpIHtcbiAgICBjb25zdCByZXN0ID0ge307XG4gICAga2V5cyA9IG5ldyBTZXQoa2V5cyk7XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoIWtleXMuaGFzKGspICYmIGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3Rba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVfc2xvdHMoc2xvdHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzbG90cykge1xuICAgICAgICByZXN1bHRba2V5XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgbGV0IHJhbiA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBpZiAocmFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByYW4gPSB0cnVlO1xuICAgICAgICBmbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH07XG59XG5mdW5jdGlvbiBudWxsX3RvX2VtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X3N0b3JlX3ZhbHVlKHN0b3JlLCByZXQsIHZhbHVlKSB7XG4gICAgc3RvcmUuc2V0KHZhbHVlKTtcbiAgICByZXR1cm4gcmV0O1xufVxuY29uc3QgaGFzX3Byb3AgPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbmZ1bmN0aW9uIGFjdGlvbl9kZXN0cm95ZXIoYWN0aW9uX3Jlc3VsdCkge1xuICAgIHJldHVybiBhY3Rpb25fcmVzdWx0ICYmIGlzX2Z1bmN0aW9uKGFjdGlvbl9yZXN1bHQuZGVzdHJveSkgPyBhY3Rpb25fcmVzdWx0LmRlc3Ryb3kgOiBub29wO1xufVxuXG5jb25zdCBpc19jbGllbnQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmxldCBub3cgPSBpc19jbGllbnRcbiAgICA/ICgpID0+IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcbmxldCByYWYgPSBpc19jbGllbnQgPyBjYiA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpIDogbm9vcDtcbi8vIHVzZWQgaW50ZXJuYWxseSBmb3IgdGVzdGluZ1xuZnVuY3Rpb24gc2V0X25vdyhmbikge1xuICAgIG5vdyA9IGZuO1xufVxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xuICAgIHJhZiA9IGZuO1xufVxuXG5jb25zdCB0YXNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIHJ1bl90YXNrcyhub3cpIHtcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBpZiAoIXRhc2suYyhub3cpKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgICAgICB0YXNrLmYoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0YXNrcy5zaXplICE9PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbn1cbi8qKlxuICogRm9yIHRlc3RpbmcgcHVycG9zZXMgb25seSFcbiAqL1xuZnVuY3Rpb24gY2xlYXJfbG9vcHMoKSB7XG4gICAgdGFza3MuY2xlYXIoKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB0YXNrIHRoYXQgcnVucyBvbiBlYWNoIHJhZiBmcmFtZVxuICogdW50aWwgaXQgcmV0dXJucyBhIGZhbHN5IHZhbHVlIG9yIGlzIGFib3J0ZWRcbiAqL1xuZnVuY3Rpb24gbG9vcChjYWxsYmFjaykge1xuICAgIGxldCB0YXNrO1xuICAgIGlmICh0YXNrcy5zaXplID09PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWxsID0+IHtcbiAgICAgICAgICAgIHRhc2tzLmFkZCh0YXNrID0geyBjOiBjYWxsYmFjaywgZjogZnVsZmlsbCB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIGFib3J0KCkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gVHJhY2sgd2hpY2ggbm9kZXMgYXJlIGNsYWltZWQgZHVyaW5nIGh5ZHJhdGlvbi4gVW5jbGFpbWVkIG5vZGVzIGNhbiB0aGVuIGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NXG4vLyBhdCB0aGUgZW5kIG9mIGh5ZHJhdGlvbiB3aXRob3V0IHRvdWNoaW5nIHRoZSByZW1haW5pbmcgbm9kZXMuXG5sZXQgaXNfaHlkcmF0aW5nID0gZmFsc2U7XG5mdW5jdGlvbiBzdGFydF9oeWRyYXRpbmcoKSB7XG4gICAgaXNfaHlkcmF0aW5nID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGVuZF9oeWRyYXRpbmcoKSB7XG4gICAgaXNfaHlkcmF0aW5nID0gZmFsc2U7XG59XG5mdW5jdGlvbiB1cHBlcl9ib3VuZChsb3csIGhpZ2gsIGtleSwgdmFsdWUpIHtcbiAgICAvLyBSZXR1cm4gZmlyc3QgaW5kZXggb2YgdmFsdWUgbGFyZ2VyIHRoYW4gaW5wdXQgdmFsdWUgaW4gdGhlIHJhbmdlIFtsb3csIGhpZ2gpXG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgICAgY29uc3QgbWlkID0gbG93ICsgKChoaWdoIC0gbG93KSA+PiAxKTtcbiAgICAgICAgaWYgKGtleShtaWQpIDw9IHZhbHVlKSB7XG4gICAgICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbG93O1xufVxuZnVuY3Rpb24gaW5pdF9oeWRyYXRlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuaHlkcmF0ZV9pbml0KVxuICAgICAgICByZXR1cm47XG4gICAgdGFyZ2V0Lmh5ZHJhdGVfaW5pdCA9IHRydWU7XG4gICAgLy8gV2Uga25vdyB0aGF0IGFsbCBjaGlsZHJlbiBoYXZlIGNsYWltX29yZGVyIHZhbHVlcyBzaW5jZSB0aGUgdW5jbGFpbWVkIGhhdmUgYmVlbiBkZXRhY2hlZCBpZiB0YXJnZXQgaXMgbm90IDxoZWFkPlxuICAgIGxldCBjaGlsZHJlbiA9IHRhcmdldC5jaGlsZE5vZGVzO1xuICAgIC8vIElmIHRhcmdldCBpcyA8aGVhZD4sIHRoZXJlIG1heSBiZSBjaGlsZHJlbiB3aXRob3V0IGNsYWltX29yZGVyXG4gICAgaWYgKHRhcmdldC5ub2RlTmFtZSA9PT0gJ0hFQUQnKSB7XG4gICAgICAgIGNvbnN0IG15Q2hpbGRyZW4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhaW1fb3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG15Q2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbiA9IG15Q2hpbGRyZW47XG4gICAgfVxuICAgIC8qXG4gICAgKiBSZW9yZGVyIGNsYWltZWQgY2hpbGRyZW4gb3B0aW1hbGx5LlxuICAgICogV2UgY2FuIHJlb3JkZXIgY2xhaW1lZCBjaGlsZHJlbiBvcHRpbWFsbHkgYnkgZmluZGluZyB0aGUgbG9uZ2VzdCBzdWJzZXF1ZW5jZSBvZlxuICAgICogbm9kZXMgdGhhdCBhcmUgYWxyZWFkeSBjbGFpbWVkIGluIG9yZGVyIGFuZCBvbmx5IG1vdmluZyB0aGUgcmVzdC4gVGhlIGxvbmdlc3RcbiAgICAqIHN1YnNlcXVlbmNlIHN1YnNlcXVlbmNlIG9mIG5vZGVzIHRoYXQgYXJlIGNsYWltZWQgaW4gb3JkZXIgY2FuIGJlIGZvdW5kIGJ5XG4gICAgKiBjb21wdXRpbmcgdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiAuY2xhaW1fb3JkZXIgdmFsdWVzLlxuICAgICpcbiAgICAqIFRoaXMgYWxnb3JpdGhtIGlzIG9wdGltYWwgaW4gZ2VuZXJhdGluZyB0aGUgbGVhc3QgYW1vdW50IG9mIHJlb3JkZXIgb3BlcmF0aW9uc1xuICAgICogcG9zc2libGUuXG4gICAgKlxuICAgICogUHJvb2Y6XG4gICAgKiBXZSBrbm93IHRoYXQsIGdpdmVuIGEgc2V0IG9mIHJlb3JkZXJpbmcgb3BlcmF0aW9ucywgdGhlIG5vZGVzIHRoYXQgZG8gbm90IG1vdmVcbiAgICAqIGFsd2F5cyBmb3JtIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2UsIHNpbmNlIHRoZXkgZG8gbm90IG1vdmUgYW1vbmcgZWFjaCBvdGhlclxuICAgICogbWVhbmluZyB0aGF0IHRoZXkgbXVzdCBiZSBhbHJlYWR5IG9yZGVyZWQgYW1vbmcgZWFjaCBvdGhlci4gVGh1cywgdGhlIG1heGltYWxcbiAgICAqIHNldCBvZiBub2RlcyB0aGF0IGRvIG5vdCBtb3ZlIGZvcm0gYSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UuXG4gICAgKi9cbiAgICAvLyBDb21wdXRlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZVxuICAgIC8vIG06IHN1YnNlcXVlbmNlIGxlbmd0aCBqID0+IGluZGV4IGsgb2Ygc21hbGxlc3QgdmFsdWUgdGhhdCBlbmRzIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2YgbGVuZ3RoIGpcbiAgICBjb25zdCBtID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoICsgMSk7XG4gICAgLy8gUHJlZGVjZXNzb3IgaW5kaWNlcyArIDFcbiAgICBjb25zdCBwID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICBtWzBdID0gLTE7XG4gICAgbGV0IGxvbmdlc3QgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IGNoaWxkcmVuW2ldLmNsYWltX29yZGVyO1xuICAgICAgICAvLyBGaW5kIHRoZSBsYXJnZXN0IHN1YnNlcXVlbmNlIGxlbmd0aCBzdWNoIHRoYXQgaXQgZW5kcyBpbiBhIHZhbHVlIGxlc3MgdGhhbiBvdXIgY3VycmVudCB2YWx1ZVxuICAgICAgICAvLyB1cHBlcl9ib3VuZCByZXR1cm5zIGZpcnN0IGdyZWF0ZXIgdmFsdWUsIHNvIHdlIHN1YnRyYWN0IG9uZVxuICAgICAgICAvLyB3aXRoIGZhc3QgcGF0aCBmb3Igd2hlbiB3ZSBhcmUgb24gdGhlIGN1cnJlbnQgbG9uZ2VzdCBzdWJzZXF1ZW5jZVxuICAgICAgICBjb25zdCBzZXFMZW4gPSAoKGxvbmdlc3QgPiAwICYmIGNoaWxkcmVuW21bbG9uZ2VzdF1dLmNsYWltX29yZGVyIDw9IGN1cnJlbnQpID8gbG9uZ2VzdCArIDEgOiB1cHBlcl9ib3VuZCgxLCBsb25nZXN0LCBpZHggPT4gY2hpbGRyZW5bbVtpZHhdXS5jbGFpbV9vcmRlciwgY3VycmVudCkpIC0gMTtcbiAgICAgICAgcFtpXSA9IG1bc2VxTGVuXSArIDE7XG4gICAgICAgIGNvbnN0IG5ld0xlbiA9IHNlcUxlbiArIDE7XG4gICAgICAgIC8vIFdlIGNhbiBndWFyYW50ZWUgdGhhdCBjdXJyZW50IGlzIHRoZSBzbWFsbGVzdCB2YWx1ZS4gT3RoZXJ3aXNlLCB3ZSB3b3VsZCBoYXZlIGdlbmVyYXRlZCBhIGxvbmdlciBzZXF1ZW5jZS5cbiAgICAgICAgbVtuZXdMZW5dID0gaTtcbiAgICAgICAgbG9uZ2VzdCA9IE1hdGgubWF4KG5ld0xlbiwgbG9uZ2VzdCk7XG4gICAgfVxuICAgIC8vIFRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2Ygbm9kZXMgKGluaXRpYWxseSByZXZlcnNlZClcbiAgICBjb25zdCBsaXMgPSBbXTtcbiAgICAvLyBUaGUgcmVzdCBvZiB0aGUgbm9kZXMsIG5vZGVzIHRoYXQgd2lsbCBiZSBtb3ZlZFxuICAgIGNvbnN0IHRvTW92ZSA9IFtdO1xuICAgIGxldCBsYXN0ID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBjdXIgPSBtW2xvbmdlc3RdICsgMTsgY3VyICE9IDA7IGN1ciA9IHBbY3VyIC0gMV0pIHtcbiAgICAgICAgbGlzLnB1c2goY2hpbGRyZW5bY3VyIC0gMV0pO1xuICAgICAgICBmb3IgKDsgbGFzdCA+PSBjdXI7IGxhc3QtLSkge1xuICAgICAgICAgICAgdG9Nb3ZlLnB1c2goY2hpbGRyZW5bbGFzdF0pO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QtLTtcbiAgICB9XG4gICAgZm9yICg7IGxhc3QgPj0gMDsgbGFzdC0tKSB7XG4gICAgICAgIHRvTW92ZS5wdXNoKGNoaWxkcmVuW2xhc3RdKTtcbiAgICB9XG4gICAgbGlzLnJldmVyc2UoKTtcbiAgICAvLyBXZSBzb3J0IHRoZSBub2RlcyBiZWluZyBtb3ZlZCB0byBndWFyYW50ZWUgdGhhdCB0aGVpciBpbnNlcnRpb24gb3JkZXIgbWF0Y2hlcyB0aGUgY2xhaW0gb3JkZXJcbiAgICB0b01vdmUuc29ydCgoYSwgYikgPT4gYS5jbGFpbV9vcmRlciAtIGIuY2xhaW1fb3JkZXIpO1xuICAgIC8vIEZpbmFsbHksIHdlIG1vdmUgdGhlIG5vZGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgdG9Nb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdoaWxlIChqIDwgbGlzLmxlbmd0aCAmJiB0b01vdmVbaV0uY2xhaW1fb3JkZXIgPj0gbGlzW2pdLmNsYWltX29yZGVyKSB7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYW5jaG9yID0gaiA8IGxpcy5sZW5ndGggPyBsaXNbal0gOiBudWxsO1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKHRvTW92ZVtpXSwgYW5jaG9yKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhcHBlbmQodGFyZ2V0LCBub2RlKSB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gYXBwZW5kX3N0eWxlcyh0YXJnZXQsIHN0eWxlX3NoZWV0X2lkLCBzdHlsZXMpIHtcbiAgICBjb25zdCBhcHBlbmRfc3R5bGVzX3RvID0gZ2V0X3Jvb3RfZm9yX3N0eWxlKHRhcmdldCk7XG4gICAgaWYgKCFhcHBlbmRfc3R5bGVzX3RvLmdldEVsZW1lbnRCeUlkKHN0eWxlX3NoZWV0X2lkKSkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHN0eWxlLmlkID0gc3R5bGVfc2hlZXRfaWQ7XG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gc3R5bGVzO1xuICAgICAgICBhcHBlbmRfc3R5bGVzaGVldChhcHBlbmRfc3R5bGVzX3RvLCBzdHlsZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUpXG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICBjb25zdCByb290ID0gbm9kZS5nZXRSb290Tm9kZSA/IG5vZGUuZ2V0Um9vdE5vZGUoKSA6IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICBpZiAocm9vdCAmJiByb290Lmhvc3QpIHtcbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICAgIHJldHVybiBub2RlLm93bmVyRG9jdW1lbnQ7XG59XG5mdW5jdGlvbiBhcHBlbmRfZW1wdHlfc3R5bGVzaGVldChub2RlKSB7XG4gICAgY29uc3Qgc3R5bGVfZWxlbWVudCA9IGVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgYXBwZW5kX3N0eWxlc2hlZXQoZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpLCBzdHlsZV9lbGVtZW50KTtcbiAgICByZXR1cm4gc3R5bGVfZWxlbWVudC5zaGVldDtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9zdHlsZXNoZWV0KG5vZGUsIHN0eWxlKSB7XG4gICAgYXBwZW5kKG5vZGUuaGVhZCB8fCBub2RlLCBzdHlsZSk7XG59XG5mdW5jdGlvbiBhcHBlbmRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSkge1xuICAgIGlmIChpc19oeWRyYXRpbmcpIHtcbiAgICAgICAgaW5pdF9oeWRyYXRlKHRhcmdldCk7XG4gICAgICAgIGlmICgodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPT09IHVuZGVmaW5lZCkgfHwgKCh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCAhPT0gbnVsbCkgJiYgKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkLnBhcmVudEVsZW1lbnQgIT09IHRhcmdldCkpKSB7XG4gICAgICAgICAgICB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCA9IHRhcmdldC5maXJzdENoaWxkO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNraXAgbm9kZXMgb2YgdW5kZWZpbmVkIG9yZGVyaW5nXG4gICAgICAgIHdoaWxlICgodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgIT09IG51bGwpICYmICh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZC5jbGFpbV9vcmRlciA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPSB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSAhPT0gdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQpIHtcbiAgICAgICAgICAgIC8vIFdlIG9ubHkgaW5zZXJ0IGlmIHRoZSBvcmRlcmluZyBvZiB0aGlzIG5vZGUgc2hvdWxkIGJlIG1vZGlmaWVkIG9yIHRoZSBwYXJlbnQgbm9kZSBpcyBub3QgdGFyZ2V0XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFpbV9vcmRlciAhPT0gdW5kZWZpbmVkIHx8IG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZS5wYXJlbnROb2RlICE9PSB0YXJnZXQgfHwgbm9kZS5uZXh0U2libGluZyAhPT0gbnVsbCkge1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbCk7XG59XG5mdW5jdGlvbiBpbnNlcnRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgaWYgKGlzX2h5ZHJhdGluZyAmJiAhYW5jaG9yKSB7XG4gICAgICAgIGFwcGVuZF9oeWRyYXRpb24odGFyZ2V0LCBub2RlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZS5wYXJlbnROb2RlICE9PSB0YXJnZXQgfHwgbm9kZS5uZXh0U2libGluZyAhPSBhbmNob3IpIHtcbiAgICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2VhY2goaXRlcmF0aW9ucywgZGV0YWNoaW5nKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpdGVyYXRpb25zW2ldKVxuICAgICAgICAgICAgaXRlcmF0aW9uc1tpXS5kKGRldGFjaGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG59XG5mdW5jdGlvbiBlbGVtZW50X2lzKG5hbWUsIGlzKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSwgeyBpcyB9KTtcbn1cbmZ1bmN0aW9uIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMob2JqLCBleGNsdWRlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIG9iaikge1xuICAgICAgICBpZiAoaGFzX3Byb3Aob2JqLCBrKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgJiYgZXhjbHVkZS5pbmRleE9mKGspID09PSAtMSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGFyZ2V0W2tdID0gb2JqW2tdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBzdmdfZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbn1cbmZ1bmN0aW9uIHRleHQoZGF0YSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbn1cbmZ1bmN0aW9uIHNwYWNlKCkge1xuICAgIHJldHVybiB0ZXh0KCcgJyk7XG59XG5mdW5jdGlvbiBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGV4dCgnJyk7XG59XG5mdW5jdGlvbiBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcHJldmVudF9kZWZhdWx0KGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc3RvcF9wcm9wYWdhdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzZWxmKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdHJ1c3RlZChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZXZlbnQuaXNUcnVzdGVkKVxuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGF0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgIGVsc2UgaWYgKG5vZGUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSkgIT09IHZhbHVlKVxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHNldF9hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhub2RlLl9fcHJvdG9fXyk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoYXR0cmlidXRlc1trZXldID09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX192YWx1ZScpIHtcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRvcnNba2V5XSAmJiBkZXNjcmlwdG9yc1trZXldLnNldCkge1xuICAgICAgICAgICAgbm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXR0cihub2RlLCBrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfc3ZnX2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgYXR0cihub2RlLCBrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEobm9kZSwgcHJvcCwgdmFsdWUpIHtcbiAgICBpZiAocHJvcCBpbiBub2RlKSB7XG4gICAgICAgIG5vZGVbcHJvcF0gPSB0eXBlb2Ygbm9kZVtwcm9wXSA9PT0gJ2Jvb2xlYW4nICYmIHZhbHVlID09PSAnJyA/IHRydWUgOiB2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGF0dHIobm9kZSwgcHJvcCwgdmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHhsaW5rX2F0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIG5vZGUuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlKGdyb3VwLCBfX3ZhbHVlLCBjaGVja2VkKSB7XG4gICAgY29uc3QgdmFsdWUgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoZ3JvdXBbaV0uY2hlY2tlZClcbiAgICAgICAgICAgIHZhbHVlLmFkZChncm91cFtpXS5fX3ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKCFjaGVja2VkKSB7XG4gICAgICAgIHZhbHVlLmRlbGV0ZShfX3ZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20odmFsdWUpO1xufVxuZnVuY3Rpb24gdG9fbnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAnJyA/IG51bGwgOiArdmFsdWU7XG59XG5mdW5jdGlvbiB0aW1lX3Jhbmdlc190b19hcnJheShyYW5nZXMpIHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGFycmF5LnB1c2goeyBzdGFydDogcmFuZ2VzLnN0YXJ0KGkpLCBlbmQ6IHJhbmdlcy5lbmQoaSkgfSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cbmZ1bmN0aW9uIGNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xufVxuZnVuY3Rpb24gaW5pdF9jbGFpbV9pbmZvKG5vZGVzKSB7XG4gICAgaWYgKG5vZGVzLmNsYWltX2luZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBub2Rlcy5jbGFpbV9pbmZvID0geyBsYXN0X2luZGV4OiAwLCB0b3RhbF9jbGFpbWVkOiAwIH07XG4gICAgfVxufVxuZnVuY3Rpb24gY2xhaW1fbm9kZShub2RlcywgcHJlZGljYXRlLCBwcm9jZXNzTm9kZSwgY3JlYXRlTm9kZSwgZG9udFVwZGF0ZUxhc3RJbmRleCA9IGZhbHNlKSB7XG4gICAgLy8gVHJ5IHRvIGZpbmQgbm9kZXMgaW4gYW4gb3JkZXIgc3VjaCB0aGF0IHdlIGxlbmd0aGVuIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2VcbiAgICBpbml0X2NsYWltX2luZm8obm9kZXMpO1xuICAgIGNvbnN0IHJlc3VsdE5vZGUgPSAoKCkgPT4ge1xuICAgICAgICAvLyBXZSBmaXJzdCB0cnkgdG8gZmluZCBhbiBlbGVtZW50IGFmdGVyIHRoZSBwcmV2aW91cyBvbmVcbiAgICAgICAgZm9yIChsZXQgaSA9IG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZW1lbnQgPSBwcm9jZXNzTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVwbGFjZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2Rlc1tpXSA9IHJlcGxhY2VtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWRvbnRVcGRhdGVMYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSB0cnkgdG8gZmluZCBvbmUgYmVmb3JlXG4gICAgICAgIC8vIFdlIGl0ZXJhdGUgaW4gcmV2ZXJzZSBzbyB0aGF0IHdlIGRvbid0IGdvIHRvbyBmYXIgYmFja1xuICAgICAgICBmb3IgKGxldCBpID0gbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXBsYWNlbWVudCA9IHByb2Nlc3NOb2RlKG5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChyZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzW2ldID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZG9udFVwZGF0ZUxhc3RJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHdlIHNwbGljZWQgYmVmb3JlIHRoZSBsYXN0X2luZGV4LCB3ZSBkZWNyZWFzZSBpdFxuICAgICAgICAgICAgICAgICAgICBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgY2FuJ3QgZmluZCBhbnkgbWF0Y2hpbmcgbm9kZSwgd2UgY3JlYXRlIGEgbmV3IG9uZVxuICAgICAgICByZXR1cm4gY3JlYXRlTm9kZSgpO1xuICAgIH0pKCk7XG4gICAgcmVzdWx0Tm9kZS5jbGFpbV9vcmRlciA9IG5vZGVzLmNsYWltX2luZm8udG90YWxfY2xhaW1lZDtcbiAgICBub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQgKz0gMTtcbiAgICByZXR1cm4gcmVzdWx0Tm9kZTtcbn1cbmZ1bmN0aW9uIGNsYWltX2VsZW1lbnRfYmFzZShub2RlcywgbmFtZSwgYXR0cmlidXRlcywgY3JlYXRlX2VsZW1lbnQpIHtcbiAgICByZXR1cm4gY2xhaW1fbm9kZShub2RlcywgKG5vZGUpID0+IG5vZGUubm9kZU5hbWUgPT09IG5hbWUsIChub2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gbm9kZS5hdHRyaWJ1dGVzW2pdO1xuICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVzW2F0dHJpYnV0ZS5uYW1lXSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZS5wdXNoKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZW1vdmUuZm9yRWFjaCh2ID0+IG5vZGUucmVtb3ZlQXR0cmlidXRlKHYpKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9LCAoKSA9PiBjcmVhdGVfZWxlbWVudChuYW1lKSk7XG59XG5mdW5jdGlvbiBjbGFpbV9lbGVtZW50KG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzKSB7XG4gICAgcmV0dXJuIGNsYWltX2VsZW1lbnRfYmFzZShub2RlcywgbmFtZSwgYXR0cmlidXRlcywgZWxlbWVudCk7XG59XG5mdW5jdGlvbiBjbGFpbV9zdmdfZWxlbWVudChub2RlcywgbmFtZSwgYXR0cmlidXRlcykge1xuICAgIHJldHVybiBjbGFpbV9lbGVtZW50X2Jhc2Uobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIHN2Z19lbGVtZW50KTtcbn1cbmZ1bmN0aW9uIGNsYWltX3RleHQobm9kZXMsIGRhdGEpIHtcbiAgICByZXR1cm4gY2xhaW1fbm9kZShub2RlcywgKG5vZGUpID0+IG5vZGUubm9kZVR5cGUgPT09IDMsIChub2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGFTdHIgPSAnJyArIGRhdGE7XG4gICAgICAgIGlmIChub2RlLmRhdGEuc3RhcnRzV2l0aChkYXRhU3RyKSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuZGF0YS5sZW5ndGggIT09IGRhdGFTdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuc3BsaXRUZXh0KGRhdGFTdHIubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuZGF0YSA9IGRhdGFTdHI7XG4gICAgICAgIH1cbiAgICB9LCAoKSA9PiB0ZXh0KGRhdGEpLCB0cnVlIC8vIFRleHQgbm9kZXMgc2hvdWxkIG5vdCB1cGRhdGUgbGFzdCBpbmRleCBzaW5jZSBpdCBpcyBsaWtlbHkgbm90IHdvcnRoIGl0IHRvIGVsaW1pbmF0ZSBhbiBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIG9mIGFjdHVhbCBlbGVtZW50c1xuICAgICk7XG59XG5mdW5jdGlvbiBjbGFpbV9zcGFjZShub2Rlcykge1xuICAgIHJldHVybiBjbGFpbV90ZXh0KG5vZGVzLCAnICcpO1xufVxuZnVuY3Rpb24gZmluZF9jb21tZW50KG5vZGVzLCB0ZXh0LCBzdGFydCkge1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDggLyogY29tbWVudCBub2RlICovICYmIG5vZGUudGV4dENvbnRlbnQudHJpbSgpID09PSB0ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZXMubGVuZ3RoO1xufVxuZnVuY3Rpb24gY2xhaW1faHRtbF90YWcobm9kZXMpIHtcbiAgICAvLyBmaW5kIGh0bWwgb3BlbmluZyB0YWdcbiAgICBjb25zdCBzdGFydF9pbmRleCA9IGZpbmRfY29tbWVudChub2RlcywgJ0hUTUxfVEFHX1NUQVJUJywgMCk7XG4gICAgY29uc3QgZW5kX2luZGV4ID0gZmluZF9jb21tZW50KG5vZGVzLCAnSFRNTF9UQUdfRU5EJywgc3RhcnRfaW5kZXgpO1xuICAgIGlmIChzdGFydF9pbmRleCA9PT0gZW5kX2luZGV4KSB7XG4gICAgICAgIHJldHVybiBuZXcgSHRtbFRhZ0h5ZHJhdGlvbigpO1xuICAgIH1cbiAgICBpbml0X2NsYWltX2luZm8obm9kZXMpO1xuICAgIGNvbnN0IGh0bWxfdGFnX25vZGVzID0gbm9kZXMuc3BsaWNlKHN0YXJ0X2luZGV4LCBlbmRfaW5kZXggLSBzdGFydF9pbmRleCArIDEpO1xuICAgIGRldGFjaChodG1sX3RhZ19ub2Rlc1swXSk7XG4gICAgZGV0YWNoKGh0bWxfdGFnX25vZGVzW2h0bWxfdGFnX25vZGVzLmxlbmd0aCAtIDFdKTtcbiAgICBjb25zdCBjbGFpbWVkX25vZGVzID0gaHRtbF90YWdfbm9kZXMuc2xpY2UoMSwgaHRtbF90YWdfbm9kZXMubGVuZ3RoIC0gMSk7XG4gICAgZm9yIChjb25zdCBuIG9mIGNsYWltZWRfbm9kZXMpIHtcbiAgICAgICAgbi5jbGFpbV9vcmRlciA9IG5vZGVzLmNsYWltX2luZm8udG90YWxfY2xhaW1lZDtcbiAgICAgICAgbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSHRtbFRhZ0h5ZHJhdGlvbihjbGFpbWVkX25vZGVzKTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhKHRleHQsIGRhdGEpIHtcbiAgICBkYXRhID0gJycgKyBkYXRhO1xuICAgIGlmICh0ZXh0Lndob2xlVGV4dCAhPT0gZGF0YSlcbiAgICAgICAgdGV4dC5kYXRhID0gZGF0YTtcbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF92YWx1ZShpbnB1dCwgdmFsdWUpIHtcbiAgICBpbnB1dC52YWx1ZSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3R5cGUoaW5wdXQsIHR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgICBpbnB1dC50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdHlsZShub2RlLCBrZXksIHZhbHVlLCBpbXBvcnRhbnQpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShrZXkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBpbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9uKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBpZiAob3B0aW9uLl9fdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gLTE7IC8vIG5vIG9wdGlvbiBzaG91bGQgYmUgc2VsZWN0ZWRcbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb25zKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb24uX192YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X3ZhbHVlKHNlbGVjdCkge1xuICAgIGNvbnN0IHNlbGVjdGVkX29wdGlvbiA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpIHx8IHNlbGVjdC5vcHRpb25zWzBdO1xuICAgIHJldHVybiBzZWxlY3RlZF9vcHRpb24gJiYgc2VsZWN0ZWRfb3B0aW9uLl9fdmFsdWU7XG59XG5mdW5jdGlvbiBzZWxlY3RfbXVsdGlwbGVfdmFsdWUoc2VsZWN0KSB7XG4gICAgcmV0dXJuIFtdLm1hcC5jYWxsKHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCc6Y2hlY2tlZCcpLCBvcHRpb24gPT4gb3B0aW9uLl9fdmFsdWUpO1xufVxuLy8gdW5mb3J0dW5hdGVseSB0aGlzIGNhbid0IGJlIGEgY29uc3RhbnQgYXMgdGhhdCB3b3VsZG4ndCBiZSB0cmVlLXNoYWtlYWJsZVxuLy8gc28gd2UgY2FjaGUgdGhlIHJlc3VsdCBpbnN0ZWFkXG5sZXQgY3Jvc3NvcmlnaW47XG5mdW5jdGlvbiBpc19jcm9zc29yaWdpbigpIHtcbiAgICBpZiAoY3Jvc3NvcmlnaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcm9zc29yaWdpbiA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB2b2lkIHdpbmRvdy5wYXJlbnQuZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjcm9zc29yaWdpbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNyb3Nzb3JpZ2luO1xufVxuZnVuY3Rpb24gYWRkX3Jlc2l6ZV9saXN0ZW5lcihub2RlLCBmbikge1xuICAgIGNvbnN0IGNvbXB1dGVkX3N0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBpZiAoY29tcHV0ZWRfc3R5bGUucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIH1cbiAgICBjb25zdCBpZnJhbWUgPSBlbGVtZW50KCdpZnJhbWUnKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7ICcgK1xuICAgICAgICAnb3ZlcmZsb3c6IGhpZGRlbjsgYm9yZGVyOiAwOyBvcGFjaXR5OiAwOyBwb2ludGVyLWV2ZW50czogbm9uZTsgei1pbmRleDogLTE7Jyk7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGlmcmFtZS50YWJJbmRleCA9IC0xO1xuICAgIGNvbnN0IGNyb3Nzb3JpZ2luID0gaXNfY3Jvc3NvcmlnaW4oKTtcbiAgICBsZXQgdW5zdWJzY3JpYmU7XG4gICAgaWYgKGNyb3Nzb3JpZ2luKSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSBcImRhdGE6dGV4dC9odG1sLDxzY3JpcHQ+b25yZXNpemU9ZnVuY3Rpb24oKXtwYXJlbnQucG9zdE1lc3NhZ2UoMCwnKicpfTwvc2NyaXB0PlwiO1xuICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3Rlbih3aW5kb3csICdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBpZnJhbWUuY29udGVudFdpbmRvdylcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgICBpZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgPSBsaXN0ZW4oaWZyYW1lLmNvbnRlbnRXaW5kb3csICdyZXNpemUnLCBmbik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFwcGVuZChub2RlLCBpZnJhbWUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChjcm9zc29yaWdpbikge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1bnN1YnNjcmliZSAmJiBpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBkZXRhY2goaWZyYW1lKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdG9nZ2xlX2NsYXNzKGVsZW1lbnQsIG5hbWUsIHRvZ2dsZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0W3RvZ2dsZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xufVxuZnVuY3Rpb24gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCwgYnViYmxlcyA9IGZhbHNlKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGJ1YmJsZXMsIGZhbHNlLCBkZXRhaWwpO1xuICAgIHJldHVybiBlO1xufVxuZnVuY3Rpb24gcXVlcnlfc2VsZWN0b3JfYWxsKHNlbGVjdG9yLCBwYXJlbnQgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbn1cbmNsYXNzIEh0bWxUYWcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmUgPSB0aGlzLm4gPSBudWxsO1xuICAgIH1cbiAgICBjKGh0bWwpIHtcbiAgICAgICAgdGhpcy5oKGh0bWwpO1xuICAgIH1cbiAgICBtKGh0bWwsIHRhcmdldCwgYW5jaG9yID0gbnVsbCkge1xuICAgICAgICBpZiAoIXRoaXMuZSkge1xuICAgICAgICAgICAgdGhpcy5lID0gZWxlbWVudCh0YXJnZXQubm9kZU5hbWUpO1xuICAgICAgICAgICAgdGhpcy50ID0gdGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5jKGh0bWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaShhbmNob3IpO1xuICAgIH1cbiAgICBoKGh0bWwpIHtcbiAgICAgICAgdGhpcy5lLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIHRoaXMubiA9IEFycmF5LmZyb20odGhpcy5lLmNoaWxkTm9kZXMpO1xuICAgIH1cbiAgICBpKGFuY2hvcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5zZXJ0KHRoaXMudCwgdGhpcy5uW2ldLCBhbmNob3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHAoaHRtbCkge1xuICAgICAgICB0aGlzLmQoKTtcbiAgICAgICAgdGhpcy5oKGh0bWwpO1xuICAgICAgICB0aGlzLmkodGhpcy5hKTtcbiAgICB9XG4gICAgZCgpIHtcbiAgICAgICAgdGhpcy5uLmZvckVhY2goZGV0YWNoKTtcbiAgICB9XG59XG5jbGFzcyBIdG1sVGFnSHlkcmF0aW9uIGV4dGVuZHMgSHRtbFRhZyB7XG4gICAgY29uc3RydWN0b3IoY2xhaW1lZF9ub2Rlcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmUgPSB0aGlzLm4gPSBudWxsO1xuICAgICAgICB0aGlzLmwgPSBjbGFpbWVkX25vZGVzO1xuICAgIH1cbiAgICBjKGh0bWwpIHtcbiAgICAgICAgaWYgKHRoaXMubCkge1xuICAgICAgICAgICAgdGhpcy5uID0gdGhpcy5sO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuYyhodG1sKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpKGFuY2hvcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5zZXJ0X2h5ZHJhdGlvbih0aGlzLnQsIHRoaXMubltpXSwgYW5jaG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGF0dHJpYnV0ZV90b19vYmplY3QoYXR0cmlidXRlcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgYXR0cmlidXRlIG9mIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmVzdWx0W2F0dHJpYnV0ZS5uYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGdldF9jdXN0b21fZWxlbWVudHNfc2xvdHMoZWxlbWVudCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIHJlc3VsdFtub2RlLnNsb3QgfHwgJ2RlZmF1bHQnXSA9IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gd2UgbmVlZCB0byBzdG9yZSB0aGUgaW5mb3JtYXRpb24gZm9yIG11bHRpcGxlIGRvY3VtZW50cyBiZWNhdXNlIGEgU3ZlbHRlIGFwcGxpY2F0aW9uIGNvdWxkIGFsc28gY29udGFpbiBpZnJhbWVzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL2lzc3Vlcy8zNjI0XG5jb25zdCBtYW5hZ2VkX3N0eWxlcyA9IG5ldyBNYXAoKTtcbmxldCBhY3RpdmUgPSAwO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rhcmtza3lhcHAvc3RyaW5nLWhhc2gvYmxvYi9tYXN0ZXIvaW5kZXguanNcbmZ1bmN0aW9uIGhhc2goc3RyKSB7XG4gICAgbGV0IGhhc2ggPSA1MzgxO1xuICAgIGxldCBpID0gc3RyLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgXiBzdHIuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gaGFzaCA+Pj4gMDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zdHlsZV9pbmZvcm1hdGlvbihkb2MsIG5vZGUpIHtcbiAgICBjb25zdCBpbmZvID0geyBzdHlsZXNoZWV0OiBhcHBlbmRfZW1wdHlfc3R5bGVzaGVldChub2RlKSwgcnVsZXM6IHt9IH07XG4gICAgbWFuYWdlZF9zdHlsZXMuc2V0KGRvYywgaW5mbyk7XG4gICAgcmV0dXJuIGluZm87XG59XG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XG4gICAgY29uc3Qgc3RlcCA9IDE2LjY2NiAvIGR1cmF0aW9uO1xuICAgIGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG4gICAgICAgIGNvbnN0IHQgPSBhICsgKGIgLSBhKSAqIGVhc2UocCk7XG4gICAgICAgIGtleWZyYW1lcyArPSBwICogMTAwICsgYCV7JHtmbih0LCAxIC0gdCl9fVxcbmA7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xuICAgIGNvbnN0IG5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfV8ke3VpZH1gO1xuICAgIGNvbnN0IGRvYyA9IGdldF9yb290X2Zvcl9zdHlsZShub2RlKTtcbiAgICBjb25zdCB7IHN0eWxlc2hlZXQsIHJ1bGVzIH0gPSBtYW5hZ2VkX3N0eWxlcy5nZXQoZG9jKSB8fCBjcmVhdGVfc3R5bGVfaW5mb3JtYXRpb24oZG9jLCBub2RlKTtcbiAgICBpZiAoIXJ1bGVzW25hbWVdKSB7XG4gICAgICAgIHJ1bGVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgc3R5bGVzaGVldC5pbnNlcnRSdWxlKGBAa2V5ZnJhbWVzICR7bmFtZX0gJHtydWxlfWAsIHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gbm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJyc7XG4gICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBgJHthbmltYXRpb24gPyBgJHthbmltYXRpb259LCBgIDogJyd9JHtuYW1lfSAke2R1cmF0aW9ufW1zIGxpbmVhciAke2RlbGF5fW1zIDEgYm90aGA7XG4gICAgYWN0aXZlICs9IDE7XG4gICAgcmV0dXJuIG5hbWU7XG59XG5mdW5jdGlvbiBkZWxldGVfcnVsZShub2RlLCBuYW1lKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSAobm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJycpLnNwbGl0KCcsICcpO1xuICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cy5maWx0ZXIobmFtZVxuICAgICAgICA/IGFuaW0gPT4gYW5pbS5pbmRleE9mKG5hbWUpIDwgMCAvLyByZW1vdmUgc3BlY2lmaWMgYW5pbWF0aW9uXG4gICAgICAgIDogYW5pbSA9PiBhbmltLmluZGV4T2YoJ19fc3ZlbHRlJykgPT09IC0xIC8vIHJlbW92ZSBhbGwgU3ZlbHRlIGFuaW1hdGlvbnNcbiAgICApO1xuICAgIGNvbnN0IGRlbGV0ZWQgPSBwcmV2aW91cy5sZW5ndGggLSBuZXh0Lmxlbmd0aDtcbiAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IG5leHQuam9pbignLCAnKTtcbiAgICAgICAgYWN0aXZlIC09IGRlbGV0ZWQ7XG4gICAgICAgIGlmICghYWN0aXZlKVxuICAgICAgICAgICAgY2xlYXJfcnVsZXMoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGVhcl9ydWxlcygpIHtcbiAgICByYWYoKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBtYW5hZ2VkX3N0eWxlcy5mb3JFYWNoKGluZm8gPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzdHlsZXNoZWV0IH0gPSBpbmZvO1xuICAgICAgICAgICAgbGV0IGkgPSBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldC5kZWxldGVSdWxlKGkpO1xuICAgICAgICAgICAgaW5mby5ydWxlcyA9IHt9O1xuICAgICAgICB9KTtcbiAgICAgICAgbWFuYWdlZF9zdHlsZXMuY2xlYXIoKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlX2FuaW1hdGlvbihub2RlLCBmcm9tLCBmbiwgcGFyYW1zKSB7XG4gICAgaWYgKCFmcm9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB0byA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGZyb20ubGVmdCA9PT0gdG8ubGVmdCAmJiBmcm9tLnJpZ2h0ID09PSB0by5yaWdodCAmJiBmcm9tLnRvcCA9PT0gdG8udG9wICYmIGZyb20uYm90dG9tID09PSB0by5ib3R0b20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogc2hvdWxkIHRoaXMgYmUgc2VwYXJhdGVkIGZyb20gZGVzdHJ1Y3R1cmluZz8gT3Igc3RhcnQvZW5kIGFkZGVkIHRvIHB1YmxpYyBhcGkgYW5kIGRvY3VtZW50YXRpb24/XG4gICAgc3RhcnQ6IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5LCBcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86XG4gICAgZW5kID0gc3RhcnRfdGltZSArIGR1cmF0aW9uLCB0aWNrID0gbm9vcCwgY3NzIH0gPSBmbihub2RlLCB7IGZyb20sIHRvIH0sIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSB0cnVlO1xuICAgIGxldCBzdGFydGVkID0gZmFsc2U7XG4gICAgbGV0IG5hbWU7XG4gICAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgIG5hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAwLCAxLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlbGF5KSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgbmFtZSk7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgbG9vcChub3cgPT4ge1xuICAgICAgICBpZiAoIXN0YXJ0ZWQgJiYgbm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkICYmIG5vdyA+PSBlbmQpIHtcbiAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBzdGFydF90aW1lO1xuICAgICAgICAgICAgY29uc3QgdCA9IDAgKyAxICogZWFzaW5nKHAgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBzdGFydCgpO1xuICAgIHRpY2soMCwgMSk7XG4gICAgcmV0dXJuIHN0b3A7XG59XG5mdW5jdGlvbiBmaXhfcG9zaXRpb24obm9kZSkge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBpZiAoc3R5bGUucG9zaXRpb24gIT09ICdhYnNvbHV0ZScgJiYgc3R5bGUucG9zaXRpb24gIT09ICdmaXhlZCcpIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBzdHlsZTtcbiAgICAgICAgY29uc3QgYSA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICAgIG5vZGUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZF90cmFuc2Zvcm0obm9kZSwgYSkge1xuICAgIGNvbnN0IGIgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChhLmxlZnQgIT09IGIubGVmdCB8fCBhLnRvcCAhPT0gYi50b3ApIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuICAgICAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IGAke3RyYW5zZm9ybX0gdHJhbnNsYXRlKCR7YS5sZWZ0IC0gYi5sZWZ0fXB4LCAke2EudG9wIC0gYi50b3B9cHgpYDtcbiAgICB9XG59XG5cbmxldCBjdXJyZW50X2NvbXBvbmVudDtcbmZ1bmN0aW9uIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICBjdXJyZW50X2NvbXBvbmVudCA9IGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGdldF9jdXJyZW50X2NvbXBvbmVudCgpIHtcbiAgICBpZiAoIWN1cnJlbnRfY29tcG9uZW50KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIGNhbGxlZCBvdXRzaWRlIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbicpO1xuICAgIHJldHVybiBjdXJyZW50X2NvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGJlZm9yZVVwZGF0ZShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmJlZm9yZV91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbk1vdW50KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fbW91bnQucHVzaChmbik7XG59XG5mdW5jdGlvbiBhZnRlclVwZGF0ZShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmFmdGVyX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uRGVzdHJveShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX2Rlc3Ryb3kucHVzaChmbik7XG59XG5mdW5jdGlvbiBjcmVhdGVFdmVudERpc3BhdGNoZXIoKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCk7XG4gICAgcmV0dXJuICh0eXBlLCBkZXRhaWwpID0+IHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1t0eXBlXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgLy8gVE9ETyBhcmUgdGhlcmUgc2l0dWF0aW9ucyB3aGVyZSBldmVudHMgY291bGQgYmUgZGlzcGF0Y2hlZFxuICAgICAgICAgICAgLy8gaW4gYSBzZXJ2ZXIgKG5vbi1ET00pIGVudmlyb25tZW50P1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5zbGljZSgpLmZvckVhY2goZm4gPT4ge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwoY29tcG9uZW50LCBldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBzZXRDb250ZXh0KGtleSwgY29udGV4dCkge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuc2V0KGtleSwgY29udGV4dCk7XG59XG5mdW5jdGlvbiBnZXRDb250ZXh0KGtleSkge1xuICAgIHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmdldChrZXkpO1xufVxuZnVuY3Rpb24gZ2V0QWxsQ29udGV4dHMoKSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQ7XG59XG5mdW5jdGlvbiBoYXNDb250ZXh0KGtleSkge1xuICAgIHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmhhcyhrZXkpO1xufVxuLy8gVE9ETyBmaWd1cmUgb3V0IGlmIHdlIHN0aWxsIHdhbnQgdG8gc3VwcG9ydFxuLy8gc2hvcnRoYW5kIGV2ZW50cywgb3IgaWYgd2Ugd2FudCB0byBpbXBsZW1lbnRcbi8vIGEgcmVhbCBidWJibGluZyBtZWNoYW5pc21cbmZ1bmN0aW9uIGJ1YmJsZShjb21wb25lbnQsIGV2ZW50KSB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1tldmVudC50eXBlXTtcbiAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiBmbi5jYWxsKHRoaXMsIGV2ZW50KSk7XG4gICAgfVxufVxuXG5jb25zdCBkaXJ0eV9jb21wb25lbnRzID0gW107XG5jb25zdCBpbnRyb3MgPSB7IGVuYWJsZWQ6IGZhbHNlIH07XG5jb25zdCBiaW5kaW5nX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgcmVuZGVyX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgZmx1c2hfY2FsbGJhY2tzID0gW107XG5jb25zdCByZXNvbHZlZF9wcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5sZXQgdXBkYXRlX3NjaGVkdWxlZCA9IGZhbHNlO1xuZnVuY3Rpb24gc2NoZWR1bGVfdXBkYXRlKCkge1xuICAgIGlmICghdXBkYXRlX3NjaGVkdWxlZCkge1xuICAgICAgICB1cGRhdGVfc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZWRfcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0aWNrKCkge1xuICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xuICAgIHJldHVybiByZXNvbHZlZF9wcm9taXNlO1xufVxuZnVuY3Rpb24gYWRkX3JlbmRlcl9jYWxsYmFjayhmbikge1xuICAgIHJlbmRlcl9jYWxsYmFja3MucHVzaChmbik7XG59XG5mdW5jdGlvbiBhZGRfZmx1c2hfY2FsbGJhY2soZm4pIHtcbiAgICBmbHVzaF9jYWxsYmFja3MucHVzaChmbik7XG59XG4vLyBmbHVzaCgpIGNhbGxzIGNhbGxiYWNrcyBpbiB0aGlzIG9yZGVyOlxuLy8gMS4gQWxsIGJlZm9yZVVwZGF0ZSBjYWxsYmFja3MsIGluIG9yZGVyOiBwYXJlbnRzIGJlZm9yZSBjaGlsZHJlblxuLy8gMi4gQWxsIGJpbmQ6dGhpcyBjYWxsYmFja3MsIGluIHJldmVyc2Ugb3JkZXI6IGNoaWxkcmVuIGJlZm9yZSBwYXJlbnRzLlxuLy8gMy4gQWxsIGFmdGVyVXBkYXRlIGNhbGxiYWNrcywgaW4gb3JkZXI6IHBhcmVudHMgYmVmb3JlIGNoaWxkcmVuLiBFWENFUFRcbi8vICAgIGZvciBhZnRlclVwZGF0ZXMgY2FsbGVkIGR1cmluZyB0aGUgaW5pdGlhbCBvbk1vdW50LCB3aGljaCBhcmUgY2FsbGVkIGluXG4vLyAgICByZXZlcnNlIG9yZGVyOiBjaGlsZHJlbiBiZWZvcmUgcGFyZW50cy5cbi8vIFNpbmNlIGNhbGxiYWNrcyBtaWdodCB1cGRhdGUgY29tcG9uZW50IHZhbHVlcywgd2hpY2ggY291bGQgdHJpZ2dlciBhbm90aGVyXG4vLyBjYWxsIHRvIGZsdXNoKCksIHRoZSBmb2xsb3dpbmcgc3RlcHMgZ3VhcmQgYWdhaW5zdCB0aGlzOlxuLy8gMS4gRHVyaW5nIGJlZm9yZVVwZGF0ZSwgYW55IHVwZGF0ZWQgY29tcG9uZW50cyB3aWxsIGJlIGFkZGVkIHRvIHRoZVxuLy8gICAgZGlydHlfY29tcG9uZW50cyBhcnJheSBhbmQgd2lsbCBjYXVzZSBhIHJlZW50cmFudCBjYWxsIHRvIGZsdXNoKCkuIEJlY2F1c2Vcbi8vICAgIHRoZSBmbHVzaCBpbmRleCBpcyBrZXB0IG91dHNpZGUgdGhlIGZ1bmN0aW9uLCB0aGUgcmVlbnRyYW50IGNhbGwgd2lsbCBwaWNrXG4vLyAgICB1cCB3aGVyZSB0aGUgZWFybGllciBjYWxsIGxlZnQgb2ZmIGFuZCBnbyB0aHJvdWdoIGFsbCBkaXJ0eSBjb21wb25lbnRzLiBUaGVcbi8vICAgIGN1cnJlbnRfY29tcG9uZW50IHZhbHVlIGlzIHNhdmVkIGFuZCByZXN0b3JlZCBzbyB0aGF0IHRoZSByZWVudHJhbnQgY2FsbCB3aWxsXG4vLyAgICBub3QgaW50ZXJmZXJlIHdpdGggdGhlIFwicGFyZW50XCIgZmx1c2goKSBjYWxsLlxuLy8gMi4gYmluZDp0aGlzIGNhbGxiYWNrcyBjYW5ub3QgdHJpZ2dlciBuZXcgZmx1c2goKSBjYWxscy5cbi8vIDMuIER1cmluZyBhZnRlclVwZGF0ZSwgYW55IHVwZGF0ZWQgY29tcG9uZW50cyB3aWxsIE5PVCBoYXZlIHRoZWlyIGFmdGVyVXBkYXRlXG4vLyAgICBjYWxsYmFjayBjYWxsZWQgYSBzZWNvbmQgdGltZTsgdGhlIHNlZW5fY2FsbGJhY2tzIHNldCwgb3V0c2lkZSB0aGUgZmx1c2goKVxuLy8gICAgZnVuY3Rpb24sIGd1YXJhbnRlZXMgdGhpcyBiZWhhdmlvci5cbmNvbnN0IHNlZW5fY2FsbGJhY2tzID0gbmV3IFNldCgpO1xubGV0IGZsdXNoaWR4ID0gMDsgLy8gRG8gKm5vdCogbW92ZSB0aGlzIGluc2lkZSB0aGUgZmx1c2goKSBmdW5jdGlvblxuZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgY29uc3Qgc2F2ZWRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgZG8ge1xuICAgICAgICAvLyBmaXJzdCwgY2FsbCBiZWZvcmVVcGRhdGUgZnVuY3Rpb25zXG4gICAgICAgIC8vIGFuZCB1cGRhdGUgY29tcG9uZW50c1xuICAgICAgICB3aGlsZSAoZmx1c2hpZHggPCBkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gZGlydHlfY29tcG9uZW50c1tmbHVzaGlkeF07XG4gICAgICAgICAgICBmbHVzaGlkeCsrO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoY29tcG9uZW50LiQkKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgZmx1c2hpZHggPSAwO1xuICAgICAgICB3aGlsZSAoYmluZGluZ19jYWxsYmFja3MubGVuZ3RoKVxuICAgICAgICAgICAgYmluZGluZ19jYWxsYmFja3MucG9wKCkoKTtcbiAgICAgICAgLy8gdGhlbiwgb25jZSBjb21wb25lbnRzIGFyZSB1cGRhdGVkLCBjYWxsXG4gICAgICAgIC8vIGFmdGVyVXBkYXRlIGZ1bmN0aW9ucy4gVGhpcyBtYXkgY2F1c2VcbiAgICAgICAgLy8gc3Vic2VxdWVudCB1cGRhdGVzLi4uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyX2NhbGxiYWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSByZW5kZXJfY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgaWYgKCFzZWVuX2NhbGxiYWNrcy5oYXMoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgLy8gLi4uc28gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBsb29wc1xuICAgICAgICAgICAgICAgIHNlZW5fY2FsbGJhY2tzLmFkZChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgfSB3aGlsZSAoZGlydHlfY29tcG9uZW50cy5sZW5ndGgpO1xuICAgIHdoaWxlIChmbHVzaF9jYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgIGZsdXNoX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgIH1cbiAgICB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgc2Vlbl9jYWxsYmFja3MuY2xlYXIoKTtcbiAgICBzZXRfY3VycmVudF9jb21wb25lbnQoc2F2ZWRfY29tcG9uZW50KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZSgkJCkge1xuICAgIGlmICgkJC5mcmFnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAkJC51cGRhdGUoKTtcbiAgICAgICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAgICAgY29uc3QgZGlydHkgPSAkJC5kaXJ0eTtcbiAgICAgICAgJCQuZGlydHkgPSBbLTFdO1xuICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5wKCQkLmN0eCwgZGlydHkpO1xuICAgICAgICAkJC5hZnRlcl91cGRhdGUuZm9yRWFjaChhZGRfcmVuZGVyX2NhbGxiYWNrKTtcbiAgICB9XG59XG5cbmxldCBwcm9taXNlO1xuZnVuY3Rpb24gd2FpdCgpIHtcbiAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoKG5vZGUsIGRpcmVjdGlvbiwga2luZCkge1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQoYCR7ZGlyZWN0aW9uID8gJ2ludHJvJyA6ICdvdXRybyd9JHtraW5kfWApKTtcbn1cbmNvbnN0IG91dHJvaW5nID0gbmV3IFNldCgpO1xubGV0IG91dHJvcztcbmZ1bmN0aW9uIGdyb3VwX291dHJvcygpIHtcbiAgICBvdXRyb3MgPSB7XG4gICAgICAgIHI6IDAsXG4gICAgICAgIGM6IFtdLFxuICAgICAgICBwOiBvdXRyb3MgLy8gcGFyZW50IGdyb3VwXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNoZWNrX291dHJvcygpIHtcbiAgICBpZiAoIW91dHJvcy5yKSB7XG4gICAgICAgIHJ1bl9hbGwob3V0cm9zLmMpO1xuICAgIH1cbiAgICBvdXRyb3MgPSBvdXRyb3MucDtcbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25faW4oYmxvY2ssIGxvY2FsKSB7XG4gICAgaWYgKGJsb2NrICYmIGJsb2NrLmkpIHtcbiAgICAgICAgb3V0cm9pbmcuZGVsZXRlKGJsb2NrKTtcbiAgICAgICAgYmxvY2suaShsb2NhbCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9vdXQoYmxvY2ssIGxvY2FsLCBkZXRhY2gsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGJsb2NrICYmIGJsb2NrLm8pIHtcbiAgICAgICAgaWYgKG91dHJvaW5nLmhhcyhibG9jaykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIG91dHJvaW5nLmFkZChibG9jayk7XG4gICAgICAgIG91dHJvcy5jLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgb3V0cm9pbmcuZGVsZXRlKGJsb2NrKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmIChkZXRhY2gpXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmQoMSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGJsb2NrLm8obG9jYWwpO1xuICAgIH1cbn1cbmNvbnN0IG51bGxfdHJhbnNpdGlvbiA9IHsgZHVyYXRpb246IDAgfTtcbmZ1bmN0aW9uIGNyZWF0ZV9pbl90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IGZhbHNlO1xuICAgIGxldCBhbmltYXRpb25fbmFtZTtcbiAgICBsZXQgdGFzaztcbiAgICBsZXQgdWlkID0gMDtcbiAgICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAwLCAxLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzLCB1aWQrKyk7XG4gICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgaWYgKHRhc2spXG4gICAgICAgICAgICB0YXNrLmFib3J0KCk7XG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIHRydWUsICdzdGFydCcpKTtcbiAgICAgICAgdGFzayA9IGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDEsIDApO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCB0cnVlLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBlYXNpbmcoKG5vdyAtIHN0YXJ0X3RpbWUpIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcnVubmluZztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxldCBzdGFydGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQoKSB7XG4gICAgICAgICAgICBpZiAoc3RhcnRlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbihnbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkYXRlKCkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlX291dF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGNvbnN0IGdyb3VwID0gb3V0cm9zO1xuICAgIGdyb3VwLnIgKz0gMTtcbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMSwgMCwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ3N0YXJ0JykpO1xuICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWdyb3VwLnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCByZXN1bHQgaW4gYGVuZCgpYCBiZWluZyBjYWxsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBkb24ndCBuZWVkIHRvIGNsZWFuIHVwIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwoZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSAtIHQsIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICBnbygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdvKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVuZChyZXNldCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0ICYmIGNvbmZpZy50aWNrKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRpY2soMSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMsIGludHJvKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHQgPSBpbnRybyA/IDAgOiAxO1xuICAgIGxldCBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBhbmltYXRpb25fbmFtZSA9IG51bGw7XG4gICAgZnVuY3Rpb24gY2xlYXJfYW5pbWF0aW9uKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQocHJvZ3JhbSwgZHVyYXRpb24pIHtcbiAgICAgICAgY29uc3QgZCA9IChwcm9ncmFtLmIgLSB0KTtcbiAgICAgICAgZHVyYXRpb24gKj0gTWF0aC5hYnMoZCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhOiB0LFxuICAgICAgICAgICAgYjogcHJvZ3JhbS5iLFxuICAgICAgICAgICAgZCxcbiAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgICAgc3RhcnQ6IHByb2dyYW0uc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHByb2dyYW0uc3RhcnQgKyBkdXJhdGlvbixcbiAgICAgICAgICAgIGdyb3VwOiBwcm9ncmFtLmdyb3VwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKGIpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgY29uc3QgcHJvZ3JhbSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBub3coKSArIGRlbGF5LFxuICAgICAgICAgICAgYlxuICAgICAgICB9O1xuICAgICAgICBpZiAoIWIpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBwcm9ncmFtLmdyb3VwID0gb3V0cm9zO1xuICAgICAgICAgICAgb3V0cm9zLnIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYW4gaW50cm8sIGFuZCB0aGVyZSdzIGEgZGVsYXksIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgIC8vIGFuIGluaXRpYWwgdGljayBhbmQvb3IgYXBwbHkgQ1NTIGFuaW1hdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYilcbiAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGIsICdzdGFydCcpKTtcbiAgICAgICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ19wcm9ncmFtICYmIG5vdyA+IHBlbmRpbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHBlbmRpbmdfcHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBydW5uaW5nX3Byb2dyYW0uYiwgcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uLCAwLCBlYXNpbmcsIGNvbmZpZy5jc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQgPSBydW5uaW5nX3Byb2dyYW0uYiwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0uYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRybyBcdTIwMTQgd2UgY2FuIHRpZHkgdXAgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvdXRybyBcdTIwMTQgbmVlZHMgdG8gYmUgY29vcmRpbmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEtLXJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChydW5uaW5nX3Byb2dyYW0uZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gbm93IC0gcnVubmluZ19wcm9ncmFtLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHJ1bm5pbmdfcHJvZ3JhbS5hICsgcnVubmluZ19wcm9ncmFtLmQgKiBlYXNpbmcocCAvIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISEocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBydW4oYikge1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9wcm9taXNlKHByb21pc2UsIGluZm8pIHtcbiAgICBjb25zdCB0b2tlbiA9IGluZm8udG9rZW4gPSB7fTtcbiAgICBmdW5jdGlvbiB1cGRhdGUodHlwZSwgaW5kZXgsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGluZm8udG9rZW4gIT09IHRva2VuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpbmZvLnJlc29sdmVkID0gdmFsdWU7XG4gICAgICAgIGxldCBjaGlsZF9jdHggPSBpbmZvLmN0eDtcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGlsZF9jdHggPSBjaGlsZF9jdHguc2xpY2UoKTtcbiAgICAgICAgICAgIGNoaWxkX2N0eFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmxvY2sgPSB0eXBlICYmIChpbmZvLmN1cnJlbnQgPSB0eXBlKShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgbmVlZHNfZmx1c2ggPSBmYWxzZTtcbiAgICAgICAgaWYgKGluZm8uYmxvY2spIHtcbiAgICAgICAgICAgIGlmIChpbmZvLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzLmZvckVhY2goKGJsb2NrLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBpbmRleCAmJiBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmJsb2Nrc1tpXSA9PT0gYmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5ibG9ja3NbaV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2suZCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICAgICAgYmxvY2subShpbmZvLm1vdW50KCksIGluZm8uYW5jaG9yKTtcbiAgICAgICAgICAgIG5lZWRzX2ZsdXNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLmJsb2NrID0gYmxvY2s7XG4gICAgICAgIGlmIChpbmZvLmJsb2NrcylcbiAgICAgICAgICAgIGluZm8uYmxvY2tzW2luZGV4XSA9IGJsb2NrO1xuICAgICAgICBpZiAobmVlZHNfZmx1c2gpIHtcbiAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzX3Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudF9jb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5jYXRjaCwgMiwgaW5mby5lcnJvciwgZXJyb3IpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICAgICAgaWYgKCFpbmZvLmhhc0NhdGNoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBpZiB3ZSBwcmV2aW91c2x5IGhhZCBhIHRoZW4vY2F0Y2ggYmxvY2ssIGRlc3Ryb3kgaXRcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby5wZW5kaW5nKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5wZW5kaW5nLCAwKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnRoZW4pIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHByb21pc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5yZXNvbHZlZCA9IHByb21pc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlX2F3YWl0X2Jsb2NrX2JyYW5jaChpbmZvLCBjdHgsIGRpcnR5KSB7XG4gICAgY29uc3QgY2hpbGRfY3R4ID0gY3R4LnNsaWNlKCk7XG4gICAgY29uc3QgeyByZXNvbHZlZCB9ID0gaW5mbztcbiAgICBpZiAoaW5mby5jdXJyZW50ID09PSBpbmZvLnRoZW4pIHtcbiAgICAgICAgY2hpbGRfY3R4W2luZm8udmFsdWVdID0gcmVzb2x2ZWQ7XG4gICAgfVxuICAgIGlmIChpbmZvLmN1cnJlbnQgPT09IGluZm8uY2F0Y2gpIHtcbiAgICAgICAgY2hpbGRfY3R4W2luZm8uZXJyb3JdID0gcmVzb2x2ZWQ7XG4gICAgfVxuICAgIGluZm8uYmxvY2sucChjaGlsZF9jdHgsIGRpcnR5KTtcbn1cblxuY29uc3QgZ2xvYmFscyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgID8gd2luZG93XG4gICAgOiB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyBnbG9iYWxUaGlzXG4gICAgICAgIDogZ2xvYmFsKTtcblxuZnVuY3Rpb24gZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZCgxKTtcbiAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG59XG5mdW5jdGlvbiBvdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgdHJhbnNpdGlvbl9vdXQoYmxvY2ssIDEsIDEsICgpID0+IHtcbiAgICAgICAgbG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZml4X2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5mKCk7XG4gICAgZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcbn1cbmZ1bmN0aW9uIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBvdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZV9rZXllZF9lYWNoKG9sZF9ibG9ja3MsIGRpcnR5LCBnZXRfa2V5LCBkeW5hbWljLCBjdHgsIGxpc3QsIGxvb2t1cCwgbm9kZSwgZGVzdHJveSwgY3JlYXRlX2VhY2hfYmxvY2ssIG5leHQsIGdldF9jb250ZXh0KSB7XG4gICAgbGV0IG8gPSBvbGRfYmxvY2tzLmxlbmd0aDtcbiAgICBsZXQgbiA9IGxpc3QubGVuZ3RoO1xuICAgIGxldCBpID0gbztcbiAgICBjb25zdCBvbGRfaW5kZXhlcyA9IHt9O1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIG9sZF9pbmRleGVzW29sZF9ibG9ja3NbaV0ua2V5XSA9IGk7XG4gICAgY29uc3QgbmV3X2Jsb2NrcyA9IFtdO1xuICAgIGNvbnN0IG5ld19sb29rdXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgZGVsdGFzID0gbmV3IE1hcCgpO1xuICAgIGkgPSBuO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgY2hpbGRfY3R4ID0gZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKTtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0X2tleShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgYmxvY2sgPSBsb29rdXAuZ2V0KGtleSk7XG4gICAgICAgIGlmICghYmxvY2spIHtcbiAgICAgICAgICAgIGJsb2NrID0gY3JlYXRlX2VhY2hfYmxvY2soa2V5LCBjaGlsZF9jdHgpO1xuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGR5bmFtaWMpIHtcbiAgICAgICAgICAgIGJsb2NrLnAoY2hpbGRfY3R4LCBkaXJ0eSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3X2xvb2t1cC5zZXQoa2V5LCBuZXdfYmxvY2tzW2ldID0gYmxvY2spO1xuICAgICAgICBpZiAoa2V5IGluIG9sZF9pbmRleGVzKVxuICAgICAgICAgICAgZGVsdGFzLnNldChrZXksIE1hdGguYWJzKGkgLSBvbGRfaW5kZXhlc1trZXldKSk7XG4gICAgfVxuICAgIGNvbnN0IHdpbGxfbW92ZSA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBkaWRfbW92ZSA9IG5ldyBTZXQoKTtcbiAgICBmdW5jdGlvbiBpbnNlcnQoYmxvY2spIHtcbiAgICAgICAgdHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG4gICAgICAgIGJsb2NrLm0obm9kZSwgbmV4dCk7XG4gICAgICAgIGxvb2t1cC5zZXQoYmxvY2sua2V5LCBibG9jayk7XG4gICAgICAgIG5leHQgPSBibG9jay5maXJzdDtcbiAgICAgICAgbi0tO1xuICAgIH1cbiAgICB3aGlsZSAobyAmJiBuKSB7XG4gICAgICAgIGNvbnN0IG5ld19ibG9jayA9IG5ld19ibG9ja3NbbiAtIDFdO1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW28gLSAxXTtcbiAgICAgICAgY29uc3QgbmV3X2tleSA9IG5ld19ibG9jay5rZXk7XG4gICAgICAgIGNvbnN0IG9sZF9rZXkgPSBvbGRfYmxvY2sua2V5O1xuICAgICAgICBpZiAobmV3X2Jsb2NrID09PSBvbGRfYmxvY2spIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIG5leHQgPSBuZXdfYmxvY2suZmlyc3Q7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgICAgICBuLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9rZXkpKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGJsb2NrXG4gICAgICAgICAgICBkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbG9va3VwLmhhcyhuZXdfa2V5KSB8fCB3aWxsX21vdmUuaGFzKG5ld19rZXkpKSB7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaWRfbW92ZS5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZWx0YXMuZ2V0KG5ld19rZXkpID4gZGVsdGFzLmdldChvbGRfa2V5KSkge1xuICAgICAgICAgICAgZGlkX21vdmUuYWRkKG5ld19rZXkpO1xuICAgICAgICAgICAgaW5zZXJ0KG5ld19ibG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aWxsX21vdmUuYWRkKG9sZF9rZXkpO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdoaWxlIChvLS0pIHtcbiAgICAgICAgY29uc3Qgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvXTtcbiAgICAgICAgaWYgKCFuZXdfbG9va3VwLmhhcyhvbGRfYmxvY2sua2V5KSlcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgIH1cbiAgICB3aGlsZSAobilcbiAgICAgICAgaW5zZXJ0KG5ld19ibG9ja3NbbiAtIDFdKTtcbiAgICByZXR1cm4gbmV3X2Jsb2Nrcztcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX2VhY2hfa2V5cyhjdHgsIGxpc3QsIGdldF9jb250ZXh0LCBnZXRfa2V5KSB7XG4gICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0X2tleShnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpKTtcbiAgICAgICAgaWYgKGtleXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGhhdmUgZHVwbGljYXRlIGtleXMgaW4gYSBrZXllZCBlYWNoJyk7XG4gICAgICAgIH1cbiAgICAgICAga2V5cy5hZGQoa2V5KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldF9zcHJlYWRfdXBkYXRlKGxldmVscywgdXBkYXRlcykge1xuICAgIGNvbnN0IHVwZGF0ZSA9IHt9O1xuICAgIGNvbnN0IHRvX251bGxfb3V0ID0ge307XG4gICAgY29uc3QgYWNjb3VudGVkX2ZvciA9IHsgJCRzY29wZTogMSB9O1xuICAgIGxldCBpID0gbGV2ZWxzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvbnN0IG8gPSBsZXZlbHNbaV07XG4gICAgICAgIGNvbnN0IG4gPSB1cGRhdGVzW2ldO1xuICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiBuKSlcbiAgICAgICAgICAgICAgICAgICAgdG9fbnVsbF9vdXRba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhY2NvdW50ZWRfZm9yW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlW2tleV0gPSBuW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV2ZWxzW2ldID0gbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8pIHtcbiAgICAgICAgICAgICAgICBhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIHRvX251bGxfb3V0KSB7XG4gICAgICAgIGlmICghKGtleSBpbiB1cGRhdGUpKVxuICAgICAgICAgICAgdXBkYXRlW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB1cGRhdGU7XG59XG5mdW5jdGlvbiBnZXRfc3ByZWFkX29iamVjdChzcHJlYWRfcHJvcHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHNwcmVhZF9wcm9wcyA9PT0gJ29iamVjdCcgJiYgc3ByZWFkX3Byb3BzICE9PSBudWxsID8gc3ByZWFkX3Byb3BzIDoge307XG59XG5cbi8vIHNvdXJjZTogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5kaWNlcy5odG1sXG5jb25zdCBib29sZWFuX2F0dHJpYnV0ZXMgPSBuZXcgU2V0KFtcbiAgICAnYWxsb3dmdWxsc2NyZWVuJyxcbiAgICAnYWxsb3dwYXltZW50cmVxdWVzdCcsXG4gICAgJ2FzeW5jJyxcbiAgICAnYXV0b2ZvY3VzJyxcbiAgICAnYXV0b3BsYXknLFxuICAgICdjaGVja2VkJyxcbiAgICAnY29udHJvbHMnLFxuICAgICdkZWZhdWx0JyxcbiAgICAnZGVmZXInLFxuICAgICdkaXNhYmxlZCcsXG4gICAgJ2Zvcm1ub3ZhbGlkYXRlJyxcbiAgICAnaGlkZGVuJyxcbiAgICAnaXNtYXAnLFxuICAgICdsb29wJyxcbiAgICAnbXVsdGlwbGUnLFxuICAgICdtdXRlZCcsXG4gICAgJ25vbW9kdWxlJyxcbiAgICAnbm92YWxpZGF0ZScsXG4gICAgJ29wZW4nLFxuICAgICdwbGF5c2lubGluZScsXG4gICAgJ3JlYWRvbmx5JyxcbiAgICAncmVxdWlyZWQnLFxuICAgICdyZXZlcnNlZCcsXG4gICAgJ3NlbGVjdGVkJ1xuXSk7XG5cbmNvbnN0IGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyID0gL1tcXHMnXCI+Lz1cXHV7RkREMH0tXFx1e0ZERUZ9XFx1e0ZGRkV9XFx1e0ZGRkZ9XFx1ezFGRkZFfVxcdXsxRkZGRn1cXHV7MkZGRkV9XFx1ezJGRkZGfVxcdXszRkZGRX1cXHV7M0ZGRkZ9XFx1ezRGRkZFfVxcdXs0RkZGRn1cXHV7NUZGRkV9XFx1ezVGRkZGfVxcdXs2RkZGRX1cXHV7NkZGRkZ9XFx1ezdGRkZFfVxcdXs3RkZGRn1cXHV7OEZGRkV9XFx1ezhGRkZGfVxcdXs5RkZGRX1cXHV7OUZGRkZ9XFx1e0FGRkZFfVxcdXtBRkZGRn1cXHV7QkZGRkV9XFx1e0JGRkZGfVxcdXtDRkZGRX1cXHV7Q0ZGRkZ9XFx1e0RGRkZFfVxcdXtERkZGRn1cXHV7RUZGRkV9XFx1e0VGRkZGfVxcdXtGRkZGRX1cXHV7RkZGRkZ9XFx1ezEwRkZGRX1cXHV7MTBGRkZGfV0vdTtcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuLy8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI25vbmNoYXJhY3RlclxuZnVuY3Rpb24gc3ByZWFkKGFyZ3MsIGF0dHJzX3RvX2FkZCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcbiAgICBpZiAoYXR0cnNfdG9fYWRkKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXNfdG9fYWRkID0gYXR0cnNfdG9fYWRkLmNsYXNzZXM7XG4gICAgICAgIGNvbnN0IHN0eWxlc190b19hZGQgPSBhdHRyc190b19hZGQuc3R5bGVzO1xuICAgICAgICBpZiAoY2xhc3Nlc190b19hZGQpIHtcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLmNsYXNzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzID0gY2xhc3Nlc190b19hZGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzICs9ICcgJyArIGNsYXNzZXNfdG9fYWRkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdHlsZXNfdG9fYWRkKSB7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5zdHlsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5zdHlsZSA9IHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVzX3RvX2FkZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnN0eWxlID0gc3R5bGVfb2JqZWN0X3RvX3N0cmluZyhtZXJnZV9zc3Jfc3R5bGVzKGF0dHJpYnV0ZXMuc3R5bGUsIHN0eWxlc190b19hZGQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLnRlc3QobmFtZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgc3RyICs9ICcgJyArIG5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGJvb2xlYW5fYXR0cmlidXRlcy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgIHN0ciArPSAnICcgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0ciArPSBgICR7bmFtZX09XCIke3ZhbHVlfVwiYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiBtZXJnZV9zc3Jfc3R5bGVzKHN0eWxlX2F0dHJpYnV0ZSwgc3R5bGVfZGlyZWN0aXZlKSB7XG4gICAgY29uc3Qgc3R5bGVfb2JqZWN0ID0ge307XG4gICAgZm9yIChjb25zdCBpbmRpdmlkdWFsX3N0eWxlIG9mIHN0eWxlX2F0dHJpYnV0ZS5zcGxpdCgnOycpKSB7XG4gICAgICAgIGNvbnN0IGNvbG9uX2luZGV4ID0gaW5kaXZpZHVhbF9zdHlsZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBpbmRpdmlkdWFsX3N0eWxlLnNsaWNlKDAsIGNvbG9uX2luZGV4KS50cmltKCk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5kaXZpZHVhbF9zdHlsZS5zbGljZShjb2xvbl9pbmRleCArIDEpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIHN0eWxlX29iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gc3R5bGVfZGlyZWN0aXZlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gc3R5bGVfZGlyZWN0aXZlW25hbWVdO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0eWxlX29iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHN0eWxlX29iamVjdFtuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVfb2JqZWN0O1xufVxuY29uc3QgZXNjYXBlZCA9IHtcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7JyxcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0Oydcbn07XG5mdW5jdGlvbiBlc2NhcGUoaHRtbCkge1xuICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvW1wiJyY8Pl0vZywgbWF0Y2ggPT4gZXNjYXBlZFttYXRjaF0pO1xufVxuZnVuY3Rpb24gZXNjYXBlX2F0dHJpYnV0ZV92YWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gZXNjYXBlKHZhbHVlKSA6IHZhbHVlO1xufVxuZnVuY3Rpb24gZXNjYXBlX29iamVjdChvYmopIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBlc2NhcGVfYXR0cmlidXRlX3ZhbHVlKG9ialtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGVhY2goaXRlbXMsIGZuKSB7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc3RyICs9IGZuKGl0ZW1zW2ldLCBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IG1pc3NpbmdfY29tcG9uZW50ID0ge1xuICAgICQkcmVuZGVyOiAoKSA9PiAnJ1xufTtcbmZ1bmN0aW9uIHZhbGlkYXRlX2NvbXBvbmVudChjb21wb25lbnQsIG5hbWUpIHtcbiAgICBpZiAoIWNvbXBvbmVudCB8fCAhY29tcG9uZW50LiQkcmVuZGVyKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAnc3ZlbHRlOmNvbXBvbmVudCcpXG4gICAgICAgICAgICBuYW1lICs9ICcgdGhpcz17Li4ufSc7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgPCR7bmFtZX0+IGlzIG5vdCBhIHZhbGlkIFNTUiBjb21wb25lbnQuIFlvdSBtYXkgbmVlZCB0byByZXZpZXcgeW91ciBidWlsZCBjb25maWcgdG8gZW5zdXJlIHRoYXQgZGVwZW5kZW5jaWVzIGFyZSBjb21waWxlZCwgcmF0aGVyIHRoYW4gaW1wb3J0ZWQgYXMgcHJlLWNvbXBpbGVkIG1vZHVsZXNgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGRlYnVnKGZpbGUsIGxpbmUsIGNvbHVtbiwgdmFsdWVzKSB7XG4gICAgY29uc29sZS5sb2coYHtAZGVidWd9ICR7ZmlsZSA/IGZpbGUgKyAnICcgOiAnJ30oJHtsaW5lfToke2NvbHVtbn0pYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHJldHVybiAnJztcbn1cbmxldCBvbl9kZXN0cm95O1xuZnVuY3Rpb24gY3JlYXRlX3Nzcl9jb21wb25lbnQoZm4pIHtcbiAgICBmdW5jdGlvbiAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgICAgICBjb25zdCAkJCA9IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3ksXG4gICAgICAgICAgICBjb250ZXh0OiBuZXcgTWFwKGNvbnRleHQgfHwgKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSkpLFxuICAgICAgICAgICAgLy8gdGhlc2Ugd2lsbCBiZSBpbW1lZGlhdGVseSBkaXNjYXJkZWRcbiAgICAgICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KClcbiAgICAgICAgfTtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHsgJCQgfSk7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBmbihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpO1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQocGFyZW50X2NvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZW5kZXI6IChwcm9wcyA9IHt9LCB7ICQkc2xvdHMgPSB7fSwgY29udGV4dCA9IG5ldyBNYXAoKSB9ID0ge30pID0+IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3kgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdGl0bGU6ICcnLCBoZWFkOiAnJywgY3NzOiBuZXcgU2V0KCkgfTtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCB7fSwgJCRzbG90cywgY29udGV4dCk7XG4gICAgICAgICAgICBydW5fYWxsKG9uX2Rlc3Ryb3kpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBodG1sLFxuICAgICAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBBcnJheS5mcm9tKHJlc3VsdC5jc3MpLm1hcChjc3MgPT4gY3NzLmNvZGUpLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBtYXA6IG51bGwgLy8gVE9ET1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhZDogcmVzdWx0LnRpdGxlICsgcmVzdWx0LmhlYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICQkcmVuZGVyXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFkZF9hdHRyaWJ1dGUobmFtZSwgdmFsdWUsIGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAoYm9vbGVhbiAmJiAhdmFsdWUpKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGAgJHtuYW1lfSR7dmFsdWUgPT09IHRydWUgJiYgYm9vbGVhbl9hdHRyaWJ1dGVzLmhhcyhuYW1lKSA/ICcnIDogYD0ke3R5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeShlc2NhcGUodmFsdWUpKSA6IGBcIiR7dmFsdWV9XCJgfWB9YDtcbn1cbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcbiAgICByZXR1cm4gY2xhc3NlcyA/IGAgY2xhc3M9XCIke2NsYXNzZXN9XCJgIDogJyc7XG59XG5mdW5jdGlvbiBzdHlsZV9vYmplY3RfdG9fc3RyaW5nKHN0eWxlX29iamVjdCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZV9vYmplY3QpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IHN0eWxlX29iamVjdFtrZXldKVxuICAgICAgICAubWFwKGtleSA9PiBgJHtrZXl9OiAke3N0eWxlX29iamVjdFtrZXldfTtgKVxuICAgICAgICAuam9pbignICcpO1xufVxuZnVuY3Rpb24gYWRkX3N0eWxlcyhzdHlsZV9vYmplY3QpIHtcbiAgICBjb25zdCBzdHlsZXMgPSBzdHlsZV9vYmplY3RfdG9fc3RyaW5nKHN0eWxlX29iamVjdCk7XG4gICAgcmV0dXJuIHN0eWxlcyA/IGAgc3R5bGU9XCIke3N0eWxlc31cImAgOiAnJztcbn1cblxuZnVuY3Rpb24gYmluZChjb21wb25lbnQsIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5kZXggPSBjb21wb25lbnQuJCQucHJvcHNbbmFtZV07XG4gICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29tcG9uZW50LiQkLmJvdW5kW2luZGV4XSA9IGNhbGxiYWNrO1xuICAgICAgICBjYWxsYmFjayhjb21wb25lbnQuJCQuY3R4W2luZGV4XSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlX2NvbXBvbmVudChibG9jaykge1xuICAgIGJsb2NrICYmIGJsb2NrLmMoKTtcbn1cbmZ1bmN0aW9uIGNsYWltX2NvbXBvbmVudChibG9jaywgcGFyZW50X25vZGVzKSB7XG4gICAgYmxvY2sgJiYgYmxvY2subChwYXJlbnRfbm9kZXMpO1xufVxuZnVuY3Rpb24gbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgdGFyZ2V0LCBhbmNob3IsIGN1c3RvbUVsZW1lbnQpIHtcbiAgICBjb25zdCB7IGZyYWdtZW50LCBvbl9tb3VudCwgb25fZGVzdHJveSwgYWZ0ZXJfdXBkYXRlIH0gPSBjb21wb25lbnQuJCQ7XG4gICAgZnJhZ21lbnQgJiYgZnJhZ21lbnQubSh0YXJnZXQsIGFuY2hvcik7XG4gICAgaWYgKCFjdXN0b21FbGVtZW50KSB7XG4gICAgICAgIC8vIG9uTW91bnQgaGFwcGVucyBiZWZvcmUgdGhlIGluaXRpYWwgYWZ0ZXJVcGRhdGVcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdfb25fZGVzdHJveSA9IG9uX21vdW50Lm1hcChydW4pLmZpbHRlcihpc19mdW5jdGlvbik7XG4gICAgICAgICAgICBpZiAob25fZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIG9uX2Rlc3Ryb3kucHVzaCguLi5uZXdfb25fZGVzdHJveSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFZGdlIGNhc2UgLSBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgICAgICAvLyBtb3N0IGxpa2VseSBhcyBhIHJlc3VsdCBvZiBhIGJpbmRpbmcgaW5pdGlhbGlzaW5nXG4gICAgICAgICAgICAgICAgcnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb25lbnQuJCQub25fbW91bnQgPSBbXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gZGVzdHJveV9jb21wb25lbnQoY29tcG9uZW50LCBkZXRhY2hpbmcpIHtcbiAgICBjb25zdCAkJCA9IGNvbXBvbmVudC4kJDtcbiAgICBpZiAoJCQuZnJhZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgcnVuX2FsbCgkJC5vbl9kZXN0cm95KTtcbiAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQuZChkZXRhY2hpbmcpO1xuICAgICAgICAvLyBUT0RPIG51bGwgb3V0IG90aGVyIHJlZnMsIGluY2x1ZGluZyBjb21wb25lbnQuJCQgKGJ1dCBuZWVkIHRvXG4gICAgICAgIC8vIHByZXNlcnZlIGZpbmFsIHN0YXRlPylcbiAgICAgICAgJCQub25fZGVzdHJveSA9ICQkLmZyYWdtZW50ID0gbnVsbDtcbiAgICAgICAgJCQuY3R4ID0gW107XG4gICAgfVxufVxuZnVuY3Rpb24gbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpIHtcbiAgICBpZiAoY29tcG9uZW50LiQkLmRpcnR5WzBdID09PSAtMSkge1xuICAgICAgICBkaXJ0eV9jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgICAgIGNvbXBvbmVudC4kJC5kaXJ0eS5maWxsKDApO1xuICAgIH1cbiAgICBjb21wb25lbnQuJCQuZGlydHlbKGkgLyAzMSkgfCAwXSB8PSAoMSA8PCAoaSAlIDMxKSk7XG59XG5mdW5jdGlvbiBpbml0KGNvbXBvbmVudCwgb3B0aW9ucywgaW5zdGFuY2UsIGNyZWF0ZV9mcmFnbWVudCwgbm90X2VxdWFsLCBwcm9wcywgYXBwZW5kX3N0eWxlcywgZGlydHkgPSBbLTFdKSB7XG4gICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkID0ge1xuICAgICAgICBmcmFnbWVudDogbnVsbCxcbiAgICAgICAgY3R4OiBudWxsLFxuICAgICAgICAvLyBzdGF0ZVxuICAgICAgICBwcm9wcyxcbiAgICAgICAgdXBkYXRlOiBub29wLFxuICAgICAgICBub3RfZXF1YWwsXG4gICAgICAgIGJvdW5kOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgLy8gbGlmZWN5Y2xlXG4gICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgb25fZGVzdHJveTogW10sXG4gICAgICAgIG9uX2Rpc2Nvbm5lY3Q6IFtdLFxuICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcbiAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgY29udGV4dDogbmV3IE1hcChvcHRpb25zLmNvbnRleHQgfHwgKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSkpLFxuICAgICAgICAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgZGlydHksXG4gICAgICAgIHNraXBfYm91bmQ6IGZhbHNlLFxuICAgICAgICByb290OiBvcHRpb25zLnRhcmdldCB8fCBwYXJlbnRfY29tcG9uZW50LiQkLnJvb3RcbiAgICB9O1xuICAgIGFwcGVuZF9zdHlsZXMgJiYgYXBwZW5kX3N0eWxlcygkJC5yb290KTtcbiAgICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgICAkJC5jdHggPSBpbnN0YW5jZVxuICAgICAgICA/IGluc3RhbmNlKGNvbXBvbmVudCwgb3B0aW9ucy5wcm9wcyB8fCB7fSwgKGksIHJldCwgLi4ucmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICQkLmN0eFtpXSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghJCQuc2tpcF9ib3VuZCAmJiAkJC5ib3VuZFtpXSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRbaV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBbXTtcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCA/IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpIDogZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcbiAgICAgICAgICAgIHN0YXJ0X2h5ZHJhdGluZygpO1xuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBjaGlsZHJlbihvcHRpb25zLnRhcmdldCk7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQubChub2Rlcyk7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKGRldGFjaCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQuYygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmludHJvKVxuICAgICAgICAgICAgdHJhbnNpdGlvbl9pbihjb21wb25lbnQuJCQuZnJhZ21lbnQpO1xuICAgICAgICBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCBvcHRpb25zLnRhcmdldCwgb3B0aW9ucy5hbmNob3IsIG9wdGlvbnMuY3VzdG9tRWxlbWVudCk7XG4gICAgICAgIGVuZF9oeWRyYXRpbmcoKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgU3ZlbHRlRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgb25fbW91bnQgfSA9IHRoaXMuJCQ7XG4gICAgICAgICAgICB0aGlzLiQkLm9uX2Rpc2Nvbm5lY3QgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuJCQuc2xvdHRlZCkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLiQkLnNsb3R0ZWRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHIsIF9vbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbYXR0cl0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIHJ1bl9hbGwodGhpcy4kJC5vbl9kaXNjb25uZWN0KTtcbiAgICAgICAgfVxuICAgICAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBUT0RPIHNob3VsZCB0aGlzIGRlbGVnYXRlIHRvIGFkZEV2ZW50TGlzdGVuZXI/XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgICRzZXQoJCRwcm9wcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KCQkcHJvcHMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kJC5za2lwX2JvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkc2V0KCQkcHJvcHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgU3ZlbHRlIGNvbXBvbmVudHMuIFVzZWQgd2hlbiBkZXY9ZmFsc2UuXG4gKi9cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICB9XG4gICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgICRzZXQoJCRwcm9wcykge1xuICAgICAgICBpZiAodGhpcy4kJHNldCAmJiAhaXNfZW1wdHkoJCRwcm9wcykpIHtcbiAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiQkc2V0KCQkcHJvcHMpO1xuICAgICAgICAgICAgdGhpcy4kJC5za2lwX2JvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoX2Rldih0eXBlLCBkZXRhaWwpIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudCh0eXBlLCBPYmplY3QuYXNzaWduKHsgdmVyc2lvbjogJzMuNDYuMycgfSwgZGV0YWlsKSwgdHJ1ZSkpO1xufVxuZnVuY3Rpb24gYXBwZW5kX2Rldih0YXJnZXQsIG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlIH0pO1xuICAgIGFwcGVuZCh0YXJnZXQsIG5vZGUpO1xufVxuZnVuY3Rpb24gYXBwZW5kX2h5ZHJhdGlvbl9kZXYodGFyZ2V0LCBub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01JbnNlcnQnLCB7IHRhcmdldCwgbm9kZSB9KTtcbiAgICBhcHBlbmRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSk7XG59XG5mdW5jdGlvbiBpbnNlcnRfZGV2KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01JbnNlcnQnLCB7IHRhcmdldCwgbm9kZSwgYW5jaG9yIH0pO1xuICAgIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcik7XG59XG5mdW5jdGlvbiBpbnNlcnRfaHlkcmF0aW9uX2Rldih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NSW5zZXJ0JywgeyB0YXJnZXQsIG5vZGUsIGFuY2hvciB9KTtcbiAgICBpbnNlcnRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSwgYW5jaG9yKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9kZXYobm9kZSkge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlJywgeyBub2RlIH0pO1xuICAgIGRldGFjaChub2RlKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9iZXR3ZWVuX2RldihiZWZvcmUsIGFmdGVyKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZyAmJiBiZWZvcmUubmV4dFNpYmxpbmcgIT09IGFmdGVyKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYmVmb3JlX2RldihhZnRlcikge1xuICAgIHdoaWxlIChhZnRlci5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihhZnRlci5wcmV2aW91c1NpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9hZnRlcl9kZXYoYmVmb3JlKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbGlzdGVuX2Rldihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucywgaGFzX3ByZXZlbnRfZGVmYXVsdCwgaGFzX3N0b3BfcHJvcGFnYXRpb24pIHtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBvcHRpb25zID09PSB0cnVlID8gWydjYXB0dXJlJ10gOiBvcHRpb25zID8gQXJyYXkuZnJvbShPYmplY3Qua2V5cyhvcHRpb25zKSkgOiBbXTtcbiAgICBpZiAoaGFzX3ByZXZlbnRfZGVmYXVsdClcbiAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3ByZXZlbnREZWZhdWx0Jyk7XG4gICAgaWYgKGhhc19zdG9wX3Byb3BhZ2F0aW9uKVxuICAgICAgICBtb2RpZmllcnMucHVzaCgnc3RvcFByb3BhZ2F0aW9uJyk7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01BZGRFdmVudExpc3RlbmVyJywgeyBub2RlLCBldmVudCwgaGFuZGxlciwgbW9kaWZpZXJzIH0pO1xuICAgIGNvbnN0IGRpc3Bvc2UgPSBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlRXZlbnRMaXN0ZW5lcicsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICAgICAgZGlzcG9zZSgpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyX2Rldihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmVBdHRyaWJ1dGUnLCB7IG5vZGUsIGF0dHJpYnV0ZSB9KTtcbiAgICBlbHNlXG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NU2V0QXR0cmlidXRlJywgeyBub2RlLCBhdHRyaWJ1dGUsIHZhbHVlIH0pO1xufVxuZnVuY3Rpb24gcHJvcF9kZXYobm9kZSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgbm9kZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldFByb3BlcnR5JywgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBkYXRhc2V0X2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlLmRhdGFzZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXREYXRhc2V0JywgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YV9kZXYodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQud2hvbGVUZXh0ID09PSBkYXRhKVxuICAgICAgICByZXR1cm47XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXREYXRhJywgeyBub2RlOiB0ZXh0LCBkYXRhIH0pO1xuICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50KGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnc3RyaW5nJyAmJiAhKGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBhcmcpKSB7XG4gICAgICAgIGxldCBtc2cgPSAneyNlYWNofSBvbmx5IGl0ZXJhdGVzIG92ZXIgYXJyYXktbGlrZSBvYmplY3RzLic7XG4gICAgICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIGFyZyAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gYXJnKSB7XG4gICAgICAgICAgICBtc2cgKz0gJyBZb3UgY2FuIHVzZSBhIHNwcmVhZCB0byBjb252ZXJ0IHRoaXMgaXRlcmFibGUgaW50byBhbiBhcnJheS4nO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3Nsb3RzKG5hbWUsIHNsb3QsIGtleXMpIHtcbiAgICBmb3IgKGNvbnN0IHNsb3Rfa2V5IG9mIE9iamVjdC5rZXlzKHNsb3QpKSB7XG4gICAgICAgIGlmICghfmtleXMuaW5kZXhPZihzbG90X2tleSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgPCR7bmFtZX0+IHJlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgc2xvdCBcIiR7c2xvdF9rZXl9XCIuYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIFN2ZWx0ZSBjb21wb25lbnRzIHdpdGggc29tZSBtaW5vciBkZXYtZW5oYW5jZW1lbnRzLiBVc2VkIHdoZW4gZGV2PXRydWUuXG4gKi9cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudERldiBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgKCFvcHRpb25zLnRhcmdldCAmJiAhb3B0aW9ucy4kJGlubGluZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIid0YXJnZXQnIGlzIGEgcmVxdWlyZWQgb3B0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgICRkZXN0cm95KCkge1xuICAgICAgICBzdXBlci4kZGVzdHJveSgpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb21wb25lbnQgd2FzIGFscmVhZHkgZGVzdHJveWVkJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICB9O1xuICAgIH1cbiAgICAkY2FwdHVyZV9zdGF0ZSgpIHsgfVxuICAgICRpbmplY3Rfc3RhdGUoKSB7IH1cbn1cbi8qKlxuICogQmFzZSBjbGFzcyB0byBjcmVhdGUgc3Ryb25nbHkgdHlwZWQgU3ZlbHRlIGNvbXBvbmVudHMuXG4gKiBUaGlzIG9ubHkgZXhpc3RzIGZvciB0eXBpbmcgcHVycG9zZXMgYW5kIHNob3VsZCBiZSB1c2VkIGluIGAuZC50c2AgZmlsZXMuXG4gKlxuICogIyMjIEV4YW1wbGU6XG4gKlxuICogWW91IGhhdmUgY29tcG9uZW50IGxpYnJhcnkgb24gbnBtIGNhbGxlZCBgY29tcG9uZW50LWxpYnJhcnlgLCBmcm9tIHdoaWNoXG4gKiB5b3UgZXhwb3J0IGEgY29tcG9uZW50IGNhbGxlZCBgTXlDb21wb25lbnRgLiBGb3IgU3ZlbHRlK1R5cGVTY3JpcHQgdXNlcnMsXG4gKiB5b3Ugd2FudCB0byBwcm92aWRlIHR5cGluZ3MuIFRoZXJlZm9yZSB5b3UgY3JlYXRlIGEgYGluZGV4LmQudHNgOlxuICogYGBgdHNcbiAqIGltcG9ydCB7IFN2ZWx0ZUNvbXBvbmVudFR5cGVkIH0gZnJvbSBcInN2ZWx0ZVwiO1xuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50VHlwZWQ8e2Zvbzogc3RyaW5nfT4ge31cbiAqIGBgYFxuICogVHlwaW5nIHRoaXMgbWFrZXMgaXQgcG9zc2libGUgZm9yIElERXMgbGlrZSBWUyBDb2RlIHdpdGggdGhlIFN2ZWx0ZSBleHRlbnNpb25cbiAqIHRvIHByb3ZpZGUgaW50ZWxsaXNlbnNlIGFuZCB0byB1c2UgdGhlIGNvbXBvbmVudCBsaWtlIHRoaXMgaW4gYSBTdmVsdGUgZmlsZVxuICogd2l0aCBUeXBlU2NyaXB0OlxuICogYGBgc3ZlbHRlXG4gKiA8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICogXHRpbXBvcnQgeyBNeUNvbXBvbmVudCB9IGZyb20gXCJjb21wb25lbnQtbGlicmFyeVwiO1xuICogPC9zY3JpcHQ+XG4gKiA8TXlDb21wb25lbnQgZm9vPXsnYmFyJ30gLz5cbiAqIGBgYFxuICpcbiAqICMjIyMgV2h5IG5vdCBtYWtlIHRoaXMgcGFydCBvZiBgU3ZlbHRlQ29tcG9uZW50KERldilgP1xuICogQmVjYXVzZVxuICogYGBgdHNcbiAqIGNsYXNzIEFTdWJjbGFzc09mU3ZlbHRlQ29tcG9uZW50IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50PHtmb286IHN0cmluZ30+IHt9XG4gKiBjb25zdCBjb21wb25lbnQ6IHR5cGVvZiBTdmVsdGVDb21wb25lbnQgPSBBU3ViY2xhc3NPZlN2ZWx0ZUNvbXBvbmVudDtcbiAqIGBgYFxuICogd2lsbCB0aHJvdyBhIHR5cGUgZXJyb3IsIHNvIHdlIG5lZWQgdG8gc2VwYXJhdGUgdGhlIG1vcmUgc3RyaWN0bHkgdHlwZWQgY2xhc3MuXG4gKi9cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudFR5cGVkIGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50RGV2IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGxvb3BfZ3VhcmQodGltZW91dCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHN0YXJ0ID4gdGltZW91dCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmZpbml0ZSBsb29wIGRldGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgeyBIdG1sVGFnLCBIdG1sVGFnSHlkcmF0aW9uLCBTdmVsdGVDb21wb25lbnQsIFN2ZWx0ZUNvbXBvbmVudERldiwgU3ZlbHRlQ29tcG9uZW50VHlwZWQsIFN2ZWx0ZUVsZW1lbnQsIGFjdGlvbl9kZXN0cm95ZXIsIGFkZF9hdHRyaWJ1dGUsIGFkZF9jbGFzc2VzLCBhZGRfZmx1c2hfY2FsbGJhY2ssIGFkZF9sb2NhdGlvbiwgYWRkX3JlbmRlcl9jYWxsYmFjaywgYWRkX3Jlc2l6ZV9saXN0ZW5lciwgYWRkX3N0eWxlcywgYWRkX3RyYW5zZm9ybSwgYWZ0ZXJVcGRhdGUsIGFwcGVuZCwgYXBwZW5kX2RldiwgYXBwZW5kX2VtcHR5X3N0eWxlc2hlZXQsIGFwcGVuZF9oeWRyYXRpb24sIGFwcGVuZF9oeWRyYXRpb25fZGV2LCBhcHBlbmRfc3R5bGVzLCBhc3NpZ24sIGF0dHIsIGF0dHJfZGV2LCBhdHRyaWJ1dGVfdG9fb2JqZWN0LCBiZWZvcmVVcGRhdGUsIGJpbmQsIGJpbmRpbmdfY2FsbGJhY2tzLCBibGFua19vYmplY3QsIGJ1YmJsZSwgY2hlY2tfb3V0cm9zLCBjaGlsZHJlbiwgY2xhaW1fY29tcG9uZW50LCBjbGFpbV9lbGVtZW50LCBjbGFpbV9odG1sX3RhZywgY2xhaW1fc3BhY2UsIGNsYWltX3N2Z19lbGVtZW50LCBjbGFpbV90ZXh0LCBjbGVhcl9sb29wcywgY29tcG9uZW50X3N1YnNjcmliZSwgY29tcHV0ZV9yZXN0X3Byb3BzLCBjb21wdXRlX3Nsb3RzLCBjcmVhdGVFdmVudERpc3BhdGNoZXIsIGNyZWF0ZV9hbmltYXRpb24sIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24sIGNyZWF0ZV9jb21wb25lbnQsIGNyZWF0ZV9pbl90cmFuc2l0aW9uLCBjcmVhdGVfb3V0X3RyYW5zaXRpb24sIGNyZWF0ZV9zbG90LCBjcmVhdGVfc3NyX2NvbXBvbmVudCwgY3VycmVudF9jb21wb25lbnQsIGN1c3RvbV9ldmVudCwgZGF0YXNldF9kZXYsIGRlYnVnLCBkZXN0cm95X2Jsb2NrLCBkZXN0cm95X2NvbXBvbmVudCwgZGVzdHJveV9lYWNoLCBkZXRhY2gsIGRldGFjaF9hZnRlcl9kZXYsIGRldGFjaF9iZWZvcmVfZGV2LCBkZXRhY2hfYmV0d2Vlbl9kZXYsIGRldGFjaF9kZXYsIGRpcnR5X2NvbXBvbmVudHMsIGRpc3BhdGNoX2RldiwgZWFjaCwgZWxlbWVudCwgZWxlbWVudF9pcywgZW1wdHksIGVuZF9oeWRyYXRpbmcsIGVzY2FwZSwgZXNjYXBlX2F0dHJpYnV0ZV92YWx1ZSwgZXNjYXBlX29iamVjdCwgZXNjYXBlZCwgZXhjbHVkZV9pbnRlcm5hbF9wcm9wcywgZml4X2FuZF9kZXN0cm95X2Jsb2NrLCBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBmaXhfcG9zaXRpb24sIGZsdXNoLCBnZXRBbGxDb250ZXh0cywgZ2V0Q29udGV4dCwgZ2V0X2FsbF9kaXJ0eV9mcm9tX3Njb3BlLCBnZXRfYmluZGluZ19ncm91cF92YWx1ZSwgZ2V0X2N1cnJlbnRfY29tcG9uZW50LCBnZXRfY3VzdG9tX2VsZW1lbnRzX3Nsb3RzLCBnZXRfcm9vdF9mb3Jfc3R5bGUsIGdldF9zbG90X2NoYW5nZXMsIGdldF9zcHJlYWRfb2JqZWN0LCBnZXRfc3ByZWFkX3VwZGF0ZSwgZ2V0X3N0b3JlX3ZhbHVlLCBnbG9iYWxzLCBncm91cF9vdXRyb3MsIGhhbmRsZV9wcm9taXNlLCBoYXNDb250ZXh0LCBoYXNfcHJvcCwgaWRlbnRpdHksIGluaXQsIGluc2VydCwgaW5zZXJ0X2RldiwgaW5zZXJ0X2h5ZHJhdGlvbiwgaW5zZXJ0X2h5ZHJhdGlvbl9kZXYsIGludHJvcywgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIsIGlzX2NsaWVudCwgaXNfY3Jvc3NvcmlnaW4sIGlzX2VtcHR5LCBpc19mdW5jdGlvbiwgaXNfcHJvbWlzZSwgbGlzdGVuLCBsaXN0ZW5fZGV2LCBsb29wLCBsb29wX2d1YXJkLCBtZXJnZV9zc3Jfc3R5bGVzLCBtaXNzaW5nX2NvbXBvbmVudCwgbW91bnRfY29tcG9uZW50LCBub29wLCBub3RfZXF1YWwsIG5vdywgbnVsbF90b19lbXB0eSwgb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcywgb25EZXN0cm95LCBvbk1vdW50LCBvbmNlLCBvdXRyb19hbmRfZGVzdHJveV9ibG9jaywgcHJldmVudF9kZWZhdWx0LCBwcm9wX2RldiwgcXVlcnlfc2VsZWN0b3JfYWxsLCByYWYsIHJ1biwgcnVuX2FsbCwgc2FmZV9ub3RfZXF1YWwsIHNjaGVkdWxlX3VwZGF0ZSwgc2VsZWN0X211bHRpcGxlX3ZhbHVlLCBzZWxlY3Rfb3B0aW9uLCBzZWxlY3Rfb3B0aW9ucywgc2VsZWN0X3ZhbHVlLCBzZWxmLCBzZXRDb250ZXh0LCBzZXRfYXR0cmlidXRlcywgc2V0X2N1cnJlbnRfY29tcG9uZW50LCBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YSwgc2V0X2RhdGEsIHNldF9kYXRhX2Rldiwgc2V0X2lucHV0X3R5cGUsIHNldF9pbnB1dF92YWx1ZSwgc2V0X25vdywgc2V0X3JhZiwgc2V0X3N0b3JlX3ZhbHVlLCBzZXRfc3R5bGUsIHNldF9zdmdfYXR0cmlidXRlcywgc3BhY2UsIHNwcmVhZCwgc3JjX3VybF9lcXVhbCwgc3RhcnRfaHlkcmF0aW5nLCBzdG9wX3Byb3BhZ2F0aW9uLCBzdWJzY3JpYmUsIHN2Z19lbGVtZW50LCB0ZXh0LCB0aWNrLCB0aW1lX3Jhbmdlc190b19hcnJheSwgdG9fbnVtYmVyLCB0b2dnbGVfY2xhc3MsIHRyYW5zaXRpb25faW4sIHRyYW5zaXRpb25fb3V0LCB0cnVzdGVkLCB1cGRhdGVfYXdhaXRfYmxvY2tfYnJhbmNoLCB1cGRhdGVfa2V5ZWRfZWFjaCwgdXBkYXRlX3Nsb3QsIHVwZGF0ZV9zbG90X2Jhc2UsIHZhbGlkYXRlX2NvbXBvbmVudCwgdmFsaWRhdGVfZWFjaF9hcmd1bWVudCwgdmFsaWRhdGVfZWFjaF9rZXlzLCB2YWxpZGF0ZV9zbG90cywgdmFsaWRhdGVfc3RvcmUsIHhsaW5rX2F0dHIgfTtcbiIsICIvLyBzcmMvZW52LnRzXG5mdW5jdGlvbiBvbk1vdW50ZWQobm9kZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBtb3VudGluZywgY291bnQgPSAwO1xuICAgIGNsZWFySW50ZXJ2YWwobW91bnRpbmcpO1xuICAgIG1vdW50aW5nID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY291bnQrKztcbiAgICAgIGNvbnNvbGUubG9nKGNvdW50LCBub2RlLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPiAyKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwobW91bnRpbmcpO1xuICAgICAgICBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4pLmZvckVhY2goKGMsIGkpID0+IHtcbiAgICAgICAgICBjLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzb2x2ZShub2RlLmNoaWxkcmVuKTtcbiAgICAgIH0gZWxzZSBpZiAoY291bnQgPj0gNjkpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChtb3VudGluZyk7XG4gICAgICAgIHJlamVjdChgU2xpZHkgaGF2ZW4ndCBpdGVtc2ApO1xuICAgICAgfVxuICAgIH0sIDE2KTtcbiAgfSk7XG59XG5cbi8vIHNyYy91dGlscy50c1xuZnVuY3Rpb24gbWF4TWluKG1heCwgbWluLCB2YWwpIHtcbiAgcmV0dXJuIE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCB2YWwpKSB8fCAwO1xufVxuZnVuY3Rpb24gaW5kZXhpbmcobm9kZSwgaW5kZXgsIGxvb3AgPSBmYWxzZSkge1xuICBpZiAobG9vcCkge1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIHJldHVybiBub2Rlcyhub2RlKS5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSBpZiAoaW5kZXggPiBub2Rlcyhub2RlKS5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2VcbiAgICAgIHJldHVybiBpbmRleDtcbiAgfSBlbHNlXG4gICAgcmV0dXJuIG1heE1pbihub2Rlcyhub2RlKS5sZW5ndGggLSAxLCAwLCBpbmRleCk7XG59XG5mdW5jdGlvbiBheGlzQ29vcmQoZSwgYXhpcykge1xuICBpZiAoZS50eXBlID09PSBcIndoZWVsXCIpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJ5XCIgPyBlLmRlbHRhWSA6IGUuc2hpZnRLZXkgPyBlLmRlbHRhWSA6IGUuZGVsdGFYO1xuICB9IGVsc2VcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJ5XCIgPyB1bmlRKGUpLmNsaWVudFkgOiB1bmlRKGUpLmNsaWVudFg7XG59XG52YXIgdW5pUSA9IChlKSA9PiBlLmNoYW5nZWRUb3VjaGVzID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGU7XG52YXIgbm9kZXMgPSAobm9kZSkgPT4gQXJyYXkuZnJvbShub2RlLmNoaWxkcmVuKTtcbnZhciBjaGlsZCA9IChub2RlLCBpbmRleCkgPT4gbm9kZS5jaGlsZHJlbltpbmRleF07XG52YXIgY29vcmQgPSAoYXhpcykgPT4gYXhpcyA9PT0gXCJ5XCIgPyBcIm9mZnNldFRvcFwiIDogXCJvZmZzZXRMZWZ0XCI7XG52YXIgc2l6ZSA9IChheGlzKSA9PiBheGlzID09PSBcInlcIiA/IFwib2Zmc2V0SGVpZ2h0XCIgOiBcIm9mZnNldFdpZHRoXCI7XG52YXIgcGFydCA9IChhbGlnbikgPT4gYWxpZ24gPT09IFwibWlkZGxlXCIgPyAwLjUgOiAxO1xudmFyIGRpZmYgPSAoYWxpZ24sIHBvcykgPT4gYWxpZ24gIT09IFwic3RhcnRcIiA/IHBvcyA6IDA7XG52YXIgb2Zmc2V0ID0gKG5vZGUsIGNoaWxkMiwgYXhpcykgPT4gbm9kZS5wYXJlbnRFbGVtZW50W3NpemUoYXhpcyldIC0gY2hpbGQyW3NpemUoYXhpcyldO1xudmFyIHBvc2l0aW9uID0gKG5vZGUsIGNoaWxkMiwgYXhpcywgYWxpZ24sIGxvb3AgPSBmYWxzZSkgPT4gY2hpbGQyW2Nvb3JkKGF4aXMpXSAtIGRpZmYoYWxpZ24sIG9mZnNldChub2RlLCBjaGlsZDIsIGF4aXMpICogcGFydChhbGlnbikpO1xuZnVuY3Rpb24gY2xvc2VzdChub2RlLCB0YXJnZXQsIGF4aXMsIGFsaWduLCBsb29wID0gZmFsc2UpIHtcbiAgcmV0dXJuIG5vZGVzKG5vZGUpLnJlZHVjZSgocHJldjIsIGN1cnIsIGkpID0+IHtcbiAgICBjb25zdCBwb3MgPSAoY2hpbGQyKSA9PiBwb3NpdGlvbihub2RlLCBjaGlsZDIsIGF4aXMsIGFsaWduLCBsb29wKTtcbiAgICByZXR1cm4gTWF0aC5hYnMocG9zKGN1cnIpIC0gdGFyZ2V0KSA8IE1hdGguYWJzKHBvcyhwcmV2MikgLSB0YXJnZXQpID8gY3VyciA6IHByZXYyO1xuICB9KTtcbn1cbnZhciBmaW5kID0ge1xuICBpbmRleDogKG5vZGUsIHRhcmdldCwgY2hpbGQyLCBheGlzLCBhbGlnbiwgbG9vcCA9IGZhbHNlKSA9PiBjaGlsZDIgPyBub2Rlcyhub2RlKS5pbmRleE9mKGNoaWxkMikgOiArY2xvc2VzdChub2RlLCB0YXJnZXQsIGF4aXMsIGFsaWduLCBsb29wKS5kYXRhc2V0LmluZGV4LFxuICBwb3NpdGlvbjogKG5vZGUsIGluZGV4LCBheGlzLCBhbGlnbiwgbG9vcCA9IGZhbHNlKSA9PiBwb3NpdGlvbihub2RlLCBjaGlsZChub2RlLCBpbmRleCksIGF4aXMsIGFsaWduLCBsb29wKSxcbiAgdGFyZ2V0OiAobm9kZSwgdGFyZ2V0LCBheGlzLCBhbGlnbiwgbG9vcCA9IGZhbHNlKSA9PiBwb3NpdGlvbihub2RlLCBjbG9zZXN0KG5vZGUsIHRhcmdldCwgYXhpcywgYWxpZ24sIGxvb3ApLCBheGlzLCBhbGlnbiwgbG9vcCksXG4gIHNpemU6IChub2RlLCBpbmRleCwgYXhpcykgPT4gbm9kZXMobm9kZSlbaW5kZXhdW3NpemUoYXhpcyldLFxuICBjaGlsZDogKG5vZGUsIGluZGV4KSA9PiBub2Rlcyhub2RlKS5maW5kKChjaGlsZDIpID0+ICtjaGlsZDIuZGF0YXNldC5pbmRleCA9PT0gaW5kZXgpXG59O1xudmFyIHJvdGF0ZSA9IChhcnJheSwga2V5KSA9PiBhcnJheS5zbGljZShrZXkpLmNvbmNhdChhcnJheS5zbGljZSgwLCBrZXkpKTtcbmZ1bmN0aW9uIHByZXYobm9kZSwgYXhpcykge1xuICBjb25zdCBsYXN0ID0gbm9kZS5jaGlsZHJlbltub2RlLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICBub2RlLnByZXBlbmQobGFzdCk7XG59XG5mdW5jdGlvbiBuZXh0KG5vZGUsIGF4aXMpIHtcbiAgY29uc3QgZmlyc3QgPSBub2RlLmNoaWxkcmVuWzBdO1xuICBub2RlLmFwcGVuZChmaXJzdCk7XG59XG5cbi8vIHNyYy9zbGlkeS50c1xuZnVuY3Rpb24gc2xpZHkobm9kZSwgb3B0aW9ucyA9IHt9KSB7XG4gIGxldCB7XG4gICAgZ2FwID0gMCxcbiAgICBpbmRleCA9IDAsXG4gICAgYXhpcyA9IFwieFwiLFxuICAgIGxvb3AgPSBmYWxzZSxcbiAgICBzbmFwID0gZmFsc2UsXG4gICAgY2xhbXAgPSBmYWxzZSxcbiAgICBncmF2aXR5ID0gMS4yLFxuICAgIGR1cmF0aW9uID0gMzc1LFxuICAgIGFsaWduID0gXCJzdGFydFwiLFxuICAgIGluZGV4ZXIgPSAoeCkgPT4geCxcbiAgICBzY3JvbGxlciA9IChwKSA9PiBwXG4gIH0gPSBvcHRpb25zO1xuICBsZXQgcmFmLCByYWssIHZlbG9jaXR5ID0gMCwgcmVmZXJlbmNlID0gMCwgcG9zaXRpb24yID0gMCwgZnJhbWUgPSAwLCBkcmFndGltZSwgd2hlZWx0aW1lLCBoaXAgPSBwb3NpdGlvbjIsIGhpeCA9IGluZGV4O1xuICBjb25zdCBQQVJFTlQgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gIGNvbnN0IENJWCA9IE1hdGguZmxvb3Iobm9kZS5jaGlsZHJlbi5sZW5ndGggLyAyKTtcbiAgY29uc3QgUkFGID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICBvbk1vdW50ZWQobm9kZSkudGhlbigoY2hpbGRzKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJtb3VudGVkXCIpO1xuICAgIGlmIChQQVJFTlQpXG4gICAgICBQQVJFTlQuc3R5bGUub3V0bGluZSA9IFwibm9uZVwiO1xuICAgIG5vZGUuc3R5bGUudXNlclNlbGVjdCA9IFwibm9uZVwiO1xuICAgIG5vZGUuc3R5bGUudG91Y2hBY3Rpb24gPSBcInBhbi15XCI7XG4gICAgbm9kZS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgbm9kZS5zdHlsZS53aWxsQ2hhbmdlID0gXCJhdXRvXCI7XG4gICAgbm9kZS5zdHlsZS53ZWJraXRVc2VyU2VsZWN0ID0gXCJub25lXCI7XG4gICAgaWYgKGxvb3ApIHtcbiAgICAgIG5vZGUucmVwbGFjZUNoaWxkcmVuKC4uLnJvdGF0ZShBcnJheS5mcm9tKGNoaWxkcyksIGluZGV4IC0gQ0lYKSk7XG4gICAgICBub2RlLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcbiAgICB9XG4gICAgdG8oaW5kZXgpO1xuICAgIGlmIChQQVJFTlQpIHtcbiAgICAgIFBBUkVOVC5vbnJlc2l6ZSA9ICgpID0+IHRvKGluZGV4KTtcbiAgICAgIFBBUkVOVC5vbmNvbnRleHRtZW51ID0gKCkgPT4gY2xlYXIoKTtcbiAgICAgIFBBUkVOVC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvbkRvd24pO1xuICAgICAgUEFSRU5ULmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgb25Eb3duKTtcbiAgICAgIFBBUkVOVC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleXMpO1xuICAgICAgUEFSRU5ULmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBvbldoZWVsKTtcbiAgICB9XG4gIH0pLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICBmdW5jdGlvbiBtb3ZlKHBvcywgdHJhbnNpdGlvbiA9IDApIHtcbiAgICBwb3NpdGlvbjIgKz0gbG9vcCA/IGxvb3BpbmcocG9zKSA6IHBvcztcbiAgICBpbmRleCA9IGZpbmQuaW5kZXgobm9kZSwgcG9zaXRpb24yLCB2b2lkIDAsIGF4aXMsIGFsaWduLCBsb29wKTtcbiAgICBjb25zdCB0cmFuc2xhdGUgPSAoYXhpczIpID0+IHtcbiAgICAgIHJldHVybiBheGlzMiA9PT0gXCJ5XCIgPyBgMCwgJHstcG9zaXRpb24yfXB4LCAwYCA6IGAkey1wb3NpdGlvbjJ9cHgsIDAsIDBgO1xuICAgIH07XG4gICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGUoYXhpcyl9KWA7XG4gICAgbm9kZS5zdHlsZS50cmFuc2l0aW9uID0gYCR7dHJhbnNpdGlvbn1tc2A7XG4gICAgbm9kZS5kYXRhc2V0LnBvc2l0aW9uID0gYCR7cG9zaXRpb24yfWA7XG4gICAgbm9kZS5kYXRhc2V0LmluZGV4ID0gYCR7aW5kZXh9YDtcbiAgICBpbmRleGVyKGluZGV4KTtcbiAgICBzY3JvbGxlcihwb3NpdGlvbjIpO1xuICB9XG4gIGZ1bmN0aW9uIGxvb3BpbmcocG9zKSB7XG4gICAgY29uc3QgZGVsdGEgPSBoaXAgLSBwb3M7XG4gICAgY29uc3QgZmlyc3QgPSBmaW5kLnNpemUobm9kZSwgMCwgYXhpcyk7XG4gICAgY29uc3QgbGFzdCA9IGZpbmQuc2l6ZShub2RlLCBub2RlLmNoaWxkcmVuLmxlbmd0aCAtIDEsIGF4aXMpO1xuICAgIGNvbnN0IGhpc3RvcnkgPSAoc2l6ZTIpID0+IChzaXplMiArIGdhcCkgKiBNYXRoLnNpZ24oLXBvcyk7XG4gICAgaWYgKGhpeCAhPT0gaW5kZXgpIHtcbiAgICAgIHBvcyA+IDAgPyBuZXh0KG5vZGUsIGF4aXMpIDogcHJldihub2RlLCBheGlzKTtcbiAgICAgIHBvcyArPSBoaXN0b3J5KHBvcyA+IDAgPyBmaXJzdCA6IGxhc3QpO1xuICAgICAgZnJhbWUgPSBwb3NpdGlvbjIgKyBwb3MgKyBkZWx0YTtcbiAgICB9XG4gICAgaGl4ID0gaW5kZXg7XG4gICAgcmV0dXJuIHBvcztcbiAgfVxuICBmdW5jdGlvbiB0byhpbmRleDIsIHRhcmdldCA9IG51bGwpIHtcbiAgICBjbGVhcigpO1xuICAgIGluZGV4MiA9IGhpeCA9IGluZGV4aW5nKG5vZGUsIGluZGV4MiwgbG9vcCk7XG4gICAgY29uc3QgY2hpbGQyID0gZmluZC5jaGlsZChub2RlLCBpbmRleDIpO1xuICAgIGNvbnN0IGl4ID0gbG9vcCA/IGZpbmQuaW5kZXgobm9kZSwgcG9zaXRpb24yLCBjaGlsZDIsIGF4aXMsIGFsaWduLCBsb29wKSA6IGluZGV4MjtcbiAgICBsZXQgcG9zID0gdGFyZ2V0ID8gc25hcCA/IGZpbmQudGFyZ2V0KG5vZGUsIHRhcmdldCwgYXhpcywgYWxpZ24sIGxvb3ApIDogdGFyZ2V0IDogdGFyZ2V0ID09PSAwID8gMCA6IGZpbmQucG9zaXRpb24obm9kZSwgaXgsIGF4aXMsIGFsaWduLCBsb29wKTtcbiAgICBtb3ZlKHBvcyAtIHBvc2l0aW9uMiwgZHVyYXRpb24pO1xuICB9XG4gIGZ1bmN0aW9uIHRyYWNrKHRpbWVzdGFtcCkge1xuICAgIFJBRihmdW5jdGlvbiB0cmFjazIodGltZSkge1xuICAgICAgY29uc3QgdiA9IDFlMyAqIChwb3NpdGlvbjIgLSBmcmFtZSkgLyAoMSArICh0aW1lIC0gdGltZXN0YW1wKSk7XG4gICAgICB2ZWxvY2l0eSA9ICgyIC0gZ3Jhdml0eSkgKiB2ICsgbWF4TWluKDEsIDAsIDEgLSBncmF2aXR5KSAqIHZlbG9jaXR5O1xuICAgICAgdGltZXN0YW1wID0gdGltZTtcbiAgICAgIGZyYW1lID0gcG9zaXRpb24yO1xuICAgICAgcmFrID0gUkFGKHRyYWNrMik7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gc2Nyb2xsKHsgdGFyZ2V0LCBhbXBsaXR1ZGUsIGR1cmF0aW9uOiBkdXJhdGlvbjIsIHRpbWVzdGFtcCB9KSB7XG4gICAgaWYgKGFtcGxpdHVkZSkge1xuICAgICAgUkFGKGZ1bmN0aW9uIHNjcm9sbDIodGltZSkge1xuICAgICAgICBjb25zdCBlbGFwc2VkID0gKHRpbWUgLSB0aW1lc3RhbXApIC8gZHVyYXRpb24yO1xuICAgICAgICBjb25zdCBkZWx0YSA9IGFtcGxpdHVkZSAqIE1hdGguZXhwKC1lbGFwc2VkKTtcbiAgICAgICAgY29uc3QgZGlzdCA9IHBvc2l0aW9uMiAtICh0YXJnZXQgLSBkZWx0YSk7XG4gICAgICAgIG1vdmUobG9vcCA/IGRlbHRhIC8gMTYuNyA6IC1kaXN0KTtcbiAgICAgICAgcmFmID0gTWF0aC5hYnMoZGVsdGEpID4gMC41ID8gUkFGKHNjcm9sbDIpIDogbnVsbDtcbiAgICAgICAgaWYgKGxvb3AgJiYgTWF0aC5hYnMoZGVsdGEpIDwgNSlcbiAgICAgICAgICB0byhpbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gb25Eb3duKGUpIHtcbiAgICBub2RlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBlLnR5cGUgIT09IFwibW91c2Vkb3duXCIgPyBcImF1dG9cIiA6IFwibm9uZVwiO1xuICAgIGNsZWFyKCk7XG4gICAgZnJhbWUgPSBwb3NpdGlvbjI7XG4gICAgcmVmZXJlbmNlID0gYXhpc0Nvb3JkKGUsIGF4aXMpO1xuICAgIHRyYWNrKHBlcmZvcm1hbmNlLm5vdygpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdmUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBvblVwKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvbk1vdmUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgb25VcCk7XG4gIH1cbiAgZnVuY3Rpb24gb25Nb3ZlKGUpIHtcbiAgICBjb25zdCBkZWx0YSA9IChyZWZlcmVuY2UgLSBheGlzQ29vcmQoZSwgYXhpcykpICogKDIgLSBncmF2aXR5KTtcbiAgICByZWZlcmVuY2UgPSBheGlzQ29vcmQoZSwgYXhpcyk7XG4gICAgbW92ZShkZWx0YSk7XG4gIH1cbiAgZnVuY3Rpb24gb25VcChlKSB7XG4gICAgY2xlYXIoKTtcbiAgICBjb25zdCB7IHRhcmdldCwgYW1wbGl0dWRlIH0gPSBkZWx0aW5nKHBvc2l0aW9uMik7XG4gICAgaWYgKE1hdGguYWJzKGFtcGxpdHVkZSkgPiAxMClcbiAgICAgIE1hdGguYWJzKHZlbG9jaXR5KSA8IDEwMCA/IHRvKGluZGV4KSA6IGNsYW1wID8gdG8oaW5kZXgsIHRhcmdldCkgOiBzY3JvbGwoe1xuICAgICAgICB0YXJnZXQsXG4gICAgICAgIGFtcGxpdHVkZSxcbiAgICAgICAgZHVyYXRpb24sXG4gICAgICAgIHRpbWVzdGFtcDogcGVyZm9ybWFuY2Uubm93KClcbiAgICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGRlbHRpbmcocG9zaXRpb24zKSB7XG4gICAgbGV0IGFtcGxpdHVkZSA9ICgyIC0gZ3Jhdml0eSkgKiB2ZWxvY2l0eTtcbiAgICBjb25zdCB0YXJnZXQgPSBzbmFwID8gZmluZC50YXJnZXQobm9kZSwgcG9zaXRpb24zICsgYW1wbGl0dWRlLCBheGlzLCBhbGlnbiwgbG9vcCkgOiBwb3NpdGlvbjMgKyBhbXBsaXR1ZGU7XG4gICAgYW1wbGl0dWRlID0gdGFyZ2V0IC0gcG9zaXRpb24zO1xuICAgIHJldHVybiB7IHRhcmdldCwgYW1wbGl0dWRlIH07XG4gIH1cbiAgbGV0IHdoZWVsaW5nID0gZmFsc2U7XG4gIGZ1bmN0aW9uIG9uV2hlZWwoZSkge1xuICAgIGNsZWFyKCk7XG4gICAgd2hlZWxpbmcgPSB0cnVlO1xuICAgIGlmIChNYXRoLmFicyhheGlzQ29vcmQoZSwgXCJ4XCIpKSAmJiBNYXRoLmFicyhheGlzQ29vcmQoZSwgXCJ5XCIpKSA8IDE1IHx8IGUuc2hpZnRLZXkpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbW92ZShheGlzQ29vcmQoZSwgYXhpcykgKiAoMiAtIGdyYXZpdHkpKTtcbiAgICBpZiAoZS5zaGlmdEtleSlcbiAgICAgIHRvKGluZGV4IC0gTWF0aC5zaWduKGUuZGVsdGFZKSk7XG4gICAgZWxzZSBpZiAoc25hcCB8fCBjbGFtcClcbiAgICAgIHdoZWVsdGltZSA9IHNldFRpbWVvdXQoKCkgPT4gKHRvKGluZGV4KSwgd2hlZWxpbmcgPSBmYWxzZSksIDEwMCk7XG4gIH1cbiAgZnVuY3Rpb24gb25LZXlzKGUpIHtcbiAgICBpZiAoZS5rZXkgPT09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgIHRvKGluZGV4IC0gMSk7XG4gICAgfSBlbHNlIGlmIChlLmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgIHRvKGluZGV4ICsgMSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGhpeCA9IHdoZWVsaW5nID8gaGl4IDogaW5kZXg7XG4gICAgY2xlYXJJbnRlcnZhbChkcmFndGltZSk7XG4gICAgY2xlYXJUaW1lb3V0KHdoZWVsdGltZSk7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWspO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW92ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG9uVXApO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIG9uTW92ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBvblVwKTtcbiAgfVxuICBmdW5jdGlvbiB1cGRhdGUob3B0aW9uczIpIHtcbiAgICBkdXJhdGlvbiA9IG9wdGlvbnMyLmR1cmF0aW9uID8/IDM3NTtcbiAgICBncmF2aXR5ID0gbWF4TWluKDIsIDAsIG9wdGlvbnMyLmdyYXZpdHkgPz8gMS4yKTtcbiAgICBheGlzID0gb3B0aW9uczIuYXhpcyA/PyBcInhcIjtcbiAgICBhbGlnbiA9IG9wdGlvbnMyLmFsaWduID8/IFwibWlkZGxlXCI7XG4gICAgc25hcCA9IG9wdGlvbnMyLnNuYXAgPz8gdHJ1ZTtcbiAgICBjbGFtcCA9IG9wdGlvbnMyLmNsYW1wID8/IGZhbHNlO1xuICAgIGdhcCA9IG9wdGlvbnMyLmdhcCA/PyAwO1xuICAgIGlmIChpbmRleCAhPT0gb3B0aW9uczIuaW5kZXgpIHtcbiAgICAgIGluZGV4ID0gaW5kZXhpbmcobm9kZSwgb3B0aW9uczIuaW5kZXggPz8gMCwgbG9vcCk7XG4gICAgICB0byhpbmRleCk7XG4gICAgfVxuICAgIGlmIChsb29wICE9PSBvcHRpb25zMi5sb29wKSB7XG4gICAgICBjb25zb2xlLmxvZyhBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4pKTtcbiAgICAgIGxvb3AgPSBvcHRpb25zMi5sb29wID8/IGZhbHNlO1xuICAgICAgaWYgKGxvb3ApIHtcbiAgICAgICAgbm9kZS5yZXBsYWNlQ2hpbGRyZW4oLi4ucm90YXRlKEFycmF5LmZyb20obm9kZS5jaGlsZHJlbiksIGluZGV4IC0gQ0lYKSk7XG4gICAgICAgIG5vZGUuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImNlbnRlclwiO1xuICAgICAgICB0byhpbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnJlcGxhY2VDaGlsZHJlbiguLi5BcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4pKTtcbiAgICAgICAgbm9kZS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwic3RhcnRcIjtcbiAgICAgICAgdG8oaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGNsZWFyKCk7XG4gICAgaWYgKFBBUkVOVCkge1xuICAgICAgUEFSRU5ULm9ucmVzaXplID0gbnVsbDtcbiAgICAgIFBBUkVOVC5vbmNvbnRleHRtZW51ID0gbnVsbDtcbiAgICAgIFBBUkVOVC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvbkRvd24pO1xuICAgICAgUEFSRU5ULnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgb25Eb3duKTtcbiAgICAgIFBBUkVOVC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleXMpO1xuICAgICAgUEFSRU5ULnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBvbldoZWVsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgdXBkYXRlLCBkZXN0cm95LCB0byB9O1xufVxuZXhwb3J0IHtcbiAgc2xpZHlcbn07XG4iLCAiPHN2ZWx0ZTpvcHRpb25zIGltbXV0YWJsZT17dHJ1ZX0gLz5cblxuPHNlY3Rpb25cbiAgICB0YWJpbmRleD1cIjBcIlxuICAgIGFyaWEtbGFiZWw9XCJTbGlkeVwiXG4gICAgaWQ9e3dyYXAuaWR9XG4gICAgY2xhc3M9XCJzbGlkeVwiXG4gICAgY2xhc3M6bG9hZGVkPXtpbml0fVxuICAgIGNsYXNzOmF4aXN5XG4gICAgY2xhc3M6YXV0b3dpZHRoPXtzbGlkZS53aWR0aCA9PT0gJ2F1dG8nfVxuICAgIGNsYXNzOmFudGlsb29wPXtvcHRpb25zLmxvb3AgPT09IGZhbHNlfVxuICAgIGNsYXNzOmFsaWdubWlkZGxlPXt3cmFwLmFsaWduID09PSAnbWlkZGxlJ31cbiAgICBjbGFzczphbGlnbnN0YXJ0PXt3cmFwLmFsaWduID09PSAnc3RhcnQnfVxuICAgIGNsYXNzOmFsaWduZW5kPXt3cmFwLmFsaWduID09PSAnZW5kJ31cbiAgICBzdHlsZT1cIlxuICAgICAgICAtLXdyYXB3OiB7d3JhcC53aWR0aH07XG4gICAgICAgIC0td3JhcGg6IHt3cmFwLmhlaWdodH07XG4gICAgICAgIC0td3JhcHA6IHt3cmFwLnBhZGRpbmd9O1xuICAgICAgICAtLXNsaWRldzoge3NsaWRlLndpZHRofTtcbiAgICAgICAgLS1zbGlkZWg6IHtzbGlkZS5oZWlnaHR9O1xuICAgICAgICAtLXNsaWRlZjoge3NsaWRlLm9iamVjdGZpdH07XG4gICAgICAgIC0tc2xpZGVvOiB7c2xpZGUub3ZlcmZsb3d9O1xuICAgICAgICAtLXNsaWRlZzoge2F4aXN5ID8gYCR7c2xpZGUuZ2FwfXB4IDAgMCAwYCA6IGAwIDAgMCAke3NsaWRlLmdhcH1weGB9O1xuICAgICAgICAtLWR1cjoge29wdGlvbnMuZHVyYXRpb259bXM7XCJcbj5cbiAgICB7I2F3YWl0IHNsaWR5SW5pdChzbGlkZXMsIHRpbWVvdXQpIHRoZW4gc2xpZGVzfVxuICAgICAgICB7I2lmICFpbml0fVxuICAgICAgICAgICAgPHNlY3Rpb24gaWQ9XCJsb2FkZXJcIj5cbiAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwibG9hZGVyXCI+TG9hZGluZy4uLjwvc2xvdD5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgey9pZn1cbiAgICAgICAgPHVsXG4gICAgICAgICAgICBjbGFzcz1cInNsaWR5LXVsXCJcbiAgICAgICAgICAgIHVzZTpzbGlkeT17e1xuICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgIGF4aXM6IG9wdGlvbnMuYXhpcyxcbiAgICAgICAgICAgICAgICBhbGlnbjogd3JhcC5hbGlnbixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcbiAgICAgICAgICAgICAgICBjbGFtcDogb3B0aW9ucy5jbGFtcCxcbiAgICAgICAgICAgICAgICBncmF2aXR5OiBvcHRpb25zLmdyYXZpdHksXG4gICAgICAgICAgICAgICAgc25hcDogb3B0aW9ucy5zbmFwLFxuICAgICAgICAgICAgICAgIGxvb3A6IG9wdGlvbnMubG9vcCxcbiAgICAgICAgICAgICAgICBnYXA6IHNsaWRlLmdhcCxcbiAgICAgICAgICAgICAgICBpbmRleGVyOiAoeCkgPT4gKGluZGV4ID0geCksXG4gICAgICAgICAgICAgICAgc2Nyb2xsZXI6IChwKSA9PiAocG9zaXRpb24gPSBwKSxcbiAgICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICAgIDwhLS0geyNpZiBpbml0fSAtLT5cbiAgICAgICAgICAgIHsjZWFjaCBzbGlkZXMgYXMgaXRlbSwgaSAoa2V5KGl0ZW0pKX1cbiAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1pZD17aXRlbS5peH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9e3NsaWRlLmNsYXNzfVxuICAgICAgICAgICAgICAgICAgICBjbGFzczphY3RpdmU9e2l0ZW0uaXggPT09IGluZGV4fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17c2xpZGUuYmFja2ltZyA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7aXRlbVtzbGlkZS5pbWdzcmNrZXldfSlgXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c2xvdCB7aXRlbX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7I2lmICFzbGlkZS5iYWNraW1nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtpdGVtW3NsaWRlLmltZ3NyY2tleV19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17aXRlbVtzbGlkZS5pbWdzcmNrZXldfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17aXRlbS53aWR0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtpdGVtLmhlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICA8IS0tIHsvaWZ9IC0tPlxuICAgICAgICA8L3VsPlxuXG4gICAgICAgIHsjaWYgY29udHJvbHMuYXJyb3dzICYmIGluaXR9XG4gICAgICAgICAgICB7I2lmICFvcHRpb25zLmxvb3B9XG4gICAgICAgICAgICAgICAgeyNpZiBpbmRleCA+IDB9XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhcnJvdy1sZWZ0XCIgb246Y2xpY2s9eygpID0+IGluZGV4LS19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImFycm93LWxlZnRcIj4mIzg1OTI7PC9zbG90PlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgICAgIHsjaWYgaW5kZXggPCBzbGlkZXMubGVuZ3RoIC0gMX1cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFycm93LXJpZ2h0XCIgb246Y2xpY2s9eygpID0+IGluZGV4Kyt9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImFycm93LXJpZ2h0XCI+JiM4NTk0Ozwvc2xvdD5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYXJyb3ctbGVmdFwiIG9uOmNsaWNrPXsoKSA9PiBpbmRleC0tfT5cbiAgICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImFycm93LWxlZnRcIj4mIzg1OTI7PC9zbG90PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhcnJvdy1yaWdodFwiIG9uOmNsaWNrPXsoKSA9PiBpbmRleCsrfT5cbiAgICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImFycm93LXJpZ2h0XCI+JiM4NTk0Ozwvc2xvdD5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgIHsvaWZ9XG4gICAgICAgIHsjaWYgY29udHJvbHMuZG90cyAmJiBpbml0fVxuICAgICAgICAgICAgPHVsIGNsYXNzPVwic2xpZHktZG90c1wiIGNsYXNzOnB1cmU9e2NvbnRyb2xzLmRvdHNwdXJlfT5cbiAgICAgICAgICAgICAgICB7I2lmIGNvbnRyb2xzLmRvdHNhcnJvd31cbiAgICAgICAgICAgICAgICAgICAgeyNpZiAhb3B0aW9ucy5sb29wfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyNpZiBpbmRleCA+IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZG90cy1hcnJvdy1sZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246Y2xpY2s9eygpID0+IGluZGV4LS19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiZG90cy1hcnJvdy1sZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48YnV0dG9uPiYjODU5Mjs8L2J1dHRvbj48L3Nsb3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJkb3RzLWFycm93LWxlZnRcIiBvbjpjbGljaz17KCkgPT4gaW5kZXgtLX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImRvdHMtYXJyb3ctbGVmdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48YnV0dG9uPiYjODU5Mjs8L2J1dHRvbj48L3Nsb3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgeyNlYWNoIHsgbGVuZ3RoOiBzbGlkZXMubGVuZ3RoIH0gYXMgZG90LCBpfVxuICAgICAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOmFjdGl2ZT17aSA9PT0gaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbjpjbGlja3xzdG9wUHJvcGFnYXRpb249eygpID0+IChpbmRleCA9IGkpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiZG90XCIge2RvdH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e2NvbnRyb2xzLmRvdHNudW0gJiYgIWNvbnRyb2xzLmRvdHNwdXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyd9PC9idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgICAgICAgIHsjaWYgY29udHJvbHMuZG90c2Fycm93fVxuICAgICAgICAgICAgICAgICAgICB7I2lmICFvcHRpb25zLmxvb3B9XG4gICAgICAgICAgICAgICAgICAgICAgICB7I2lmIGluZGV4IDwgc2xpZGVzLmxlbmd0aCAtIDF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZG90cy1hcnJvdy1yaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOmNsaWNrPXsoKSA9PiBpbmRleCsrfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImRvdHMtYXJyb3ctcmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjxidXR0b24+JiM4NTk0OzwvYnV0dG9uPjwvc2xvdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRvdHMtYXJyb3ctcmlnaHRcIiBvbjpjbGljaz17KCkgPT4gaW5kZXgrK30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImRvdHMtYXJyb3ctcmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PGJ1dHRvbj4mIzg1OTQ7PC9idXR0b24+PC9zbG90XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgey9pZn1cbiAgICB7L2F3YWl0fVxuPC9zZWN0aW9uPlxuXG48c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICAgIGltcG9ydCB7IHNsaWR5IH0gZnJvbSAnQHNsaWR5L2NvcmUnO1xuXG4gICAgZXhwb3J0IGxldCBzbGlkZXM6IGFueVtdID0gW10sXG4gICAgICAgIGtleSA9IChpdGVtOiB7IFt4OiBzdHJpbmddOiBhbnk7IGlkOiBhbnkgfSkgPT5cbiAgICAgICAgICAgIGl0ZW0uaWQgfHwgaXRlbVtzbGlkZS5pbWdzcmNrZXldLFxuICAgICAgICB3cmFwID0ge1xuICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnNTAlJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwJyxcbiAgICAgICAgICAgIGFsaWduOiAnbWlkZGxlJyxcbiAgICAgICAgICAgIGFsaWdubWFyZ2luOiAwLFxuICAgICAgICB9LFxuICAgICAgICBzbGlkZSA9IHtcbiAgICAgICAgICAgIGdhcDogMCxcbiAgICAgICAgICAgIGNsYXNzOiAnJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNTAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgYmFja2ltZzogZmFsc2UsXG4gICAgICAgICAgICBpbWdzcmNrZXk6ICdzcmMnLFxuICAgICAgICAgICAgb2JqZWN0Zml0OiAnY292ZXInLFxuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICB9LFxuICAgICAgICBjb250cm9scyA9IHtcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBkb3RzbnVtOiB0cnVlLFxuICAgICAgICAgICAgZG90c2Fycm93OiB0cnVlLFxuICAgICAgICAgICAgZG90c3B1cmU6IGZhbHNlLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAga2V5czogdHJ1ZSxcbiAgICAgICAgICAgIGRyYWc6IHRydWUsXG4gICAgICAgICAgICB3aGVlbDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGF4aXM6ICd4JyxcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgZHVyYXRpb246IDQ1MCxcbiAgICAgICAgICAgIGNsYW1wOiBmYWxzZSxcbiAgICAgICAgICAgIHNuYXA6IHRydWUsXG4gICAgICAgICAgICBncmF2aXR5OiAxLjIsXG4gICAgICAgIH0sXG4gICAgICAgIGluZGV4ID0gNCxcbiAgICAgICAgaW5pdCA9IHRydWUsXG4gICAgICAgIHRpbWVvdXQgPSAwLFxuICAgICAgICBwb3NpdGlvbiA9IDA7XG5cbiAgICAkOiBheGlzeSA9IG9wdGlvbnMuYXhpcyA9PT0gJ3knO1xuXG4gICAgLy8gJDogc2xpZGVzID0gc2xpZHlJbml0KHNsaWRlcyk7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBzbGlkeUluaXQoXG4gICAgICAgIHNsaWRlczogYW55W10sXG4gICAgICAgIHRpbWVvdXQgPSAwLFxuICAgICAgICBpbml0OiBib29sZWFuID0gZmFsc2VcbiAgICApIHtcbiAgICAgICAgc2xpZGVzID0gc2xpZGVzLm1hcCgocywgaSkgPT4gKHsgaXg6IGksIC4uLnMgfSkpO1xuICAgICAgICB0aW1lb3V0ID4gMCA/IHNldFRpbWVvdXQoKCkgPT4gKGluaXQgPSB0cnVlKSwgdGltZW91dCkgOiAoaW5pdCA9IGluaXQpO1xuICAgICAgICByZXR1cm4gc2xpZGVzO1xuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbiAgICAjbG9hZGVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB9XG4gICAgLnNsaWR5IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IHZhcigtLXdyYXB3KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS13cmFwaCk7XG4gICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgdWwge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgYnV0dG9uIHtcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wOSk7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBvdXRsaW5lOiAwO1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICAmOmFjdGl2ZSB7XG4gICAgICAgICAgICAgICAgb3V0bGluZTogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5zbGlkeS11bCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBhZGRpbmc6IHZhcigtLXdyYXBwKTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3VjaC1hY3Rpb246IHBhbi15O1xuICAgICAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xuICAgICAgICBsaSB7XG4gICAgICAgICAgICBmbGV4OiAxIDAgYXV0bztcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIG92ZXJmbG93OiB2YXIoLS1zbGlkZW8pO1xuICAgICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICAgIHotaW5kZXg6IDA7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IHZhcigtLWR1cik7XG4gICAgICAgICAgICB3aWR0aDogdmFyKC0tc2xpZGV3KTtcbiAgICAgICAgICAgIGhlaWdodDogdmFyKC0tc2xpZGVoKTtcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBzY3JvbGw7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IHZhcigtLXNsaWRlZik7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIDpnbG9iYWwoaW1nKSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICAgICAgICAgIG1heC13aWR0aDogdmFyKC0td3JhcHcpO1xuICAgICAgICAgICAgICAgIG1heC1oZWlnaHQ6IHZhcigtLXdyYXBoKTtcbiAgICAgICAgICAgICAgICBvYmplY3QtZml0OiB2YXIoLS1zbGlkZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC5zbGlkeS11bCA+ICogKyAqIHtcbiAgICAgICAgbWFyZ2luOiB2YXIoLS1zbGlkZWcpO1xuICAgIH1cbiAgICAuc2xpZHkubG9hZGVkIC5zbGlkeS11bCBsaSB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIC5zbGlkeS5heGlzeSAuc2xpZHktdWwge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIH1cbiAgICA6Z2xvYmFsKC5zbGlkeS5hdXRvd2lkdGggLnNsaWR5LXVsIGxpIGltZykge1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICB9XG4gICAgLnNsaWR5IGxpLmFjdGl2ZSxcbiAgICAuc2xpZHkgbGkuYWN0aXZlIGJ1dHRvbiB7XG4gICAgICAgIGNvbG9yOiByZWQ7XG4gICAgfVxuICAgIC5zbGlkeS1kb3RzIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIC5zbGlkeS5heGlzeSAuc2xpZHktZG90cyB7XG4gICAgICAgIGJvdHRvbTogYXV0bztcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfVxuICAgIC5zbGlkeS1kb3RzIGxpIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cbiAgICAuc2xpZHkuYXhpc3kgLmRvdHMtYXJyb3ctbGVmdCxcbiAgICAuc2xpZHkuYXhpc3kgLmRvdHMtYXJyb3ctcmlnaHQge1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gICAgfVxuICAgIC5zbGlkeS1kb3RzLnB1cmUgbGkge1xuICAgICAgICB3aWR0aDogMzJweDtcbiAgICAgICAgaGVpZ2h0OiAzMnB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIH1cbiAgICAuc2xpZHktZG90cy5wdXJlIGxpIGJ1dHRvbiB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYmFja2dyb3VuZDogcmVkO1xuICAgICAgICBvcGFjaXR5OiAwLjE4O1xuICAgICAgICBjb2xvcjogcmVkO1xuICAgICAgICB3aWR0aDogMTJweDtcbiAgICAgICAgaGVpZ2h0OiAxMnB4O1xuICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciB2YXIoLS1kdXIpO1xuICAgIH1cbiAgICAuc2xpZHktZG90cy5wdXJlIGxpLmFjdGl2ZSBidXR0b24ge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICAuYXJyb3ctbGVmdCxcbiAgICAuZG90cy1hcnJvdy1sZWZ0IHtcbiAgICAgICAgbGVmdDogMDtcbiAgICB9XG4gICAgLmFycm93LXJpZ2h0LFxuICAgIC5kb3RzLWFycm93LXJpZ2h0IHtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgfVxuICAgIC5hcnJvdy1yaWdodCxcbiAgICAuYXJyb3ctbGVmdCB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB9XG4gICAgLnNsaWR5LWRvdHMucHVyZSAuZG90cy1hcnJvdy1sZWZ0IGJ1dHRvbixcbiAgICAuc2xpZHktZG90cy5wdXJlIC5kb3RzLWFycm93LXJpZ2h0IGJ1dHRvbiB7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIGhlaWdodDogYXV0bztcbiAgICB9XG4gICAgLmRvdHMtYXJyb3ctbGVmdCxcbiAgICAuZG90cy1hcnJvdy1yaWdodCB7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgfVxuPC9zdHlsZT5cbiIsICJleHBvcnQgaW50ZXJmYWNlIEl0ZW0ge1xuICAgIGlkPzogc3RyaW5nO1xuICAgIHNyYz86IHN0cmluZztcbiAgICB3aWR0aD86IG51bWJlcjtcbiAgICBoZWlnaHQ/OiBudW1iZXI7XG4gICAgYWx0Pzogc3RyaW5nO1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBob3RvcyhcbiAgICBsaW1pdDogbnVtYmVyLFxuICAgIHBhZ2U6IG51bWJlcixcbiAgICB3aWR0aCA9IDEyODAsXG4gICAgaGVpZ2h0ID0gODAwXG4pOiBQcm9taXNlPEl0ZW1bXT4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9waWNzdW0ucGhvdG9zL3YyL2xpc3Q/bGltaXQ9JHtsaW1pdH0mcGFnZT0ke3BhZ2V9YCxcbiAgICAgICAge1xuICAgICAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIC8vIEFjY2Vzc0NvbnRyb2xBbGxvd09yaWdpbjogJ2h0dHBzOi8vcGljc3VtLnBob3RvcydcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSk7XG4gICAgcmV0dXJuIHJlcy5tYXAoKGl0ZW06IEl0ZW0pID0+IHtcbiAgICAgICAgbGV0IGFzcGVjdCA9IGFzcGVjdFEoaXRlbS53aWR0aCwgaXRlbS5oZWlnaHQsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBzcmM6IGBodHRwczovL3BpY3N1bS5waG90b3MvaWQvJHtpdGVtLmlkfS8ke2FzcGVjdC53aWR0aH0vJHthc3BlY3QuaGVpZ2h0fS5qcGdgLFxuICAgICAgICAgICAgd2lkdGg6IGFzcGVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogYXNwZWN0LmhlaWdodCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGFzcGVjdFEoXG4gICAgc3JjV2lkdGg6IG51bWJlcixcbiAgICBzcmNIZWlnaHQ6IG51bWJlcixcbiAgICBtYXhXaWR0aDogbnVtYmVyLFxuICAgIG1heEhlaWdodDogbnVtYmVyXG4pOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH0ge1xuICAgIGxldCByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGg6IE1hdGgucm91bmQoc3JjV2lkdGggKiByYXRpbyksXG4gICAgICAgIGhlaWdodDogTWF0aC5yb3VuZChzcmNIZWlnaHQgKiByYXRpbyksXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHJhbmRvbVEgPSAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PlxuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG5cbmV4cG9ydCBjb25zdCBtYXhNaW4gPSAobWF4OiBudW1iZXIsIG1pbjogbnVtYmVyLCB2YWw6IG51bWJlcikgPT5cbiAgICBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsKSk7XG4iLCAiPHN2ZWx0ZTpvcHRpb25zIGltbXV0YWJsZT17dHJ1ZX0gLz5cblxuPGZpZWxkc2V0PlxuICAgIDxsZWdlbmQ+XG4gICAgICAgIDxoMT5TbGlkeSB7dmVyc2lvbi5yZXBsYWNlKC9cXC5bXi5dKiQvLCAnJyl9PHN1cD5zdmVsdGVKUzwvc3VwPjwvaDE+XG4gICAgICAgIDxidXR0b24gb246Y2xpY2s9eygpID0+IChzdGVuZCA9ICFzdGVuZCl9IGNsYXNzOmFjdGl2ZT17c3RlbmR9XG4gICAgICAgICAgICA+c3RlbmQ8L2J1dHRvblxuICAgICAgICA+XG4gICAgICAgIDxidXR0b24gb246Y2xpY2s9eygpID0+IChpbWFnZXMgPSAhaW1hZ2VzKX0gY2xhc3M6YWN0aXZlPXtpbWFnZXN9XG4gICAgICAgICAgICA+aW1hZ2VzPC9idXR0b25cbiAgICAgICAgPlxuICAgICAgICA8YnV0dG9uIG9uOmNsaWNrPXtjaGFuZ2VTY2hlbWV9IGNsYXNzOmFjdGl2ZT17ZGFya30+ZGFyazwvYnV0dG9uPlxuICAgICAgICA8cD5cbiAgICAgICAgICAgIGluZGV4OiBbPGI+e2luZGV4fTwvYj5dLCBwb3NpdGlvbjogPGI+e01hdGgudHJ1bmMocG9zaXRpb24pfTwvYj5weFxuICAgICAgICA8L3A+XG4gICAgPC9sZWdlbmQ+XG4gICAgPCEtLSB7I2lmIGl0ZW1zLmxlbmd0aH1cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgICAgICAgICBtYXg9e2l0ZW1zLmxlbmd0aCAtIDF9XG4gICAgICAgICAgICAgICAgc3RlcD1cIjFcIlxuICAgICAgICAgICAgICAgIGJpbmQ6dmFsdWU9e2luZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICB7L2lmfSAtLT5cbjwvZmllbGRzZXQ+XG5cbjxtYWluPlxuICAgIHsjYXdhaXQgbG9hZFBob3RvcyhsaW1pdCwgcGFnZSl9XG4gICAgICAgIGxvYWRpbmcuLi5cbiAgICB7OnRoZW4gaXRlbXN9XG4gICAgICAgIDxTbGlkeVxuICAgICAgICAgICAgc2xpZGVzPXtpdGVtc31cbiAgICAgICAgICAgIGJpbmQ6aW5kZXhcbiAgICAgICAgICAgIHdyYXA9e3tcbiAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcwJyxcbiAgICAgICAgICAgICAgICBhbGlnbixcbiAgICAgICAgICAgICAgICBhbGlnbm1hcmdpbjogMCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBzbGlkZT17e1xuICAgICAgICAgICAgICAgIGdhcCxcbiAgICAgICAgICAgICAgICBjbGFzczogJycsXG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgYmFja2ltZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW1nc3Jja2V5OiAnc3JjJyxcbiAgICAgICAgICAgICAgICBvYmplY3RmaXQ6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNvbnRyb2xzPXt7XG4gICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkb3RzbnVtOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRvdHNhcnJvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkb3RzcHVyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAga2V5czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkcmFnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdoZWVsOiB0cnVlLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9wdGlvbnM9e3tcbiAgICAgICAgICAgICAgICBheGlzLFxuICAgICAgICAgICAgICAgIGxvb3AsXG4gICAgICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgY2xhbXAsXG4gICAgICAgICAgICAgICAgc25hcCxcbiAgICAgICAgICAgICAgICBncmF2aXR5LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGJpbmQ6cG9zaXRpb25cbiAgICAgICAgICAgIGxldDppdGVtXG4gICAgICAgID5cbiAgICAgICAgICAgIHsjaWYgaW1hZ2VzfVxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtpdGVtLnNyY31cbiAgICAgICAgICAgICAgICAgICAgYWx0PXtpdGVtLml4fVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17aXRlbS53aWR0aH1cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtpdGVtLmhlaWdodH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgey9pZn1cbiAgICAgICAgPC9TbGlkeT5cbiAgICB7L2F3YWl0fVxuPC9tYWluPlxuXG48bmF2IGlkPVwiZG90c1wiPlxuICAgIHsjZWFjaCB7IGxlbmd0aDogaXRlbXMubGVuZ3RoIH0gYXMgZG90LCBpfVxuICAgICAgICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiAoaW5kZXggPSBpKX0gY2xhc3M6YWN0aXZlPXtpID09PSBpbmRleH1cbiAgICAgICAgICAgID57aX08L2J1dHRvblxuICAgICAgICA+Jm5ic3A7XG4gICAgey9lYWNofVxuPC9uYXY+XG5cbjxuYXY+XG4gICAgPGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gaW5kZXgtLX0gZGlzYWJsZWQ9eyFsb29wICYmICFpbmRleH0+XHUyMTkwPC9idXR0b24+XG4gICAgPGJ1dHRvblxuICAgICAgICBvbjpjbGljaz17KCkgPT4gaW5kZXgrK31cbiAgICAgICAgZGlzYWJsZWQ9eyFsb29wICYmIGluZGV4ID09PSBpdGVtcy5sZW5ndGggLSAxfT5cdTIxOTI8L2J1dHRvblxuICAgID5cbiAgICA8YnV0dG9uIG9uOmNsaWNrPXtzaHVmZmxlfT48aSBjbGFzcz1cImljb24gaWNvbi1yZWZyZXNoXCIgLz48L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiAoYXhpc1kgPSAhYXhpc1kpfSBjbGFzczphY3RpdmU9e2F4aXNZfT5heGlzWTwvYnV0dG9uXG4gICAgPlxuICAgIDxidXR0b24gb246Y2xpY2s9eygpID0+IChjbGFtcCA9ICFjbGFtcCl9IGNsYXNzOmFjdGl2ZT17Y2xhbXB9PlxuICAgICAgICBjbGFtcFxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gb246Y2xpY2s9eygpID0+IChzbmFwID0gIXNuYXApfSBjbGFzczphY3RpdmU9e3NuYXB9PnNuYXA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiAobG9vcCA9ICFsb29wKX0gY2xhc3M6YWN0aXZlPXtsb29wfT5sb29wPC9idXR0b24+XG48L25hdj5cblxuPGZvcm0+XG4gICAgPGZpZWxkc2V0PlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICB3aWR0aFxuICAgICAgICAgICAgPGlucHV0IGJpbmQ6dmFsdWU9e3dpZHRofSBzaXplPVwiNVwiIHdpZHRoPVwiYXV0b1wiIC8+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIGxpbWl0XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICBiaW5kOnZhbHVlPXtsaW1pdH1cbiAgICAgICAgICAgICAgICBzaXplPVwiNVwiXG4gICAgICAgICAgICAgICAgc3RlcD1cIjFcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjFcIlxuICAgICAgICAgICAgICAgIG1heD1cIjEwMFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICBnYXBcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIGJpbmQ6dmFsdWU9e2dhcH1cbiAgICAgICAgICAgICAgICBzaXplPVwiNVwiXG4gICAgICAgICAgICAgICAgc3RlcD1cIjFcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgICAgICAgIG1heD1cIjEwMFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2xhYmVsPlxuICAgIDwvZmllbGRzZXQ+XG4gICAgPGZpZWxkc2V0PlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICBkdXJhdGlvblxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgYmluZDp2YWx1ZT17ZHVyYXRpb259XG4gICAgICAgICAgICAgICAgc2l6ZT1cIjVcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCIxXCJcbiAgICAgICAgICAgICAgICBtaW49XCIxMDBcIlxuICAgICAgICAgICAgICAgIG1heD1cIjEwMDBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgZ3Jhdml0eVxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgYmluZDp2YWx1ZT17Z3Jhdml0eX1cbiAgICAgICAgICAgICAgICBzaXplPVwiNVwiXG4gICAgICAgICAgICAgICAgc3RlcD1cIjAuMVwiXG4gICAgICAgICAgICAgICAgbWluPVwiMC4xXCJcbiAgICAgICAgICAgICAgICBtYXg9XCIyXCJcbiAgICAgICAgICAgICAgICB3aWR0aD1cImF1dG9cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgYWxpZ25cbiAgICAgICAgICAgIDxzZWxlY3QgYmluZDp2YWx1ZT17YWxpZ259PlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdGFydFwiPlx1MjE5MCBzdGFydDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtaWRkbGVcIj5taWRkbGU8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZW5kXCI+ZW5kIFx1MjE5Mjwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgPC9maWVsZHNldD5cbiAgICA8IS0tIDxmaWVsZHNldD4gLS0+XG4gICAgPCEtLSA8bGFiZWw+Y2xhbXAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGJpbmQ6Y2hlY2tlZD17Y2xhbXB9IC8+PC9sYWJlbD4gLS0+XG4gICAgPCEtLSA8bGFiZWw+c25hcCA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgYmluZDpjaGVja2VkPXtzbmFwfSAvPjwvbGFiZWw+IC0tPlxuICAgIDwhLS0gPC9maWVsZHNldD4gLS0+XG48L2Zvcm0+XG5cbjwhLS0gXG48YXJ0aWNsZT5cbiAgICB7QGh0bWwgYXJ0aWNsZX1cbjwvYXJ0aWNsZT4gLS0+XG48c2NyaXB0IGxhbmc9XCJ0c1wiIGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgICBpbXBvcnQgeyBnZXRQaG90b3MsIHJhbmRvbVEgfSBmcm9tICcuL3NjcmlwdHMvYXBpJztcbiAgICBpbXBvcnQgU2xpZHkgZnJvbSAnLi4vLi4vc3JjL1NsaWR5LnN2ZWx0ZSc7XG4gICAgaW1wb3J0IHsgbmFtZSwgdmVyc2lvbiB9IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5cbiAgICBpbXBvcnQgdHlwZSB7IEl0ZW0gfSBmcm9tICcuL3NjcmlwdHMvYXBpJztcbjwvc2NyaXB0PlxuXG48c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICAgIGxldCBpdGVtczogSXRlbVtdID0gW10sXG4gICAgICAgIHBvc2l0aW9uID0gMCxcbiAgICAgICAgcGFnZSA9IHJhbmRvbVEoMCwgOTApLFxuICAgICAgICBsaW1pdCA9IDMsXG4gICAgICAgIGluZGV4ID0gMCxcbiAgICAgICAgYXhpc1kgPSBmYWxzZSxcbiAgICAgICAgY2xhbXAgPSB0cnVlLFxuICAgICAgICBhbGlnbiA9ICdtaWRkbGUnLFxuICAgICAgICBkdXJhdGlvbiA9IDM3NSxcbiAgICAgICAgc3RlbmQgPSBmYWxzZSxcbiAgICAgICAgZ3Jhdml0eSA9IDEuMixcbiAgICAgICAgd2lkdGggPSAnYXV0bycsXG4gICAgICAgIHNuYXAgPSB0cnVlLFxuICAgICAgICBpbWFnZXMgPSB0cnVlLFxuICAgICAgICBsb29wID0gZmFsc2UsXG4gICAgICAgIGdhcCA9IDE2O1xuXG4gICAgJDogZGFyayA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcblxuICAgIC8vIGV4cG9ydCBsZXQgYXJ0aWNsZSA9ICcnO1xuICAgIC8vIGZldGNoKCdhcnRpY2xlLm1kJykudGhlbihcbiAgICAvLyAgICAgYXN5bmMgKGEpID0+IChhcnRpY2xlID0gc25hcmtkb3duKGF3YWl0IGEudGV4dCgpKSlcbiAgICAvLyApO1xuXG4gICAgJDogYXhpcyA9IGF4aXNZID8gJ3knIDogJ3gnO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gbG9hZFBob3RvcyhsaW1pdDogbnVtYmVyLCBwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgaXRlbXMgPSBhd2FpdCBnZXRQaG90b3MobGltaXQsIHBhZ2UpO1xuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hhbmdlU2NoZW1lKHNjaGVtZSkge1xuICAgICAgICBjb25zdCBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICBodG1sLnNldEF0dHJpYnV0ZSgnc2NoZW1lJywgIWRhcmsgPyAnZGFyaycgOiAnbGlnaHQnKTtcbiAgICAgICAgZGFyayA9ICFkYXJrO1xuICAgIH1cbiAgICBjb25zdCBzaHVmZmxlID0gKCkgPT4gKHBhZ2UgPSByYW5kb21RKDAsIDkwKSk7XG5cbiAgICBjb25zdCBtcUxpc3QgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpO1xuICAgIC8vICQ6IGNvbnNvbGUubG9nKG1xTGlzdCwgZGFyayk7XG5cbiAgICAvLyAkOiBkaXNhYmxlZCA9ICFsb29wICYmICghaW5kZXggfHwgaW5kZXggPiBpdGVtcy5sZW5ndGggLSAxKTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbiAgICBuYXYge1xuICAgICAgICBtYXJnaW46IDFyZW0gMDtcbiAgICAgICAgJiNkb3RzIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBvdmVyZmxvdy14OiBzY3JvbGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3Qge1xuICAgICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgfVxuXG4gICAgbGFiZWwge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWZsb3c6IGNvbHVtbjtcbiAgICB9XG4gICAgZm9ybSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgICAgJiA+ICoge1xuICAgICAgICAgICAgZmxleDogMCBhdXRvO1xuICAgICAgICAgICAgZ2FwOiAxcmVtO1xuICAgICAgICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5pY29uOjphZnRlcixcbiAgICAuaWNvbjo6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgIH1cbiAgICAuaWNvbi1yZWZyZXNoOjphZnRlciB7XG4gICAgICAgIGJvcmRlcjogMC4yZW0gc29saWQgY3VycmVudENvbG9yO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBjdXJyZW50Y29sb3I7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiBjdXJyZW50Y29sb3I7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgbGVmdDogODAlO1xuICAgICAgICB0b3A6IC0wLjI1ZW07XG4gICAgICAgIHdpZHRoOiAwO1xuICAgIH1cbiAgICAuaWNvbi1yZWZyZXNoOjpiZWZvcmUge1xuICAgICAgICBib3JkZXI6IDAuMTJyZW0gc29saWQgY3VycmVudENvbG9yO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IGN1cnJlbnRjb2xvcjtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBoZWlnaHQ6IDAuNzVlbTtcbiAgICAgICAgd2lkdGg6IDAuNzVlbTtcbiAgICB9XG4gICAgLmljb24ge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdGV4dC1pbmRlbnQ6IC05OTk5cHg7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBzdXBlcjtcbiAgICAgICAgd2lkdGg6IDFlbTtcbiAgICB9XG48L3N0eWxlPlxuIiwgImltcG9ydCBBcHAgZnJvbSAnLi9BcHAuc3ZlbHRlJztcblxudmFyIGFwcCA9IG5ldyBBcHAoe1xuICAgIHRhcmdldDogZG9jdW1lbnQuYm9keSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLGtCQUFnQjtBQUFBO0FBRWhCLGtCQUFnQixLQUFLLEtBQUs7QUFFdEIsZUFBVyxLQUFLO0FBQ1osVUFBSSxLQUFLLElBQUk7QUFDakIsV0FBTztBQUFBO0FBRVgsc0JBQW9CLE9BQU87QUFDdkIsV0FBTyxTQUFTLE9BQU8sVUFBVSxZQUFZLE9BQU8sTUFBTSxTQUFTO0FBQUE7QUFPdkUsZUFBYSxJQUFJO0FBQ2IsV0FBTztBQUFBO0FBRVgsMEJBQXdCO0FBQ3BCLFdBQU8sdUJBQU8sT0FBTztBQUFBO0FBRXpCLG1CQUFpQixLQUFLO0FBQ2xCLFFBQUksUUFBUTtBQUFBO0FBRWhCLHVCQUFxQixPQUFPO0FBQ3hCLFdBQU8sT0FBTyxV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
