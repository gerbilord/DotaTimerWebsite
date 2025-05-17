import { formatTime } from './utils.js';

const countdownsContainer = document.getElementById('countdowns');

createCountdown('bounty', 3 * 60 * 1000, 10 * 1000);
createCountdown('lotus', 3 * 60 * 1000, 12 * 1000);
createCountdown('wisdom', 7 * 60 * 1000, 60 * 1000);
createCountdown('siege', 5 * 60 * 1000, 30 * 1000);
createCountdown('rune', 2 * 60 * 1000, 20 * 1000);
createCountdown('stack', 60 * 1000, 24 * 1000);
createCountdown('tormentor', 20 * 60 * 1000, 60 * 1000);
createCountdown('day', 5 * 60 * 1000, 30 * 1000);

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
            countdown.dataset.reminderTimeLastPlayedMs = elapsedTime;
            playSoundFor(countdown.id);
        }
    }       

        countdown.querySelector('.countdown-time').textContent = formatTime(remainingMs);
    });
} 

function playSoundFor(id) {
    // const audio = new Audio(`sounds/${id}.mp3`);
    const audio = new Audio(`sounds/default-beep.mp3`);
    audio.play();
}