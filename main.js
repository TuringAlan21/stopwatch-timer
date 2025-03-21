'use strict';
const playPause = document.getElementById('start-pause');
const saveBtn = document.getElementById('save-time');
const resetBtn = document.getElementById('reset');
const screen = document.getElementById('screen');
const lowerScreen = document.getElementById('lower-half');
const icon = document.querySelector('i');
const clearBtn = document.getElementById('clear-record');
let timer;
let isRunning = false;
let seconds = 0;
let milliseconds = 0;
screen.textContent = '00:00:00';

playPause.addEventListener('click', function () {
    if (icon.classList.contains('fa-play')) {
        icon.classList.replace('fa-play', 'fa-pause');
        startStopwatch();
        isRunning = true;
    } else {
        icon.classList.replace('fa-pause', 'fa-play');
        clearInterval(timer);
        isRunning = false;
        saveBtn.style.backgroundColor = 'blue';
        saveBtn.disabled = false;
    }
});

function startStopwatch() {
    timer = setInterval(function () {
        milliseconds++; 
        if (milliseconds >= 100) {
            seconds++; 
            milliseconds = 0; 
        }
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        updateSaveButton();
        screen.textContent = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    }, 1);
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function resetTimer() {
    screen.textContent = '00:00:00';
    seconds = 0;
    milliseconds = 0;
    clearInterval(timer);
    isRunning = false;
    icon.classList.add('fa-play');
    updateSaveButton();
}

resetBtn.addEventListener('click', resetTimer);

saveBtn.addEventListener('click', function () {
    const savedTime = document.createElement('div');
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    savedTime.textContent = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    lowerScreen.prepend(savedTime);
    resetTimer();
});

clearBtn.addEventListener('click', function () {
    lowerScreen.innerHTML = '';
});

function updateSaveButton() {
    if (seconds === 0 || isRunning || screen.textContent === '00:00:00') {
        saveBtn.disabled = true;
        saveBtn.style.backgroundColor = 'grey';
    } else if (!isRunning && seconds !== 0) {
        saveBtn.disabled = false;
        saveBtn.style.backgroundColor = 'blue';
    }
}












