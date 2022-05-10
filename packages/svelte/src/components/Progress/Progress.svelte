<script>
	import "./progress.module.css";

	export let value;
	export let max;
</script>

<label class="slidy-progress-bar">
  <span class="slidy-sr-only">Carousel progress</span>
  <progress
		class="slidy-progress"
		intermidiate
		{max}
		tabindex="-1"
		{value}
	/>
</label>