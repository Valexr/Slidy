<script lang="ts">
  import { getContext } from "svelte";
  import { Link } from "../link"; 
  import { active } from "./active";
  import styles from "./menu.module.css";

  import type { MenuContext } from "./Menu.svelte";
  
  export let href = "";
  export let disabled = false;
  export let pattern: RegExp | null = null;
  
  const page = getContext<MenuContext>("page");
</script>

<li class={styles["menu-item"]} use:active={{ current: $page.url.pathname, pattern }}>
  <Link {href} {disabled}>
    <slot />
  </Link>
</li>