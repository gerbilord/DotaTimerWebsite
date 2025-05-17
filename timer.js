import { updateCountdowns } from './countdown.js';
import { formatTime } from './utils.js';

const timerDisplay = document.getElementById('timer');
const initialOffset = 90 * 1000; // -1:30 in milliseconds

const start = performance.now() + initialOffset;

function updateTimer() {
  const elapsed = performance.now() - start;
  timerDisplay.textContent = formatTime(elapsed);
  updateCountdowns(start, initialOffset, elapsed);
  requestAnimationFrame(updateTimer);
}

updateTimer(); 