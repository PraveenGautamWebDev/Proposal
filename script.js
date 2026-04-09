const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
];

const noMessages = [
    "No",
    "Are you positive? 🤔",
    "Pookie please... 🥺",
    "If you say no, I will be really sad...",
    "I will be very sad... 😢",
    "Please??? 💔",
    "Don't do this to me...",
    "Last chance! 😭",
    "You can't catch me anyway 😜"
];

const yesTeasePokes = [
    "try saying no first... 😏",
    "go on, hit no... 👀",
    "you're missing out 😈",
    "click no, I dare you 😏"
];

let yesTeasedCount = 0;
let noClickCount = 0;
let runawayEnabled = false;
let musicPlaying = false;

const catGif = document.getElementById('cat-gif');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

/* ---------- AUDIO (FIXED) ---------- */

music.volume = 0.3;

// Play music on first interaction
document.addEventListener('click', () => {
    if (!musicPlaying) {
        music.play().catch(() => { });
        musicPlaying = true;
        musicToggle.textContent = '🔊';
    }
}, { once: true });

function toggleMusic() {
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        musicToggle.textContent = '🔇';
    } else {
        music.play().catch(() => { });
        musicPlaying = true;
        musicToggle.textContent = '🔊';
    }
}

/* ---------- YES BUTTON ---------- */

function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)];
        yesTeasedCount++;
        showTeaseMessage(msg);
        return;
    }

    window.location.href = 'yes.html';
}

/* ---------- TOAST ---------- */

function showTeaseMessage(msg) {
    const toast = document.getElementById('tease-toast');
    toast.textContent = msg;
    toast.classList.add('show');

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

/* ---------- NO BUTTON ---------- */

function handleNoClick() {
    noClickCount++;

    const msgIndex = Math.min(noClickCount, noMessages.length - 1);
    noBtn.textContent = noMessages[msgIndex];

    // Grow YES button
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.35}px`;

    const padY = Math.min(18 + noClickCount * 5, 60);
    const padX = Math.min(45 + noClickCount * 10, 120);
    yesBtn.style.padding = `${padY}px ${padX}px`;

    // Shrink NO button
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`;
    }

    // Change GIF
    const gifIndex = Math.min(noClickCount, gifStages.length - 1);
    swapGif(gifStages[gifIndex]);

    // Enable runaway
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway();
        runawayEnabled = true;
    }
}

/* ---------- GIF ---------- */

function swapGif(src) {
    catGif.style.opacity = '0';
    setTimeout(() => {
        catGif.src = src;
        catGif.style.opacity = '1';
    }, 200);
}

/* ---------- RUNAWAY ---------- */

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway);
    noBtn.addEventListener('touchstart', runAway, { passive: true });
}

function runAway() {
    const margin = 20;

    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;

    const maxX = window.innerWidth - btnW - margin;
    const maxY = window.innerHeight - btnH - margin;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = '50';
}