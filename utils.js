export function formatTime(ms) {
    const isNegative = ms < 0;
    if (isNegative) {
        ms = -ms + 1000; // Work with the absolute value
    }

    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:` +
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}`;

    return isNegative ? `-${formattedTime}` : formattedTime;
}