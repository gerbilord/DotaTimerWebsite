import { updateCountdowns } from './countdown.js';
import { formatTime } from './utils.js';

const timerDisplay = document.getElementById('timer');
const initialOffset = 90 * 1000; // -1:30 in milliseconds

let start = performance.now() + initialOffset;

function adjustTime(seconds) {
    start += seconds * 1000;
}

document.getElementById('decreaseTimeSecond').addEventListener('click', () => adjustTime(1));
document.getElementById('increaseTimeSecond').addEventListener('click', () => adjustTime(-1));
document.getElementById('decreaseTimeMore').addEventListener('click', () => adjustTime(10));
document.getElementById('increaseTimeMore').addEventListener('click', () => adjustTime(-10));

function updateTimer() {
  const elapsed = performance.now() - start;
  timerDisplay.textContent = formatTime(elapsed);
  updateCountdowns(start, initialOffset, elapsed);
  requestAnimationFrame(updateTimer);
}

updateTimer(); 