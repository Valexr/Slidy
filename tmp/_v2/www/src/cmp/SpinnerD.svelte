<script>
    let size = 50,
        thickness = 3,
        speed = 2000;
</script>

<svg class="spinner" viewBox="0 0 50 50" width={size} height={size} style="--speed: {speed}ms">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width={thickness} />
</svg>

<style lang="scss">
    .spinner {
        animation: rotate var(--speed) linear infinite;
        -webkit-animation: rotate var(--speed) linear infinite;
        z-index: 2;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -35px 0 0 -35px;
        width: 70px;
        height: 70px;

        & .path {
            // stroke: hsl(210, 70, 75);
            stroke: red;
            stroke-linecap: round;
            animation: dash calc(var(--speed) / 1.33) ease-in-out infinite;
            -webkit-animation: dash calc(var(--speed) / 1.33) ease-in-out infinite;
        }
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
</style>
