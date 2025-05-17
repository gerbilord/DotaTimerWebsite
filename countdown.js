import { formatTime } from './utils.js';

const countdownsContainer = document.getElementById('countdowns');

// Example usage with 300 seconds (5 minutes) initial time
createCountdown('bounty-rune', 3 * 60 * 1000);
createCountdown('lotus', 3 * 60 * 1000);
createCountdown('wisdom', 7 * 60 * 1000);
createCountdown('siege-creep', 5 * 60 * 1000);
createCountdown('power-rune', 2 * 60 * 1000);
createCountdown('stack-camps', 60 * 1000);
createCountdown('tormentor', 20 * 60 * 1000);
createCountdown('day-night', 5 * 60 * 1000);

export function createCountdown(id, reoccurringTimeMs) {
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
        }

        countdown.querySelector('.countdown-time').textContent = formatTime(remainingMs);
    });
} 