import { formatTime } from './utils.js';

const countdownsContainer = document.getElementById('countdowns');
const mutedCountdowns = [];

// createCountdown('bounty', 3 * 60 * 1000, 10 * 1000);
createCountdown('lotus', 3 * 60 * 1000, 12 * 1000);
createCountdown('wisdom', 7 * 60 * 1000, 60 * 1000);
createCountdown('siege', 5 * 60 * 1000, 30 * 1000);
createCountdown('rune', 2 * 60 * 1000, 20 * 1000);
createCountdown('stack', 60 * 1000, 24 * 1000);
createCountdown('tormentor', 15 * 60 * 1000, 60 * 1000);
// createCountdown('day', 5 * 60 * 1000, 30 * 1000);

export function createCountdown(id, reoccurringTimeMs, reminderTimeMs) {
    const countdownDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    titleDiv.textContent = id;
    titleDiv.className = 'countdown-title';
    const timeDiv = document.createElement('div');
    timeDiv.className = 'countdown-time';
    countdownDiv.appendChild(titleDiv);
    countdownDiv.appendChild(timeDiv);

    countdownDiv.id = `countdown-${id}`;
    countdownDiv.className = 'countdown';
    countdownDiv.dataset.reoccurringTimeMs = reoccurringTimeMs;
    countdownDiv.dataset.reminderTimeMs = reminderTimeMs;
    countdownDiv.dataset.reminderTimeLastPlayedMs = 0;

    // Toggle mute on click
    countdownDiv.addEventListener('click', () => {
        const index = mutedCountdowns.indexOf(countdownDiv.id);
        if (index === -1) {
            mutedCountdowns.push(countdownDiv.id);
            countdownDiv.classList.add('muted'); // Optional: add muted style
        } else {
            mutedCountdowns.splice(index, 1);
            countdownDiv.classList.remove('muted');
        }
    });

    countdownsContainer.appendChild(countdownDiv);
    return countdownDiv;
}

export function updateCountdowns(startTime, offsetTime, elapsedTime) {
    const countdowns = document.querySelectorAll('.countdown');
    
    countdowns.forEach(countdown => {
        const reoccurringTimeMs = parseInt(countdown.dataset.reoccurringTimeMs);
        let remainingMs;

        if(elapsedTime < 0){
            remainingMs = reoccurringTimeMs - elapsedTime;
        } else {
            remainingMs = reoccurringTimeMs - (elapsedTime % reoccurringTimeMs);
        const reminderTimeMs = parseInt(countdown.dataset.reminderTimeMs);
        const reminderTimeLastPlayedMs = parseInt(countdown.dataset.reminderTimeLastPlayedMs);
        
        if (Math.abs(remainingMs - reminderTimeMs) <= 1000 && 
            Math.abs(elapsedTime - reminderTimeLastPlayedMs) > 2000) {
            if(!mutedCountdowns.includes(countdown.id)){
                countdown.dataset.reminderTimeLastPlayedMs = elapsedTime;
                playSoundFor(countdown.id);
            }
        }
    }       

        countdown.querySelector('.countdown-time').textContent = formatTime(remainingMs);
    });
} 

function playSoundFor(id) {

    let fileName = id.replace("countdown-", "");
    const audio = new Audio(`sounds/${fileName}.m4a`);
    // const audio = new Audio(`sounds/default-beep.mp3`);
    audio.play();
}