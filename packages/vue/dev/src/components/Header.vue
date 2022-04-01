<template>
    <header>
        <img id="slidy-logo" alt="Slidy" width="50" height="50" src="favicon.png" />
        <h3>
            Slidy
            <span>3.1.0</span>
            <sub>vueJS</sub>
            <sub id="stats" />
        </h3>
        <button id="dark" @click="activate(this, dark)">dark</button>
    </header>
</template>