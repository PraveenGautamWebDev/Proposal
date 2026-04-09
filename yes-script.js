let musicPlaying = false;

window.addEventListener('load', () => {
    launchConfetti();

    const music = document.getElementById('bg-music');
    music.volume = 0.3;

    // Plays because user interaction already happened (clicked YES)
    music.play().catch(() => { });
    musicPlaying = true;

    document.getElementById('music-toggle').textContent = '🔊';
});

/* ---------- CONFETTI ---------- */
function launchConfetti() {
    const duration = 6000;
    const end = Date.now() + duration;

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 }
    });

    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 }
        });

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 }
        });
    }, 300);
}

/* ---------- MUSIC TOGGLE ---------- */
function toggleMusic() {
    const music = document.getElementById('bg-music');

    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        document.getElementById('music-toggle').textContent = '🔇';
    } else {
        music.play().catch(() => { });
        musicPlaying = true;
        document.getElementById('music-toggle').textContent = '🔊';
    }
}