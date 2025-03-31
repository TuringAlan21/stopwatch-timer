document.addEventListener("DOMContentLoaded", () => {
    let timer;
    let timeLeft;
    let running = false;
    const screen = document.getElementById("screen-two");
    const startPauseBtn = document.getElementById("start-pause-two");
    const saveTimeBtn = document.getElementById("save-time-two");
    const resetBtn = document.getElementById("reset-two");
    const clearRecordBtn = document.getElementById("clear-record-two");
    const lowerHalf = document.getElementById("lower-half-two");

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    }

    function startTimer() {
        if (!running) {
            timeLeft = parseInt(screen.value) || 0;
            if (timeLeft <= 0) return;
            running = true;
            startPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    screen.value = formatTime(timeLeft);
                } else {
                    clearInterval(timer);
                    running = false;
                    startPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                    alert("Time's up!");
                }
            }, 1000);
        } else {
            pauseTimer();
        }
    }

    function pauseTimer() {
        clearInterval(timer);
        running = false;
        startPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }

    function resetTimer() {
        clearInterval(timer);
        running = false;
        screen.value = "";
        startPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }

    function saveTime() {
        if (timeLeft !== undefined && timeLeft > 0) {
            const record = document.createElement("div");
            record.textContent = `Saved Time: ${formatTime(timeLeft)}`;
            lowerHalf.appendChild(record);
        }
    }

    function clearRecords() {
        lowerHalf.innerHTML = "";
    }

    startPauseBtn.addEventListener("click", startTimer);
    saveTimeBtn.addEventListener("click", saveTime);
    resetBtn.addEventListener("click", resetTimer);
    clearRecordBtn.addEventListener("click", clearRecords);
});




