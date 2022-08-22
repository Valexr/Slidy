<script lang="ts">
  import { getContext } from "svelte/internal";
  import { generateIndexes } from "./Navigation.helpers";
  import type { SlidyStyles } from "../Slidy/Slidy.types";
  import "@slidy/assets/styles/navigation.module.css";

  export let current: number;
  export let start: number;
  export let end: number;
  export let ordinal = false;
  export let vertical = false;
  export let limit = 7;
  export let siblings = 1;

  const classNames = getContext<SlidyStyles>("classNames");

  // Too many items -> should be ordinal for accessibility and responsiveness
  $: ordinal = end - start + 1 > limit && true;
  $: indices = generateIndexes({ current, start, end, limit, siblings });
</script>

<nav class="{classNames?.nav}" class:vertical aria-label="pagination">
  {#each indices as item}
    {@const active = current === item}
    {@const contents = item < 0 ? "…" : item}
    {@const ellipsis = item < 0}
    {@const title = item < 0 ? undefined : `Show to item #${item}`}
    <slot name="nav-item" index={item} active={item === current}>
      <button
        aria-current={active ? "true" : undefined}
        aria-label={title}
        class={classNames["nav-item"]}
        class:active
        class:ellipsis
        class:ordinal
        data-index={ellipsis ? undefined : item - 1}
        disabled={ellipsis}
        {title}
      >
        {ordinal ? contents : ""}
      </button>
    </slot>
  {/each}
</nav>
