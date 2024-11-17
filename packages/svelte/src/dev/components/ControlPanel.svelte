<script lang="ts">
	import "@slidy/assets/styles/dev/control-panel.module.css";

	let {
		vertical = $bindable(false),
		clamp = $bindable(0),
		duration = $bindable(450),
		gravity = $bindable(1.45),
		width = $bindable("auto"),
		snap= $bindable("center"),
		loop = $bindable(false),
		gap = $bindable(15),
	} = $props()
</script>

<form class="controls">
	<header>
		<h2>Control Panel</h2>
	</header>
	<section>
		<header>
			<h3>Mode</h3>
		</header>
		<fieldset class="flex-horizontal">
			<label>
				<input
					type="checkbox"
					checked={vertical}
					onchange={() => (vertical = !vertical)}
				/>
				<span>Vertical</span>
			</label>
			<label>
				<input
					type="number"
					bind:value={clamp}
				/>
				<span>Clamp</span>
			</label>
			<label>
				<input
					type="checkbox"
					checked={loop}
					onchange={() => (loop = !loop)}
				/>
				<span>Loop</span>
			</label>
		</fieldset>
	</section>
	<section>
		<header>
			<h3>Swipe</h3>
		</header>
		<fieldset>
			<label>
				<span>Duration</span>
				<input
					type="number"
					bind:value={duration}
					size="5"
					step="1"
					min="100"
					max="1000"
				/>
			</label>
			<label>
				<span>Gravity</span>
				<input
					type="number"
					bind:value={gravity}
					size="5"
					step="0.1"
					min="0.1"
					max="2"
					width="auto"
				/>
			</label>
			<label>
				<span>Align</span>
				<select bind:value={snap}>
					<option value="">unset</option>
					<option value="start">← start</option>
					<option value="center">center</option>
					<option value="end">end →</option>
				</select>
			</label>
		</fieldset>
	</section>
	<section>
		<header>
			<h3>Slides</h3>
		</header>
		<fieldset>
			<label>
				<span>Width</span>
				<input bind:value={width} size="5" width="auto" />
			</label>
			<label>
				<span>Gap</span>
				<input type="text" bind:value={gap} size="5" />
			</label>
		</fieldset>
	</section>
</form>
