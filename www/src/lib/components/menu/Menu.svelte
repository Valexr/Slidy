<script context="module" lang="ts">
  import type { Readable } from "svelte/store";
  import type { Page } from "@sveltejs/kit";

  export type MenuContext = Readable<Page>;
</script>

<script lang="ts">
  import { page } from "$app/stores";  
  import { setContext } from "svelte";
  import styles from "./menu.module.css";
  
  setContext<MenuContext>("page", page);
</script>

<nav class={styles["menu-container"]}>
  <ul class={styles["menu-items"]}>
    <slot />
  </ul>
</nav>