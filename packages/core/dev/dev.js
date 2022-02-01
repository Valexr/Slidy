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

  // src/utils.ts
  function maxMin(max, min, val) {
    return Math.min(max, Math.max(min, val)) || 0;
  }
  function indexing(node, index, loop = false) {
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
  function axisCoord(e, axis) {
    if (e.type === "wheel") {
      return axis === "y" ? e.deltaY : e.shiftKey ? e.deltaY : e.deltaX;
    } else
      return axis === "y" ? uniQ(e).clientY : uniQ(e).clientX;
  }
  var uniQ = (e) => e.changedTouches ? e.changedTouches[0] : e;
  var cix = (node) => Math.floor(node.children.length / 2);
  var nodes = (node) => Array.from(node.children);
  var child = (node, index) => node.children[index];
  var coord = (axis) => axis === "y" ? "offsetTop" : "offsetLeft";
  var size = (axis) => axis === "y" ? "offsetHeight" : "offsetWidth";
  var part = (align) => align === "middle" ? 0.5 : 1;
  var diff = (align, pos) => align !== "start" ? pos : 0;
  var offset = (node, child2, axis) => node.parentElement[size(axis)] - child2[size(axis)];
  var position = (node, child2, axis, align) => child2[coord(axis)] - diff(align, offset(node, child2, axis) * part(align));
  function closest(node, target, axis, align) {
    return nodes(node).reduce((prev2, curr, i) => {
      const pos = (child2) => position(node, child2, axis, align);
      return Math.abs(pos(curr) - target) < Math.abs(pos(prev2) - target) ? curr : prev2;
    });
  }
  var find = {
    index: (node, target, child2, axis, align) => child2 ? nodes(node).indexOf(child2) : +closest(node, target, axis, align).dataset.index,
    position: (node, index, axis, align) => position(node, child(node, index), axis, align),
    target: (node, target, axis, align) => position(node, closest(node, target, axis, align), axis, align),
    size: (node, index, axis) => nodes(node)[index][size(axis)],
    child: (node, index) => nodes(node).find((child2) => +child2.dataset.index === index)
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
  function replace(node, index, loop) {
    if (loop) {
      node.replaceChildren(...rotate(nodes(node), index - cix(node)));
      node.style.justifyContent = "center";
    } else {
      node.replaceChildren(...nodes(node));
      node.style.justifyContent = "start";
    }
  }

  // src/slidy.ts
  function slidy(node, {
    gap = 0,
    index = 0,
    axis = "x",
    loop = false,
    snap = false,
    clamp = false,
    gravity = 1.2,
    duration = 375,
    align = "start",
    indexer = (x) => x,
    scroller = (p) => p
  }) {
    let raf, rak, velocity = 0, reference = 0, position2 = 0, frame = 0, wheeltime, hip = position2, hix = index;
    const PARENT = node?.parentElement;
    const listen = (node2, events, off = false) => events.forEach(([e, h]) => off ? node2?.removeEventListener(e, h, true) : node2?.addEventListener(e, h, true));
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
      ["resize", () => to(index)]
    ];
    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
      PARENT?.dispatchEvent(new CustomEvent("resize"));
    });
    onMounted(node).then((childs) => {
      console.log("mounted");
      node.style.userSelect = "none";
      node.style.touchAction = "pan-y";
      node.style.pointerEvents = "none";
      node.style.willChange = "auto";
      node.style.webkitUserSelect = "none";
      replace(node, index, loop);
      to(index);
      if (PARENT) {
        PARENT.style.outline = "none";
        listen(PARENT, parentEvents);
        RO.observe(PARENT);
      }
    }).catch((error) => console.error(error));
    function move(pos, transition = 0) {
      position2 += loop ? looping(pos) : pos;
      index = find.index(node, position2, void 0, axis, align);
      const translate = (axis2) => {
        return axis2 === "y" ? `0, ${-position2}px, 0` : `${-position2}px, 0, 0`;
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
      const ix = loop ? find.index(node, position2, child2, axis, align) : index2;
      let pos = target ? snap ? find.target(node, target, axis, align) : target : target === 0 ? 0 : find.position(node, ix, axis, align);
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
      node.style.pointerEvents = e.type !== "mousedown" ? "auto" : "none";
      clear();
      frame = position2;
      reference = axisCoord(e, axis);
      track(performance.now());
      listen(window, windowEvents);
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
        Math.abs(velocity) < 100 ? to(index) : clamp ? to(index, target) : scroll({
          target,
          amplitude,
          duration,
          timestamp: performance.now()
        });
    }
    function delting(position3) {
      let amplitude = (2 - gravity) * velocity;
      const target = snap ? find.target(node, position3 + amplitude, axis, align) : position3 + amplitude;
      amplitude = target - position3;
      return { target, amplitude };
    }
    let wheeling = false;
    function onWheel(e) {
      clear();
      wheeling = true;
      (Math.abs(axisCoord(e, "x")) && Math.abs(axisCoord(e, "y")) < 15 || e.shiftKey) && e.preventDefault();
      move(axisCoord(e, axis) * (2 - gravity));
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
    function clear() {
      hix = wheeling ? hix : index;
      clearTimeout(wheeltime);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rak);
      listen(window, windowEvents, true);
    }
    function update(options) {
      duration = options.duration;
      gravity = maxMin(2, 0, options.gravity);
      axis = options.axis;
      align = options.align;
      snap = options.snap;
      clamp = options.clamp;
      gap = options.gap;
      if (index !== options.index) {
        index = indexing(node, options.index, loop);
        to(index);
      }
      if (loop !== options.loop) {
        loop = options.loop;
        replace(node, index, loop);
        to(index);
      }
    }
    function destroy() {
      clear();
      RO.disconnect();
      listen(PARENT, parentEvents, true);
    }
    return { update, destroy, to };
  }
  return __toCommonJS(slidy_exports);
})();
