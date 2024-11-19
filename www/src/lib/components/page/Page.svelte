<script lang="ts" module>
	import { Link as a, Code as pre } from '@components';
	export { pre, a };
</script>

<script lang="ts">
	let { children } = $props();
</script>

{@render children?.()}
