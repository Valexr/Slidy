<template>
    <footer>
        <nav id="buttons">
            <button id="clamp" onclick="slidy.update({clamp: activate(this, options.clamp)})">clamp</button>
            <!-- <button id="snap" onclick="slidy.update({snap: activate(this, options.snap)})">snap</button> -->
            <button id="loop" onclick="slidy.update({loop: activate(this, options.loop)})">loop</button>
            <button
                id="vertical"
                onclick="slidy.update({vertical: activate(this, options.vertical)})"
            >vertical</button>
        </nav>

        <nav>
            <button id="prev" onclick="slidy.to(options.index - 1)">←</button>
            <button id="reload" onclick="getPhotos(node, randomQ(1, 69), options.length)">
                <i class="icon icon-refresh"></i>
            </button>
            <button id="next" onclick="slidy.to(options.index + 1)">→</button>
        </nav>

        <nav id="dots"></nav>

        <form>
            <fieldset>
                <label title="length">
                    <input
                        onchange="changeValue()"
                        name="length"
                        type="number"
                        size="1"
                        step="1"
                        min="1"
                        max="50"
                    />
                </label>
                <label title="width">
                    <input onchange="setVar(main, this.name, this.value)" name="width" size="5" />
                </label>
                <label title="height">
                    <input onchange="setVar(main, this.name, this.value)" name="height" size="5" />
                </label>
                <label title="gap">
                    <input onchange="setVar(main, this.name, this.value)" name="gap" size="5" />
                </label>
                <label title="duration">
                    <input
                        onchange="changeValue()"
                        name="duration"
                        type="number"
                        size="2"
                        step="1"
                        min="100"
                        max="1000"
                    />
                </label>
                <label title="gravity">
                    <input
                        onchange="changeValue()"
                        name="gravity"
                        type="number"
                        size="1"
                        step="0.1"
                        min="0.1"
                        max="2"
                    />
                </label>
                <label title="align">
                    <select value="center" name="snap" onchange="changeValue()">
                        <option value>unset</option>
                        <option value="start">← start</option>
                        <option value="center">center</option>
                        <option value="end">end →</option>
                    </select>
                </label>
            </fieldset>
        </form>
    </footer>
</template>