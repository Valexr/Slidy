(() => {
  // ../../node_modules/.pnpm/svelte@3.46.4/node_modules/svelte/internal/index.mjs
  function noop() {
  }
  function assign(tar, src) {
    for (const k in src)
      tar[k] = src[k];
    return tar;
  }
  function is_promise(value) {
    return value && typeof value === "object" && typeof value.then === "function";
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
    return typeof thing === "function";
  }
  var src_url_equal_anchor;
  function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
      src_url_equal_anchor = document.createElement("a");
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
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0) {
        return lets;
      }
      if (typeof lets === "object") {
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
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
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
    return value == null ? "" : value;
  }
  function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
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
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element(name2) {
    return document.createElement(name2);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function stop_propagation(fn) {
    return function(event) {
      event.stopPropagation();
      return fn.call(this, event);
    };
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function to_number(value) {
    return value === "" ? null : +value;
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.wholeText !== data)
      text2.data = data;
  }
  function set_input_value(input, value) {
    input.value = value == null ? "" : value;
  }
  function set_style(node, key, value, important) {
    if (value === null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value, important ? "important" : "");
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
    const selected_option = select.querySelector(":checked") || select.options[0];
    return selected_option && selected_option.__value;
  }
  function toggle_class(element2, name2, toggle) {
    element2.classList[toggle ? "add" : "remove"](name2);
  }
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
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
      while (binding_callbacks.length)
        binding_callbacks.pop()();
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
      p: outros
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
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    }
  }
  function handle_promise(promise, info) {
    const token = info.token = {};
    function update2(type, index, key, value) {
      if (info.token !== token)
        return;
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
      if (info.blocks)
        info.blocks[index] = block;
      if (needs_flush) {
        flush();
      }
    }
    if (is_promise(promise)) {
      const current_component2 = get_current_component();
      promise.then((value) => {
        set_current_component(current_component2);
        update2(info.then, 1, info.value, value);
        set_current_component(null);
      }, (error) => {
        set_current_component(current_component2);
        update2(info.catch, 2, info.error, error);
        set_current_component(null);
        if (!info.hasCatch) {
          throw error;
        }
      });
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
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
  function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
      lookup.delete(block.key);
    });
  }
  function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block3, next2, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
      old_indexes[old_blocks[i].key] = i;
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
      new_lookup.set(key, new_blocks[i] = block);
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
      if (!new_lookup.has(old_block.key))
        destroy(old_block, lookup);
    }
    while (n)
      insert2(new_blocks[n - 1]);
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
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance3, create_fragment3, not_equal2, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
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
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance3 ? instance3(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal2($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
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
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
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
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
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
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
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
  var version = "3.0.5";

  // ../core/dist/slidy.mjs
  function onMounted(node) {
    return new Promise((resolve, reject) => {
      let mounting, count = 0;
      clearInterval(mounting);
      mounting = setInterval(() => {
        count++;
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
  function indexing(node, index, loop) {
    if (loop) {
      if (index < 0) {
        return nodes(node).length - 1;
      } else if (index > nodes(node).length - 1) {
        return 0;
      } else
        return index;
    } else
      return maxMin(nodes(node).length - 1, 0, index);
  }
  function coordinate(e, vertical) {
    if (e.type === "wheel") {
      return vertical ? e.deltaY : e.shiftKey ? e.deltaY : e.deltaX;
    } else
      return vertical ? uniQ(e).clientY : uniQ(e).clientX;
  }
  var uniQ = (e) => e.changedTouches ? e.changedTouches[0] : e;
  var cix = (node) => Math.floor(node.children.length / 2);
  var nodes = (node) => Array.from(node.children);
  var child = (node, index) => node.children[index];
  var coord = (vertical) => vertical ? "offsetTop" : "offsetLeft";
  var size = (vertical) => vertical ? "offsetHeight" : "offsetWidth";
  var part = (align) => align === "middle" ? 0.5 : 1;
  var diff = (align, pos) => align !== "start" ? pos : 0;
  var offset = (node, child2, vertical) => node.parentElement[size(vertical)] - child2[size(vertical)];
  var position = (node, child2, vertical, align) => child2[coord(vertical)] - diff(align, offset(node, child2, vertical) * part(align));
  var distance = (node, index, vertical) => Math.abs(nodes(node)[index][coord(vertical)]);
  function closest(node, target, vertical, align) {
    return nodes(node).reduce((prev2, curr, i) => {
      const pos = (child2) => position(node, child2, vertical, align);
      return Math.abs(pos(curr) - target) < Math.abs(pos(prev2) - target) ? curr : prev2;
    });
  }
  var find = {
    index: (node, target, child2, vertical, align) => child2 ? nodes(node).indexOf(child2) : +closest(node, target, vertical, align).dataset.index,
    position: (node, index, vertical, align) => position(node, child(node, index), vertical, align),
    target: (node, target, vertical, align) => position(node, closest(node, target, vertical, align), vertical, align),
    size: (node, index, vertical) => nodes(node)[index][size(vertical)],
    child: (node, index) => nodes(node).find((child2) => +child2.dataset.index === index),
    gap: (node, vertical) => {
      return distance(node, 0, vertical) - distance(node, 1, vertical) - nodes(node)[0][size(vertical)];
    }
  };
  function css(node, styles) {
    for (const property in styles) {
      node.style[property] = styles[property];
    }
  }
  function dispatch(node, name2, detail) {
    node.dispatchEvent(new CustomEvent(name2, { ...detail }));
  }
  function prev(node) {
    const last = node.children[node.children.length - 1];
    node.prepend(last);
  }
  function next(node) {
    const first = node.children[0];
    node.append(first);
  }
  var rotate = (array, key) => array.slice(key).concat(array.slice(0, key));
  function replace(node, index, loop) {
    const replace2 = (nodes2) => node.replaceChildren(...nodes2);
    const elements = loop ? rotate(nodes(node), index - cix(node)) : nodes(node).sort((a, b) => a.dataset.index - b.dataset.index);
    replace2(elements);
  }
  function slidy(node, options) {
    let {
      index = 0,
      gravity = 1.2,
      duration = 375,
      vertical = false,
      clamp = false,
      loop = false,
      snap = false,
      align = "start"
    } = options;
    let raf, rak, velocity = 0, reference = 0, position2 = 0, frame = 0, wheeltime, hip = position2, hix = index, gap = 0;
    const PARENT = node.parentElement;
    const listen2 = (node2, events, on = true) => events.forEach(([event, handle]) => on ? node2.addEventListener(event, handle, true) : node2.removeEventListener(event, handle, true));
    const windowEvents = [
      ["touchmove", onMove],
      ["mousemove", onMove],
      ["touchend", onUp],
      ["mouseup", onUp]
    ];
    const parentEvents = [
      ["contextmenu", clear],
      ["touchstart", onDown],
      ["mousedown", onDown],
      ["keydown", onKeys],
      ["wheel", onWheel],
      ["resize", onResize],
      ["mutate", onMutate]
    ];
    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
      node.dispatchEvent(new CustomEvent("resize"));
    });
    const MO = new MutationObserver(() => {
      node.dispatchEvent(new CustomEvent("mutate"));
    });
    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: true
    };
    onMounted(node).then((childs) => {
      RO.observe(node);
      MO.observe(node, observerOptions);
      const styles = {
        userSelect: "none",
        touchAction: "pan-y",
        willChange: "auto",
        webkitUserSelect: "none"
      };
      css(node, styles);
      gap = find.gap(node, vertical);
      replace(node, index, loop);
      to(index);
      console.log("gap:", gap);
      if (PARENT) {
        css(PARENT, { outline: "none" });
        listen2(PARENT, parentEvents);
      }
      dispatch(node, "mounted", { childs });
    }).catch((error) => console.error(error));
    function move(pos, transition = 0) {
      position2 += loop ? looping(pos) : pos;
      index = find.index(node, position2, void 0, vertical, align);
      const translate = (vertical2) => vertical2 ? `0, ${-position2}px, 0` : `${-position2}px, 0, 0`;
      const styles = {
        transform: `translate3d(${translate(vertical)})`,
        transition: `${transition}ms`
      };
      css(node, styles);
      dispatch(node, "move", { detail: { index, position: position2 } });
    }
    function looping(pos) {
      const delta = hip - pos;
      const first = find.size(node, 0, vertical);
      const last = find.size(node, node.children.length - 1, vertical);
      const history = (size2) => (size2 + gap) * Math.sign(-pos);
      if (hix !== index) {
        pos > 0 ? next(node) : prev(node);
        pos += history(pos > 0 ? first : last);
        frame = position2 + pos + delta;
      }
      hix = index;
      return pos;
    }
    let toing = false;
    function to(index2, target = null) {
      toing = true;
      clear();
      index2 = hix = indexing(node, index2, loop);
      const child2 = find.child(node, index2);
      const ix = loop ? find.index(node, position2, child2, vertical, align) : index2;
      let pos = target ? snap ? find.target(node, target, vertical, align) : target : target === 0 ? 0 : find.position(node, ix, vertical, align);
      move(pos - position2, duration);
    }
    function track(timestamp) {
      RAF(function track2(time) {
        const v = 1e3 * (position2 - frame) / (1 + (time - timestamp));
        velocity = (2 - gravity) * v + maxMin(1, 0, 1 - gravity) * velocity;
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
          raf = Math.abs(delta) > 0.5 ? RAF(scroll2) : 0;
          if (loop && Math.abs(delta) < 5)
            to(index);
        });
      }
    }
    function onDown(e) {
      clear();
      frame = position2;
      reference = coordinate(e, vertical);
      track(performance.now());
      listen2(window, windowEvents);
    }
    function onMove(e) {
      const delta = (reference - coordinate(e, vertical)) * (2 - gravity);
      reference = coordinate(e, vertical);
      move(delta);
    }
    function onUp(e) {
      clear();
      const { target, amplitude } = delting(position2);
      if (Math.abs(amplitude) > 10)
        Math.abs(velocity) < 100 ? to(index) : clamp ? to(index, target) : scroll({
          target,
          amplitude,
          duration,
          timestamp: performance.now()
        });
    }
    function delting(position3) {
      let amplitude = (2 - gravity) * velocity;
      const target = snap ? find.target(node, position3 + amplitude, vertical, align) : position3 + amplitude;
      amplitude = target - position3;
      return { target, amplitude };
    }
    let wheeling = false;
    function onWheel(e) {
      clear();
      wheeling = true;
      (Math.abs(coordinate(e, vertical)) && Math.abs(coordinate(e, vertical)) < 15 || e.shiftKey) && e.preventDefault();
      move(coordinate(e, vertical) * (2 - gravity));
      if (e.shiftKey)
        to(index - Math.sign(e.deltaY));
      else if (snap || clamp)
        wheeltime = setTimeout(() => {
          to(index);
          wheeling = false;
        }, 100);
    }
    function onKeys(e) {
      if (e.key === "ArrowLeft") {
        to(index - 1);
      } else if (e.key === "ArrowRight") {
        to(index + 1);
      }
    }
    function onResize(e) {
      gap = find.gap(node, vertical);
      to(index);
    }
    function onMutate(e) {
    }
    function clear() {
      hix = wheeling ? hix : index;
      clearTimeout(wheeltime);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rak);
      listen2(window, windowEvents, false);
    }
    update2(options);
    function update2(options2) {
      const props = {
        index,
        gravity,
        duration,
        vertical,
        clamp,
        loop,
        snap,
        align
      };
      for (const key in options2) {
        if (key !== options2[key]) {
          console.log(key, options2[key]);
        }
      }
      duration = options2.duration;
      vertical = options2.vertical;
      align = options2.align;
      snap = options2.snap;
      clamp = options2.clamp;
      if (index !== options2.index) {
        index = indexing(node, options2.index, loop);
        to(index);
      }
      if (loop !== options2.loop) {
        loop = options2.loop;
        gap = find.gap(node, vertical);
        replace(node, index, loop);
        to(index);
      }
    }
    function destroy() {
      clear();
      RO.disconnect();
      MO.disconnect();
      listen2(PARENT, parentEvents, false);
    }
    return { update: update2, destroy, to };
  }

  // src/Slidy.svelte
  var get_dots_arrow_right_slot_changes_1 = (dirty) => ({ item: dirty & 768 });
  var get_dots_arrow_right_slot_context_1 = (ctx) => ({ item: ctx[25] });
  var get_dots_arrow_right_slot_changes = (dirty) => ({ item: dirty & 768 });
  var get_dots_arrow_right_slot_context = (ctx) => ({ item: ctx[25] });
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[22] = list[i];
    child_ctx[24] = i;
    return child_ctx;
  }
  var get_dot_slot_changes = (dirty) => ({
    dot: dirty & 768,
    item: dirty & 768
  });
  var get_dot_slot_context = (ctx) => ({
    dot: ctx[22],
    item: ctx[25]
  });
  var get_dots_arrow_left_slot_changes_1 = (dirty) => ({ item: dirty & 768 });
  var get_dots_arrow_left_slot_context_1 = (ctx) => ({ item: ctx[25] });
  var get_dots_arrow_left_slot_changes = (dirty) => ({ item: dirty & 768 });
  var get_dots_arrow_left_slot_context = (ctx) => ({ item: ctx[25] });
  var get_arrow_right_slot_changes_1 = (dirty) => ({ item: dirty & 768 });
  var get_arrow_right_slot_context_1 = (ctx) => ({ item: ctx[25] });
  var get_arrow_left_slot_changes_1 = (dirty) => ({ item: dirty & 768 });
  var get_arrow_left_slot_context_1 = (ctx) => ({ item: ctx[25] });
  var get_arrow_right_slot_changes = (dirty) => ({ item: dirty & 768 });
  var get_arrow_right_slot_context = (ctx) => ({ item: ctx[25] });
  var get_arrow_left_slot_changes = (dirty) => ({ item: dirty & 768 });
  var get_arrow_left_slot_context = (ctx) => ({ item: ctx[25] });
  function get_each_context_1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[25] = list[i];
    child_ctx[24] = i;
    return child_ctx;
  }
  var get_default_slot_changes = (dirty) => ({ item: dirty & 768 });
  var get_default_slot_context = (ctx) => ({ item: ctx[25] });
  var get_loader_slot_changes = (dirty) => ({ item: dirty & 768 });
  var get_loader_slot_context = (ctx) => ({ item: ctx[25] });
  function create_catch_block(ctx) {
    return {
      c: noop,
      m: noop,
      p: noop,
      i: noop,
      o: noop,
      d: noop
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
    const get_key = (ctx2) => ctx2[2](ctx2[25]);
    for (let i = 0; i < each_value_1.length; i += 1) {
      let child_ctx = get_each_context_1(ctx, each_value_1, i);
      let key = get_key(child_ctx);
      each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
    }
    let if_block1 = ctx[5].arrows && ctx[7] && create_if_block_7(ctx);
    let if_block2 = ctx[5].dots && ctx[7] && create_if_block(ctx);
    return {
      c() {
        if (if_block0)
          if_block0.c();
        t0 = space();
        ul = element("ul");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t1 = space();
        if (if_block1)
          if_block1.c();
        t2 = space();
        if (if_block2)
          if_block2.c();
        if_block2_anchor = empty();
        attr(ul, "class", "slidy-ul svelte-1q6igjy");
      },
      m(target, anchor) {
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t0, anchor);
        insert(target, ul, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(ul, null);
        }
        insert(target, t1, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, t2, anchor);
        if (if_block2)
          if_block2.m(target, anchor);
        insert(target, if_block2_anchor, anchor);
        current = true;
        if (!mounted) {
          dispose = [
            action_destroyer(slidy_action = slidy.call(null, ul, {
              index: ctx[0],
              vertical: ctx[6].vertical,
              align: ctx[3].align,
              duration: ctx[6].duration,
              clamp: ctx[6].clamp,
              gravity: ctx[6].gravity,
              snap: ctx[6].snap,
              loop: ctx[6].loop
            })),
            listen(ul, "move", ctx[12])
          ];
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
        if (dirty & 1813) {
          each_value_1 = ctx2[9];
          group_outros();
          each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value_1, each_1_lookup, ul, outro_and_destroy_block, create_each_block_1, null, get_each_context_1);
          check_outros();
        }
        if (slidy_action && is_function(slidy_action.update) && dirty & 73)
          slidy_action.update.call(null, {
            index: ctx2[0],
            vertical: ctx2[6].vertical,
            align: ctx2[3].align,
            duration: ctx2[6].duration,
            clamp: ctx2[6].clamp,
            gravity: ctx2[6].gravity,
            snap: ctx2[6].snap,
            loop: ctx2[6].loop
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
            if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
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
        if (current)
          return;
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
        if (if_block0)
          if_block0.d(detaching);
        if (detaching)
          detach(t0);
        if (detaching)
          detach(ul);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].d();
        }
        if (detaching)
          detach(t1);
        if (if_block1)
          if_block1.d(detaching);
        if (detaching)
          detach(t2);
        if (if_block2)
          if_block2.d(detaching);
        if (detaching)
          detach(if_block2_anchor);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_12(ctx) {
    let section;
    let current;
    const loader_slot_template = ctx[11].loader;
    const loader_slot = create_slot(loader_slot_template, ctx, ctx[10], get_loader_slot_context);
    const loader_slot_or_fallback = loader_slot || fallback_block_10(ctx);
    return {
      c() {
        section = element("section");
        if (loader_slot_or_fallback)
          loader_slot_or_fallback.c();
        attr(section, "id", "loader");
        attr(section, "class", "svelte-1q6igjy");
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
          if (loader_slot.p && (!current || dirty & 1792)) {
            update_slot_base(loader_slot, loader_slot_template, ctx2, ctx2[10], !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(loader_slot_template, ctx2[10], dirty, get_loader_slot_changes), get_loader_slot_context);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(loader_slot_or_fallback, local);
        current = true;
      },
      o(local) {
        transition_out(loader_slot_or_fallback, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(section);
        if (loader_slot_or_fallback)
          loader_slot_or_fallback.d(detaching);
      }
    };
  }
  function fallback_block_10(ctx) {
    let t;
    return {
      c() {
        t = text("Loading...");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
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
        img = element("img");
        attr(img, "alt", img_alt_value = ctx[25][ctx[4].imgsrckey]);
        if (!src_url_equal(img.src, img_src_value = ctx[25][ctx[4].imgsrckey]))
          attr(img, "src", img_src_value);
        attr(img, "width", img_width_value = ctx[25].width);
        attr(img, "height", img_height_value = ctx[25].height);
      },
      m(target, anchor) {
        insert(target, img, anchor);
      },
      p(ctx2, dirty) {
        if (dirty & 784 && img_alt_value !== (img_alt_value = ctx2[25][ctx2[4].imgsrckey])) {
          attr(img, "alt", img_alt_value);
        }
        if (dirty & 784 && !src_url_equal(img.src, img_src_value = ctx2[25][ctx2[4].imgsrckey])) {
          attr(img, "src", img_src_value);
        }
        if (dirty & 768 && img_width_value !== (img_width_value = ctx2[25].width)) {
          attr(img, "width", img_width_value);
        }
        if (dirty & 768 && img_height_value !== (img_height_value = ctx2[25].height)) {
          attr(img, "height", img_height_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(img);
      }
    };
  }
  function fallback_block_9(ctx) {
    let if_block_anchor;
    let if_block = !ctx[4].backimg && create_if_block_11(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
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
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_each_block_1(key_2, ctx) {
    let li;
    let t;
    let li_data_id_value;
    let li_class_value;
    let li_style_value;
    let current;
    const default_slot_template = ctx[11].default;
    const default_slot = create_slot(default_slot_template, ctx, ctx[10], get_default_slot_context);
    const default_slot_or_fallback = default_slot || fallback_block_9(ctx);
    return {
      key: key_2,
      first: null,
      c() {
        li = element("li");
        if (default_slot_or_fallback)
          default_slot_or_fallback.c();
        t = space();
        attr(li, "data-id", li_data_id_value = ctx[25].ix);
        attr(li, "class", li_class_value = null_to_empty(ctx[4].class) + " svelte-1q6igjy");
        attr(li, "style", li_style_value = ctx[4].backimg === true ? `background-image: url(${ctx[25][ctx[4].imgsrckey]})` : null);
        toggle_class(li, "active", ctx[25].ix === ctx[0]);
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
          if (default_slot.p && (!current || dirty & 1792)) {
            update_slot_base(default_slot, default_slot_template, ctx, ctx[10], !current ? get_all_dirty_from_scope(ctx[10]) : get_slot_changes(default_slot_template, ctx[10], dirty, get_default_slot_changes), get_default_slot_context);
          }
        } else {
          if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & 784)) {
            default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
          }
        }
        if (!current || dirty & 768 && li_data_id_value !== (li_data_id_value = ctx[25].ix)) {
          attr(li, "data-id", li_data_id_value);
        }
        if (!current || dirty & 16 && li_class_value !== (li_class_value = null_to_empty(ctx[4].class) + " svelte-1q6igjy")) {
          attr(li, "class", li_class_value);
        }
        if (!current || dirty & 784 && li_style_value !== (li_style_value = ctx[4].backimg === true ? `background-image: url(${ctx[25][ctx[4].imgsrckey]})` : null)) {
          attr(li, "style", li_style_value);
        }
        if (dirty & 785) {
          toggle_class(li, "active", ctx[25].ix === ctx[0]);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot_or_fallback, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot_or_fallback, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(li);
        if (default_slot_or_fallback)
          default_slot_or_fallback.d(detaching);
      }
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
      if (!ctx2[6].loop)
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
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
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if_blocks[current_block_type_index].d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_else_block_2(ctx) {
    let button0;
    let t;
    let button1;
    let current;
    let mounted;
    let dispose;
    const arrow_left_slot_template = ctx[11]["arrow-left"];
    const arrow_left_slot = create_slot(arrow_left_slot_template, ctx, ctx[10], get_arrow_left_slot_context_1);
    const arrow_left_slot_or_fallback = arrow_left_slot || fallback_block_8(ctx);
    const arrow_right_slot_template = ctx[11]["arrow-right"];
    const arrow_right_slot = create_slot(arrow_right_slot_template, ctx, ctx[10], get_arrow_right_slot_context_1);
    const arrow_right_slot_or_fallback = arrow_right_slot || fallback_block_7(ctx);
    return {
      c() {
        button0 = element("button");
        if (arrow_left_slot_or_fallback)
          arrow_left_slot_or_fallback.c();
        t = space();
        button1 = element("button");
        if (arrow_right_slot_or_fallback)
          arrow_right_slot_or_fallback.c();
        attr(button0, "class", "arrow-left svelte-1q6igjy");
        attr(button1, "class", "arrow-right svelte-1q6igjy");
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
            listen(button0, "click", ctx[15]),
            listen(button1, "click", ctx[16])
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (arrow_left_slot) {
          if (arrow_left_slot.p && (!current || dirty & 1792)) {
            update_slot_base(arrow_left_slot, arrow_left_slot_template, ctx2, ctx2[10], !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(arrow_left_slot_template, ctx2[10], dirty, get_arrow_left_slot_changes_1), get_arrow_left_slot_context_1);
          }
        }
        if (arrow_right_slot) {
          if (arrow_right_slot.p && (!current || dirty & 1792)) {
            update_slot_base(arrow_right_slot, arrow_right_slot_template, ctx2, ctx2[10], !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(arrow_right_slot_template, ctx2[10], dirty, get_arrow_right_slot_changes_1), get_arrow_right_slot_context_1);
          }
        }
      },
      i(local) {
        if (current)
          return;
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
        if (detaching)
          detach(button0);
        if (arrow_left_slot_or_fallback)
          arrow_left_slot_or_fallback.d(detaching);
        if (detaching)
          detach(t);
        if (detaching)
          detach(button1);
        if (arrow_right_slot_or_fallback)
          arrow_right_slot_or_fallback.d(detaching);
        mounted = false;
        run_all(dispose);
      }
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
        if (if_block0)
          if_block0.c();
        t = space();
        if (if_block1)
          if_block1.c();
        if_block1_anchor = empty();
      },
      m(target, anchor) {
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
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
            if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
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
        if (current)
          return;
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
        if (if_block0)
          if_block0.d(detaching);
        if (detaching)
          detach(t);
        if (if_block1)
          if_block1.d(detaching);
        if (detaching)
          detach(if_block1_anchor);
      }
    };
  }
  function fallback_block_8(ctx) {
    let t;
    return {
      c() {
        t = text("\u2190");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function fallback_block_7(ctx) {
    let t;
    return {
      c() {
        t = text("\u2192");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_if_block_10(ctx) {
    let button;
    let current;
    let mounted;
    let dispose;
    const arrow_left_slot_template = ctx[11]["arrow-left"];
    const arrow_left_slot = create_slot(arrow_left_slot_template, ctx, ctx[10], get_arrow_left_slot_context);
    const arrow_left_slot_or_fallback = arrow_left_slot || fallback_block_6(ctx);
    return {
      c() {
        button = element("button");
        if (arrow_left_slot_or_fallback)
          arrow_left_slot_or_fallback.c();
        attr(button, "class", "arrow-left svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (arrow_left_slot_or_fallback) {
          arrow_left_slot_or_fallback.m(button, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(button, "click", ctx[13]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (arrow_left_slot) {
          if (arrow_left_slot.p && (!current || dirty & 1792)) {
            update_slot_base(arrow_left_slot, arrow_left_slot_template, ctx2, ctx2[10], !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(arrow_left_slot_template, ctx2[10], dirty, get_arrow_left_slot_changes), get_arrow_left_slot_context);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(arrow_left_slot_or_fallback, local);
        current = true;
      },
      o(local) {
        transition_out(arrow_left_slot_or_fallback, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(button);
        if (arrow_left_slot_or_fallback)
          arrow_left_slot_or_fallback.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function fallback_block_6(ctx) {
    let t;
    return {
      c() {
        t = text("\u2190");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_if_block_9(ctx) {
    let button;
    let current;
    let mounted;
    let dispose;
    const arrow_right_slot_template = ctx[11]["arrow-right"];
    const arrow_right_slot = create_slot(arrow_right_slot_template, ctx, ctx[10], get_arrow_right_slot_context);
    const arrow_right_slot_or_fallback = arrow_right_slot || fallback_block_5(ctx);
    return {
      c() {
        button = element("button");
        if (arrow_right_slot_or_fallback)
          arrow_right_slot_or_fallback.c();
        attr(button, "class", "arrow-right svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (arrow_right_slot_or_fallback) {
          arrow_right_slot_or_fallback.m(button, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(button, "click", ctx[14]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (arrow_right_slot) {
          if (arrow_right_slot.p && (!current || dirty & 1792)) {
            update_slot_base(arrow_right_slot, arrow_right_slot_template, ctx2, ctx2[10], !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(arrow_right_slot_template, ctx2[10], dirty, get_arrow_right_slot_changes), get_arrow_right_slot_context);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(arrow_right_slot_or_fallback, local);
        current = true;
      },
      o(local) {
        transition_out(arrow_right_slot_or_fallback, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(button);
        if (arrow_right_slot_or_fallback)
          arrow_right_slot_or_fallback.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function fallback_block_5(ctx) {
    let t;
    return {
      c() {
        t = text("\u2192");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
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
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    let if_block1 = ctx[5].dotsarrow && create_if_block_1(ctx);
    return {
      c() {
        ul = element("ul");
        if (if_block0)
          if_block0.c();
        t0 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t1 = space();
        if (if_block1)
          if_block1.c();
        attr(ul, "class", "slidy-dots svelte-1q6igjy");
        toggle_class(ul, "pure", ctx[5].dotspure);
      },
      m(target, anchor) {
        insert(target, ul, anchor);
        if (if_block0)
          if_block0.m(ul, null);
        append(ul, t0);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(ul, null);
        }
        append(ul, t1);
        if (if_block1)
          if_block1.m(ul, null);
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
        if (dirty & 1825) {
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
          for (i = each_value.length; i < each_blocks.length; i += 1) {
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
          toggle_class(ul, "pure", ctx2[5].dotspure);
        }
      },
      i(local) {
        if (current)
          return;
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
        if (detaching)
          detach(ul);
        if (if_block0)
          if_block0.d();
        destroy_each(each_blocks, detaching);
        if (if_block1)
          if_block1.d();
      }
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
      if (!ctx2[6].loop)
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type_1(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
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
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if_blocks[current_block_type_index].d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_else_block_1(ctx) {
    let li;
    let current;
    let mounted;
    let dispose;
    const dots_arrow_left_slot_template = ctx[11]["dots-arrow-left"];
    const dots_arrow_left_slot = create_slot(dots_arrow_left_slot_template, ctx, ctx[10], get_dots_arrow_left_slot_context_1);
    const dots_arrow_left_slot_or_fallback = dots_arrow_left_slot || fallback_block_4(ctx);
    return {
      c() {
        li = element("li");
        if (dots_arrow_left_slot_or_fallback)
          dots_arrow_left_slot_or_fallback.c();
        attr(li, "class", "dots-arrow-left svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, li, anchor);
        if (dots_arrow_left_slot_or_fallback) {
          dots_arrow_left_slot_or_fallback.m(li, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(li, "click", ctx[18]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dots_arrow_left_slot) {
          if (dots_arrow_left_slot.p && (!current || dirty & 1792)) {
            update_slot_base(dots_arrow_left_slot, dots_arrow_left_slot_template, ctx2, ctx2[10], !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(dots_arrow_left_slot_template, ctx2[10], dirty, get_dots_arrow_left_slot_changes_1), get_dots_arrow_left_slot_context_1);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(dots_arrow_left_slot_or_fallback, local);
        current = true;
      },
      o(local) {
        transition_out(dots_arrow_left_slot_or_fallback, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(li);
        if (dots_arrow_left_slot_or_fallback)
          dots_arrow_left_slot_or_fallback.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_5(ctx) {
    let if_block_anchor;
    let current;
    let if_block = ctx[0] > 0 && create_if_block_6(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
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
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function fallback_block_4(ctx) {
    let button;
    return {
      c() {
        button = element("button");
        button.textContent = "\u2190";
        attr(button, "class", "svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, button, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(button);
      }
    };
  }
  function create_if_block_6(ctx) {
    let li;
    let current;
    let mounted;
    let dispose;
    const dots_arrow_left_slot_template = ctx[11]["dots-arrow-left"];
    const dots_arrow_left_slot = create_slot(dots_arrow_left_slot_template, ctx, ctx[10], get_dots_arrow_left_slot_context);
    const dots_arrow_left_slot_or_fallback = dots_arrow_left_slot || fallback_block_3(ctx);
    return {
      c() {
        li = element("li");
        if (dots_arrow_left_slot_or_fallback)
          dots_arrow_left_slot_or_fallback.c();
        attr(li, "class", "dots-arrow-left svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, li, anchor);
        if (dots_arrow_left_slot_or_fallback) {
          dots_arrow_left_slot_or_fallback.m(li, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(li, "click", ctx[17]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dots_arrow_left_slot) {
          if (dots_arrow_left_slot.p && (!current || dirty & 1792)) {
            update_slot_base(dots_arrow_left_slot, dots_arrow_left_slot_template, ctx2, ctx2[10], !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(dots_arrow_left_slot_template, ctx2[10], dirty, get_dots_arrow_left_slot_changes), get_dots_arrow_left_slot_context);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(dots_arrow_left_slot_or_fallback, local);
        current = true;
      },
      o(local) {
        transition_out(dots_arrow_left_slot_or_fallback, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(li);
        if (dots_arrow_left_slot_or_fallback)
          dots_arrow_left_slot_or_fallback.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function fallback_block_3(ctx) {
    let button;
    return {
      c() {
        button = element("button");
        button.textContent = "\u2190";
        attr(button, "class", "svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, button, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(button);
      }
    };
  }
  function fallback_block_2(ctx) {
    let button;
    let t_value = (ctx[5].dotsnum && !ctx[5].dotspure ? ctx[24] : "") + "";
    let t;
    return {
      c() {
        button = element("button");
        t = text(t_value);
        attr(button, "class", "svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        append(button, t);
      },
      p(ctx2, dirty) {
        if (dirty & 32 && t_value !== (t_value = (ctx2[5].dotsnum && !ctx2[5].dotspure ? ctx2[24] : "") + ""))
          set_data(t, t_value);
      },
      d(detaching) {
        if (detaching)
          detach(button);
      }
    };
  }
  function create_each_block(ctx) {
    let li;
    let current;
    let mounted;
    let dispose;
    const dot_slot_template = ctx[11].dot;
    const dot_slot = create_slot(dot_slot_template, ctx, ctx[10], get_dot_slot_context);
    const dot_slot_or_fallback = dot_slot || fallback_block_2(ctx);
    function click_handler_6() {
      return ctx[19](ctx[24]);
    }
    return {
      c() {
        li = element("li");
        if (dot_slot_or_fallback)
          dot_slot_or_fallback.c();
        attr(li, "class", "svelte-1q6igjy");
        toggle_class(li, "active", ctx[24] === ctx[0]);
      },
      m(target, anchor) {
        insert(target, li, anchor);
        if (dot_slot_or_fallback) {
          dot_slot_or_fallback.m(li, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(li, "click", stop_propagation(click_handler_6));
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dot_slot) {
          if (dot_slot.p && (!current || dirty & 1792)) {
            update_slot_base(dot_slot, dot_slot_template, ctx, ctx[10], !current ? get_all_dirty_from_scope(ctx[10]) : get_slot_changes(dot_slot_template, ctx[10], dirty, get_dot_slot_changes), get_dot_slot_context);
          }
        } else {
          if (dot_slot_or_fallback && dot_slot_or_fallback.p && (!current || dirty & 32)) {
            dot_slot_or_fallback.p(ctx, !current ? -1 : dirty);
          }
        }
        if (dirty & 1) {
          toggle_class(li, "active", ctx[24] === ctx[0]);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(dot_slot_or_fallback, local);
        current = true;
      },
      o(local) {
        transition_out(dot_slot_or_fallback, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(li);
        if (dot_slot_or_fallback)
          dot_slot_or_fallback.d(detaching);
        mounted = false;
        dispose();
      }
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
      if (!ctx2[6].loop)
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type_2(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
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
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if_blocks[current_block_type_index].d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_else_block(ctx) {
    let li;
    let current;
    let mounted;
    let dispose;
    const dots_arrow_right_slot_template = ctx[11]["dots-arrow-right"];
    const dots_arrow_right_slot = create_slot(dots_arrow_right_slot_template, ctx, ctx[10], get_dots_arrow_right_slot_context_1);
    const dots_arrow_right_slot_or_fallback = dots_arrow_right_slot || fallback_block_1(ctx);
    return {
      c() {
        li = element("li");
        if (dots_arrow_right_slot_or_fallback)
          dots_arrow_right_slot_or_fallback.c();
        attr(li, "class", "dots-arrow-right svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, li, anchor);
        if (dots_arrow_right_slot_or_fallback) {
          dots_arrow_right_slot_or_fallback.m(li, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(li, "click", ctx[21]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dots_arrow_right_slot) {
          if (dots_arrow_right_slot.p && (!current || dirty & 1792)) {
            update_slot_base(dots_arrow_right_slot, dots_arrow_right_slot_template, ctx2, ctx2[10], !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(dots_arrow_right_slot_template, ctx2[10], dirty, get_dots_arrow_right_slot_changes_1), get_dots_arrow_right_slot_context_1);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(dots_arrow_right_slot_or_fallback, local);
        current = true;
      },
      o(local) {
        transition_out(dots_arrow_right_slot_or_fallback, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(li);
        if (dots_arrow_right_slot_or_fallback)
          dots_arrow_right_slot_or_fallback.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_2(ctx) {
    let if_block_anchor;
    let current;
    let if_block = ctx[0] < ctx[9].length - 1 && create_if_block_3(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
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
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function fallback_block_1(ctx) {
    let button;
    return {
      c() {
        button = element("button");
        button.textContent = "\u2192";
        attr(button, "class", "svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, button, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(button);
      }
    };
  }
  function create_if_block_3(ctx) {
    let li;
    let current;
    let mounted;
    let dispose;
    const dots_arrow_right_slot_template = ctx[11]["dots-arrow-right"];
    const dots_arrow_right_slot = create_slot(dots_arrow_right_slot_template, ctx, ctx[10], get_dots_arrow_right_slot_context);
    const dots_arrow_right_slot_or_fallback = dots_arrow_right_slot || fallback_block(ctx);
    return {
      c() {
        li = element("li");
        if (dots_arrow_right_slot_or_fallback)
          dots_arrow_right_slot_or_fallback.c();
        attr(li, "class", "dots-arrow-right svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, li, anchor);
        if (dots_arrow_right_slot_or_fallback) {
          dots_arrow_right_slot_or_fallback.m(li, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(li, "click", ctx[20]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dots_arrow_right_slot) {
          if (dots_arrow_right_slot.p && (!current || dirty & 1792)) {
            update_slot_base(dots_arrow_right_slot, dots_arrow_right_slot_template, ctx2, ctx2[10], !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(dots_arrow_right_slot_template, ctx2[10], dirty, get_dots_arrow_right_slot_changes), get_dots_arrow_right_slot_context);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(dots_arrow_right_slot_or_fallback, local);
        current = true;
      },
      o(local) {
        transition_out(dots_arrow_right_slot_or_fallback, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(li);
        if (dots_arrow_right_slot_or_fallback)
          dots_arrow_right_slot_or_fallback.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function fallback_block(ctx) {
    let button;
    return {
      c() {
        button = element("button");
        button.textContent = "\u2192";
        attr(button, "class", "svelte-1q6igjy");
      },
      m(target, anchor) {
        insert(target, button, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(button);
      }
    };
  }
  function create_pending_block(ctx) {
    return {
      c: noop,
      m: noop,
      p: noop,
      i: noop,
      o: noop,
      d: noop
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
      blocks: [, , ,]
    };
    handle_promise(promise = slidyInit(ctx[9], ctx[8]), info);
    return {
      c() {
        section = element("section");
        info.block.c();
        attr(section, "tabindex", "0");
        attr(section, "aria-label", "Slidy");
        attr(section, "id", section_id_value = ctx[3].id);
        attr(section, "class", "slidy svelte-1q6igjy");
        set_style(section, "--wrapw", ctx[3].width);
        set_style(section, "--wraph", ctx[3].height);
        set_style(section, "--wrapp", ctx[3].padding);
        set_style(section, "--slidew", ctx[4].width);
        set_style(section, "--slideh", ctx[4].height);
        set_style(section, "--slidef", ctx[4].objectfit);
        set_style(section, "--slideo", ctx[4].overflow);
        set_style(section, "--slideg", ctx[6].vertical ? `${ctx[4].gap}px 0 0 0` : `0 0 0 ${ctx[4].gap}px`);
        set_style(section, "--dur", ctx[6].duration + "ms");
        toggle_class(section, "loaded", ctx[7]);
        toggle_class(section, "vertical", ctx[6].vertical);
        toggle_class(section, "autowidth", ctx[4].width === "auto");
        toggle_class(section, "antiloop", ctx[6].loop === false);
        toggle_class(section, "alignmiddle", ctx[3].align === "middle");
        toggle_class(section, "alignstart", ctx[3].align === "start");
        toggle_class(section, "alignend", ctx[3].align === "end");
      },
      m(target, anchor) {
        insert(target, section, anchor);
        info.block.m(section, info.anchor = null);
        info.mount = () => section;
        info.anchor = null;
        current = true;
      },
      p(new_ctx, [dirty]) {
        ctx = new_ctx;
        info.ctx = ctx;
        if (dirty & 768 && promise !== (promise = slidyInit(ctx[9], ctx[8])) && handle_promise(promise, info)) {
        } else {
          update_await_block_branch(info, ctx, dirty);
        }
        if (!current || dirty & 8 && section_id_value !== (section_id_value = ctx[3].id)) {
          attr(section, "id", section_id_value);
        }
        if (!current || dirty & 8) {
          set_style(section, "--wrapw", ctx[3].width);
        }
        if (!current || dirty & 8) {
          set_style(section, "--wraph", ctx[3].height);
        }
        if (!current || dirty & 8) {
          set_style(section, "--wrapp", ctx[3].padding);
        }
        if (!current || dirty & 16) {
          set_style(section, "--slidew", ctx[4].width);
        }
        if (!current || dirty & 16) {
          set_style(section, "--slideh", ctx[4].height);
        }
        if (!current || dirty & 16) {
          set_style(section, "--slidef", ctx[4].objectfit);
        }
        if (!current || dirty & 16) {
          set_style(section, "--slideo", ctx[4].overflow);
        }
        if (!current || dirty & 80) {
          set_style(section, "--slideg", ctx[6].vertical ? `${ctx[4].gap}px 0 0 0` : `0 0 0 ${ctx[4].gap}px`);
        }
        if (!current || dirty & 64) {
          set_style(section, "--dur", ctx[6].duration + "ms");
        }
        if (dirty & 128) {
          toggle_class(section, "loaded", ctx[7]);
        }
        if (dirty & 64) {
          toggle_class(section, "vertical", ctx[6].vertical);
        }
        if (dirty & 16) {
          toggle_class(section, "autowidth", ctx[4].width === "auto");
        }
        if (dirty & 64) {
          toggle_class(section, "antiloop", ctx[6].loop === false);
        }
        if (dirty & 8) {
          toggle_class(section, "alignmiddle", ctx[3].align === "middle");
        }
        if (dirty & 8) {
          toggle_class(section, "alignstart", ctx[3].align === "start");
        }
        if (dirty & 8) {
          toggle_class(section, "alignend", ctx[3].align === "end");
        }
      },
      i(local) {
        if (current)
          return;
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
        if (detaching)
          detach(section);
        info.block.d();
        info.token = null;
        info = null;
      }
    };
  }
  async function slidyInit(slides, timeout = 0, init2 = false) {
    slides = slides.map((s, i) => ({ ix: i, ...s }));
    timeout > 0 ? setTimeout(() => init2 = true, timeout) : init2 = init2;
    return slides;
  }
  function instance($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { slides = [], key = (item) => item.id || item[slide.imgsrckey], wrap = {
      id: null,
      width: "100%",
      height: "50%",
      padding: "0",
      align: "middle",
      alignmargin: 0
    }, slide = {
      gap: 0,
      class: "",
      width: "50%",
      height: "100%",
      backimg: false,
      imgsrckey: "src",
      objectfit: "cover",
      overflow: "hidden"
    }, controls = {
      dots: true,
      dotsnum: true,
      dotsarrow: true,
      dotspure: false,
      arrows: true,
      keys: true,
      drag: true,
      wheel: true
    }, options = {
      vertical: false,
      loop: false,
      duration: 375,
      clamp: false,
      snap: true,
      gravity: 1.2
    }, index = 4, init: init2 = true, timeout = 0, position: position2 = 0 } = $$props;
    const move_handler = (e) => {
      $$invalidate(0, index = e.detail.index);
      $$invalidate(1, position2 = e.detail.position);
    };
    const click_handler = () => $$invalidate(0, index--, index);
    const click_handler_1 = () => $$invalidate(0, index++, index);
    const click_handler_2 = () => $$invalidate(0, index--, index);
    const click_handler_3 = () => $$invalidate(0, index++, index);
    const click_handler_4 = () => $$invalidate(0, index--, index);
    const click_handler_5 = () => $$invalidate(0, index--, index);
    const click_handler_6 = (i) => $$invalidate(0, index = i);
    const click_handler_7 = () => $$invalidate(0, index++, index);
    const click_handler_8 = () => $$invalidate(0, index++, index);
    $$self.$$set = ($$props2) => {
      if ("slides" in $$props2)
        $$invalidate(9, slides = $$props2.slides);
      if ("key" in $$props2)
        $$invalidate(2, key = $$props2.key);
      if ("wrap" in $$props2)
        $$invalidate(3, wrap = $$props2.wrap);
      if ("slide" in $$props2)
        $$invalidate(4, slide = $$props2.slide);
      if ("controls" in $$props2)
        $$invalidate(5, controls = $$props2.controls);
      if ("options" in $$props2)
        $$invalidate(6, options = $$props2.options);
      if ("index" in $$props2)
        $$invalidate(0, index = $$props2.index);
      if ("init" in $$props2)
        $$invalidate(7, init2 = $$props2.init);
      if ("timeout" in $$props2)
        $$invalidate(8, timeout = $$props2.timeout);
      if ("position" in $$props2)
        $$invalidate(1, position2 = $$props2.position);
      if ("$$scope" in $$props2)
        $$invalidate(10, $$scope = $$props2.$$scope);
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
      $$scope,
      slots,
      move_handler,
      click_handler,
      click_handler_1,
      click_handler_2,
      click_handler_3,
      click_handler_4,
      click_handler_5,
      click_handler_6,
      click_handler_7,
      click_handler_8
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
        position: 1
      });
    }
  };
  var Slidy_default = Slidy;

  // dev/src/scripts/api.ts
  async function getPhotos(limit, page, width = 1280, height = 800) {
    const res = await fetch(`https://picsum.photos/v2/list?limit=${limit}&page=${page}`, {
      mode: "cors",
      headers: {}
    }).then((res2) => res2.json());
    return res.map((item) => {
      let aspect = aspectQ(item.width, item.height, width, height);
      let data = {
        ...item,
        src: `https://picsum.photos/id/${item.id}/${aspect.width}/${aspect.height}.jpg`,
        width: aspect.width,
        height: aspect.height
      };
      return data;
    });
  }
  function aspectQ(srcWidth, srcHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
      width: Math.round(srcWidth * ratio),
      height: Math.round(srcHeight * ratio)
    };
  }
  var randomQ = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // dev/src/App.svelte
  function get_each_context2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[38] = list[i];
    child_ctx[40] = i;
    return child_ctx;
  }
  function create_catch_block2(ctx) {
    return {
      c: noop,
      m: noop,
      p: noop,
      i: noop,
      o: noop,
      d: noop
    };
  }
  function create_then_block2(ctx) {
    let slidy2;
    let updating_index;
    let updating_position;
    let current;
    function slidy_index_binding(value) {
      ctx[22](value);
    }
    function slidy_position_binding(value) {
      ctx[23](value);
    }
    let slidy_props = {
      slides: ctx[16],
      wrap: {
        id: null,
        width: "100%",
        height: "100%",
        padding: "0",
        align: ctx[6],
        alignmargin: 0
      },
      slide: {
        gap: ctx[14],
        class: "",
        width: ctx[10],
        height: "100%",
        backimg: false,
        imgsrckey: "src",
        objectfit: "cover",
        overflow: "hidden"
      },
      controls: {
        dots: true,
        dotsnum: true,
        dotsarrow: true,
        dotspure: true,
        arrows: true,
        keys: true,
        drag: true,
        wheel: true
      },
      options: {
        vertical: ctx[4],
        loop: ctx[13],
        duration: ctx[7],
        clamp: ctx[5],
        snap: ctx[11],
        gravity: ctx[9]
      },
      $$slots: {
        default: [
          create_default_slot,
          ({ item }) => ({ 41: item }),
          ({ item }) => [0, item ? 1024 : 0]
        ]
      },
      $$scope: { ctx }
    };
    if (ctx[3] !== void 0) {
      slidy_props.index = ctx[3];
    }
    if (ctx[0] !== void 0) {
      slidy_props.position = ctx[0];
    }
    slidy2 = new Slidy_default({ props: slidy_props });
    binding_callbacks.push(() => bind(slidy2, "index", slidy_index_binding));
    binding_callbacks.push(() => bind(slidy2, "position", slidy_position_binding));
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
        if (dirty[0] & 6)
          slidy_changes.slides = ctx2[16];
        if (dirty[0] & 64)
          slidy_changes.wrap = {
            id: null,
            width: "100%",
            height: "100%",
            padding: "0",
            align: ctx2[6],
            alignmargin: 0
          };
        if (dirty[0] & 17408)
          slidy_changes.slide = {
            gap: ctx2[14],
            class: "",
            width: ctx2[10],
            height: "100%",
            backimg: false,
            imgsrckey: "src",
            objectfit: "cover",
            overflow: "hidden"
          };
        if (dirty[0] & 10928)
          slidy_changes.options = {
            vertical: ctx2[4],
            loop: ctx2[13],
            duration: ctx2[7],
            clamp: ctx2[5],
            snap: ctx2[11],
            gravity: ctx2[9]
          };
        if (dirty[0] & 4096 | dirty[1] & 3072) {
          slidy_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_index && dirty[0] & 8) {
          updating_index = true;
          slidy_changes.index = ctx2[3];
          add_flush_callback(() => updating_index = false);
        }
        if (!updating_position && dirty[0] & 1) {
          updating_position = true;
          slidy_changes.position = ctx2[0];
          add_flush_callback(() => updating_position = false);
        }
        slidy2.$set(slidy_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(slidy2.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(slidy2.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(slidy2, detaching);
      }
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
        img = element("img");
        if (!src_url_equal(img.src, img_src_value = ctx[41].src))
          attr(img, "src", img_src_value);
        attr(img, "alt", img_alt_value = ctx[41].ix);
        attr(img, "width", img_width_value = ctx[41].width);
        attr(img, "height", img_height_value = ctx[41].height);
      },
      m(target, anchor) {
        insert(target, img, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[1] & 1024 && !src_url_equal(img.src, img_src_value = ctx2[41].src)) {
          attr(img, "src", img_src_value);
        }
        if (dirty[1] & 1024 && img_alt_value !== (img_alt_value = ctx2[41].ix)) {
          attr(img, "alt", img_alt_value);
        }
        if (dirty[1] & 1024 && img_width_value !== (img_width_value = ctx2[41].width)) {
          attr(img, "width", img_width_value);
        }
        if (dirty[1] & 1024 && img_height_value !== (img_height_value = ctx2[41].height)) {
          attr(img, "height", img_height_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(img);
      }
    };
  }
  function create_default_slot(ctx) {
    let if_block_anchor;
    let if_block = ctx[12] && create_if_block2(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
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
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_pending_block2(ctx) {
    let t;
    return {
      c() {
        t = text("loading...");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_each_block2(ctx) {
    let button;
    let t0;
    let t1;
    let mounted;
    let dispose;
    function click_handler_2() {
      return ctx[24](ctx[40]);
    }
    return {
      c() {
        button = element("button");
        t0 = text(ctx[40]);
        t1 = text("\xA0");
        toggle_class(button, "active", ctx[40] === ctx[3]);
      },
      m(target, anchor) {
        insert(target, button, anchor);
        append(button, t0);
        insert(target, t1, anchor);
        if (!mounted) {
          dispose = listen(button, "click", click_handler_2);
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty[0] & 8) {
          toggle_class(button, "active", ctx[40] === ctx[3]);
        }
      },
      d(detaching) {
        if (detaching)
          detach(button);
        if (detaching)
          detach(t1);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment2(ctx) {
    let fieldset0;
    let legend;
    let h1;
    let t0;
    let t1_value = version.replace(/\.[^.]*$/, "") + "";
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
    let t13_value = Math.trunc(ctx[0]) + "";
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
      value: 16,
      blocks: [, , ,]
    };
    handle_promise(promise = ctx[17](ctx[2], ctx[1]), info);
    let each_value = { length: ctx[16].length };
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
    }
    return {
      c() {
        fieldset0 = element("fieldset");
        legend = element("legend");
        h1 = element("h1");
        t0 = text("Slidy ");
        t1 = text(t1_value);
        sup = element("sup");
        sup.textContent = "svelteJS";
        t3 = space();
        button0 = element("button");
        button0.textContent = "stend";
        t5 = space();
        button1 = element("button");
        button1.textContent = "images";
        t7 = space();
        button2 = element("button");
        button2.textContent = "dark";
        t9 = space();
        p = element("p");
        t10 = text("index: [");
        b0 = element("b");
        t11 = text(ctx[3]);
        t12 = text("], position: ");
        b1 = element("b");
        t13 = text(t13_value);
        t14 = text("px");
        t15 = space();
        main = element("main");
        info.block.c();
        t16 = space();
        nav0 = element("nav");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t17 = space();
        nav1 = element("nav");
        button3 = element("button");
        t18 = text("\u2190");
        t19 = space();
        button4 = element("button");
        t20 = text("\u2192");
        t21 = space();
        button5 = element("button");
        button5.innerHTML = `<i class="icon icon-refresh svelte-12ijjr9"></i>`;
        t22 = space();
        button6 = element("button");
        button6.textContent = "vertical";
        t24 = space();
        button7 = element("button");
        button7.textContent = "clamp";
        t26 = space();
        button8 = element("button");
        button8.textContent = "snap";
        t28 = space();
        button9 = element("button");
        button9.textContent = "loop";
        t30 = space();
        form = element("form");
        fieldset1 = element("fieldset");
        label0 = element("label");
        t31 = text("width\n            ");
        input0 = element("input");
        t32 = space();
        label1 = element("label");
        t33 = text("limit\n            ");
        input1 = element("input");
        t34 = space();
        label2 = element("label");
        t35 = text("gap\n            ");
        input2 = element("input");
        t36 = space();
        fieldset2 = element("fieldset");
        label3 = element("label");
        t37 = text("duration\n            ");
        input3 = element("input");
        t38 = space();
        label4 = element("label");
        t39 = text("gravity\n            ");
        input4 = element("input");
        t40 = space();
        label5 = element("label");
        t41 = text("align\n            ");
        select = element("select");
        option0 = element("option");
        option0.textContent = "\u2190 start";
        option1 = element("option");
        option1.textContent = "middle";
        option2 = element("option");
        option2.textContent = "end \u2192";
        toggle_class(button0, "active", ctx[8]);
        toggle_class(button1, "active", ctx[12]);
        toggle_class(button2, "active", ctx[15]);
        attr(nav0, "id", "dots");
        attr(nav0, "class", "svelte-12ijjr9");
        button3.disabled = button3_disabled_value = !ctx[13] && !ctx[3];
        button4.disabled = button4_disabled_value = !ctx[13] && ctx[3] === ctx[16].length - 1;
        toggle_class(button6, "active", ctx[4]);
        toggle_class(button7, "active", ctx[5]);
        toggle_class(button8, "active", ctx[11]);
        toggle_class(button9, "active", ctx[13]);
        attr(nav1, "class", "svelte-12ijjr9");
        attr(input0, "size", "5");
        attr(input0, "width", "auto");
        attr(label0, "class", "svelte-12ijjr9");
        attr(input1, "type", "number");
        attr(input1, "size", "5");
        attr(input1, "step", "1");
        attr(input1, "min", "1");
        attr(input1, "max", "100");
        attr(label1, "class", "svelte-12ijjr9");
        attr(input2, "type", "number");
        attr(input2, "size", "5");
        attr(input2, "step", "1");
        attr(input2, "min", "0");
        attr(input2, "max", "100");
        attr(label2, "class", "svelte-12ijjr9");
        attr(fieldset1, "class", "svelte-12ijjr9");
        attr(input3, "type", "number");
        attr(input3, "size", "5");
        attr(input3, "step", "1");
        attr(input3, "min", "100");
        attr(input3, "max", "1000");
        attr(label3, "class", "svelte-12ijjr9");
        attr(input4, "type", "number");
        attr(input4, "size", "5");
        attr(input4, "step", "0.1");
        attr(input4, "min", "0.1");
        attr(input4, "max", "2");
        attr(input4, "width", "auto");
        attr(label4, "class", "svelte-12ijjr9");
        option0.__value = "start";
        option0.value = option0.__value;
        option1.__value = "middle";
        option1.value = option1.__value;
        option2.__value = "end";
        option2.value = option2.__value;
        attr(select, "class", "svelte-12ijjr9");
        if (ctx[6] === void 0)
          add_render_callback(() => ctx[36].call(select));
        attr(label5, "class", "svelte-12ijjr9");
        attr(fieldset2, "class", "svelte-12ijjr9");
        attr(form, "class", "svelte-12ijjr9");
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
        info.block.m(main, info.anchor = null);
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
        set_input_value(input1, ctx[2]);
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
            listen(button0, "click", ctx[20]),
            listen(button1, "click", ctx[21]),
            listen(button2, "click", ctx[18]),
            listen(button3, "click", ctx[25]),
            listen(button4, "click", ctx[26]),
            listen(button5, "click", ctx[19]),
            listen(button6, "click", ctx[27]),
            listen(button7, "click", ctx[28]),
            listen(button8, "click", ctx[29]),
            listen(button9, "click", ctx[30]),
            listen(input0, "input", ctx[31]),
            listen(input1, "input", ctx[32]),
            listen(input2, "input", ctx[33]),
            listen(input3, "input", ctx[34]),
            listen(input4, "input", ctx[35]),
            listen(select, "change", ctx[36])
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty[0] & 256) {
          toggle_class(button0, "active", ctx[8]);
        }
        if (dirty[0] & 4096) {
          toggle_class(button1, "active", ctx[12]);
        }
        if (dirty[0] & 32768) {
          toggle_class(button2, "active", ctx[15]);
        }
        if (!current || dirty[0] & 8)
          set_data(t11, ctx[3]);
        if ((!current || dirty[0] & 1) && t13_value !== (t13_value = Math.trunc(ctx[0]) + ""))
          set_data(t13, t13_value);
        info.ctx = ctx;
        if (dirty[0] & 6 && promise !== (promise = ctx[17](ctx[2], ctx[1])) && handle_promise(promise, info)) {
        } else {
          update_await_block_branch(info, ctx, dirty);
        }
        if (dirty[0] & 65544) {
          each_value = { length: ctx[16].length };
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
        if (!current || dirty[0] & 8200 && button3_disabled_value !== (button3_disabled_value = !ctx[13] && !ctx[3])) {
          button3.disabled = button3_disabled_value;
        }
        if (!current || dirty[0] & 73736 && button4_disabled_value !== (button4_disabled_value = !ctx[13] && ctx[3] === ctx[16].length - 1)) {
          button4.disabled = button4_disabled_value;
        }
        if (dirty[0] & 16) {
          toggle_class(button6, "active", ctx[4]);
        }
        if (dirty[0] & 32) {
          toggle_class(button7, "active", ctx[5]);
        }
        if (dirty[0] & 2048) {
          toggle_class(button8, "active", ctx[11]);
        }
        if (dirty[0] & 8192) {
          toggle_class(button9, "active", ctx[13]);
        }
        if (dirty[0] & 1024 && input0.value !== ctx[10]) {
          set_input_value(input0, ctx[10]);
        }
        if (dirty[0] & 4 && to_number(input1.value) !== ctx[2]) {
          set_input_value(input1, ctx[2]);
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
        if (current)
          return;
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
        if (detaching)
          detach(fieldset0);
        if (detaching)
          detach(t15);
        if (detaching)
          detach(main);
        info.block.d();
        info.token = null;
        info = null;
        if (detaching)
          detach(t16);
        if (detaching)
          detach(nav0);
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(t17);
        if (detaching)
          detach(nav1);
        if (detaching)
          detach(t30);
        if (detaching)
          detach(form);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    let dark;
    "use strict";
    let items = [], position2 = 0, page = randomQ(0, 90), limit = 15, index = 7, vertical = false, clamp = false, align = "middle", duration = 375, stend = false, gravity = 1.2, width = "auto", snap = true, images = true, loop = true, gap = 16;
    async function loadPhotos(limit2, page2) {
      $$invalidate(16, items = await getPhotos(limit2, page2));
      return items;
    }
    function changeScheme(scheme) {
      const html = document.documentElement;
      html.setAttribute("scheme", !dark ? "dark" : "light");
      $$invalidate(15, dark = !dark);
    }
    const shuffle = () => $$invalidate(1, page = randomQ(0, 90));
    const mqList = window.matchMedia("(prefers-color-scheme: dark)");
    const click_handler = () => $$invalidate(8, stend = !stend);
    const click_handler_1 = () => $$invalidate(12, images = !images);
    function slidy_index_binding(value) {
      index = value;
      $$invalidate(3, index);
    }
    function slidy_position_binding(value) {
      position2 = value;
      $$invalidate(0, position2);
    }
    const click_handler_2 = (i) => $$invalidate(3, index = i);
    const click_handler_3 = () => $$invalidate(3, index--, index);
    const click_handler_4 = () => $$invalidate(3, index++, index);
    const click_handler_5 = () => $$invalidate(4, vertical = !vertical);
    const click_handler_6 = () => $$invalidate(5, clamp = !clamp);
    const click_handler_7 = () => $$invalidate(11, snap = !snap);
    const click_handler_8 = () => $$invalidate(13, loop = !loop);
    function input0_input_handler() {
      width = this.value;
      $$invalidate(10, width);
    }
    function input1_input_handler() {
      limit = to_number(this.value);
      $$invalidate(2, limit);
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
    $:
      $$invalidate(15, dark = window.matchMedia("(prefers-color-scheme: dark)").matches);
    return [
      position2,
      page,
      limit,
      index,
      vertical,
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
      select_change_handler
    ];
  }
  var App = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment2, not_equal, {}, null, [-1, -1]);
    }
  };
  var App_default = App;

  // dev/src/main.ts
  var app = new App_default({
    target: document.body
  });
  var main_default = app;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3N2ZWx0ZUAzLjQ2LjQvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9pbnRlcm5hbC9pbmRleC5tanMiLCAiLi4vLi4vLi4vLi4vY29yZS9zcmMvZW52LnRzIiwgIi4uLy4uLy4uLy4uL2NvcmUvc3JjL3V0aWxzLnRzIiwgIi4uLy4uLy4uLy4uL2NvcmUvc3JjL3NsaWR5LnRzIiwgIi4uLy4uLy4uL3NyYy9TbGlkeS5zdmVsdGUiLCAiLi4vLi4vc3JjL3NjcmlwdHMvYXBpLnRzIiwgIi4uLy4uL3NyYy9BcHAuc3ZlbHRlIiwgIi4uLy4uL3NyYy9tYWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJmdW5jdGlvbiBub29wKCkgeyB9XG5jb25zdCBpZGVudGl0eSA9IHggPT4geDtcbmZ1bmN0aW9uIGFzc2lnbih0YXIsIHNyYykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmb3IgKGNvbnN0IGsgaW4gc3JjKVxuICAgICAgICB0YXJba10gPSBzcmNba107XG4gICAgcmV0dXJuIHRhcjtcbn1cbmZ1bmN0aW9uIGlzX3Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFkZF9sb2NhdGlvbihlbGVtZW50LCBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIpIHtcbiAgICBlbGVtZW50Ll9fc3ZlbHRlX21ldGEgPSB7XG4gICAgICAgIGxvYzogeyBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIgfVxuICAgIH07XG59XG5mdW5jdGlvbiBydW4oZm4pIHtcbiAgICByZXR1cm4gZm4oKTtcbn1cbmZ1bmN0aW9uIGJsYW5rX29iamVjdCgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cbmZ1bmN0aW9uIHJ1bl9hbGwoZm5zKSB7XG4gICAgZm5zLmZvckVhY2gocnVuKTtcbn1cbmZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIHNhZmVfbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYiB8fCAoKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB8fCB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5sZXQgc3JjX3VybF9lcXVhbF9hbmNob3I7XG5mdW5jdGlvbiBzcmNfdXJsX2VxdWFsKGVsZW1lbnRfc3JjLCB1cmwpIHtcbiAgICBpZiAoIXNyY191cmxfZXF1YWxfYW5jaG9yKSB7XG4gICAgICAgIHNyY191cmxfZXF1YWxfYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIH1cbiAgICBzcmNfdXJsX2VxdWFsX2FuY2hvci5ocmVmID0gdXJsO1xuICAgIHJldHVybiBlbGVtZW50X3NyYyA9PT0gc3JjX3VybF9lcXVhbF9hbmNob3IuaHJlZjtcbn1cbmZ1bmN0aW9uIG5vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGI7XG59XG5mdW5jdGlvbiBpc19lbXB0eShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDA7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9zdG9yZShzdG9yZSwgbmFtZSkge1xuICAgIGlmIChzdG9yZSAhPSBudWxsICYmIHR5cGVvZiBzdG9yZS5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnJHtuYW1lfScgaXMgbm90IGEgc3RvcmUgd2l0aCBhICdzdWJzY3JpYmUnIG1ldGhvZGApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN1YnNjcmliZShzdG9yZSwgLi4uY2FsbGJhY2tzKSB7XG4gICAgaWYgKHN0b3JlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuICAgIGNvbnN0IHVuc3ViID0gc3RvcmUuc3Vic2NyaWJlKC4uLmNhbGxiYWNrcyk7XG4gICAgcmV0dXJuIHVuc3ViLnVuc3Vic2NyaWJlID8gKCkgPT4gdW5zdWIudW5zdWJzY3JpYmUoKSA6IHVuc3ViO1xufVxuZnVuY3Rpb24gZ2V0X3N0b3JlX3ZhbHVlKHN0b3JlKSB7XG4gICAgbGV0IHZhbHVlO1xuICAgIHN1YnNjcmliZShzdG9yZSwgXyA9PiB2YWx1ZSA9IF8pKCk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gY29tcG9uZW50X3N1YnNjcmliZShjb21wb25lbnQsIHN0b3JlLCBjYWxsYmFjaykge1xuICAgIGNvbXBvbmVudC4kJC5vbl9kZXN0cm95LnB1c2goc3Vic2NyaWJlKHN0b3JlLCBjYWxsYmFjaykpO1xufVxuZnVuY3Rpb24gY3JlYXRlX3Nsb3QoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbikge1xuICAgIGlmIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY3R4ID0gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKTtcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb25bMF0oc2xvdF9jdHgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbikge1xuICAgIHJldHVybiBkZWZpbml0aW9uWzFdICYmIGZuXG4gICAgICAgID8gYXNzaWduKCQkc2NvcGUuY3R4LnNsaWNlKCksIGRlZmluaXRpb25bMV0oZm4oY3R4KSkpXG4gICAgICAgIDogJCRzY29wZS5jdHg7XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jaGFuZ2VzKGRlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBmbikge1xuICAgIGlmIChkZWZpbml0aW9uWzJdICYmIGZuKSB7XG4gICAgICAgIGNvbnN0IGxldHMgPSBkZWZpbml0aW9uWzJdKGZuKGRpcnR5KSk7XG4gICAgICAgIGlmICgkJHNjb3BlLmRpcnR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBsZXRzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbGV0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbGVuID0gTWF0aC5tYXgoJCRzY29wZS5kaXJ0eS5sZW5ndGgsIGxldHMubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRbaV0gPSAkJHNjb3BlLmRpcnR5W2ldIHwgbGV0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtZXJnZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICQkc2NvcGUuZGlydHkgfCBsZXRzO1xuICAgIH1cbiAgICByZXR1cm4gJCRzY29wZS5kaXJ0eTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZV9zbG90X2Jhc2Uoc2xvdCwgc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIHNsb3RfY2hhbmdlcywgZ2V0X3Nsb3RfY29udGV4dF9mbikge1xuICAgIGlmIChzbG90X2NoYW5nZXMpIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jb250ZXh0ID0gZ2V0X3Nsb3RfY29udGV4dChzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZ2V0X3Nsb3RfY29udGV4dF9mbik7XG4gICAgICAgIHNsb3QucChzbG90X2NvbnRleHQsIHNsb3RfY2hhbmdlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlX3Nsb3Qoc2xvdCwgc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuLCBnZXRfc2xvdF9jb250ZXh0X2ZuKSB7XG4gICAgY29uc3Qgc2xvdF9jaGFuZ2VzID0gZ2V0X3Nsb3RfY2hhbmdlcyhzbG90X2RlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuKTtcbiAgICB1cGRhdGVfc2xvdF9iYXNlKHNsb3QsIHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBzbG90X2NoYW5nZXMsIGdldF9zbG90X2NvbnRleHRfZm4pO1xufVxuZnVuY3Rpb24gZ2V0X2FsbF9kaXJ0eV9mcm9tX3Njb3BlKCQkc2NvcGUpIHtcbiAgICBpZiAoJCRzY29wZS5jdHgubGVuZ3RoID4gMzIpIHtcbiAgICAgICAgY29uc3QgZGlydHkgPSBbXTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gJCRzY29wZS5jdHgubGVuZ3RoIC8gMzI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRpcnR5W2ldID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpcnR5O1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5mdW5jdGlvbiBleGNsdWRlX2ludGVybmFsX3Byb3BzKHByb3BzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoa1swXSAhPT0gJyQnKVxuICAgICAgICAgICAgcmVzdWx0W2tdID0gcHJvcHNba107XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVfcmVzdF9wcm9wcyhwcm9wcywga2V5cykge1xuICAgIGNvbnN0IHJlc3QgPSB7fTtcbiAgICBrZXlzID0gbmV3IFNldChrZXlzKTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gcHJvcHMpXG4gICAgICAgIGlmICgha2V5cy5oYXMoaykgJiYga1swXSAhPT0gJyQnKVxuICAgICAgICAgICAgcmVzdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN0O1xufVxuZnVuY3Rpb24gY29tcHV0ZV9zbG90cyhzbG90cykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNsb3RzKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG9uY2UoZm4pIHtcbiAgICBsZXQgcmFuID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIGlmIChyYW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJhbiA9IHRydWU7XG4gICAgICAgIGZuLmNhbGwodGhpcywgLi4uYXJncyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG51bGxfdG9fZW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5mdW5jdGlvbiBzZXRfc3RvcmVfdmFsdWUoc3RvcmUsIHJldCwgdmFsdWUpIHtcbiAgICBzdG9yZS5zZXQodmFsdWUpO1xuICAgIHJldHVybiByZXQ7XG59XG5jb25zdCBoYXNfcHJvcCA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xuZnVuY3Rpb24gYWN0aW9uX2Rlc3Ryb3llcihhY3Rpb25fcmVzdWx0KSB7XG4gICAgcmV0dXJuIGFjdGlvbl9yZXN1bHQgJiYgaXNfZnVuY3Rpb24oYWN0aW9uX3Jlc3VsdC5kZXN0cm95KSA/IGFjdGlvbl9yZXN1bHQuZGVzdHJveSA6IG5vb3A7XG59XG5cbmNvbnN0IGlzX2NsaWVudCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xubGV0IG5vdyA9IGlzX2NsaWVudFxuICAgID8gKCkgPT4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpXG4gICAgOiAoKSA9PiBEYXRlLm5vdygpO1xubGV0IHJhZiA9IGlzX2NsaWVudCA/IGNiID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShjYikgOiBub29wO1xuLy8gdXNlZCBpbnRlcm5hbGx5IGZvciB0ZXN0aW5nXG5mdW5jdGlvbiBzZXRfbm93KGZuKSB7XG4gICAgbm93ID0gZm47XG59XG5mdW5jdGlvbiBzZXRfcmFmKGZuKSB7XG4gICAgcmFmID0gZm47XG59XG5cbmNvbnN0IHRhc2tzID0gbmV3IFNldCgpO1xuZnVuY3Rpb24gcnVuX3Rhc2tzKG5vdykge1xuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGlmICghdGFzay5jKG5vdykpIHtcbiAgICAgICAgICAgIHRhc2tzLmRlbGV0ZSh0YXNrKTtcbiAgICAgICAgICAgIHRhc2suZigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRhc2tzLnNpemUgIT09IDApXG4gICAgICAgIHJhZihydW5fdGFza3MpO1xufVxuLyoqXG4gKiBGb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5IVxuICovXG5mdW5jdGlvbiBjbGVhcl9sb29wcygpIHtcbiAgICB0YXNrcy5jbGVhcigpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHRhc2sgdGhhdCBydW5zIG9uIGVhY2ggcmFmIGZyYW1lXG4gKiB1bnRpbCBpdCByZXR1cm5zIGEgZmFsc3kgdmFsdWUgb3IgaXMgYWJvcnRlZFxuICovXG5mdW5jdGlvbiBsb29wKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRhc2s7XG4gICAgaWYgKHRhc2tzLnNpemUgPT09IDApXG4gICAgICAgIHJhZihydW5fdGFza3MpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHByb21pc2U6IG5ldyBQcm9taXNlKGZ1bGZpbGwgPT4ge1xuICAgICAgICAgICAgdGFza3MuYWRkKHRhc2sgPSB7IGM6IGNhbGxiYWNrLCBmOiBmdWxmaWxsIH0pO1xuICAgICAgICB9KSxcbiAgICAgICAgYWJvcnQoKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBUcmFjayB3aGljaCBub2RlcyBhcmUgY2xhaW1lZCBkdXJpbmcgaHlkcmF0aW9uLiBVbmNsYWltZWQgbm9kZXMgY2FuIHRoZW4gYmUgcmVtb3ZlZCBmcm9tIHRoZSBET01cbi8vIGF0IHRoZSBlbmQgb2YgaHlkcmF0aW9uIHdpdGhvdXQgdG91Y2hpbmcgdGhlIHJlbWFpbmluZyBub2Rlcy5cbmxldCBpc19oeWRyYXRpbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIHN0YXJ0X2h5ZHJhdGluZygpIHtcbiAgICBpc19oeWRyYXRpbmcgPSB0cnVlO1xufVxuZnVuY3Rpb24gZW5kX2h5ZHJhdGluZygpIHtcbiAgICBpc19oeWRyYXRpbmcgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIHVwcGVyX2JvdW5kKGxvdywgaGlnaCwga2V5LCB2YWx1ZSkge1xuICAgIC8vIFJldHVybiBmaXJzdCBpbmRleCBvZiB2YWx1ZSBsYXJnZXIgdGhhbiBpbnB1dCB2YWx1ZSBpbiB0aGUgcmFuZ2UgW2xvdywgaGlnaClcbiAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgICBjb25zdCBtaWQgPSBsb3cgKyAoKGhpZ2ggLSBsb3cpID4+IDEpO1xuICAgICAgICBpZiAoa2V5KG1pZCkgPD0gdmFsdWUpIHtcbiAgICAgICAgICAgIGxvdyA9IG1pZCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoaWdoID0gbWlkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsb3c7XG59XG5mdW5jdGlvbiBpbml0X2h5ZHJhdGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5oeWRyYXRlX2luaXQpXG4gICAgICAgIHJldHVybjtcbiAgICB0YXJnZXQuaHlkcmF0ZV9pbml0ID0gdHJ1ZTtcbiAgICAvLyBXZSBrbm93IHRoYXQgYWxsIGNoaWxkcmVuIGhhdmUgY2xhaW1fb3JkZXIgdmFsdWVzIHNpbmNlIHRoZSB1bmNsYWltZWQgaGF2ZSBiZWVuIGRldGFjaGVkIGlmIHRhcmdldCBpcyBub3QgPGhlYWQ+XG4gICAgbGV0IGNoaWxkcmVuID0gdGFyZ2V0LmNoaWxkTm9kZXM7XG4gICAgLy8gSWYgdGFyZ2V0IGlzIDxoZWFkPiwgdGhlcmUgbWF5IGJlIGNoaWxkcmVuIHdpdGhvdXQgY2xhaW1fb3JkZXJcbiAgICBpZiAodGFyZ2V0Lm5vZGVOYW1lID09PSAnSEVBRCcpIHtcbiAgICAgICAgY29uc3QgbXlDaGlsZHJlbiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFpbV9vcmRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbXlDaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoaWxkcmVuID0gbXlDaGlsZHJlbjtcbiAgICB9XG4gICAgLypcbiAgICAqIFJlb3JkZXIgY2xhaW1lZCBjaGlsZHJlbiBvcHRpbWFsbHkuXG4gICAgKiBXZSBjYW4gcmVvcmRlciBjbGFpbWVkIGNoaWxkcmVuIG9wdGltYWxseSBieSBmaW5kaW5nIHRoZSBsb25nZXN0IHN1YnNlcXVlbmNlIG9mXG4gICAgKiBub2RlcyB0aGF0IGFyZSBhbHJlYWR5IGNsYWltZWQgaW4gb3JkZXIgYW5kIG9ubHkgbW92aW5nIHRoZSByZXN0LiBUaGUgbG9uZ2VzdFxuICAgICogc3Vic2VxdWVuY2Ugc3Vic2VxdWVuY2Ugb2Ygbm9kZXMgdGhhdCBhcmUgY2xhaW1lZCBpbiBvcmRlciBjYW4gYmUgZm91bmQgYnlcbiAgICAqIGNvbXB1dGluZyB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIG9mIC5jbGFpbV9vcmRlciB2YWx1ZXMuXG4gICAgKlxuICAgICogVGhpcyBhbGdvcml0aG0gaXMgb3B0aW1hbCBpbiBnZW5lcmF0aW5nIHRoZSBsZWFzdCBhbW91bnQgb2YgcmVvcmRlciBvcGVyYXRpb25zXG4gICAgKiBwb3NzaWJsZS5cbiAgICAqXG4gICAgKiBQcm9vZjpcbiAgICAqIFdlIGtub3cgdGhhdCwgZ2l2ZW4gYSBzZXQgb2YgcmVvcmRlcmluZyBvcGVyYXRpb25zLCB0aGUgbm9kZXMgdGhhdCBkbyBub3QgbW92ZVxuICAgICogYWx3YXlzIGZvcm0gYW4gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSwgc2luY2UgdGhleSBkbyBub3QgbW92ZSBhbW9uZyBlYWNoIG90aGVyXG4gICAgKiBtZWFuaW5nIHRoYXQgdGhleSBtdXN0IGJlIGFscmVhZHkgb3JkZXJlZCBhbW9uZyBlYWNoIG90aGVyLiBUaHVzLCB0aGUgbWF4aW1hbFxuICAgICogc2V0IG9mIG5vZGVzIHRoYXQgZG8gbm90IG1vdmUgZm9ybSBhIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZS5cbiAgICAqL1xuICAgIC8vIENvbXB1dGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlXG4gICAgLy8gbTogc3Vic2VxdWVuY2UgbGVuZ3RoIGogPT4gaW5kZXggayBvZiBzbWFsbGVzdCB2YWx1ZSB0aGF0IGVuZHMgYW4gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiBsZW5ndGggalxuICAgIGNvbnN0IG0gPSBuZXcgSW50MzJBcnJheShjaGlsZHJlbi5sZW5ndGggKyAxKTtcbiAgICAvLyBQcmVkZWNlc3NvciBpbmRpY2VzICsgMVxuICAgIGNvbnN0IHAgPSBuZXcgSW50MzJBcnJheShjaGlsZHJlbi5sZW5ndGgpO1xuICAgIG1bMF0gPSAtMTtcbiAgICBsZXQgbG9uZ2VzdCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gY2hpbGRyZW5baV0uY2xhaW1fb3JkZXI7XG4gICAgICAgIC8vIEZpbmQgdGhlIGxhcmdlc3Qgc3Vic2VxdWVuY2UgbGVuZ3RoIHN1Y2ggdGhhdCBpdCBlbmRzIGluIGEgdmFsdWUgbGVzcyB0aGFuIG91ciBjdXJyZW50IHZhbHVlXG4gICAgICAgIC8vIHVwcGVyX2JvdW5kIHJldHVybnMgZmlyc3QgZ3JlYXRlciB2YWx1ZSwgc28gd2Ugc3VidHJhY3Qgb25lXG4gICAgICAgIC8vIHdpdGggZmFzdCBwYXRoIGZvciB3aGVuIHdlIGFyZSBvbiB0aGUgY3VycmVudCBsb25nZXN0IHN1YnNlcXVlbmNlXG4gICAgICAgIGNvbnN0IHNlcUxlbiA9ICgobG9uZ2VzdCA+IDAgJiYgY2hpbGRyZW5bbVtsb25nZXN0XV0uY2xhaW1fb3JkZXIgPD0gY3VycmVudCkgPyBsb25nZXN0ICsgMSA6IHVwcGVyX2JvdW5kKDEsIGxvbmdlc3QsIGlkeCA9PiBjaGlsZHJlblttW2lkeF1dLmNsYWltX29yZGVyLCBjdXJyZW50KSkgLSAxO1xuICAgICAgICBwW2ldID0gbVtzZXFMZW5dICsgMTtcbiAgICAgICAgY29uc3QgbmV3TGVuID0gc2VxTGVuICsgMTtcbiAgICAgICAgLy8gV2UgY2FuIGd1YXJhbnRlZSB0aGF0IGN1cnJlbnQgaXMgdGhlIHNtYWxsZXN0IHZhbHVlLiBPdGhlcndpc2UsIHdlIHdvdWxkIGhhdmUgZ2VuZXJhdGVkIGEgbG9uZ2VyIHNlcXVlbmNlLlxuICAgICAgICBtW25ld0xlbl0gPSBpO1xuICAgICAgICBsb25nZXN0ID0gTWF0aC5tYXgobmV3TGVuLCBsb25nZXN0KTtcbiAgICB9XG4gICAgLy8gVGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiBub2RlcyAoaW5pdGlhbGx5IHJldmVyc2VkKVxuICAgIGNvbnN0IGxpcyA9IFtdO1xuICAgIC8vIFRoZSByZXN0IG9mIHRoZSBub2Rlcywgbm9kZXMgdGhhdCB3aWxsIGJlIG1vdmVkXG4gICAgY29uc3QgdG9Nb3ZlID0gW107XG4gICAgbGV0IGxhc3QgPSBjaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgIGZvciAobGV0IGN1ciA9IG1bbG9uZ2VzdF0gKyAxOyBjdXIgIT0gMDsgY3VyID0gcFtjdXIgLSAxXSkge1xuICAgICAgICBsaXMucHVzaChjaGlsZHJlbltjdXIgLSAxXSk7XG4gICAgICAgIGZvciAoOyBsYXN0ID49IGN1cjsgbGFzdC0tKSB7XG4gICAgICAgICAgICB0b01vdmUucHVzaChjaGlsZHJlbltsYXN0XSk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdC0tO1xuICAgIH1cbiAgICBmb3IgKDsgbGFzdCA+PSAwOyBsYXN0LS0pIHtcbiAgICAgICAgdG9Nb3ZlLnB1c2goY2hpbGRyZW5bbGFzdF0pO1xuICAgIH1cbiAgICBsaXMucmV2ZXJzZSgpO1xuICAgIC8vIFdlIHNvcnQgdGhlIG5vZGVzIGJlaW5nIG1vdmVkIHRvIGd1YXJhbnRlZSB0aGF0IHRoZWlyIGluc2VydGlvbiBvcmRlciBtYXRjaGVzIHRoZSBjbGFpbSBvcmRlclxuICAgIHRvTW92ZS5zb3J0KChhLCBiKSA9PiBhLmNsYWltX29yZGVyIC0gYi5jbGFpbV9vcmRlcik7XG4gICAgLy8gRmluYWxseSwgd2UgbW92ZSB0aGUgbm9kZXNcbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IDA7IGkgPCB0b01vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd2hpbGUgKGogPCBsaXMubGVuZ3RoICYmIHRvTW92ZVtpXS5jbGFpbV9vcmRlciA+PSBsaXNbal0uY2xhaW1fb3JkZXIpIHtcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbmNob3IgPSBqIDwgbGlzLmxlbmd0aCA/IGxpc1tqXSA6IG51bGw7XG4gICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUodG9Nb3ZlW2ldLCBhbmNob3IpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFwcGVuZCh0YXJnZXQsIG5vZGUpIHtcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBhcHBlbmRfc3R5bGVzKHRhcmdldCwgc3R5bGVfc2hlZXRfaWQsIHN0eWxlcykge1xuICAgIGNvbnN0IGFwcGVuZF9zdHlsZXNfdG8gPSBnZXRfcm9vdF9mb3Jfc3R5bGUodGFyZ2V0KTtcbiAgICBpZiAoIWFwcGVuZF9zdHlsZXNfdG8uZ2V0RWxlbWVudEJ5SWQoc3R5bGVfc2hlZXRfaWQpKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgc3R5bGUuaWQgPSBzdHlsZV9zaGVldF9pZDtcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBzdHlsZXM7XG4gICAgICAgIGFwcGVuZF9zdHlsZXNoZWV0KGFwcGVuZF9zdHlsZXNfdG8sIHN0eWxlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRfcm9vdF9mb3Jfc3R5bGUobm9kZSkge1xuICAgIGlmICghbm9kZSlcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIGNvbnN0IHJvb3QgPSBub2RlLmdldFJvb3ROb2RlID8gbm9kZS5nZXRSb290Tm9kZSgpIDogbm9kZS5vd25lckRvY3VtZW50O1xuICAgIGlmIChyb290ICYmIHJvb3QuaG9zdCkge1xuICAgICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudDtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9lbXB0eV9zdHlsZXNoZWV0KG5vZGUpIHtcbiAgICBjb25zdCBzdHlsZV9lbGVtZW50ID0gZWxlbWVudCgnc3R5bGUnKTtcbiAgICBhcHBlbmRfc3R5bGVzaGVldChnZXRfcm9vdF9mb3Jfc3R5bGUobm9kZSksIHN0eWxlX2VsZW1lbnQpO1xuICAgIHJldHVybiBzdHlsZV9lbGVtZW50LnNoZWV0O1xufVxuZnVuY3Rpb24gYXBwZW5kX3N0eWxlc2hlZXQobm9kZSwgc3R5bGUpIHtcbiAgICBhcHBlbmQobm9kZS5oZWFkIHx8IG5vZGUsIHN0eWxlKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9oeWRyYXRpb24odGFyZ2V0LCBub2RlKSB7XG4gICAgaWYgKGlzX2h5ZHJhdGluZykge1xuICAgICAgICBpbml0X2h5ZHJhdGUodGFyZ2V0KTtcbiAgICAgICAgaWYgKCh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCA9PT0gdW5kZWZpbmVkKSB8fCAoKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkICE9PSBudWxsKSAmJiAodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQucGFyZW50RWxlbWVudCAhPT0gdGFyZ2V0KSkpIHtcbiAgICAgICAgICAgIHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID0gdGFyZ2V0LmZpcnN0Q2hpbGQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2tpcCBub2RlcyBvZiB1bmRlZmluZWQgb3JkZXJpbmdcbiAgICAgICAgd2hpbGUgKCh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCAhPT0gbnVsbCkgJiYgKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkLmNsYWltX29yZGVyID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCA9IHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlICE9PSB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCkge1xuICAgICAgICAgICAgLy8gV2Ugb25seSBpbnNlcnQgaWYgdGhlIG9yZGVyaW5nIG9mIHRoaXMgbm9kZSBzaG91bGQgYmUgbW9kaWZpZWQgb3IgdGhlIHBhcmVudCBub2RlIGlzIG5vdCB0YXJnZXRcbiAgICAgICAgICAgIGlmIChub2RlLmNsYWltX29yZGVyICE9PSB1bmRlZmluZWQgfHwgbm9kZS5wYXJlbnROb2RlICE9PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID0gbm9kZS5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChub2RlLnBhcmVudE5vZGUgIT09IHRhcmdldCB8fCBub2RlLm5leHRTaWJsaW5nICE9PSBudWxsKSB7XG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbnNlcnQodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFuY2hvciB8fCBudWxsKTtcbn1cbmZ1bmN0aW9uIGluc2VydF9oeWRyYXRpb24odGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICBpZiAoaXNfaHlkcmF0aW5nICYmICFhbmNob3IpIHtcbiAgICAgICAgYXBwZW5kX2h5ZHJhdGlvbih0YXJnZXQsIG5vZGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChub2RlLnBhcmVudE5vZGUgIT09IHRhcmdldCB8fCBub2RlLm5leHRTaWJsaW5nICE9IGFuY2hvcikge1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFuY2hvciB8fCBudWxsKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2gobm9kZSkge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cbmZ1bmN0aW9uIGRlc3Ryb3lfZWFjaChpdGVyYXRpb25zLCBkZXRhY2hpbmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGl0ZXJhdGlvbnNbaV0pXG4gICAgICAgICAgICBpdGVyYXRpb25zW2ldLmQoZGV0YWNoaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBlbGVtZW50KG5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRfaXMobmFtZSwgaXMpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lLCB7IGlzIH0pO1xufVxuZnVuY3Rpb24gb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcyhvYmosIGV4Y2x1ZGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXNfcHJvcChvYmosIGspXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAmJiBleGNsdWRlLmluZGV4T2YoaykgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0YXJnZXRba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIHN2Z19lbGVtZW50KG5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5hbWUpO1xufVxuZnVuY3Rpb24gdGV4dChkYXRhKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEpO1xufVxuZnVuY3Rpb24gc3BhY2UoKSB7XG4gICAgcmV0dXJuIHRleHQoJyAnKTtcbn1cbmZ1bmN0aW9uIGVtcHR5KCkge1xuICAgIHJldHVybiB0ZXh0KCcnKTtcbn1cbmZ1bmN0aW9uIGxpc3Rlbihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuICgpID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG59XG5mdW5jdGlvbiBwcmV2ZW50X2RlZmF1bHQoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzdG9wX3Byb3BhZ2F0aW9uKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNlbGYoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcylcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiB0cnVzdGVkKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChldmVudC5pc1RydXN0ZWQpXG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgZWxzZSBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSAhPT0gdmFsdWUpXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG5vZGUuX19wcm90b19fKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzW2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfX3ZhbHVlJykge1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9IG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdG9yc1trZXldICYmIGRlc2NyaXB0b3JzW2tleV0uc2V0KSB7XG4gICAgICAgICAgICBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdmdfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBwcm9wLCB2YWx1ZSkge1xuICAgIGlmIChwcm9wIGluIG5vZGUpIHtcbiAgICAgICAgbm9kZVtwcm9wXSA9IHR5cGVvZiBub2RlW3Byb3BdID09PSAnYm9vbGVhbicgJiYgdmFsdWUgPT09ICcnID8gdHJ1ZSA6IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0cihub2RlLCBwcm9wLCB2YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24geGxpbmtfYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoZ3JvdXAsIF9fdmFsdWUsIGNoZWNrZWQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChncm91cFtpXS5jaGVja2VkKVxuICAgICAgICAgICAgdmFsdWUuYWRkKGdyb3VwW2ldLl9fdmFsdWUpO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrZWQpIHtcbiAgICAgICAgdmFsdWUuZGVsZXRlKF9fdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG59XG5mdW5jdGlvbiB0b19udW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICcnID8gbnVsbCA6ICt2YWx1ZTtcbn1cbmZ1bmN0aW9uIHRpbWVfcmFuZ2VzX3RvX2FycmF5KHJhbmdlcykge1xuICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXJyYXkucHVzaCh7IHN0YXJ0OiByYW5nZXMuc3RhcnQoaSksIGVuZDogcmFuZ2VzLmVuZChpKSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xufVxuZnVuY3Rpb24gY2hpbGRyZW4oZWxlbWVudCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2Rlcyk7XG59XG5mdW5jdGlvbiBpbml0X2NsYWltX2luZm8obm9kZXMpIHtcbiAgICBpZiAobm9kZXMuY2xhaW1faW5mbyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5vZGVzLmNsYWltX2luZm8gPSB7IGxhc3RfaW5kZXg6IDAsIHRvdGFsX2NsYWltZWQ6IDAgfTtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGFpbV9ub2RlKG5vZGVzLCBwcmVkaWNhdGUsIHByb2Nlc3NOb2RlLCBjcmVhdGVOb2RlLCBkb250VXBkYXRlTGFzdEluZGV4ID0gZmFsc2UpIHtcbiAgICAvLyBUcnkgdG8gZmluZCBub2RlcyBpbiBhbiBvcmRlciBzdWNoIHRoYXQgd2UgbGVuZ3RoZW4gdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZVxuICAgIGluaXRfY2xhaW1faW5mbyhub2Rlcyk7XG4gICAgY29uc3QgcmVzdWx0Tm9kZSA9ICgoKSA9PiB7XG4gICAgICAgIC8vIFdlIGZpcnN0IHRyeSB0byBmaW5kIGFuIGVsZW1lbnQgYWZ0ZXIgdGhlIHByZXZpb3VzIG9uZVxuICAgICAgICBmb3IgKGxldCBpID0gbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4OyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXBsYWNlbWVudCA9IHByb2Nlc3NOb2RlKG5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChyZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzW2ldID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZG9udFVwZGF0ZUxhc3RJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIHdlIHRyeSB0byBmaW5kIG9uZSBiZWZvcmVcbiAgICAgICAgLy8gV2UgaXRlcmF0ZSBpbiByZXZlcnNlIHNvIHRoYXQgd2UgZG9uJ3QgZ28gdG9vIGZhciBiYWNrXG4gICAgICAgIGZvciAobGV0IGkgPSBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VtZW50ID0gcHJvY2Vzc05vZGUobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcGxhY2VtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXNbaV0gPSByZXBsYWNlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFkb250VXBkYXRlTGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlcGxhY2VtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2Ugd2Ugc3BsaWNlZCBiZWZvcmUgdGhlIGxhc3RfaW5kZXgsIHdlIGRlY3JlYXNlIGl0XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBjYW4ndCBmaW5kIGFueSBtYXRjaGluZyBub2RlLCB3ZSBjcmVhdGUgYSBuZXcgb25lXG4gICAgICAgIHJldHVybiBjcmVhdGVOb2RlKCk7XG4gICAgfSkoKTtcbiAgICByZXN1bHROb2RlLmNsYWltX29yZGVyID0gbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkO1xuICAgIG5vZGVzLmNsYWltX2luZm8udG90YWxfY2xhaW1lZCArPSAxO1xuICAgIHJldHVybiByZXN1bHROb2RlO1xufVxuZnVuY3Rpb24gY2xhaW1fZWxlbWVudF9iYXNlKG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBjcmVhdGVfZWxlbWVudCkge1xuICAgIHJldHVybiBjbGFpbV9ub2RlKG5vZGVzLCAobm9kZSkgPT4gbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSwgKG5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgcmVtb3ZlID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBub2RlLmF0dHJpYnV0ZXNbal07XG4gICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlLm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlLnB1c2goYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbW92ZS5mb3JFYWNoKHYgPT4gbm9kZS5yZW1vdmVBdHRyaWJ1dGUodikpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sICgpID0+IGNyZWF0ZV9lbGVtZW50KG5hbWUpKTtcbn1cbmZ1bmN0aW9uIGNsYWltX2VsZW1lbnQobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICByZXR1cm4gY2xhaW1fZWxlbWVudF9iYXNlKG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBlbGVtZW50KTtcbn1cbmZ1bmN0aW9uIGNsYWltX3N2Z19lbGVtZW50KG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzKSB7XG4gICAgcmV0dXJuIGNsYWltX2VsZW1lbnRfYmFzZShub2RlcywgbmFtZSwgYXR0cmlidXRlcywgc3ZnX2VsZW1lbnQpO1xufVxuZnVuY3Rpb24gY2xhaW1fdGV4dChub2RlcywgZGF0YSkge1xuICAgIHJldHVybiBjbGFpbV9ub2RlKG5vZGVzLCAobm9kZSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gMywgKG5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YVN0ciA9ICcnICsgZGF0YTtcbiAgICAgICAgaWYgKG5vZGUuZGF0YS5zdGFydHNXaXRoKGRhdGFTdHIpKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5kYXRhLmxlbmd0aCAhPT0gZGF0YVN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5zcGxpdFRleHQoZGF0YVN0ci5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5kYXRhID0gZGF0YVN0cjtcbiAgICAgICAgfVxuICAgIH0sICgpID0+IHRleHQoZGF0YSksIHRydWUgLy8gVGV4dCBub2RlcyBzaG91bGQgbm90IHVwZGF0ZSBsYXN0IGluZGV4IHNpbmNlIGl0IGlzIGxpa2VseSBub3Qgd29ydGggaXQgdG8gZWxpbWluYXRlIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2YgYWN0dWFsIGVsZW1lbnRzXG4gICAgKTtcbn1cbmZ1bmN0aW9uIGNsYWltX3NwYWNlKG5vZGVzKSB7XG4gICAgcmV0dXJuIGNsYWltX3RleHQobm9kZXMsICcgJyk7XG59XG5mdW5jdGlvbiBmaW5kX2NvbW1lbnQobm9kZXMsIHRleHQsIHN0YXJ0KSB7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gOCAvKiBjb21tZW50IG5vZGUgKi8gJiYgbm9kZS50ZXh0Q29udGVudC50cmltKCkgPT09IHRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2Rlcy5sZW5ndGg7XG59XG5mdW5jdGlvbiBjbGFpbV9odG1sX3RhZyhub2Rlcykge1xuICAgIC8vIGZpbmQgaHRtbCBvcGVuaW5nIHRhZ1xuICAgIGNvbnN0IHN0YXJ0X2luZGV4ID0gZmluZF9jb21tZW50KG5vZGVzLCAnSFRNTF9UQUdfU1RBUlQnLCAwKTtcbiAgICBjb25zdCBlbmRfaW5kZXggPSBmaW5kX2NvbW1lbnQobm9kZXMsICdIVE1MX1RBR19FTkQnLCBzdGFydF9pbmRleCk7XG4gICAgaWYgKHN0YXJ0X2luZGV4ID09PSBlbmRfaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdG1sVGFnSHlkcmF0aW9uKCk7XG4gICAgfVxuICAgIGluaXRfY2xhaW1faW5mbyhub2Rlcyk7XG4gICAgY29uc3QgaHRtbF90YWdfbm9kZXMgPSBub2Rlcy5zcGxpY2Uoc3RhcnRfaW5kZXgsIGVuZF9pbmRleCAtIHN0YXJ0X2luZGV4ICsgMSk7XG4gICAgZGV0YWNoKGh0bWxfdGFnX25vZGVzWzBdKTtcbiAgICBkZXRhY2goaHRtbF90YWdfbm9kZXNbaHRtbF90YWdfbm9kZXMubGVuZ3RoIC0gMV0pO1xuICAgIGNvbnN0IGNsYWltZWRfbm9kZXMgPSBodG1sX3RhZ19ub2Rlcy5zbGljZSgxLCBodG1sX3RhZ19ub2Rlcy5sZW5ndGggLSAxKTtcbiAgICBmb3IgKGNvbnN0IG4gb2YgY2xhaW1lZF9ub2Rlcykge1xuICAgICAgICBuLmNsYWltX29yZGVyID0gbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkO1xuICAgICAgICBub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQgKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBIdG1sVGFnSHlkcmF0aW9uKGNsYWltZWRfbm9kZXMpO1xufVxuZnVuY3Rpb24gc2V0X2RhdGEodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQud2hvbGVUZXh0ICE9PSBkYXRhKVxuICAgICAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3ZhbHVlKGlucHV0LCB2YWx1ZSkge1xuICAgIGlucHV0LnZhbHVlID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5mdW5jdGlvbiBzZXRfaW5wdXRfdHlwZShpbnB1dCwgdHlwZSkge1xuICAgIHRyeSB7XG4gICAgICAgIGlucHV0LnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X3N0eWxlKG5vZGUsIGtleSwgdmFsdWUsIGltcG9ydGFudCkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICBub2RlLnN0eWxlLnJlbW92ZVByb3BlcnR5KGtleSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBub2RlLnN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUsIGltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJycpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb24oc2VsZWN0LCB2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbaV07XG4gICAgICAgIGlmIChvcHRpb24uX192YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWN0LnNlbGVjdGVkSW5kZXggPSAtMTsgLy8gbm8gb3B0aW9uIHNob3VsZCBiZSBzZWxlY3RlZFxufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbnMoc2VsZWN0LCB2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbaV07XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IH52YWx1ZS5pbmRleE9mKG9wdGlvbi5fX3ZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZWxlY3RfdmFsdWUoc2VsZWN0KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRfb3B0aW9uID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJykgfHwgc2VsZWN0Lm9wdGlvbnNbMF07XG4gICAgcmV0dXJuIHNlbGVjdGVkX29wdGlvbiAmJiBzZWxlY3RlZF9vcHRpb24uX192YWx1ZTtcbn1cbmZ1bmN0aW9uIHNlbGVjdF9tdWx0aXBsZV92YWx1ZShzZWxlY3QpIHtcbiAgICByZXR1cm4gW10ubWFwLmNhbGwoc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJzpjaGVja2VkJyksIG9wdGlvbiA9PiBvcHRpb24uX192YWx1ZSk7XG59XG4vLyB1bmZvcnR1bmF0ZWx5IHRoaXMgY2FuJ3QgYmUgYSBjb25zdGFudCBhcyB0aGF0IHdvdWxkbid0IGJlIHRyZWUtc2hha2VhYmxlXG4vLyBzbyB3ZSBjYWNoZSB0aGUgcmVzdWx0IGluc3RlYWRcbmxldCBjcm9zc29yaWdpbjtcbmZ1bmN0aW9uIGlzX2Nyb3Nzb3JpZ2luKCkge1xuICAgIGlmIChjcm9zc29yaWdpbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNyb3Nzb3JpZ2luID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHZvaWQgd2luZG93LnBhcmVudC5kb2N1bWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNyb3Nzb3JpZ2luID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3Jvc3NvcmlnaW47XG59XG5mdW5jdGlvbiBhZGRfcmVzaXplX2xpc3RlbmVyKG5vZGUsIGZuKSB7XG4gICAgY29uc3QgY29tcHV0ZWRfc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGlmIChjb21wdXRlZF9zdHlsZS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgfVxuICAgIGNvbnN0IGlmcmFtZSA9IGVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IGJsb2NrOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgJyArXG4gICAgICAgICdvdmVyZmxvdzogaGlkZGVuOyBib3JkZXI6IDA7IG9wYWNpdHk6IDA7IHBvaW50ZXItZXZlbnRzOiBub25lOyB6LWluZGV4OiAtMTsnKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgaWZyYW1lLnRhYkluZGV4ID0gLTE7XG4gICAgY29uc3QgY3Jvc3NvcmlnaW4gPSBpc19jcm9zc29yaWdpbigpO1xuICAgIGxldCB1bnN1YnNjcmliZTtcbiAgICBpZiAoY3Jvc3NvcmlnaW4pIHtcbiAgICAgICAgaWZyYW1lLnNyYyA9IFwiZGF0YTp0ZXh0L2h0bWwsPHNjcmlwdD5vbnJlc2l6ZT1mdW5jdGlvbigpe3BhcmVudC5wb3N0TWVzc2FnZSgwLCcqJyl9PC9zY3JpcHQ+XCI7XG4gICAgICAgIHVuc3Vic2NyaWJlID0gbGlzdGVuKHdpbmRvdywgJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGlmcmFtZS5jb250ZW50V2luZG93KVxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWZyYW1lLnNyYyA9ICdhYm91dDpibGFuayc7XG4gICAgICAgIGlmcmFtZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3RlbihpZnJhbWUuY29udGVudFdpbmRvdywgJ3Jlc2l6ZScsIGZuKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXBwZW5kKG5vZGUsIGlmcmFtZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKGNyb3Nzb3JpZ2luKSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVuc3Vic2NyaWJlICYmIGlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGRldGFjaChpZnJhbWUpO1xuICAgIH07XG59XG5mdW5jdGlvbiB0b2dnbGVfY2xhc3MoZWxlbWVudCwgbmFtZSwgdG9nZ2xlKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3RbdG9nZ2xlID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG59XG5mdW5jdGlvbiBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsLCBidWJibGVzID0gZmFsc2UpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgYnViYmxlcywgZmFsc2UsIGRldGFpbCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBxdWVyeV9zZWxlY3Rvcl9hbGwoc2VsZWN0b3IsIHBhcmVudCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuY2xhc3MgSHRtbFRhZyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZSA9IHRoaXMubiA9IG51bGw7XG4gICAgfVxuICAgIGMoaHRtbCkge1xuICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgfVxuICAgIG0oaHRtbCwgdGFyZ2V0LCBhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5lKSB7XG4gICAgICAgICAgICB0aGlzLmUgPSBlbGVtZW50KHRhcmdldC5ub2RlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmMoaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pKGFuY2hvcik7XG4gICAgfVxuICAgIGgoaHRtbCkge1xuICAgICAgICB0aGlzLmUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgdGhpcy5uID0gQXJyYXkuZnJvbSh0aGlzLmUuY2hpbGROb2Rlcyk7XG4gICAgfVxuICAgIGkoYW5jaG9yKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpbnNlcnQodGhpcy50LCB0aGlzLm5baV0sIGFuY2hvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcChodG1sKSB7XG4gICAgICAgIHRoaXMuZCgpO1xuICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgICAgIHRoaXMuaSh0aGlzLmEpO1xuICAgIH1cbiAgICBkKCkge1xuICAgICAgICB0aGlzLm4uZm9yRWFjaChkZXRhY2gpO1xuICAgIH1cbn1cbmNsYXNzIEh0bWxUYWdIeWRyYXRpb24gZXh0ZW5kcyBIdG1sVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihjbGFpbWVkX25vZGVzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZSA9IHRoaXMubiA9IG51bGw7XG4gICAgICAgIHRoaXMubCA9IGNsYWltZWRfbm9kZXM7XG4gICAgfVxuICAgIGMoaHRtbCkge1xuICAgICAgICBpZiAodGhpcy5sKSB7XG4gICAgICAgICAgICB0aGlzLm4gPSB0aGlzLmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdXBlci5jKGh0bWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGkoYW5jaG9yKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpbnNlcnRfaHlkcmF0aW9uKHRoaXMudCwgdGhpcy5uW2ldLCBhbmNob3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gYXR0cmlidXRlX3RvX29iamVjdChhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgYXR0cmlidXRlcykge1xuICAgICAgICByZXN1bHRbYXR0cmlidXRlLm5hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2V0X2N1c3RvbV9lbGVtZW50c19zbG90cyhlbGVtZW50KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgcmVzdWx0W25vZGUuc2xvdCB8fCAnZGVmYXVsdCddID0gdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBpbmZvcm1hdGlvbiBmb3IgbXVsdGlwbGUgZG9jdW1lbnRzIGJlY2F1c2UgYSBTdmVsdGUgYXBwbGljYXRpb24gY291bGQgYWxzbyBjb250YWluIGlmcmFtZXNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9zdmVsdGUvaXNzdWVzLzM2MjRcbmNvbnN0IG1hbmFnZWRfc3R5bGVzID0gbmV3IE1hcCgpO1xubGV0IGFjdGl2ZSA9IDA7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGFya3NreWFwcC9zdHJpbmctaGFzaC9ibG9iL21hc3Rlci9pbmRleC5qc1xuZnVuY3Rpb24gaGFzaChzdHIpIHtcbiAgICBsZXQgaGFzaCA9IDUzODE7XG4gICAgbGV0IGkgPSBzdHIubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSBeIHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBoYXNoID4+PiAwO1xufVxuZnVuY3Rpb24gY3JlYXRlX3N0eWxlX2luZm9ybWF0aW9uKGRvYywgbm9kZSkge1xuICAgIGNvbnN0IGluZm8gPSB7IHN0eWxlc2hlZXQ6IGFwcGVuZF9lbXB0eV9zdHlsZXNoZWV0KG5vZGUpLCBydWxlczoge30gfTtcbiAgICBtYW5hZ2VkX3N0eWxlcy5zZXQoZG9jLCBpbmZvKTtcbiAgICByZXR1cm4gaW5mbztcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9ydWxlKG5vZGUsIGEsIGIsIGR1cmF0aW9uLCBkZWxheSwgZWFzZSwgZm4sIHVpZCA9IDApIHtcbiAgICBjb25zdCBzdGVwID0gMTYuNjY2IC8gZHVyYXRpb247XG4gICAgbGV0IGtleWZyYW1lcyA9ICd7XFxuJztcbiAgICBmb3IgKGxldCBwID0gMDsgcCA8PSAxOyBwICs9IHN0ZXApIHtcbiAgICAgICAgY29uc3QgdCA9IGEgKyAoYiAtIGEpICogZWFzZShwKTtcbiAgICAgICAga2V5ZnJhbWVzICs9IHAgKiAxMDAgKyBgJXske2ZuKHQsIDEgLSB0KX19XFxuYDtcbiAgICB9XG4gICAgY29uc3QgcnVsZSA9IGtleWZyYW1lcyArIGAxMDAlIHske2ZuKGIsIDEgLSBiKX19XFxufWA7XG4gICAgY29uc3QgbmFtZSA9IGBfX3N2ZWx0ZV8ke2hhc2gocnVsZSl9XyR7dWlkfWA7XG4gICAgY29uc3QgZG9jID0gZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpO1xuICAgIGNvbnN0IHsgc3R5bGVzaGVldCwgcnVsZXMgfSA9IG1hbmFnZWRfc3R5bGVzLmdldChkb2MpIHx8IGNyZWF0ZV9zdHlsZV9pbmZvcm1hdGlvbihkb2MsIG5vZGUpO1xuICAgIGlmICghcnVsZXNbbmFtZV0pIHtcbiAgICAgICAgcnVsZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICBzdHlsZXNoZWV0Lmluc2VydFJ1bGUoYEBrZXlmcmFtZXMgJHtuYW1lfSAke3J1bGV9YCwgc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBhbmltYXRpb24gPSBub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJztcbiAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IGAke2FuaW1hdGlvbiA/IGAke2FuaW1hdGlvbn0sIGAgOiAnJ30ke25hbWV9ICR7ZHVyYXRpb259bXMgbGluZWFyICR7ZGVsYXl9bXMgMSBib3RoYDtcbiAgICBhY3RpdmUgKz0gMTtcbiAgICByZXR1cm4gbmFtZTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IChub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJykuc3BsaXQoJywgJyk7XG4gICAgY29uc3QgbmV4dCA9IHByZXZpb3VzLmZpbHRlcihuYW1lXG4gICAgICAgID8gYW5pbSA9PiBhbmltLmluZGV4T2YobmFtZSkgPCAwIC8vIHJlbW92ZSBzcGVjaWZpYyBhbmltYXRpb25cbiAgICAgICAgOiBhbmltID0+IGFuaW0uaW5kZXhPZignX19zdmVsdGUnKSA9PT0gLTEgLy8gcmVtb3ZlIGFsbCBTdmVsdGUgYW5pbWF0aW9uc1xuICAgICk7XG4gICAgY29uc3QgZGVsZXRlZCA9IHByZXZpb3VzLmxlbmd0aCAtIG5leHQubGVuZ3RoO1xuICAgIGlmIChkZWxldGVkKSB7XG4gICAgICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uID0gbmV4dC5qb2luKCcsICcpO1xuICAgICAgICBhY3RpdmUgLT0gZGVsZXRlZDtcbiAgICAgICAgaWYgKCFhY3RpdmUpXG4gICAgICAgICAgICBjbGVhcl9ydWxlcygpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNsZWFyX3J1bGVzKCkge1xuICAgIHJhZigoKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIG1hbmFnZWRfc3R5bGVzLmZvckVhY2goaW5mbyA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHN0eWxlc2hlZXQgfSA9IGluZm87XG4gICAgICAgICAgICBsZXQgaSA9IHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSlcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0LmRlbGV0ZVJ1bGUoaSk7XG4gICAgICAgICAgICBpbmZvLnJ1bGVzID0ge307XG4gICAgICAgIH0pO1xuICAgICAgICBtYW5hZ2VkX3N0eWxlcy5jbGVhcigpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVfYW5pbWF0aW9uKG5vZGUsIGZyb20sIGZuLCBwYXJhbXMpIHtcbiAgICBpZiAoIWZyb20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHRvID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoZnJvbS5sZWZ0ID09PSB0by5sZWZ0ICYmIGZyb20ucmlnaHQgPT09IHRvLnJpZ2h0ICYmIGZyb20udG9wID09PSB0by50b3AgJiYgZnJvbS5ib3R0b20gPT09IHRvLmJvdHRvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBzaG91bGQgdGhpcyBiZSBzZXBhcmF0ZWQgZnJvbSBkZXN0cnVjdHVyaW5nPyBPciBzdGFydC9lbmQgYWRkZWQgdG8gcHVibGljIGFwaSBhbmQgZG9jdW1lbnRhdGlvbj9cbiAgICBzdGFydDogc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzpcbiAgICBlbmQgPSBzdGFydF90aW1lICsgZHVyYXRpb24sIHRpY2sgPSBub29wLCBjc3MgfSA9IGZuKG5vZGUsIHsgZnJvbSwgdG8gfSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICBsZXQgbmFtZTtcbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBuYW1lKTtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgIGlmICghc3RhcnRlZCAmJiBub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQgJiYgbm93ID49IGVuZCkge1xuICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgY29uc3QgcCA9IG5vdyAtIHN0YXJ0X3RpbWU7XG4gICAgICAgICAgICBjb25zdCB0ID0gMCArIDEgKiBlYXNpbmcocCAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHN0YXJ0KCk7XG4gICAgdGljaygwLCAxKTtcbiAgICByZXR1cm4gc3RvcDtcbn1cbmZ1bmN0aW9uIGZpeF9wb3NpdGlvbihub2RlKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGlmIChzdHlsZS5wb3NpdGlvbiAhPT0gJ2Fic29sdXRlJyAmJiBzdHlsZS5wb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHN0eWxlO1xuICAgICAgICBjb25zdCBhID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgbm9kZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGFkZF90cmFuc2Zvcm0obm9kZSwgYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkX3RyYW5zZm9ybShub2RlLCBhKSB7XG4gICAgY29uc3QgYiA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGEubGVmdCAhPT0gYi5sZWZ0IHx8IGEudG9wICE9PSBiLnRvcCkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBzdHlsZS50cmFuc2Zvcm07XG4gICAgICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gYCR7dHJhbnNmb3JtfSB0cmFuc2xhdGUoJHthLmxlZnQgLSBiLmxlZnR9cHgsICR7YS50b3AgLSBiLnRvcH1weClgO1xuICAgIH1cbn1cblxubGV0IGN1cnJlbnRfY29tcG9uZW50O1xuZnVuY3Rpb24gc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgIGN1cnJlbnRfY29tcG9uZW50ID0gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkge1xuICAgIGlmICghY3VycmVudF9jb21wb25lbnQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gY2FsbGVkIG91dHNpZGUgY29tcG9uZW50IGluaXRpYWxpemF0aW9uJyk7XG4gICAgcmV0dXJuIGN1cnJlbnRfY29tcG9uZW50O1xufVxuZnVuY3Rpb24gYmVmb3JlVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYmVmb3JlX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uTW91bnQoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9tb3VudC5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFmdGVyVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYWZ0ZXJfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25EZXN0cm95KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fZGVzdHJveS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICByZXR1cm4gKHR5cGUsIGRldGFpbCkgPT4ge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW3R5cGVdO1xuICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAvLyBUT0RPIGFyZSB0aGVyZSBzaXR1YXRpb25zIHdoZXJlIGV2ZW50cyBjb3VsZCBiZSBkaXNwYXRjaGVkXG4gICAgICAgICAgICAvLyBpbiBhIHNlcnZlciAobm9uLURPTSkgZW52aXJvbm1lbnQ/XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IGN1c3RvbV9ldmVudCh0eXBlLCBkZXRhaWwpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjb21wb25lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNldENvbnRleHQoa2V5LCBjb250ZXh0KSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5zZXQoa2V5LCBjb250ZXh0KTtcbn1cbmZ1bmN0aW9uIGdldENvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuZ2V0KGtleSk7XG59XG5mdW5jdGlvbiBnZXRBbGxDb250ZXh0cygpIHtcbiAgICByZXR1cm4gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dDtcbn1cbmZ1bmN0aW9uIGhhc0NvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuaGFzKGtleSk7XG59XG4vLyBUT0RPIGZpZ3VyZSBvdXQgaWYgd2Ugc3RpbGwgd2FudCB0byBzdXBwb3J0XG4vLyBzaG9ydGhhbmQgZXZlbnRzLCBvciBpZiB3ZSB3YW50IHRvIGltcGxlbWVudFxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxuZnVuY3Rpb24gYnViYmxlKGNvbXBvbmVudCwgZXZlbnQpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW2V2ZW50LnR5cGVdO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IGZuLmNhbGwodGhpcywgZXZlbnQpKTtcbiAgICB9XG59XG5cbmNvbnN0IGRpcnR5X2NvbXBvbmVudHMgPSBbXTtcbmNvbnN0IGludHJvcyA9IHsgZW5hYmxlZDogZmFsc2UgfTtcbmNvbnN0IGJpbmRpbmdfY2FsbGJhY2tzID0gW107XG5jb25zdCByZW5kZXJfY2FsbGJhY2tzID0gW107XG5jb25zdCBmbHVzaF9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlc29sdmVkX3Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbmxldCB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG5mdW5jdGlvbiBzY2hlZHVsZV91cGRhdGUoKSB7XG4gICAgaWYgKCF1cGRhdGVfc2NoZWR1bGVkKSB7XG4gICAgICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlZF9wcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRpY2soKSB7XG4gICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgcmV0dXJuIHJlc29sdmVkX3Byb21pc2U7XG59XG5mdW5jdGlvbiBhZGRfcmVuZGVyX2NhbGxiYWNrKGZuKSB7XG4gICAgcmVuZGVyX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFkZF9mbHVzaF9jYWxsYmFjayhmbikge1xuICAgIGZsdXNoX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbi8vIGZsdXNoKCkgY2FsbHMgY2FsbGJhY2tzIGluIHRoaXMgb3JkZXI6XG4vLyAxLiBBbGwgYmVmb3JlVXBkYXRlIGNhbGxiYWNrcywgaW4gb3JkZXI6IHBhcmVudHMgYmVmb3JlIGNoaWxkcmVuXG4vLyAyLiBBbGwgYmluZDp0aGlzIGNhbGxiYWNrcywgaW4gcmV2ZXJzZSBvcmRlcjogY2hpbGRyZW4gYmVmb3JlIHBhcmVudHMuXG4vLyAzLiBBbGwgYWZ0ZXJVcGRhdGUgY2FsbGJhY2tzLCBpbiBvcmRlcjogcGFyZW50cyBiZWZvcmUgY2hpbGRyZW4uIEVYQ0VQVFxuLy8gICAgZm9yIGFmdGVyVXBkYXRlcyBjYWxsZWQgZHVyaW5nIHRoZSBpbml0aWFsIG9uTW91bnQsIHdoaWNoIGFyZSBjYWxsZWQgaW5cbi8vICAgIHJldmVyc2Ugb3JkZXI6IGNoaWxkcmVuIGJlZm9yZSBwYXJlbnRzLlxuLy8gU2luY2UgY2FsbGJhY2tzIG1pZ2h0IHVwZGF0ZSBjb21wb25lbnQgdmFsdWVzLCB3aGljaCBjb3VsZCB0cmlnZ2VyIGFub3RoZXJcbi8vIGNhbGwgdG8gZmx1c2goKSwgdGhlIGZvbGxvd2luZyBzdGVwcyBndWFyZCBhZ2FpbnN0IHRoaXM6XG4vLyAxLiBEdXJpbmcgYmVmb3JlVXBkYXRlLCBhbnkgdXBkYXRlZCBjb21wb25lbnRzIHdpbGwgYmUgYWRkZWQgdG8gdGhlXG4vLyAgICBkaXJ0eV9jb21wb25lbnRzIGFycmF5IGFuZCB3aWxsIGNhdXNlIGEgcmVlbnRyYW50IGNhbGwgdG8gZmx1c2goKS4gQmVjYXVzZVxuLy8gICAgdGhlIGZsdXNoIGluZGV4IGlzIGtlcHQgb3V0c2lkZSB0aGUgZnVuY3Rpb24sIHRoZSByZWVudHJhbnQgY2FsbCB3aWxsIHBpY2tcbi8vICAgIHVwIHdoZXJlIHRoZSBlYXJsaWVyIGNhbGwgbGVmdCBvZmYgYW5kIGdvIHRocm91Z2ggYWxsIGRpcnR5IGNvbXBvbmVudHMuIFRoZVxuLy8gICAgY3VycmVudF9jb21wb25lbnQgdmFsdWUgaXMgc2F2ZWQgYW5kIHJlc3RvcmVkIHNvIHRoYXQgdGhlIHJlZW50cmFudCBjYWxsIHdpbGxcbi8vICAgIG5vdCBpbnRlcmZlcmUgd2l0aCB0aGUgXCJwYXJlbnRcIiBmbHVzaCgpIGNhbGwuXG4vLyAyLiBiaW5kOnRoaXMgY2FsbGJhY2tzIGNhbm5vdCB0cmlnZ2VyIG5ldyBmbHVzaCgpIGNhbGxzLlxuLy8gMy4gRHVyaW5nIGFmdGVyVXBkYXRlLCBhbnkgdXBkYXRlZCBjb21wb25lbnRzIHdpbGwgTk9UIGhhdmUgdGhlaXIgYWZ0ZXJVcGRhdGVcbi8vICAgIGNhbGxiYWNrIGNhbGxlZCBhIHNlY29uZCB0aW1lOyB0aGUgc2Vlbl9jYWxsYmFja3Mgc2V0LCBvdXRzaWRlIHRoZSBmbHVzaCgpXG4vLyAgICBmdW5jdGlvbiwgZ3VhcmFudGVlcyB0aGlzIGJlaGF2aW9yLlxuY29uc3Qgc2Vlbl9jYWxsYmFja3MgPSBuZXcgU2V0KCk7XG5sZXQgZmx1c2hpZHggPSAwOyAvLyBEbyAqbm90KiBtb3ZlIHRoaXMgaW5zaWRlIHRoZSBmbHVzaCgpIGZ1bmN0aW9uXG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICBjb25zdCBzYXZlZF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcbiAgICBkbyB7XG4gICAgICAgIC8vIGZpcnN0LCBjYWxsIGJlZm9yZVVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgICAgLy8gYW5kIHVwZGF0ZSBjb21wb25lbnRzXG4gICAgICAgIHdoaWxlIChmbHVzaGlkeCA8IGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBkaXJ0eV9jb21wb25lbnRzW2ZsdXNoaWR4XTtcbiAgICAgICAgICAgIGZsdXNoaWR4Kys7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShjb21wb25lbnQuJCQpO1xuICAgICAgICB9XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5sZW5ndGggPSAwO1xuICAgICAgICBmbHVzaGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChiaW5kaW5nX2NhbGxiYWNrcy5sZW5ndGgpXG4gICAgICAgICAgICBiaW5kaW5nX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgICAgICAvLyB0aGVuLCBvbmNlIGNvbXBvbmVudHMgYXJlIHVwZGF0ZWQsIGNhbGxcbiAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxuICAgICAgICAvLyBzdWJzZXF1ZW50IHVwZGF0ZXMuLi5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoIXNlZW5fY2FsbGJhY2tzLmhhcyhjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAvLyAuLi5zbyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICAgICAgc2Vlbl9jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcl9jYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB9IHdoaWxlIChkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCk7XG4gICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZmx1c2hfY2FsbGJhY2tzLnBvcCgpKCk7XG4gICAgfVxuICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICBzZWVuX2NhbGxiYWNrcy5jbGVhcigpO1xuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChzYXZlZF9jb21wb25lbnQpO1xufVxuZnVuY3Rpb24gdXBkYXRlKCQkKSB7XG4gICAgaWYgKCQkLmZyYWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICQkLnVwZGF0ZSgpO1xuICAgICAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuICAgICAgICBjb25zdCBkaXJ0eSA9ICQkLmRpcnR5O1xuICAgICAgICAkJC5kaXJ0eSA9IFstMV07XG4gICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LnAoJCQuY3R4LCBkaXJ0eSk7XG4gICAgICAgICQkLmFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xuICAgIH1cbn1cblxubGV0IHByb21pc2U7XG5mdW5jdGlvbiB3YWl0KCkge1xuICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2gobm9kZSwgZGlyZWN0aW9uLCBraW5kKSB7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudChgJHtkaXJlY3Rpb24gPyAnaW50cm8nIDogJ291dHJvJ30ke2tpbmR9YCkpO1xufVxuY29uc3Qgb3V0cm9pbmcgPSBuZXcgU2V0KCk7XG5sZXQgb3V0cm9zO1xuZnVuY3Rpb24gZ3JvdXBfb3V0cm9zKCkge1xuICAgIG91dHJvcyA9IHtcbiAgICAgICAgcjogMCxcbiAgICAgICAgYzogW10sXG4gICAgICAgIHA6IG91dHJvcyAvLyBwYXJlbnQgZ3JvdXBcbiAgICB9O1xufVxuZnVuY3Rpb24gY2hlY2tfb3V0cm9zKCkge1xuICAgIGlmICghb3V0cm9zLnIpIHtcbiAgICAgICAgcnVuX2FsbChvdXRyb3MuYyk7XG4gICAgfVxuICAgIG91dHJvcyA9IG91dHJvcy5wO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9pbihibG9jaywgbG9jYWwpIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2suaSkge1xuICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICBibG9jay5pKGxvY2FsKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX291dChibG9jaywgbG9jYWwsIGRldGFjaCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2subykge1xuICAgICAgICBpZiAob3V0cm9pbmcuaGFzKGJsb2NrKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb3V0cm9pbmcuYWRkKGJsb2NrKTtcbiAgICAgICAgb3V0cm9zLmMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRldGFjaClcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZCgxKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYmxvY2subyhsb2NhbCk7XG4gICAgfVxufVxuY29uc3QgbnVsbF90cmFuc2l0aW9uID0geyBkdXJhdGlvbjogMCB9O1xuZnVuY3Rpb24gY3JlYXRlX2luX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGxldCB0YXNrO1xuICAgIGxldCB1aWQgPSAwO1xuICAgIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MsIHVpZCsrKTtcbiAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBpZiAodGFzaylcbiAgICAgICAgICAgIHRhc2suYWJvcnQoKTtcbiAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ3N0YXJ0JykpO1xuICAgICAgICB0YXNrID0gbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHRydWUsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydCgpIHtcbiAgICAgICAgICAgIGlmIChzdGFydGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSk7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKGdvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWRhdGUoKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfb3V0X3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgY29uc3QgZ3JvdXAgPSBvdXRyb3M7XG4gICAgZ3JvdXAuciArPSAxO1xuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAxLCAwLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGZhbHNlLCAnc3RhcnQnKSk7XG4gICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tZ3JvdXAucikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB3aWxsIHJlc3VsdCBpbiBgZW5kKClgIGJlaW5nIGNhbGxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGRvbid0IG5lZWQgdG8gY2xlYW4gdXAgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxIC0gdCwgdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgIGdvKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ28oKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW5kKHJlc2V0KSB7XG4gICAgICAgICAgICBpZiAocmVzZXQgJiYgY29uZmlnLnRpY2spIHtcbiAgICAgICAgICAgICAgICBjb25maWcudGljaygxLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcywgaW50cm8pIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgdCA9IGludHJvID8gMCA6IDE7XG4gICAgbGV0IHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lID0gbnVsbDtcbiAgICBmdW5jdGlvbiBjbGVhcl9hbmltYXRpb24oKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdChwcm9ncmFtLCBkdXJhdGlvbikge1xuICAgICAgICBjb25zdCBkID0gKHByb2dyYW0uYiAtIHQpO1xuICAgICAgICBkdXJhdGlvbiAqPSBNYXRoLmFicyhkKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGE6IHQsXG4gICAgICAgICAgICBiOiBwcm9ncmFtLmIsXG4gICAgICAgICAgICBkLFxuICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICBzdGFydDogcHJvZ3JhbS5zdGFydCxcbiAgICAgICAgICAgIGVuZDogcHJvZ3JhbS5zdGFydCArIGR1cmF0aW9uLFxuICAgICAgICAgICAgZ3JvdXA6IHByb2dyYW0uZ3JvdXBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oYikge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBjb25zdCBwcm9ncmFtID0ge1xuICAgICAgICAgICAgc3RhcnQ6IG5vdygpICsgZGVsYXksXG4gICAgICAgICAgICBiXG4gICAgICAgIH07XG4gICAgICAgIGlmICghYikge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgIHByb2dyYW0uZ3JvdXAgPSBvdXRyb3M7XG4gICAgICAgICAgICBvdXRyb3MuciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0gfHwgcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhbiBpbnRybywgYW5kIHRoZXJlJ3MgYSBkZWxheSwgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgLy8gYW4gaW5pdGlhbCB0aWNrIGFuZC9vciBhcHBseSBDU1MgYW5pbWF0aW9uIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiKVxuICAgICAgICAgICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHByb2dyYW0sIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgYiwgJ3N0YXJ0JykpO1xuICAgICAgICAgICAgbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nX3Byb2dyYW0gJiYgbm93ID4gcGVuZGluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IGluaXQocGVuZGluZ19wcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHJ1bm5pbmdfcHJvZ3JhbS5iLCAnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIHQsIHJ1bm5pbmdfcHJvZ3JhbS5iLCBydW5uaW5nX3Byb2dyYW0uZHVyYXRpb24sIDAsIGVhc2luZywgY29uZmlnLmNzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm93ID49IHJ1bm5pbmdfcHJvZ3JhbS5lbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCA9IHJ1bm5pbmdfcHJvZ3JhbS5iLCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwZW5kaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBkb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbS5iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGludHJvIFx1MjAxNCB3ZSBjYW4gdGlkeSB1cCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG91dHJvIFx1MjAxNCBuZWVkcyB0byBiZSBjb29yZGluYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIS0tcnVubmluZ19wcm9ncmFtLmdyb3VwLnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5fYWxsKHJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBydW5uaW5nX3Byb2dyYW0uc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gcnVubmluZ19wcm9ncmFtLmEgKyBydW5uaW5nX3Byb2dyYW0uZCAqIGVhc2luZyhwIC8gcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhIShydW5uaW5nX3Byb2dyYW0gfHwgcGVuZGluZ19wcm9ncmFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJ1bihiKSB7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbyhiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW5kKCkge1xuICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX3Byb21pc2UocHJvbWlzZSwgaW5mbykge1xuICAgIGNvbnN0IHRva2VuID0gaW5mby50b2tlbiA9IHt9O1xuICAgIGZ1bmN0aW9uIHVwZGF0ZSh0eXBlLCBpbmRleCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoaW5mby50b2tlbiAhPT0gdG9rZW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSB2YWx1ZTtcbiAgICAgICAgbGV0IGNoaWxkX2N0eCA9IGluZm8uY3R4O1xuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoaWxkX2N0eCA9IGNoaWxkX2N0eC5zbGljZSgpO1xuICAgICAgICAgICAgY2hpbGRfY3R4W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBibG9jayA9IHR5cGUgJiYgKGluZm8uY3VycmVudCA9IHR5cGUpKGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBuZWVkc19mbHVzaCA9IGZhbHNlO1xuICAgICAgICBpZiAoaW5mby5ibG9jaykge1xuICAgICAgICAgICAgaWYgKGluZm8uYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgaW5mby5ibG9ja3MuZm9yRWFjaCgoYmxvY2ssIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IGluZGV4ICYmIGJsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cF9vdXRyb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8uYmxvY2tzW2ldID09PSBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmJsb2Nrc1tpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja19vdXRyb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5mby5ibG9jay5kKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICAgICAgdHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG4gICAgICAgICAgICBibG9jay5tKGluZm8ubW91bnQoKSwgaW5mby5hbmNob3IpO1xuICAgICAgICAgICAgbmVlZHNfZmx1c2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8uYmxvY2sgPSBibG9jaztcbiAgICAgICAgaWYgKGluZm8uYmxvY2tzKVxuICAgICAgICAgICAgaW5mby5ibG9ja3NbaW5kZXhdID0gYmxvY2s7XG4gICAgICAgIGlmIChuZWVkc19mbHVzaCkge1xuICAgICAgICAgICAgZmx1c2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNfcHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICBjb25zdCBjdXJyZW50X2NvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudCgpO1xuICAgICAgICBwcm9taXNlLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLmNhdGNoLCAyLCBpbmZvLmVycm9yLCBlcnJvcik7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgICAgICBpZiAoIWluZm8uaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlmIHdlIHByZXZpb3VzbHkgaGFkIGEgdGhlbi9jYXRjaCBibG9jaywgZGVzdHJveSBpdFxuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnBlbmRpbmcpIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnBlbmRpbmcsIDApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8udGhlbikge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLnJlc29sdmVkID0gcHJvbWlzZTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVfYXdhaXRfYmxvY2tfYnJhbmNoKGluZm8sIGN0eCwgZGlydHkpIHtcbiAgICBjb25zdCBjaGlsZF9jdHggPSBjdHguc2xpY2UoKTtcbiAgICBjb25zdCB7IHJlc29sdmVkIH0gPSBpbmZvO1xuICAgIGlmIChpbmZvLmN1cnJlbnQgPT09IGluZm8udGhlbikge1xuICAgICAgICBjaGlsZF9jdHhbaW5mby52YWx1ZV0gPSByZXNvbHZlZDtcbiAgICB9XG4gICAgaWYgKGluZm8uY3VycmVudCA9PT0gaW5mby5jYXRjaCkge1xuICAgICAgICBjaGlsZF9jdHhbaW5mby5lcnJvcl0gPSByZXNvbHZlZDtcbiAgICB9XG4gICAgaW5mby5ibG9jay5wKGNoaWxkX2N0eCwgZGlydHkpO1xufVxuXG5jb25zdCBnbG9iYWxzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgPyB3aW5kb3dcbiAgICA6IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IGdsb2JhbFRoaXNcbiAgICAgICAgOiBnbG9iYWwpO1xuXG5mdW5jdGlvbiBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5kKDEpO1xuICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbn1cbmZ1bmN0aW9uIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gdXBkYXRlX2tleWVkX2VhY2gob2xkX2Jsb2NrcywgZGlydHksIGdldF9rZXksIGR5bmFtaWMsIGN0eCwgbGlzdCwgbG9va3VwLCBub2RlLCBkZXN0cm95LCBjcmVhdGVfZWFjaF9ibG9jaywgbmV4dCwgZ2V0X2NvbnRleHQpIHtcbiAgICBsZXQgbyA9IG9sZF9ibG9ja3MubGVuZ3RoO1xuICAgIGxldCBuID0gbGlzdC5sZW5ndGg7XG4gICAgbGV0IGkgPSBvO1xuICAgIGNvbnN0IG9sZF9pbmRleGVzID0ge307XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgb2xkX2luZGV4ZXNbb2xkX2Jsb2Nrc1tpXS5rZXldID0gaTtcbiAgICBjb25zdCBuZXdfYmxvY2tzID0gW107XG4gICAgY29uc3QgbmV3X2xvb2t1cCA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBkZWx0YXMgPSBuZXcgTWFwKCk7XG4gICAgaSA9IG47XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb25zdCBjaGlsZF9jdHggPSBnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpO1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBibG9jayA9IGxvb2t1cC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKCFibG9jaykge1xuICAgICAgICAgICAgYmxvY2sgPSBjcmVhdGVfZWFjaF9ibG9jayhrZXksIGNoaWxkX2N0eCk7XG4gICAgICAgICAgICBibG9jay5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZHluYW1pYykge1xuICAgICAgICAgICAgYmxvY2sucChjaGlsZF9jdHgsIGRpcnR5KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdfbG9va3VwLnNldChrZXksIG5ld19ibG9ja3NbaV0gPSBibG9jayk7XG4gICAgICAgIGlmIChrZXkgaW4gb2xkX2luZGV4ZXMpXG4gICAgICAgICAgICBkZWx0YXMuc2V0KGtleSwgTWF0aC5hYnMoaSAtIG9sZF9pbmRleGVzW2tleV0pKTtcbiAgICB9XG4gICAgY29uc3Qgd2lsbF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGRpZF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGZ1bmN0aW9uIGluc2VydChibG9jaykge1xuICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgYmxvY2subShub2RlLCBuZXh0KTtcbiAgICAgICAgbG9va3VwLnNldChibG9jay5rZXksIGJsb2NrKTtcbiAgICAgICAgbmV4dCA9IGJsb2NrLmZpcnN0O1xuICAgICAgICBuLS07XG4gICAgfVxuICAgIHdoaWxlIChvICYmIG4pIHtcbiAgICAgICAgY29uc3QgbmV3X2Jsb2NrID0gbmV3X2Jsb2Nrc1tuIC0gMV07XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3NbbyAtIDFdO1xuICAgICAgICBjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcbiAgICAgICAgY29uc3Qgb2xkX2tleSA9IG9sZF9ibG9jay5rZXk7XG4gICAgICAgIGlmIChuZXdfYmxvY2sgPT09IG9sZF9ibG9jaykge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgbmV4dCA9IG5ld19ibG9jay5maXJzdDtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgICAgIG4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgYmxvY2tcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFsb29rdXAuaGFzKG5ld19rZXkpIHx8IHdpbGxfbW92ZS5oYXMobmV3X2tleSkpIHtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpZF9tb3ZlLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlbHRhcy5nZXQobmV3X2tleSkgPiBkZWx0YXMuZ2V0KG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBkaWRfbW92ZS5hZGQobmV3X2tleSk7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbGxfbW92ZS5hZGQob2xkX2tleSk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKG8tLSkge1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW29dO1xuICAgICAgICBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKVxuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgfVxuICAgIHdoaWxlIChuKVxuICAgICAgICBpbnNlcnQobmV3X2Jsb2Nrc1tuIC0gMV0pO1xuICAgIHJldHVybiBuZXdfYmxvY2tzO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9rZXlzKGN0eCwgbGlzdCwgZ2V0X2NvbnRleHQsIGdldF9rZXkpIHtcbiAgICBjb25zdCBrZXlzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSkpO1xuICAgICAgICBpZiAoa2V5cy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaGF2ZSBkdXBsaWNhdGUga2V5cyBpbiBhIGtleWVkIGVhY2gnKTtcbiAgICAgICAgfVxuICAgICAgICBrZXlzLmFkZChrZXkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0X3NwcmVhZF91cGRhdGUobGV2ZWxzLCB1cGRhdGVzKSB7XG4gICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgY29uc3QgdG9fbnVsbF9vdXQgPSB7fTtcbiAgICBjb25zdCBhY2NvdW50ZWRfZm9yID0geyAkJHNjb3BlOiAxIH07XG4gICAgbGV0IGkgPSBsZXZlbHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgbyA9IGxldmVsc1tpXTtcbiAgICAgICAgY29uc3QgbiA9IHVwZGF0ZXNbaV07XG4gICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIG4pKVxuICAgICAgICAgICAgICAgICAgICB0b19udWxsX291dFtrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY291bnRlZF9mb3Jba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVba2V5XSA9IG5ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbHNbaV0gPSBuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9fbnVsbF9vdXQpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHVwZGF0ZSkpXG4gICAgICAgICAgICB1cGRhdGVba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZTtcbn1cbmZ1bmN0aW9uIGdldF9zcHJlYWRfb2JqZWN0KHNwcmVhZF9wcm9wcykge1xuICAgIHJldHVybiB0eXBlb2Ygc3ByZWFkX3Byb3BzID09PSAnb2JqZWN0JyAmJiBzcHJlYWRfcHJvcHMgIT09IG51bGwgPyBzcHJlYWRfcHJvcHMgOiB7fTtcbn1cblxuLy8gc291cmNlOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWxcbmNvbnN0IGJvb2xlYW5fYXR0cmlidXRlcyA9IG5ldyBTZXQoW1xuICAgICdhbGxvd2Z1bGxzY3JlZW4nLFxuICAgICdhbGxvd3BheW1lbnRyZXF1ZXN0JyxcbiAgICAnYXN5bmMnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdhdXRvcGxheScsXG4gICAgJ2NoZWNrZWQnLFxuICAgICdjb250cm9scycsXG4gICAgJ2RlZmF1bHQnLFxuICAgICdkZWZlcicsXG4gICAgJ2Rpc2FibGVkJyxcbiAgICAnZm9ybW5vdmFsaWRhdGUnLFxuICAgICdoaWRkZW4nLFxuICAgICdpc21hcCcsXG4gICAgJ2xvb3AnLFxuICAgICdtdWx0aXBsZScsXG4gICAgJ211dGVkJyxcbiAgICAnbm9tb2R1bGUnLFxuICAgICdub3ZhbGlkYXRlJyxcbiAgICAnb3BlbicsXG4gICAgJ3BsYXlzaW5saW5lJyxcbiAgICAncmVhZG9ubHknLFxuICAgICdyZXF1aXJlZCcsXG4gICAgJ3JldmVyc2VkJyxcbiAgICAnc2VsZWN0ZWQnXG5dKTtcblxuY29uc3QgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIgPSAvW1xccydcIj4vPVxcdXtGREQwfS1cXHV7RkRFRn1cXHV7RkZGRX1cXHV7RkZGRn1cXHV7MUZGRkV9XFx1ezFGRkZGfVxcdXsyRkZGRX1cXHV7MkZGRkZ9XFx1ezNGRkZFfVxcdXszRkZGRn1cXHV7NEZGRkV9XFx1ezRGRkZGfVxcdXs1RkZGRX1cXHV7NUZGRkZ9XFx1ezZGRkZFfVxcdXs2RkZGRn1cXHV7N0ZGRkV9XFx1ezdGRkZGfVxcdXs4RkZGRX1cXHV7OEZGRkZ9XFx1ezlGRkZFfVxcdXs5RkZGRn1cXHV7QUZGRkV9XFx1e0FGRkZGfVxcdXtCRkZGRX1cXHV7QkZGRkZ9XFx1e0NGRkZFfVxcdXtDRkZGRn1cXHV7REZGRkV9XFx1e0RGRkZGfVxcdXtFRkZGRX1cXHV7RUZGRkZ9XFx1e0ZGRkZFfVxcdXtGRkZGRn1cXHV7MTBGRkZFfVxcdXsxMEZGRkZ9XS91O1xuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jbm9uY2hhcmFjdGVyXG5mdW5jdGlvbiBzcHJlYWQoYXJncywgYXR0cnNfdG9fYWRkKSB7XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sIC4uLmFyZ3MpO1xuICAgIGlmIChhdHRyc190b19hZGQpIHtcbiAgICAgICAgY29uc3QgY2xhc3Nlc190b19hZGQgPSBhdHRyc190b19hZGQuY2xhc3NlcztcbiAgICAgICAgY29uc3Qgc3R5bGVzX3RvX2FkZCA9IGF0dHJzX3RvX2FkZC5zdHlsZXM7XG4gICAgICAgIGlmIChjbGFzc2VzX3RvX2FkZCkge1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMuY2xhc3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgPSBjbGFzc2VzX3RvX2FkZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgKz0gJyAnICsgY2xhc3Nlc190b19hZGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0eWxlc190b19hZGQpIHtcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLnN0eWxlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnN0eWxlID0gc3R5bGVfb2JqZWN0X3RvX3N0cmluZyhzdHlsZXNfdG9fYWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMuc3R5bGUgPSBzdHlsZV9vYmplY3RfdG9fc3RyaW5nKG1lcmdlX3Nzcl9zdHlsZXMoYXR0cmlidXRlcy5zdHlsZSwgc3R5bGVzX3RvX2FkZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdHIgPSAnJztcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICBpZiAoaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIudGVzdChuYW1lKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVzW25hbWVdO1xuICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpXG4gICAgICAgICAgICBzdHIgKz0gJyAnICsgbmFtZTtcbiAgICAgICAgZWxzZSBpZiAoYm9vbGVhbl9hdHRyaWJ1dGVzLmhhcyhuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUpXG4gICAgICAgICAgICAgICAgc3RyICs9ICcgJyArIG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3RyICs9IGAgJHtuYW1lfT1cIiR7dmFsdWV9XCJgO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0cjtcbn1cbmZ1bmN0aW9uIG1lcmdlX3Nzcl9zdHlsZXMoc3R5bGVfYXR0cmlidXRlLCBzdHlsZV9kaXJlY3RpdmUpIHtcbiAgICBjb25zdCBzdHlsZV9vYmplY3QgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGluZGl2aWR1YWxfc3R5bGUgb2Ygc3R5bGVfYXR0cmlidXRlLnNwbGl0KCc7JykpIHtcbiAgICAgICAgY29uc3QgY29sb25faW5kZXggPSBpbmRpdmlkdWFsX3N0eWxlLmluZGV4T2YoJzonKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IGluZGl2aWR1YWxfc3R5bGUuc2xpY2UoMCwgY29sb25faW5kZXgpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBpbmRpdmlkdWFsX3N0eWxlLnNsaWNlKGNvbG9uX2luZGV4ICsgMSkudHJpbSgpO1xuICAgICAgICBpZiAoIW5hbWUpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgc3R5bGVfb2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgfVxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBzdHlsZV9kaXJlY3RpdmUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBzdHlsZV9kaXJlY3RpdmVbbmFtZV07XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgc3R5bGVfb2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgc3R5bGVfb2JqZWN0W25hbWVdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZV9vYmplY3Q7XG59XG5jb25zdCBlc2NhcGVkID0ge1xuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7J1xufTtcbmZ1bmN0aW9uIGVzY2FwZShodG1sKSB7XG4gICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC9bXCInJjw+XS9nLCBtYXRjaCA9PiBlc2NhcGVkW21hdGNoXSk7XG59XG5mdW5jdGlvbiBlc2NhcGVfYXR0cmlidXRlX3ZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBlc2NhcGUodmFsdWUpIDogdmFsdWU7XG59XG5mdW5jdGlvbiBlc2NhcGVfb2JqZWN0KG9iaikge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICByZXN1bHRba2V5XSA9IGVzY2FwZV9hdHRyaWJ1dGVfdmFsdWUob2JqW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZWFjaChpdGVtcywgZm4pIHtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzdHIgKz0gZm4oaXRlbXNbaV0sIGkpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuY29uc3QgbWlzc2luZ19jb21wb25lbnQgPSB7XG4gICAgJCRyZW5kZXI6ICgpID0+ICcnXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVfY29tcG9uZW50KGNvbXBvbmVudCwgbmFtZSkge1xuICAgIGlmICghY29tcG9uZW50IHx8ICFjb21wb25lbnQuJCRyZW5kZXIpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09ICdzdmVsdGU6Y29tcG9uZW50JylcbiAgICAgICAgICAgIG5hbWUgKz0gJyB0aGlzPXsuLi59JztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGA8JHtuYW1lfT4gaXMgbm90IGEgdmFsaWQgU1NSIGNvbXBvbmVudC4gWW91IG1heSBuZWVkIHRvIHJldmlldyB5b3VyIGJ1aWxkIGNvbmZpZyB0byBlbnN1cmUgdGhhdCBkZXBlbmRlbmNpZXMgYXJlIGNvbXBpbGVkLCByYXRoZXIgdGhhbiBpbXBvcnRlZCBhcyBwcmUtY29tcGlsZWQgbW9kdWxlc2ApO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZGVidWcoZmlsZSwgbGluZSwgY29sdW1uLCB2YWx1ZXMpIHtcbiAgICBjb25zb2xlLmxvZyhge0BkZWJ1Z30gJHtmaWxlID8gZmlsZSArICcgJyA6ICcnfSgke2xpbmV9OiR7Y29sdW1ufSlgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2codmFsdWVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgcmV0dXJuICcnO1xufVxubGV0IG9uX2Rlc3Ryb3k7XG5mdW5jdGlvbiBjcmVhdGVfc3NyX2NvbXBvbmVudChmbikge1xuICAgIGZ1bmN0aW9uICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cywgY29udGV4dCkge1xuICAgICAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgICAgIGNvbnN0ICQkID0ge1xuICAgICAgICAgICAgb25fZGVzdHJveSxcbiAgICAgICAgICAgIGNvbnRleHQ6IG5ldyBNYXAoY29udGV4dCB8fCAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSksXG4gICAgICAgICAgICAvLyB0aGVzZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGRpc2NhcmRlZFxuICAgICAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKVxuICAgICAgICB9O1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoeyAkJCB9KTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGZuKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cyk7XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlcjogKHByb3BzID0ge30sIHsgJCRzbG90cyA9IHt9LCBjb250ZXh0ID0gbmV3IE1hcCgpIH0gPSB7fSkgPT4ge1xuICAgICAgICAgICAgb25fZGVzdHJveSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyB0aXRsZTogJycsIGhlYWQ6ICcnLCBjc3M6IG5ldyBTZXQoKSB9O1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9ICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIHt9LCAkJHNsb3RzLCBjb250ZXh0KTtcbiAgICAgICAgICAgIHJ1bl9hbGwob25fZGVzdHJveSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGh0bWwsXG4gICAgICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IEFycmF5LmZyb20ocmVzdWx0LmNzcykubWFwKGNzcyA9PiBjc3MuY29kZSkuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogbnVsbCAvLyBUT0RPXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkOiByZXN1bHQudGl0bGUgKyByZXN1bHQuaGVhZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgJCRyZW5kZXJcbiAgICB9O1xufVxuZnVuY3Rpb24gYWRkX2F0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IChib29sZWFuICYmICF2YWx1ZSkpXG4gICAgICAgIHJldHVybiAnJztcbiAgICByZXR1cm4gYCAke25hbWV9JHt2YWx1ZSA9PT0gdHJ1ZSAmJiBib29sZWFuX2F0dHJpYnV0ZXMuaGFzKG5hbWUpID8gJycgOiBgPSR7dHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IEpTT04uc3RyaW5naWZ5KGVzY2FwZSh2YWx1ZSkpIDogYFwiJHt2YWx1ZX1cImB9YH1gO1xufVxuZnVuY3Rpb24gYWRkX2NsYXNzZXMoY2xhc3Nlcykge1xuICAgIHJldHVybiBjbGFzc2VzID8gYCBjbGFzcz1cIiR7Y2xhc3Nlc31cImAgOiAnJztcbn1cbmZ1bmN0aW9uIHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVfb2JqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHN0eWxlX29iamVjdClcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gc3R5bGVfb2JqZWN0W2tleV0pXG4gICAgICAgIC5tYXAoa2V5ID0+IGAke2tleX06ICR7c3R5bGVfb2JqZWN0W2tleV19O2ApXG4gICAgICAgIC5qb2luKCcgJyk7XG59XG5mdW5jdGlvbiBhZGRfc3R5bGVzKHN0eWxlX29iamVjdCkge1xuICAgIGNvbnN0IHN0eWxlcyA9IHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVfb2JqZWN0KTtcbiAgICByZXR1cm4gc3R5bGVzID8gYCBzdHlsZT1cIiR7c3R5bGVzfVwiYCA6ICcnO1xufVxuXG5mdW5jdGlvbiBiaW5kKGNvbXBvbmVudCwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpbmRleCA9IGNvbXBvbmVudC4kJC5wcm9wc1tuYW1lXTtcbiAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb21wb25lbnQuJCQuYm91bmRbaW5kZXhdID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrKGNvbXBvbmVudC4kJC5jdHhbaW5kZXhdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVfY29tcG9uZW50KGJsb2NrKSB7XG4gICAgYmxvY2sgJiYgYmxvY2suYygpO1xufVxuZnVuY3Rpb24gY2xhaW1fY29tcG9uZW50KGJsb2NrLCBwYXJlbnRfbm9kZXMpIHtcbiAgICBibG9jayAmJiBibG9jay5sKHBhcmVudF9ub2Rlcyk7XG59XG5mdW5jdGlvbiBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCB0YXJnZXQsIGFuY2hvciwgY3VzdG9tRWxlbWVudCkge1xuICAgIGNvbnN0IHsgZnJhZ21lbnQsIG9uX21vdW50LCBvbl9kZXN0cm95LCBhZnRlcl91cGRhdGUgfSA9IGNvbXBvbmVudC4kJDtcbiAgICBmcmFnbWVudCAmJiBmcmFnbWVudC5tKHRhcmdldCwgYW5jaG9yKTtcbiAgICBpZiAoIWN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgLy8gb25Nb3VudCBoYXBwZW5zIGJlZm9yZSB0aGUgaW5pdGlhbCBhZnRlclVwZGF0ZVxuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld19vbl9kZXN0cm95ID0gb25fbW91bnQubWFwKHJ1bikuZmlsdGVyKGlzX2Z1bmN0aW9uKTtcbiAgICAgICAgICAgIGlmIChvbl9kZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgb25fZGVzdHJveS5wdXNoKC4uLm5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEVkZ2UgY2FzZSAtIGNvbXBvbmVudCB3YXMgZGVzdHJveWVkIGltbWVkaWF0ZWx5LFxuICAgICAgICAgICAgICAgIC8vIG1vc3QgbGlrZWx5IGFzIGEgcmVzdWx0IG9mIGEgYmluZGluZyBpbml0aWFsaXNpbmdcbiAgICAgICAgICAgICAgICBydW5fYWxsKG5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvbmVudC4kJC5vbl9tb3VudCA9IFtdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2NvbXBvbmVudChjb21wb25lbnQsIGRldGFjaGluZykge1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkO1xuICAgIGlmICgkJC5mcmFnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBydW5fYWxsKCQkLm9uX2Rlc3Ryb3kpO1xuICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5kKGRldGFjaGluZyk7XG4gICAgICAgIC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgZmluYWwgc3RhdGU/KVxuICAgICAgICAkJC5vbl9kZXN0cm95ID0gJCQuZnJhZ21lbnQgPSBudWxsO1xuICAgICAgICAkJC5jdHggPSBbXTtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwgaSkge1xuICAgIGlmIChjb21wb25lbnQuJCQuZGlydHlbMF0gPT09IC0xKSB7XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICAgICAgY29tcG9uZW50LiQkLmRpcnR5LmZpbGwoMCk7XG4gICAgfVxuICAgIGNvbXBvbmVudC4kJC5kaXJ0eVsoaSAvIDMxKSB8IDBdIHw9ICgxIDw8IChpICUgMzEpKTtcbn1cbmZ1bmN0aW9uIGluaXQoY29tcG9uZW50LCBvcHRpb25zLCBpbnN0YW5jZSwgY3JlYXRlX2ZyYWdtZW50LCBub3RfZXF1YWwsIHByb3BzLCBhcHBlbmRfc3R5bGVzLCBkaXJ0eSA9IFstMV0pIHtcbiAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgY29uc3QgJCQgPSBjb21wb25lbnQuJCQgPSB7XG4gICAgICAgIGZyYWdtZW50OiBudWxsLFxuICAgICAgICBjdHg6IG51bGwsXG4gICAgICAgIC8vIHN0YXRlXG4gICAgICAgIHByb3BzLFxuICAgICAgICB1cGRhdGU6IG5vb3AsXG4gICAgICAgIG5vdF9lcXVhbCxcbiAgICAgICAgYm91bmQ6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICAvLyBsaWZlY3ljbGVcbiAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICBvbl9kZXN0cm95OiBbXSxcbiAgICAgICAgb25fZGlzY29ubmVjdDogW10sXG4gICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICBjb250ZXh0OiBuZXcgTWFwKG9wdGlvbnMuY29udGV4dCB8fCAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSksXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICBkaXJ0eSxcbiAgICAgICAgc2tpcF9ib3VuZDogZmFsc2UsXG4gICAgICAgIHJvb3Q6IG9wdGlvbnMudGFyZ2V0IHx8IHBhcmVudF9jb21wb25lbnQuJCQucm9vdFxuICAgIH07XG4gICAgYXBwZW5kX3N0eWxlcyAmJiBhcHBlbmRfc3R5bGVzKCQkLnJvb3QpO1xuICAgIGxldCByZWFkeSA9IGZhbHNlO1xuICAgICQkLmN0eCA9IGluc3RhbmNlXG4gICAgICAgID8gaW5zdGFuY2UoY29tcG9uZW50LCBvcHRpb25zLnByb3BzIHx8IHt9LCAoaSwgcmV0LCAuLi5yZXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJlc3QubGVuZ3RoID8gcmVzdFswXSA6IHJldDtcbiAgICAgICAgICAgIGlmICgkJC5jdHggJiYgbm90X2VxdWFsKCQkLmN0eFtpXSwgJCQuY3R4W2ldID0gdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEkJC5za2lwX2JvdW5kICYmICQkLmJvdW5kW2ldKVxuICAgICAgICAgICAgICAgICAgICAkJC5ib3VuZFtpXSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWR5KVxuICAgICAgICAgICAgICAgICAgICBtYWtlX2RpcnR5KGNvbXBvbmVudCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9KVxuICAgICAgICA6IFtdO1xuICAgICQkLnVwZGF0ZSgpO1xuICAgIHJlYWR5ID0gdHJ1ZTtcbiAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuICAgIC8vIGBmYWxzZWAgYXMgYSBzcGVjaWFsIGNhc2Ugb2Ygbm8gRE9NIGNvbXBvbmVudFxuICAgICQkLmZyYWdtZW50ID0gY3JlYXRlX2ZyYWdtZW50ID8gY3JlYXRlX2ZyYWdtZW50KCQkLmN0eCkgOiBmYWxzZTtcbiAgICBpZiAob3B0aW9ucy50YXJnZXQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaHlkcmF0ZSkge1xuICAgICAgICAgICAgc3RhcnRfaHlkcmF0aW5nKCk7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IGNoaWxkcmVuKG9wdGlvbnMudGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5sKG5vZGVzKTtcbiAgICAgICAgICAgIG5vZGVzLmZvckVhY2goZGV0YWNoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaW50cm8pXG4gICAgICAgICAgICB0cmFuc2l0aW9uX2luKGNvbXBvbmVudC4kJC5mcmFnbWVudCk7XG4gICAgICAgIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIG9wdGlvbnMudGFyZ2V0LCBvcHRpb25zLmFuY2hvciwgb3B0aW9ucy5jdXN0b21FbGVtZW50KTtcbiAgICAgICAgZW5kX2h5ZHJhdGluZygpO1xuICAgICAgICBmbHVzaCgpO1xuICAgIH1cbiAgICBzZXRfY3VycmVudF9jb21wb25lbnQocGFyZW50X2NvbXBvbmVudCk7XG59XG5sZXQgU3ZlbHRlRWxlbWVudDtcbmlmICh0eXBlb2YgSFRNTEVsZW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBTdmVsdGVFbGVtZW50ID0gY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICAgICAgY29uc3QgeyBvbl9tb3VudCB9ID0gdGhpcy4kJDtcbiAgICAgICAgICAgIHRoaXMuJCQub25fZGlzY29ubmVjdCA9IG9uX21vdW50Lm1hcChydW4pLmZpbHRlcihpc19mdW5jdGlvbik7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy4kJC5zbG90dGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuJCQuc2xvdHRlZFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ciwgX29sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpc1thdHRyXSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICAgICAgcnVuX2FsbCh0aGlzLiQkLm9uX2Rpc2Nvbm5lY3QpO1xuICAgICAgICB9XG4gICAgICAgICRkZXN0cm95KCkge1xuICAgICAgICAgICAgZGVzdHJveV9jb21wb25lbnQodGhpcywgMSk7XG4gICAgICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICAgICAgfVxuICAgICAgICAkb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIFRPRE8gc2hvdWxkIHRoaXMgZGVsZWdhdGUgdG8gYWRkRXZlbnRMaXN0ZW5lcj9cbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgJHNldCgkJHByb3BzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kJHNldCAmJiAhaXNfZW1wdHkoJCRwcm9wcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuJCRzZXQoJCRwcm9wcyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kJC5za2lwX2JvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBTdmVsdGUgY29tcG9uZW50cy4gVXNlZCB3aGVuIGRldj1mYWxzZS5cbiAqL1xuY2xhc3MgU3ZlbHRlQ29tcG9uZW50IHtcbiAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgZGVzdHJveV9jb21wb25lbnQodGhpcywgMSk7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgIH1cbiAgICAkb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgJHNldCgkJHByb3BzKSB7XG4gICAgICAgIGlmICh0aGlzLiQkc2V0ICYmICFpc19lbXB0eSgkJHByb3BzKSkge1xuICAgICAgICAgICAgdGhpcy4kJC5za2lwX2JvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJCRzZXQoJCRwcm9wcyk7XG4gICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hfZGV2KHR5cGUsIGRldGFpbCkge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY3VzdG9tX2V2ZW50KHR5cGUsIE9iamVjdC5hc3NpZ24oeyB2ZXJzaW9uOiAnMy40Ni40JyB9LCBkZXRhaWwpLCB0cnVlKSk7XG59XG5mdW5jdGlvbiBhcHBlbmRfZGV2KHRhcmdldCwgbm9kZSkge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NSW5zZXJ0JywgeyB0YXJnZXQsIG5vZGUgfSk7XG4gICAgYXBwZW5kKHRhcmdldCwgbm9kZSk7XG59XG5mdW5jdGlvbiBhcHBlbmRfaHlkcmF0aW9uX2Rldih0YXJnZXQsIG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlIH0pO1xuICAgIGFwcGVuZF9oeWRyYXRpb24odGFyZ2V0LCBub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydF9kZXYodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlLCBhbmNob3IgfSk7XG4gICAgaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKTtcbn1cbmZ1bmN0aW9uIGluc2VydF9oeWRyYXRpb25fZGV2KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01JbnNlcnQnLCB7IHRhcmdldCwgbm9kZSwgYW5jaG9yIH0pO1xuICAgIGluc2VydF9oeWRyYXRpb24odGFyZ2V0LCBub2RlLCBhbmNob3IpO1xufVxuZnVuY3Rpb24gZGV0YWNoX2Rldihub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmUnLCB7IG5vZGUgfSk7XG4gICAgZGV0YWNoKG5vZGUpO1xufVxuZnVuY3Rpb24gZGV0YWNoX2JldHdlZW5fZGV2KGJlZm9yZSwgYWZ0ZXIpIHtcbiAgICB3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nICYmIGJlZm9yZS5uZXh0U2libGluZyAhPT0gYWZ0ZXIpIHtcbiAgICAgICAgZGV0YWNoX2RldihiZWZvcmUubmV4dFNpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9iZWZvcmVfZGV2KGFmdGVyKSB7XG4gICAgd2hpbGUgKGFmdGVyLnByZXZpb3VzU2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGFmdGVyLnByZXZpb3VzU2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGV0YWNoX2FmdGVyX2RldihiZWZvcmUpIHtcbiAgICB3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBsaXN0ZW5fZGV2KG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zLCBoYXNfcHJldmVudF9kZWZhdWx0LCBoYXNfc3RvcF9wcm9wYWdhdGlvbikge1xuICAgIGNvbnN0IG1vZGlmaWVycyA9IG9wdGlvbnMgPT09IHRydWUgPyBbJ2NhcHR1cmUnXSA6IG9wdGlvbnMgPyBBcnJheS5mcm9tKE9iamVjdC5rZXlzKG9wdGlvbnMpKSA6IFtdO1xuICAgIGlmIChoYXNfcHJldmVudF9kZWZhdWx0KVxuICAgICAgICBtb2RpZmllcnMucHVzaCgncHJldmVudERlZmF1bHQnKTtcbiAgICBpZiAoaGFzX3N0b3BfcHJvcGFnYXRpb24pXG4gICAgICAgIG1vZGlmaWVycy5wdXNoKCdzdG9wUHJvcGFnYXRpb24nKTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUFkZEV2ZW50TGlzdGVuZXInLCB7IG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBtb2RpZmllcnMgfSk7XG4gICAgY29uc3QgZGlzcG9zZSA9IGxpc3Rlbihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmVFdmVudExpc3RlbmVyJywgeyBub2RlLCBldmVudCwgaGFuZGxlciwgbW9kaWZpZXJzIH0pO1xuICAgICAgICBkaXNwb3NlKCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGF0dHJfZGV2KG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVJlbW92ZUF0dHJpYnV0ZScsIHsgbm9kZSwgYXR0cmlidXRlIH0pO1xuICAgIGVsc2VcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXRBdHRyaWJ1dGUnLCB7IG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBwcm9wX2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NU2V0UHJvcGVydHknLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIGRhdGFzZXRfZGV2KG5vZGUsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIG5vZGUuZGF0YXNldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldERhdGFzZXQnLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhX2Rldih0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC53aG9sZVRleHQgPT09IGRhdGEpXG4gICAgICAgIHJldHVybjtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldERhdGEnLCB7IG5vZGU6IHRleHQsIGRhdGEgfSk7XG4gICAgdGV4dC5kYXRhID0gZGF0YTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX2VhY2hfYXJndW1lbnQoYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdzdHJpbmcnICYmICEoYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIGFyZykpIHtcbiAgICAgICAgbGV0IG1zZyA9ICd7I2VhY2h9IG9ubHkgaXRlcmF0ZXMgb3ZlciBhcnJheS1saWtlIG9iamVjdHMuJztcbiAgICAgICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgYXJnICYmIFN5bWJvbC5pdGVyYXRvciBpbiBhcmcpIHtcbiAgICAgICAgICAgIG1zZyArPSAnIFlvdSBjYW4gdXNlIGEgc3ByZWFkIHRvIGNvbnZlcnQgdGhpcyBpdGVyYWJsZSBpbnRvIGFuIGFycmF5Lic7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdmFsaWRhdGVfc2xvdHMobmFtZSwgc2xvdCwga2V5cykge1xuICAgIGZvciAoY29uc3Qgc2xvdF9rZXkgb2YgT2JqZWN0LmtleXMoc2xvdCkpIHtcbiAgICAgICAgaWYgKCF+a2V5cy5pbmRleE9mKHNsb3Rfa2V5KSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGA8JHtuYW1lfT4gcmVjZWl2ZWQgYW4gdW5leHBlY3RlZCBzbG90IFwiJHtzbG90X2tleX1cIi5gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgU3ZlbHRlIGNvbXBvbmVudHMgd2l0aCBzb21lIG1pbm9yIGRldi1lbmhhbmNlbWVudHMuIFVzZWQgd2hlbiBkZXY9dHJ1ZS5cbiAqL1xuY2xhc3MgU3ZlbHRlQ29tcG9uZW50RGV2IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucyB8fCAoIW9wdGlvbnMudGFyZ2V0ICYmICFvcHRpb25zLiQkaW5saW5lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ3RhcmdldCcgaXMgYSByZXF1aXJlZCBvcHRpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLiRkZXN0cm95KCk7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbXBvbmVudCB3YXMgYWxyZWFkeSBkZXN0cm95ZWQnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIH07XG4gICAgfVxuICAgICRjYXB0dXJlX3N0YXRlKCkgeyB9XG4gICAgJGluamVjdF9zdGF0ZSgpIHsgfVxufVxuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGNyZWF0ZSBzdHJvbmdseSB0eXBlZCBTdmVsdGUgY29tcG9uZW50cy5cbiAqIFRoaXMgb25seSBleGlzdHMgZm9yIHR5cGluZyBwdXJwb3NlcyBhbmQgc2hvdWxkIGJlIHVzZWQgaW4gYC5kLnRzYCBmaWxlcy5cbiAqXG4gKiAjIyMgRXhhbXBsZTpcbiAqXG4gKiBZb3UgaGF2ZSBjb21wb25lbnQgbGlicmFyeSBvbiBucG0gY2FsbGVkIGBjb21wb25lbnQtbGlicmFyeWAsIGZyb20gd2hpY2hcbiAqIHlvdSBleHBvcnQgYSBjb21wb25lbnQgY2FsbGVkIGBNeUNvbXBvbmVudGAuIEZvciBTdmVsdGUrVHlwZVNjcmlwdCB1c2VycyxcbiAqIHlvdSB3YW50IHRvIHByb3ZpZGUgdHlwaW5ncy4gVGhlcmVmb3JlIHlvdSBjcmVhdGUgYSBgaW5kZXguZC50c2A6XG4gKiBgYGB0c1xuICogaW1wb3J0IHsgU3ZlbHRlQ29tcG9uZW50VHlwZWQgfSBmcm9tIFwic3ZlbHRlXCI7XG4gKiBleHBvcnQgY2xhc3MgTXlDb21wb25lbnQgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnRUeXBlZDx7Zm9vOiBzdHJpbmd9PiB7fVxuICogYGBgXG4gKiBUeXBpbmcgdGhpcyBtYWtlcyBpdCBwb3NzaWJsZSBmb3IgSURFcyBsaWtlIFZTIENvZGUgd2l0aCB0aGUgU3ZlbHRlIGV4dGVuc2lvblxuICogdG8gcHJvdmlkZSBpbnRlbGxpc2Vuc2UgYW5kIHRvIHVzZSB0aGUgY29tcG9uZW50IGxpa2UgdGhpcyBpbiBhIFN2ZWx0ZSBmaWxlXG4gKiB3aXRoIFR5cGVTY3JpcHQ6XG4gKiBgYGBzdmVsdGVcbiAqIDxzY3JpcHQgbGFuZz1cInRzXCI+XG4gKiBcdGltcG9ydCB7IE15Q29tcG9uZW50IH0gZnJvbSBcImNvbXBvbmVudC1saWJyYXJ5XCI7XG4gKiA8L3NjcmlwdD5cbiAqIDxNeUNvbXBvbmVudCBmb289eydiYXInfSAvPlxuICogYGBgXG4gKlxuICogIyMjIyBXaHkgbm90IG1ha2UgdGhpcyBwYXJ0IG9mIGBTdmVsdGVDb21wb25lbnQoRGV2KWA/XG4gKiBCZWNhdXNlXG4gKiBgYGB0c1xuICogY2xhc3MgQVN1YmNsYXNzT2ZTdmVsdGVDb21wb25lbnQgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnQ8e2Zvbzogc3RyaW5nfT4ge31cbiAqIGNvbnN0IGNvbXBvbmVudDogdHlwZW9mIFN2ZWx0ZUNvbXBvbmVudCA9IEFTdWJjbGFzc09mU3ZlbHRlQ29tcG9uZW50O1xuICogYGBgXG4gKiB3aWxsIHRocm93IGEgdHlwZSBlcnJvciwgc28gd2UgbmVlZCB0byBzZXBhcmF0ZSB0aGUgbW9yZSBzdHJpY3RseSB0eXBlZCBjbGFzcy5cbiAqL1xuY2xhc3MgU3ZlbHRlQ29tcG9uZW50VHlwZWQgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnREZXYge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbG9vcF9ndWFyZCh0aW1lb3V0KSB7XG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChEYXRlLm5vdygpIC0gc3RhcnQgPiB0aW1lb3V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luZmluaXRlIGxvb3AgZGV0ZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCB7IEh0bWxUYWcsIEh0bWxUYWdIeWRyYXRpb24sIFN2ZWx0ZUNvbXBvbmVudCwgU3ZlbHRlQ29tcG9uZW50RGV2LCBTdmVsdGVDb21wb25lbnRUeXBlZCwgU3ZlbHRlRWxlbWVudCwgYWN0aW9uX2Rlc3Ryb3llciwgYWRkX2F0dHJpYnV0ZSwgYWRkX2NsYXNzZXMsIGFkZF9mbHVzaF9jYWxsYmFjaywgYWRkX2xvY2F0aW9uLCBhZGRfcmVuZGVyX2NhbGxiYWNrLCBhZGRfcmVzaXplX2xpc3RlbmVyLCBhZGRfc3R5bGVzLCBhZGRfdHJhbnNmb3JtLCBhZnRlclVwZGF0ZSwgYXBwZW5kLCBhcHBlbmRfZGV2LCBhcHBlbmRfZW1wdHlfc3R5bGVzaGVldCwgYXBwZW5kX2h5ZHJhdGlvbiwgYXBwZW5kX2h5ZHJhdGlvbl9kZXYsIGFwcGVuZF9zdHlsZXMsIGFzc2lnbiwgYXR0ciwgYXR0cl9kZXYsIGF0dHJpYnV0ZV90b19vYmplY3QsIGJlZm9yZVVwZGF0ZSwgYmluZCwgYmluZGluZ19jYWxsYmFja3MsIGJsYW5rX29iamVjdCwgYnViYmxlLCBjaGVja19vdXRyb3MsIGNoaWxkcmVuLCBjbGFpbV9jb21wb25lbnQsIGNsYWltX2VsZW1lbnQsIGNsYWltX2h0bWxfdGFnLCBjbGFpbV9zcGFjZSwgY2xhaW1fc3ZnX2VsZW1lbnQsIGNsYWltX3RleHQsIGNsZWFyX2xvb3BzLCBjb21wb25lbnRfc3Vic2NyaWJlLCBjb21wdXRlX3Jlc3RfcHJvcHMsIGNvbXB1dGVfc2xvdHMsIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciwgY3JlYXRlX2FuaW1hdGlvbiwgY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbiwgY3JlYXRlX2NvbXBvbmVudCwgY3JlYXRlX2luX3RyYW5zaXRpb24sIGNyZWF0ZV9vdXRfdHJhbnNpdGlvbiwgY3JlYXRlX3Nsb3QsIGNyZWF0ZV9zc3JfY29tcG9uZW50LCBjdXJyZW50X2NvbXBvbmVudCwgY3VzdG9tX2V2ZW50LCBkYXRhc2V0X2RldiwgZGVidWcsIGRlc3Ryb3lfYmxvY2ssIGRlc3Ryb3lfY29tcG9uZW50LCBkZXN0cm95X2VhY2gsIGRldGFjaCwgZGV0YWNoX2FmdGVyX2RldiwgZGV0YWNoX2JlZm9yZV9kZXYsIGRldGFjaF9iZXR3ZWVuX2RldiwgZGV0YWNoX2RldiwgZGlydHlfY29tcG9uZW50cywgZGlzcGF0Y2hfZGV2LCBlYWNoLCBlbGVtZW50LCBlbGVtZW50X2lzLCBlbXB0eSwgZW5kX2h5ZHJhdGluZywgZXNjYXBlLCBlc2NhcGVfYXR0cmlidXRlX3ZhbHVlLCBlc2NhcGVfb2JqZWN0LCBlc2NhcGVkLCBleGNsdWRlX2ludGVybmFsX3Byb3BzLCBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9wb3NpdGlvbiwgZmx1c2gsIGdldEFsbENvbnRleHRzLCBnZXRDb250ZXh0LCBnZXRfYWxsX2RpcnR5X2Zyb21fc2NvcGUsIGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlLCBnZXRfY3VycmVudF9jb21wb25lbnQsIGdldF9jdXN0b21fZWxlbWVudHNfc2xvdHMsIGdldF9yb290X2Zvcl9zdHlsZSwgZ2V0X3Nsb3RfY2hhbmdlcywgZ2V0X3NwcmVhZF9vYmplY3QsIGdldF9zcHJlYWRfdXBkYXRlLCBnZXRfc3RvcmVfdmFsdWUsIGdsb2JhbHMsIGdyb3VwX291dHJvcywgaGFuZGxlX3Byb21pc2UsIGhhc0NvbnRleHQsIGhhc19wcm9wLCBpZGVudGl0eSwgaW5pdCwgaW5zZXJ0LCBpbnNlcnRfZGV2LCBpbnNlcnRfaHlkcmF0aW9uLCBpbnNlcnRfaHlkcmF0aW9uX2RldiwgaW50cm9zLCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciwgaXNfY2xpZW50LCBpc19jcm9zc29yaWdpbiwgaXNfZW1wdHksIGlzX2Z1bmN0aW9uLCBpc19wcm9taXNlLCBsaXN0ZW4sIGxpc3Rlbl9kZXYsIGxvb3AsIGxvb3BfZ3VhcmQsIG1lcmdlX3Nzcl9zdHlsZXMsIG1pc3NpbmdfY29tcG9uZW50LCBtb3VudF9jb21wb25lbnQsIG5vb3AsIG5vdF9lcXVhbCwgbm93LCBudWxsX3RvX2VtcHR5LCBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzLCBvbkRlc3Ryb3ksIG9uTW91bnQsIG9uY2UsIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBwcmV2ZW50X2RlZmF1bHQsIHByb3BfZGV2LCBxdWVyeV9zZWxlY3Rvcl9hbGwsIHJhZiwgcnVuLCBydW5fYWxsLCBzYWZlX25vdF9lcXVhbCwgc2NoZWR1bGVfdXBkYXRlLCBzZWxlY3RfbXVsdGlwbGVfdmFsdWUsIHNlbGVjdF9vcHRpb24sIHNlbGVjdF9vcHRpb25zLCBzZWxlY3RfdmFsdWUsIHNlbGYsIHNldENvbnRleHQsIHNldF9hdHRyaWJ1dGVzLCBzZXRfY3VycmVudF9jb21wb25lbnQsIHNldF9jdXN0b21fZWxlbWVudF9kYXRhLCBzZXRfZGF0YSwgc2V0X2RhdGFfZGV2LCBzZXRfaW5wdXRfdHlwZSwgc2V0X2lucHV0X3ZhbHVlLCBzZXRfbm93LCBzZXRfcmFmLCBzZXRfc3RvcmVfdmFsdWUsIHNldF9zdHlsZSwgc2V0X3N2Z19hdHRyaWJ1dGVzLCBzcGFjZSwgc3ByZWFkLCBzcmNfdXJsX2VxdWFsLCBzdGFydF9oeWRyYXRpbmcsIHN0b3BfcHJvcGFnYXRpb24sIHN1YnNjcmliZSwgc3ZnX2VsZW1lbnQsIHRleHQsIHRpY2ssIHRpbWVfcmFuZ2VzX3RvX2FycmF5LCB0b19udW1iZXIsIHRvZ2dsZV9jbGFzcywgdHJhbnNpdGlvbl9pbiwgdHJhbnNpdGlvbl9vdXQsIHRydXN0ZWQsIHVwZGF0ZV9hd2FpdF9ibG9ja19icmFuY2gsIHVwZGF0ZV9rZXllZF9lYWNoLCB1cGRhdGVfc2xvdCwgdXBkYXRlX3Nsb3RfYmFzZSwgdmFsaWRhdGVfY29tcG9uZW50LCB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50LCB2YWxpZGF0ZV9lYWNoX2tleXMsIHZhbGlkYXRlX3Nsb3RzLCB2YWxpZGF0ZV9zdG9yZSwgeGxpbmtfYXR0ciB9O1xuIiwgImZ1bmN0aW9uIG9uTW91bnRlZChub2RlOiBIVE1MRWxlbWVudCk6IFByb21pc2U8SFRNTENvbGxlY3Rpb24+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgbW91bnRpbmc6IE5vZGVKUy5UaW1lcixcbiAgICAgICAgICAgIGNvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgICAgIGNsZWFySW50ZXJ2YWwobW91bnRpbmcpO1xuXG4gICAgICAgIG1vdW50aW5nID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvdW50LCBub2RlLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtb3VudGluZyk7XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShub2RlLmNoaWxkcmVuKS5mb3JFYWNoKChjLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGMuZGF0YXNldC5pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPj0gNjkpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKG1vdW50aW5nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoYFNsaWR5IGhhdmVuJ3QgaXRlbXNgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTYpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRGUFMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PlxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHQxOiBudW1iZXIpID0+XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHQyOiBudW1iZXIpID0+IHJlc29sdmUoMTAwMCAvICh0MiAtIHQxKSkpXG4gICAgICAgIClcbiAgICApO1xufVxuXG4vLyBVU0Vcbi8vIGdldEZQUygpLnRoZW4oKGZwczogbnVtYmVyKSA9PiB7XG4vLyAgICAgbGV0IGludGVydmFsID0gMTAwMCAvIGZwcztcbi8vICAgICBjb25zb2xlLmxvZyhmcHMsIGludGVydmFsKTtcbi8vIH0pO1xuXG5mdW5jdGlvbiBvblJlc2l6ZSh0aGlzOiBHbG9iYWxFdmVudEhhbmRsZXJzLCBldjogVUlFdmVudCwgbm9kZTogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zb2xlLmxvZyhldik7XG4gICAgbGV0IENSO1xuICAgIGxldCBFVDtcblxuICAgIGNvbnN0IHJvID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICBDUiA9IGVudHJ5LmNvbnRlbnRSZWN0O1xuICAgICAgICAgICAgRVQgPSBlbnRyeS50YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdyZXNpemUnLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7IENSLCBFVCB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJvLm9ic2VydmUobm9kZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95KCkge1xuICAgICAgICAgICAgcm8uZGlzY29ubmVjdCgpO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbmV4cG9ydCB7IG9uTW91bnRlZCwgb25SZXNpemUsIGdldEZQUyB9O1xuXG4vLyBwYXJlbnQuaWQgPSAnc2xpZHknO1xuLy8gY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKSk7XG4vLyBzdHlsZS5pbm5lckhUTUwgPSBgI3NsaWR5OjphZnRlciB7XG4vLyAgICAgY29udGVudDogJ3NsaWR5Jztcbi8vICAgICBkaXNwbGF5OiBibG9jaztcbi8vICAgICB3aWR0aDogMnJlbTtcbi8vICAgICBoZWlnaHQ6IDFyZW07XG4vLyAgICAgYmFja2dyb3VuZDogcmVkO1xuLy8gICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbi8vICAgICBsZWZ0OiAke3BhcmVudC5vZmZzZXRXaWR0aH1weDtcbi8vIH1gO1xuXG4vLyBpZiAoIW5vZGUuU0xJRFkpIG5vZGUuU0xJRFkgPSB7fTsgLy8gPz8/PyBleHRlbmQgZGVmYXVsdCBOb2RlVHlwZVxuIiwgImltcG9ydCB7IENzc1J1bGUgfSBmcm9tICcuL3R5cGVzJztcblxuZnVuY3Rpb24gbWF4TWluKG1heDogbnVtYmVyLCBtaW46IG51bWJlciwgdmFsOiBudW1iZXIpIHtcbiAgICByZXR1cm4gTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHZhbCkpIHx8IDA7XG59XG5cbmZ1bmN0aW9uIG1heFNpemUobm9kZTogSFRNTEVsZW1lbnQsIHZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHZlcnRpY2FsXG4gICAgICAgID8gbm9kZS5zY3JvbGxIZWlnaHQgLSBwYXJlbnQobm9kZSkub2Zmc2V0SGVpZ2h0XG4gICAgICAgIDogbm9kZS5zY3JvbGxXaWR0aCAtIHBhcmVudChub2RlKS5vZmZzZXRXaWR0aDtcbn1cblxuZnVuY3Rpb24gaW5kZXhpbmcobm9kZTogSFRNTEVsZW1lbnQsIGluZGV4OiBudW1iZXIsIGxvb3A6IGJvb2xlYW4pIHtcbiAgICBpZiAobG9vcCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZXMobm9kZSkubGVuZ3RoIC0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+IG5vZGVzKG5vZGUpLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIGluZGV4O1xuICAgIH0gZWxzZSByZXR1cm4gbWF4TWluKG5vZGVzKG5vZGUpLmxlbmd0aCAtIDEsIDAsIGluZGV4KTtcbn1cblxuZnVuY3Rpb24gY29vcmRpbmF0ZShlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IFdoZWVsRXZlbnQsIHZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ3doZWVsJykge1xuICAgICAgICByZXR1cm4gdmVydGljYWwgPyBlLmRlbHRhWSA6IGUuc2hpZnRLZXkgPyBlLmRlbHRhWSA6IGUuZGVsdGFYO1xuICAgIH0gZWxzZSByZXR1cm4gdmVydGljYWwgPyB1bmlRKGUpLmNsaWVudFkgOiB1bmlRKGUpLmNsaWVudFg7XG59XG5cbmNvbnN0IHVuaVEgPSAoZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IChlLmNoYW5nZWRUb3VjaGVzID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGUpO1xuXG4vLyBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYWShlbGVtZW50OiBFbGVtZW50LCBheGlzOiBzdHJpbmcpIHtcbi8vICAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuLy8gICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBET01NYXRyaXhSZWFkT25seShzdHlsZS50cmFuc2Zvcm0pO1xuLy8gICAgIHJldHVybiBtYXRyaXhbYXhpcyA9PT0gJ3knID8gJ200MicgOiAnbTQxJ107XG4vLyB9XG5cbmNvbnN0IGNpeCA9IChub2RlOiBIVE1MRWxlbWVudCkgPT4gTWF0aC5mbG9vcihub2RlLmNoaWxkcmVuLmxlbmd0aCAvIDIpO1xuY29uc3QgcGFyZW50ID0gKG5vZGU6IEhUTUxFbGVtZW50KSA9PiBub2RlLnBhcmVudEVsZW1lbnQ7XG5jb25zdCBub2RlcyA9IChub2RlOiBIVE1MRWxlbWVudCkgPT4gQXJyYXkuZnJvbShub2RlLmNoaWxkcmVuKTtcbmNvbnN0IGNoaWxkID0gKG5vZGU6IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyKSA9PiBub2RlLmNoaWxkcmVuW2luZGV4XTtcbi8vIGNvbnN0IGNvbXB1dGVkID0gKGNoaWxkOiBFbGVtZW50LCBheGlzOiBzdHJpbmcpID0+XG4vLyAgICAgZ2V0Q29tcHV0ZWRTdHlsZShjaGlsZCkudHJhbnNmb3JtLnNwbGl0KCcsJylbYXhpcyA9PT0gJ3knID8gNSA6IDRdO1xuY29uc3QgY29vcmQgPSAodmVydGljYWw6IGJvb2xlYW4pID0+ICh2ZXJ0aWNhbCA/ICdvZmZzZXRUb3AnIDogJ29mZnNldExlZnQnKTtcbmNvbnN0IHNpemUgPSAodmVydGljYWw6IGJvb2xlYW4pID0+ICh2ZXJ0aWNhbCA/ICdvZmZzZXRIZWlnaHQnIDogJ29mZnNldFdpZHRoJyk7XG5jb25zdCBwYXJ0ID0gKGFsaWduOiBzdHJpbmcpID0+IChhbGlnbiA9PT0gJ21pZGRsZScgPyAwLjUgOiAxKTtcbmNvbnN0IGRpZmYgPSAoYWxpZ246IHN0cmluZywgcG9zOiBudW1iZXIpID0+IChhbGlnbiAhPT0gJ3N0YXJ0JyA/IHBvcyA6IDApO1xuY29uc3Qgb2Zmc2V0ID0gKG5vZGU6IEhUTUxFbGVtZW50LCBjaGlsZDogRWxlbWVudCwgdmVydGljYWw6IGJvb2xlYW4pID0+XG4gICAgbm9kZS5wYXJlbnRFbGVtZW50W3NpemUodmVydGljYWwpXSAtIGNoaWxkW3NpemUodmVydGljYWwpXTtcbmNvbnN0IHBvc2l0aW9uID0gKG5vZGU6IEhUTUxFbGVtZW50LCBjaGlsZDogRWxlbWVudCwgdmVydGljYWw6IGJvb2xlYW4sIGFsaWduOiBzdHJpbmcpID0+XG4gICAgY2hpbGRbY29vcmQodmVydGljYWwpXSAtIGRpZmYoYWxpZ24sIG9mZnNldChub2RlLCBjaGlsZCwgdmVydGljYWwpICogcGFydChhbGlnbikpO1xuY29uc3QgZGlzdGFuY2UgPSAobm9kZTogSFRNTEVsZW1lbnQsIGluZGV4OiBudW1iZXIsIHZlcnRpY2FsOiBib29sZWFuKSA9PlxuICAgIE1hdGguYWJzKG5vZGVzKG5vZGUpW2luZGV4XVtjb29yZCh2ZXJ0aWNhbCldKTtcblxuZnVuY3Rpb24gY2xvc2VzdChub2RlOiBIVE1MRWxlbWVudCwgdGFyZ2V0OiBudW1iZXIsIHZlcnRpY2FsOiBib29sZWFuLCBhbGlnbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5vZGVzKG5vZGUpLnJlZHVjZSgocHJldjogRWxlbWVudCwgY3VycjogRWxlbWVudCwgaSkgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSAoY2hpbGQ6IEVsZW1lbnQpID0+IHBvc2l0aW9uKG5vZGUsIGNoaWxkLCB2ZXJ0aWNhbCwgYWxpZ24pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpLCAnY3VycjonLCBwb3MoY3VyciksICdwcmV2OicsIHBvcyhwcmV2KSk7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhwb3MoY3VycikgLSB0YXJnZXQpIDwgTWF0aC5hYnMocG9zKHByZXYpIC0gdGFyZ2V0KSA/IGN1cnIgOiBwcmV2O1xuICAgIH0pO1xufVxuXG5jb25zdCBmaW5kID0ge1xuICAgIGluZGV4OiAoXG4gICAgICAgIG5vZGU6IEhUTUxFbGVtZW50LFxuICAgICAgICB0YXJnZXQ6IG51bWJlcixcbiAgICAgICAgY2hpbGQ6IEVsZW1lbnQgfCB1bmRlZmluZWQsXG4gICAgICAgIHZlcnRpY2FsOiBib29sZWFuLFxuICAgICAgICBhbGlnbjogc3RyaW5nXG4gICAgKSA9PlxuICAgICAgICBjaGlsZFxuICAgICAgICAgICAgPyBub2Rlcyhub2RlKS5pbmRleE9mKGNoaWxkKVxuICAgICAgICAgICAgOiArY2xvc2VzdChub2RlLCB0YXJnZXQsIHZlcnRpY2FsLCBhbGlnbikuZGF0YXNldC5pbmRleCxcbiAgICBwb3NpdGlvbjogKG5vZGU6IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyLCB2ZXJ0aWNhbDogYm9vbGVhbiwgYWxpZ246IHN0cmluZykgPT5cbiAgICAgICAgcG9zaXRpb24obm9kZSwgY2hpbGQobm9kZSwgaW5kZXgpLCB2ZXJ0aWNhbCwgYWxpZ24pLFxuICAgIHRhcmdldDogKG5vZGU6IEhUTUxFbGVtZW50LCB0YXJnZXQ6IG51bWJlciwgdmVydGljYWw6IGJvb2xlYW4sIGFsaWduOiBzdHJpbmcpID0+XG4gICAgICAgIHBvc2l0aW9uKG5vZGUsIGNsb3Nlc3Qobm9kZSwgdGFyZ2V0LCB2ZXJ0aWNhbCwgYWxpZ24pLCB2ZXJ0aWNhbCwgYWxpZ24pLFxuICAgIHNpemU6IChub2RlOiBIVE1MRWxlbWVudCwgaW5kZXg6IG51bWJlciwgdmVydGljYWw6IGJvb2xlYW4pID0+XG4gICAgICAgIG5vZGVzKG5vZGUpW2luZGV4XVtzaXplKHZlcnRpY2FsKV0sXG4gICAgY2hpbGQ6IChub2RlOiBIVE1MRWxlbWVudCwgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAgbm9kZXMobm9kZSkuZmluZCgoY2hpbGQpID0+ICtjaGlsZC5kYXRhc2V0LmluZGV4ID09PSBpbmRleCksXG4gICAgZ2FwOiAobm9kZTogSFRNTEVsZW1lbnQsIHZlcnRpY2FsOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBkaXN0YW5jZShub2RlLCAwLCB2ZXJ0aWNhbCkgLVxuICAgICAgICAgICAgZGlzdGFuY2Uobm9kZSwgMSwgdmVydGljYWwpIC1cbiAgICAgICAgICAgIG5vZGVzKG5vZGUpWzBdW3NpemUodmVydGljYWwpXVxuICAgICAgICApO1xuICAgIH0sXG59O1xuXG4vLyBjb25zdCBzdHlsaW5nID0gKG5vZGU6IEhUTUxFbGVtZW50LCB1bmRvOiBib29sZWFuID0gZmFsc2UpID0+IHtcbi8vICAgICBub2Rlcyhub2RlKS5mb3JFYWNoKChjOiBIVE1MRWxlbWVudCkgPT4ge1xuLy8gICAgICAgICBjLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbi8vICAgICAgICAgLy8gaWYgKGMuaGFzQ2hpbGROb2RlcygpKSB7XG4vLyAgICAgICAgIC8vICAgICBpZiAoYy5xdWVyeVNlbGVjdG9yKCdpbWcnKSkge1xuLy8gICAgICAgICAvLyAgICAgICAgIGMucXVlcnlTZWxlY3RvcignaW1nJykuc3R5bGUud2lsbENoYW5nZSA9ICd0cmFuc2Zvcm0nO1xuLy8gICAgICAgICAvLyAgICAgICAgIC8vIGMucXVlcnlTZWxlY3RvcignaW1nJykuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbi8vICAgICAgICAgLy8gICAgIH1cbi8vICAgICAgICAgLy8gfVxuLy8gICAgIH0pO1xuLy8gfTtcblxuLy8gY29uc3QgaW5pdGlhbGlzZSA9IChub2RlOiBIVE1MRWxlbWVudCwgYXhpczogc3RyaW5nID0gJ3gnLCBnYXA6IG51bWJlciA9IDApID0+IHtcbi8vICAgICBub2Rlcyhub2RlKS5mb3JFYWNoKChjOiBIVE1MRWxlbWVudCwgaTogbnVtYmVyKSA9PiB7XG4vLyAgICAgICAgIGMuc3R5bGUuY3NzVGV4dCA9IGAtLWluaXQ6ICR7Y1tjb29yZChheGlzKV0gKyAoaSA+IDAgPyBnYXAgOiAwKVxuLy8gICAgICAgICAgICAgfTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgke2NbY29vcmQoYXhpcyldICsgKGkgPiAwID8gZ2FwIDogMCl9cHgsIDAsIDApYDtcbi8vICAgICB9KTtcbi8vICAgICAvLyBub2Rlcyhub2RlKS5mb3JFYWNoKChjLCBpKSA9PiB7XG4vLyAgICAgLy8gICAgIGMuc3R5bGUucG9zaXRpb24gPSBgdHJhbnNsYXRlM2QoJHtjW2Nvb3JkKGF4aXMpXSArIChpID4gMCA/IGdhcCA6IDApfXB4LCAwLCAwKWA7XG4vLyAgICAgLy8gICAgIC8vIGlmIChjLmhhc0NoaWxkTm9kZXMoKSkge1xuLy8gICAgIC8vICAgICAvLyAgICAgaWYgKGMucXVlcnlTZWxlY3RvcignaW1nJykpIHtcbi8vICAgICAvLyAgICAgLy8gICAgICAgICBjLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnN0eWxlLndpbGxDaGFuZ2UgPSAndHJhbnNmb3JtJztcbi8vICAgICAvLyAgICAgLy8gICAgICAgICAvLyBjLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4vLyAgICAgLy8gICAgIC8vICAgICB9XG4vLyAgICAgLy8gICAgIC8vIH1cbi8vICAgICAvLyB9KVxuLy8gfTtcblxuZnVuY3Rpb24gY3NzKG5vZGU6IEhUTUxFbGVtZW50LCBzdHlsZXM6IENzc1J1bGUpIHtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHN0eWxlcykge1xuICAgICAgICBub2RlLnN0eWxlW3Byb3BlcnR5XSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaChcbiAgICBub2RlOiBIVE1MRWxlbWVudCxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgZGV0YWlsOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IEhUTUxDb2xsZWN0aW9uIH1cbikge1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQobmFtZSwgeyAuLi5kZXRhaWwgfSkpO1xufVxuXG4vLyBmdW5jdGlvbiByb3RhdGVBcnJheTEobnVtcywgaykge1xuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgazsgaSsrKSB7XG4vLyAgICAgICAgIG51bXMudW5zaGlmdChudW1zLnBvcCgpKTtcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIG51bXM7XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIG9yZGVyaW5nKG5vZGU6IEhUTUxFbGVtZW50LCBudW1zOiBudW1iZXJbXSwgaW5kZXg6IG51bWJlciwgY2l4OiBudW1iZXIpIHtcbi8vICAgICBub2RlLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XG4vLyAgICAgcm90YXRlKG51bXMsIGluZGV4IC0gY2l4KS5mb3JFYWNoKChuOiBudW1iZXIsIGk6IG51bWJlcikgPT4ge1xuLy8gICAgICAgICBub2RlLmNoaWxkcmVuW25dLnN0eWxlLm9yZGVyID0gaTtcbi8vICAgICB9KTtcbi8vIH1cblxuZnVuY3Rpb24gcHJldihub2RlOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGxhc3QgPSBub2RlLmNoaWxkcmVuW25vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgbm9kZS5wcmVwZW5kKGxhc3QpO1xufVxuZnVuY3Rpb24gbmV4dChub2RlOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGZpcnN0ID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBub2RlLmFwcGVuZChmaXJzdCk7XG59XG5cbmNvbnN0IHJvdGF0ZSA9IChhcnJheTogQXJyYXk8RWxlbWVudD4sIGtleTogbnVtYmVyKSA9PlxuICAgIGFycmF5LnNsaWNlKGtleSkuY29uY2F0KGFycmF5LnNsaWNlKDAsIGtleSkpO1xuXG5mdW5jdGlvbiByZXBsYWNlKG5vZGU6IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyLCBsb29wOiBib29sZWFuKSB7XG4gICAgY29uc3QgcmVwbGFjZSA9IChub2RlczogRWxlbWVudFtdKSA9PiBub2RlLnJlcGxhY2VDaGlsZHJlbiguLi5ub2Rlcyk7XG4gICAgY29uc3QgZWxlbWVudHMgPSBsb29wXG4gICAgICAgID8gcm90YXRlKG5vZGVzKG5vZGUpLCBpbmRleCAtIGNpeChub2RlKSlcbiAgICAgICAgOiBub2Rlcyhub2RlKS5zb3J0KChhLCBiKSA9PiBhLmRhdGFzZXQuaW5kZXggLSBiLmRhdGFzZXQuaW5kZXgpO1xuICAgIHJlcGxhY2UoZWxlbWVudHMpO1xufVxuXG5leHBvcnQge1xuICAgIGZpbmQsXG4gICAgLy8gc3R5bGluZyxcbiAgICAvLyBpbml0aWFsaXNlLFxuICAgIC8vIGNvbXB1dGVkLFxuICAgIGNsb3Nlc3QsXG4gICAgcm90YXRlLFxuICAgIHJlcGxhY2UsXG4gICAgcHJldixcbiAgICBuZXh0LFxuICAgIGNzcyxcbiAgICBkaXNwYXRjaCxcbiAgICBtYXhNaW4sXG4gICAgbWF4U2l6ZSxcbiAgICBpbmRleGluZyxcbiAgICBjb29yZGluYXRlLFxuICAgIC8vIHNldENzcyxcbiAgICB1bmlRLFxufTtcbiIsICJpbXBvcnQgeyBvbk1vdW50ZWQgfSBmcm9tICcuL2Vudic7XG5pbXBvcnQgdHlwZSB7IERlbHRhLCBPcHRpb25zLCBTY3JvbGwgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7XG4gICAgZmluZCxcbiAgICBpbmRleGluZyxcbiAgICAvLyByb3RhdGUsXG4gICAgcmVwbGFjZSxcbiAgICBwcmV2LFxuICAgIG5leHQsXG4gICAgbWF4TWluLFxuICAgIGNzcyxcbiAgICBkaXNwYXRjaCxcbiAgICAvLyBtYXhTaXplLFxuICAgIGNvb3JkaW5hdGUsXG59IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2xpZHkoXG4gICAgbm9kZTogSFRNTEVsZW1lbnQsXG4gICAgb3B0aW9uczogT3B0aW9uc1xuKToge1xuICAgIHVwZGF0ZTogKG9wdGlvbnM6IE9wdGlvbnMpID0+IHZvaWQ7XG4gICAgZGVzdHJveTogKCkgPT4gdm9pZDtcbiAgICB0bzogKGluZGV4OiBudW1iZXIsIHRhcmdldD86IG51bWJlcikgPT4gdm9pZDtcbn0ge1xuICAgIGxldCB7XG4gICAgICAgIGluZGV4ID0gMCxcbiAgICAgICAgZ3Jhdml0eSA9IDEuMixcbiAgICAgICAgZHVyYXRpb24gPSAzNzUsXG4gICAgICAgIHZlcnRpY2FsID0gZmFsc2UsXG4gICAgICAgIGNsYW1wID0gZmFsc2UsXG4gICAgICAgIGxvb3AgPSBmYWxzZSxcbiAgICAgICAgc25hcCA9IGZhbHNlLFxuICAgICAgICBhbGlnbiA9ICdzdGFydCdcbiAgICB9OiBPcHRpb25zID0gb3B0aW9uc1xuXG4gICAgbGV0IHJhZjogbnVtYmVyLFxuICAgICAgICByYWs6IG51bWJlcixcbiAgICAgICAgdmVsb2NpdHkgPSAwLFxuICAgICAgICByZWZlcmVuY2UgPSAwLFxuICAgICAgICBwb3NpdGlvbiA9IDAsXG4gICAgICAgIGZyYW1lID0gMCxcbiAgICAgICAgLy8gZHJhZ3RpbWU6IE5vZGVKUy5UaW1lcixcbiAgICAgICAgd2hlZWx0aW1lOiBOb2RlSlMuVGltZW91dCxcbiAgICAgICAgaGlwID0gcG9zaXRpb24sXG4gICAgICAgIGhpeCA9IGluZGV4LFxuICAgICAgICBnYXAgPSAwO1xuXG4gICAgY29uc3QgUEFSRU5UID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IGxpc3RlbiA9IChcbiAgICAgICAgbm9kZTogV2luZG93IHwgSFRNTEVsZW1lbnQgfCBudWxsLFxuICAgICAgICBldmVudHM6IFtrZXlvZiBIVE1MRWxlbWVudEV2ZW50TWFwLCBFdmVudExpc3RlbmVyXVtdLFxuICAgICAgICBvbjogYm9vbGVhbiA9IHRydWVcbiAgICApID0+XG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKChbZXZlbnQsIGhhbmRsZV0pID0+XG4gICAgICAgICAgICBvblxuICAgICAgICAgICAgICAgID8gbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGUsIHRydWUpXG4gICAgICAgICAgICAgICAgOiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZSwgdHJ1ZSlcbiAgICAgICAgKTtcbiAgICBjb25zdCB3aW5kb3dFdmVudHM6IFtrZXlvZiBIVE1MRWxlbWVudEV2ZW50TWFwLCBFdmVudExpc3RlbmVyXVtdID0gW1xuICAgICAgICBbJ3RvdWNobW92ZScsIG9uTW92ZV0sXG4gICAgICAgIFsnbW91c2Vtb3ZlJywgb25Nb3ZlXSxcbiAgICAgICAgWyd0b3VjaGVuZCcsIG9uVXBdLFxuICAgICAgICBbJ21vdXNldXAnLCBvblVwXSxcbiAgICBdO1xuICAgIGNvbnN0IHBhcmVudEV2ZW50czogW2tleW9mIEhUTUxFbGVtZW50RXZlbnRNYXAgfCBzdHJpbmcsIEV2ZW50TGlzdGVuZXJdW10gPSBbXG4gICAgICAgIFsnY29udGV4dG1lbnUnLCBjbGVhcl0sXG4gICAgICAgIFsndG91Y2hzdGFydCcsIG9uRG93bl0sXG4gICAgICAgIFsnbW91c2Vkb3duJywgb25Eb3duXSxcbiAgICAgICAgWydrZXlkb3duJywgb25LZXlzXSxcbiAgICAgICAgWyd3aGVlbCcsIG9uV2hlZWxdLFxuICAgICAgICBbJ3Jlc2l6ZScsIG9uUmVzaXplXSxcbiAgICAgICAgWydtdXRhdGUnLCBvbk11dGF0ZV0sXG4gICAgXTtcblxuICAgIGNvbnN0IFJBRiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICBjb25zdCBSTyA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3Jlc2l6ZScpKTtcbiAgICB9KTtcbiAgICBjb25zdCBNTyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbXV0YXRlJykpO1xuICAgIH0pO1xuICAgIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuXG4gICAgICAgIC8vIE9taXQgKG9yIHNldCB0byBmYWxzZSkgdG8gb2JzZXJ2ZSBvbmx5IGNoYW5nZXMgdG8gdGhlIHBhcmVudCBub2RlXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgfTtcblxuICAgIG9uTW91bnRlZChub2RlKVxuICAgICAgICAudGhlbigoY2hpbGRzOiBIVE1MQ29sbGVjdGlvbikgPT4ge1xuICAgICAgICAgICAgUk8ub2JzZXJ2ZShub2RlKTtcbiAgICAgICAgICAgIE1PLm9ic2VydmUobm9kZSwgb2JzZXJ2ZXJPcHRpb25zKTtcblxuICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgICB0b3VjaEFjdGlvbjogJ3Bhbi15JyxcbiAgICAgICAgICAgICAgICAvLyBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgd2lsbENoYW5nZTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHdlYmtpdFVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjc3Mobm9kZSwgc3R5bGVzKTtcblxuICAgICAgICAgICAgZ2FwID0gZmluZC5nYXAobm9kZSwgdmVydGljYWwpO1xuICAgICAgICAgICAgcmVwbGFjZShub2RlLCBpbmRleCwgbG9vcCk7XG4gICAgICAgICAgICB0byhpbmRleCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FwOicsIGdhcCk7XG5cbiAgICAgICAgICAgIGlmIChQQVJFTlQpIHtcbiAgICAgICAgICAgICAgICBjc3MoUEFSRU5ULCB7IG91dGxpbmU6ICdub25lJyB9KTtcbiAgICAgICAgICAgICAgICBsaXN0ZW4oUEFSRU5ULCBwYXJlbnRFdmVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgJ21vdW50ZWQnLCB7IGNoaWxkcyB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuXG4gICAgZnVuY3Rpb24gbW92ZShwb3M6IG51bWJlciwgdHJhbnNpdGlvbjogbnVtYmVyID0gMCkge1xuICAgICAgICBwb3NpdGlvbiArPSBsb29wID8gbG9vcGluZyhwb3MpIDogcG9zO1xuICAgICAgICBpbmRleCA9IGZpbmQuaW5kZXgobm9kZSwgcG9zaXRpb24sIHVuZGVmaW5lZCwgdmVydGljYWwsIGFsaWduKTtcblxuICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSAodmVydGljYWw6IGJvb2xlYW4pID0+XG4gICAgICAgICAgICB2ZXJ0aWNhbCA/IGAwLCAkey1wb3NpdGlvbn1weCwgMGAgOiBgJHstcG9zaXRpb259cHgsIDAsIDBgO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7dHJhbnNsYXRlKHZlcnRpY2FsKX0pYCxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGAke3RyYW5zaXRpb259bXNgLFxuICAgICAgICB9O1xuICAgICAgICBjc3Mobm9kZSwgc3R5bGVzKTtcbiAgICAgICAgZGlzcGF0Y2gobm9kZSwgJ21vdmUnLCB7IGRldGFpbDogeyBpbmRleCwgcG9zaXRpb24gfSB9KTtcbiAgICAgICAgLy8gbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGUodmVydGljYWwpfSlgO1xuICAgICAgICAvLyBub2RlLnN0eWxlLnRyYW5zaXRpb24gPSBgJHt0cmFuc2l0aW9ufW1zYDtcbiAgICAgICAgLy8gbm9kZS5kYXRhc2V0LnBvc2l0aW9uID0gYCR7cG9zaXRpb259YDtcbiAgICAgICAgLy8gbm9kZS5kYXRhc2V0LmluZGV4ID0gYCR7aW5kZXh9YDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb29waW5nKHBvczogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gaGlwIC0gcG9zO1xuICAgICAgICBjb25zdCBmaXJzdCA9IGZpbmQuc2l6ZShub2RlLCAwLCB2ZXJ0aWNhbCk7XG4gICAgICAgIGNvbnN0IGxhc3QgPSBmaW5kLnNpemUobm9kZSwgbm9kZS5jaGlsZHJlbi5sZW5ndGggLSAxLCB2ZXJ0aWNhbCk7XG4gICAgICAgIGNvbnN0IGhpc3RvcnkgPSAoc2l6ZTogbnVtYmVyKSA9PiAoc2l6ZSArIGdhcCkgKiBNYXRoLnNpZ24oLXBvcyk7XG5cbiAgICAgICAgaWYgKGhpeCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHBvcyA+IDAgPyBuZXh0KG5vZGUpIDogcHJldihub2RlKTtcbiAgICAgICAgICAgIHBvcyArPSBoaXN0b3J5KHBvcyA+IDAgPyBmaXJzdCA6IGxhc3QpO1xuICAgICAgICAgICAgZnJhbWUgPSBwb3NpdGlvbiArIHBvcyArIGRlbHRhO1xuICAgICAgICB9XG4gICAgICAgIGhpeCA9IGluZGV4O1xuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIGxldCB0b2luZyA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIHRvKGluZGV4OiBudW1iZXIsIHRhcmdldDogbnVtYmVyIHwgbnVsbCA9IG51bGwpIHtcbiAgICAgICAgdG9pbmcgPSB0cnVlO1xuICAgICAgICBjbGVhcigpO1xuXG4gICAgICAgIGluZGV4ID0gaGl4ID0gaW5kZXhpbmcobm9kZSwgaW5kZXgsIGxvb3ApO1xuICAgICAgICAvLyBoaXggPSBsb29wID8gaGl4IDogaW5kZXhcbiAgICAgICAgY29uc3QgY2hpbGQgPSBmaW5kLmNoaWxkKG5vZGUsIGluZGV4KTtcbiAgICAgICAgY29uc3QgaXggPSBsb29wID8gZmluZC5pbmRleChub2RlLCBwb3NpdGlvbiwgY2hpbGQsIHZlcnRpY2FsLCBhbGlnbikgOiBpbmRleDtcblxuICAgICAgICBsZXQgcG9zID0gdGFyZ2V0XG4gICAgICAgICAgICA/IHNuYXBcbiAgICAgICAgICAgICAgICA/IGZpbmQudGFyZ2V0KG5vZGUsIHRhcmdldCwgdmVydGljYWwsIGFsaWduKVxuICAgICAgICAgICAgICAgIDogdGFyZ2V0XG4gICAgICAgICAgICA6IHRhcmdldCA9PT0gMFxuICAgICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICAgIDogZmluZC5wb3NpdGlvbihub2RlLCBpeCwgdmVydGljYWwsIGFsaWduKTtcblxuICAgICAgICBtb3ZlKHBvcyAtIHBvc2l0aW9uLCBkdXJhdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhY2sodGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgUkFGKGZ1bmN0aW9uIHRyYWNrKHRpbWU6IG51bWJlcikge1xuICAgICAgICAgICAgY29uc3QgdiA9ICgxMDAwICogKHBvc2l0aW9uIC0gZnJhbWUpKSAvICgxICsgKHRpbWUgLSB0aW1lc3RhbXApKTtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gKDIgLSBncmF2aXR5KSAqIHYgKyBtYXhNaW4oMSwgMCwgMSAtIGdyYXZpdHkpICogdmVsb2NpdHk7XG4gICAgICAgICAgICB0aW1lc3RhbXAgPSB0aW1lO1xuICAgICAgICAgICAgZnJhbWUgPSBwb3NpdGlvbjtcbiAgICAgICAgICAgIHJhayA9IFJBRih0cmFjayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbCh7IHRhcmdldCwgYW1wbGl0dWRlLCBkdXJhdGlvbiwgdGltZXN0YW1wIH06IFNjcm9sbCkge1xuICAgICAgICBpZiAoYW1wbGl0dWRlKSB7XG4gICAgICAgICAgICBSQUYoZnVuY3Rpb24gc2Nyb2xsKHRpbWU6IG51bWJlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsYXBzZWQgPSAodGltZSAtIHRpbWVzdGFtcCkgLyBkdXJhdGlvbjtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IGFtcGxpdHVkZSAqIE1hdGguZXhwKC1lbGFwc2VkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gcG9zaXRpb24gLSAodGFyZ2V0IC0gZGVsdGEpO1xuXG4gICAgICAgICAgICAgICAgbW92ZShsb29wID8gZGVsdGEgLyAxNi43IDogLWRpc3QpO1xuICAgICAgICAgICAgICAgIHJhZiA9IE1hdGguYWJzKGRlbHRhKSA+IDAuNSA/IFJBRihzY3JvbGwpIDogMDtcbiAgICAgICAgICAgICAgICBpZiAobG9vcCAmJiBNYXRoLmFicyhkZWx0YSkgPCA1KSB0byhpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRG93bihlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgICAgICAvLyBjc3Mobm9kZSwgeyBwb2ludGVyRXZlbnRzOiAoZS50eXBlICE9PSAnbW91c2Vkb3duJyA/ICdhdXRvJyA6ICdub25lJykgfSk7XG4gICAgICAgIGNsZWFyKCk7XG5cbiAgICAgICAgZnJhbWUgPSBwb3NpdGlvbjtcbiAgICAgICAgcmVmZXJlbmNlID0gY29vcmRpbmF0ZShlLCB2ZXJ0aWNhbCk7XG4gICAgICAgIHRyYWNrKHBlcmZvcm1hbmNlLm5vdygpKTtcblxuICAgICAgICBsaXN0ZW4od2luZG93LCB3aW5kb3dFdmVudHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgICAgICBjb25zdCBkZWx0YSA9IChyZWZlcmVuY2UgLSBjb29yZGluYXRlKGUsIHZlcnRpY2FsKSkgKiAoMiAtIGdyYXZpdHkpO1xuICAgICAgICByZWZlcmVuY2UgPSBjb29yZGluYXRlKGUsIHZlcnRpY2FsKTtcbiAgICAgICAgbW92ZShkZWx0YSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25VcChlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgICAgICBjbGVhcigpO1xuXG4gICAgICAgIGNvbnN0IHsgdGFyZ2V0LCBhbXBsaXR1ZGUgfSA9IGRlbHRpbmcocG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChNYXRoLmFicyhhbXBsaXR1ZGUpID4gMTApXG4gICAgICAgICAgICBNYXRoLmFicyh2ZWxvY2l0eSkgPCAxMDBcbiAgICAgICAgICAgICAgICA/IHRvKGluZGV4KVxuICAgICAgICAgICAgICAgIDogY2xhbXBcbiAgICAgICAgICAgICAgICAgICAgPyB0byhpbmRleCwgdGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICA6IHNjcm9sbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbXBsaXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogcGVyZm9ybWFuY2Uubm93KCksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbHRpbmcocG9zaXRpb246IG51bWJlcik6IERlbHRhIHtcbiAgICAgICAgbGV0IGFtcGxpdHVkZSA9ICgyIC0gZ3Jhdml0eSkgKiB2ZWxvY2l0eTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gc25hcFxuICAgICAgICAgICAgPyBmaW5kLnRhcmdldChub2RlLCBwb3NpdGlvbiArIGFtcGxpdHVkZSwgdmVydGljYWwsIGFsaWduKVxuICAgICAgICAgICAgOiBwb3NpdGlvbiArIGFtcGxpdHVkZTtcbiAgICAgICAgYW1wbGl0dWRlID0gdGFyZ2V0IC0gcG9zaXRpb247XG4gICAgICAgIHJldHVybiB7IHRhcmdldCwgYW1wbGl0dWRlIH07XG4gICAgfVxuXG4gICAgbGV0IHdoZWVsaW5nID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gb25XaGVlbChlOiBXaGVlbEV2ZW50KSB7XG4gICAgICAgIGNsZWFyKCk7XG4gICAgICAgIHdoZWVsaW5nID0gdHJ1ZTtcblxuICAgICAgICAoKE1hdGguYWJzKGNvb3JkaW5hdGUoZSwgdmVydGljYWwpKSAmJiBNYXRoLmFicyhjb29yZGluYXRlKGUsIHZlcnRpY2FsKSkgPCAxNSkgfHxcbiAgICAgICAgICAgIGUuc2hpZnRLZXkpICYmXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbW92ZShjb29yZGluYXRlKGUsIHZlcnRpY2FsKSAqICgyIC0gZ3Jhdml0eSkpO1xuXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB0byhpbmRleCAtIE1hdGguc2lnbihlLmRlbHRhWSkpO1xuICAgICAgICBlbHNlIGlmIChzbmFwIHx8IGNsYW1wKVxuICAgICAgICAgICAgd2hlZWx0aW1lID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdG8oaW5kZXgpO1xuICAgICAgICAgICAgICAgIHdoZWVsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5cyhlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRvKGluZGV4IC0gMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdG8oaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVzaXplKGU6IEN1c3RvbUV2ZW50KSB7XG4gICAgICAgIGdhcCA9IGZpbmQuZ2FwKG5vZGUsIHZlcnRpY2FsKTtcbiAgICAgICAgdG8oaW5kZXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTXV0YXRlKGU6IEN1c3RvbUV2ZW50KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIC8vIGdhcCA9IGZpbmQuZ2FwKG5vZGUsIHZlcnRpY2FsKTtcbiAgICAgICAgLy8gdG8oaW5kZXgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgIC8vIGhpcCA9IHBvc2l0aW9uXG4gICAgICAgIC8vIGZyYW1lID0gcG9zaXRpb25cbiAgICAgICAgaGl4ID0gd2hlZWxpbmcgPyBoaXggOiBpbmRleDtcbiAgICAgICAgLy8gY2xlYXJJbnRlcnZhbChkcmFndGltZSk7XG4gICAgICAgIGNsZWFyVGltZW91dCh3aGVlbHRpbWUpO1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWspO1xuICAgICAgICBsaXN0ZW4od2luZG93LCB3aW5kb3dFdmVudHMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICB1cGRhdGUob3B0aW9ucyk7XG4gICAgZnVuY3Rpb24gdXBkYXRlKG9wdGlvbnM6IE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIGdyYXZpdHksXG4gICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICAgIHZlcnRpY2FsLFxuICAgICAgICAgICAgY2xhbXAsXG4gICAgICAgICAgICBsb29wLFxuICAgICAgICAgICAgc25hcCxcbiAgICAgICAgICAgIGFsaWduXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgICAgICAgLy8gICAgIGNvbnN0IGVsZW1lbnQgPSBvYmplY3Rba2V5XTtcblxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgaWYgKGtleSAhPT0gb3B0aW9uc1trZXldKSB7XG4gICAgICAgICAgICAgICAgLy8ga2V5ID0gb3B0aW9uc1trZXldXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coa2V5LCBvcHRpb25zW2tleV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuICAgICAgICAvLyBncmF2aXR5ID0gbWF4TWluKDIsIDAsIG9wdGlvbnMuZ3Jhdml0eSk7XG4gICAgICAgIHZlcnRpY2FsID0gb3B0aW9ucy52ZXJ0aWNhbDtcbiAgICAgICAgYWxpZ24gPSBvcHRpb25zLmFsaWduO1xuICAgICAgICBzbmFwID0gb3B0aW9ucy5zbmFwO1xuICAgICAgICBjbGFtcCA9IG9wdGlvbnMuY2xhbXA7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChpbmRleCAhPT0gb3B0aW9ucy5pbmRleCkge1xuICAgICAgICAgICAgaW5kZXggPSBpbmRleGluZyhub2RlLCBvcHRpb25zLmluZGV4LCBsb29wKTtcbiAgICAgICAgICAgIHRvKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb29wICE9PSBvcHRpb25zLmxvb3ApIHtcbiAgICAgICAgICAgIGxvb3AgPSBvcHRpb25zLmxvb3A7XG4gICAgICAgICAgICBnYXAgPSBmaW5kLmdhcChub2RlLCB2ZXJ0aWNhbCk7XG4gICAgICAgICAgICByZXBsYWNlKG5vZGUsIGluZGV4LCBsb29wKTtcbiAgICAgICAgICAgIHRvKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBmdW5jdGlvbiB1cGRhdGVyKHByb3AsIGNiKSB7XG5cbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBjbGVhcigpO1xuICAgICAgICBSTy5kaXNjb25uZWN0KCk7XG4gICAgICAgIE1PLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgbGlzdGVuKFBBUkVOVCwgcGFyZW50RXZlbnRzLCBmYWxzZSk7XG4gICAgfVxuICAgIHJldHVybiB7IHVwZGF0ZSwgZGVzdHJveSwgdG8gfTtcbn1cbiIsICI8c3ZlbHRlOm9wdGlvbnMgaW1tdXRhYmxlPXt0cnVlfSAvPlxuXG48c2VjdGlvblxuICAgIHRhYmluZGV4PVwiMFwiXG4gICAgYXJpYS1sYWJlbD1cIlNsaWR5XCJcbiAgICBpZD17d3JhcC5pZH1cbiAgICBjbGFzcz1cInNsaWR5XCJcbiAgICBjbGFzczpsb2FkZWQ9e2luaXR9XG4gICAgY2xhc3M6dmVydGljYWw9e29wdGlvbnMudmVydGljYWx9XG4gICAgY2xhc3M6YXV0b3dpZHRoPXtzbGlkZS53aWR0aCA9PT0gJ2F1dG8nfVxuICAgIGNsYXNzOmFudGlsb29wPXtvcHRpb25zLmxvb3AgPT09IGZhbHNlfVxuICAgIGNsYXNzOmFsaWdubWlkZGxlPXt3cmFwLmFsaWduID09PSAnbWlkZGxlJ31cbiAgICBjbGFzczphbGlnbnN0YXJ0PXt3cmFwLmFsaWduID09PSAnc3RhcnQnfVxuICAgIGNsYXNzOmFsaWduZW5kPXt3cmFwLmFsaWduID09PSAnZW5kJ31cbiAgICBzdHlsZT1cIlxuICAgICAgICAtLXdyYXB3OiB7d3JhcC53aWR0aH07XG4gICAgICAgIC0td3JhcGg6IHt3cmFwLmhlaWdodH07XG4gICAgICAgIC0td3JhcHA6IHt3cmFwLnBhZGRpbmd9O1xuICAgICAgICAtLXNsaWRldzoge3NsaWRlLndpZHRofTtcbiAgICAgICAgLS1zbGlkZWg6IHtzbGlkZS5oZWlnaHR9O1xuICAgICAgICAtLXNsaWRlZjoge3NsaWRlLm9iamVjdGZpdH07XG4gICAgICAgIC0tc2xpZGVvOiB7c2xpZGUub3ZlcmZsb3d9O1xuICAgICAgICAtLXNsaWRlZzoge29wdGlvbnMudmVydGljYWxcbiAgICAgICAgPyBgJHtzbGlkZS5nYXB9cHggMCAwIDBgXG4gICAgICAgIDogYDAgMCAwICR7c2xpZGUuZ2FwfXB4YH07XG4gICAgICAgIC0tZHVyOiB7b3B0aW9ucy5kdXJhdGlvbn1tcztcIlxuPlxuICAgIHsjYXdhaXQgc2xpZHlJbml0KHNsaWRlcywgdGltZW91dCkgdGhlbiBzbGlkZXN9XG4gICAgICAgIHsjaWYgIWluaXR9XG4gICAgICAgICAgICA8c2VjdGlvbiBpZD1cImxvYWRlclwiPlxuICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJsb2FkZXJcIj5Mb2FkaW5nLi4uPC9zbG90PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICB7L2lmfVxuICAgICAgICA8dWxcbiAgICAgICAgICAgIGNsYXNzPVwic2xpZHktdWxcIlxuICAgICAgICAgICAgdXNlOnNsaWR5PXt7XG4gICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IG9wdGlvbnMudmVydGljYWwsXG4gICAgICAgICAgICAgICAgYWxpZ246IHdyYXAuYWxpZ24sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgY2xhbXA6IG9wdGlvbnMuY2xhbXAsXG4gICAgICAgICAgICAgICAgZ3Jhdml0eTogb3B0aW9ucy5ncmF2aXR5LFxuICAgICAgICAgICAgICAgIHNuYXA6IG9wdGlvbnMuc25hcCxcbiAgICAgICAgICAgICAgICBsb29wOiBvcHRpb25zLmxvb3AsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb246bW92ZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGUuZGV0YWlsLmluZGV4O1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gZS5kZXRhaWwucG9zaXRpb247XG4gICAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgICA8IS0tIHsjaWYgaW5pdH0gLS0+XG4gICAgICAgICAgICB7I2VhY2ggc2xpZGVzIGFzIGl0ZW0sIGkgKGtleShpdGVtKSl9XG4gICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtaWQ9e2l0ZW0uaXh9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPXtzbGlkZS5jbGFzc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6YWN0aXZlPXtpdGVtLml4ID09PSBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3NsaWRlLmJhY2tpbWcgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYGJhY2tncm91bmQtaW1hZ2U6IHVybCgke2l0ZW1bc2xpZGUuaW1nc3Jja2V5XX0pYFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNsb3Qge2l0ZW19PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyNpZiAhc2xpZGUuYmFja2ltZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17aXRlbVtzbGlkZS5pbWdzcmNrZXldfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2l0ZW1bc2xpZGUuaW1nc3Jja2V5XX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9e2l0ZW0ud2lkdGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17aXRlbS5oZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgICAgPCEtLSB7L2lmfSAtLT5cbiAgICAgICAgPC91bD5cblxuICAgICAgICB7I2lmIGNvbnRyb2xzLmFycm93cyAmJiBpbml0fVxuICAgICAgICAgICAgeyNpZiAhb3B0aW9ucy5sb29wfVxuICAgICAgICAgICAgICAgIHsjaWYgaW5kZXggPiAwfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYXJyb3ctbGVmdFwiIG9uOmNsaWNrPXsoKSA9PiBpbmRleC0tfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJhcnJvdy1sZWZ0XCI+JiM4NTkyOzwvc2xvdD5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICB7I2lmIGluZGV4IDwgc2xpZGVzLmxlbmd0aCAtIDF9XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhcnJvdy1yaWdodFwiIG9uOmNsaWNrPXsoKSA9PiBpbmRleCsrfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJhcnJvdy1yaWdodFwiPiYjODU5NDs8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFycm93LWxlZnRcIiBvbjpjbGljaz17KCkgPT4gaW5kZXgtLX0+XG4gICAgICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJhcnJvdy1sZWZ0XCI+JiM4NTkyOzwvc2xvdD5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYXJyb3ctcmlnaHRcIiBvbjpjbGljaz17KCkgPT4gaW5kZXgrK30+XG4gICAgICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJhcnJvdy1yaWdodFwiPiYjODU5NDs8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB7L2lmfVxuICAgICAgICB7L2lmfVxuICAgICAgICB7I2lmIGNvbnRyb2xzLmRvdHMgJiYgaW5pdH1cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInNsaWR5LWRvdHNcIiBjbGFzczpwdXJlPXtjb250cm9scy5kb3RzcHVyZX0+XG4gICAgICAgICAgICAgICAgeyNpZiBjb250cm9scy5kb3RzYXJyb3d9XG4gICAgICAgICAgICAgICAgICAgIHsjaWYgIW9wdGlvbnMubG9vcH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsjaWYgaW5kZXggPiAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImRvdHMtYXJyb3ctbGVmdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOmNsaWNrPXsoKSA9PiBpbmRleC0tfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImRvdHMtYXJyb3ctbGVmdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PGJ1dHRvbj4mIzg1OTI7PC9idXR0b24+PC9zbG90XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICAgICAgezplbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZG90cy1hcnJvdy1sZWZ0XCIgb246Y2xpY2s9eygpID0+IGluZGV4LS19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJkb3RzLWFycm93LWxlZnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PGJ1dHRvbj4mIzg1OTI7PC9idXR0b24+PC9zbG90XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgICAgIHsjZWFjaCB7IGxlbmd0aDogc2xpZGVzLmxlbmd0aCB9IGFzIGRvdCwgaX1cbiAgICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczphY3RpdmU9e2kgPT09IGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgb246Y2xpY2t8c3RvcFByb3BhZ2F0aW9uPXsoKSA9PiAoaW5kZXggPSBpKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImRvdFwiIHtkb3R9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPntjb250cm9scy5kb3RzbnVtICYmICFjb250cm9scy5kb3RzcHVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnfTwvYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIHsvZWFjaH1cbiAgICAgICAgICAgICAgICB7I2lmIGNvbnRyb2xzLmRvdHNhcnJvd31cbiAgICAgICAgICAgICAgICAgICAgeyNpZiAhb3B0aW9ucy5sb29wfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyNpZiBpbmRleCA8IHNsaWRlcy5sZW5ndGggLSAxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImRvdHMtYXJyb3ctcmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjpjbGljaz17KCkgPT4gaW5kZXgrK31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJkb3RzLWFycm93LXJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48YnV0dG9uPiYjODU5NDs8L2J1dHRvbj48L3Nsb3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJkb3RzLWFycm93LXJpZ2h0XCIgb246Y2xpY2s9eygpID0+IGluZGV4Kyt9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJkb3RzLWFycm93LXJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjxidXR0b24+JiM4NTk0OzwvYnV0dG9uPjwvc2xvdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIHsvaWZ9XG4gICAgey9hd2FpdH1cbjwvc2VjdGlvbj5cblxuPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgICBpbXBvcnQgeyBzbGlkeSB9IGZyb20gJ0BzbGlkeS9jb3JlJztcbiAgICBpbXBvcnQgdHlwZSB7IE9wdGlvbnMgfSBmcm9tICdAc2xpZHkvY29yZSc7XG5cbiAgICBleHBvcnQgbGV0IHNsaWRlczogYW55W10gPSBbXSxcbiAgICAgICAga2V5ID0gKGl0ZW06IHsgW3g6IHN0cmluZ106IGFueTsgaWQ6IGFueSB9KSA9PlxuICAgICAgICAgICAgaXRlbS5pZCB8fCBpdGVtW3NsaWRlLmltZ3NyY2tleV0sXG4gICAgICAgIHdyYXAgPSB7XG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICc1MCUnLFxuICAgICAgICAgICAgcGFkZGluZzogJzAnLFxuICAgICAgICAgICAgYWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgYWxpZ25tYXJnaW46IDAsXG4gICAgICAgIH0sXG4gICAgICAgIHNsaWRlID0ge1xuICAgICAgICAgICAgZ2FwOiAwLFxuICAgICAgICAgICAgY2xhc3M6ICcnLFxuICAgICAgICAgICAgd2lkdGg6ICc1MCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICBiYWNraW1nOiBmYWxzZSxcbiAgICAgICAgICAgIGltZ3NyY2tleTogJ3NyYycsXG4gICAgICAgICAgICBvYmplY3RmaXQ6ICdjb3ZlcicsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xzID0ge1xuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHNudW06IHRydWUsXG4gICAgICAgICAgICBkb3RzYXJyb3c6IHRydWUsXG4gICAgICAgICAgICBkb3RzcHVyZTogZmFsc2UsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBrZXlzOiB0cnVlLFxuICAgICAgICAgICAgZHJhZzogdHJ1ZSxcbiAgICAgICAgICAgIHdoZWVsOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgdmVydGljYWw6IGZhbHNlLFxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzc1LFxuICAgICAgICAgICAgY2xhbXA6IGZhbHNlLFxuICAgICAgICAgICAgc25hcDogdHJ1ZSxcbiAgICAgICAgICAgIGdyYXZpdHk6IDEuMixcbiAgICAgICAgfSxcbiAgICAgICAgaW5kZXggPSA0LFxuICAgICAgICBpbml0ID0gdHJ1ZSxcbiAgICAgICAgdGltZW91dCA9IDAsXG4gICAgICAgIHBvc2l0aW9uID0gMDtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIHNsaWR5SW5pdChcbiAgICAgICAgc2xpZGVzOiBhbnlbXSxcbiAgICAgICAgdGltZW91dCA9IDAsXG4gICAgICAgIGluaXQ6IGJvb2xlYW4gPSBmYWxzZVxuICAgICkge1xuICAgICAgICBzbGlkZXMgPSBzbGlkZXMubWFwKChzLCBpKSA9PiAoeyBpeDogaSwgLi4ucyB9KSk7XG4gICAgICAgIHRpbWVvdXQgPiAwID8gc2V0VGltZW91dCgoKSA9PiAoaW5pdCA9IHRydWUpLCB0aW1lb3V0KSA6IChpbml0ID0gaW5pdCk7XG4gICAgICAgIHJldHVybiBzbGlkZXM7XG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuICAgICNsb2FkZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIH1cbiAgICAuc2xpZHkge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB3aWR0aDogdmFyKC0td3JhcHcpO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXdyYXBoKTtcbiAgICAgICAgb3V0bGluZTogMDtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICB1bCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgfVxuICAgICAgICBidXR0b24ge1xuICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjA5KTtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICY6YWN0aXZlIHtcbiAgICAgICAgICAgICAgICBvdXRsaW5lOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLnNsaWR5LXVsIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcGFkZGluZzogdmFyKC0td3JhcHApO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvdWNoLWFjdGlvbjogcGFuLXk7XG4gICAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XG4gICAgICAgIGxpIHtcbiAgICAgICAgICAgIGZsZXg6IDEgMCBhdXRvO1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgb3ZlcmZsb3c6IHZhcigtLXNsaWRlbyk7XG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgei1pbmRleDogMDtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tZHVyKTtcbiAgICAgICAgICAgIHdpZHRoOiB2YXIoLS1zbGlkZXcpO1xuICAgICAgICAgICAgaGVpZ2h0OiB2YXIoLS1zbGlkZWgpO1xuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IHNjcm9sbDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogdmFyKC0tc2xpZGVmKTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgOmdsb2JhbChpbWcpIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoOiB2YXIoLS13cmFwdyk7XG4gICAgICAgICAgICAgICAgb2JqZWN0LWZpdDogdmFyKC0tc2xpZGVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAuc2xpZHktdWwgPiAqICsgKiB7XG4gICAgICAgIG1hcmdpbjogdmFyKC0tc2xpZGVnKTtcbiAgICB9XG4gICAgLnNsaWR5LmxvYWRlZCAuc2xpZHktdWwgbGkge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICAuc2xpZHkudmVydGljYWwgLnNsaWR5LXVsIHtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB9XG4gICAgOmdsb2JhbCguc2xpZHkuYXV0b3dpZHRoIC5zbGlkeS11bCBsaSBpbWcpIHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgfVxuICAgIC5zbGlkeSBsaS5hY3RpdmUsXG4gICAgLnNsaWR5IGxpLmFjdGl2ZSBidXR0b24ge1xuICAgICAgICBjb2xvcjogcmVkO1xuICAgIH1cbiAgICAuc2xpZHktZG90cyB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICAuc2xpZHkudmVydGljYWwgLnNsaWR5LWRvdHMge1xuICAgICAgICBib3R0b206IGF1dG87XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIH1cbiAgICAuc2xpZHktZG90cyBsaSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICB9XG4gICAgLnNsaWR5LnZlcnRpY2FsIC5kb3RzLWFycm93LWxlZnQsXG4gICAgLnNsaWR5LnZlcnRpY2FsIC5kb3RzLWFycm93LXJpZ2h0IHtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuICAgIH1cbiAgICAuc2xpZHktZG90cy5wdXJlIGxpIHtcbiAgICAgICAgd2lkdGg6IDMycHg7XG4gICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICB9XG4gICAgLnNsaWR5LWRvdHMucHVyZSBsaSBidXR0b24ge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJhY2tncm91bmQ6IHJlZDtcbiAgICAgICAgY29sb3I6IHJlZDtcbiAgICAgICAgd2lkdGg6IDEycHg7XG4gICAgICAgIGhlaWdodDogMTJweDtcbiAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgdmFyKC0tZHVyKTtcbiAgICB9XG4gICAgLnNsaWR5LWRvdHMgbGk6bm90KC5kb3RzLWFycm93LWxlZnQsIC5kb3RzLWFycm93LXJpZ2h0LCAuYWN0aXZlKSB7XG4gICAgICAgIG9wYWNpdHk6IDAuMTg7XG4gICAgfVxuICAgIC5zbGlkeS1kb3RzLnB1cmUgbGkuYWN0aXZlIGJ1dHRvbiB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIC5hcnJvdy1sZWZ0LFxuICAgIC5kb3RzLWFycm93LWxlZnQge1xuICAgICAgICBsZWZ0OiAwO1xuICAgIH1cbiAgICAuYXJyb3ctcmlnaHQsXG4gICAgLmRvdHMtYXJyb3ctcmlnaHQge1xuICAgICAgICByaWdodDogMDtcbiAgICB9XG4gICAgLmFycm93LXJpZ2h0LFxuICAgIC5hcnJvdy1sZWZ0IHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIH1cbiAgICAuc2xpZHktZG90cy5wdXJlIC5kb3RzLWFycm93LWxlZnQgYnV0dG9uLFxuICAgIC5zbGlkeS1kb3RzLnB1cmUgLmRvdHMtYXJyb3ctcmlnaHQgYnV0dG9uIHtcbiAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgIH1cbiAgICAuZG90cy1hcnJvdy1sZWZ0LFxuICAgIC5kb3RzLWFycm93LXJpZ2h0IHtcbiAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgIGhlaWdodDogNTBweDtcbiAgICB9XG48L3N0eWxlPlxuIiwgImV4cG9ydCBpbnRlcmZhY2UgSXRlbSB7XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgc3JjPzogc3RyaW5nO1xuICAgIHdpZHRoPzogbnVtYmVyO1xuICAgIGhlaWdodD86IG51bWJlcjtcbiAgICBhbHQ/OiBzdHJpbmc7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UGhvdG9zKFxuICAgIGxpbWl0OiBudW1iZXIsXG4gICAgcGFnZTogbnVtYmVyLFxuICAgIHdpZHRoID0gMTI4MCxcbiAgICBoZWlnaHQgPSA4MDBcbik6IFByb21pc2U8SXRlbVtdPiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL3BpY3N1bS5waG90b3MvdjIvbGlzdD9saW1pdD0ke2xpbWl0fSZwYWdlPSR7cGFnZX1gLFxuICAgICAgICB7XG4gICAgICAgICAgICBtb2RlOiAnY29ycycsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgLy8gQWNjZXNzQ29udHJvbEFsbG93T3JpZ2luOiAnaHR0cHM6Ly9waWNzdW0ucGhvdG9zJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICkudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcbiAgICByZXR1cm4gcmVzLm1hcCgoaXRlbTogSXRlbSkgPT4ge1xuICAgICAgICBsZXQgYXNwZWN0ID0gYXNwZWN0UShpdGVtLndpZHRoLCBpdGVtLmhlaWdodCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAgIHNyYzogYGh0dHBzOi8vcGljc3VtLnBob3Rvcy9pZC8ke2l0ZW0uaWR9LyR7YXNwZWN0LndpZHRofS8ke2FzcGVjdC5oZWlnaHR9LmpwZ2AsXG4gICAgICAgICAgICB3aWR0aDogYXNwZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBhc3BlY3QuaGVpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYXNwZWN0UShcbiAgICBzcmNXaWR0aDogbnVtYmVyLFxuICAgIHNyY0hlaWdodDogbnVtYmVyLFxuICAgIG1heFdpZHRoOiBudW1iZXIsXG4gICAgbWF4SGVpZ2h0OiBudW1iZXJcbik6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfSB7XG4gICAgbGV0IHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyBzcmNXaWR0aCwgbWF4SGVpZ2h0IC8gc3JjSGVpZ2h0KTtcbiAgICByZXR1cm4ge1xuICAgICAgICB3aWR0aDogTWF0aC5yb3VuZChzcmNXaWR0aCAqIHJhdGlvKSxcbiAgICAgICAgaGVpZ2h0OiBNYXRoLnJvdW5kKHNyY0hlaWdodCAqIHJhdGlvKSxcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgcmFuZG9tUSA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+XG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcblxuZXhwb3J0IGNvbnN0IG1heE1pbiA9IChtYXg6IG51bWJlciwgbWluOiBudW1iZXIsIHZhbDogbnVtYmVyKSA9PlxuICAgIE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCB2YWwpKTtcbiIsICI8c3ZlbHRlOm9wdGlvbnMgaW1tdXRhYmxlPXt0cnVlfSAvPlxuXG48ZmllbGRzZXQ+XG4gICAgPGxlZ2VuZD5cbiAgICAgICAgPGgxPlNsaWR5IHt2ZXJzaW9uLnJlcGxhY2UoL1xcLlteLl0qJC8sICcnKX08c3VwPnN2ZWx0ZUpTPC9zdXA+PC9oMT5cbiAgICAgICAgPGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gKHN0ZW5kID0gIXN0ZW5kKX0gY2xhc3M6YWN0aXZlPXtzdGVuZH1cbiAgICAgICAgICAgID5zdGVuZDwvYnV0dG9uXG4gICAgICAgID5cbiAgICAgICAgPGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gKGltYWdlcyA9ICFpbWFnZXMpfSBjbGFzczphY3RpdmU9e2ltYWdlc31cbiAgICAgICAgICAgID5pbWFnZXM8L2J1dHRvblxuICAgICAgICA+XG4gICAgICAgIDxidXR0b24gb246Y2xpY2s9e2NoYW5nZVNjaGVtZX0gY2xhc3M6YWN0aXZlPXtkYXJrfT5kYXJrPC9idXR0b24+XG4gICAgICAgIDxwPlxuICAgICAgICAgICAgaW5kZXg6IFs8Yj57aW5kZXh9PC9iPl0sIHBvc2l0aW9uOiA8Yj57TWF0aC50cnVuYyhwb3NpdGlvbil9PC9iPnB4XG4gICAgICAgIDwvcD5cbiAgICA8L2xlZ2VuZD5cbiAgICA8IS0tIHsjaWYgaXRlbXMubGVuZ3RofVxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgICAgICAgIG1heD17aXRlbXMubGVuZ3RoIC0gMX1cbiAgICAgICAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgICAgICAgYmluZDp2YWx1ZT17aW5kZXh9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2xhYmVsPlxuICAgIHsvaWZ9IC0tPlxuPC9maWVsZHNldD5cblxuPG1haW4+XG4gICAgeyNhd2FpdCBsb2FkUGhvdG9zKGxpbWl0LCBwYWdlKX1cbiAgICAgICAgbG9hZGluZy4uLlxuICAgIHs6dGhlbiBpdGVtc31cbiAgICAgICAgPFNsaWR5XG4gICAgICAgICAgICBzbGlkZXM9e2l0ZW1zfVxuICAgICAgICAgICAgYmluZDppbmRleFxuICAgICAgICAgICAgd3JhcD17e1xuICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzAnLFxuICAgICAgICAgICAgICAgIGFsaWduLFxuICAgICAgICAgICAgICAgIGFsaWdubWFyZ2luOiAwLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHNsaWRlPXt7XG4gICAgICAgICAgICAgICAgZ2FwLFxuICAgICAgICAgICAgICAgIGNsYXNzOiAnJyxcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICBiYWNraW1nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbWdzcmNrZXk6ICdzcmMnLFxuICAgICAgICAgICAgICAgIG9iamVjdGZpdDogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY29udHJvbHM9e3tcbiAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRvdHNudW06IHRydWUsXG4gICAgICAgICAgICAgICAgZG90c2Fycm93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGRvdHNwdXJlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBrZXlzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRyYWc6IHRydWUsXG4gICAgICAgICAgICAgICAgd2hlZWw6IHRydWUsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb3B0aW9ucz17e1xuICAgICAgICAgICAgICAgIHZlcnRpY2FsLFxuICAgICAgICAgICAgICAgIGxvb3AsXG4gICAgICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgY2xhbXAsXG4gICAgICAgICAgICAgICAgc25hcCxcbiAgICAgICAgICAgICAgICBncmF2aXR5LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGJpbmQ6cG9zaXRpb25cbiAgICAgICAgICAgIGxldDppdGVtXG4gICAgICAgID5cbiAgICAgICAgICAgIHsjaWYgaW1hZ2VzfVxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtpdGVtLnNyY31cbiAgICAgICAgICAgICAgICAgICAgYWx0PXtpdGVtLml4fVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17aXRlbS53aWR0aH1cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtpdGVtLmhlaWdodH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgey9pZn1cbiAgICAgICAgPC9TbGlkeT5cbiAgICB7L2F3YWl0fVxuPC9tYWluPlxuXG48bmF2IGlkPVwiZG90c1wiPlxuICAgIHsjZWFjaCB7IGxlbmd0aDogaXRlbXMubGVuZ3RoIH0gYXMgZG90LCBpfVxuICAgICAgICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiAoaW5kZXggPSBpKX0gY2xhc3M6YWN0aXZlPXtpID09PSBpbmRleH1cbiAgICAgICAgICAgID57aX08L2J1dHRvblxuICAgICAgICA+Jm5ic3A7XG4gICAgey9lYWNofVxuPC9uYXY+XG5cbjxuYXY+XG4gICAgPGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gaW5kZXgtLX0gZGlzYWJsZWQ9eyFsb29wICYmICFpbmRleH0+XHUyMTkwPC9idXR0b24+XG4gICAgPGJ1dHRvblxuICAgICAgICBvbjpjbGljaz17KCkgPT4gaW5kZXgrK31cbiAgICAgICAgZGlzYWJsZWQ9eyFsb29wICYmIGluZGV4ID09PSBpdGVtcy5sZW5ndGggLSAxfT5cdTIxOTI8L2J1dHRvblxuICAgID5cbiAgICA8YnV0dG9uIG9uOmNsaWNrPXtzaHVmZmxlfT48aSBjbGFzcz1cImljb24gaWNvbi1yZWZyZXNoXCIgLz48L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiAodmVydGljYWwgPSAhdmVydGljYWwpfSBjbGFzczphY3RpdmU9e3ZlcnRpY2FsfVxuICAgICAgICA+dmVydGljYWw8L2J1dHRvblxuICAgID5cbiAgICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiAoY2xhbXAgPSAhY2xhbXApfSBjbGFzczphY3RpdmU9e2NsYW1wfT5cbiAgICAgICAgY2xhbXBcbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiAoc25hcCA9ICFzbmFwKX0gY2xhc3M6YWN0aXZlPXtzbmFwfT5zbmFwPC9idXR0b24+XG4gICAgPGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gKGxvb3AgPSAhbG9vcCl9IGNsYXNzOmFjdGl2ZT17bG9vcH0+bG9vcDwvYnV0dG9uPlxuPC9uYXY+XG5cbjxmb3JtPlxuICAgIDxmaWVsZHNldD5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgd2lkdGhcbiAgICAgICAgICAgIDxpbnB1dCBiaW5kOnZhbHVlPXt3aWR0aH0gc2l6ZT1cIjVcIiB3aWR0aD1cImF1dG9cIiAvPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICBsaW1pdFxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgYmluZDp2YWx1ZT17bGltaXR9XG4gICAgICAgICAgICAgICAgc2l6ZT1cIjVcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCIxXCJcbiAgICAgICAgICAgICAgICBtaW49XCIxXCJcbiAgICAgICAgICAgICAgICBtYXg9XCIxMDBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgZ2FwXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICBiaW5kOnZhbHVlPXtnYXB9XG4gICAgICAgICAgICAgICAgc2l6ZT1cIjVcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCIxXCJcbiAgICAgICAgICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgICAgICAgICBtYXg9XCIxMDBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICA8L2ZpZWxkc2V0PlxuICAgIDxmaWVsZHNldD5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgZHVyYXRpb25cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIGJpbmQ6dmFsdWU9e2R1cmF0aW9ufVxuICAgICAgICAgICAgICAgIHNpemU9XCI1XCJcbiAgICAgICAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgICAgICAgbWluPVwiMTAwXCJcbiAgICAgICAgICAgICAgICBtYXg9XCIxMDAwXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIGdyYXZpdHlcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIGJpbmQ6dmFsdWU9e2dyYXZpdHl9XG4gICAgICAgICAgICAgICAgc2l6ZT1cIjVcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCIwLjFcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjAuMVwiXG4gICAgICAgICAgICAgICAgbWF4PVwiMlwiXG4gICAgICAgICAgICAgICAgd2lkdGg9XCJhdXRvXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIGFsaWduXG4gICAgICAgICAgICA8c2VsZWN0IGJpbmQ6dmFsdWU9e2FsaWdufT5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3RhcnRcIj5cdTIxOTAgc3RhcnQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibWlkZGxlXCI+bWlkZGxlPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImVuZFwiPmVuZCBcdTIxOTI8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2xhYmVsPlxuICAgIDwvZmllbGRzZXQ+XG48L2Zvcm0+XG5cbjxzY3JpcHQgbGFuZz1cInRzXCIgY29udGV4dD1cIm1vZHVsZVwiPlxuICAgIGltcG9ydCB7IGdldFBob3RvcywgcmFuZG9tUSB9IGZyb20gJy4vc2NyaXB0cy9hcGknO1xuICAgIGltcG9ydCBTbGlkeSBmcm9tICcuLi8uLi9zcmMvU2xpZHkuc3ZlbHRlJztcbiAgICBpbXBvcnQgeyBuYW1lLCB2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcblxuICAgIGltcG9ydCB0eXBlIHsgSXRlbSB9IGZyb20gJy4vc2NyaXB0cy9hcGknO1xuPC9zY3JpcHQ+XG5cbjxzY3JpcHQgbGFuZz1cInRzXCI+XG4gICAgbGV0IGl0ZW1zOiBJdGVtW10gPSBbXSxcbiAgICAgICAgcG9zaXRpb24gPSAwLFxuICAgICAgICBwYWdlID0gcmFuZG9tUSgwLCA5MCksXG4gICAgICAgIGxpbWl0ID0gMTUsXG4gICAgICAgIGluZGV4ID0gNyxcbiAgICAgICAgdmVydGljYWwgPSBmYWxzZSxcbiAgICAgICAgY2xhbXAgPSBmYWxzZSxcbiAgICAgICAgYWxpZ24gPSAnbWlkZGxlJyxcbiAgICAgICAgZHVyYXRpb24gPSAzNzUsXG4gICAgICAgIHN0ZW5kID0gZmFsc2UsXG4gICAgICAgIGdyYXZpdHkgPSAxLjIsXG4gICAgICAgIHdpZHRoID0gJ2F1dG8nLFxuICAgICAgICBzbmFwID0gdHJ1ZSxcbiAgICAgICAgaW1hZ2VzID0gdHJ1ZSxcbiAgICAgICAgbG9vcCA9IHRydWUsXG4gICAgICAgIGdhcCA9IDE2O1xuXG4gICAgJDogZGFyayA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcblxuICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRQaG90b3MobGltaXQ6IG51bWJlciwgcGFnZTogbnVtYmVyKSB7XG4gICAgICAgIGl0ZW1zID0gYXdhaXQgZ2V0UGhvdG9zKGxpbWl0LCBwYWdlKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYW5nZVNjaGVtZShzY2hlbWUpIHtcbiAgICAgICAgY29uc3QgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgaHRtbC5zZXRBdHRyaWJ1dGUoJ3NjaGVtZScsICFkYXJrID8gJ2RhcmsnIDogJ2xpZ2h0Jyk7XG4gICAgICAgIGRhcmsgPSAhZGFyaztcbiAgICB9XG4gICAgY29uc3Qgc2h1ZmZsZSA9ICgpID0+IChwYWdlID0gcmFuZG9tUSgwLCA5MCkpO1xuXG4gICAgY29uc3QgbXFMaXN0ID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKTtcbiAgICAvLyAkOiBjb25zb2xlLmxvZyhtcUxpc3QsIGRhcmspO1xuXG4gICAgLy8gJDogZGlzYWJsZWQgPSAhbG9vcCAmJiAoIWluZGV4IHx8IGluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4gICAgbmF2IHtcbiAgICAgICAgbWFyZ2luOiAxcmVtIDA7XG4gICAgICAgICYjZG90cyB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0IHtcbiAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIH1cblxuICAgIGxhYmVsIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1mbG93OiBjb2x1bW47XG4gICAgfVxuICAgIGZvcm0ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgICYgPiAqIHtcbiAgICAgICAgICAgIGZsZXg6IDAgYXV0bztcbiAgICAgICAgICAgIGdhcDogMXJlbTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuaWNvbjo6YWZ0ZXIsXG4gICAgLmljb246OmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICB9XG4gICAgLmljb24tcmVmcmVzaDo6YWZ0ZXIge1xuICAgICAgICBib3JkZXI6IDAuMmVtIHNvbGlkIGN1cnJlbnRDb2xvcjtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogY3VycmVudGNvbG9yO1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogY3VycmVudGNvbG9yO1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIGxlZnQ6IDgwJTtcbiAgICAgICAgdG9wOiAtMC4yNWVtO1xuICAgICAgICB3aWR0aDogMDtcbiAgICB9XG4gICAgLmljb24tcmVmcmVzaDo6YmVmb3JlIHtcbiAgICAgICAgYm9yZGVyOiAwLjEycmVtIHNvbGlkIGN1cnJlbnRDb2xvcjtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiBjdXJyZW50Y29sb3I7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgaGVpZ2h0OiAwLjc1ZW07XG4gICAgICAgIHdpZHRoOiAwLjc1ZW07XG4gICAgfVxuICAgIC5pY29uIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRleHQtaW5kZW50OiAtOTk5OXB4O1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogc3VwZXI7XG4gICAgICAgIHdpZHRoOiAxZW07XG4gICAgfVxuPC9zdHlsZT5cbiIsICJpbXBvcnQgQXBwIGZyb20gJy4vQXBwLnN2ZWx0ZSc7XG5cbnZhciBhcHAgPSBuZXcgQXBwKHtcbiAgICB0YXJnZXQ6IGRvY3VtZW50LmJvZHksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxrQkFBZ0I7QUFBQTtBQUVoQixrQkFBZ0IsS0FBSyxLQUFLO0FBRXRCLGVBQVcsS0FBSztBQUNaLFVBQUksS0FBSyxJQUFJO0FBQ2pCLFdBQU87QUFBQTtBQUVYLHNCQUFvQixPQUFPO0FBQ3ZCLFdBQU8sU0FBUyxPQUFPLFVBQVUsWUFBWSxPQUFPLE1BQU0sU0FBUztBQUFBO0FBT3ZFLGVBQWEsSUFBSTtBQUNiLFdBQU87QUFBQTtBQUVYLDBCQUF3QjtBQUNwQixXQUFPLHVCQUFPLE9BQU87QUFBQTtBQUV6QixtQkFBaUIsS0FBSztBQUNsQixRQUFJLFFBQVE7QUFBQTtBQUVoQix1QkFBcUIsT0FBTztBQUN4QixXQUFPLE9BQU8sVUFBVTtBQUFBO0FBSzVCLE1BQUk7QUFDSix5QkFBdUIsYUFBYSxLQUFLO0FBQ3JDLFFBQUksQ0FBQyxzQkFBc0I7QUFDdkIsNkJBQXVCLFNBQVMsY0FBYztBQUFBO0FBRWxELHlCQUFxQixPQUFPO0FBQzVCLFdBQU8sZ0JBQWdCLHFCQUFxQjtBQUFBO0FBRWhELHFCQUFtQixHQUFHLEdBQUc7QUFDckIsV0FBTyxLQUFLLElBQUksS0FBSyxJQUFJLE1BQU07QUFBQTtBQUVuQyxvQkFBa0IsS0FBSztBQUNuQixXQUFPLE9BQU8sS0FBSyxLQUFLLFdBQVc7QUFBQTtBQXNCdkMsdUJBQXFCLFlBQVksS0FBSyxTQUFTLElBQUk7QUFDL0MsUUFBSSxZQUFZO0FBQ1osWUFBTSxXQUFXLGlCQUFpQixZQUFZLEtBQUssU0FBUztBQUM1RCxhQUFPLFdBQVcsR0FBRztBQUFBO0FBQUE7QUFHN0IsNEJBQTBCLFlBQVksS0FBSyxTQUFTLElBQUk7QUFDcEQsV0FBTyxXQUFXLE1BQU0sS0FDbEIsT0FBTyxRQUFRLElBQUksU0FBUyxXQUFXLEdBQUcsR0FBRyxTQUM3QyxRQUFRO0FBQUE7QUFFbEIsNEJBQTBCLFlBQVksU0FBUyxPQUFPLElBQUk7QUFDdEQsUUFBSSxXQUFXLE1BQU0sSUFBSTtBQUNyQixZQUFNLE9BQU8sV0FBVyxHQUFHLEdBQUc7QUFDOUIsVUFBSSxRQUFRLFVBQVUsUUFBVztBQUM3QixlQUFPO0FBQUE7QUFFWCxVQUFJLE9BQU8sU0FBUyxVQUFVO0FBQzFCLGNBQU0sU0FBUztBQUNmLGNBQU0sTUFBTSxLQUFLLElBQUksUUFBUSxNQUFNLFFBQVEsS0FBSztBQUNoRCxpQkFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRztBQUM3QixpQkFBTyxLQUFLLFFBQVEsTUFBTSxLQUFLLEtBQUs7QUFBQTtBQUV4QyxlQUFPO0FBQUE7QUFFWCxhQUFPLFFBQVEsUUFBUTtBQUFBO0FBRTNCLFdBQU8sUUFBUTtBQUFBO0FBRW5CLDRCQUEwQixNQUFNLGlCQUFpQixLQUFLLFNBQVMsY0FBYyxxQkFBcUI7QUFDOUYsUUFBSSxjQUFjO0FBQ2QsWUFBTSxlQUFlLGlCQUFpQixpQkFBaUIsS0FBSyxTQUFTO0FBQ3JFLFdBQUssRUFBRSxjQUFjO0FBQUE7QUFBQTtBQU83QixvQ0FBa0MsU0FBUztBQUN2QyxRQUFJLFFBQVEsSUFBSSxTQUFTLElBQUk7QUFDekIsWUFBTSxRQUFRO0FBQ2QsWUFBTSxTQUFTLFFBQVEsSUFBSSxTQUFTO0FBQ3BDLGVBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxLQUFLO0FBQzdCLGNBQU0sS0FBSztBQUFBO0FBRWYsYUFBTztBQUFBO0FBRVgsV0FBTztBQUFBO0FBaUNYLHlCQUF1QixPQUFPO0FBQzFCLFdBQU8sU0FBUyxPQUFPLEtBQUs7QUFBQTtBQU9oQyw0QkFBMEIsZUFBZTtBQUNyQyxXQUFPLGlCQUFpQixZQUFZLGNBQWMsV0FBVyxjQUFjLFVBQVU7QUFBQTtBQXFEekYsTUFBSSxlQUFlO0FBQ25CLDZCQUEyQjtBQUN2QixtQkFBZTtBQUFBO0FBRW5CLDJCQUF5QjtBQUNyQixtQkFBZTtBQUFBO0FBOEZuQixrQkFBZ0IsUUFBUSxNQUFNO0FBQzFCLFdBQU8sWUFBWTtBQUFBO0FBb0R2QixrQkFBZ0IsUUFBUSxNQUFNLFFBQVE7QUFDbEMsV0FBTyxhQUFhLE1BQU0sVUFBVTtBQUFBO0FBVXhDLGtCQUFnQixNQUFNO0FBQ2xCLFNBQUssV0FBVyxZQUFZO0FBQUE7QUFFaEMsd0JBQXNCLFlBQVksV0FBVztBQUN6QyxhQUFTLElBQUksR0FBRyxJQUFJLFdBQVcsUUFBUSxLQUFLLEdBQUc7QUFDM0MsVUFBSSxXQUFXO0FBQ1gsbUJBQVcsR0FBRyxFQUFFO0FBQUE7QUFBQTtBQUc1QixtQkFBaUIsT0FBTTtBQUNuQixXQUFPLFNBQVMsY0FBYztBQUFBO0FBb0JsQyxnQkFBYyxNQUFNO0FBQ2hCLFdBQU8sU0FBUyxlQUFlO0FBQUE7QUFFbkMsbUJBQWlCO0FBQ2IsV0FBTyxLQUFLO0FBQUE7QUFFaEIsbUJBQWlCO0FBQ2IsV0FBTyxLQUFLO0FBQUE7QUFFaEIsa0JBQWdCLE1BQU0sT0FBTyxTQUFTLFNBQVM7QUFDM0MsU0FBSyxpQkFBaUIsT0FBTyxTQUFTO0FBQ3RDLFdBQU8sTUFBTSxLQUFLLG9CQUFvQixPQUFPLFNBQVM7QUFBQTtBQVMxRCw0QkFBMEIsSUFBSTtBQUMxQixXQUFPLFNBQVUsT0FBTztBQUNwQixZQUFNO0FBRU4sYUFBTyxHQUFHLEtBQUssTUFBTTtBQUFBO0FBQUE7QUFpQjdCLGdCQUFjLE1BQU0sV0FBVyxPQUFPO0FBQ2xDLFFBQUksU0FBUztBQUNULFdBQUssZ0JBQWdCO0FBQUEsYUFDaEIsS0FBSyxhQUFhLGVBQWU7QUFDdEMsV0FBSyxhQUFhLFdBQVc7QUFBQTtBQWtEckMscUJBQW1CLE9BQU87QUFDdEIsV0FBTyxVQUFVLEtBQUssT0FBTyxDQUFDO0FBQUE7QUFTbEMsb0JBQWtCLFVBQVM7QUFDdkIsV0FBTyxNQUFNLEtBQUssU0FBUTtBQUFBO0FBd0g5QixvQkFBa0IsT0FBTSxNQUFNO0FBQzFCLFdBQU8sS0FBSztBQUNaLFFBQUksTUFBSyxjQUFjO0FBQ25CLFlBQUssT0FBTztBQUFBO0FBRXBCLDJCQUF5QixPQUFPLE9BQU87QUFDbkMsVUFBTSxRQUFRLFNBQVMsT0FBTyxLQUFLO0FBQUE7QUFVdkMscUJBQW1CLE1BQU0sS0FBSyxPQUFPLFdBQVc7QUFDNUMsUUFBSSxVQUFVLE1BQU07QUFDaEIsV0FBSyxNQUFNLGVBQWU7QUFBQSxXQUV6QjtBQUNELFdBQUssTUFBTSxZQUFZLEtBQUssT0FBTyxZQUFZLGNBQWM7QUFBQTtBQUFBO0FBR3JFLHlCQUF1QixRQUFRLE9BQU87QUFDbEMsYUFBUyxJQUFJLEdBQUcsSUFBSSxPQUFPLFFBQVEsUUFBUSxLQUFLLEdBQUc7QUFDL0MsWUFBTSxTQUFTLE9BQU8sUUFBUTtBQUM5QixVQUFJLE9BQU8sWUFBWSxPQUFPO0FBQzFCLGVBQU8sV0FBVztBQUNsQjtBQUFBO0FBQUE7QUFHUixXQUFPLGdCQUFnQjtBQUFBO0FBUTNCLHdCQUFzQixRQUFRO0FBQzFCLFVBQU0sa0JBQWtCLE9BQU8sY0FBYyxlQUFlLE9BQU8sUUFBUTtBQUMzRSxXQUFPLG1CQUFtQixnQkFBZ0I7QUFBQTtBQTBEOUMsd0JBQXNCLFVBQVMsT0FBTSxRQUFRO0FBQ3pDLGFBQVEsVUFBVSxTQUFTLFFBQVEsVUFBVTtBQUFBO0FBcU5qRCxNQUFJO0FBQ0osaUNBQStCLFdBQVc7QUFDdEMsd0JBQW9CO0FBQUE7QUFFeEIsbUNBQWlDO0FBQzdCLFFBQUksQ0FBQztBQUNELFlBQU0sSUFBSSxNQUFNO0FBQ3BCLFdBQU87QUFBQTtBQW1EWCxNQUFNLG1CQUFtQjtBQUV6QixNQUFNLG9CQUFvQjtBQUMxQixNQUFNLG1CQUFtQjtBQUN6QixNQUFNLGtCQUFrQjtBQUN4QixNQUFNLG1CQUFtQixRQUFRO0FBQ2pDLE1BQUksbUJBQW1CO0FBQ3ZCLDZCQUEyQjtBQUN2QixRQUFJLENBQUMsa0JBQWtCO0FBQ25CLHlCQUFtQjtBQUNuQix1QkFBaUIsS0FBSztBQUFBO0FBQUE7QUFPOUIsK0JBQTZCLElBQUk7QUFDN0IscUJBQWlCLEtBQUs7QUFBQTtBQUUxQiw4QkFBNEIsSUFBSTtBQUM1QixvQkFBZ0IsS0FBSztBQUFBO0FBb0J6QixNQUFNLGlCQUFpQixvQkFBSTtBQUMzQixNQUFJLFdBQVc7QUFDZixtQkFBaUI7QUFDYixVQUFNLGtCQUFrQjtBQUN4QixPQUFHO0FBR0MsYUFBTyxXQUFXLGlCQUFpQixRQUFRO0FBQ3ZDLGNBQU0sWUFBWSxpQkFBaUI7QUFDbkM7QUFDQSw4QkFBc0I7QUFDdEIsZUFBTyxVQUFVO0FBQUE7QUFFckIsNEJBQXNCO0FBQ3RCLHVCQUFpQixTQUFTO0FBQzFCLGlCQUFXO0FBQ1gsYUFBTyxrQkFBa0I7QUFDckIsMEJBQWtCO0FBSXRCLGVBQVMsSUFBSSxHQUFHLElBQUksaUJBQWlCLFFBQVEsS0FBSyxHQUFHO0FBQ2pELGNBQU0sV0FBVyxpQkFBaUI7QUFDbEMsWUFBSSxDQUFDLGVBQWUsSUFBSSxXQUFXO0FBRS9CLHlCQUFlLElBQUk7QUFDbkI7QUFBQTtBQUFBO0FBR1IsdUJBQWlCLFNBQVM7QUFBQSxhQUNyQixpQkFBaUI7QUFDMUIsV0FBTyxnQkFBZ0IsUUFBUTtBQUMzQixzQkFBZ0I7QUFBQTtBQUVwQix1QkFBbUI7QUFDbkIsbUJBQWU7QUFDZiwwQkFBc0I7QUFBQTtBQUUxQixrQkFBZ0IsSUFBSTtBQUNoQixRQUFJLEdBQUcsYUFBYSxNQUFNO0FBQ3RCLFNBQUc7QUFDSCxjQUFRLEdBQUc7QUFDWCxZQUFNLFFBQVEsR0FBRztBQUNqQixTQUFHLFFBQVEsQ0FBQztBQUNaLFNBQUcsWUFBWSxHQUFHLFNBQVMsRUFBRSxHQUFHLEtBQUs7QUFDckMsU0FBRyxhQUFhLFFBQVE7QUFBQTtBQUFBO0FBaUJoQyxNQUFNLFdBQVcsb0JBQUk7QUFDckIsTUFBSTtBQUNKLDBCQUF3QjtBQUNwQixhQUFTO0FBQUEsTUFDTCxHQUFHO0FBQUEsTUFDSCxHQUFHO0FBQUEsTUFDSCxHQUFHO0FBQUE7QUFBQTtBQUdYLDBCQUF3QjtBQUNwQixRQUFJLENBQUMsT0FBTyxHQUFHO0FBQ1gsY0FBUSxPQUFPO0FBQUE7QUFFbkIsYUFBUyxPQUFPO0FBQUE7QUFFcEIseUJBQXVCLE9BQU8sT0FBTztBQUNqQyxRQUFJLFNBQVMsTUFBTSxHQUFHO0FBQ2xCLGVBQVMsT0FBTztBQUNoQixZQUFNLEVBQUU7QUFBQTtBQUFBO0FBR2hCLDBCQUF3QixPQUFPLE9BQU8sU0FBUSxVQUFVO0FBQ3BELFFBQUksU0FBUyxNQUFNLEdBQUc7QUFDbEIsVUFBSSxTQUFTLElBQUk7QUFDYjtBQUNKLGVBQVMsSUFBSTtBQUNiLGFBQU8sRUFBRSxLQUFLLE1BQU07QUFDaEIsaUJBQVMsT0FBTztBQUNoQixZQUFJLFVBQVU7QUFDVixjQUFJO0FBQ0Esa0JBQU0sRUFBRTtBQUNaO0FBQUE7QUFBQTtBQUdSLFlBQU0sRUFBRTtBQUFBO0FBQUE7QUFxT2hCLDBCQUF3QixTQUFTLE1BQU07QUFDbkMsVUFBTSxRQUFRLEtBQUssUUFBUTtBQUMzQixxQkFBZ0IsTUFBTSxPQUFPLEtBQUssT0FBTztBQUNyQyxVQUFJLEtBQUssVUFBVTtBQUNmO0FBQ0osV0FBSyxXQUFXO0FBQ2hCLFVBQUksWUFBWSxLQUFLO0FBQ3JCLFVBQUksUUFBUSxRQUFXO0FBQ25CLG9CQUFZLFVBQVU7QUFDdEIsa0JBQVUsT0FBTztBQUFBO0FBRXJCLFlBQU0sUUFBUSxRQUFTLE1BQUssVUFBVSxNQUFNO0FBQzVDLFVBQUksY0FBYztBQUNsQixVQUFJLEtBQUssT0FBTztBQUNaLFlBQUksS0FBSyxRQUFRO0FBQ2IsZUFBSyxPQUFPLFFBQVEsQ0FBQyxRQUFPLE1BQU07QUFDOUIsZ0JBQUksTUFBTSxTQUFTLFFBQU87QUFDdEI7QUFDQSw2QkFBZSxRQUFPLEdBQUcsR0FBRyxNQUFNO0FBQzlCLG9CQUFJLEtBQUssT0FBTyxPQUFPLFFBQU87QUFDMUIsdUJBQUssT0FBTyxLQUFLO0FBQUE7QUFBQTtBQUd6QjtBQUFBO0FBQUE7QUFBQSxlQUlQO0FBQ0QsZUFBSyxNQUFNLEVBQUU7QUFBQTtBQUVqQixjQUFNO0FBQ04sc0JBQWMsT0FBTztBQUNyQixjQUFNLEVBQUUsS0FBSyxTQUFTLEtBQUs7QUFDM0Isc0JBQWM7QUFBQTtBQUVsQixXQUFLLFFBQVE7QUFDYixVQUFJLEtBQUs7QUFDTCxhQUFLLE9BQU8sU0FBUztBQUN6QixVQUFJLGFBQWE7QUFDYjtBQUFBO0FBQUE7QUFHUixRQUFJLFdBQVcsVUFBVTtBQUNyQixZQUFNLHFCQUFvQjtBQUMxQixjQUFRLEtBQUssV0FBUztBQUNsQiw4QkFBc0I7QUFDdEIsZ0JBQU8sS0FBSyxNQUFNLEdBQUcsS0FBSyxPQUFPO0FBQ2pDLDhCQUFzQjtBQUFBLFNBQ3ZCLFdBQVM7QUFDUiw4QkFBc0I7QUFDdEIsZ0JBQU8sS0FBSyxPQUFPLEdBQUcsS0FBSyxPQUFPO0FBQ2xDLDhCQUFzQjtBQUN0QixZQUFJLENBQUMsS0FBSyxVQUFVO0FBQ2hCLGdCQUFNO0FBQUE7QUFBQTtBQUlkLFVBQUksS0FBSyxZQUFZLEtBQUssU0FBUztBQUMvQixnQkFBTyxLQUFLLFNBQVM7QUFDckIsZUFBTztBQUFBO0FBQUEsV0FHVjtBQUNELFVBQUksS0FBSyxZQUFZLEtBQUssTUFBTTtBQUM1QixnQkFBTyxLQUFLLE1BQU0sR0FBRyxLQUFLLE9BQU87QUFDakMsZUFBTztBQUFBO0FBRVgsV0FBSyxXQUFXO0FBQUE7QUFBQTtBQUd4QixxQ0FBbUMsTUFBTSxLQUFLLE9BQU87QUFDakQsVUFBTSxZQUFZLElBQUk7QUFDdEIsVUFBTSxFQUFFLGFBQWE7QUFDckIsUUFBSSxLQUFLLFlBQVksS0FBSyxNQUFNO0FBQzVCLGdCQUFVLEtBQUssU0FBUztBQUFBO0FBRTVCLFFBQUksS0FBSyxZQUFZLEtBQUssT0FBTztBQUM3QixnQkFBVSxLQUFLLFNBQVM7QUFBQTtBQUU1QixTQUFLLE1BQU0sRUFBRSxXQUFXO0FBQUE7QUFHNUIsTUFBTSxVQUFXLE9BQU8sV0FBVyxjQUM3QixTQUNBLE9BQU8sZUFBZSxjQUNsQixhQUNBO0FBTVYsbUNBQWlDLE9BQU8sUUFBUTtBQUM1QyxtQkFBZSxPQUFPLEdBQUcsR0FBRyxNQUFNO0FBQzlCLGFBQU8sT0FBTyxNQUFNO0FBQUE7QUFBQTtBQVc1Qiw2QkFBMkIsWUFBWSxPQUFPLFNBQVMsU0FBUyxLQUFLLE1BQU0sUUFBUSxNQUFNLFNBQVMsb0JBQW1CLE9BQU0sYUFBYTtBQUNwSSxRQUFJLElBQUksV0FBVztBQUNuQixRQUFJLElBQUksS0FBSztBQUNiLFFBQUksSUFBSTtBQUNSLFVBQU0sY0FBYztBQUNwQixXQUFPO0FBQ0gsa0JBQVksV0FBVyxHQUFHLE9BQU87QUFDckMsVUFBTSxhQUFhO0FBQ25CLFVBQU0sYUFBYSxvQkFBSTtBQUN2QixVQUFNLFNBQVMsb0JBQUk7QUFDbkIsUUFBSTtBQUNKLFdBQU8sS0FBSztBQUNSLFlBQU0sWUFBWSxZQUFZLEtBQUssTUFBTTtBQUN6QyxZQUFNLE1BQU0sUUFBUTtBQUNwQixVQUFJLFFBQVEsT0FBTyxJQUFJO0FBQ3ZCLFVBQUksQ0FBQyxPQUFPO0FBQ1IsZ0JBQVEsbUJBQWtCLEtBQUs7QUFDL0IsY0FBTTtBQUFBLGlCQUVELFNBQVM7QUFDZCxjQUFNLEVBQUUsV0FBVztBQUFBO0FBRXZCLGlCQUFXLElBQUksS0FBSyxXQUFXLEtBQUs7QUFDcEMsVUFBSSxPQUFPO0FBQ1AsZUFBTyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksWUFBWTtBQUFBO0FBRWpELFVBQU0sWUFBWSxvQkFBSTtBQUN0QixVQUFNLFdBQVcsb0JBQUk7QUFDckIscUJBQWdCLE9BQU87QUFDbkIsb0JBQWMsT0FBTztBQUNyQixZQUFNLEVBQUUsTUFBTTtBQUNkLGFBQU8sSUFBSSxNQUFNLEtBQUs7QUFDdEIsY0FBTyxNQUFNO0FBQ2I7QUFBQTtBQUVKLFdBQU8sS0FBSyxHQUFHO0FBQ1gsWUFBTSxZQUFZLFdBQVcsSUFBSTtBQUNqQyxZQUFNLFlBQVksV0FBVyxJQUFJO0FBQ2pDLFlBQU0sVUFBVSxVQUFVO0FBQzFCLFlBQU0sVUFBVSxVQUFVO0FBQzFCLFVBQUksY0FBYyxXQUFXO0FBRXpCLGdCQUFPLFVBQVU7QUFDakI7QUFDQTtBQUFBLGlCQUVLLENBQUMsV0FBVyxJQUFJLFVBQVU7QUFFL0IsZ0JBQVEsV0FBVztBQUNuQjtBQUFBLGlCQUVLLENBQUMsT0FBTyxJQUFJLFlBQVksVUFBVSxJQUFJLFVBQVU7QUFDckQsZ0JBQU87QUFBQSxpQkFFRixTQUFTLElBQUksVUFBVTtBQUM1QjtBQUFBLGlCQUVLLE9BQU8sSUFBSSxXQUFXLE9BQU8sSUFBSSxVQUFVO0FBQ2hELGlCQUFTLElBQUk7QUFDYixnQkFBTztBQUFBLGFBRU47QUFDRCxrQkFBVSxJQUFJO0FBQ2Q7QUFBQTtBQUFBO0FBR1IsV0FBTyxLQUFLO0FBQ1IsWUFBTSxZQUFZLFdBQVc7QUFDN0IsVUFBSSxDQUFDLFdBQVcsSUFBSSxVQUFVO0FBQzFCLGdCQUFRLFdBQVc7QUFBQTtBQUUzQixXQUFPO0FBQ0gsY0FBTyxXQUFXLElBQUk7QUFDMUIsV0FBTztBQUFBO0FBK09YLGdCQUFjLFdBQVcsT0FBTSxVQUFVO0FBQ3JDLFVBQU0sUUFBUSxVQUFVLEdBQUcsTUFBTTtBQUNqQyxRQUFJLFVBQVUsUUFBVztBQUNyQixnQkFBVSxHQUFHLE1BQU0sU0FBUztBQUM1QixlQUFTLFVBQVUsR0FBRyxJQUFJO0FBQUE7QUFBQTtBQUdsQyw0QkFBMEIsT0FBTztBQUM3QixhQUFTLE1BQU07QUFBQTtBQUtuQiwyQkFBeUIsV0FBVyxRQUFRLFFBQVEsZUFBZTtBQUMvRCxVQUFNLEVBQUUsVUFBVSxVQUFVLFlBQVksaUJBQWlCLFVBQVU7QUFDbkUsZ0JBQVksU0FBUyxFQUFFLFFBQVE7QUFDL0IsUUFBSSxDQUFDLGVBQWU7QUFFaEIsMEJBQW9CLE1BQU07QUFDdEIsY0FBTSxpQkFBaUIsU0FBUyxJQUFJLEtBQUssT0FBTztBQUNoRCxZQUFJLFlBQVk7QUFDWixxQkFBVyxLQUFLLEdBQUc7QUFBQSxlQUVsQjtBQUdELGtCQUFRO0FBQUE7QUFFWixrQkFBVSxHQUFHLFdBQVc7QUFBQTtBQUFBO0FBR2hDLGlCQUFhLFFBQVE7QUFBQTtBQUV6Qiw2QkFBMkIsV0FBVyxXQUFXO0FBQzdDLFVBQU0sS0FBSyxVQUFVO0FBQ3JCLFFBQUksR0FBRyxhQUFhLE1BQU07QUFDdEIsY0FBUSxHQUFHO0FBQ1gsU0FBRyxZQUFZLEdBQUcsU0FBUyxFQUFFO0FBRzdCLFNBQUcsYUFBYSxHQUFHLFdBQVc7QUFDOUIsU0FBRyxNQUFNO0FBQUE7QUFBQTtBQUdqQixzQkFBb0IsV0FBVyxHQUFHO0FBQzlCLFFBQUksVUFBVSxHQUFHLE1BQU0sT0FBTyxJQUFJO0FBQzlCLHVCQUFpQixLQUFLO0FBQ3RCO0FBQ0EsZ0JBQVUsR0FBRyxNQUFNLEtBQUs7QUFBQTtBQUU1QixjQUFVLEdBQUcsTUFBTyxJQUFJLEtBQU0sTUFBTyxLQUFNLElBQUk7QUFBQTtBQUVuRCxnQkFBYyxXQUFXLFNBQVMsV0FBVSxrQkFBaUIsWUFBVyxPQUFPLGVBQWUsUUFBUSxDQUFDLEtBQUs7QUFDeEcsVUFBTSxtQkFBbUI7QUFDekIsMEJBQXNCO0FBQ3RCLFVBQU0sS0FBSyxVQUFVLEtBQUs7QUFBQSxNQUN0QixVQUFVO0FBQUEsTUFDVixLQUFLO0FBQUEsTUFFTDtBQUFBLE1BQ0EsUUFBUTtBQUFBLE1BQ1I7QUFBQSxNQUNBLE9BQU87QUFBQSxNQUVQLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxNQUNaLGVBQWU7QUFBQSxNQUNmLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLFNBQVMsSUFBSSxJQUFJLFFBQVEsV0FBWSxvQkFBbUIsaUJBQWlCLEdBQUcsVUFBVTtBQUFBLE1BRXRGLFdBQVc7QUFBQSxNQUNYO0FBQUEsTUFDQSxZQUFZO0FBQUEsTUFDWixNQUFNLFFBQVEsVUFBVSxpQkFBaUIsR0FBRztBQUFBO0FBRWhELHFCQUFpQixjQUFjLEdBQUc7QUFDbEMsUUFBSSxRQUFRO0FBQ1osT0FBRyxNQUFNLFlBQ0gsVUFBUyxXQUFXLFFBQVEsU0FBUyxJQUFJLENBQUMsR0FBRyxRQUFRLFNBQVM7QUFDNUQsWUFBTSxRQUFRLEtBQUssU0FBUyxLQUFLLEtBQUs7QUFDdEMsVUFBSSxHQUFHLE9BQU8sV0FBVSxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRO0FBQ25ELFlBQUksQ0FBQyxHQUFHLGNBQWMsR0FBRyxNQUFNO0FBQzNCLGFBQUcsTUFBTSxHQUFHO0FBQ2hCLFlBQUk7QUFDQSxxQkFBVyxXQUFXO0FBQUE7QUFFOUIsYUFBTztBQUFBLFNBRVQ7QUFDTixPQUFHO0FBQ0gsWUFBUTtBQUNSLFlBQVEsR0FBRztBQUVYLE9BQUcsV0FBVyxtQkFBa0IsaUJBQWdCLEdBQUcsT0FBTztBQUMxRCxRQUFJLFFBQVEsUUFBUTtBQUNoQixVQUFJLFFBQVEsU0FBUztBQUNqQjtBQUNBLGNBQU0sU0FBUSxTQUFTLFFBQVE7QUFFL0IsV0FBRyxZQUFZLEdBQUcsU0FBUyxFQUFFO0FBQzdCLGVBQU0sUUFBUTtBQUFBLGFBRWI7QUFFRCxXQUFHLFlBQVksR0FBRyxTQUFTO0FBQUE7QUFFL0IsVUFBSSxRQUFRO0FBQ1Isc0JBQWMsVUFBVSxHQUFHO0FBQy9CLHNCQUFnQixXQUFXLFFBQVEsUUFBUSxRQUFRLFFBQVEsUUFBUTtBQUNuRTtBQUNBO0FBQUE7QUFFSiwwQkFBc0I7QUFBQTtBQUUxQixNQUFJO0FBQ0osTUFBSSxPQUFPLGdCQUFnQixZQUFZO0FBQ25DLG9CQUFnQixjQUFjLFlBQVk7QUFBQSxNQUN0QyxjQUFjO0FBQ1Y7QUFDQSxhQUFLLGFBQWEsRUFBRSxNQUFNO0FBQUE7QUFBQSxNQUU5QixvQkFBb0I7QUFDaEIsY0FBTSxFQUFFLGFBQWEsS0FBSztBQUMxQixhQUFLLEdBQUcsZ0JBQWdCLFNBQVMsSUFBSSxLQUFLLE9BQU87QUFFakQsbUJBQVcsT0FBTyxLQUFLLEdBQUcsU0FBUztBQUUvQixlQUFLLFlBQVksS0FBSyxHQUFHLFFBQVE7QUFBQTtBQUFBO0FBQUEsTUFHekMseUJBQXlCLE9BQU0sV0FBVyxVQUFVO0FBQ2hELGFBQUssU0FBUTtBQUFBO0FBQUEsTUFFakIsdUJBQXVCO0FBQ25CLGdCQUFRLEtBQUssR0FBRztBQUFBO0FBQUEsTUFFcEIsV0FBVztBQUNQLDBCQUFrQixNQUFNO0FBQ3hCLGFBQUssV0FBVztBQUFBO0FBQUEsTUFFcEIsSUFBSSxNQUFNLFVBQVU7QUFFaEIsY0FBTSxZQUFhLEtBQUssR0FBRyxVQUFVLFNBQVUsTUFBSyxHQUFHLFVBQVUsUUFBUTtBQUN6RSxrQkFBVSxLQUFLO0FBQ2YsZUFBTyxNQUFNO0FBQ1QsZ0JBQU0sUUFBUSxVQUFVLFFBQVE7QUFDaEMsY0FBSSxVQUFVO0FBQ1Ysc0JBQVUsT0FBTyxPQUFPO0FBQUE7QUFBQTtBQUFBLE1BR3BDLEtBQUssU0FBUztBQUNWLFlBQUksS0FBSyxTQUFTLENBQUMsU0FBUyxVQUFVO0FBQ2xDLGVBQUssR0FBRyxhQUFhO0FBQ3JCLGVBQUssTUFBTTtBQUNYLGVBQUssR0FBRyxhQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRckMsOEJBQXNCO0FBQUEsSUFDbEIsV0FBVztBQUNQLHdCQUFrQixNQUFNO0FBQ3hCLFdBQUssV0FBVztBQUFBO0FBQUEsSUFFcEIsSUFBSSxNQUFNLFVBQVU7QUFDaEIsWUFBTSxZQUFhLEtBQUssR0FBRyxVQUFVLFNBQVUsTUFBSyxHQUFHLFVBQVUsUUFBUTtBQUN6RSxnQkFBVSxLQUFLO0FBQ2YsYUFBTyxNQUFNO0FBQ1QsY0FBTSxRQUFRLFVBQVUsUUFBUTtBQUNoQyxZQUFJLFVBQVU7QUFDVixvQkFBVSxPQUFPLE9BQU87QUFBQTtBQUFBO0FBQUEsSUFHcEMsS0FBSyxTQUFTO0FBQ1YsVUFBSSxLQUFLLFNBQVMsQ0FBQyxTQUFTLFVBQVU7QUFDbEMsYUFBSyxHQUFHLGFBQWE7QUFDckIsYUFBSyxNQUFNO0FBQ1gsYUFBSyxHQUFHLGFBQWE7QUFBQTtBQUFBO0FBQUE7Ozs7OztBQzM2RGpDLHFCQUFtQixNQUE0QztBQUMzRCxXQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUNwQyxVQUFJLFVBQ0EsUUFBZ0I7QUFFcEIsb0JBQWM7QUFFZCxpQkFBVyxZQUFZLE1BQU07QUFDekI7QUFFQSxZQUFJLEtBQUssU0FBUyxTQUFTLEdBQUc7QUFDMUIsd0JBQWM7QUFDZCxnQkFBTSxLQUFLLEtBQUssVUFBVSxRQUFRLENBQUMsR0FBRyxNQUFNO0FBQ3hDLGNBQUUsUUFBUSxRQUFROztBQUV0QixrQkFBUSxLQUFLO21CQUNOLFNBQVMsSUFBSTtBQUNwQix3QkFBYztBQUNkLGlCQUFPOztTQUVaOzs7QUNsQlgsa0JBQWdCLEtBQWEsS0FBYSxLQUFhO0FBQ25ELFdBQU8sS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssU0FBUzs7QUFTaEQsb0JBQWtCLE1BQW1CLE9BQWUsTUFBZTtBQUMvRCxRQUFJLE1BQU07QUFDTixVQUFJLFFBQVEsR0FBRztBQUNYLGVBQU8sTUFBTSxNQUFNLFNBQVM7aUJBQ3JCLFFBQVEsTUFBTSxNQUFNLFNBQVMsR0FBRztBQUN2QyxlQUFPOztBQUNKLGVBQU87O0FBQ1gsYUFBTyxPQUFPLE1BQU0sTUFBTSxTQUFTLEdBQUcsR0FBRzs7QUFHcEQsc0JBQW9CLEdBQXlDLFVBQW1CO0FBQzVFLFFBQUksRUFBRSxTQUFTLFNBQVM7QUFDcEIsYUFBTyxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUU7O0FBQ3BELGFBQU8sV0FBVyxLQUFLLEdBQUcsVUFBVSxLQUFLLEdBQUc7O0FBR3ZELE1BQU0sT0FBTyxDQUFDLE1BQWdDLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxLQUFLO0FBUXZGLE1BQU0sTUFBTSxDQUFDLFNBQXNCLEtBQUssTUFBTSxLQUFLLFNBQVMsU0FBUztBQUVyRSxNQUFNLFFBQVEsQ0FBQyxTQUFzQixNQUFNLEtBQUssS0FBSztBQUNyRCxNQUFNLFFBQVEsQ0FBQyxNQUFtQixVQUFrQixLQUFLLFNBQVM7QUFHbEUsTUFBTSxRQUFRLENBQUMsYUFBdUIsV0FBVyxjQUFjO0FBQy9ELE1BQU0sT0FBTyxDQUFDLGFBQXVCLFdBQVcsaUJBQWlCO0FBQ2pFLE1BQU0sT0FBTyxDQUFDLFVBQW1CLFVBQVUsV0FBVyxNQUFNO0FBQzVELE1BQU0sT0FBTyxDQUFDLE9BQWUsUUFBaUIsVUFBVSxVQUFVLE1BQU07QUFDeEUsTUFBTSxTQUFTLENBQUMsTUFBbUIsUUFBZ0IsYUFDL0MsS0FBSyxjQUFjLEtBQUssYUFBYSxPQUFNLEtBQUs7QUFDcEQsTUFBTSxXQUFXLENBQUMsTUFBbUIsUUFBZ0IsVUFBbUIsVUFDcEUsT0FBTSxNQUFNLGFBQWEsS0FBSyxPQUFPLE9BQU8sTUFBTSxRQUFPLFlBQVksS0FBSztBQUM5RSxNQUFNLFdBQVcsQ0FBQyxNQUFtQixPQUFlLGFBQ2hELEtBQUssSUFBSSxNQUFNLE1BQU0sT0FBTyxNQUFNO0FBRXRDLG1CQUFpQixNQUFtQixRQUFnQixVQUFtQixPQUFlO0FBQ2xGLFdBQU8sTUFBTSxNQUFNLE9BQU8sQ0FBQyxPQUFlLE1BQWUsTUFBTTtBQUMzRCxZQUFNLE1BQU0sQ0FBQyxXQUFtQixTQUFTLE1BQU0sUUFBTyxVQUFVO0FBRWhFLGFBQU8sS0FBSyxJQUFJLElBQUksUUFBUSxVQUFVLEtBQUssSUFBSSxJQUFJLFNBQVEsVUFBVSxPQUFPOzs7QUFJcEYsTUFBTSxPQUFPO0lBQ1QsT0FBTyxDQUNILE1BQ0EsUUFDQSxRQUNBLFVBQ0EsVUFFQSxTQUNNLE1BQU0sTUFBTSxRQUFRLFVBQ3BCLENBQUMsUUFBUSxNQUFNLFFBQVEsVUFBVSxPQUFPLFFBQVE7SUFDMUQsVUFBVSxDQUFDLE1BQW1CLE9BQWUsVUFBbUIsVUFDNUQsU0FBUyxNQUFNLE1BQU0sTUFBTSxRQUFRLFVBQVU7SUFDakQsUUFBUSxDQUFDLE1BQW1CLFFBQWdCLFVBQW1CLFVBQzNELFNBQVMsTUFBTSxRQUFRLE1BQU0sUUFBUSxVQUFVLFFBQVEsVUFBVTtJQUNyRSxNQUFNLENBQUMsTUFBbUIsT0FBZSxhQUNyQyxNQUFNLE1BQU0sT0FBTyxLQUFLO0lBQzVCLE9BQU8sQ0FBQyxNQUFtQixVQUN2QixNQUFNLE1BQU0sS0FBSyxDQUFDLFdBQVUsQ0FBQyxPQUFNLFFBQVEsVUFBVTtJQUN6RCxLQUFLLENBQUMsTUFBbUIsYUFBc0I7QUFDM0MsYUFDSSxTQUFTLE1BQU0sR0FBRyxZQUNsQixTQUFTLE1BQU0sR0FBRyxZQUNsQixNQUFNLE1BQU0sR0FBRyxLQUFLOzs7QUFpQ2hDLGVBQWEsTUFBbUIsUUFBaUI7QUFDN0MsZUFBVyxZQUFZLFFBQVE7QUFDM0IsV0FBSyxNQUFNLFlBQVksT0FBTzs7O0FBSXRDLG9CQUNJLE1BQ0EsT0FDQSxRQUNGO0FBQ0UsU0FBSyxjQUFjLElBQUksWUFBWSxPQUFNLEtBQUs7O0FBaUJsRCxnQkFBYyxNQUFtQjtBQUM3QixVQUFNLE9BQU8sS0FBSyxTQUFTLEtBQUssU0FBUyxTQUFTO0FBQ2xELFNBQUssUUFBUTs7QUFFakIsZ0JBQWMsTUFBbUI7QUFDN0IsVUFBTSxRQUFRLEtBQUssU0FBUztBQUM1QixTQUFLLE9BQU87O0FBR2hCLE1BQU0sU0FBUyxDQUFDLE9BQXVCLFFBQ25DLE1BQU0sTUFBTSxLQUFLLE9BQU8sTUFBTSxNQUFNLEdBQUc7QUFFM0MsbUJBQWlCLE1BQW1CLE9BQWUsTUFBZTtBQUM5RCxVQUFNLFdBQVUsQ0FBQyxXQUFxQixLQUFLLGdCQUFnQixHQUFHO0FBQzlELFVBQU0sV0FBVyxPQUNYLE9BQU8sTUFBTSxPQUFPLFFBQVEsSUFBSSxTQUNoQyxNQUFNLE1BQU0sS0FBSyxDQUFDLEdBQUcsTUFBTSxFQUFFLFFBQVEsUUFBUSxFQUFFLFFBQVE7QUFDN0QsYUFBUTs7QUNsSkwsaUJBQ0gsTUFDQSxTQUtGO0FBQ0UsUUFBSTtNQUNBLFFBQVE7TUFDUixVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxRQUFRO01BQ1IsT0FBTztNQUNQLE9BQU87TUFDUCxRQUFRO1FBQ0M7QUFFYixRQUFJLEtBQ0EsS0FDQSxXQUFXLEdBQ1gsWUFBWSxHQUNaLFlBQVcsR0FDWCxRQUFRLEdBRVIsV0FDQSxNQUFNLFdBQ04sTUFBTSxPQUNOLE1BQU07QUFFVixVQUFNLFNBQVMsS0FBSztBQUNwQixVQUFNLFVBQVMsQ0FDWCxPQUNBLFFBQ0EsS0FBYyxTQUVkLE9BQU8sUUFBUSxDQUFDLENBQUMsT0FBTyxZQUNwQixLQUNNLE1BQUssaUJBQWlCLE9BQU8sUUFBUSxRQUNyQyxNQUFLLG9CQUFvQixPQUFPLFFBQVE7QUFFdEQsVUFBTSxlQUE2RDtNQUMvRCxDQUFDLGFBQWE7TUFDZCxDQUFDLGFBQWE7TUFDZCxDQUFDLFlBQVk7TUFDYixDQUFDLFdBQVc7O0FBRWhCLFVBQU0sZUFBc0U7TUFDeEUsQ0FBQyxlQUFlO01BQ2hCLENBQUMsY0FBYztNQUNmLENBQUMsYUFBYTtNQUNkLENBQUMsV0FBVztNQUNaLENBQUMsU0FBUztNQUNWLENBQUMsVUFBVTtNQUNYLENBQUMsVUFBVTs7QUFHZixVQUFNLE1BQU07QUFDWixVQUFNLEtBQUssSUFBSSxlQUFlLE1BQU07QUFDaEMsV0FBSyxjQUFjLElBQUksWUFBWTs7QUFFdkMsVUFBTSxLQUFLLElBQUksaUJBQWlCLE1BQU07QUFDbEMsV0FBSyxjQUFjLElBQUksWUFBWTs7QUFFdkMsVUFBTSxrQkFBa0I7TUFDcEIsV0FBVztNQUNYLFlBQVk7TUFHWixTQUFTOztBQUdiLGNBQVUsTUFDTCxLQUFLLENBQUMsV0FBMkI7QUFDOUIsU0FBRyxRQUFRO0FBQ1gsU0FBRyxRQUFRLE1BQU07QUFFakIsWUFBTSxTQUFTO1FBQ1gsWUFBWTtRQUNaLGFBQWE7UUFFYixZQUFZO1FBQ1osa0JBQWtCOztBQUV0QixVQUFJLE1BQU07QUFFVixZQUFNLEtBQUssSUFBSSxNQUFNO0FBQ3JCLGNBQVEsTUFBTSxPQUFPO0FBQ3JCLFNBQUc7QUFDSCxjQUFRLElBQUksUUFBUTtBQUVwQixVQUFJLFFBQVE7QUFDUixZQUFJLFFBQVEsRUFBRSxTQUFTO0FBQ3ZCLGdCQUFPLFFBQVE7O0FBRW5CLGVBQVMsTUFBTSxXQUFXLEVBQUU7T0FFL0IsTUFBTSxDQUFDLFVBQVUsUUFBUSxNQUFNO0FBRXBDLGtCQUFjLEtBQWEsYUFBcUIsR0FBRztBQUMvQyxtQkFBWSxPQUFPLFFBQVEsT0FBTztBQUNsQyxjQUFRLEtBQUssTUFBTSxNQUFNLFdBQVUsUUFBVyxVQUFVO0FBRXhELFlBQU0sWUFBWSxDQUFDLGNBQ2YsWUFBVyxNQUFNLENBQUMsbUJBQWtCLEdBQUcsQ0FBQztBQUU1QyxZQUFNLFNBQVM7UUFDWCxXQUFXLGVBQWUsVUFBVTtRQUNwQyxZQUFZLEdBQUc7O0FBRW5CLFVBQUksTUFBTTtBQUNWLGVBQVMsTUFBTSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sVUFBQTs7QUFPOUMscUJBQWlCLEtBQWE7QUFDMUIsWUFBTSxRQUFRLE1BQU07QUFDcEIsWUFBTSxRQUFRLEtBQUssS0FBSyxNQUFNLEdBQUc7QUFDakMsWUFBTSxPQUFPLEtBQUssS0FBSyxNQUFNLEtBQUssU0FBUyxTQUFTLEdBQUc7QUFDdkQsWUFBTSxVQUFVLENBQUMsVUFBa0IsU0FBTyxPQUFPLEtBQUssS0FBSyxDQUFDO0FBRTVELFVBQUksUUFBUSxPQUFPO0FBQ2YsY0FBTSxJQUFJLEtBQUssUUFBUSxLQUFLO0FBQzVCLGVBQU8sUUFBUSxNQUFNLElBQUksUUFBUTtBQUNqQyxnQkFBUSxZQUFXLE1BQU07O0FBRTdCLFlBQU07QUFDTixhQUFPOztBQUdYLFFBQUksUUFBUTtBQUNaLGdCQUFZLFFBQWUsU0FBd0IsTUFBTTtBQUNyRCxjQUFRO0FBQ1I7QUFFQSxlQUFRLE1BQU0sU0FBUyxNQUFNLFFBQU87QUFFcEMsWUFBTSxTQUFRLEtBQUssTUFBTSxNQUFNO0FBQy9CLFlBQU0sS0FBSyxPQUFPLEtBQUssTUFBTSxNQUFNLFdBQVUsUUFBTyxVQUFVLFNBQVM7QUFFdkUsVUFBSSxNQUFNLFNBQ0osT0FDSSxLQUFLLE9BQU8sTUFBTSxRQUFRLFVBQVUsU0FDcEMsU0FDSixXQUFXLElBQ1AsSUFDQSxLQUFLLFNBQVMsTUFBTSxJQUFJLFVBQVU7QUFFNUMsV0FBSyxNQUFNLFdBQVU7O0FBR3pCLG1CQUFlLFdBQW1CO0FBQzlCLFVBQUksZ0JBQWUsTUFBYztBQUM3QixjQUFNLElBQUssTUFBUSxhQUFXLFNBQVcsS0FBSyxRQUFPO0FBQ3JELG1CQUFZLEtBQUksV0FBVyxJQUFJLE9BQU8sR0FBRyxHQUFHLElBQUksV0FBVztBQUMzRCxvQkFBWTtBQUNaLGdCQUFRO0FBQ1IsY0FBTSxJQUFJOzs7QUFJbEIsb0JBQWdCLEVBQUUsUUFBUSxXQUFXLFVBQUEsV0FBVSxhQUFxQjtBQUNoRSxVQUFJLFdBQVc7QUFDWCxZQUFJLGlCQUFnQixNQUFjO0FBQzlCLGdCQUFNLFVBQVcsUUFBTyxhQUFhO0FBQ3JDLGdCQUFNLFFBQVEsWUFBWSxLQUFLLElBQUksQ0FBQztBQUNwQyxnQkFBTSxPQUFPLFlBQVksVUFBUztBQUVsQyxlQUFLLE9BQU8sUUFBUSxPQUFPLENBQUM7QUFDNUIsZ0JBQU0sS0FBSyxJQUFJLFNBQVMsTUFBTSxJQUFJLFdBQVU7QUFDNUMsY0FBSSxRQUFRLEtBQUssSUFBSSxTQUFTO0FBQUcsZUFBRzs7OztBQUtoRCxvQkFBZ0IsR0FBNEI7QUFFeEM7QUFFQSxjQUFRO0FBQ1Isa0JBQVksV0FBVyxHQUFHO0FBQzFCLFlBQU0sWUFBWTtBQUVsQixjQUFPLFFBQVE7O0FBR25CLG9CQUFnQixHQUE0QjtBQUN4QyxZQUFNLFFBQVMsYUFBWSxXQUFXLEdBQUcsYUFBYyxLQUFJO0FBQzNELGtCQUFZLFdBQVcsR0FBRztBQUMxQixXQUFLOztBQUdULGtCQUFjLEdBQTRCO0FBQ3RDO0FBRUEsWUFBTSxFQUFFLFFBQVEsY0FBYyxRQUFRO0FBRXRDLFVBQUksS0FBSyxJQUFJLGFBQWE7QUFDdEIsYUFBSyxJQUFJLFlBQVksTUFDZixHQUFHLFNBQ0gsUUFDSSxHQUFHLE9BQU8sVUFDVixPQUFPO1VBQ0w7VUFDQTtVQUNBO1VBQ0EsV0FBVyxZQUFZOzs7QUFJM0MscUJBQWlCLFdBQXlCO0FBQ3RDLFVBQUksWUFBYSxLQUFJLFdBQVc7QUFDaEMsWUFBTSxTQUFTLE9BQ1QsS0FBSyxPQUFPLE1BQU0sWUFBVyxXQUFXLFVBQVUsU0FDbEQsWUFBVztBQUNqQixrQkFBWSxTQUFTO0FBQ3JCLGFBQU8sRUFBRSxRQUFROztBQUdyQixRQUFJLFdBQVc7QUFDZixxQkFBaUIsR0FBZTtBQUM1QjtBQUNBLGlCQUFXO0FBRVQsTUFBQSxNQUFLLElBQUksV0FBVyxHQUFHLGNBQWMsS0FBSyxJQUFJLFdBQVcsR0FBRyxhQUFhLE1BQ3ZFLEVBQUUsYUFDRixFQUFFO0FBRU4sV0FBSyxXQUFXLEdBQUcsWUFBYSxLQUFJO0FBRXBDLFVBQUksRUFBRTtBQUFVLFdBQUcsUUFBUSxLQUFLLEtBQUssRUFBRTtlQUM5QixRQUFRO0FBQ2Isb0JBQVksV0FBVyxNQUFNO0FBQ3pCLGFBQUc7QUFDSCxxQkFBVztXQUNaOztBQUdYLG9CQUFnQixHQUFrQjtBQUM5QixVQUFJLEVBQUUsUUFBUSxhQUFhO0FBQ3ZCLFdBQUcsUUFBUTtpQkFDSixFQUFFLFFBQVEsY0FBYztBQUMvQixXQUFHLFFBQVE7OztBQUluQixzQkFBa0IsR0FBZ0I7QUFDOUIsWUFBTSxLQUFLLElBQUksTUFBTTtBQUNyQixTQUFHOztBQUdQLHNCQUFrQixHQUFnQjs7QUFNbEMscUJBQWlCO0FBR2IsWUFBTSxXQUFXLE1BQU07QUFFdkIsbUJBQWE7QUFDYiwyQkFBcUI7QUFDckIsMkJBQXFCO0FBQ3JCLGNBQU8sUUFBUSxjQUFjOztBQUdqQyxZQUFPO0FBQ1AscUJBQWdCLFVBQWtCO0FBQzlCLFlBQU0sUUFBUTtRQUNWO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O0FBR0osaUJBQVcsT0FBTyxVQUFTO0FBS3ZCLFlBQUksUUFBUSxTQUFRLE1BQU07QUFFdEIsa0JBQVEsSUFBSSxLQUFLLFNBQVE7OztBQUdqQyxpQkFBVyxTQUFRO0FBRW5CLGlCQUFXLFNBQVE7QUFDbkIsY0FBUSxTQUFRO0FBQ2hCLGFBQU8sU0FBUTtBQUNmLGNBQVEsU0FBUTtBQUdoQixVQUFJLFVBQVUsU0FBUSxPQUFPO0FBQ3pCLGdCQUFRLFNBQVMsTUFBTSxTQUFRLE9BQU87QUFDdEMsV0FBRzs7QUFHUCxVQUFJLFNBQVMsU0FBUSxNQUFNO0FBQ3ZCLGVBQU8sU0FBUTtBQUNmLGNBQU0sS0FBSyxJQUFJLE1BQU07QUFDckIsZ0JBQVEsTUFBTSxPQUFPO0FBQ3JCLFdBQUc7OztBQU9YLHVCQUFtQjtBQUNmO0FBQ0EsU0FBRztBQUNILFNBQUc7QUFDSCxjQUFPLFFBQVEsY0FBYzs7QUFFakMsV0FBTyxFQUFFLGlCQUFRLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkN6VGhCLElBQUksTUFBQSxtQkFBQTt1QkF1QkMsSUFBTTs4QkFBYSxLQUFHLEdBQUMsS0FBSTtxQ0FBaEMsUUFBSSxLQUFBLEdBQUE7Ozs7O29CQXdCTCxJQUFRLEdBQUMsVUFBVSxJQUFJLE1BQUEsa0JBQUE7b0JBcUJ2QixJQUFRLEdBQUMsUUFBUSxJQUFJLE1BQUEsZ0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBL0QxQixlQXdDSSxRQUFBLElBQUE7Ozs7Ozs7Ozs7Ozs7OztjQXJDSSxPQUFBLElBQUs7Y0FDTCxVQUFVLElBQU8sR0FBQztjQUNsQixPQUFPLElBQUksR0FBQztjQUNaLFVBQVUsSUFBTyxHQUFDO2NBQ2xCLE9BQU8sSUFBTyxHQUFDO2NBQ2YsU0FBUyxJQUFPLEdBQUM7Y0FDakIsTUFBTSxJQUFPLEdBQUM7Y0FDZCxNQUFNLElBQU8sR0FBQzs7Ozs7Ozs7YUFmaEIsS0FBSSxJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkF1QkMsS0FBTTs7Ozs7OztZQWZULE9BQUEsS0FBSztZQUNMLFVBQVUsS0FBTyxHQUFDO1lBQ2xCLE9BQU8sS0FBSSxHQUFDO1lBQ1osVUFBVSxLQUFPLEdBQUM7WUFDbEIsT0FBTyxLQUFPLEdBQUM7WUFDZixTQUFTLEtBQU8sR0FBQztZQUNqQixNQUFNLEtBQU8sR0FBQztZQUNkLE1BQU0sS0FBTyxHQUFDOztZQWdDakIsS0FBUSxHQUFDLFVBQVUsS0FBSSxJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBcUJ2QixLQUFRLEdBQUMsUUFBUSxLQUFJLElBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5Q0E3Q3BCLFFBQUksS0FBQSxHQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXRCTixlQUVTLFFBQUEsU0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBRGU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lDQWlDQyxJQUFJLElBQUMsSUFBSyxHQUFDO29EQUNYLElBQUksSUFBQyxJQUFLLEdBQUM7QUFBUyxlQUFBLEtBQUEsT0FBQTs2Q0FDbEIsSUFBSSxJQUFDOytDQUNKLElBQUksSUFBQzs7O0FBSmpCLGVBS0MsUUFBQSxLQUFBOzs7OERBSlEsS0FBSSxJQUFDLEtBQUssR0FBQyxhQUFTOzs7bUVBQ3BCLEtBQUksSUFBQyxLQUFLLEdBQUMsYUFBUzs7O2tFQUNsQixLQUFJLElBQUMsUUFBSzs7O29FQUNULEtBQUksSUFBQyxTQUFNOzs7Ozs7Ozs7Ozs7b0JBTHJCLElBQUssR0FBQyxXQUFPLG1CQUFBOzs7Ozs7Ozs7Ozs7O2FBQWIsS0FBSyxHQUFDLFNBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQ0FSZCxJQUFJLElBQUM7eURBQ1AsSUFBSyxHQUFDLFNBQUs7MkNBRVgsSUFBSyxHQUFDLFlBQVksZ0NBQ00sSUFBSSxJQUFDLElBQUssR0FBQyxnQkFDcEM7bUNBSFEsSUFBSSxJQUFDLE9BQU8sSUFBSzs7OztBQUhuQyxlQWtCSSxRQUFBLElBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztnRkFqQlMsSUFBSSxJQUFDLEtBQUU7Ozt5RkFDVCxJQUFLLEdBQUMsU0FBSyxvQkFBQTs7OzRFQUVYLElBQUssR0FBQyxZQUFZLGdDQUNNLElBQUksSUFBQyxJQUFLLEdBQUMsZ0JBQ3BDLE9BQUk7Ozs7cUNBSEksSUFBSSxJQUFDLE9BQU8sSUFBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FxQmpDLEtBQU8sR0FBQztBQUFJLGVBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWWQsZUFFUSxRQUFBLFNBQUE7Ozs7O0FBQ1IsZUFFUSxRQUFBLFNBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFoQkgsSUFBSyxLQUFHLEtBQUMsbUJBQUE7b0JBS1QsSUFBSyxLQUFHLElBQU0sR0FBQyxTQUFTLEtBQUMsa0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTHpCLEtBQUssS0FBRyxHQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS1QsS0FBSyxLQUFHLEtBQU0sR0FBQyxTQUFTLEdBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFPRjs7Ozs7Ozs7Ozs7Ozs7O2lCQUdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFkekIsZUFFUSxRQUFBLFFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQURvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSTVCLGVBRVEsUUFBQSxRQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFEcUI7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBYzVCLElBQVEsR0FBQyxhQUFTLGtCQUFBO3VCQW9CZCxRQUFRLElBQU0sR0FBQzs7bUNBQXRCLFFBQUksS0FBQSxHQUFBOzs7Ozs7b0JBY0QsSUFBUSxHQUFDLGFBQVMsa0JBQUE7Ozs7Ozs7Ozs7Ozs7O2lDQW5DUSxJQUFRLEdBQUM7OztBQUE1QyxlQXVESSxRQUFBLElBQUE7Ozs7Ozs7Ozs7Ozs7WUF0REssS0FBUSxHQUFDLFdBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQW9CZCxRQUFRLEtBQU0sR0FBQzs7cUNBQXRCLFFBQUksS0FBQSxHQUFBOzs7Ozs7Ozs7Ozs7OzhCQUFKLFFBQUksSUFBQSxZQUFBLFFBQUEsS0FBQSxHQUFBOzs7OztZQWNELEtBQVEsR0FBQyxXQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FuQ1EsS0FBUSxHQUFDOzs7Ozs7O3VDQXFCdEMsUUFBSSxLQUFBLEdBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FuQkksS0FBTyxHQUFDO0FBQUksZUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlkLGVBSUksUUFBQSxJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQWZDLElBQUssS0FBRyxLQUFDLGtCQUFBOzs7Ozs7Ozs7Ozs7OztZQUFULEtBQUssS0FBRyxHQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWFMLGVBQXdCLFFBQUEsUUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWjdCLGVBT0ksUUFBQSxJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRkssZUFBd0IsUUFBQSxRQUFBOzs7Ozs7Ozs7O2tCQW1CM0IsS0FBUSxHQUFDLFdBQU8sQ0FBSyxJQUFRLEdBQUMsV0FDMUIsSUFBQSxNQUNBLE1BQUU7Ozs7Ozs7OztBQUhaLGVBSUEsUUFBQSxRQUFBOzs7O2lEQUhNLE1BQVEsR0FBQyxXQUFPLENBQUssS0FBUSxHQUFDLFdBQzFCLEtBQUEsTUFDQSxNQUFFO0FBQUEsbUJBQUEsR0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FQRixJQUFDLFFBQUssSUFBSzs7O0FBRDdCLGVBV0ksUUFBQSxJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQVZjLElBQUMsUUFBSyxJQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBYXZCLEtBQU8sR0FBQztBQUFJLGVBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZZCxlQUlJLFFBQUEsSUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFmQyxJQUFLLEtBQUcsSUFBTSxHQUFDLFNBQVMsS0FBQyxrQkFBQTs7Ozs7Ozs7Ozs7Ozs7WUFBekIsS0FBSyxLQUFHLEtBQU0sR0FBQyxTQUFTLEdBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYXJCLGVBQXdCLFFBQUEsUUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWjdCLGVBT0ksUUFBQSxJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRkssZUFBd0IsUUFBQSxRQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQWpIakQsVUFBVSxJQUFNLElBQUUsSUFBTyxLQUFBOzs7Ozs7OytDQXRCN0IsSUFBSSxHQUFDOztzQ0FVSyxJQUFJLEdBQUM7c0NBQ0wsSUFBSSxHQUFDO3NDQUNMLElBQUksR0FBQzt1Q0FDSixJQUFLLEdBQUM7dUNBQ04sSUFBSyxHQUFDO3VDQUNOLElBQUssR0FBQzt1Q0FDTixJQUFLLEdBQUM7dUNBQ04sSUFBTyxHQUFDLGNBQ2QsSUFBSyxHQUFDLHlCQUNBLElBQUssR0FBQztvQ0FDVCxJQUFPLEdBQUMsV0FBUTt3Q0FsQmQsSUFBSTswQ0FDRixJQUFPLEdBQUM7MkNBQ1AsSUFBSyxHQUFDLFVBQVU7MENBQ2pCLElBQU8sR0FBQyxTQUFTOzZDQUNkLElBQUksR0FBQyxVQUFVOzRDQUNoQixJQUFJLEdBQUMsVUFBVTswQ0FDakIsSUFBSSxHQUFDLFVBQVU7OztBQVhuQyxlQXlKUyxRQUFBLFNBQUE7Ozs7Ozs7OztrREFoSUcsVUFBVSxJQUFNLElBQUUsSUFBTyxRQUFBLGVBQUEsU0FBQSxPQUFBOzs7OzhFQXRCN0IsSUFBSSxHQUFDLEtBQUU7Ozs7d0NBVUcsSUFBSSxHQUFDOzs7d0NBQ0wsSUFBSSxHQUFDOzs7d0NBQ0wsSUFBSSxHQUFDOzs7eUNBQ0osSUFBSyxHQUFDOzs7eUNBQ04sSUFBSyxHQUFDOzs7eUNBQ04sSUFBSyxHQUFDOzs7eUNBQ04sSUFBSyxHQUFDOzs7eUNBQ04sSUFBTyxHQUFDLGNBQ2QsSUFBSyxHQUFDLHlCQUNBLElBQUssR0FBQzs7O3NDQUNULElBQU8sR0FBQyxXQUFROzs7MENBbEJkLElBQUk7Ozs0Q0FDRixJQUFPLEdBQUM7Ozs2Q0FDUCxJQUFLLEdBQUMsVUFBVTs7OzRDQUNqQixJQUFPLEdBQUMsU0FBUzs7OytDQUNkLElBQUksR0FBQyxVQUFVOzs7OENBQ2hCLElBQUksR0FBQyxVQUFVOzs7NENBQ2pCLElBQUksR0FBQyxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQWlNM0IsUUFDQSxVQUFVLEdBQ1YsUUFBZ0IsT0FBSztBQUVyQixhQUFTLE9BQU8sSUFBRyxDQUFFLEdBQUcsTUFBQyxHQUFRLElBQUksTUFBTTtBQUMzQyxjQUFVLElBQUksV0FBVSxNQUFRLFFBQU8sTUFBTyxXQUFZLFFBQU87V0FDMUQ7Ozs7VUFuREEsU0FBTSxJQUNiLE1BQU8sVUFDSCxLQUFLLE1BQU0sS0FBSyxNQUFNLFlBQzFCLE9BQUk7TUFDQSxJQUFJO01BQ0osT0FBTztNQUNQLFFBQVE7TUFDUixTQUFTO01BQ1QsT0FBTztNQUNQLGFBQWE7T0FFakIsUUFBSztNQUNELEtBQUs7TUFDTCxPQUFPO01BQ1AsT0FBTztNQUNQLFFBQVE7TUFDUixTQUFTO01BQ1QsV0FBVztNQUNYLFdBQVc7TUFDWCxVQUFVO09BRWQsV0FBUTtNQUNKLE1BQU07TUFDTixTQUFTO01BQ1QsV0FBVztNQUNYLFVBQVU7TUFDVixRQUFRO01BQ1IsTUFBTTtNQUNOLE1BQU07TUFDTixPQUFPO09BRVgsVUFBTztNQUNILFVBQVU7TUFDVixNQUFNO01BQ04sVUFBVTtNQUNWLE9BQU87TUFDUCxNQUFNO01BQ04sU0FBUztPQUViLFFBQVEsR0FDUixjQUFPLE1BQ1AsVUFBVSxHQUNWLHNCQUFXLE1BQUM7eUJBOUpFLE9BQUM7c0JBQ1AsUUFBUSxFQUFFLE9BQU87c0JBQ2pCLFlBQVcsRUFBRSxPQUFPOztnREErQjJCLFNBQUs7a0RBS0osU0FBSztrREFLVixTQUFLO2tEQUdKLFNBQUs7a0RBWWpCLFNBQUs7a0RBUWUsU0FBSzttREFVaEIsUUFBUTtrREFnQmpCLFNBQUs7a0RBUWdCLFNBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4STFFLDJCQUNJLE9BQ0EsTUFDQSxRQUFRLE1BQ1IsU0FBUyxLQUNNO0FBQ2YsVUFBTSxNQUFNLE1BQU0sTUFDZCx1Q0FBdUMsY0FBYyxRQUNyRDtBQUFBLE1BQ0ksTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE9BSWYsS0FBSyxDQUFDLFNBQVEsS0FBSTtBQUNwQixXQUFPLElBQUksSUFBSSxDQUFDLFNBQWU7QUFDM0IsVUFBSSxTQUFTLFFBQVEsS0FBSyxPQUFPLEtBQUssUUFBUSxPQUFPO0FBQ3JELFVBQUksT0FBTztBQUFBLFdBQ0o7QUFBQSxRQUNILEtBQUssNEJBQTRCLEtBQUssTUFBTSxPQUFPLFNBQVMsT0FBTztBQUFBLFFBQ25FLE9BQU8sT0FBTztBQUFBLFFBQ2QsUUFBUSxPQUFPO0FBQUE7QUFFbkIsYUFBTztBQUFBO0FBQUE7QUFJZixtQkFDSSxVQUNBLFdBQ0EsVUFDQSxXQUNpQztBQUNqQyxRQUFJLFFBQVEsS0FBSyxJQUFJLFdBQVcsVUFBVSxZQUFZO0FBQ3RELFdBQU87QUFBQSxNQUNILE9BQU8sS0FBSyxNQUFNLFdBQVc7QUFBQSxNQUM3QixRQUFRLEtBQUssTUFBTSxZQUFZO0FBQUE7QUFBQTtBQUloQyxNQUFNLFVBQVUsQ0FBQyxLQUFhLFFBQ2pDLEtBQUssTUFBTSxLQUFLLFdBQVksT0FBTSxNQUFNLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Y0NoQjlCLElBQUs7O1FBR1QsSUFBSTtRQUNKLE9BQU87UUFDUCxRQUFRO1FBQ1IsU0FBUztRQUNULE9BQUEsSUFBSztRQUNMLGFBQWE7OztRQUdiLEtBQUEsSUFBRztRQUNILE9BQU87UUFDUCxPQUFBLElBQUs7UUFDTCxRQUFRO1FBQ1IsU0FBUztRQUNULFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTs7O1FBR1YsTUFBTTtRQUNOLFNBQVM7UUFDVCxXQUFXO1FBQ1gsVUFBVTtRQUNWLFFBQVE7UUFDUixNQUFNO1FBQ04sTUFBTTtRQUNOLE9BQU87OztRQUdQLFVBQUEsSUFBUTtRQUNSLE1BQUEsSUFBSTtRQUNKLFVBQUEsSUFBUTtRQUNSLE9BQUEsSUFBSztRQUNMLE1BQUEsSUFBSTtRQUNKLFNBQUEsSUFBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FwQ0gsS0FBSzs7O1lBR1QsSUFBSTtZQUNKLE9BQU87WUFDUCxRQUFRO1lBQ1IsU0FBUztZQUNULE9BQUEsS0FBSztZQUNMLGFBQWE7Ozs7WUFHYixLQUFBLEtBQUc7WUFDSCxPQUFPO1lBQ1AsT0FBQSxLQUFLO1lBQ0wsUUFBUTtZQUNSLFNBQVM7WUFDVCxXQUFXO1lBQ1gsV0FBVztZQUNYLFVBQVU7Ozs7WUFhVixVQUFBLEtBQVE7WUFDUixNQUFBLEtBQUk7WUFDSixVQUFBLEtBQVE7WUFDUixPQUFBLEtBQUs7WUFDTCxNQUFBLEtBQUk7WUFDSixTQUFBLEtBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29EQU9FLElBQUksSUFBQztBQUFHLGVBQUEsS0FBQSxPQUFBO3lDQUNSLElBQUksSUFBQzs2Q0FDSCxJQUFJLElBQUM7K0NBQ0osSUFBSSxJQUFDOzs7QUFKakIsZUFLQyxRQUFBLEtBQUE7Ozt1RUFKUSxLQUFJLElBQUMsTUFBRzs7O2tFQUNSLEtBQUksSUFBQyxLQUFFOzs7c0VBQ0wsS0FBSSxJQUFDLFFBQUs7Ozt3RUFDVCxLQUFJLElBQUMsU0FBTTs7Ozs7Ozs7Ozs7O21CQUx0QixJQUFNLE9BQUEsaUJBQUE7Ozs7Ozs7Ozs7Ozs7WUFBTixLQUFNLEtBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBN0NZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkE0RHJCLElBQUM7a0JBQ047dUNBRmtELElBQUMsUUFBSyxJQUFLOzs7QUFBOUQsZUFFQyxRQUFBLFFBQUE7Ozs7Ozs7Ozs7O3lDQUZrRCxJQUFDLFFBQUssSUFBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXJGbkQsUUFBUSxRQUFRLFlBQVksTUFBRTs7Ozs7Ozs7Ozs7Ozs7OztvQkFTRSxLQUFLLE1BQU0sSUFBUSxNQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFpQjFELElBQVUsSUFBQyxJQUFLLElBQUUsSUFBSSxLQUFBO3VCQTBEckIsUUFBUSxJQUFLLElBQUM7O21DQUFyQixRQUFJLEtBQUEsR0FBQTs7Ozs7Ozs7a0JBcEZFOzs7Ozs7Ozs7Ozs7Ozs7bUJBUUY7O21CQUNjLElBQUs7bUJBQUs7OzttQkFBMEM7Ozs7Ozs7Ozs7OzttQkFtRlo7OzttQkFHVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBZXpDOzs7O21CQUlBOzs7O21CQVdBOzs7OzttQkFhQTs7OzttQkFXQTs7OzttQkFZQTs7Ozs7Ozs7d0NBaEtrRCxJQUFLO3dDQUdILElBQU07d0NBR2xCLElBQUk7OztxREFxRlYsSUFBSSxPQUFBLENBQUssSUFBSztxREFHM0MsSUFBSSxPQUFJLElBQUssT0FBSyxJQUFLLElBQUMsU0FBUzt3Q0FHYyxJQUFRO3dDQUdkLElBQUs7d0NBR1AsSUFBSTt3Q0FDSixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTBEOUIsSUFBSyxPQUFBO0FBQUEsOEJBQUEsTUFBQSxJQUFBLElBQUEsS0FBQTs7Ozs7O0FBcktyQyxlQXlCVSxRQUFBLFdBQUE7QUF4Qk4sZUFZUSxXQUFBO0FBWEosZUFBa0UsUUFBQTs7O0FBQXZCLGVBQW1CLElBQUE7O0FBQzlELGVBRUEsUUFBQTs7QUFDQSxlQUVBLFFBQUE7O0FBQ0EsZUFBZ0UsUUFBQTs7QUFDaEUsZUFFRyxRQUFBOztBQURTLGVBQWMsR0FBQTs7O0FBQWEsZUFBNkIsR0FBQTs7OztBQWdCNUUsZUF3RE0sUUFBQSxNQUFBOzs7OztBQUVOLGVBTUssUUFBQSxNQUFBOzs7OztBQUVMLGVBZUssUUFBQSxNQUFBO0FBZEQsZUFBcUUsTUFBQTs7O0FBQ3JFLGVBR0EsTUFBQTs7O0FBQ0EsZUFBa0UsTUFBQTs7QUFDbEUsZUFFQSxNQUFBOztBQUNBLGVBRVEsTUFBQTs7QUFDUixlQUF3RSxNQUFBOztBQUN4RSxlQUF3RSxNQUFBOztBQUc1RSxlQThETSxRQUFBLE1BQUE7QUE3REYsZUEyQlUsTUFBQTtBQTFCTixlQUdPLFdBQUE7O0FBREgsZUFBaUQsUUFBQTtnQ0FBOUIsSUFBSzs7QUFFNUIsZUFVTyxXQUFBOztBQVJILGVBT0MsUUFBQTtnQ0FMZSxJQUFLOztBQU96QixlQVVPLFdBQUE7O0FBUkgsZUFPQyxRQUFBO2dDQUxlLElBQUc7O0FBUTNCLGVBZ0NVLE1BQUE7QUEvQk4sZUFVTyxXQUFBOztBQVJILGVBT0MsUUFBQTtnQ0FMZSxJQUFROztBQU81QixlQVdPLFdBQUE7O0FBVEgsZUFRQyxRQUFBO2dDQU5lLElBQU87O0FBUTNCLGVBT08sV0FBQTs7QUFMSCxlQUlRLFFBQUE7QUFISixlQUFxQyxRQUFBO0FBQ3JDLGVBQXFDLFFBQUE7QUFDckMsZUFBaUMsUUFBQTs4QkFIakIsSUFBSzs7Ozs7O3FDQTVKWCxJQUFZOzs7cUNBMEZoQixJQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MENBaEdtQyxJQUFLOzs7MENBR0gsSUFBTTs7OzBDQUdsQixJQUFJOzs7d0JBRWxDLElBQUs7cUVBQXNCLEtBQUssTUFBTSxJQUFRLE1BQUE7QUFBQSxtQkFBQSxLQUFBOzttREFpQjFELElBQVUsSUFBQyxJQUFLLElBQUUsSUFBSSxRQUFBLGVBQUEsU0FBQSxPQUFBOzs7Ozt5QkEwRHJCLFFBQVEsSUFBSyxJQUFDOztxQ0FBckIsUUFBSSxLQUFBLEdBQUE7Ozs7Ozs7Ozs7Ozs7MENBQUo7O2lHQVEwQyxJQUFJLE9BQUEsQ0FBSyxJQUFLLEtBQUE7OztrR0FHM0MsSUFBSSxPQUFJLElBQUssT0FBSyxJQUFLLElBQUMsU0FBUyxJQUFDOzs7OzBDQUdhLElBQVE7OzswQ0FHZCxJQUFLOzs7MENBR1AsSUFBSTs7OzBDQUNKLElBQUk7O2dEQU8vQixJQUFLLEtBQUE7a0NBQUwsSUFBSzs7d0RBTVIsSUFBSyxJQUFBO2tDQUFMLElBQUs7OzREQVdMLElBQUcsS0FBQTtrQ0FBSCxJQUFHOzswREFhSCxJQUFRLElBQUE7a0NBQVIsSUFBUTs7MERBV1IsSUFBTyxJQUFBO2tDQUFQLElBQU87OztnQ0FVSCxJQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJwQjtRQUNULFFBQUssSUFDTCxZQUFXLEdBQ1gsT0FBTyxRQUFRLEdBQUcsS0FDbEIsUUFBUSxJQUNSLFFBQVEsR0FDUixXQUFXLE9BQ1gsUUFBUSxPQUNSLFFBQVEsVUFDUixXQUFXLEtBQ1gsUUFBUSxPQUNSLFVBQVUsS0FDVixRQUFRLFFBQ1IsT0FBTyxNQUNQLFNBQVMsTUFDVCxPQUFPLE1BQ1AsTUFBTTs4QkFJZ0IsUUFBZSxPQUFZO3VCQUNqRCxRQUFLLE1BQVMsVUFBVSxRQUFPO2FBQ3hCOzswQkFHVyxRQUFNO1lBQ2xCLE9BQU8sU0FBUztBQUN0QixXQUFLLGFBQWEsVUFBUSxDQUFHLE9BQU8sU0FBUzt1QkFDN0MsT0FBSSxDQUFJOztVQUVOLFVBQU8sTUFBQSxhQUFBLEdBQVUsT0FBTyxRQUFRLEdBQUc7VUFFbkMsU0FBUyxPQUFPLFdBQVc7Z0RBbk5KLFFBQUssQ0FBSTttREFHVCxTQUFNLENBQUk7Ozs7Ozs7OzttREFpRlYsUUFBUTtrREFPYixTQUFLO2tEQUVULFNBQUs7a0RBSUEsV0FBUSxDQUFJO2tEQUdaLFFBQUssQ0FBSTttREFHVCxPQUFJLENBQUk7bURBQ1IsT0FBSSxDQUFJOztBQU9OLGNBQUssS0FBQTs7OztBQU1SLGNBQUssVUFBQSxLQUFBOzs7O0FBV0wsWUFBRyxVQUFBLEtBQUE7Ozs7QUFhSCxpQkFBUSxVQUFBLEtBQUE7Ozs7QUFXUixnQkFBTyxVQUFBLEtBQUE7Ozs7QUFVSCxjQUFLLGFBQUE7OztBQW1DakM7QUFBQyxtQkFBQSxJQUFFLE9BQU8sT0FBTyxXQUFXLGdDQUFnQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4TWhFLE1BQUksTUFBTSxJQUFJLFlBQUk7QUFBQSxJQUNkLFFBQVEsU0FBUztBQUFBO0FBR3JCLE1BQU8sZUFBUTsiLAogICJuYW1lcyI6IFtdCn0K
