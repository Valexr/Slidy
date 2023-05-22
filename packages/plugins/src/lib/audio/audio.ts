const play = (context: AudioContext, frequency: number, duration: number) => {
    const oscillator = context.createOscillator();

    /**
     * Make it sound 8bit-ish
     */
    oscillator.type = 'square';

    const gain = context.createGain();

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(1, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
};

export { play };
