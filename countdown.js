import { formatTime } from './utils.js';

const countdownsContainer = document.getElementById('countdowns');
const mutedCountdowns = new Set([]);

const toggleMuteCountdown = (countdownDivId) => {
    if (mutedCountdowns.has(countdownDivId)) {
        unmuteCountdown(countdownDivId);
    } else {
        muteCountdown(countdownDivId);
    }
}

const muteCountdown = (countdownDivId) => {
    if (!mutedCountdowns.has(countdownDivId)) {
        const countdownDiv = document.getElementById(countdownDivId);
        mutedCountdowns.add(countdownDivId);
        countdownDiv.classList.add('muted');
    }
}

const unmuteCountdown = (countdownDivId) => {
    if (mutedCountdowns.has(countdownDivId)) {
        const countdownDiv = document.getElementById(countdownDivId);
        mutedCountdowns.delete(countdownDivId);
        countdownDiv.classList.remove('muted');
    }
}

// createCountdown( name, reoccurring time, reminderTime, disableTime)
createCountdown('lotus', minutes(3), seconds(12), minutes(10));
createCountdown('wisdom', minutes(7), minutes(1), minutes(22));
createCountdown('siege', minutes(5), seconds(30), minutes(11));
createCountdown('rune', minutes(2), seconds(20), minutes(11));
createCountdown('stack-off', minutes(1), seconds(24), minutes(14));
createCountdown('tormentor', minutes(20), minutes(1), minutes(23));
createCountdown('rosh', minutes(17), 0, minutes(70));
// createCountdown('stack-small', 60, 10 * 1000);
// createCountdown('day', 5 * 60 * 1000, 30 * 1000);
// createCountdown('bounty', 3 * 60 * 1000, 10 * 1000);

export function createCountdown(id, reoccurringTimeMs, reminderTimeMs, disableTimeMs) {
    const countdownDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    titleDiv.textContent = id;
    titleDiv.className = 'countdown-title';
    const timeDiv = document.createElement('div');
    timeDiv.className = 'countdown-time';
    countdownDiv.appendChild(titleDiv);
    countdownDiv.appendChild(timeDiv);

    countdownDiv.id = `${id}`;
    countdownDiv.className = 'countdown';
    countdownDiv.dataset.reoccurringTimeMs = reoccurringTimeMs;
    countdownDiv.dataset.reminderTimeMs = reminderTimeMs;
    countdownDiv.dataset.reminderTimeLastPlayedMs = 0;
    countdownDiv.dataset.disableTimeMs = disableTimeMs;

    // Toggle mute on click
    countdownDiv.addEventListener('click', ()=>{toggleMuteCountdown(countdownDiv.id)});

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
        const disableTimeMs = parseInt(countdown.dataset.disableTimeMs);

        // Only disable first time we get next to disable time.
        if( elapsedTime > disableTimeMs &&
            elapsedTime < disableTimeMs + seconds(2)) {
            muteCountdown(countdown.id);
        }

        // if timer hits + is not muted
        if (Math.abs(remainingMs - reminderTimeMs) <= 1000 && 
            Math.abs(elapsedTime - reminderTimeLastPlayedMs) > 2000) {
            if(!mutedCountdowns.has(countdown.id)){
                countdown.dataset.reminderTimeLastPlayedMs = elapsedTime;
                playSoundFor(countdown.id);
            }
        }
    }       

        countdown.querySelector('.countdown-time').textContent = formatTime(remainingMs);
    });
}

function seconds(seconds){
    return seconds * 1000;
}

function minutes(minutes){
    return minutes * 60 * 1000
}

function playSoundFor(id) {
    const audio = new Audio(`sounds/${id}.m4a`);

    // Try to play .m4a
    audio.play().catch(() => {
        // On error (e.g. file not found), try .mp3
        const fallbackAudio = new Audio(`sounds/${id}.mp3`);
        fallbackAudio.play().catch(err => {
            console.error(`Both .m4a and .mp3 failed for ${id}`, err);
        });
    });
}