let timeLeft;
let timerId = null;
let isWorkTime = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const modeToggleButton = document.getElementById('mode-toggle');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }
    
    startButton.textContent = 'Pause';
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            // Play notification sound
            new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
            switchMode();
        }
    }, 1000);
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Rest Time';
    modeToggleButton.textContent = isWorkTime ? 'Switch to Rest' : 'Switch to Work';
    modeToggleButton.className = isWorkTime ? 'work-mode' : 'rest-mode';
    
    // Toggle celebration background
    document.body.classList.toggle('rest-mode', !isWorkTime);
    
    updateDisplay();
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    statusText.textContent = 'Work Time';
    startButton.textContent = 'Start';
    modeToggleButton.textContent = 'Switch to Rest';
    modeToggleButton.className = 'work-mode';
    updateDisplay();
}

function toggleTimer() {
    if (timerId === null) {
        startTimer();
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
}

// Initialize
timeLeft = BREAK_TIME;
updateDisplay();
modeToggleButton.className = 'rest-mode';
statusText.textContent = 'Rest Time';
isWorkTime = false;
document.body.classList.add('rest-mode');

// Event listeners
startButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = 'Start';
    switchMode();
}); 