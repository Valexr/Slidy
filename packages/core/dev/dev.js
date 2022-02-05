var Slidy = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toCommonJS = /* @__PURE__ */ ((cache) => {
    return (module, temp) => {
      return cache && cache.get(module) || (temp = __reExport(__markAsModule({}), module, 1), cache && cache.set(module, temp), temp);
    };
  })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

  // src/slidy.ts
  var slidy_exports = {};
  __export(slidy_exports, {
    slidy: () => slidy
  });

  // src/env.ts
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

  // src/utils.ts
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
  function dispatch(node, name, detail) {
    node.dispatchEvent(new CustomEvent(name, { ...detail }));
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

  // src/slidy.ts
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
    const listen = (node2, events, on = true) => events.forEach(([event, handle]) => on ? node2.addEventListener(event, handle, true) : node2.removeEventListener(event, handle, true));
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
        listen(PARENT, parentEvents);
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
      css(node, { pointerEvents: e.type !== "mousedown" ? "auto" : "none" });
      clear();
      frame = position2;
      reference = coordinate(e, vertical);
      track(performance.now());
      listen(window, windowEvents);
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
      listen(window, windowEvents, false);
    }
    function update(options2) {
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
      gravity = maxMin(2, 0, options2.gravity);
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
      listen(PARENT, parentEvents, false);
    }
    return { update, destroy, to };
  }
  return __toCommonJS(slidy_exports);
})();
