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
  function onMount(node, length = 2) {
    return new Promise((resolve, reject) => {
      let mounting, count = 0;
      clearInterval(mounting);
      mounting = setInterval(() => {
        count++;
        console.log(count, node.children.length, length);
        if (node.children.length >= length) {
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
  var part = (align2) => align2 === "center" ? 0.5 : 1;
  var diff = (align2, pos) => align2 !== "start" ? pos : 0;
  var offset = (node, child2, vertical) => node.parentElement[size(vertical)] - child2[size(vertical)];
  var position = (node, child2, vertical, align2) => child2[coord(vertical)] - diff(align2, offset(node, child2, vertical) * part(align2));
  var distance = (node, index, vertical) => Math.abs(nodes(node)[index][coord(vertical)]);
  var gap = (node, vertical) => {
    const last = nodes(node).length - 1;
    const prev2 = distance(node, last - 1, vertical) + nodes(node)[last - 1][size(vertical)];
    return distance(node, last, vertical) - prev2;
  };
  function closest({
    node,
    target,
    vertical,
    align: align2
  }) {
    return nodes(node).reduce((prev2, curr, i) => {
      const pos = (child2) => position(node, child2, vertical, align2);
      return Math.abs(pos(curr) - target) < Math.abs(pos(prev2) - target) ? curr : prev2;
    });
  }
  var find = {
    index: (node, target, child2, vertical, align2) => {
      return child2 ? nodes(node).indexOf(child2) : +closest({ node, target, vertical, align: align2 }).dataset.index;
    },
    position: (node, index, vertical, align2) => position(node, child(node, index), vertical, align2),
    target: (node, target, vertical, align2) => position(node, closest({ node, target, vertical, align: align2 }), vertical, align2),
    size: (node, index, vertical) => nodes(node)[index][size(vertical)],
    child: (node, index) => nodes(node).find((child2) => +child2.dataset.index === index),
    gap: (node, vertical) => gap(node, vertical),
    distance: (node, index, vertical) => distance(node, index, vertical),
    align: (node, vertical) => align(node, vertical)
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
  function slidy(node, options = {
    index: 0,
    length: node.children.length,
    gravity: 1.2,
    duration: 375,
    vertical: false,
    clamp: false,
    loop: false,
    snap: false
  }) {
    let raf, rak, velocity = 0, reference = 0, position2 = 0, frame = 0, wheeltime, hip = position2, hix = options.index, gap2 = 0, gravity = 1.2, align2 = "center", direction = 0;
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
      ["resize", onResize]
    ];
    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
      dispatch(node, "resize", { detail: node });
    });
    const indx = (node2) => {
      return {
        min: 0,
        max: node2.children.length - 1
      };
    };
    const amp = (node2) => {
      return {
        max: find.position(node2, indx(node2).max, options.vertical, "end"),
        min: find.position(node2, indx(node2).min, options.vertical, "start")
      };
    };
    const active = (node2) => {
      return {
        pos: find.position(node2, options.index, options.vertical, align2),
        size: find.size(node2, options.index, options.vertical)
      };
    };
    onMount(node, options.length).then((childs) => {
      console.log("mounted");
      const styles = {
        userSelect: "none",
        touchAction: "pan-y",
        pointerEvents: "none",
        willChange: "auto",
        webkitUserSelect: "none"
      };
      css(node, styles);
      gap2 = find.gap(node, options.vertical);
      replace(node, options.index, options.loop);
      to(options.index);
      gravity = options.gravity;
      console.info("gap:", gap2, align2, amp(node));
      if (PARENT) {
        css(PARENT, { outline: "none" });
        listen(PARENT, parentEvents);
        RO.observe(PARENT);
      }
      dispatch(node, "mount", { detail: childs });
    }).catch((error) => console.error(error));
    function move({ pos, transition = 0 }) {
      position2 += options.loop ? looping(pos) : pos;
      options.index = find.index(node, position2, void 0, options.vertical, align2);
      direction = Math.sign(pos);
      function positioning(position3) {
        if (!options.loop) {
          if (position3 >= amp(node).max - active(node).size && direction >= 0) {
            align2 = "end";
          } else if (position3 <= amp(node).min + active(node).size && direction <= 0) {
            align2 = "start";
          } else {
            align2 = "center";
          }
        }
        return position3;
      }
      function translate(vertical) {
        return vertical ? `0, ${-positioning(position2)}px, 0` : `${-positioning(position2)}px, 0, 0`;
      }
      const styles = {
        transform: `translate3d(${translate(options.vertical)})`,
        transition: `transform ${transition}ms`
      };
      css(node, styles);
      dispatch(node, "move", { detail: { index: options.index, position: position2 } });
    }
    function looping(pos) {
      const delta = hip - pos;
      const first = find.size(node, indx(node).min, options.vertical);
      const last = find.size(node, indx(node).max, options.vertical);
      const history = (size2) => (size2 + gap2) * Math.sign(-pos);
      if (hix !== options.index) {
        pos > 0 ? next(node) : prev(node);
        pos += history(pos > 0 ? first : last);
        frame = position2 + pos + delta;
      }
      hix = options.index;
      return pos;
    }
    let toing = false;
    function to(index, target = null) {
      toing = true;
      clear();
      options.index = indexing(node, index, options.loop);
      if (!options.loop) {
        align2 = options.index === indx(node).min ? "start" : options.index === indx(node).max ? "end" : "center";
      }
      const child2 = find.child(node, options.index);
      const ix = options.loop ? find.index(node, position2, child2, options.vertical, align2) : options.index;
      let pos = target ? options.snap ? find.target(node, target, options.vertical, align2) : target : target === 0 ? 0 : find.position(node, ix, options.vertical, align2);
      move({ pos: pos - position2, transition: options.duration });
    }
    function track(timestamp) {
      RAF(function track2(time) {
        const v = 1e3 * (position2 - frame) / (1 + (time - timestamp));
        velocity = maxMin(2, 0, 2 - options.gravity) * v + 0.2 * velocity;
        timestamp = time;
        frame = position2;
        rak = RAF(track2);
      });
    }
    function scroll({ target, amplitude, duration, timestamp }) {
      if (amplitude) {
        RAF(function scroll2(time) {
          const elapsed = (time - timestamp) / duration;
          const delta = amplitude * Math.exp(-elapsed);
          const dist = position2 - (target - delta);
          move({ pos: options.loop ? delta / 27 : -dist });
          raf = Math.abs(delta) > 0.5 ? RAF(scroll2) : 0;
          if (options.loop && Math.abs(delta) < 100)
            to(options.index);
          else if (!options.loop && Math.abs(delta) < 100 && (options.index === indx(node).min || options.index === indx(node).max)) {
            to(options.index);
          }
        });
      }
    }
    function onDown(e) {
      clear();
      frame = position2;
      reference = coordinate(e, options.vertical);
      track(performance.now());
      listen(window, windowEvents);
    }
    function onMove(e) {
      const delta = (reference - coordinate(e, options.vertical)) * maxMin(2, 0, 2 - options.gravity);
      reference = coordinate(e, options.vertical);
      move({ pos: delta });
    }
    function onUp(e) {
      clear();
      const { target, amplitude } = delting(position2);
      console.log(direction);
      if (Math.abs(amplitude) > 10) {
        Math.abs(velocity) < 100 || !options.loop && options.snap && (options.index === indx(node).min && direction < 0 || options.index === indx(node).max && direction > 0) ? to(options.index) : options.clamp ? to(options.index, target) : scroll({
          target,
          amplitude,
          duration: options.duration,
          timestamp: performance.now()
        });
      } else
        to(options.index);
    }
    function delting(position3) {
      let amplitude = (2 - options.gravity) * velocity;
      const target = options.snap ? find.target(node, position3 + amplitude, options.vertical, align2) : position3 + amplitude;
      amplitude = target - position3;
      return { target, amplitude };
    }
    let wheeling = false;
    function onWheel(e) {
      clear();
      wheeling = true;
      (Math.abs(coordinate(e, options.vertical)) && Math.abs(coordinate(e, options.vertical)) < 15 || e.shiftKey) && e.preventDefault();
      if (e.shiftKey)
        to(options.index - Math.sign(e.deltaY));
      else
        move({
          pos: coordinate(e, options.vertical) * maxMin(2, 0, 2 - options.gravity)
        });
      console.log(Math.sign(e.deltaY));
      if ((options.snap || options.clamp) && !e.shiftKey)
        wheeltime = setTimeout(() => {
          to(options.index);
          wheeling = false;
          options.gravity = gravity;
        }, 100);
    }
    function onKeys(e) {
      const keys = ["ArrowRight", "Enter", " "];
      if (e.key === "ArrowLeft") {
        to(options.index - 1);
      } else if (keys.includes(e.key)) {
        to(options.index + 1);
      }
    }
    function onResize(e) {
      to(options.index);
    }
    function onMutate(e) {
    }
    function clear() {
      hix = wheeling || toing ? hix : options.index;
      clearTimeout(wheeltime);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rak);
      listen(window, windowEvents, false);
    }
    function update(opts) {
      for (const key in opts) {
        if (options[key] !== opts[key]) {
          console.log(key);
          switch (key) {
            case "index":
              options[key] = indexing(node, opts[key], options.loop);
              to(options[key]);
              break;
            case "loop":
              options[key] = opts[key];
              replace(node, options.index, options[key]);
              to(options.index);
              break;
            case "gravity":
              options[key] = maxMin(2, 0, opts[key]);
              break;
            case "length":
              options[key] = opts[key];
              Array.from(node.children).forEach((c, i) => {
                c.dataset.index = i;
              });
              to(options.index);
              break;
            default:
              options[key] = opts[key];
              break;
          }
        }
      }
      console.log(options);
      dispatch(node, "update", { detail: options });
    }
    function destroy() {
      clear();
      RO.disconnect();
      listen(PARENT, parentEvents, false);
    }
    return {
      update,
      destroy,
      to
    };
  }
  return __toCommonJS(slidy_exports);
})();
