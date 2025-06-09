// --- PARTICLE ANIMATION ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
    }
    draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
        if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
        this.x += this.directionX; this.y += this.directionY; this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .4) - .2; let directionY = (Math.random() * .4) - .2;
        let color = 'rgba(6, 182, 212, 0.6)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
}

window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; initParticles(); });
initParticles();
animateParticles();

// --- COUNTDOWN TIMER ---
const countDownDate = new Date("2025-08-18T07:00:00").getTime();
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const daysCircle = document.getElementById('days-circle');
const hoursCircle = document.getElementById('hours-circle');
const minutesCircle = document.getElementById('minutes-circle');
const secondsCircle = document.getElementById('seconds-circle');
const countdownEl = document.getElementById('countdown');

const setCircleProgress = (circleElement, value, max) => {
    if (!circleElement) return;
    const radius = circleElement.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circleElement.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (value / max) * circumference;
    circleElement.style.strokeDashoffset = offset;
};

const startDate = new Date(); // Assuming today is start for calculation
const totalDays = Math.ceil((countDownDate - startDate.getTime()) / (1000 * 60 * 60 * 24));

const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        countdownEl.innerHTML = `<div class="text-center text-4xl md:text-5xl font-bold text-green-400 p-8 rounded-2xl bg-gray-800/50 w-full">EXAM TIME! GOOD LUCK!</div>`;
        document.getElementById('quote-container').style.display = 'none';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerHTML = days < 10 ? '0' + days : days;
    hoursEl.innerHTML = hours < 10 ? '0' + hours : hours;
    minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;

    setCircleProgress(daysCircle, days, totalDays > 0 ? totalDays : 365);
    setCircleProgress(hoursCircle, hours, 24);
    setCircleProgress(minutesCircle, minutes, 60);
    setCircleProgress(secondsCircle, seconds, 60);
}, 1000);

// --- MOTIVATIONAL QUOTES ---
const quotes = [
    "Believe you can and you're halfway there.",
    "The secret to getting ahead is getting started.",
    "Don't watch the clock; do what it does. Keep going.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The only place where success comes before work is in the dictionary.",
    "You are stronger than you think, more capable than you know.",
    "Every expert was once a beginner. Keep learning.",
    "Focus on progress, not perfection.",
    "The hard work you put in now will pay off later.",
    "Turn your can'ts into cans and your dreams into plans.",
    "Strive for progress, not perfection.",
    "The secret of your future is hidden in your daily routine.",
    "Doubt kills more dreams than failure ever will.",
    "Your only limit is your mind.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "It’s not about having time. It’s about making time.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Trust your preparation. This is your time to shine.",
    "Your hard work has prepared you. Now, conquer it.",
    "Believe in the work you've done. You are ready.",
    "Focus your effort. Finish strong.",
    "The studying is done. Now, go ace it.",
    "You've put in the hours. Now, make them count.",
    "The knowledge is in your head. Now, let it shine.",
    "You've read every chapter. Now, write your own success story.",
    "The preparation is complete. Now, enjoy the victory.",
    "You've laid the foundation. Now, build your empire.",
    "The grind was real. Now, so is the reward.",
    "You've learned the rules. Now, win the game.",
    "The countless nights have led to this. Now, make it your moment.",
    "You've done the reps. Now, lift the trophy.",
    "The concepts are mastered. Now, apply them with confidence.",
    "You've earned this chance. Now, seize the opportunity.",
    "The marathon of studying is over. Now, sprint to the finish line.",
    "You've sharpened your mind. Now, cut through the challenge.",
    "The notes have been written. Now, make your mark.",
    "You've practiced relentlessly. Now, perform flawlessly.",
    "The path has been paved with effort. Now, walk it with pride.",
    "You've absorbed the information. Now, radiate brilliance.",
    "The effort was your investment. Now, collect the dividends.",
    "You've climbed the mountain of books. Now, enjoy the view.",
    "The dedication was your training. Now, claim your championship.",
    "You've decoded the lessons. Now, unlock your potential.",
    "The seeds of knowledge have been planted. Now, harvest your success.",
    "You've put in the sweat. Now, taste the sweetness of achievement.",
    "The puzzles have been solved. Now, see the big picture.",
    "You've built the engine. Now, unleash its power.",
    "The long hours are your secret weapon. Now, reveal your strength.",
    "You've navigated the tough topics. Now, cruise to success.",
    "The discipline has been your guide. Now, let it lead you to greatness.",
    "You've done the research. Now, present your findings.",
    "The focus was intense. Now, let the results be undeniable.",
    "You've overcome the doubts. Now, embrace the certainty of your skill.",
    "The material has been memorized. Now, trust your recall.",
    "You've faced the challenges in practice. Now, defeat them in reality.",
    "The journey was demanding. Now, make the destination worthwhile.",
    "You've done more than enough. Now, believe it's your time.",
    "The theories are understood. Now, create your practical success.",
    "You've organized your thoughts. Now, execute with clarity.",
    "The late nights were your sacrifice. Now, see it pay off.",
    "You've mastered the details. Now, own the outcome.",
    "The work ethic is unmatched. Now, let the results reflect it.",
    "You've filled your toolkit with skills. Now, build something amazing.",
    "The struggle was part of the story. Now, write a legendary ending.",
    "You've studied past the point of exhaustion. Now, find strength in your preparation.",
    "The answers are within you. Now, trust your intuition.",
    "You've earned your spot. Now, prove you belong.",
    "The difficult questions have been answered. Now, the final test is simple.",
    "You've charted the course. Now, sail towards your goal.",
    "The foundation is solid. Now, stand tall under pressure.",
    "You've done the heavy lifting. Now, feel the lightness of being prepared.",
    "The essentials are locked in. Now, improvise where you need to.",
    "You've poured your energy into this. Now, let it fuel your success.",
    "The pages have been turned. Now, start a new chapter of achievement.",
    "You've trained your brain. Now, let it perform its best.",
    "The process was grueling. Now, the outcome will be glorious.",
    "You've reviewed every detail. Now, go be brilliant.",
    "The commitment was absolute. Now, expect an absolute win.",
    "You've done the work in silence. Now, let your success make the noise.",
    "The drills are complete. Now, execute the mission.",
    "You've weathered the storm of studying. Now, bask in the sunshine of success.",
    "The facts are at your fingertips. Now, deliver them with power.",
    "You've given it your all. Now, go get what's yours.",
    "The strategy is set. Now, implement it with precision.",
    "You've pushed your limits. Now, see how far you can go.",
    "The information is organized. Now, present it with confidence.",
    "You've put in the time. Now, make this your time.",
    "The effort is in the bank. Now, it's time to cash out.",
    "You've learned from the best. Now, become the best.",
    "The practice sessions are over. Now, it's game time.",
    "You've built your case. Now, rest it on a foundation of facts.",
    "The challenges were just a warm-up. Now, the main event begins.",
    "You've earned this moment of truth. Now, speak your truth.",
    "The grind is behind you. Now, the glory is in front of you.",
    "You've made the necessary sacrifices. Now, reap the plentiful rewards.",
    "The revision is finished. Now, show them the final version of you.",
    "You've broken down the complex problems. Now, the solution is simple.",
    "The mental workout is complete. Now, showcase your intellectual strength.",
    "You've done the work others weren't willing to do. Now, achieve what they can't.",
    "The dedication has been logged. Now, log your greatest achievement.",
    "You've conquered the curriculum. Now, conquer the world.",
    "The skills have been honed. Now, apply them with masterful ease.",
    "You've put in the unseen hours. Now, get ready for a visible victory.",
    "The knowledge is secure. Now, let your confidence be unshakable.",
    "You've done your homework. Now, teach them a lesson in success.",
    "The tough part is over. Now, show them how it's done.",
    "You've trained for this test. Now, it's time to shine.",
    "The ambition was your fuel. Now, let the results be your legacy.",
    "You've studied with purpose. Now, succeed on purpose.",
    "The preparation was key. Now, unlock the door to your future.",
    "You've given it your focus. Now, witness the incredible results.",
    "The concepts are second nature. Now, let your instincts take over.",
    "You've pushed through the resistance. Now, move forward with ease.",
    "The goals were set. Now, go out and exceed them.",
    "You've absorbed the wisdom. Now, apply it brilliantly.",
    "The plan was perfect. Now, the execution will be too.",
    "You've outworked your doubts. Now, let your belief carry you.",
    "The effort was the price. Now, success is the prize.",
    "You've done everything you could. Now, go be everything you are."
];
const quoteTextEl = document.getElementById('quote-text');
let currentQuoteIndex = -1;

function showNewQuote() {
    quoteTextEl.style.opacity = 0; // Fade out

    setTimeout(() => {
        let nextQuoteIndex;
        do {
            nextQuoteIndex = Math.floor(Math.random() * quotes.length);
        } while (nextQuoteIndex === currentQuoteIndex); // Ensure new quote is different
        currentQuoteIndex = nextQuoteIndex;
        
        quoteTextEl.textContent = `"${quotes[currentQuoteIndex]}"`;
        quoteTextEl.style.opacity = 1; // Fade in
    }, 500); // Wait for fade out to finish
}

// Show the first quote immediately and then cycle every 10 seconds
showNewQuote();
setInterval(showNewQuote, 30000);

// --- MUSIC CONTROLS ---
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control-btn');
const musicIcon = document.getElementById('music-icon');
const musicHint = document.getElementById('music-hint');

// Set initial icon based on autoplay state
music.addEventListener('play', () => { musicIcon.textContent = '❚❚'; });
music.addEventListener('pause', () => { musicIcon.textContent = '►'; });

window.addEventListener('DOMContentLoaded', () => {
    if (music.paused) {
        musicIcon.textContent = '►';
    } else {
        musicIcon.textContent = '❚❚';
    }
});

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});

// Show hint message every 20s if music is not playing
function showMusicHint() {
    if (music.paused) {
        musicHint.style.opacity = 1;
        setTimeout(() => {
            musicHint.style.opacity = 0;
        }, 2500);
    }
}
setInterval(showMusicHint, 20000);

music.addEventListener('play', () => {
    musicHint.style.opacity = 0;
});

// --- PERSONAL MESSAGE & MODAL ---
const personalMenuBtn = document.getElementById('personal-menu-btn');
const personalModal = document.getElementById('personal-modal');
const closePersonalModal = document.getElementById('close-personal-modal');
const personalInput = document.getElementById('personal-message-input');
const saveBtn = document.getElementById('save-message-btn');
const personalMsg = document.getElementById('personal-message');
const personalMsgDisplay = document.getElementById('personal-message-display');

// Show/hide modal
personalMenuBtn.onclick = () => { personalModal.style.display = 'block'; };
closePersonalModal.onclick = () => { personalModal.style.display = 'none'; };

// Load saved message if exists
if (localStorage.getItem('personalMessage')) {
    const savedMessage = localStorage.getItem('personalMessage');
    personalMsg.textContent = savedMessage;
    personalMsg.style.display = 'block';
    if (personalMsgDisplay) {
        personalMsgDisplay.textContent = savedMessage;
        personalMsgDisplay.style.display = 'block';
    }
    // Add to quotes if not already present
    if (!quotes.includes(savedMessage)) {
        quotes.push(savedMessage);
    }
}

// Save message
saveBtn.onclick = () => {
    const msg = personalInput.value.trim();
    if (msg) {
        personalMsg.textContent = msg;
        personalMsg.style.display = 'block';
        localStorage.setItem('personalMessage', msg);
        personalInput.value = '';
        if (personalMsgDisplay) {
            personalMsgDisplay.textContent = msg;
            personalMsgDisplay.style.display = 'block';
        }
        // Add to quotes if not already present
        if (!quotes.includes(msg)) {
            quotes.push(msg);
        }
    }
};

// --- MUSIC SWITCHER WITH ARROWS ---
const tracks = [
    { name: "Calming", file: "calming-music.mp3" },
    { name: "Focus", file: "focus-music.mp3" },
    { name: "Nature", file: "nature-music.mp3" }
];
let currentTrack = 0;

const musicTrackName = document.getElementById('music-track-name');
const musicPrev = document.getElementById('music-prev');
const musicNext = document.getElementById('music-next');

// Set initial track
function setTrack(idx) {
    currentTrack = (idx + tracks.length) % tracks.length;
    music.src = tracks[currentTrack].file;
    musicTrackName.textContent = tracks[currentTrack].name;
    music.load();
    if (musicIcon.textContent === '❚❚') {
        music.play().catch(()=>{});
    }
}

// Initialize first track without playing it
music.src = tracks[currentTrack].file;
musicTrackName.textContent = tracks[currentTrack].name;


musicPrev.onclick = () => setTrack(currentTrack - 1);
musicNext.onclick = () => setTrack(currentTrack + 1);

music.addEventListener('ended', () => setTrack(currentTrack + 1));
