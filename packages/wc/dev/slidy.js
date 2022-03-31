var Slidy = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/slidy.ts
  var slidy_exports = {};
  __export(slidy_exports, {
    default: () => Slidy
  });

  // ../core/src/utils/env.ts
  function onMount(node, length = 2) {
    return new Promise((resolve, reject) => {
      let count = 0;
      const mounting = setInterval(() => {
        count++;
        if (count >= 69) {
          count = 0;
          clearInterval(mounting);
          reject(`Slidy haven't items`);
        } else if (length && node.children.length >= length) {
          count = 0;
          length = node.children.length;
          clearInterval(mounting);
          resolve({ childs: init(node), length });
        }
      }, 16);
    });
  }
  function dispatch(node, name, detail) {
    node.dispatchEvent(new CustomEvent(name, { detail }));
  }
  function listen(node, events, on = true) {
    for (const [event, handle, options] of events) {
      const state = on ? "addEventListener" : "removeEventListener";
      if (node)
        node[state](event, handle, options);
    }
  }
  function init(node, childs) {
    childs = node.children;
    for (let index = 0; index < childs.length; index++) {
      childs[index].index = index;
    }
    return childs;
  }
  function style(node, styles) {
    for (const property in styles) {
      node.style[property] = styles[property];
    }
  }
  function coordinate(e, vertical) {
    if (e.type === "wheel") {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey)
        e.preventDefault();
      return vertical || e.shiftKey ? e.deltaY : Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
    } else
      return vertical ? uniQ(e).clientY : uniQ(e).clientX;
  }
  var uniQ = (e) => e.changedTouches ? e.changedTouches[0] : e;
  function throttle(fn, ms, wait, tm) {
    return (args) => {
      if (!wait) {
        fn(args);
        wait = true;
        tm && clearTimeout(tm);
        tm = setTimeout(() => wait = false, ms);
      }
    };
  }

  // ../core/src/utils/helpers.ts
  function maxMin(max, min, val) {
    return Math.min(max, Math.max(min, val));
  }

  // ../core/src/utils/dom.ts
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
  var cix = (node) => Math.floor(nodes(node).length / 2);
  var nodes = (node) => Array.from(node.children);
  var child = (node, index) => nodes(node).find((child2) => child2.index === index);
  var coord = (vertical) => vertical ? "offsetTop" : "offsetLeft";
  var size = (vertical) => vertical ? "offsetHeight" : "offsetWidth";
  var part = (snap) => snap === "center" ? 0.5 : snap === "end" ? 1 : 0.5;
  var diff = (snap, pos) => snap !== "start" ? pos : 0;
  var offset = (node, child2, vertical) => node[size(vertical)] - child2[size(vertical)];
  var position = (node, child2, vertical, snap) => child2[coord(vertical)] - diff(snap, offset(node, child2, vertical) * part(snap));
  var distance = (node, index, vertical) => Math.abs(nodes(node)[index][coord(vertical)]);
  function closest(node, target, vertical, snap) {
    return nodes(node).reduce((prev, curr) => {
      const dist = (child2) => Math.abs(position(node, child2, vertical, snap) - target);
      return dist(curr) < dist(prev) ? curr : prev;
    });
  }
  function indents(node, index, loop, gap, snap) {
    const edge = !loop && index === 0 || snap === "start" ? -1 : !loop && index === nodes(node).length - 1 || snap === "end" ? 1 : 0;
    return gap * edge;
  }
  var find = (node, options) => ({
    index: (target, snap) => {
      return closest(node, target, options.vertical, snap).index;
    },
    position: (index, snap, gap) => {
      const pos = position(node, child(node, index), options.vertical, snap);
      return pos + indents(node, index, options.loop, gap, snap);
    },
    size: (index) => nodes(node)[index][size(options.vertical)],
    gap: () => {
      const last = nodes(node).length - 1;
      const lastSize = nodes(node)[last - 1][size(options.vertical)];
      const prev = distance(node, last - 1, options.vertical) + lastSize;
      return distance(node, last, options.vertical) - prev;
    }
  });
  function shuffle(node, direction) {
    return direction > 0 ? node.append(node.childNodes[0]) : direction < 0 ? node.prepend(node.childNodes[node.childNodes.length - 1]) : null;
  }
  function history(node, direction, gap, options) {
    const first = nodes(node)[0][size(options.vertical)];
    const last = nodes(node)[options.length - 1][size(options.vertical)];
    return ((direction > 0 ? first : last) + gap) * direction;
  }
  function replace(node, index, loop) {
    const elements = loop ? rotate(nodes(node), index - cix(node)) : nodes(node).sort((a, b) => a.index - b.index);
    node.replaceChildren(...elements);
  }
  function rotate(array, key) {
    return array.slice(key).concat(array.slice(0, key));
  }

  // ../core/src/slidy.ts
  var base = {
    index: 0,
    length: 1,
    gravity: 1.2,
    duration: 375,
    snap: void 0,
    vertical: false,
    clamp: false,
    loop: false
  };
  function slidy(node, options = base) {
    let raf, wheeltime, reference = 0, direction = 0, timestamp = 0, velocity = 0, position2 = 0, gap = 0, frame = position2, hix = options.index, snap = options.snap, gravity = options.gravity, scrolled = false;
    options = { ...base, ...options };
    const DURATION = Math.pow(options.duration, 2) / 1e3;
    const WINDOW_EVENTS = [
      ["touchmove", onMove, { passive: false }],
      ["mousemove", onMove],
      ["touchend", onUp],
      ["mouseup", onUp],
      ["scroll", onScroll, { capture: true }]
    ];
    const NODE_EVENTS = [
      ["contextmenu", clear],
      ["touchstart", onDown],
      ["mousedown", onDown],
      ["keydown", onKeys],
      [
        "wheel",
        throttle(onWheel, DURATION / gravity * 2),
        { passive: false, capture: true }
      ]
    ];
    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
      to(options.index);
      dispatch(node, "resize", node);
    });
    onMount(node, options.length).then(({ childs, length }) => {
      replace(node, options.index, options.loop);
      snap = options.snap;
      options.length = length;
      hix = options.index;
      gap = find(node, options).gap();
      gravity = options.gravity;
      position2 = options.loop ? find(node, options).position(hix, snap, gap) : position2;
      style(node, { outline: "none", overflow: "hidden" });
      node.tabIndex = 0;
      listen(node, NODE_EVENTS);
      RO.observe(node);
      dispatch(node, "mount", { childs, options });
    }).catch((error) => console.error(error));
    function move(pos) {
      direction = Math.sign(pos);
      position2 += options.loop ? looping(pos) : pos;
      options.index = find(node, options).index(position2, snap);
      graviting(options.index);
      moving(node.children);
      dispatch(node, "move", { index: options.index, position: position2 });
      function graviting(index) {
        gravity = options.loop ? options.gravity : index === 0 && direction <= 0 || index === options.length - 1 && direction >= 0 ? maxMin(1.8, 0, gravity + 0.015) : options.gravity;
      }
      function moving(childs) {
        for (let index = 0; index < childs.length; index++) {
          style(childs[index], {
            transform: translate(options.vertical)
          });
        }
      }
      function translate(vertical) {
        const direction2 = vertical ? `0, ${-position2}px, 0` : `${-position2}px, 0, 0`;
        return `translate3d(${direction2})`;
      }
      function looping(pos2) {
        if (hix !== options.index) {
          pos2 -= history(node, direction, gap, options);
          shuffle(node, direction);
          frame = position2 + pos2;
          hix = options.index;
        }
        return pos2;
      }
    }
    function track() {
      const now = performance.now();
      const elapsed = now - timestamp;
      const delta = position2 - frame;
      const speed = 1e3 * delta / (1 + elapsed);
      velocity = (2 - gravity) * speed + 0.2 * velocity;
      if (elapsed < 60)
        return;
      timestamp = now;
      frame = position2;
    }
    function scroll(index, duration, timestamp2, amplitude = 0, target) {
      snapping(index);
      target = options.snap || options.loop || !options.loop && !options.snap && (index === 0 || index === options.length - 1) ? find(node, options).position(index, snap, gap) : position2 + amplitude;
      amplitude = target - position2;
      RAF(function scroll2(time) {
        const elapsed = (timestamp2 - time) / duration;
        const delta = amplitude * Math.exp(elapsed);
        target = options.loop ? find(node, options).position(index, snap, gap) : target;
        move(target - position2 - delta);
        raf = Math.abs(delta) > 0.5 ? RAF(scroll2) : 0;
      });
    }
    function snapping(index) {
      snap = options.loop ? options.snap : index === 0 ? "start" : index === options.length - 1 ? "end" : options.snap;
    }
    function to(index, duration = DURATION, target) {
      clear();
      index = indexing(node, index, options.loop);
      target = target || find(node, options).position(index, snap, gap);
      scroll(index, duration, performance.now(), target - position2);
    }
    function onDown(e) {
      clear();
      node.focus();
      reference = coordinate(e, options.vertical);
      timestamp = performance.now();
      frame = position2;
      velocity = 0;
      listen(window, WINDOW_EVENTS);
      if (e.type === "mousedown")
        e.preventDefault();
    }
    function onMove(e) {
      const delta = reference - coordinate(e, options.vertical);
      reference = coordinate(e, options.vertical);
      move(delta * (2 - gravity));
      track();
      if (Math.abs(delta) > 5) {
        e.preventDefault();
      } else if (scrolled) {
        gravity = 2;
        to(options.index, DURATION / gravity);
      }
    }
    function onUp() {
      clear();
      const amplitude = velocity * (2 - gravity);
      const index = find(node, options).index(position2 + amplitude, snap);
      const condition = options.clamp || options.duration && Math.abs(amplitude) <= options.duration && options.snap || !options.loop && (index === 0 || index === options.length - 1);
      scroll(index, condition ? DURATION : options.duration, performance.now(), amplitude);
    }
    function onWheel(e) {
      clear();
      const coord2 = coordinate(e, options.vertical) * (2 - gravity);
      to(options.index + Math.sign(coord2 * (e.shiftKey ? -1 : 1)));
    }
    function onKeys(e) {
      const keys = ["ArrowRight", "Enter", " "];
      if (e.key === "ArrowLeft") {
        to(options.index - 1);
      } else if (keys.includes(e.key)) {
        to(options.index + 1);
      }
      dispatch(node, "keys", e.key);
    }
    function onScroll() {
      scrolled = true;
    }
    function clear() {
      scrolled = false;
      gravity = options.gravity;
      clearTimeout(wheeltime);
      cancelAnimationFrame(raf);
      listen(window, WINDOW_EVENTS, false);
    }
    function update(opts) {
      for (const key in opts) {
        if (options[key] !== opts[key]) {
          switch (key) {
            case "index":
              options[key] = indexing(node, opts[key], options.loop);
              to(options[key]);
              break;
            case "gravity":
              options[key] = maxMin(2, 0, opts[key]);
              gravity = options[key];
              break;
            case "snap":
              options[key] = opts[key];
              snap = options[key];
              break;
            case "length":
              options[key] = opts[key];
              init(node);
              to(options.index);
              break;
            default:
              options[key] = opts[key];
              break;
          }
        }
      }
      dispatch(node, "update", options);
    }
    function destroy() {
      clear();
      RO.disconnect();
      listen(node, NODE_EVENTS, false);
      dispatch(node, "destroy", node);
    }
    return { update, destroy, to };
  }

  // src/slidy.ts
  var Slidy = class extends HTMLElement {
    constructor() {
      super();
    }
    get itemWidth() {
      return this.getAttribute("itemWidth") || "auto";
    }
    set itemWidth(val) {
      this.setAttribute("itemWidth", val);
    }
    get height() {
      return this.getAttribute("height") || "auto";
    }
    set height(val) {
      this.setAttribute("height", val);
    }
    get space() {
      return this.getAttribute("space") || "var(--s0)";
    }
    set space(val) {
      this.setAttribute("space", val);
    }
    get noBar() {
      return this.hasAttribute("noBar");
    }
    set noBar(val) {
      if (val) {
        this.setAttribute("noBar", "");
      } else {
        this.removeAttribute("noBar");
      }
    }
    static get observedAttributes() {
      return ["options", "itemWidth", "height", "space", "noBar"];
    }
    connectedCallback() {
      if (this.isConnected)
        slidy(this, JSON.parse(this.attributes.options.value));
    }
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(name, oldValue, newValue);
      if (name === "options")
        console.log(JSON.parse(newValue));
    }
    adoptedCallback() {
    }
  };
  if ("customElements" in window) {
    customElements.define("slidy-wc", Slidy);
    customElements.whenDefined("slidy-wc").then((c) => console.log(c));
  }
  return __toCommonJS(slidy_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3NsaWR5LnRzIiwgIi4uLy4uL2NvcmUvc3JjL3V0aWxzL2Vudi50cyIsICIuLi8uLi9jb3JlL3NyYy91dGlscy9oZWxwZXJzLnRzIiwgIi4uLy4uL2NvcmUvc3JjL3V0aWxzL2RvbS50cyIsICIuLi8uLi9jb3JlL3NyYy9zbGlkeS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgc2xpZHkgfSBmcm9tICdAc2xpZHkvY29yZSc7XG5pbXBvcnQgdHlwZSB7IE9wdGlvbnMgfSBmcm9tICdAc2xpZHkvY29yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWR5IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIC8vIG9wdGlvbnM/OiBQYXJ0aWFsPE9wdGlvbnM+O1xuICAgIC8vIHJlbmRlcjogKCkgPT4gdm9pZDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLy8gdGhpcy5yZW5kZXIgPSAoKSA9PiB7IH07XG4gICAgfVxuXG4gICAgLy8gdG9nZ2xlT3ZlcmZsb3dDbGFzcyhlbGVtOiBFbGVtZW50KSB7XG4gICAgLy8gICAgIGVsZW0uY2xhc3NMaXN0LnRvZ2dsZSgnb3ZlcmZsb3dpbmcnLCB0aGlzLnNjcm9sbFdpZHRoID4gdGhpcy5jbGllbnRXaWR0aCk7XG4gICAgLy8gfVxuXG4gICAgLy8gZ2V0IG9wdGlvbnMoKSB7XG4gICAgLy8gICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnb3B0aW9ucycpIHx8ICdhdXRvJztcbiAgICAvLyB9XG5cbiAgICAvLyBzZXQgb3B0aW9ucyh2YWwpIHtcbiAgICAvLyAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ29wdGlvbnMnLCB2YWwpO1xuICAgIC8vIH1cblxuICAgIGdldCBpdGVtV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaXRlbVdpZHRoJykgfHwgJ2F1dG8nO1xuICAgIH1cblxuICAgIHNldCBpdGVtV2lkdGgodmFsKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdpdGVtV2lkdGgnLCB2YWwpO1xuICAgIH1cblxuICAgIGdldCBoZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykgfHwgJ2F1dG8nO1xuICAgIH1cblxuICAgIHNldCBoZWlnaHQodmFsKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB2YWwpO1xuICAgIH1cblxuICAgIGdldCBzcGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzcGFjZScpIHx8ICd2YXIoLS1zMCknO1xuICAgIH1cblxuICAgIHNldCBzcGFjZSh2YWwpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NwYWNlJywgdmFsKTtcbiAgICB9XG5cbiAgICBnZXQgbm9CYXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnbm9CYXInKTtcbiAgICB9XG5cbiAgICBzZXQgbm9CYXIodmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdub0JhcicsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdub0JhcicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ29wdGlvbnMnLCAnaXRlbVdpZHRoJywgJ2hlaWdodCcsICdzcGFjZScsICdub0JhciddO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICAvLyB0aGlzLnJlbmRlcigpO1xuICAgICAgICAvLyBpZiAoJ1Jlc2l6ZU9ic2VydmVyJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgLy8gICAgIG5ldyBSZXNpemVPYnNlcnZlcihlbnRyaWVzID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygncmVzaXplJyk7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy50b2dnbGVPdmVyZmxvd0NsYXNzKGVudHJpZXNbMF0udGFyZ2V0KTtcbiAgICAgICAgLy8gICAgIH0pLm9ic2VydmUodGhpcyk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBpZiAoJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykge1xuICAgICAgICAvLyAgICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy50b2dnbGVPdmVyZmxvd0NsYXNzKGVudHJpZXNbMF0udGFyZ2V0IGFzIEVsZW1lbnQpO1xuICAgICAgICAvLyAgICAgfSkub2JzZXJ2ZSh0aGlzLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKVxuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCkgc2xpZHkodGhpcywgSlNPTi5wYXJzZSh0aGlzLmF0dHJpYnV0ZXMub3B0aW9ucy52YWx1ZSkpXG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWU6IHN0cmluZywgb2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICAvLyB0aGlzLnJlbmRlcigpO1xuICAgICAgICBjb25zb2xlLmxvZyhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpXG4gICAgICAgIGlmIChuYW1lID09PSAnb3B0aW9ucycpIGNvbnNvbGUubG9nKEpTT04ucGFyc2UobmV3VmFsdWUpKVxuICAgICAgICAvLyBpZiAodGhpcy5pc0Nvbm5lY3RlZCkgc2xpZHkodGhpcylcbiAgICAgICAgLy8gc2xpZHkodGhpcylcbiAgICB9XG4gICAgYWRvcHRlZENhbGxiYWNrKCkge1xuICAgICAgICAvLyBpZiAodGhpcy5pc0Nvbm5lY3RlZCkgc2xpZHkodGhpcylcbiAgICB9XG59XG5cbmlmICgnY3VzdG9tRWxlbWVudHMnIGluIHdpbmRvdykge1xuICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc2xpZHktd2MnLCBTbGlkeSk7XG4gICAgY3VzdG9tRWxlbWVudHMud2hlbkRlZmluZWQoJ3NsaWR5LXdjJykudGhlbihjID0+IGNvbnNvbGUubG9nKGMpKTtcbn0iLCAiaW1wb3J0IHR5cGUgeyBDaGlsZCwgQ3NzUnVsZXMsIERpc3BhdGhEZXRhaWwsIFBhcmVudCwgU2xpZHksIFVuaXFFdmVudCB9IGZyb20gJy4uL3R5cGVzJztcblxuZnVuY3Rpb24gb25Nb3VudChub2RlOiBTbGlkeSwgbGVuZ3RoID0gMik6IFByb21pc2U8eyBjaGlsZHM6IE5vZGVMaXN0T2Y8Q2hpbGQ+LCBsZW5ndGg6IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcblxuICAgICAgICBjb25zdCBtb3VudGluZyA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBpZiAoY291bnQgPj0gNjkpIHtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtb3VudGluZyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGBTbGlkeSBoYXZlbid0IGl0ZW1zYCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxlbmd0aCAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCA+PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBjaGlsZHMgPSBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4pLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5pc0Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgLy8gaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSBjaGlsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtb3VudGluZyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IGNoaWxkczogaW5pdChub2RlKSwgbGVuZ3RoIH0pO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTYpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRGUFMoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PlxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHQxOiBudW1iZXIpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZSgodDI6IG51bWJlcikgPT4gcmVzb2x2ZSgxMDAwIC8gKHQyIC0gdDEpKSkpXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2gobm9kZTogU2xpZHksIG5hbWU6IHN0cmluZywgZGV0YWlsPzogRGlzcGF0aERldGFpbCk6IHZvaWQge1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQobmFtZSwgeyBkZXRhaWw6IGRldGFpbCBhcyBDdXN0b21FdmVudEluaXQ8dW5rbm93bj4gfSkpO1xufVxuXG5mdW5jdGlvbiBsaXN0ZW4oXG4gICAgbm9kZTogV2luZG93IHwgRWxlbWVudCB8IFBhcmVudE5vZGUgfCBTbGlkeSB8IG51bGwsXG4gICAgZXZlbnRzOiBbc3RyaW5nLCBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0LCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucz9dW10sXG4gICAgb24gPSB0cnVlXG4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IFtldmVudCwgaGFuZGxlLCBvcHRpb25zXSBvZiBldmVudHMpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBvbiA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcbiAgICAgICAgaWYgKG5vZGUpIG5vZGVbc3RhdGVdKGV2ZW50LCBoYW5kbGUsIG9wdGlvbnMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdChub2RlOiBTbGlkeSwgY2hpbGRzPzogTm9kZUxpc3RPZjxDaGlsZD4pOiBOb2RlTGlzdE9mPENoaWxkPiB7XG4gICAgY2hpbGRzID0gbm9kZS5jaGlsZHJlbiBhcyB1bmtub3duIGFzIE5vZGVMaXN0T2Y8Q2hpbGQ+O1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGlsZHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNoaWxkc1tpbmRleF0uaW5kZXggPSBpbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcztcbn1cblxuZnVuY3Rpb24gc3R5bGUobm9kZTogU2xpZHkgfCBQYXJlbnQsIHN0eWxlczogQ3NzUnVsZXMpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHN0eWxlcykge1xuICAgICAgICBub2RlLnN0eWxlW3Byb3BlcnR5IGFzIGtleW9mIENzc1J1bGVzXSA9IHN0eWxlc1twcm9wZXJ0eSBhcyBrZXlvZiBDc3NSdWxlc10gYXMgbmV2ZXI7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb29yZGluYXRlKGU6IFVuaXFFdmVudCwgdmVydGljYWw/OiBib29sZWFuKTogbnVtYmVyIHtcbiAgICAvLyAhZS5kZWx0YU1vZGUgfHwgMCA9PT0gdHJhY2svdG91Y2hwYWRcblxuICAgIGlmIChlLnR5cGUgPT09ICd3aGVlbCcpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKGUuZGVsdGFYKSA+IE1hdGguYWJzKGUuZGVsdGFZKSB8fCBlLnNoaWZ0S2V5KSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiB2ZXJ0aWNhbCB8fCBlLnNoaWZ0S2V5XG4gICAgICAgICAgICA/IGUuZGVsdGFZIDogTWF0aC5hYnMoZS5kZWx0YVgpID4gTWF0aC5hYnMoZS5kZWx0YVkpXG4gICAgICAgICAgICAgICAgPyBlLmRlbHRhWCA6IDBcbiAgICB9IGVsc2UgcmV0dXJuIHZlcnRpY2FsID8gdW5pUShlKS5jbGllbnRZIDogdW5pUShlKS5jbGllbnRYO1xufVxuXG5jb25zdCB1bmlRID0gKGU6IFVuaXFFdmVudCk6IFVuaXFFdmVudCB8IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPT4gKGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdIDogZSk7XG5cbmZ1bmN0aW9uIHRocm90dGxlKGZuOiAoYXJnczogVW5pcUV2ZW50KSA9PiB2b2lkLCBtczogbnVtYmVyLCB3YWl0PzogYm9vbGVhbiwgdG0/OiBOb2RlSlMuVGltZW91dCk6IChhcmdzOiBVbmlxRXZlbnQpID0+IHZvaWQge1xuICAgIHJldHVybiAoYXJncykgPT4ge1xuICAgICAgICBpZiAoIXdhaXQpIHtcbiAgICAgICAgICAgIGZuKGFyZ3MpO1xuICAgICAgICAgICAgd2FpdCA9IHRydWU7XG4gICAgICAgICAgICB0bSAmJiBjbGVhclRpbWVvdXQodG0pO1xuICAgICAgICAgICAgdG0gPSBzZXRUaW1lb3V0KCgpID0+IHdhaXQgPSBmYWxzZSwgbXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWxheShmbjogKGFyZ3M6IGFueSkgPT4gdm9pZCwgbXM6IG51bWJlciwgdG0/OiBOb2RlSlMuVGltZW91dCk6IChhcmdzOiBhbnkpID0+IHZvaWQge1xuICAgIHRtICYmIGNsZWFyVGltZW91dCh0bSlcbiAgICByZXR1cm4gKGFyZ3M6IGFueSkgPT4ge1xuICAgICAgICB0bSA9IHNldFRpbWVvdXQoKCkgPT4gZm4oYXJncyksIG1zKTtcbiAgICB9O1xufVxuXG5leHBvcnQgeyBjb29yZGluYXRlLCBzdHlsZSwgZGVsYXksIGRpc3BhdGNoLCBpbml0LCBsaXN0ZW4sIHRocm90dGxlLCBvbk1vdW50LCBnZXRGUFMgfTtcbiIsICJmdW5jdGlvbiBtYXhNaW4obWF4OiBudW1iZXIsIG1pbjogbnVtYmVyLCB2YWw6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsKSk7XG59XG5cbmV4cG9ydCB7IG1heE1pbiB9O1xuIiwgImltcG9ydCB0eXBlIHsgQ2hpbGQsIE9wdGlvbnMsIFNsaWR5IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgbWF4TWluIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuZnVuY3Rpb24gaW5kZXhpbmcobm9kZTogU2xpZHksIGluZGV4OiBudW1iZXIsIGxvb3A/OiBib29sZWFuKSB7XG4gICAgaWYgKGxvb3ApIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVzKG5vZGUpLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPiBub2Rlcyhub2RlKS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIHJldHVybiBpbmRleDtcbiAgICB9IGVsc2UgcmV0dXJuIG1heE1pbihub2Rlcyhub2RlKS5sZW5ndGggLSAxLCAwLCBpbmRleCk7XG59XG5cbmNvbnN0IGNpeCA9IChub2RlOiBTbGlkeSkgPT4gTWF0aC5mbG9vcihub2Rlcyhub2RlKS5sZW5ndGggLyAyKTtcbmNvbnN0IG5vZGVzID0gKG5vZGU6IFNsaWR5KTogQ2hpbGRbXSA9PiBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4gYXMgdW5rbm93biBhcyBOb2RlTGlzdE9mPENoaWxkPik7XG5jb25zdCBjaGlsZCA9IChub2RlOiBTbGlkeSwgaW5kZXg6IG51bWJlcikgPT5cbiAgICBub2Rlcyhub2RlKS5maW5kKChjaGlsZDogQ2hpbGQpID0+IGNoaWxkLmluZGV4ID09PSBpbmRleCkgYXMgQ2hpbGQ7XG5jb25zdCBjb29yZCA9ICh2ZXJ0aWNhbDogYm9vbGVhbikgPT4gKHZlcnRpY2FsID8gJ29mZnNldFRvcCcgOiAnb2Zmc2V0TGVmdCcpO1xuY29uc3Qgc2l6ZSA9ICh2ZXJ0aWNhbDogYm9vbGVhbikgPT4gKHZlcnRpY2FsID8gJ29mZnNldEhlaWdodCcgOiAnb2Zmc2V0V2lkdGgnKTtcbi8vIGNvbnN0IHNjcm9sbCA9ICh2ZXJ0aWNhbDogYm9vbGVhbikgPT4gKHZlcnRpY2FsID8gJ3Njcm9sbEhlaWdodCcgOiAnc2Nyb2xsV2lkdGgnKTtcbmNvbnN0IHBhcnQgPSAoc25hcDogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiAoc25hcCA9PT0gJ2NlbnRlcicgPyAwLjUgOiBzbmFwID09PSAnZW5kJyA/IDEgOiAwLjUpO1xuY29uc3QgZGlmZiA9IChzbmFwOiBzdHJpbmcgfCB1bmRlZmluZWQsIHBvczogbnVtYmVyKSA9PiAoc25hcCAhPT0gJ3N0YXJ0JyA/IHBvcyA6IDApO1xuY29uc3Qgb2Zmc2V0ID0gKG5vZGU6IFNsaWR5LCBjaGlsZDogQ2hpbGQsIHZlcnRpY2FsOiBib29sZWFuKSA9PlxuICAgIG5vZGVbc2l6ZSh2ZXJ0aWNhbCldIC0gY2hpbGRbc2l6ZSh2ZXJ0aWNhbCldO1xuY29uc3QgcG9zaXRpb24gPSAobm9kZTogU2xpZHksIGNoaWxkOiBDaGlsZCwgdmVydGljYWw6IGJvb2xlYW4sIHNuYXA6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT5cbiAgICBjaGlsZFtjb29yZCh2ZXJ0aWNhbCldIC0gZGlmZihzbmFwLCBvZmZzZXQobm9kZSwgY2hpbGQsIHZlcnRpY2FsKSAqIHBhcnQoc25hcCkpO1xuY29uc3QgZGlzdGFuY2UgPSAobm9kZTogU2xpZHksIGluZGV4OiBudW1iZXIsIHZlcnRpY2FsOiBib29sZWFuKSA9PlxuICAgIE1hdGguYWJzKG5vZGVzKG5vZGUpW2luZGV4XVtjb29yZCh2ZXJ0aWNhbCldKTtcblxuZnVuY3Rpb24gY2xvc2VzdChub2RlOiBTbGlkeSwgdGFyZ2V0OiBudW1iZXIsIHZlcnRpY2FsOiBib29sZWFuLCBzbmFwOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBDaGlsZCB7XG4gICAgcmV0dXJuIG5vZGVzKG5vZGUpLnJlZHVjZSgocHJldjogQ2hpbGQsIGN1cnI6IENoaWxkKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3QgPSAoY2hpbGQ6IENoaWxkKSA9PiBNYXRoLmFicyhwb3NpdGlvbihub2RlLCBjaGlsZCwgdmVydGljYWwsIHNuYXApIC0gdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIGRpc3QoY3VycikgPCBkaXN0KHByZXYpID8gY3VyciA6IHByZXY7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGluZGVudHMobm9kZTogU2xpZHksIGluZGV4OiBudW1iZXIsIGxvb3A6IGJvb2xlYW4sIGdhcDogbnVtYmVyLCBzbmFwOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGVkZ2UgPSAoKCFsb29wICYmIGluZGV4ID09PSAwKSB8fCBzbmFwID09PSAnc3RhcnQnKVxuICAgICAgICA/IC0xIDogKCghbG9vcCAmJiBpbmRleCA9PT0gbm9kZXMobm9kZSkubGVuZ3RoIC0gMSkgfHwgc25hcCA9PT0gJ2VuZCcpXG4gICAgICAgICAgICA/IDEgOiAwXG4gICAgcmV0dXJuIGdhcCBhcyBudW1iZXIgKiBlZGdlXG59XG5cbmNvbnN0IGZpbmQgPSAobm9kZTogU2xpZHksIG9wdGlvbnM6IE9wdGlvbnMpID0+ICh7XG4gICAgaW5kZXg6ICh0YXJnZXQ6IG51bWJlciwgc25hcDogc3RyaW5nIHwgdW5kZWZpbmVkKTogbnVtYmVyID0+IHtcbiAgICAgICAgcmV0dXJuIGNsb3Nlc3Qobm9kZSwgdGFyZ2V0LCBvcHRpb25zLnZlcnRpY2FsIGFzIGJvb2xlYW4sIHNuYXApLmluZGV4XG4gICAgfSxcbiAgICBwb3NpdGlvbjogKGluZGV4OiBudW1iZXIsIHNuYXA/OiBzdHJpbmcsIGdhcD86IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbihub2RlLCBjaGlsZChub2RlLCBpbmRleCksIG9wdGlvbnMudmVydGljYWwgYXMgYm9vbGVhbiwgc25hcClcbiAgICAgICAgcmV0dXJuIHBvcyArIGluZGVudHMobm9kZSwgaW5kZXgsIG9wdGlvbnMubG9vcCBhcyBib29sZWFuLCBnYXAgYXMgbnVtYmVyLCBzbmFwIGFzIHN0cmluZylcbiAgICB9LFxuICAgIHNpemU6IChpbmRleDogbnVtYmVyKSA9PiBub2Rlcyhub2RlKVtpbmRleF1bc2l6ZShvcHRpb25zLnZlcnRpY2FsIGFzIGJvb2xlYW4pXSxcbiAgICBnYXA6ICgpID0+IHtcbiAgICAgICAgY29uc3QgbGFzdCA9IG5vZGVzKG5vZGUpLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IGxhc3RTaXplID0gbm9kZXMobm9kZSlbbGFzdCAtIDFdW3NpemUob3B0aW9ucy52ZXJ0aWNhbCBhcyBib29sZWFuKV07XG4gICAgICAgIGNvbnN0IHByZXYgPSBkaXN0YW5jZShub2RlLCBsYXN0IC0gMSwgb3B0aW9ucy52ZXJ0aWNhbCBhcyBib29sZWFuKSArIGxhc3RTaXplXG4gICAgICAgIHJldHVybiBkaXN0YW5jZShub2RlLCBsYXN0LCBvcHRpb25zLnZlcnRpY2FsIGFzIGJvb2xlYW4pIC0gcHJldjtcbiAgICB9LFxuICAgIC8vIHNjcm9sbDogKCkgPT4gbm9kZVtzY3JvbGwob3B0aW9ucy52ZXJ0aWNhbCBhcyBib29sZWFuKV0sXG4gICAgLy8gYWN0aXZlOiAoaW5kZXg6IG51bWJlciwgc25hcD86IHN0cmluZykgPT4gcG9zaXRpb24obm9kZSwgY2hpbGQobm9kZSwgaW5kZXgpLCBvcHRpb25zLnZlcnRpY2FsIGFzIGJvb2xlYW4sIHNuYXApLFxuICAgIC8vIHBhcmVudDogKCkgPT4gbm9kZVtzaXplKG9wdGlvbnMudmVydGljYWwgYXMgYm9vbGVhbildLFxuICAgIC8vIHRhcmdldDogKHRhcmdldDogbnVtYmVyLCBzbmFwPzogc3RyaW5nKSA9PiBwb3NpdGlvbihub2RlLCBjbG9zZXN0KG5vZGUsIHRhcmdldCwgdmVydGljYWwsIHNuYXApLCB2ZXJ0aWNhbCwgc25hcCksXG59KTtcblxuZnVuY3Rpb24gc2h1ZmZsZShub2RlOiBTbGlkeSwgZGlyZWN0aW9uOiBudW1iZXIpOiB2b2lkIHwgbnVsbCB7XG4gICAgcmV0dXJuIGRpcmVjdGlvbiA+IDAgPyBub2RlLmFwcGVuZChub2RlLmNoaWxkTm9kZXNbMF0pXG4gICAgICAgIDogZGlyZWN0aW9uIDwgMCA/IG5vZGUucHJlcGVuZChub2RlLmNoaWxkTm9kZXNbbm9kZS5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdKVxuICAgICAgICAgICAgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBoaXN0b3J5KG5vZGU6IFNsaWR5LCBkaXJlY3Rpb246IG51bWJlciwgZ2FwOiBudW1iZXIsIG9wdGlvbnM6IE9wdGlvbnMpIHtcbiAgICBjb25zdCBmaXJzdCA9IG5vZGVzKG5vZGUpWzBdW3NpemUob3B0aW9ucy52ZXJ0aWNhbCBhcyBib29sZWFuKV1cbiAgICBjb25zdCBsYXN0ID0gbm9kZXMobm9kZSlbb3B0aW9ucy5sZW5ndGggYXMgbnVtYmVyIC0gMV1bc2l6ZShvcHRpb25zLnZlcnRpY2FsIGFzIGJvb2xlYW4pXVxuICAgIHJldHVybiAoKGRpcmVjdGlvbiA+IDAgPyBmaXJzdCA6IGxhc3QpICsgZ2FwKSAqIGRpcmVjdGlvblxufVxuXG5mdW5jdGlvbiByZXBsYWNlKG5vZGU6IFNsaWR5LCBpbmRleDogbnVtYmVyLCBsb29wPzogYm9vbGVhbikge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gbG9vcFxuICAgICAgICA/IHJvdGF0ZShub2Rlcyhub2RlKSwgaW5kZXggLSBjaXgobm9kZSkpXG4gICAgICAgIDogbm9kZXMobm9kZSkuc29ydCgoYSwgYikgPT4gYS5pbmRleCAtIGIuaW5kZXgpO1xuICAgIG5vZGUucmVwbGFjZUNoaWxkcmVuKC4uLmVsZW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gcm90YXRlKGFycmF5OiBBcnJheTxOb2RlIHwgc3RyaW5nPiwga2V5OiBudW1iZXIpIHtcbiAgICByZXR1cm4gYXJyYXkuc2xpY2Uoa2V5KS5jb25jYXQoYXJyYXkuc2xpY2UoMCwga2V5KSk7XG59XG5cblxuLy8gRFJBRlQncyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gZnVuY3Rpb24gY3VtdWxhdGl2ZU9mZnNldChlbGVtZW50KSB7XG4vLyBcdGxldCB0b3AgPSAwLFxuLy8gXHRcdGxlZnQgPSAwO1xuLy8gXHRpZiAoZWxlbWVudClcbi8vIFx0XHRkbyB7XG4vLyBcdFx0XHR0b3AgKz0gZWxlbWVudC5vZmZzZXRUb3AgfHwgMDtcbi8vIFx0XHRcdGxlZnQgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XG4vLyBcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4vLyBcdFx0fSB3aGlsZSAoZWxlbWVudCk7XG5cbi8vIFx0cmV0dXJuIHtcbi8vIFx0XHR0b3A6IHRvcCxcbi8vIFx0XHRsZWZ0OiBsZWZ0LFxuLy8gXHR9O1xuLy8gfVxuXG4vLyBmdW5jdGlvbiB0cmF2ZXJzZShjYWxsYmFjaywgZWxlbSkge1xuLy8gICAgIGlmIChlbGVtICYmIGVsZW0uY2hpbGRyZW4gJiYgZWxlbS5jaGlsZHJlbi5sZW5ndGgpIHtcbi8vICAgICAgICAgZm9yIChjb25zdCBjaGlsZE5vZGUgb2YgZWxlbS5jaGlsZHJlbikge1xuLy8gICAgICAgICAgICAgY2FsbGJhY2soY2hpbGROb2RlKVxuLy8gICAgICAgICAgICAgdHJhdmVyc2UoY2FsbGJhY2ssIGNoaWxkTm9kZSlcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuZXhwb3J0IHsgZmluZCwgc2h1ZmZsZSwgaGlzdG9yeSwgcmVwbGFjZSwgaW5kZXhpbmcgfTtcbiIsICJpbXBvcnQgeyBjb29yZGluYXRlLCBzdHlsZSwgZGlzcGF0Y2gsIGluaXQsIGxpc3RlbiwgdGhyb3R0bGUsIG9uTW91bnQgfSBmcm9tICcuL3V0aWxzL2Vudic7XG5pbXBvcnQgeyBmaW5kLCBzaHVmZmxlLCBoaXN0b3J5LCByZXBsYWNlLCBpbmRleGluZyB9IGZyb20gJy4vdXRpbHMvZG9tJztcbmltcG9ydCB7IG1heE1pbiB9IGZyb20gJy4vdXRpbHMvaGVscGVycyc7XG5cbmltcG9ydCB0eXBlIHsgT3B0aW9ucywgU2xpZHksIFVuaXFFdmVudCB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBiYXNlOiBPcHRpb25zID0ge1xuICAgIGluZGV4OiAwLFxuICAgIGxlbmd0aDogMSxcbiAgICBncmF2aXR5OiAxLjIsXG4gICAgZHVyYXRpb246IDM3NSxcbiAgICBzbmFwOiB1bmRlZmluZWQsXG4gICAgdmVydGljYWw6IGZhbHNlLFxuICAgIGNsYW1wOiBmYWxzZSxcbiAgICBsb29wOiBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpZHkoXG4gICAgbm9kZTogU2xpZHksXG4gICAgb3B0aW9uczogUGFydGlhbDxPcHRpb25zPiA9IGJhc2Vcbik6IHtcbiAgICB1cGRhdGU6IChvcHRpb25zOiBPcHRpb25zKSA9PiB2b2lkO1xuICAgIGRlc3Ryb3k6ICgpID0+IHZvaWQ7XG4gICAgdG86IChpbmRleDogbnVtYmVyLCB0YXJnZXQ/OiBudW1iZXIpID0+IHZvaWQ7XG59IHtcbiAgICBsZXQgcmFmOiBudW1iZXIsXG4gICAgICAgIHdoZWVsdGltZTogTm9kZUpTLlRpbWVvdXQsXG4gICAgICAgIHJlZmVyZW5jZSA9IDAsXG4gICAgICAgIGRpcmVjdGlvbiA9IDAsXG4gICAgICAgIHRpbWVzdGFtcCA9IDAsXG4gICAgICAgIHZlbG9jaXR5ID0gMCxcbiAgICAgICAgcG9zaXRpb24gPSAwLFxuICAgICAgICBnYXAgPSAwLFxuICAgICAgICBmcmFtZSA9IHBvc2l0aW9uLFxuICAgICAgICBoaXggPSBvcHRpb25zLmluZGV4LFxuICAgICAgICBzbmFwID0gb3B0aW9ucy5zbmFwLFxuICAgICAgICBncmF2aXR5ID0gb3B0aW9ucy5ncmF2aXR5IGFzIG51bWJlcixcbiAgICAgICAgc2Nyb2xsZWQgPSBmYWxzZVxuXG4gICAgb3B0aW9ucyA9IHsgLi4uYmFzZSwgLi4ub3B0aW9ucyB9XG5cbiAgICBjb25zdCBEVVJBVElPTiA9IE1hdGgucG93KG9wdGlvbnMuZHVyYXRpb24gYXMgbnVtYmVyLCAyKSAvIDEwMDBcblxuICAgIGNvbnN0IFdJTkRPV19FVkVOVFM6IFtzdHJpbmcsIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QsIEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zP11bXSA9IFtcbiAgICAgICAgWyd0b3VjaG1vdmUnLCBvbk1vdmUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCwgeyBwYXNzaXZlOiBmYWxzZSB9XSxcbiAgICAgICAgWydtb3VzZW1vdmUnLCBvbk1vdmUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdF0sXG4gICAgICAgIFsndG91Y2hlbmQnLCBvblVwIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RdLFxuICAgICAgICBbJ21vdXNldXAnLCBvblVwIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RdLFxuICAgICAgICBbJ3Njcm9sbCcsIG9uU2Nyb2xsIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QsIHsgY2FwdHVyZTogdHJ1ZSB9XVxuICAgIF07XG4gICAgY29uc3QgTk9ERV9FVkVOVFM6IFtzdHJpbmcsIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QsIEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zP11bXSA9IFtcbiAgICAgICAgWydjb250ZXh0bWVudScsIGNsZWFyXSxcbiAgICAgICAgWyd0b3VjaHN0YXJ0Jywgb25Eb3duIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RdLFxuICAgICAgICBbJ21vdXNlZG93bicsIG9uRG93biBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XSxcbiAgICAgICAgWydrZXlkb3duJywgb25LZXlzIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RdLFxuICAgICAgICBbXG4gICAgICAgICAgICAnd2hlZWwnLFxuICAgICAgICAgICAgdGhyb3R0bGUob25XaGVlbCwgKERVUkFUSU9OIC8gZ3Jhdml0eSkgKiAyKSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0LFxuICAgICAgICAgICAgeyBwYXNzaXZlOiBmYWxzZSwgY2FwdHVyZTogdHJ1ZSB9XG4gICAgICAgIF1cbiAgICBdO1xuXG4gICAgY29uc3QgUkFGID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgIGNvbnN0IFJPID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgdG8ob3B0aW9ucy5pbmRleCBhcyBudW1iZXIpO1xuICAgICAgICBkaXNwYXRjaChub2RlLCAncmVzaXplJywgbm9kZSk7XG4gICAgfSk7XG5cbiAgICBvbk1vdW50KG5vZGUsIG9wdGlvbnMubGVuZ3RoKVxuICAgICAgICAudGhlbigoeyBjaGlsZHMsIGxlbmd0aCB9KSA9PiB7XG4gICAgICAgICAgICByZXBsYWNlKG5vZGUsIG9wdGlvbnMuaW5kZXggYXMgbnVtYmVyLCBvcHRpb25zLmxvb3ApO1xuXG4gICAgICAgICAgICBzbmFwID0gb3B0aW9ucy5zbmFwXG4gICAgICAgICAgICBvcHRpb25zLmxlbmd0aCA9IGxlbmd0aFxuICAgICAgICAgICAgaGl4ID0gb3B0aW9ucy5pbmRleCBhcyBudW1iZXJcbiAgICAgICAgICAgIGdhcCA9IGZpbmQobm9kZSwgb3B0aW9ucykuZ2FwKCk7XG4gICAgICAgICAgICBncmF2aXR5ID0gb3B0aW9ucy5ncmF2aXR5IGFzIG51bWJlclxuICAgICAgICAgICAgcG9zaXRpb24gPSBvcHRpb25zLmxvb3AgPyBmaW5kKG5vZGUsIG9wdGlvbnMpLnBvc2l0aW9uKGhpeCwgc25hcCwgZ2FwKSA6IHBvc2l0aW9uXG5cbiAgICAgICAgICAgIHN0eWxlKG5vZGUsIHsgb3V0bGluZTogJ25vbmUnLCBvdmVyZmxvdzogJ2hpZGRlbicgfSk7XG4gICAgICAgICAgICBub2RlLnRhYkluZGV4ID0gMFxuXG4gICAgICAgICAgICBsaXN0ZW4obm9kZSwgTk9ERV9FVkVOVFMpO1xuICAgICAgICAgICAgUk8ub2JzZXJ2ZShub2RlIGFzIEVsZW1lbnQpO1xuXG4gICAgICAgICAgICBkaXNwYXRjaChub2RlLCAnbW91bnQnLCB7IGNoaWxkcywgb3B0aW9ucyB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcblxuICAgIGZ1bmN0aW9uIG1vdmUocG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgZGlyZWN0aW9uID0gTWF0aC5zaWduKHBvcyk7XG4gICAgICAgIHBvc2l0aW9uICs9IG9wdGlvbnMubG9vcCA/IGxvb3BpbmcocG9zKSA6IHBvcztcbiAgICAgICAgb3B0aW9ucy5pbmRleCA9IGZpbmQobm9kZSwgb3B0aW9ucykuaW5kZXgocG9zaXRpb24sIHNuYXApO1xuXG4gICAgICAgIGdyYXZpdGluZyhvcHRpb25zLmluZGV4KVxuICAgICAgICBtb3Zpbmcobm9kZS5jaGlsZHJlbik7XG4gICAgICAgIGRpc3BhdGNoKG5vZGUsICdtb3ZlJywgeyBpbmRleDogb3B0aW9ucy5pbmRleCwgcG9zaXRpb24gfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gZ3Jhdml0aW5nKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgICAgIGdyYXZpdHkgPSBvcHRpb25zLmxvb3BcbiAgICAgICAgICAgICAgICA/IG9wdGlvbnMuZ3Jhdml0eSBhcyBudW1iZXJcbiAgICAgICAgICAgICAgICA6IChpbmRleCA9PT0gMCAmJiBkaXJlY3Rpb24gPD0gMCkgfHwgKGluZGV4ID09PSBvcHRpb25zLmxlbmd0aCBhcyBudW1iZXIgLSAxICYmIGRpcmVjdGlvbiA+PSAwKVxuICAgICAgICAgICAgICAgICAgICA/IG1heE1pbigxLjgsIDAsIGdyYXZpdHkgKyAwLjAxNSlcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25zLmdyYXZpdHkgYXMgbnVtYmVyO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG1vdmluZyhjaGlsZHM6IEhUTUxDb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2hpbGRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIHN0eWxlKGNoaWxkc1tpbmRleF0gYXMgU2xpZHksIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUob3B0aW9ucy52ZXJ0aWNhbClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdHJhbnNsYXRlKHZlcnRpY2FsPzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB2ZXJ0aWNhbCA/IGAwLCAkey1wb3NpdGlvbn1weCwgMGAgOiBgJHstcG9zaXRpb259cHgsIDAsIDBgO1xuICAgICAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGUzZCgke2RpcmVjdGlvbn0pYFxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9vcGluZyhwb3M6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgICAgICBpZiAoaGl4ICE9PSBvcHRpb25zLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgcG9zIC09IGhpc3Rvcnkobm9kZSwgZGlyZWN0aW9uLCBnYXAsIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgc2h1ZmZsZShub2RlLCBkaXJlY3Rpb24pXG4gICAgICAgICAgICAgICAgZnJhbWUgPSBwb3NpdGlvbiArIHBvc1xuICAgICAgICAgICAgICAgIGhpeCA9IG9wdGlvbnMuaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcG9zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhY2soKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBjb25zdCBlbGFwc2VkID0gbm93IC0gdGltZXN0YW1wO1xuICAgICAgICBjb25zdCBkZWx0YSA9IHBvc2l0aW9uIC0gZnJhbWU7XG4gICAgICAgIGNvbnN0IHNwZWVkID0gKDEwMDAgKiBkZWx0YSkgLyAoMSArIGVsYXBzZWQpO1xuXG4gICAgICAgIHZlbG9jaXR5ID0gKDIgLSBncmF2aXR5KSAqIHNwZWVkICsgMC4yICogdmVsb2NpdHk7XG5cbiAgICAgICAgaWYgKGVsYXBzZWQgPCA2MCkgcmV0dXJuO1xuXG4gICAgICAgIHRpbWVzdGFtcCA9IG5vdztcbiAgICAgICAgZnJhbWUgPSBwb3NpdGlvbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGwoaW5kZXg6IG51bWJlciwgZHVyYXRpb246IG51bWJlciwgdGltZXN0YW1wOiBudW1iZXIsIGFtcGxpdHVkZSA9IDAsIHRhcmdldD86IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzbmFwcGluZyhpbmRleClcblxuICAgICAgICB0YXJnZXQgPSBvcHRpb25zLnNuYXAgfHwgb3B0aW9ucy5sb29wIHx8XG4gICAgICAgICAgICAoIW9wdGlvbnMubG9vcCAmJiAhb3B0aW9ucy5zbmFwICYmIChpbmRleCA9PT0gMCB8fCBpbmRleCA9PT0gb3B0aW9ucy5sZW5ndGggYXMgbnVtYmVyIC0gMSkpXG4gICAgICAgICAgICA/IGZpbmQobm9kZSwgb3B0aW9ucykucG9zaXRpb24oaW5kZXgsIHNuYXAsIGdhcClcbiAgICAgICAgICAgIDogcG9zaXRpb24gKyBhbXBsaXR1ZGU7XG4gICAgICAgIGFtcGxpdHVkZSA9IHRhcmdldCAtIHBvc2l0aW9uO1xuXG4gICAgICAgIFJBRihmdW5jdGlvbiBzY3JvbGwodGltZTogbnVtYmVyKSB7XG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gKHRpbWVzdGFtcCAtIHRpbWUpIC8gZHVyYXRpb247XG4gICAgICAgICAgICBjb25zdCBkZWx0YSA9IGFtcGxpdHVkZSAqIE1hdGguZXhwKGVsYXBzZWQpO1xuXG4gICAgICAgICAgICAvLyBpZiAodGltZXN0YW1wIDwgdGltZSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gb3B0aW9ucy5sb29wID8gZmluZChub2RlLCBvcHRpb25zKS5wb3NpdGlvbihpbmRleCwgc25hcCwgZ2FwKSA6IHRhcmdldFxuICAgICAgICAgICAgbW92ZSh0YXJnZXQgYXMgbnVtYmVyIC0gcG9zaXRpb24gLSBkZWx0YSk7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHJhZiA9IE1hdGguYWJzKGRlbHRhKSA+IDAuNSA/IFJBRihzY3JvbGwpIDogMDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc25hcHBpbmcoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzbmFwID0gb3B0aW9ucy5sb29wXG4gICAgICAgICAgICA/IG9wdGlvbnMuc25hcCA6IGluZGV4ID09PSAwXG4gICAgICAgICAgICAgICAgPyAnc3RhcnQnIDogaW5kZXggPT09IG9wdGlvbnMubGVuZ3RoIGFzIG51bWJlciAtIDFcbiAgICAgICAgICAgICAgICAgICAgPyAnZW5kJyA6IG9wdGlvbnMuc25hcFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvKGluZGV4OiBudW1iZXIsIGR1cmF0aW9uID0gRFVSQVRJT04sIHRhcmdldD86IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjbGVhcigpO1xuXG4gICAgICAgIGluZGV4ID0gaW5kZXhpbmcobm9kZSwgaW5kZXgsIG9wdGlvbnMubG9vcCk7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCBmaW5kKG5vZGUsIG9wdGlvbnMpLnBvc2l0aW9uKGluZGV4LCBzbmFwLCBnYXApXG5cbiAgICAgICAgc2Nyb2xsKGluZGV4LCBkdXJhdGlvbiwgcGVyZm9ybWFuY2Uubm93KCksIHRhcmdldCAtIHBvc2l0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRG93bihlOiBVbmlxRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY2xlYXIoKTtcbiAgICAgICAgbm9kZS5mb2N1cygpXG5cbiAgICAgICAgcmVmZXJlbmNlID0gY29vcmRpbmF0ZShlLCBvcHRpb25zLnZlcnRpY2FsKTtcbiAgICAgICAgdGltZXN0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIGZyYW1lID0gcG9zaXRpb247XG4gICAgICAgIHZlbG9jaXR5ID0gMFxuXG4gICAgICAgIGxpc3Rlbih3aW5kb3csIFdJTkRPV19FVkVOVFMpO1xuXG4gICAgICAgIGlmIChlLnR5cGUgPT09ICdtb3VzZWRvd24nKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdmUoZTogVW5pcUV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIG5vZGUuYmx1cigpXG4gICAgICAgIGNvbnN0IGRlbHRhID0gcmVmZXJlbmNlIC0gY29vcmRpbmF0ZShlLCBvcHRpb25zLnZlcnRpY2FsKVxuICAgICAgICByZWZlcmVuY2UgPSBjb29yZGluYXRlKGUsIG9wdGlvbnMudmVydGljYWwpO1xuXG4gICAgICAgIG1vdmUoZGVsdGEgKiAoMiAtIGdyYXZpdHkpKTtcbiAgICAgICAgdHJhY2soKTtcblxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEpID4gNSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsZWQpIHtcbiAgICAgICAgICAgIGdyYXZpdHkgPSAyXG4gICAgICAgICAgICB0byhvcHRpb25zLmluZGV4IGFzIG51bWJlciwgRFVSQVRJT04gLyBncmF2aXR5KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIC8vIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblVwKCk6IHZvaWQge1xuICAgICAgICBjbGVhcigpO1xuXG4gICAgICAgIGNvbnN0IGFtcGxpdHVkZSA9IHZlbG9jaXR5ICogKDIgLSBncmF2aXR5KTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBmaW5kKG5vZGUsIG9wdGlvbnMpLmluZGV4KHBvc2l0aW9uICsgYW1wbGl0dWRlLCBzbmFwKVxuICAgICAgICBjb25zdCBjb25kaXRpb24gPVxuICAgICAgICAgICAgb3B0aW9ucy5jbGFtcCB8fFxuICAgICAgICAgICAgKChvcHRpb25zLmR1cmF0aW9uICYmIE1hdGguYWJzKGFtcGxpdHVkZSkgPD0gb3B0aW9ucy5kdXJhdGlvbikgJiYgb3B0aW9ucy5zbmFwKSB8fCAoIW9wdGlvbnMubG9vcCAmJiAoaW5kZXggPT09IDAgfHwgaW5kZXggPT09IG9wdGlvbnMubGVuZ3RoIGFzIG51bWJlciAtIDEpKVxuXG4gICAgICAgIHNjcm9sbChpbmRleCwgKGNvbmRpdGlvbiA/IERVUkFUSU9OIDogb3B0aW9ucy5kdXJhdGlvbiBhcyBudW1iZXIpLCBwZXJmb3JtYW5jZS5ub3coKSwgYW1wbGl0dWRlKVxuXG4gICAgICAgIC8vIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAvLyBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBvbldoZWVsKGU6IFVuaXFFdmVudCk6IHZvaWQge1xuICAgICAgICBjbGVhcigpO1xuXG4gICAgICAgIGNvbnN0IGNvb3JkID0gY29vcmRpbmF0ZShlLCBvcHRpb25zLnZlcnRpY2FsKSAqICgyIC0gZ3Jhdml0eSk7XG4gICAgICAgIC8vIGNvbnN0IHNpZ24gPSBNYXRoLnRydW5jKGNvb3JkICogZ3Jhdml0eSAqIChlLnNoaWZ0S2V5ID8gLTEgOiAxKSlcblxuICAgICAgICAvLyBpZiAoZS5zaGlmdEtleSB8fCBvcHRpb25zLmNsYW1wKSB7XG4gICAgICAgIHRvKG9wdGlvbnMuaW5kZXggYXMgbnVtYmVyICsgTWF0aC5zaWduKGNvb3JkICogKGUuc2hpZnRLZXkgPyAtMSA6IDEpKSlcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIG1vdmUoY29vcmQpO1xuICAgICAgICAvLyAgICAgd2hlZWx0aW1lID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdG8ob3B0aW9ucy5pbmRleCBhcyBudW1iZXIpO1xuICAgICAgICAvLyAgICAgICAgIGdyYXZpdHkgPSBvcHRpb25zLmdyYXZpdHkgYXMgbnVtYmVyO1xuICAgICAgICAvLyAgICAgfSwgMTAwKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5cyhlOiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBbJ0Fycm93UmlnaHQnLCAnRW50ZXInLCAnICddO1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0byhvcHRpb25zLmluZGV4IGFzIG51bWJlciAtIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleXMuaW5jbHVkZXMoZS5rZXkpKSB7XG4gICAgICAgICAgICB0byhvcHRpb25zLmluZGV4IGFzIG51bWJlciArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BhdGNoKG5vZGUsICdrZXlzJywgZS5rZXkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCk6IHZvaWQge1xuICAgICAgICBzY3JvbGxlZCA9IHRydWVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgc2Nyb2xsZWQgPSBmYWxzZVxuICAgICAgICBncmF2aXR5ID0gb3B0aW9ucy5ncmF2aXR5IGFzIG51bWJlclxuICAgICAgICBjbGVhclRpbWVvdXQod2hlZWx0aW1lIGFzIE5vZGVKUy5UaW1lcik7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIGxpc3Rlbih3aW5kb3csIFdJTkRPV19FVkVOVFMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUob3B0czogT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc1trZXkgYXMga2V5b2YgT3B0aW9uc10gIT09IG9wdHNba2V5IGFzIGtleW9mIE9wdGlvbnNdKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW5kZXgnOlxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gaW5kZXhpbmcobm9kZSwgb3B0c1trZXldIGFzIG51bWJlciwgb3B0aW9ucy5sb29wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvKG9wdGlvbnNba2V5XSBhcyBudW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyYXZpdHknOlxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gbWF4TWluKDIsIDAsIG9wdHNba2V5XSBhcyBudW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3Jhdml0eSA9IG9wdGlvbnNba2V5XSBhcyBudW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc25hcCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBzbmFwID0gb3B0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xlbmd0aCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0KG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG8ob3B0aW9ucy5pbmRleCBhcyBudW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5IGFzIGtleW9mIE9wdGlvbnNdID0gb3B0c1trZXkgYXMga2V5b2YgT3B0aW9uc10gYXMgbmV2ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2gobm9kZSwgJ3VwZGF0ZScsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGNsZWFyKCk7XG4gICAgICAgIFJPLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgbGlzdGVuKG5vZGUsIE5PREVfRVZFTlRTLCBmYWxzZSk7XG4gICAgICAgIGRpc3BhdGNoKG5vZGUsICdkZXN0cm95Jywgbm9kZSk7XG4gICAgfVxuICAgIHJldHVybiB7IHVwZGF0ZSwgZGVzdHJveSwgdG8gfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0VBLG1CQUFpQixNQUFhLFNBQVMsR0FBMkQ7QUFDOUYsV0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFDcEMsVUFBSSxRQUFRO0FBRVosWUFBTSxXQUFXLFlBQVksTUFBTTtBQUMvQjtBQUNBLFlBQUksU0FBUyxJQUFJO0FBQ2Isa0JBQVE7QUFDUix3QkFBYyxRQUFRO0FBQ3RCLGlCQUFPLHFCQUFxQjtBQUFBLFFBQ2hDLFdBQVcsVUFBVSxLQUFLLFNBQVMsVUFBVSxRQUFRO0FBR2pELGtCQUFRO0FBQ1IsbUJBQVMsS0FBSyxTQUFTO0FBQ3ZCLHdCQUFjLFFBQVE7QUFDdEIsa0JBQVEsRUFBRSxRQUFRLEtBQUssSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUFBLFFBRTFDO0FBQUEsTUFDSixHQUFHLEVBQUU7QUFBQSxJQUNULENBQUM7QUFBQSxFQUNMO0FBUUEsb0JBQWtCLE1BQWEsTUFBYyxRQUE4QjtBQUN2RSxTQUFLLGNBQWMs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
