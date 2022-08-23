<script lang="ts">
  import { getContext } from "svelte/internal";
  import { generateIndexes } from "@slidy/assets/scripts";
  import type { I18NDict, SlidyStyles } from "../Slidy/Slidy.types";
  import "@slidy/assets/styles/navigation.module.css";
import { fillTemplate } from "../Slidy/i18n";

  export let current: number;
  export let start: number;
  export let end: number;
  export let ordinal = false;
  export let vertical = false;
  export let limit = 7;
  export let siblings = 1;

  const classNames = getContext<SlidyStyles>("classNames");
  const i18n = getContext<I18NDict>("i18n");

  const setTitle = (i: number) => {
  	if (i === start) {
  		return i18n.first;
  	} else if (i === end) {
  		return i18n.last;
  	} else {
  		return fillTemplate(i18n.slideN, [ i.toString() ]);
  	}
  };

  // Too many items -> should be ordinal for accessibility and responsiveness
  $: ordinal = end - start + 1 > limit && true;
  $: indices = generateIndexes({ current, start, end, limit, siblings });
</script>

<nav class="{classNames?.nav}" class:vertical aria-label="pagination">
  {#each indices as item}
    {@const active = current === item}
    {@const contents = item < 0 ? "…" : item}
    {@const ellipsis = item < 0}
    {@const title = setTitle(item)}
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
