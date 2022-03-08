<script lang="ts" context="module">
  import { slidy } from "@slidy/core";
  import { Arrow, Image, Pagination } from "./components";
  import { clamp as clampValue } from "../helpers/utils";
  import "./slidy.module.css";

  import type { SlidyOptions, ChangeSlide, Slide, GetSrc } from "../types";
</script>

<script lang="ts">
  type $$Props = SlidyOptions;

  export let arrows = true;
  export let background = false;
  export let clamp = false;
  export let className: $$Props["className"] = "";
  export let getImgSrc: GetSrc = (item: Slide) => item.src ?? "";
  export let navigation = true;
  export let duration = 450;
  export let gravity = 1.2;
  export let id: $$Props["id"] = undefined;
  export let index = 0;
  export let loop = false;
  export let position = 0;
  export let slides: $$Props["slides"] = [];
  export let snap = true;
  export let vertical = false;

  $: length = slides.length;

  /**
   * Route to the desired slide index.
   */
  const goto: ChangeSlide = (slide) => {
    if (typeof slide === "number" && !Number.isNaN(slide)) {
      index = clampValue(slide, 0, length - 1);
    }
  };

  const handleClick = (event: Event): void => {
    const element = event.target as HTMLElement;

    if (element.nodeName !== "BUTTON") return;

    if (element.dataset.index) {
      goto(parseInt(element.dataset.index));
      return;
    }

    if (element.dataset.step) {
      goto(parseInt(element.dataset.step) + index);
      return;
    }
  };
</script>

<section aria-roledescription="carousel" class="slidy {className}" class:vertical {id} tabindex="0" on:click={handleClick}>
  <slot name="counter" {index} amount={length}>
    <output class="slidy-counter">
      {index + 1} / {length}
    </output>
  </slot>
  <ul
    class="slidy-slides"
    aria-live="polite"
    use:slidy={{
      length: length,
      vertical,
      duration,
      gravity,
      index,
      clamp,
      snap,
      loop,
    }}
    on:mount={(e) => console.log(e)}
    on:move={(e) => {
      index = e.detail.index;
      position = e.detail.position;
    }}
  >
    {#each slides as item, i (item.id ?? getImgSrc(item) ?? i)}
      <li
        aria-current={i === index ? "true" : undefined}
        aria-label={`${i} of ${length}`}
        aria-roledescription="slide"
        class="slidy-slide"
        class:active={i === index}
        class:background
        style={background ? `--slidy-slide-bg: url(${getImgSrc(item)});` : undefined}
        role="group"
      >
        <slot {item}>
          {#if !background}
            <Image src={getImgSrc(item)} {...item} />
          {/if}
        </slot>
      </li>
    {/each}
  </ul>

  {#if arrows}
    <slot name="arrows">
      {#each [-1, 1] as type}
        <Arrow {type} {index} items={length} {loop} {vertical} />
      {/each}
    </slot>
  {/if}

  {#if navigation}
    <Pagination current={index + 1} start={1} end={length} {vertical} />
  {/if}
</section>
