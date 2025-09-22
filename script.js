// Get references to HTML elements
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

// Initialize variables
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCounter = 1;

// Function to start or stop the timer
function startStop() {
    if (!isRunning) {
        // Start the timer
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10); // Update every 10 milliseconds
        startStopBtn.textContent = 'Stop';
        isRunning = true;
    } else {
        // Stop the timer
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
}

// Function to update the display
function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Function to format time into HH:MM:SS.ms
function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let hours = Math.floor(time / (1000 * 60 * 60));

    // Pad with leading zeros
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Function to reset the stopwatch
function reset() {
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCounter = 1;
    display.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
}

// Function to record a lap
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.prepend(li); // Add new lap to the top
        lapCounter++;
    }
}

// Attach event listeners to the buttons
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
